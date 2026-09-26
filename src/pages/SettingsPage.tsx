import React, { useState } from 'react';
import {
  Settings,
  Languages,
  Moon,
  Sun,
  ShieldCheck,
  RotateCcw,
  Volume2,
  Check,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { LEARNER_LEVELS, LEARNING_GOALS } from '../data/goalsData';
import { LearnerLevel, SupportedLanguageCode } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    updateProfile,
    theme,
    setTheme,
    currentLanguage,
    setTargetLanguage,
    resetProgress,
  } = useApp();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleUpdate = (updates: any) => {
    updateProfile(updates);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleToggleSetting = (key: keyof typeof profile.settings) => {
    handleUpdate({
      settings: {
        ...profile.settings,
        [key]: !profile.settings[key],
      },
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Preferences & Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Application Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Customize target language, pedagogical preferences, theme, and AI behavior.
          </p>
        </div>

        {saveToast && (
          <span className="rounded-xl bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 animate-in fade-in">
            ✓ Settings saved
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* 1. Target Language Selection */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <Languages className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Target Language
            </h3>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLanguage.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleUpdate({ targetLanguage: lang.code as SupportedLanguageCode })}
                  className={`flex items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/70 ring-2 ring-brand-500/20 dark:bg-brand-950/40 dark:border-brand-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{lang.flagEmoji}</span>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {lang.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {lang.nativeName}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-brand-600 dark:text-brand-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Theme & Appearance */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            {theme === 'dark' ? <Moon className="h-5 w-5 text-brand-400" /> : <Sun className="h-5 w-5 text-amber-500" />}
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Appearance
            </h3>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition-all ${
                theme === 'light'
                  ? 'border-brand-500 bg-brand-50 text-brand-800 ring-2 ring-brand-500/20 dark:bg-brand-950'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800'
              }`}
            >
              <Sun className="h-4 w-4 text-amber-500" />
              <span>Light Mode</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition-all ${
                theme === 'dark'
                  ? 'border-brand-500 bg-brand-950 text-brand-300 ring-2 ring-brand-500/20'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Moon className="h-4 w-4 text-brand-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </div>

        {/* 3. Phonics & Display Preferences */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 pb-3 dark:border-slate-800">
            Learning Phonics & Display
          </h3>

          <div className="mt-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Show English Pronunciation Guidance
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Displays phonetic syllable breakdown (e.g. "Eh-la un-naa-ru?")
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.settings.showPronunciationGuide}
                onChange={() => handleToggleSetting('showPronunciationGuide')}
                className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  Show Romanization
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Displays English letter transliteration alongside native script
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.settings.showRomanization}
                onChange={() => handleToggleSetting('showRomanization')}
                className="h-5 w-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
            </label>
          </div>
        </div>

        {/* 4. AI Architecture & Security Disclosure */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Service Abstraction & Security Architecture
            </h3>
          </div>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            In compliance with production security standards, no AI API keys are bundled or exposed in client code.
            The frontend communicates through the standardized <code className="rounded bg-slate-200 px-1 py-0.5 font-mono text-[11px] dark:bg-slate-800">AIService</code> interface, ready for secure server-side/backend environment variable connection.
          </p>
        </div>

        {/* 5. Danger Zone: Reset Progress */}
        <div className="rounded-3xl border border-rose-200/80 bg-rose-50/40 p-6 dark:border-rose-950/60 dark:bg-rose-950/20">
          <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
            Reset Learning Data
          </h3>
          <p className="mt-1 text-xs text-rose-700/80 dark:text-rose-300/80">
            Clear all local streaks, saved vocabulary, and mistake history back to initial defaults.
          </p>

          <div className="mt-4">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:bg-slate-900 dark:text-rose-300"
              >
                Reset All Progress
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    resetProgress();
                    setShowResetConfirm(false);
                  }}
                  className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
                >
                  Yes, Confirm Reset
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
