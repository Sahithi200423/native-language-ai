import React from 'react';
import {
  Home,
  BookOpen,
  Clapperboard,
  Drama,
  Mic,
  Video,
  AlertTriangle,
  BookmarkCheck,
  TrendingUp,
  Settings,
  Bot,
  Flame,
  Film,
} from 'lucide-react';
import { ActiveNavTab, useApp } from '../../context/AppContext';

interface NavItem {
  id: ActiveNavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, actorMistakes, profile, currentLanguage } = useApp();

  const unresolvedActorMistakes = actorMistakes.filter((m) => !m.resolved).length;

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'language-studio', label: 'Language Studio', icon: BookOpen },
    { id: 'dialogue-lab', label: 'Dialogue Lab', icon: Clapperboard, badge: 'Core' },
    { id: 'emotion-studio', label: 'Emotion Studio', icon: Drama },
    { id: 'speaking', label: 'Speaking Coach', icon: Mic },
    { id: 'performance-review', label: 'Performance Review', icon: Video, badge: 'Video' },
    {
      id: 'mistakes',
      label: 'Mistake Sessions',
      icon: AlertTriangle,
      badge: unresolvedActorMistakes > 0 ? unresolvedActorMistakes : undefined,
    },
    { id: 'vocabulary', label: 'Vocabulary for Actors', icon: BookmarkCheck },
    { id: 'ai-acting-coach', label: 'AI Acting Coach', icon: Bot, badge: 'AI' },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const isCurrentActive = (id: ActiveNavTab) => {
    if (activeTab === id) return true;
    if (id === 'home' && activeTab === 'dashboard') return true;
    if (id === 'language-studio' && activeTab === 'learn') return true;
    if (id === 'emotion-studio' && activeTab === 'acting') return true;
    if (id === 'ai-acting-coach' && activeTab === 'tutor') return true;
    return false;
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 h-screen sticky top-0 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md">
          <Film className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            SceneLingo
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <span>{currentLanguage.flagEmoji}</span>
            <span>Learning {currentLanguage.name} for Acting</span>
          </div>
        </div>
      </div>

      {/* Tagline Sub-strip */}
      <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold text-center">
        Languages • Dialogues • Performance
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isCurrentActive(item.id);
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-amber-50 text-amber-800 shadow-sm font-semibold dark:bg-amber-950/60 dark:text-amber-200 border border-amber-200/60 dark:border-amber-800/50'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4.5 w-4.5 transition-colors ${
                    active
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    item.id === 'mistakes'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
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
        <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Rehearsal Streak
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              {profile.streakDays} Days
            </span>
          </div>
          <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            Goal: <strong className="text-slate-900 dark:text-white">{profile.goalMinutesPerDay} mins/day</strong>
          </div>
          <div className="mt-1 text-[11px] text-slate-500 truncate">
            Role: <span className="text-amber-600 dark:text-amber-400 font-medium">{profile.currentRole || 'Actor Training'}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
