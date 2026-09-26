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
  Drama,
  X,
} from 'lucide-react';
import { ActiveNavTab, useApp } from '../../context/AppContext';

interface MobileNavProps {
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isDrawerOpen, onCloseDrawer }) => {
  const { activeTab, setActiveTab, mistakes } = useApp();

  const unresolvedCount = mistakes.filter((m) => !m.resolved).length;

  const primaryMobileTabs: { id: ActiveNavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Dumbbell },
    { id: 'tutor', label: 'Tutor', icon: Bot },
    { id: 'speaking', label: 'Speaking', icon: Mic },
  ];

  const allTabs: { id: ActiveNavTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Dumbbell },
    { id: 'tutor', label: 'AI Tutor', icon: Bot },
    { id: 'speaking', label: 'Speaking Coach', icon: Mic },
    { id: 'acting', label: 'Acting & Expression', icon: Drama },
    { id: 'vocabulary', label: 'Vocabulary', icon: BookmarkCheck },
    { id: 'mistakes', label: 'Mistake Bank', icon: AlertTriangle, badge: unresolvedCount },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Bottom Sticky Navigation on Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-slate-200/80 bg-white/95 px-2 backdrop-blur lg:hidden dark:border-slate-800 dark:bg-slate-900/95">
        {primaryMobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2 text-xs font-medium transition-colors ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Slide-out Drawer for all sections */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={onCloseDrawer}
          />
          <div className="relative flex w-72 flex-col bg-white p-4 shadow-2xl dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white">All Sections</span>
              <button
                onClick={onCloseDrawer}
                className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-3 flex-1 space-y-1 overflow-y-auto">
              {allTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      onCloseDrawer();
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium ${
                      isActive
                        ? 'bg-brand-50 font-semibold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4.5 w-4.5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
