import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { OnboardingModal } from './pages/OnboardingModal';
import { DashboardPage } from './pages/DashboardPage';
import { LearnPage } from './pages/LearnPage';
import { PracticePage } from './pages/PracticePage';
import { AITutorPage } from './pages/AITutorPage';
import { SpeakingPage } from './pages/SpeakingPage';
import { VocabularyPage } from './pages/VocabularyPage';
import { MistakeBankPage } from './pages/MistakeBankPage';
import { ProgressPage } from './pages/ProgressPage';
import { SettingsPage } from './pages/SettingsPage';
import { ActingPage } from './pages/acting/ActingPage';

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
      case 'dashboard':
        return <DashboardPage />;
      case 'acting':
        return <ActingPage />;
      case 'learn':
        return <LearnPage />;
      case 'practice':
        return <PracticePage />;
      case 'tutor':
        return <AITutorPage />;
      case 'speaking':
        return <SpeakingPage />;
      case 'vocabulary':
        return <VocabularyPage />;
      case 'mistakes':
        return <MistakeBankPage />;
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
