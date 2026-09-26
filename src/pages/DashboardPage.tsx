import React from 'react';
import {
  Flame,
  Award,
  BookOpen,
  BookmarkCheck,
  Mic,
  ArrowRight,
  Sparkles,
  Bot,
  AlertTriangle,
  Play,
  Clock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';

export const DashboardPage: React.FC = () => {
  const {
    profile,
    currentLanguage,
    setActiveTab,
    vocabulary,
    mistakes,
    lessons,
    setActiveLessonId,
  } = useApp();

  const unresolvedMistakes = mistakes.filter((m) => !m.resolved);
  const learnedCount = vocabulary.filter((v) => v.isLearned).length;
  const completedLessons = lessons.filter((l) => l.completed).length;
  const totalLessons = lessons.length;
  const progressPct = Math.round((completedLessons / totalLessons) * 100);

  const nextLesson = lessons.find((l) => !l.completed) || lessons[0];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Welcome Banner in English */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">
            <span>{currentLanguage.flagEmoji}</span>
            <span>Target Language: {currentLanguage.name}</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {profile.name}! 👋
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Continue learning {currentLanguage.name} step-by-step through English. Build conversational fluency with active practice and supportive AI feedback.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setActiveLessonId(nextLesson.id);
                setActiveTab('learn');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow-md hover:bg-slate-100 active:scale-95 transition-all"
            >
              <Play className="h-4 w-4 fill-slate-900" />
              <span>Continue Lesson {nextLesson.unit}</span>
            </button>

            <button
              onClick={() => setActiveTab('speaking')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/20 transition-all"
            >
              <Mic className="h-4 w-4" />
              <span>Practice Speaking</span>
            </button>
          </div>
        </div>

        {/* Ambient subtle decorative badge */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-10 hidden md:block select-none">
          <div className="text-8xl font-black text-white tracking-widest uppercase">
            LEARN
          </div>
        </div>
      </div>

      {/* Dashboard Metrics Grid in English */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {/* 1. Current Language */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Target Language
          </span>
          <div className="mt-1 flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
            <span>{currentLanguage.flagEmoji}</span>
            <span className="truncate">{currentLanguage.name}</span>
          </div>
          <div className="mt-1 text-xs text-brand-600 dark:text-brand-400 font-medium">
            Active Course
          </div>
        </div>

        {/* 2. Current Level */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Current Level
          </span>
          <div className="mt-1 font-bold capitalize text-slate-900 dark:text-white truncate">
            {profile.level}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Conversational Basics
          </div>
        </div>

        {/* 3. Daily Goal */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Daily Goal
          </span>
          <div className="mt-1 flex items-center gap-1 font-bold text-slate-900 dark:text-white">
            <Clock className="h-4 w-4 text-brand-500" />
            <span>{profile.goalMinutesPerDay} min</span>
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            In Progress
          </div>
        </div>

        {/* 4. Learning Streak */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Streak
          </span>
          <div className="mt-1 flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
            <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
            <span>{profile.streakDays} Days</span>
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Keep it up!
          </div>
        </div>

        {/* 5. Lessons Completed */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Lessons
          </span>
          <div className="mt-1 flex items-center gap-1 font-bold text-slate-900 dark:text-white">
            <BookOpen className="h-4 w-4 text-brand-500" />
            <span>{completedLessons} / {totalLessons}</span>
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            {progressPct}% Completed
          </div>
        </div>

        {/* 6. Vocabulary Learned */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Vocabulary
          </span>
          <div className="mt-1 flex items-center gap-1 font-bold text-slate-900 dark:text-white">
            <BookmarkCheck className="h-4 w-4 text-emerald-500" />
            <span>{learnedCount} Words</span>
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Mastered
          </div>
        </div>

        {/* 7. Speaking Practice */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-subtle dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Speaking
          </span>
          <div className="mt-1 flex items-center gap-1 font-bold text-slate-900 dark:text-white">
            <Mic className="h-4 w-4 text-indigo-500" />
            <span>{profile.speakingSessionsCount} Sessions</span>
          </div>
          <div className="mt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            88% Avg Score
          </div>
        </div>
      </div>

      {/* Main Content Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Lesson Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Recommended Next Lesson
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                ~{nextLesson.estimatedMinutes} mins
              </span>
            </div>

            <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
              {nextLesson.title}
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {nextLesson.description}
            </p>

            {/* Structured Target Language Preview */}
            {nextLesson.phrases[0] && (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Phrase Preview
                </div>
                <TargetLanguageBlock
                  content={{
                    native: nextLesson.phrases[0].native,
                    romanization: nextLesson.phrases[0].romanization,
                    englishMeaning: nextLesson.phrases[0].englishMeaning,
                    pronunciationGuide: nextLesson.phrases[0].pronunciationGuide,
                  }}
                  size="md"
                  showAudio={true}
                  showPronunciation={true}
                />
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => {
                  setActiveLessonId(nextLesson.id);
                  setActiveTab('learn');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
              >
                <span>Start Lesson Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Learning Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setActiveTab('tutor')}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:border-brand-400 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/60 dark:text-brand-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Ask AI Tutor
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Grammar explanations, translations & examples
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActiveTab('practice')}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-card transition-all hover:border-emerald-400 hover:shadow-card-hover dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Interactive Drills
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Multiple choice, translation & recall
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mistake Bank & Progress */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Mistake Bank ({unresolvedMistakes.length})
                </h4>
              </div>
              <button
                onClick={() => setActiveTab('mistakes')}
                className="text-xs font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                View all
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Review saved corrections with the empathetic AI confidence coach.
            </p>

            <div className="mt-4 space-y-3">
              {unresolvedMistakes.slice(0, 2).map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border border-amber-200/80 bg-amber-50/40 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <span>{m.category.replace('_', ' ')}</span>
                    <span>{m.createdAt}</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500 line-through">
                    "{m.whatYouSaid}"
                  </div>
                  <div className="mt-1">
                    <TargetLanguageBlock
                      content={{
                        native: m.nativeScript,
                        romanization: m.romanization,
                        englishMeaning: m.betterVersion,
                      }}
                      size="sm"
                      showMeaning={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('mistakes')}
              className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 text-center text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
            >
              Review Mistakes & Retry
            </button>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Syllabus Completion
            </h4>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Course Progress</span>
              <span className="font-bold text-slate-900 dark:text-white">{progressPct}%</span>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <span>Goal: Conversational Level</span>
              <Award className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
