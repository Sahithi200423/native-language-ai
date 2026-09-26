import React from 'react';
import { CheckCircle2, AlertCircle, Lightbulb, Sparkles, RotateCcw, Award } from 'lucide-react';
import { ConfidenceFeedback } from '../../types';
import { AudioButton } from './AudioButton';
import { TargetLanguageBlock } from './TargetLanguageBlock';

interface ConfidenceBannerProps {
  feedback: ConfidenceFeedback;
  onRetry?: () => void;
  className?: string;
}

export const ConfidenceBanner: React.FC<ConfidenceBannerProps> = ({
  feedback,
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition-all dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-slate-900 dark:text-white">
              AI Confidence Coach Feedback
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Constructive, empathetic guidance designed to build real fluency
            </p>
          </div>
        </div>

        {/* Holistic Score Badges */}
        {feedback.metrics && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
              <Award className="h-3.5 w-3.5" />
              Confidence {feedback.metrics.confidenceScore}%
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
              Pronunciation {feedback.metrics.pronunciationScore}%
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4">
        {/* 1. What You Did Well */}
        <div className="flex items-start gap-3 rounded-xl bg-emerald-50/70 p-3.5 text-slate-800 dark:bg-emerald-950/20 dark:text-slate-200">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
              What you did well
            </div>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {feedback.whatYouDidWell}
            </p>
          </div>
        </div>

        {/* 2. One Important Correction */}
        <div className="flex items-start gap-3 rounded-xl bg-amber-50/70 p-3.5 text-slate-800 dark:bg-amber-950/20 dark:text-slate-200">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              One important correction
            </div>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {feedback.oneImportantCorrection}
            </p>
          </div>
        </div>

        {/* 3. Simple Explanation in English */}
        <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 text-slate-800 dark:bg-slate-800/60 dark:text-slate-200">
          <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand-600 dark:text-brand-400" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Simple English Explanation
            </div>
            <p className="mt-0.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {feedback.simpleExplanation}
            </p>
          </div>
        </div>

        {/* 4. Better Version with 3-tier language hierarchy */}
        <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-4 dark:border-brand-900/40 dark:bg-brand-950/20">
          <div className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 mb-2 border-b border-brand-100 pb-1.5 dark:border-slate-800">
            Suggested Better Version
          </div>
          <TargetLanguageBlock
            content={{
              native: feedback.betterVersion.native,
              romanization: feedback.betterVersion.romanization,
              englishMeaning: feedback.betterVersion.englishMeaning,
            }}
            size="md"
            showAudio={true}
          />
        </div>

        {/* 5. Invitation to Try Again */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {feedback.invitationToTryAgain}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
