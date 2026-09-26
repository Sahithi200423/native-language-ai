import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Award,
  Play,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PhraseDisplayCard } from '../components/learning/PhraseDisplayCard';
import { AudioButton } from '../components/common/AudioButton';
import { Lesson } from '../types';

export const LearnPage: React.FC = () => {
  const { lessons, activeLessonId, setActiveLessonId, completeLesson, setActiveTab } = useApp();

  const selectedLesson: Lesson | undefined = activeLessonId
    ? lessons.find((l) => l.id === activeLessonId)
    : undefined;

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [showLessonCompletedModal, setShowLessonCompletedModal] = useState(false);

  // Group lessons by unit
  const unitsMap = lessons.reduce<Record<string, Lesson[]>>((acc, lesson) => {
    acc[lesson.unitTitle] = acc[lesson.unitTitle] || [];
    acc[lesson.unitTitle].push(lesson);
    return acc;
  }, {});

  const handleFinishLesson = () => {
    if (selectedLesson) {
      completeLesson(selectedLesson.id, 100);
      setShowLessonCompletedModal(true);
    }
  };

  // If in active lesson view
  if (selectedLesson) {
    const currentPhrase = selectedLesson.phrases[activePhraseIndex];
    const isLastPhrase = activePhraseIndex === selectedLesson.phrases.length - 1;

    return (
      <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
        {/* Top Header with Back button */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
          <button
            onClick={() => setActiveLessonId(null)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Syllabus</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>
              Phrase {activePhraseIndex + 1} of {selectedLesson.phrases.length}
            </span>
          </div>
        </div>

        {/* Progress bar across lesson phrases */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full bg-brand-500 transition-all duration-300"
            style={{
              width: `${((activePhraseIndex + 1) / selectedLesson.phrases.length) * 100}%`,
            }}
          />
        </div>

        {/* Lesson Title & Context */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            {selectedLesson.unitTitle}
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {selectedLesson.title}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {selectedLesson.description}
          </p>
        </div>

        {/* Main 5-Tier Phrase Card */}
        {currentPhrase && (
          <PhraseDisplayCard
            phrase={currentPhrase}
            onPracticeClick={() => setActiveTab('practice')}
          />
        )}

        {/* Bottom Nav / Next Phrase Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={activePhraseIndex === 0}
            onClick={() => setActivePhraseIndex(activePhraseIndex - 1)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Previous
          </button>

          {!isLastPhrase ? (
            <button
              onClick={() => setActivePhraseIndex(activePhraseIndex + 1)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              <span>Next Phrase</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishLesson}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Complete Lesson (+50 XP)</span>
            </button>
          )}
        </div>

        {/* Completed Lesson Modal */}
        {showLessonCompletedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 text-center shadow-2xl dark:bg-slate-900">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
                Lesson Completed! 🎉
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                You’ve mastered all phrases in "{selectedLesson.title}". You earned +50 XP and strengthened your streak!
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setShowLessonCompletedModal(false);
                    setActiveTab('practice');
                  }}
                  className="rounded-xl bg-brand-600 py-3 text-sm font-bold text-white hover:bg-brand-700"
                >
                  Practice These Phrases Now
                </button>
                <button
                  onClick={() => {
                    setShowLessonCompletedModal(false);
                    setActiveLessonId(null);
                  }}
                  className="rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Return to Syllabus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Syllabus / Units Overview View
  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Syllabus Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Curriculum & Lessons
        </span>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          Telugu Learning Track
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
          Learn conversational Telugu from ground up with the 5-part model: English context, native script, phonetic Romanization, pronunciation guide, and precise meaning.
        </p>
      </div>

      {/* Units List */}
      <div className="space-y-6">
        {Object.entries(unitsMap).map(([unitTitle, unitLessons]) => (
          <div
            key={unitTitle}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {unitTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {unitLessons.length} lessons in this module
                </p>
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
                Beginner
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {unitLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => {
                    setActiveLessonId(lesson.id);
                    setActivePhraseIndex(0);
                  }}
                  className="group cursor-pointer rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:border-brand-400 hover:bg-white hover:shadow-card dark:border-slate-800 dark:bg-slate-800/40 dark:hover:bg-slate-800"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {lesson.title}
                        </span>
                        {lesson.completed && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        )}
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {lesson.description}
                      </p>
                    </div>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-xs group-hover:bg-brand-600 group-hover:text-white dark:bg-slate-700 dark:group-hover:bg-brand-500 transition-colors">
                      <Play className="h-3.5 w-3.5 fill-current" />
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {lesson.estimatedMinutes} mins
                    </span>
                    <span>{lesson.phrases.length} key phrases</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
