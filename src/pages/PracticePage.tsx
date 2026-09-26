import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  Award,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TELUGU_LESSONS } from '../data/lessonsData';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { PracticeExercise, PracticeOption } from '../types';

export const PracticePage: React.FC = () => {
  const { profile, updateProfile, addMistake, currentLanguage } = useApp();

  const allExercises: PracticeExercise[] = TELUGU_LESSONS.flatMap(
    (l) => l.practiceExercises
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentExercise = allExercises[currentIndex];

  // User-facing English label for exercise types
  const getExerciseTypeLabel = (type: PracticeExercise['type']) => {
    switch (type) {
      case 'translate_to_target':
        return `TRANSLATE TO ${currentLanguage.name.toUpperCase()}`;
      case 'multiple_choice':
        return 'MULTIPLE CHOICE';
      case 'audio_listen':
        return 'LISTENING COMPREHENSION';
      case 'arrange_words':
        return 'SENTENCE STRUCTURE';
      default:
        return 'PRACTICE QUESTION';
    }
  };

  const handleSelectOption = (optId: string) => {
    if (!isAnswerChecked) {
      setSelectedOptionId(optId);
    }
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOptionId === currentExercise.correctOptionId;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      updateProfile({ totalXp: profile.totalXp + 15 });
    } else {
      const selected = currentExercise.options.find((o) => o.id === selectedOptionId);
      const correct = currentExercise.options.find(
        (o) => o.id === currentExercise.correctOptionId
      );

      if (selected && correct) {
        addMistake({
          languageCode: currentLanguage.code,
          category: 'vocabulary',
          whatYouSaid: `${selected.romanization} (${selected.englishMeaning})`,
          betterVersion: `${correct.romanization} (${correct.englishMeaning})`,
          nativeScript: correct.native,
          romanization: correct.romanization,
          whatYouDidWell: 'Good attempt to identify the context!',
          simpleExplanation: currentExercise.explanation,
          invitationToRetry: 'Review the question and try again.',
        });
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < allExercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsQuizComplete(false);
  };

  if (isQuizComplete) {
    const percentage = Math.round((score / allExercises.length) * 100);
    return (
      <div className="max-w-xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-card dark:border-slate-800 dark:bg-slate-900 animate-in fade-in">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
          <Award className="h-8 w-8" />
        </div>
        <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
          Practice Drill Complete!
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          You scored {score} out of {allExercises.length} ({percentage}%)
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 text-sm text-slate-600 dark:text-slate-300">
          {percentage >= 80 ? (
            <p className="text-emerald-600 font-semibold dark:text-emerald-400">
              Outstanding work! You have a solid grasp over essential {currentLanguage.name} phrases.
            </p>
          ) : (
            <p className="text-amber-600 font-semibold dark:text-amber-400">
              Keep practicing! We’ve added the missed phrases to your Mistake Bank for quick, supportive review.
            </p>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Practice Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
      {/* Header & Progress Indicator in English */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Interactive Practice
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Daily Drill #{currentIndex + 1}
          </h2>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Question {currentIndex + 1} of {allExercises.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-brand-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / allExercises.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900">
        {/* User-facing English label */}
        <div className="inline-block rounded-md bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {getExerciseTypeLabel(currentExercise.type)}
        </div>

        {/* English Prompt */}
        <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {currentExercise.prompt}
        </h3>

        {/* Options using TargetLanguageBlock: 1. Native script, 2. Romanization, 3. English meaning */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {currentExercise.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrect = option.id === currentExercise.correctOptionId;

            let cardStyles =
              'border-slate-200 bg-white hover:border-brand-400 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-slate-700';

            if (isAnswerChecked) {
              if (isCorrect) {
                cardStyles =
                  'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 dark:border-emerald-500';
              } else if (isSelected) {
                cardStyles =
                  'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 dark:border-rose-500';
              }
            } else if (isSelected) {
              cardStyles =
                'border-brand-600 bg-brand-50/80 ring-2 ring-brand-500/20 dark:bg-brand-950/40 dark:border-brand-500';
            }

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={`relative flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${cardStyles}`}
              >
                {/* Option Letter Indicator */}
                <div className="flex items-center justify-between mb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {String.fromCharCode(65 + idx)}
                  </span>

                  {isAnswerChecked && isCorrect && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                      Correct
                    </span>
                  )}

                  {isAnswerChecked && isSelected && !isCorrect && (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-500">
                      <XCircle className="h-4 w-4" />
                      Incorrect
                    </span>
                  )}
                </div>

                {/* Target Language 3-tier block */}
                <TargetLanguageBlock
                  content={{
                    native: option.native,
                    romanization: option.romanization,
                    englishMeaning: option.englishMeaning,
                  }}
                  size="sm"
                  showMeaning={true}
                />
              </button>
            );
          })}
        </div>

        {/* English Feedback Explanation */}
        {isAnswerChecked && (
          <div
            className={`mt-6 rounded-2xl p-4 text-sm ${
              selectedOptionId === currentExercise.correctOptionId
                ? 'bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200'
                : 'bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {selectedOptionId === currentExercise.correctOptionId ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Learning Explanation:</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed">
              {currentExercise.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons in English */}
        <div className="mt-6 flex justify-end">
          {!isAnswerChecked ? (
            <button
              disabled={!selectedOptionId}
              onClick={handleCheckAnswer}
              className="rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 disabled:opacity-40 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <span>{currentIndex === allExercises.length - 1 ? 'Finish Drill' : 'Continue'}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
