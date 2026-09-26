import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Filter,
  Check,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MistakeCategory } from '../types';
import { AudioButton } from '../components/common/AudioButton';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';

export const MistakeBankPage: React.FC = () => {
  const { mistakes, resolveMistake } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [retryInput, setRetryInput] = useState<string>('');
  const [retrySuccessId, setRetrySuccessId] = useState<string | null>(null);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'grammar', label: 'Grammar' },
    { id: 'vocabulary', label: 'Vocabulary' },
    { id: 'pronunciation', label: 'Pronunciation' },
    { id: 'word_order', label: 'Word Order' },
    { id: 'spelling', label: 'Spelling' },
    { id: 'natural_expression', label: 'Natural Expression' },
  ];

  const filteredMistakes = mistakes.filter((m) => {
    if (selectedCategory === 'all') return true;
    return m.category === selectedCategory;
  });

  const unresolvedCount = mistakes.filter((m) => !m.resolved).length;
  const resolvedCount = mistakes.filter((m) => m.resolved).length;

  const handleStartRetry = (id: string, initialText: string) => {
    setRetryingId(id);
    setRetryInput(initialText);
    setRetrySuccessId(null);
  };

  const handleSubmitRetry = (id: string) => {
    resolveMistake(id);
    setRetrySuccessId(id);
    setTimeout(() => {
      setRetryingId(null);
      setRetrySuccessId(null);
      setRetryInput('');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Mistake Bank
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Turn slip-ups into second nature. Guided by the empathetic AI Confidence Coach.
          </p>
        </div>

        {/* Counter badges */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
            {unresolvedCount} In Progress
          </span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
            {resolvedCount} Mastered
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {filteredMistakes.map((item) => {
          const isRetrying = retryingId === item.id;
          const isSuccess = retrySuccessId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-3xl border bg-white p-6 shadow-card transition-all dark:bg-slate-900 ${
                item.resolved
                  ? 'border-emerald-200/60 opacity-90 dark:border-emerald-900/40'
                  : 'border-slate-200/90 dark:border-slate-800'
              }`}
            >
              {/* Top Card Meta */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-amber-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                    {item.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">
                    Recorded {item.createdAt} • {item.attemptsCount} attempt{item.attemptsCount > 1 ? 's' : ''}
                  </span>
                </div>

                {item.resolved ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Resolved & Mastered
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Needs Practice
                  </span>
                )}
              </div>

              {/* What You Said vs Better Version Comparison */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* What you said */}
                <div className="rounded-2xl bg-rose-50/50 p-4 border border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    What you said:
                  </div>
                  <div className="mt-1 text-base font-semibold text-rose-950 dark:text-rose-200">
                    "{item.whatYouSaid}"
                  </div>
                </div>

                {/* Better version with 3-tier language hierarchy */}
                <div className="rounded-2xl bg-emerald-50/50 p-4 border border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2 border-b border-emerald-100/60 pb-1 dark:border-slate-800">
                    Better Natural Version:
                  </div>
                  <TargetLanguageBlock
                    content={{
                      native: item.nativeScript,
                      romanization: item.romanization,
                      englishMeaning: item.betterVersion,
                    }}
                    size="md"
                    showAudio={true}
                  />
                </div>
              </div>

              {/* Confidence Coach Breakdown: What you did well & Simple explanation */}
              <div className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">
                    What you did well:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.whatYouDidWell}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <span className="font-bold text-brand-700 dark:text-brand-400 shrink-0">
                    Why & English Explanation:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.simpleExplanation}
                  </span>
                </div>

                <div className="flex items-start gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700">
                  <span className="font-bold text-slate-600 dark:text-slate-400 shrink-0">
                    Invitation to Retry:
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.invitationToRetry}
                  </span>
                </div>
              </div>

              {/* Retry Interactive Mode */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                {!isRetrying ? (
                  <button
                    onClick={() => handleStartRetry(item.id, item.betterVersion)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Practice Retry</span>
                  </button>
                ) : (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="text"
                      value={retryInput}
                      onChange={(e) => setRetryInput(e.target.value)}
                      placeholder="Type the corrected phrase..."
                      className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                    <button
                      onClick={() => handleSubmitRetry(item.id)}
                      className="rounded-xl bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700"
                    >
                      {isSuccess ? 'Mastered! 🎉' : 'Verify Retry'}
                    </button>
                    <button
                      onClick={() => setRetryingId(null)}
                      className="text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {!item.resolved && !isRetrying && (
                  <button
                    onClick={() => resolveMistake(item.id)}
                    className="text-xs font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    Mark as Resolved (+20 XP)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
