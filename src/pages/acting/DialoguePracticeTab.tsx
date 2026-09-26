import React, { useState } from 'react';
import {
  Sparkles,
  Repeat,
  Sliders,
  Filter,
  Volume2,
  CheckCircle2,
  Eye,
  Smile,
  Mic,
  Activity,
  ArrowRight,
  Info,
  Wand2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  ACTING_DIALOGUES,
  VERSATILE_BENCHMARK_DIALOGUE,
  EMOTIONS_DATA,
} from '../../data/actingData';
import { EmotionType } from '../../types';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';
import { AudioButton } from '../../components/common/AudioButton';

export const DialoguePracticeTab: React.FC = () => {
  const { currentLanguage, actingProgress, recordDialogueCompletion } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'versatile' | 'generator' | 'catalog'>('versatile');

  // Versatile State (1 Line, 8 Emotions)
  const [selectedVersatileEmotion, setSelectedVersatileEmotion] = useState<string>('sadness');
  const versatileTr =
    VERSATILE_BENCHMARK_DIALOGUE.translations[currentLanguage.code] ||
    VERSATILE_BENCHMARK_DIALOGUE.translations.te;
  const currentDelivery =
    VERSATILE_BENCHMARK_DIALOGUE.deliveries[selectedVersatileEmotion] ||
    VERSATILE_BENCHMARK_DIALOGUE.deliveries.sadness;

  // Generator State
  const [genEmotion, setGenEmotion] = useState<EmotionType>('sadness');
  const [genIntensity, setGenIntensity] = useState<'Mild' | 'Medium' | 'Strong'>('Medium');
  const [genSituation, setGenSituation] = useState<string>('Goodbye');
  const [generatedResult, setGeneratedResult] = useState<{
    id: string;
    targetScript: string;
    romanization: string;
    englishMeaning: string;
    pause: string;
    delivery: { voice: string; eyes: string; face: string; body: string };
  } | null>(null);

  const situations = [
    'Love',
    'Family',
    'Friendship',
    'Argument',
    'Goodbye',
    'Success',
    'Failure',
    'Betrayal',
    'Fear',
    'Celebration',
    'Audition',
  ];

  const handleGenerateDialogue = () => {
    // Matches or dynamically selects from the local structured database
    const matched = ACTING_DIALOGUES.find((d) => d.emotion === genEmotion) || ACTING_DIALOGUES[0];
    const tr = matched.translations[currentLanguage.code] || matched.translations.te;

    setGeneratedResult({
      id: `gen-${Date.now()}`,
      targetScript: tr.native,
      romanization: tr.romanization,
      englishMeaning: tr.englishMeaning,
      pause: tr.pauseGuidance,
      delivery: matched.delivery,
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Sub-navigation Tabs in English */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Performance Lab
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Acting Dialogue Practice
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Learn that acting is not changing words — it is transforming thought, eyes, voice, pauses, and body language.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setActiveSubTab('versatile')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeSubTab === 'versatile'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            1 Line, 8 Emotions
          </button>
          <button
            onClick={() => setActiveSubTab('generator')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeSubTab === 'generator'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Dialogue Generator
          </button>
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeSubTab === 'catalog'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400'
            }`}
          >
            Dialogue Library
          </button>
        </div>
      </div>

      {/* SECTION 1: SAME DIALOGUE + DIFFERENT EMOTIONS (1 LINE, 8 EMOTIONS) */}
      {activeSubTab === 'versatile' && (
        <div className="space-y-6">
          {/* Main Sentence Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  Universal Dramatic Line in {currentLanguage.name}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  "{VERSATILE_BENCHMARK_DIALOGUE.englishBase}"
                </h3>
              </div>
              <AudioButton
                text={versatileTr.romanization}
                size="md"
                variant="filled"
                label="Listen"
              />
            </div>

            {/* Target Language Representation */}
            <TargetLanguageBlock
              content={{
                native: versatileTr.native,
                romanization: versatileTr.romanization,
                englishMeaning: VERSATILE_BENCHMARK_DIALOGUE.englishBase,
              }}
              size="lg"
            />

            {/* Emotion Switcher Chips */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Select Emotion to Deliver This Exact Sentence:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'sadness', label: 'Sadness', emoji: '😢' },
                  { key: 'anger', label: 'Anger', emoji: '😡' },
                  { key: 'fear', label: 'Fear', emoji: '😨' },
                  { key: 'shock', label: 'Shock', emoji: '😲' },
                  { key: 'love', label: 'Love', emoji: '❤️' },
                  { key: 'frustration', label: 'Frustration', emoji: '😤' },
                  { key: 'calm', label: 'Calm', emoji: '😌' },
                  { key: 'longing', label: 'Vulnerable / Longing', emoji: '🥺' },
                ].map((emo) => {
                  const isSelected = selectedVersatileEmotion === emo.key;
                  return (
                    <button
                      key={emo.key}
                      onClick={() => setSelectedVersatileEmotion(emo.key)}
                      className={`flex items-center gap-2 rounded-2xl border p-3 text-left transition-all ${
                        isSelected
                          ? 'border-brand-500 bg-brand-50/80 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/60'
                          : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xl">{emo.emoji}</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {emo.label}
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize">
                          {emo.key}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed How Delivery Changes Box */}
            <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-6 dark:border-brand-900/40 dark:bg-brand-950/20 space-y-4">
              <div className="flex items-center justify-between border-b border-brand-100/60 pb-3 dark:border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                  How Delivery Changes for {currentDelivery.emotion.toUpperCase()}:
                </span>
                <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-bold text-brand-800 dark:bg-brand-900 dark:text-brand-200">
                  Intensity: {currentDelivery.intensity}
                </span>
              </div>

              {/* Internal Thought (Subtext) */}
              <div className="rounded-xl bg-white p-3.5 dark:bg-slate-900 border border-brand-100 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Actor's Internal Subtext (What you think before speaking):
                </span>
                <p className="mt-1 text-sm font-semibold italic text-slate-800 dark:text-slate-200">
                  "{currentDelivery.thought}"
                </p>
              </div>

              {/* 6 Specific Delivery Changes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1">
                    <Eye className="h-3.5 w-3.5" />
                    <span>Eyes & Gaze:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentDelivery.eyes}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1.5 mb-1">
                    <Smile className="h-3.5 w-3.5" />
                    <span>Facial Expression:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentDelivery.face}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
                    <Mic className="h-3.5 w-3.5" />
                    <span>Voice & Pace:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentDelivery.voice} ({currentDelivery.pace})
                  </p>
                </div>

                <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <div className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 mb-1">
                    <Activity className="h-3.5 w-3.5" />
                    <span>Body Language:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {currentDelivery.body}
                  </p>
                </div>
              </div>

              {/* Pause Notation */}
              <div className="rounded-xl bg-amber-50/80 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
                <strong>Where to Place the Pause: </strong>
                <span className="font-mono">{currentDelivery.pause}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: EMOTION → DIALOGUE GENERATOR */}
      {activeSubTab === 'generator' && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Curated Practice Builder
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Generate Structured Acting Dialogue
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Notice: Powered by local structured dramatic syllabus for {currentLanguage.name}.
              </p>
            </div>

            {/* 1. Choose Emotion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                1. Choose Emotion:
              </label>
              <div className="flex flex-wrap gap-2">
                {EMOTIONS_DATA.slice(0, 10).map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setGenEmotion(e.id)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      genEmotion === e.id
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{e.emoji} {e.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Choose Intensity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                2. Choose Intensity:
              </label>
              <div className="flex gap-2">
                {(['Mild', 'Medium', 'Strong'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setGenIntensity(lvl)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      genIntensity === lvl
                        ? 'bg-brand-600 text-white dark:bg-brand-500'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Choose Situation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                3. Choose Dramatic Situation:
              </label>
              <div className="flex flex-wrap gap-2">
                {situations.map((sit) => (
                  <button
                    key={sit}
                    onClick={() => setGenSituation(sit)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                      genSituation === sit
                        ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                        : 'border border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {sit}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateDialogue}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-95 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <Wand2 className="h-4 w-4" />
              <span>Generate Structured Practice Dialogue</span>
            </button>

            {/* Generated Dialogue Result */}
            {generatedResult && (
              <div className="rounded-2xl border border-brand-200 bg-brand-50/40 p-6 dark:border-brand-900 dark:bg-brand-950/20 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-brand-100 pb-2 dark:border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                    Generated {currentLanguage.name} Scene ({genSituation} • {genEmotion})
                  </span>
                  <span className="text-[11px] text-slate-400">Local Content System</span>
                </div>

                <TargetLanguageBlock
                  content={{
                    native: generatedResult.targetScript,
                    romanization: generatedResult.romanization,
                    englishMeaning: generatedResult.englishMeaning,
                  }}
                  size="lg"
                  showAudio={true}
                />

                <div className="rounded-xl bg-white p-3 text-xs dark:bg-slate-900 border border-brand-100 dark:border-slate-800 space-y-1">
                  <div>
                    <strong>Pause Timing: </strong>
                    <span className="font-mono text-brand-600 dark:text-brand-400">
                      {generatedResult.pause}
                    </span>
                  </div>
                  <div>
                    <strong>Vocal Cue: </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {generatedResult.delivery.voice}
                    </span>
                  </div>
                  <div>
                    <strong>Eye & Face: </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {generatedResult.delivery.eyes} {generatedResult.delivery.face}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 3: CATALOG OF SHORT ACTING DIALOGUES */}
      {activeSubTab === 'catalog' && (
        <div className="space-y-4">
          {ACTING_DIALOGUES.map((dial) => {
            const tr = dial.translations[currentLanguage.code] || dial.translations.te;
            const isDone = actingProgress.completedDialogues.includes(dial.id);

            return (
              <div
                key={dial.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                      {dial.emotion}
                    </span>
                    <span className="text-xs text-slate-400">
                      Situation: {dial.situation} • Intensity: {dial.intensity}
                    </span>
                  </div>

                  <button
                    onClick={() => recordDialogueCompletion(dial.id)}
                    className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isDone ? 'Completed ✓' : 'Mark Completed (+25 XP)'}</span>
                  </button>
                </div>

                <TargetLanguageBlock
                  content={{
                    native: tr.native,
                    romanization: tr.romanization,
                    englishMeaning: tr.englishMeaning,
                  }}
                  size="md"
                  showAudio={true}
                />

                <div className="rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    How to Deliver:
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Pause: </strong>
                    <span className="font-mono bg-amber-50 px-2 py-0.5 rounded text-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
                      {tr.pauseGuidance}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Voice: </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {dial.delivery.voice}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Eyes: </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {dial.delivery.eyes}
                    </span>
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Body: </strong>
                    <span className="text-slate-600 dark:text-slate-300">
                      {dial.delivery.body}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
