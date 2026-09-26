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
  Film,
  X,
} from 'lucide-react';
import { ActiveNavTab, useApp } from '../../context/AppContext';

interface MobileNavProps {
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isDrawerOpen, onCloseDrawer }) => {
  const { activeTab, setActiveTab, actorMistakes } = useApp();

  const unresolvedCount = actorMistakes.filter((m) => !m.resolved).length;

  const isCurrentActive = (id: ActiveNavTab) => {
    if (activeTab === id) return true;
    if (id === 'home' && activeTab === 'dashboard') return true;
    if (id === 'language-studio' && activeTab === 'learn') return true;
    if (id === 'emotion-studio' && activeTab === 'acting') return true;
    if (id === 'ai-acting-coach' && activeTab === 'tutor') return true;
    return false;
  };

  const primaryMobileTabs: { id: ActiveNavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dialogue-lab', label: 'Dialogues', icon: Clapperboard },
    { id: 'emotion-studio', label: 'Emotions', icon: Drama },
    { id: 'performance-review', label: 'Review', icon: Video },
    { id: 'mistakes', label: 'Mistakes', icon: AlertTriangle },
  ];

  const allTabs: { id: ActiveNavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'language-studio', label: 'Language Studio', icon: BookOpen },
    { id: 'dialogue-lab', label: 'Dialogue Lab', icon: Clapperboard },
    { id: 'emotion-studio', label: 'Emotion Studio', icon: Drama },
    { id: 'speaking', label: 'Speaking Coach', icon: Mic },
    { id: 'performance-review', label: 'Performance Review', icon: Video },
    { id: 'mistakes', label: 'Mistake Sessions', icon: AlertTriangle, badge: unresolvedCount },
    { id: 'vocabulary', label: 'Vocabulary for Actors', icon: BookmarkCheck },
    { id: 'ai-acting-coach', label: 'AI Acting Coach', icon: Bot },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Sticky Navigation on Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-slate-200/80 bg-white/95 px-2 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95">
        {primaryMobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = isCurrentActive(tab.id);
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px]">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
            onClick={onCloseDrawer}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white dark:bg-slate-900 shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-md">
                    <Film className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white">SceneLingo</h2>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Languages • Performance</p>
                  </div>
                </div>
                <button
                  onClick={onCloseDrawer}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                {allTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = isCurrentActive(tab.id);
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        onCloseDrawer();
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200'
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge !== undefined && tab.badge > 0 && (
                        <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                SceneLingo • Actor Studio Edition
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
