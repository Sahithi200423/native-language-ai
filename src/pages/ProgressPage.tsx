import React from 'react';
import {
  TrendingUp,
  Award,
  Flame,
  Calendar,
  Zap,
  BookOpen,
  BookmarkCheck,
  Mic,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgressPage: React.FC = () => {
  const { profile, currentLanguage, vocabulary, mistakes, lessons } = useApp();

  const learnedWords = vocabulary.filter((v) => v.isLearned).length;
  const completedLessons = lessons.filter((l) => l.completed).length;
  const resolvedMistakes = mistakes.filter((m) => m.resolved).length;

  const skillMetrics = [
    { label: 'Pronunciation Clarity', score: 86, color: 'bg-emerald-500' },
    { label: 'Grammar & Verb Endings', score: 82, color: 'bg-brand-500' },
    { label: 'Essential Vocabulary', score: 78, color: 'bg-indigo-500' },
    { label: 'Natural Expression', score: 80, color: 'bg-amber-500' },
    { label: 'Speaking Confidence', score: 89, color: 'bg-rose-500' },
  ];

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Analytics & Mastery
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Your Learning Progress
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tracking your transition from English support into confident {currentLanguage.name} fluency.
        </p>
      </div>

      {/* Top Stat Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Total XP</span>
            <Zap className="h-4 w-4 text-brand-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {profile.totalXp}
          </div>
          <div className="mt-1 text-xs text-brand-600 dark:text-brand-400">
            Level 2 Apprentice
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Streak</span>
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
            {profile.streakDays} Days
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Active habit
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Vocab Mastered</span>
            <BookmarkCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {learnedWords}
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
            {vocabulary.length} in syllabus
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Mistakes Overcome</span>
            <CheckCircle2 className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {resolvedMistakes}
          </div>
          <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400">
            Resolved with coach
          </div>
        </div>
      </div>

      {/* Two Column Layout: Weekly Activity + 5 Pillars Radar/Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Heatmap */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Weekly Consistency
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Daily Goal: {profile.goalMinutesPerDay} min
            </span>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day, idx) => {
              const isMet = idx < 4; // Mock first 4 days completed
              return (
                <div key={day} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-slate-400">{day}</span>
                  <div
                    className={`flex h-12 w-full items-center justify-center rounded-2xl font-bold text-xs transition-all ${
                      isMet
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'border border-dashed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-800/40'
                    }`}
                  >
                    {isMet ? '✓' : ''}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isMet ? '15m' : '-'}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Consistent 10-15 minute daily micro-sessions retain 4× more spoken vocabulary than one long weekly study block.
          </p>
        </div>

        {/* 5-Pillar Skill Assessment */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Coach Competency Matrix
            </h3>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Strong Flow
            </span>
          </div>

          <div className="mt-6 space-y-4">
            {skillMetrics.map((skill) => (
              <div key={skill.label} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{skill.label}</span>
                  <span>{skill.score}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-full ${skill.color} rounded-full transition-all duration-700`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
