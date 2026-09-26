import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ACTING_CHALLENGES } from '../../data/actingData';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';
import { Trophy, CheckCircle, Volume2, Sparkles, Flame, Clock } from 'lucide-react';
import { ttsService } from '../../services/ttsService';

export const ActingChallengesTab: React.FC = () => {
  const { currentLanguage, actingProgress, recordChallengeCompletion } = useApp();
  const [activeDay, setActiveDay] = useState<number>(1);

  const currentChallenge = ACTING_CHALLENGES.find(c => c.day === activeDay) || ACTING_CHALLENGES[0];
  const isCompleted = actingProgress.completedChallenges.includes(currentChallenge.day);

  const handleComplete = () => {
    recordChallengeCompletion(currentChallenge.day);
  };

  const completedCount = actingProgress.completedChallenges.length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-200" />
            7-Day Emotional Acting Sequence
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Daily Acting Mastery Sprint</h2>
          <p className="text-sm text-amber-100 mt-1">
            Build true emotional agility in {currentLanguage.name}. Practice one concentrated challenge per day to train voice restraint, subtle eyes, and authentic delivery.
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1.5 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              {completedCount} / 7 Challenges Done
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-3 py-1.5 rounded-xl">
              <Flame className="w-4 h-4 text-amber-300" />
              +50 XP per Completion
            </span>
          </div>
        </div>
      </div>

      {/* Days Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {ACTING_CHALLENGES.map((challenge) => {
          const done = actingProgress.completedChallenges.includes(challenge.day);
          const isSelected = challenge.day === activeDay;

          return (
            <button
              key={challenge.day}
              onClick={() => setActiveDay(challenge.day)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all border ${
                isSelected
                  ? 'bg-primary-600 text-white border-primary-500 shadow-md shadow-primary-500/20'
                  : done
                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                Day {challenge.day}
              </span>
              <span className="text-xs font-semibold mt-1 capitalize line-clamp-1">
                {challenge.emotion}
              </span>
              <div className="mt-2">
                {done ? (
                  <CheckCircle className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                ) : (
                  <Clock className={`w-4 h-4 ${isSelected ? 'text-white/80' : 'text-gray-400'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Challenge Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300">
                Day {currentChallenge.day}
              </span>
              <span className="text-xs font-semibold text-gray-500 capitalize">
                Target Emotion: {currentChallenge.emotion}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
              {currentChallenge.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{currentChallenge.description}</p>
          </div>

          {isCompleted ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Completed (+50 XP)
            </div>
          ) : (
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm transition-all shadow-md shadow-primary-600/20"
            >
              <Sparkles className="w-4 h-4" />
              Mark Challenge as Completed
            </button>
          )}
        </div>

        {/* Practice Prompt Phrase */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Practice Phrase in {currentLanguage.name}
            </span>
            <button
              onClick={() => ttsService.speak(currentChallenge.promptPhrase, currentLanguage.code)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-primary-600 transition-colors flex items-center gap-1 text-xs font-medium"
              title="Listen pronunciation"
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </button>
          </div>

          <TargetLanguageBlock
            content={{
              native: currentChallenge.promptPhrase,
              romanization: `Pronounce with authentic ${currentChallenge.emotion} inflection`,
              englishMeaning: currentChallenge.description,
            }}
            size="lg"
          />
        </div>

        {/* Instructions list */}
        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
          <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
            Actor's Objective & Instructions
          </h4>
          <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            {currentChallenge.instructions.map((inst, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{inst}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
