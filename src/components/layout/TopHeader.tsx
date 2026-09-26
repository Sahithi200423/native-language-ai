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
      <div className="flex items-center gap-3 lg:hidden">
        <button
          onClick={onOpenMobileMenu}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="text-base font-bold text-slate-900 dark:text-white">
          Native Language AI
        </span>
      </div>

      {/* Target Language Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLangOpen(!isLangOpen)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition-all dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/60"
        >
          <span className="text-base">{currentLanguage.flagEmoji}</span>
          <span>{currentLanguage.name}</span>
          <span className="text-xs font-normal text-slate-500 font-telugu dark:text-slate-400">
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
            <div className="absolute left-0 mt-2 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Select Target Language
              </div>
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLanguage.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setTargetLanguage(lang.code as SupportedLanguageCode);
                      setIsLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{lang.flagEmoji}</span>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {lang.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {lang.nativeName} • {lang.status === 'active' ? 'Active' : 'Architecture Ready'}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-brand-600 dark:text-brand-400" />}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Right controls: Streak, XP, Theme toggle, Landing preview button */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 rounded-xl bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
          <span>{profile.streakDays}d</span>
        </div>

        {/* XP Pill */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-xl bg-brand-50 px-2.5 py-1.5 text-xs font-bold text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
          <Zap className="h-3.5 w-3.5 fill-brand-500 text-brand-500" />
          <span>{profile.totalXp} XP</span>
        </div>

        {/* Dark / Light Toggle */}
        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>

        {/* Landing Page Preview button */}
        <button
          onClick={() => setShowLandingPage(true)}
          className="hidden md:inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Landing Page</span>
        </button>

        {/* User Avatar pill */}
        <div className="flex items-center gap-2 pl-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white shadow-sm">
            {profile.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};
