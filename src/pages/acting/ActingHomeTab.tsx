import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  Video,
  Mic,
  Eye,
  Smile,
  Layers,
  Repeat,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EMOTIONS_DATA, VERSATILE_BENCHMARK_DIALOGUE } from '../../data/actingData';
import { EmotionType } from '../../types';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';

interface ActingHomeTabProps {
  onSelectEmotion: (emotionId: EmotionType) => void;
  onNavigateTab: (tabId: string) => void;
}

export const ActingHomeTab: React.FC<ActingHomeTabProps> = ({
  onSelectEmotion,
  onNavigateTab,
}) => {
  const { currentLanguage, actingProgress } = useApp();

  const benchmarkTr =
    VERSATILE_BENCHMARK_DIALOGUE.translations[currentLanguage.code] ||
    VERSATILE_BENCHMARK_DIALOGUE.translations.te;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-brand-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold backdrop-blur border border-white/10">
            <span>🎭</span>
            <span>Natural Indian Language Performance</span>
            <span className="text-brand-300">• {currentLanguage.name}</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Acting & Emotional Expression
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Learn to express emotions naturally while speaking {currentLanguage.name}. Master voice modulation, pauses, facial expressions, eye acting, and body language through English instruction.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('dialogues')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-md hover:bg-slate-100 active:scale-95 transition-all"
            >
              <span>Explore Acting Dialogues</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onNavigateTab('camera')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-all border border-white/15"
            >
              <Video className="h-4 w-4 text-rose-400" />
              <span>Camera Practice Mirror</span>
            </button>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10 hidden lg:block select-none pointer-events-none text-9xl">
          🎭
        </div>
      </div>

      {/* Acting Metrics Snapshot */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Emotions Practiced
          </span>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {actingProgress.practicedEmotions.length} / {EMOTIONS_DATA.length}
          </div>
          <div className="mt-1 text-xs text-brand-600 dark:text-brand-400 font-medium">
            Active Study
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Dialogues Mastered
          </span>
          <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {actingProgress.completedDialogues.length}
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Delivered in {currentLanguage.name}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Daily Challenges
          </span>
          <div className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
            {actingProgress.completedChallenges.length} / 7
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Week 1 Active
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Self-Evaluations
          </span>
          <div className="mt-1 text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {actingProgress.selfEvaluations.length}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Saved Notes
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('dialogues')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:border-brand-500 hover:shadow-card-hover transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400 mb-3">
            <Repeat className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            1 Line, 8 Emotions
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            See how the exact same {currentLanguage.name} sentence transforms with sadness, anger, love, fear, and calm.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('voice')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:border-emerald-500 hover:shadow-card-hover transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 mb-3">
            <Mic className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Voice & Modulation
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Pitch, pauses, breath, and volume control to stop sounding like a robot reading a textbook.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('facial')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:border-amber-500 hover:shadow-card-hover transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400 mb-3">
            <Eye className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            Eye & Face Acting
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Subtle eyebrow movement, unblinking focus, looking away, and natural micro-expressions.
          </p>
        </div>

        <div
          onClick={() => onNavigateTab('challenges')}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-card hover:border-purple-500 hover:shadow-card-hover transition-all dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400 mb-3">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            7-Day Challenges
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Daily prompts to stretch your emotional range and build authentic confidence on camera.
          </p>
        </div>
      </div>

      {/* Featured Versatile Benchmark Preview */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Benchmark Acting Exercise
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              The Versatile Sentence: "{VERSATILE_BENCHMARK_DIALOGUE.englishBase}"
            </h3>
          </div>
          <button
            onClick={() => onNavigateTab('dialogues')}
            className="text-xs font-bold text-brand-600 hover:underline dark:text-brand-400"
          >
            Practice all 8 emotions →
          </button>
        </div>

        <div className="mt-4">
          <TargetLanguageBlock
            content={{
              native: benchmarkTr.native,
              romanization: benchmarkTr.romanization,
              englishMeaning: VERSATILE_BENCHMARK_DIALOGUE.englishBase,
            }}
            size="lg"
            showAudio={true}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 pt-2">
          {['sadness', 'anger', 'fear', 'shock', 'love', 'frustration', 'calm', 'longing'].map(
            (eKey) => {
              const delivery = VERSATILE_BENCHMARK_DIALOGUE.deliveries[eKey];
              return (
                <span
                  key={eKey}
                  onClick={() => onNavigateTab('dialogues')}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all"
                >
                  <span className="capitalize">{eKey}:</span>
                  <span className="font-normal text-slate-500 dark:text-slate-400">
                    {delivery?.intensity || eKey}
                  </span>
                </span>
              );
            }
          )}
        </div>
      </div>

      {/* 20 Clickable Emotion Cards Grid */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Explore 20 Emotional Palettes
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Click any emotion to view dedicated facial, vocal, eye, pause, and intensity guidance.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {actingProgress.practicedEmotions.length} Practiced
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {EMOTIONS_DATA.map((emo) => {
            const isPracticed = actingProgress.practicedEmotions.includes(emo.id);
            return (
              <button
                key={emo.id}
                type="button"
                onClick={() => onSelectEmotion(emo.id)}
                className={`group flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-150 ${
                  isPracticed
                    ? 'border-emerald-200 bg-white dark:border-emerald-950/60 dark:bg-slate-900 shadow-sm'
                    : 'border-slate-200/90 bg-white hover:border-brand-400 hover:shadow-card dark:border-slate-800 dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl select-none">{emo.emoji}</span>
                    {isPracticed && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <h4 className="mt-2.5 font-bold text-slate-900 dark:text-white text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {emo.name}
                  </h4>
                  <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {emo.shortDescription}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-semibold text-brand-600 dark:text-brand-400">
                  <span>Learn Delivery</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
