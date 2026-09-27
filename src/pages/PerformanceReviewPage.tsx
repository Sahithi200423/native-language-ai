import React, { useState, useRef, useEffect } from 'react';
import {
  Video,
  Upload,
  Camera,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  Film,
  Sparkles,
  Info,
  ChevronRight,
  Square,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACTING_DIALOGUES, EMOTIONS_DATA } from '../data/actingData';
import { PerformanceReviewItem } from '../types';
import { videoAnalysisService } from '../services/videoAnalysisService';

export const PerformanceReviewPage: React.FC = () => {
  const {
    currentLanguage,
    performanceReviews,
    addPerformanceReview,
    deletePerformanceReview,
  } = useApp();

  // Video State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [fileSizeText, setFileSizeText] = useState<string>('');
  const [videoError, setVideoError] = useState<string | null>(null);

  // Selected Dialogue & Emotion for Take
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>(ACTING_DIALOGUES[0].id);
  const [selectedEmotion, setSelectedEmotion] = useState<string>('sadness');

  // Webcam Recording Mode
  const [isRecordingWebcam, setIsRecordingWebcam] = useState(false);
  const [recordedSeconds, setRecordedSeconds] = useState(0);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const webcamVideoRef = useRef<HTMLVideoElement | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // Analysis / Review state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeReview, setActiveReview] = useState<PerformanceReviewItem | null>(
    performanceReviews[0] || null
  );
  const [serviceStatusMessage, setServiceStatusMessage] = useState<string | null>(null);

  // Video Player Ref for timeline scrubbing
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Keep cameraStreamRef and videoBlobUrlRef in sync with state for unmount cleanup
  const videoBlobUrlRef = useRef<string | null>(null);
  useEffect(() => {
    cameraStreamRef.current = cameraStream;
  }, [cameraStream]);

  useEffect(() => {
    videoBlobUrlRef.current = videoBlobUrl;
  }, [videoBlobUrl]);

  // Robust cleanup of camera/mic streams and blob URLs on component unmount
  useEffect(() => {
    return () => {
      if (videoBlobUrlRef.current) {
        URL.revokeObjectURL(videoBlobUrlRef.current);
      }
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate video type
    if (!file.type.startsWith('video/')) {
      setVideoError('Please upload a valid video file format (MP4, WebM, or MOV).');
      return;
    }

    // Validate size (0 byte check)
    if (file.size === 0) {
      setVideoError('The selected file is empty (0 bytes). Please upload a valid recorded take.');
      return;
    }

    // Validate size (100MB limit)
    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setVideoError(`Video file size (${(file.size / (1024 * 1024)).toFixed(1)}MB) exceeds the 100MB limit. Please upload a shorter scene take.`);
      return;
    }

    if (videoBlobUrlRef.current) {
      URL.revokeObjectURL(videoBlobUrlRef.current);
    }

    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setVideoBlobUrl(url);
    setFileSizeText(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);

    // Probe duration
    const tempVideo = document.createElement('video');
    tempVideo.src = url;
    tempVideo.onloadedmetadata = () => {
      setVideoDuration(Math.round(tempVideo.duration) || 15);
    };
    tempVideo.onerror = () => {
      setVideoDuration(15);
    };
  };

  const startWebcamRecording = async () => {
    setVideoError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: true,
      });

      setCameraStream(stream);
      cameraStreamRef.current = stream;
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream;
      }

      let recorderOptions: MediaRecorderOptions = {};
      if (typeof MediaRecorder !== 'undefined' && typeof MediaRecorder.isTypeSupported === 'function') {
        if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
          recorderOptions = { mimeType: 'video/webm;codecs=vp9' };
        } else if (MediaRecorder.isTypeSupported('video/webm')) {
          recorderOptions = { mimeType: 'video/webm' };
        } else if (MediaRecorder.isTypeSupported('video/mp4')) {
          recorderOptions = { mimeType: 'video/mp4' };
        }
      }

      const recorder = recorderOptions.mimeType
        ? new MediaRecorder(stream, recorderOptions)
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      recordedChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        if (recordedChunksRef.current.length > 0) {
          const mimeType = recorder.mimeType || 'video/webm';
          const blob = new Blob(recordedChunksRef.current, { type: mimeType });
          if (videoBlobUrlRef.current) {
            URL.revokeObjectURL(videoBlobUrlRef.current);
          }
          const url = URL.createObjectURL(blob);
          setVideoBlobUrl(url);
          setFileSizeText(`${(blob.size / (1024 * 1024)).toFixed(1)} MB`);
          setVideoDuration(recordedSeconds || 12);
          setVideoFile(new File([blob], 'rehearsal_take.webm', { type: mimeType }));
        }
      };

      recorder.start();
      setIsRecordingWebcam(true);
      setRecordedSeconds(0);
      timerIntervalRef.current = setInterval(() => {
        setRecordedSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setVideoError('Camera or microphone access was denied. Please allow camera permissions in your browser address bar or upload a video file.');
      } else if (err.name === 'NotFoundError') {
        setVideoError('No camera or microphone hardware found on this computer. You can upload an MP4/WebM video instead.');
      } else {
        setVideoError(`Could not start camera recording: ${err.message || 'Device error'}. You can still upload a video file.`);
      }
      setIsRecordingWebcam(false);
    }
  };

  const stopWebcamRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
      cameraStreamRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecordingWebcam(false);
  };

  const cancelWebcamRecording = () => {
    recordedChunksRef.current = [];
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      setCameraStream(null);
      cameraStreamRef.current = null;
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setIsRecordingWebcam(false);
    setRecordedSeconds(0);
  };

  const deleteCurrentVideo = () => {
    if (videoBlobUrl) {
      URL.revokeObjectURL(videoBlobUrl);
    }
    setVideoBlobUrl(null);
    setVideoFile(null);
    setVideoDuration(0);
    setFileSizeText('');
    setVideoError(null);
  };

  const handleStartAnalysis = async () => {
    if (!videoBlobUrl) return;

    setIsAnalyzing(true);
    setServiceStatusMessage(null);

    const activeD = ACTING_DIALOGUES.find((d) => d.id === selectedDialogueId) || ACTING_DIALOGUES[0];
    const dialogueTitle = activeD.sceneType || 'Dramatic Scene';

    // Call Video Analysis Service
    const response = await videoAnalysisService.analyzePerformanceVideo({
      videoFile: videoFile || new Blob(),
      languageCode: currentLanguage.code,
      dialogueTitle,
      targetEmotion: selectedEmotion,
      durationSeconds: videoDuration || 15,
    });

    if (response.connected && response.review) {
      addPerformanceReview(response.review);
      setActiveReview(response.review);
      setServiceStatusMessage('Analysis received from connected video analysis service.');
    } else {
      // Offline / Service not connected: use transparent guided actor evaluation
      const guidedReview = videoAnalysisService.createGuidedSelfReview(
        dialogueTitle,
        selectedEmotion,
        currentLanguage.code,
        videoDuration,
        videoBlobUrl,
        fileSizeText
      );
      addPerformanceReview(guidedReview);
      setActiveReview(guidedReview);
      setServiceStatusMessage(response.message);
    }

    setIsAnalyzing(false);
  };

  const seekToTimestamp = (seconds: number) => {
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = seconds;
      videoPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = Math.floor(sec % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400">
              <Film className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Performance Review
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload or record an acting take in {currentLanguage.name}. Review timing, eye focus, and diction with the 8-dimension actor evaluation rubric.
          </p>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-start gap-3">
        <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300">
          <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">
            Privacy First: Video Processing & Retention
          </strong>
          Your performance videos may contain personal likeness. Only upload takes you are comfortable processing. Videos stay in local browser session memory unless intentionally stored, and can be deleted immediately using the "Delete Video" button below.
        </div>
      </div>

      {/* Video Validation / Permission Error Banner */}
      {videoError && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start justify-between gap-3 text-xs text-rose-800 dark:text-rose-200">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{videoError}</span>
          </div>
          <button
            onClick={() => setVideoError(null)}
            className="text-rose-500 hover:text-rose-700 font-bold px-2 py-0.5 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/50"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Upload & Setup Section if no video loaded */}
      {!videoBlobUrl && !isRecordingWebcam && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option A: Upload File */}
          <div className="p-8 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center space-y-4 hover:border-amber-400 transition-colors">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 flex items-center justify-center">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload Acting Video
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Supports MP4, WebM, or MOV takes (up to 100MB)
              </p>
            </div>
            <label className="cursor-pointer px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all">
              Choose Video File
              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Option B: Record via Webcam */}
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400 flex items-center justify-center">
              <Camera className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Record Video Take
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Record your performance take right here using your web browser camera
              </p>
            </div>
            <button
              onClick={startWebcamRecording}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-sm transition-all"
            >
              Start Camera Recording
            </button>
          </div>
        </div>
      )}

      {/* Active Webcam Recording View */}
      {isRecordingWebcam && (
        <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 space-y-4 max-w-2xl mx-auto text-center">
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <video
              ref={webcamVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            <div className="absolute top-4 left-4 bg-red-600/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              RECORDING {formatSeconds(recordedSeconds)}
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={stopWebcamRecording}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg"
            >
              <Square className="w-4 h-4 fill-current" />
              Stop & Preview Take
            </button>
            <button
              onClick={cancelWebcamRecording}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
            >
              Cancel Take
            </button>
          </div>
        </div>
      )}

      {/* Video Loaded: Preview & Analysis Workbench */}
      {videoBlobUrl && (
        <div className="space-y-6">
          {/* Metadata & Controls Bar */}
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="font-bold text-slate-900 dark:text-white px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                Duration: {formatSeconds(videoDuration)}
              </span>
              {fileSizeText && (
                <span className="text-slate-500 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800">
                  Size: {fileSizeText}
                </span>
              )}
              <span className="text-amber-600 dark:text-amber-400 font-bold px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60">
                Language: {currentLanguage.name}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold capitalize text-slate-800 dark:text-slate-200"
              >
                {EMOTIONS_DATA.map((em) => (
                  <option key={em.id} value={em.id}>
                    Emotion: {em.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                {isAnalyzing ? 'Evaluating Take...' : 'Analyze Performance'}
              </button>

              <button
                onClick={deleteCurrentVideo}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Delete video take"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete Video</span>
              </button>
            </div>
          </div>

          {/* Service Status / Transparency Banner */}
          {serviceStatusMessage && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-900 dark:text-amber-200 font-bold block mb-0.5">
                  Performance Service Status:
                </strong>
                <span className="text-amber-800 dark:text-amber-300">{serviceStatusMessage}</span>
              </div>
            </div>
          )}

          {/* Side-by-Side Review Workbench */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Video Player & Timeline (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden bg-black border border-slate-800 shadow-xl aspect-video relative flex items-center justify-center">
                <video
                  ref={videoPlayerRef}
                  src={videoBlobUrl}
                  controls
                  className="w-full h-full object-contain"
                  onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>

              {/* Clickable Interactive Timeline */}
              {activeReview?.timelineNotes && activeReview.timelineNotes.length > 0 && (
                <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Performance Feedback Timeline
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Click any timestamp to seek the video player to that exact beat:
                  </p>

                  <div className="space-y-2">
                    {activeReview.timelineNotes.map((event, idx) => (
                      <button
                        key={idx}
                        onClick={() => seekToTimestamp(event.seconds)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-amber-50/70 dark:hover:bg-amber-950/30 text-left text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px]">
                            {event.timestamp}
                          </span>
                          <span className="text-slate-700 dark:text-slate-200">{event.note}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: 8-Dimension Actor Performance Review (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {activeReview ? (
                <div className="space-y-4">
                  {/* Top Improvements Callout */}
                  {activeReview.topImprovements && (
                    <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-200 dark:border-amber-900/30 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                        Top 3 Things to Improve for Your Next Take
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                        {activeReview.topImprovements.map((imp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 8-Category Performance Grid */}
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                        {videoAnalysisService.isServiceConnected()
                          ? '8-Dimension AI Performance Review'
                          : '8-Dimension Guided Performance Evaluation'}
                      </h3>
                      {!videoAnalysisService.isServiceConnected() && (
                        <span className="text-[10px] text-slate-400 font-medium">
                          Self-Audit (No AI score simulated)
                        </span>
                      )}
                    </div>

                    <div className="space-y-3">
                      {activeReview.dimensions.map((dim, idx) => {
                        const statusColors = {
                          Strong: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
                          Good: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
                          'Needs Practice': 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
                          'Not Enough Evidence': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
                        }[dim.status];

                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                                <span>{dim.icon}</span>
                                <span>{dim.name}</span>
                              </span>
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${statusColors}`}>
                                {dim.status}
                              </span>
                            </div>

                            <p className="text-slate-600 dark:text-slate-400">
                              <strong className="text-slate-800 dark:text-slate-200">Worked well:</strong> {dim.whatWentWell}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400">
                              <strong className="text-slate-800 dark:text-slate-200">To improve:</strong> {dim.whatToImprove}
                            </p>
                            <div className="pt-1 text-[11px] text-amber-700 dark:text-amber-400 italic">
                              🎯 <strong>Actor Drill:</strong> {dim.exercise}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                  <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Ready to Evaluate
                  </h4>
                  <p className="text-xs text-slate-500">
                    Click "Analyze Performance" above to generate your structured 8-dimension review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
