import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  Bot,
  Mic,
  BookmarkCheck,
  AlertTriangle,
  TrendingUp,
  Settings,
  Sparkles,
  Flame,
} from 'lucide-react';
import { ActiveNavTab, useApp } from '../../context/AppContext';

interface NavItem {
  id: ActiveNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, mistakes, profile, currentLanguage } = useApp();

  const unresolvedMistakesCount = mistakes.filter((m) => !m.resolved).length;

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Dumbbell },
    { id: 'tutor', label: 'AI Tutor', icon: Bot, badge: 'AI' },
    { id: 'speaking', label: 'Speaking Coach', icon: Mic, badge: 'Coach' },
    { id: 'vocabulary', label: 'Vocabulary', icon: BookmarkCheck },
    {
      id: 'mistakes',
      label: 'Mistake Bank',
      icon: AlertTriangle,
      badge: unresolvedMistakesCount > 0 ? unresolvedMistakesCount : undefined,
    },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-md">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Native Language AI
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-brand-600 dark:text-brand-400 font-medium">
            <span>{currentLanguage.flagEmoji}</span>
            <span>Learning {currentLanguage.name}</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-brand-50 text-brand-700 shadow-sm font-semibold dark:bg-brand-950/60 dark:text-brand-300'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4.5 w-4.5 transition-colors ${
                    isActive
                      ? 'text-brand-600 dark:text-brand-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  }`}
                />
                <span>{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    item.id === 'mistakes'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                      : 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User Card / Learning Streak */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800">
        <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Daily Streak
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              {profile.streakDays} Days
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
            Goal: <strong className="text-slate-900 dark:text-white">{profile.goalMinutesPerDay} mins/day</strong>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div className="h-full bg-brand-500 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
      </div>
    </aside>
  );
};
