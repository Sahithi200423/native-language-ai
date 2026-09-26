import React, { useState } from 'react';
import {
  Sparkles,
  Volume2,
  CheckCircle2,
  Sliders,
  Eye,
  Smile,
  Mic,
  Activity,
  ArrowRight,
  Info,
  Clock,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EMOTIONS_DATA, ACTING_DIALOGUES } from '../../data/actingData';
import { EmotionType } from '../../types';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';
import { AudioButton } from '../../components/common/AudioButton';

interface EmotionPracticeTabProps {
  initialEmotion?: EmotionType;
  onNavigateTab: (tabId: string) => void;
}

export const EmotionPracticeTab: React.FC<EmotionPracticeTabProps> = ({
  initialEmotion = 'sadness',
  onNavigateTab,
}) => {
  const { currentLanguage, actingProgress, recordActingEmotionPractice } = useApp();

  const [selectedEmotionId, setSelectedEmotionId] = useState<EmotionType>(initialEmotion);
  const [selectedIntensity, setSelectedIntensity] = useState<number>(2);

  const currentEmotion =
    EMOTIONS_DATA.find((e) => e.id === selectedEmotionId) || EMOTIONS_DATA[1];

  // Find a matching dialogue for this emotion or use fallback
  const matchingDialogue =
    ACTING_DIALOGUES.find((d) => d.emotion === selectedEmotionId) ||
    ACTING_DIALOGUES[0];

  const translation =
    matchingDialogue.translations[currentLanguage.code] ||
    matchingDialogue.translations.te;

  const isPracticed = actingProgress.practicedEmotions.includes(selectedEmotionId);

  const handleMarkPracticed = () => {
    recordActingEmotionPractice(selectedEmotionId);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in">
      {/* Top Emotion Selector Carousel / Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Select Emotion to Study
          </span>
          <span className="text-xs text-slate-400">
            20 Distinct Emotional Delivery Guides
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {EMOTIONS_DATA.map((emo) => {
            const isSelected = emo.id === selectedEmotionId;
            return (
              <button
                key={emo.id}
                type="button"
                onClick={() => setSelectedEmotionId(emo.id)}
                className={`flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                }`}
              >
                <span>{emo.emoji}</span>
                <span>{emo.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Emotion Lesson Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 space-y-8">
        {/* Header: Emotion Title & What it communicates */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-5xl select-none">{currentEmotion.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Emotion Masterclass
                </span>
                {isPracticed && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Practiced
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {currentEmotion.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {currentEmotion.shortDescription}
              </p>
            </div>
          </div>

          <button
            onClick={handleMarkPracticed}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              isPracticed
                ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-brand-600 text-white hover:bg-brand-700 dark:bg-brand-500'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isPracticed ? 'Marked as Practiced' : 'Mark Emotion Practiced (+20 XP)'}</span>
          </button>
        </div>

        {/* Intensity Selector (1 to 4) */}
        <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Emotional Intensity Level: {selectedIntensity} of 4
              </span>
            </div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
              {currentEmotion.intensityLevels[selectedIntensity - 1]?.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {currentEmotion.intensityLevels.map((lvl) => {
              const isSelected = lvl.level === selectedIntensity;
              return (
                <button
                  key={lvl.level}
                  type="button"
                  onClick={() => setSelectedIntensity(lvl.level)}
                  className={`rounded-xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-white shadow-sm ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-slate-900'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>Level {lvl.level}</span>
                    <span className="text-[10px] text-slate-400">
                      {lvl.label}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-snug line-clamp-2">
                    {lvl.guidance}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* THOUGHT: Internal Character Monologue */}
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-5 dark:bg-amber-400/5 dark:border-amber-400/20">
          <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Character Internal Thought (Subtext)</span>
          </div>
          <p className="text-sm font-semibold italic text-slate-800 dark:text-slate-200">
            "{currentEmotion.thought || `I need the other person to understand how deeply this moment matters to me.`}"
          </p>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
            Always anchor the spoken dialogue in this underlying thought. If the thought is active, the eyes and micro-expressions will naturally align without forcing.
          </span>
        </div>

        {/* 4 Core Acting Pillar Cards: Face, Eyes, Voice, Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. FACE */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800 text-brand-600 dark:text-brand-400 font-bold text-sm uppercase tracking-wider">
              <Smile className="h-4 w-4" />
              <span>Face (Avoid Exaggeration)</span>
            </div>
            <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white">Overall: </strong>
                {currentEmotion.face.overall}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Eyebrows: </strong>
                {currentEmotion.face.eyebrows}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Forehead: </strong>
                {currentEmotion.face.forehead}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Mouth & Lips: </strong>
                {currentEmotion.face.mouth}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Jaw Tension: </strong>
                {currentEmotion.face.jaw}
              </div>
            </div>
          </div>

          {/* 2. EYES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800 text-amber-600 dark:text-amber-400 font-bold text-sm uppercase tracking-wider">
              <Eye className="h-4 w-4" />
              <span>Eyes (Emotional Focus)</span>
            </div>
            <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white">Gaze & Focus: </strong>
                {currentEmotion.face.eyes}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Looking Down / Away: </strong>
                Avert gaze during internal calculation or deep feeling; re-engage when delivering the crucial verb.
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Camera Awareness: </strong>
                Avoid unblinking robot stares into the lens. Natural eyes breathe and discover thoughts in real-time.
              </div>
            </div>
          </div>

          {/* 3. VOICE & MODULATION */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <Mic className="h-4 w-4" />
              <span>Voice & Vocal Modulation</span>
            </div>
            <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white">Pitch Register: </strong>
                {currentEmotion.voice.pitch}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Volume: </strong>
                {currentEmotion.voice.volume}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Speaking Speed: </strong>
                {currentEmotion.voice.speed}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Vocal Energy: </strong>
                {currentEmotion.voice.energy}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Emotional Tone: </strong>
                {currentEmotion.voice.emotionalTone}
              </div>
            </div>
          </div>

          {/* 4. BODY LANGUAGE & PAUSES */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <Activity className="h-4 w-4" />
              <span>Body Language & Pauses</span>
            </div>
            <div className="mt-3 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div>
                <strong className="text-slate-900 dark:text-white">Spine & Posture: </strong>
                {currentEmotion.body.posture}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Shoulders: </strong>
                {currentEmotion.body.shoulders}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Hands & Gestures: </strong>
                {currentEmotion.body.hands}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Breathing: </strong>
                {currentEmotion.body.breathing}
              </div>
              <div>
                <strong className="text-slate-900 dark:text-white">Strategic Pauses: </strong>
                {currentEmotion.voice.pauses}
              </div>
            </div>
          </div>
        </div>

        {/* Practice Dialogue in Current Target Language */}
        <div className="rounded-3xl border border-brand-100 bg-brand-50/30 p-6 dark:border-brand-900/40 dark:bg-brand-950/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-100/60 pb-3 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
              {currentLanguage.name} Acting Delivery Practice
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Situation: {matchingDialogue.situation}
            </span>
          </div>

          <TargetLanguageBlock
            content={{
              native: translation.native,
              romanization: translation.romanization,
              englishMeaning: translation.englishMeaning,
            }}
            size="lg"
            showAudio={true}
          />

          {/* Delivery & Pause Guidance Box */}
          <div className="rounded-2xl bg-white p-4 text-xs dark:bg-slate-900 border border-brand-100/80 dark:border-slate-800 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Delivery Map & Pauses:
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">Where to Pause: </strong>
              <span className="font-mono bg-amber-50 px-2 py-0.5 rounded text-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
                {translation.pauseGuidance}
              </span>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">Voice Modulation: </strong>
              <span className="text-slate-600 dark:text-slate-300">
                {matchingDialogue.delivery.voice}
              </span>
            </div>
            <div>
              <strong className="text-slate-900 dark:text-white">Eye Directives: </strong>
              <span className="text-slate-600 dark:text-slate-300">
                {matchingDialogue.delivery.eyes}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('camera')}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-all"
            >
              <span>Practice on Camera Mirror</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('dialogues')}
              className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              Try with 8 different emotions →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
