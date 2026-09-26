import React from 'react';
import { Info, Dumbbell } from 'lucide-react';
import { LearningPhrase } from '../../types';
import { AudioButton } from '../common/AudioButton';
import { useApp } from '../../context/AppContext';

interface PhraseDisplayCardProps {
  phrase: LearningPhrase;
  showBreakdown?: boolean;
  onPracticeClick?: () => void;
  className?: string;
}

export const PhraseDisplayCard: React.FC<PhraseDisplayCardProps> = ({
  phrase,
  showBreakdown = true,
  onPracticeClick,
  className = '',
}) => {
  const { profile, currentLanguage } = useApp();

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 bg-white p-6 shadow-card transition-all duration-200 dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* 1. English Concept / Explanation Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            English Concept
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            "{phrase.english}"
          </h3>
        </div>
        <AudioButton
          text={phrase.romanization}
          size="md"
          variant="pill"
          label="Listen"
        />
      </div>

      {/* 2. Structured Target Content Box */}
      <div className="my-5 space-y-4 rounded-2xl bg-slate-50/70 p-5 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
        {/* Primary: Target Native Script */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {currentLanguage.name} (Native Script)
          </div>
          <div className="mt-1 text-2xl sm:text-3xl font-bold font-telugu text-slate-900 dark:text-slate-100">
            {phrase.native}
          </div>
        </div>

        {/* Secondary: Romanization */}
        {profile.settings.showRomanization && (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Romanization
            </div>
            <div className="text-base sm:text-lg font-semibold text-brand-700 dark:text-brand-300">
              {phrase.romanization}
            </div>
          </div>
        )}

        {/* Supporting: Pronunciation Guidance */}
        {profile.settings.showPronunciationGuide && (
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              English Pronunciation Guidance
            </div>
            <div className="mt-0.5 inline-block rounded-md bg-amber-50 px-2.5 py-1 text-sm font-mono font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-200">
              🗣️ {phrase.pronunciationGuide}
            </div>
          </div>
        )}

        {/* Supporting: English Meaning */}
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            English Meaning
          </div>
          <div className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
            {phrase.englishMeaning}
          </div>
        </div>
      </div>

      {/* Cultural Context Note */}
      {phrase.culturalNote && (
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-sky-50/80 p-3 text-xs text-sky-800 dark:bg-sky-950/40 dark:text-sky-200 border border-sky-100 dark:border-sky-900/30">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
          <span className="leading-relaxed">{phrase.culturalNote}</span>
        </div>
      )}

      {/* Word-by-Word Breakdown */}
      {showBreakdown && phrase.breakdown && phrase.breakdown.length > 0 && (
        <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Word-by-Word Breakdown
          </div>
          <div className="flex flex-wrap gap-2">
            {phrase.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs shadow-xs dark:border-slate-700 dark:bg-slate-800"
              >
                <span className="font-bold text-slate-900 dark:text-white font-telugu">
                  {item.word}
                </span>{' '}
                <span className="text-brand-600 dark:text-brand-400 font-semibold">
                  ({item.romanized})
                </span>
                <span className="text-slate-600 dark:text-slate-300"> = {item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice Button */}
      {onPracticeClick && (
        <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onPracticeClick}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <Dumbbell className="h-3.5 w-3.5" />
            <span>Practice This Phrase</span>
          </button>
        </div>
      )}
    </div>
  );
};
