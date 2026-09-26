import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopHeader } from './TopHeader';
import { MobileNav } from './MobileNav';
import { ttsService } from '../../services/ttsService';
import { VolumeX, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [ttsNotice, setTtsNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = ttsService.subscribeNotice((msg) => {
      setTtsNotice(msg);
      setTimeout(() => {
        setTtsNotice((curr) => (curr === msg ? null : curr));
      }, 6000);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 pb-16 lg:pb-0">
        <TopHeader onOpenMobileMenu={() => setIsMobileDrawerOpen(true)} />

        {/* TTS Browser Notice Banner */}
        {ttsNotice && (
          <div className="mx-4 mt-3 sm:mx-8 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 p-3 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-3 shadow-sm animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{ttsNotice}</span>
            </div>
            <button
              onClick={() => setTtsNotice(null)}
              className="p-1 rounded-lg hover:bg-amber-200/50 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300"
              aria-label="Dismiss speech notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Bar and Slide-out Drawer */}
      <MobileNav
        isDrawerOpen={isMobileDrawerOpen}
        onCloseDrawer={() => setIsMobileDrawerOpen(false)}
      />
    </div>
  );
};
