import React, { useState } from 'react';
import {
  Sun,
  Moon,
  ChevronDown,
  Flame,
  Zap,
  Globe,
  HelpCircle,
  Menu,
  Check,
  Clapperboard,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../data/languages';
import { SupportedLanguageCode } from '../../types';

interface TopHeaderProps {
  onOpenMobileMenu?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    profile,
    theme,
    setTheme,
    currentLanguage,
    setTargetLanguage,
    setShowLandingPage,
    setShowOnboarding,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/95">
      {/* Mobile brand & hamburger */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-base font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
          <Clapperboard className="w-4 h-4 text-amber-500" />
          SceneLingo
        </span>
      </div>

      {/* Target Language Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/60"
        >
          <span className="text-base">{currentLanguage.flagEmoji}</span>
          <span>{currentLanguage.name} for Acting</span>
          <span className="text-xs font-normal text-slate-500 font-telugu dark:text-slate-400 hidden sm:inline">
            ({currentLanguage.nativeName})
          </span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>

        {isLangOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsLangOpen(false)}
            />
            <div className="absolute left-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60 mb-1">
                Select Acting Target Language
              </div>
              <div className="space-y-1">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLanguage.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setTargetLanguage(lang.code as SupportedLanguageCode);
                        setIsLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-amber-50 font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                          : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{lang.flagEmoji}</span>
                        <div className="text-left">
                          <div>{lang.name}</div>
                          <div className="text-[10px] text-slate-400">{lang.nativeName}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Right Controls: Stats, Theme, Tour */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak indicator */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span>{profile.streakDays} Rehearsal Days</span>
        </div>

        {/* XP Total */}
        <div className="flex items-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/40">
          <Zap className="h-4 w-4 fill-indigo-500 text-indigo-500" />
          <span>{profile.totalXp} XP</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle color theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>

        {/* Re-open Onboarding Guide */}
        <button
          onClick={() => setShowOnboarding(true)}
          className="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Actor Studio Setup"
        >
          <HelpCircle className="h-3.5 w-3.5" />
          <span>Setup</span>
        </button>

        {/* Landing Page Preview button */}
        <button
          onClick={() => setShowLandingPage(true)}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2 py-1 rounded-lg"
          title="View SceneLingo Landing Page"
        >
          Home
        </button>
      </div>
    </header>
  );
};
