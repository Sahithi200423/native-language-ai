import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { OnboardingModal } from './pages/OnboardingModal';
import { DashboardPage } from './pages/DashboardPage';
import { LanguageStudioPage } from './pages/LanguageStudioPage';
import { DialogueLabPage } from './pages/DialogueLabPage';
import { ActingPage } from './pages/acting/ActingPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { PerformanceReviewPage } from './pages/PerformanceReviewPage';
import { MistakeSessionsPage } from './pages/MistakeSessionsPage';
import { ActorVocabularyPage } from './pages/ActorVocabularyPage';
import { AIActingCoachPage } from './pages/AIActingCoachPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { showLandingPage, activeTab } = useApp();

  if (showLandingPage) {
    return (
      <>
        <LandingPage />
        <OnboardingModal />
      </>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
      case 'dashboard':
        return <DashboardPage />;
      case 'language-studio':
      case 'learn':
        return <LanguageStudioPage />;
      case 'dialogue-lab':
        return <DialogueLabPage />;
      case 'emotion-studio':
      case 'acting':
        return <ActingPage />;
      case 'speaking':
        return <SpeakingPage />;
      case 'performance-review':
        return <PerformanceReviewPage />;
      case 'mistakes':
        return <MistakeSessionsPage />;
      case 'vocabulary':
        return <ActorVocabularyPage />;
      case 'ai-acting-coach':
      case 'tutor':
        return <AIActingCoachPage />;
      case 'progress':
        return <ProgressPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <Layout>{renderActiveTab()}</Layout>
      <OnboardingModal />
    </>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
