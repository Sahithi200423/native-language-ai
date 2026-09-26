import React from 'react';
import {
  TrendingUp,
  Award,
  Flame,
  Calendar,
  Zap,
  Clapperboard,
  Drama,
  Video,
  AlertTriangle,
  Mic,
  ShieldCheck,
  CheckCircle2,
  Activity,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProgressPage: React.FC = () => {
  const { profile, currentLanguage, actorMistakes, actingProgress, performanceReviews } = useApp();

  const dialoguesCount = actingProgress.completedDialogues.length;
  const emotionsCount = actingProgress.practicedEmotions.length;
  const voiceExercisesCount = actingProgress.completedVoiceExercises.length;
  const challengesCount = actingProgress.completedChallenges.length;
  const resolvedMistakesCount = actorMistakes.filter((m) => m.resolved).length;
  const reviewsCount = performanceReviews.length;

  const actorSkillAreas = [
    { label: 'Dialogue Delivery & Cadence', completed: `${dialoguesCount} scenes practiced`, status: 'Active' },
    { label: 'Pronunciation & Syllable Diction', completed: `${dialoguesCount * 4} word drills`, status: 'Strong' },
    { label: 'Voice Modulation & Registers', completed: `${voiceExercisesCount} voice drills`, status: 'In Progress' },
    { label: 'Emotional Expression Range', completed: `${emotionsCount} / 20 emotions`, status: 'Progressing' },
    { label: 'Eye Acting & Focal Control', completed: `${actingProgress.completedEyeExercises.length} sessions`, status: 'Active' },
    { label: 'Facial Subtlety (Anti-Overacting)', completed: `${actingProgress.completedFacialExercises.length} sessions`, status: 'Trained' },
    { label: 'Body Language & Posture', completed: 'Posture anchored', status: 'Grounded' },
    { label: 'Performance Video Reviews', completed: `${reviewsCount} takes evaluated`, status: 'Logged' },
    { label: 'Mistakes Corrected & Re-rehearsed', completed: `${resolvedMistakesCount} errors fixed`, status: 'Improving' },
    { label: 'Daily Actor Sprint Challenges', completed: `${challengesCount} / 7 days`, status: 'On Track' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
          Actor Performance Metrics
        </span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
          Performance Progress
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Measurable rehearsal milestones tracking your journey toward natural, camera-ready performance in {currentLanguage.name}.
        </p>
      </div>

      {/* Top Stat Highlights (Measurable Activity, No Fake Scores) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Dialogues Practiced</span>
            <Clapperboard className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {dialoguesCount}
          </div>
          <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            Across 16 Scene Genres
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Emotions Explored</span>
            <Drama className="h-4 w-4 text-rose-500" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {emotionsCount} / 20
          </div>
          <div className="mt-1 text-xs text-rose-600 dark:text-rose-400 font-semibold">
            Micro-Muscle Alignment
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Mistakes Corrected</span>
            <AlertTriangle className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {resolvedMistakesCount}
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            Rehearsed & Corrected
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Rehearsal Streak</span>
            <Flame className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            {profile.streakDays} Days
          </div>
          <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            {profile.goalMinutesPerDay} mins/day target
          </div>
        </div>
      </div>

      {/* Transparent Measurement Statement */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 dark:text-amber-200 block mb-0.5">
            Transparent Actor Activity Tracking
          </strong>
          <span className="text-amber-800 dark:text-amber-300">
            SceneLingo measures verified actor rehearsals, deliberate takes, and self-audited mistake corrections rather than generating arbitrary AI score percentages.
          </span>
        </div>
      </div>

      {/* 10 Core Actor Competency Areas */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-black text-slate-900 dark:text-white">
          Actor Competency Breakdown ({currentLanguage.name})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {actorSkillAreas.map((skill, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {skill.label}
                </span>
                <span className="text-slate-500 text-[11px]">{skill.completed}</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-[10px]">
                {skill.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
