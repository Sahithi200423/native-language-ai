import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ACTING_DIALOGUES, EMOTIONS_DATA } from '../../data/actingData';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';
import { Camera, CameraOff, Play, Square, Save, CheckSquare, Square as UncheckedSquare, Info, Volume2 } from 'lucide-react';
import { ttsService } from '../../services/ttsService';

export const CameraPracticeTab: React.FC = () => {
  const { currentLanguage, saveSelfEvaluation } = useApp();

  // Dialog selection
  const [selectedDialogueId, setSelectedDialogueId] = useState<string>(ACTING_DIALOGUES[0].id);
  const selectedDialogue = ACTING_DIALOGUES.find(d => d.id === selectedDialogueId) || ACTING_DIALOGUES[0];

  // Camera & Media
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Recording timer
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedSeconds, setRecordedSeconds] = useState<number>(0);
  const [hasRecordedSession, setHasRecordedSession] = useState<boolean>(false);
  const timerIntervalRef = useRef<any>(null);

  // Self Evaluation Checklist
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    maintainEmotion: false,
    naturalFace: false,
    effectiveEyes: false,
    appropriatePauses: false,
    vocalShift: false,
    avoidOveracting: false,
    naturalBody: false,
    clearPronunciation: false,
  });

  const [notes, setNotes] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Webcam error:', err);
      setCameraError('Unable to access webcam. Please check browser camera permissions or practice with a physical mirror.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    if (isRecording) {
      stopRecording();
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [stream]);

  // Connect video element if stream active
  useEffect(() => {
    if (isCameraActive && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [isCameraActive, stream]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordedSeconds(0);
    setHasRecordedSession(false);
    setSavedSuccess(false);
    timerIntervalRef.current = setInterval(() => {
      setRecordedSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setHasRecordedSession(true);
  };

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveEvaluation = () => {
    saveSelfEvaluation({
      dialogueId: selectedDialogue.id,
      emotion: selectedDialogue.emotion,
      checklist,
      notes,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const currentDialogueContent =
    selectedDialogue.translations[currentLanguage.code] ||
    selectedDialogue.translations['te'];

  const emotionInfo =
    EMOTIONS_DATA.find((e) => e.id === selectedDialogue.emotion) ||
    EMOTIONS_DATA[1];

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
            Self-Practice Camera Studio (Privacy First)
          </h4>
          <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
            This mirror studio runs 100% locally in your browser. Video feeds are never transmitted or stored on external servers.
            No automated psychological/biometric mood claims are made—authentic acting comes from your self-awareness and mindful repetition.
          </p>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Camera Viewfinder & Prompter (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-black rounded-3xl overflow-hidden shadow-xl aspect-video relative flex items-center justify-center border border-gray-800">
            {isCameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="text-center p-6 text-gray-400 max-w-sm">
                <Camera className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium text-gray-300">Camera Mirror Disabled</p>
                <p className="text-xs text-gray-500 mt-1 mb-4">
                  Turn on your camera to see your facial micro-expressions and eye gaze in real-time.
                </p>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Enable Practice Camera
                </button>
              </div>
            )}

            {/* In-View Teleprompter Overlay */}
            {isCameraActive && (
              <div className="absolute top-4 inset-x-4 p-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-white pointer-events-none">
                <div className="flex items-center justify-between text-[11px] text-gray-300 mb-1">
                  <span className="font-semibold uppercase tracking-wider text-amber-300">
                    Emotion: {selectedDialogue.emotion} ({emotionInfo?.emoji})
                  </span>
                  {isRecording && (
                    <span className="flex items-center gap-1.5 text-red-400 font-bold animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      REC {formatTime(recordedSeconds)}
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-white line-clamp-1">{currentDialogueContent.native}</p>
                <p className="text-xs text-gray-300 italic line-clamp-1">{currentDialogueContent.romanization}</p>
              </div>
            )}

            {cameraError && (
              <div className="absolute inset-0 bg-black/90 p-6 flex flex-col items-center justify-center text-center">
                <p className="text-xs text-red-400 max-w-xs">{cameraError}</p>
                <button
                  onClick={startCamera}
                  className="mt-3 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-xs"
                >
                  Retry Access
                </button>
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCameraActive ? (
                <button
                  onClick={stopCamera}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium flex items-center gap-1.5"
                >
                  <CameraOff className="w-3.5 h-3.5" />
                  Turn Off Camera
                </button>
              ) : (
                <button
                  onClick={startCamera}
                  className="px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Start Mirror
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {isRecording ? (
                <button
                  onClick={stopRecording}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-red-600/20"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  Stop Take ({formatTime(recordedSeconds)})
                </button>
              ) : (
                <button
                  onClick={startRecording}
                  disabled={!isCameraActive}
                  className="px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-primary-600/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Start Performance Take
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Dialogue Reference & Self-Evaluation (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Dialogue Picker Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Select Dialogue
              </label>
              <button
                onClick={() => ttsService.speak(currentDialogueContent.native, currentLanguage.code)}
                className="p-1 text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-800 rounded-lg text-xs flex items-center gap-1 font-semibold"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen
              </button>
            </div>

            <select
              value={selectedDialogueId}
              onChange={(e) => setSelectedDialogueId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-medium text-gray-900 dark:text-white"
            >
              {ACTING_DIALOGUES.map(d => (
                <option key={d.id} value={d.id}>
                  [{d.emotion}] {d.situation}
                </option>
              ))}
            </select>

            <TargetLanguageBlock
              content={{
                native: currentDialogueContent.native,
                romanization: currentDialogueContent.romanization,
                englishMeaning: currentDialogueContent.englishMeaning,
              }}
              size="md"
            />

            <div className="text-xs text-gray-600 dark:text-gray-400 bg-amber-50/70 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/30">
              <strong className="text-amber-900 dark:text-amber-200 block mb-0.5">Pause & Delivery Note:</strong>
              {selectedDialogue.delivery.pause}
            </div>
          </div>

          {/* Self-Evaluation Checklist Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                Self-Evaluation Checklist
              </h3>
              {hasRecordedSession && (
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Take Recorded
                </span>
              )}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Honest self-critique builds screen presence. Check the items you mastered in this take:
            </p>

            <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
              {[
                { key: 'maintainEmotion', label: 'Did I maintain the target emotion throughout?' },
                { key: 'naturalFace', label: 'Did I use natural, non-exaggerated facial expressions?' },
                { key: 'effectiveEyes', label: 'Did I use my eyes and gaze intentionally?' },
                { key: 'appropriatePauses', label: 'Did I honor the dramatic pauses without rushing?' },
                { key: 'vocalShift', label: 'Did I modulate my voice pitch, tone, and volume?' },
                { key: 'avoidOveracting', label: 'Did I avoid melodrama and overacting?' },
                { key: 'naturalBody', label: 'Did I maintain authentic physical posture?' },
                { key: 'clearPronunciation', label: `Did I pronounce the ${currentLanguage.name} phrases clearly?` },
              ].map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggleCheck(item.key)}
                  className="w-full flex items-center gap-2.5 p-2 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {checklist[item.key] ? (
                    <CheckSquare className="w-4 h-4 text-primary-600 shrink-0" />
                  ) : (
                    <UncheckedSquare className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  <span className={checklist[item.key] ? 'font-medium text-gray-900 dark:text-white' : ''}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* My Notes Area */}
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
                My Actor's Notes & Observations
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What felt organic? Where did I rush? What eye shift will I adjust next time?"
                rows={3}
                className="w-full p-2.5 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={handleSaveEvaluation}
              className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-primary-600/20"
            >
              <Save className="w-4 h-4" />
              Save Performance Evaluation (+30 XP)
            </button>

            {savedSuccess && (
              <p className="text-xs text-center text-emerald-600 dark:text-emerald-400 font-semibold animate-fade-in">
                ✓ Performance notes saved to your Acting Progress!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
