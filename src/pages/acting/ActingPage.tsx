import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmotionType } from '../../types';
import { ActingHomeTab } from './ActingHomeTab';
import { EmotionPracticeTab } from './EmotionPracticeTab';
import { DialoguePracticeTab } from './DialoguePracticeTab';
import { VoiceModulationTab } from './VoiceModulationTab';
import { FacialAndEyeTab } from './FacialAndEyeTab';
import { ActingChallengesTab } from './ActingChallengesTab';
import { CameraPracticeTab } from './CameraPracticeTab';
import { ActingProgressTab } from './ActingProgressTab';
import {
  Smile,
  MessageSquare,
  Mic,
  Eye,
  Trophy,
  Camera,
  TrendingUp,
  LayoutDashboard
} from 'lucide-react';

export type ActingSubTab =
  | 'home'
  | 'emotion'
  | 'dialogue'
  | 'voice'
  | 'facial-eye'
  | 'challenges'
  | 'camera'
  | 'progress';

export const ActingPage: React.FC = () => {
  const { currentLanguage } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<ActingSubTab>('home');
  const [selectedEmotionForPractice, setSelectedEmotionForPractice] = useState<EmotionType>('sadness');

  const handleSelectEmotionFromHome = (emotion: EmotionType) => {
    setSelectedEmotionForPractice(emotion);
    setActiveSubTab('emotion');
  };

  const navItems = [
    { id: 'home', label: 'Acting Home', icon: LayoutDashboard },
    { id: 'emotion', label: 'Emotion Practice', icon: Smile },
    { id: 'dialogue', label: 'Dialogue Practice', icon: MessageSquare },
    { id: 'voice', label: 'Voice & Modulation', icon: Mic },
    { id: 'facial-eye', label: 'Face & Eye Acting', icon: Eye },
    { id: 'challenges', label: 'Acting Challenges', icon: Trophy },
    { id: 'camera', label: 'Camera Practice', icon: Camera },
    { id: 'progress', label: 'Performance Progress', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎭</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Acting & Emotional Expression
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Learn to express genuine emotions, voice modulation, and screen presence while speaking {currentLanguage.name}.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 font-medium border border-primary-200 dark:border-primary-800/50">
            Target: {currentLanguage.name} ({currentLanguage.nativeName})
          </span>
        </div>
      </div>

      {/* Acting Sub-Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSubTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id as ActingSubTab)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Main Acting Tab Views */}
      <div className="min-h-[500px]">
        {activeSubTab === 'home' && (
          <ActingHomeTab
            onSelectEmotion={handleSelectEmotionFromHome}
            onNavigateTab={(tab) => setActiveSubTab(tab as ActingSubTab)}
          />
        )}

        {activeSubTab === 'emotion' && (
          <EmotionPracticeTab
            initialEmotion={selectedEmotionForPractice}
            onNavigateTab={(tab) => setActiveSubTab(tab as ActingSubTab)}
          />
        )}

        {activeSubTab === 'dialogue' && (
          <DialoguePracticeTab />
        )}

        {activeSubTab === 'voice' && (
          <VoiceModulationTab />
        )}

        {activeSubTab === 'facial-eye' && (
          <FacialAndEyeTab />
        )}

        {activeSubTab === 'challenges' && (
          <ActingChallengesTab />
        )}

        {activeSubTab === 'camera' && (
          <CameraPracticeTab />
        )}

        {activeSubTab === 'progress' && (
          <ActingProgressTab />
        )}
      </div>
    </div>
  );
};
