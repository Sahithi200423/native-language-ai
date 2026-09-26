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
  Film,
  Camera,
  Trash2,
  Lock,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { SupportedLanguageCode } from '../types';

export const SettingsPage: React.FC = () => {
  const {
    profile,
    updateProfile,
    theme,
    setTheme,
    currentLanguage,
    setTargetLanguage,
    resetProgress,
    performanceReviews,
  } = useApp();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [currentRoleInput, setCurrentRoleInput] = useState(profile.currentRole || 'Lead in Regional Film');

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

  const handleSaveRole = () => {
    handleUpdate({ currentRole: currentRoleInput });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in">
      {/* Toast Notice */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 rounded-2xl bg-amber-500 px-4 py-2 text-xs font-bold text-white shadow-xl">
          ✓ Actor settings saved!
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Actor Studio Preferences
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Actor Settings & Privacy
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Customize target role, language, camera permissions, video privacy, and display preferences.
          </p>
        </div>
      </div>

      {/* ACTOR PROFILE CARD */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="h-5 w-5 text-amber-500" />
          Actor Profile & Current Preparation
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-slate-500 font-bold block mb-1">
              Current Role / Scene Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentRoleInput}
                onChange={(e) => setCurrentRoleInput(e.target.value)}
                placeholder="e.g. Lead in Telugu Thriller"
                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <button
                onClick={handleSaveRole}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold"
              >
                Save
              </button>
            </div>
          </div>

          <div>
            <label className="text-slate-500 font-bold block mb-1">
              Acting Medium
            </label>
            <select
              value={profile.actingMedium || 'Film'}
              onChange={(e) => handleUpdate({ actingMedium: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
            >
              <option value="Film">Film</option>
              <option value="Television">Television</option>
              <option value="Theatre">Theatre</option>
              <option value="Web Series">Web Series</option>
              <option value="Short Films">Short Films</option>
              <option value="Auditions">Audition Preparation</option>
              <option value="General Acting Practice">General Acting Practice</option>
            </select>
          </div>
        </div>
      </div>

      {/* TARGET LANGUAGE SELECTION */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Languages className="h-5 w-5 text-amber-500" />
          Target Language Selection
        </h3>
        <p className="text-xs text-slate-500">
          Switching language immediately updates all dialogues, Romanizations, and text-to-speech voices across SceneLingo.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === currentLanguage.code;
            return (
              <button
                key={lang.code}
                onClick={() => setTargetLanguage(lang.code as SupportedLanguageCode)}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20 font-bold'
                    : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-2xl">{lang.flagEmoji}</span>
                <div>
                  <div className="text-xs font-bold">{lang.name}</div>
                  <div className="text-[10px] text-slate-400 font-telugu">{lang.nativeName}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PRIVACY & VIDEO STORAGE CONTROLS */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lock className="h-5 w-5 text-indigo-500" />
          Privacy & Performance Video Retention
        </h3>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 space-y-2">
          <p>
            <strong>Video Privacy Guarantee:</strong> Your performance takes contain your personal image and voice. Video blobs are kept in temporary browser session memory. No videos are transmitted to remote servers unless an external video analysis URL is explicitly configured in your environment.
          </p>
          <p className="text-[11px] text-slate-400">
            Currently saved review items: <strong>{performanceReviews.length}</strong>
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Clear all saved performance review takes from browser memory
          </span>
          <button
            onClick={() => {
              if (window.confirm('Clear all performance reviews from local storage?')) {
                localStorage.removeItem('scenelingo_reviews');
                window.location.reload();
              }
            }}
            className="px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          >
            Clear Video Reviews
          </button>
        </div>
      </div>

      {/* THEME & APPEARANCE */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Appearance & Dark Mode
        </h3>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
              theme === 'light'
                ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sun className="h-4 w-4 text-amber-500" />
            Light Mode
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
              theme === 'dark'
                ? 'border-amber-500 bg-amber-950/60 text-amber-200 shadow-sm'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Moon className="h-4 w-4 text-amber-400" />
            Dark Mode (Studio Film Tone)
          </button>
        </div>
      </div>

      {/* DANGER ZONE / RESET */}
      <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6 dark:border-rose-950/60 dark:bg-rose-950/20 space-y-3">
        <h3 className="text-base font-bold text-rose-900 dark:text-rose-300 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          Reset Repertoire & Progress
        </h3>
        <p className="text-xs text-rose-700 dark:text-rose-400">
          This will clear your rehearsal streak, completed challenge badges, saved dialogues, and custom actor notes.
        </p>

        {showResetConfirm ? (
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                resetProgress();
                setShowResetConfirm(false);
                setSaveToast(true);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
            >
              Yes, Reset Everything
            </button>
            <button
              onClick={() => setShowResetConfirm(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50"
          >
            Reset All Progress
          </button>
        )}
      </div>
    </div>
  );
};
