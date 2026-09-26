import React from 'react';
import { useApp } from '../../context/AppContext';
import { EMOTIONS_DATA } from '../../data/actingData';
import { Flame, Award, BookOpen, Mic, Smile, ShieldCheck, ClipboardCheck, CheckCircle2 } from 'lucide-react';

export const ActingProgressTab: React.FC = () => {
  const { actingProgress, currentLanguage } = useApp();

  const emotionsCount = actingProgress.practicedEmotions.length;
  const dialoguesCount = actingProgress.completedDialogues.length;
  const voiceExercisesCount = actingProgress.completedVoiceExercises.length;
  const challengesCount = actingProgress.completedChallenges.length;
  const evaluationsCount = actingProgress.selfEvaluations.length;
  const simulatedStreak = emotionsCount > 0 ? Math.min(emotionsCount, 5) : 0;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <Smile className="w-5 h-5 text-primary-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">{emotionsCount} / 20</div>
          <p className="text-[11px] text-gray-500 font-medium">Emotions Explored</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <BookOpen className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">{dialoguesCount}</div>
          <p className="text-[11px] text-gray-500 font-medium">Dialogues Delivered</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <Mic className="w-5 h-5 text-purple-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">{voiceExercisesCount}</div>
          <p className="text-[11px] text-gray-500 font-medium">Voice Drills</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">{challengesCount} / 7</div>
          <p className="text-[11px] text-gray-500 font-medium">Daily Sprints</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <ClipboardCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">{evaluationsCount}</div>
          <p className="text-[11px] text-gray-500 font-medium">Takes Evaluated</p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm text-center">
          <Flame className="w-5 h-5 text-orange-600 mx-auto mb-1" />
          <div className="text-xl font-bold text-gray-900 dark:text-white">{simulatedStreak}</div>
          <p className="text-[11px] text-gray-500 font-medium">Days Streak</p>
        </div>
      </div>

      {/* Transparent Metric Explanation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-200 dark:border-gray-700/60 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Transparent Progress Standards
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
            We track verified completions rather than simulated AI sentiment scores. Your progress reflects the deliberate takes you rehearse, the 8-point self-audits you complete, and the challenges you conquer in {currentLanguage.name}.
          </p>
        </div>
      </div>

      {/* Practiced Emotions Matrix */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          Emotional Range Covered
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Mastering versatile emotional delivery requires stepping outside your comfort zone.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
          {EMOTIONS_DATA.map((emotion) => {
            const isPracticed = actingProgress.practicedEmotions.includes(emotion.id);
            return (
              <div
                key={emotion.id}
                className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                  isPracticed
                    ? 'bg-primary-50/70 dark:bg-primary-950/30 border-primary-200 dark:border-primary-800/50'
                    : 'bg-gray-50/50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-800 opacity-60'
                }`}
              >
                <span className="text-lg">{emotion.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                    {emotion.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {isPracticed ? '✓ Rehearsed' : 'Not yet'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Self-Evaluation History Log */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          Actor's Rehearsal Log & Self-Critique History
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Detailed notes and audits saved during Camera Practice studio takes.
        </p>

        {actingProgress.selfEvaluations.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <ClipboardCheck className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-medium">No rehearsal takes recorded yet.</p>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Head over to Camera Practice, turn on your mirror viewfinder, and complete a self-evaluation!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {actingProgress.selfEvaluations.slice(-5).reverse().map((evalRecord, idx) => {
              const checkedPoints = Object.values(evalRecord.checklist).filter(Boolean).length;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/60 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 capitalize">
                        {evalRecord.emotion}
                      </span>
                      <span className="text-xs text-gray-500">
                        {evalRecord.date}
                      </span>
                    </div>

                    {evalRecord.notes ? (
                      <p className="text-xs text-gray-800 dark:text-gray-200 italic mt-1.5">
                        "{evalRecord.notes}"
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No written notes entered.</p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/40">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {checkedPoints} / 8 Criteria Met
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
