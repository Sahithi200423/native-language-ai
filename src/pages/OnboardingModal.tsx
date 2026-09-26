import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle2,
  Languages,
  Zap,
  Flame,
  Coffee,
  Compass,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LEARNER_LEVELS, LEARNING_GOALS } from '../data/goalsData';
import { LearnerLevel, SupportedLanguageCode } from '../types';

export const OnboardingModal: React.FC = () => {
  const {
    showOnboarding,
    setShowOnboarding,
    updateProfile,
    profile,
    setTargetLanguage,
    setActiveTab,
  } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedLang, setSelectedLang] = useState<SupportedLanguageCode>(profile.targetLanguage);
  const [selectedLevel, setSelectedLevel] = useState<LearnerLevel>(profile.level);
  const [selectedMinutes, setSelectedMinutes] = useState<number>(profile.goalMinutesPerDay);
  const [userName, setUserName] = useState<string>(profile.name);

  if (!showOnboarding) return null;

  const handleFinish = () => {
    setTargetLanguage(selectedLang);
    updateProfile({
      name: userName.trim() || 'Learner',
      targetLanguage: selectedLang,
      level: selectedLevel,
      goalMinutesPerDay: selectedMinutes,
      isOnboarded: true,
    });
    setShowOnboarding(false);
    setActiveTab('learn');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowOnboarding(false)}
          className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Step Progress indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-8 bg-brand-600 dark:bg-brand-400'
                    : s < step
                    ? 'w-4 bg-emerald-500'
                    : 'w-4 bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Step {step} of 4
          </span>
        </div>

        {/* STEP 1: Language Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Target Language
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Which language do you want to learn?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                You will learn this language step-by-step through English.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code as SupportedLanguageCode)}
                    className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 dark:bg-brand-950/40 dark:border-brand-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flagEmoji}</span>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {lang.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-telugu">
                          {lang.nativeName}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {lang.status === 'active' ? (
                        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Active
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          Soon
                        </span>
                      )}
                      {isSelected && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Level Selection */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Skill Level
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                What is your current level in Telugu?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Our AI tutor personalizes lessons, vocabulary, and grammar to your pace.
              </p>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {LEARNER_LEVELS.map((lvl) => {
                const isSelected = selectedLevel === lvl.level;
                return (
                  <button
                    key={lvl.level}
                    onClick={() => setSelectedLevel(lvl.level)}
                    className={`flex w-full items-start justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 dark:bg-brand-950/40 dark:border-brand-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {lvl.title}
                        </span>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {lvl.badge}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {lvl.subtitle}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Goal Selection */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Daily Commitment
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                How much time can you practice each day?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Consistency is key. Even 10 minutes makes a profound difference!
              </p>
            </div>

            <div className="space-y-2.5">
              {LEARNING_GOALS.map((goal) => {
                const isSelected = selectedMinutes === goal.dailyMinutes;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedMinutes(goal.dailyMinutes)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 dark:bg-brand-950/40 dark:border-brand-500'
                        : 'border-slate-200 hover:border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {goal.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {goal.description}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Name & Ready */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Profile Setup
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                What should we call you?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Your AI tutor will use your name during conversations and coaching sessions.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Priya or Alex"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Target Language:</span>
                <strong className="text-slate-900 dark:text-white">Telugu (తెలుగు)</strong>
              </div>
              <div className="flex justify-between">
                <span>Selected Level:</span>
                <strong className="capitalize text-slate-900 dark:text-white">{selectedLevel}</strong>
              </div>
              <div className="flex justify-between">
                <span>Daily Practice:</span>
                <strong className="text-slate-900 dark:text-white">{selectedMinutes} Minutes / Day</strong>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Start Learning Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
