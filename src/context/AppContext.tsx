import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_MISTAKES } from '../data/mistakesData';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { INITIAL_VOCABULARY } from '../data/vocabularyData';
import { TELUGU_LESSONS } from '../data/lessonsData';
import { storageService, defaultProfile } from '../services/storageService';
import {
  LanguageInfo,
  LearnerLevel,
  Lesson,
  MistakeItem,
  SupportedLanguageCode,
  UserProfile,
  VocabularyWord,
} from '../types';

export type ActiveNavTab =
  | 'dashboard'
  | 'learn'
  | 'practice'
  | 'tutor'
  | 'speaking'
  | 'vocabulary'
  | 'mistakes'
  | 'progress'
  | 'settings';

interface AppContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  currentLanguage: LanguageInfo;
  setTargetLanguage: (code: SupportedLanguageCode) => void;
  activeTab: ActiveNavTab;
  setActiveTab: (tab: ActiveNavTab) => void;
  vocabulary: VocabularyWord[];
  toggleSaveWord: (id: string) => void;
  toggleLearnedWord: (id: string) => void;
  mistakes: MistakeItem[];
  resolveMistake: (id: string) => void;
  addMistake: (mistake: Omit<MistakeItem, 'id' | 'createdAt' | 'resolved' | 'attemptsCount'>) => void;
  lessons: Lesson[];
  activeLessonId: string | null;
  setActiveLessonId: (id: string | null) => void;
  completeLesson: (id: string, score: number) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  showLandingPage: boolean;
  setShowLandingPage: (show: boolean) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  resetProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => storageService.getUserProfile());
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('dashboard');
  const [showLandingPage, setShowLandingPage] = useState<boolean>(!profile.isOnboarded);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // Vocabulary state with local storage merging
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>(() => {
    const savedStates = storageService.getSavedVocab();
    return INITIAL_VOCABULARY.map((v) => {
      const saved = savedStates[v.id];
      if (saved) {
        return { ...v, isSaved: saved.isSaved, isLearned: saved.isLearned };
      }
      return v;
    });
  });

  // Mistakes state
  const [mistakes, setMistakes] = useState<MistakeItem[]>(() => {
    const stored = storageService.getMistakes();
    return stored || INITIAL_MISTAKES;
  });

  // Lessons state
  const [lessons, setLessons] = useState<Lesson[]>(TELUGU_LESSONS);

  // Theme state
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    if (profile.theme === 'dark') return 'dark';
    if (profile.theme === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Apply theme to html root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync profile changes
  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...updates };
      storageService.saveUserProfile(updated);
      return updated;
    });
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    updateProfile({ theme: newTheme });
  };

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === profile.targetLanguage) ||
    SUPPORTED_LANGUAGES[0];

  const setTargetLanguage = (code: SupportedLanguageCode) => {
    updateProfile({ targetLanguage: code });
  };

  const toggleSaveWord = (id: string) => {
    setVocabulary((prev) => {
      const next = prev.map((item) =>
        item.id === id ? { ...item, isSaved: !item.isSaved } : item
      );
      const stateMap: Record<string, { isSaved: boolean; isLearned: boolean }> = {};
      next.forEach((item) => {
        stateMap[item.id] = { isSaved: item.isSaved, isLearned: item.isLearned };
      });
      storageService.saveVocabState(stateMap);
      return next;
    });
  };

  const toggleLearnedWord = (id: string) => {
    setVocabulary((prev) => {
      let delta = 0;
      const next = prev.map((item) => {
        if (item.id === id) {
          const newState = !item.isLearned;
          delta += newState ? 1 : -1;
          return { ...item, isLearned: newState };
        }
        return item;
      });

      const stateMap: Record<string, { isSaved: boolean; isLearned: boolean }> = {};
      next.forEach((item) => {
        stateMap[item.id] = { isSaved: item.isSaved, isLearned: item.isLearned };
      });
      storageService.saveVocabState(stateMap);

      updateProfile({
        learnedWordsCount: Math.max(0, profile.learnedWordsCount + delta),
        totalXp: profile.totalXp + (delta > 0 ? 15 : 0),
      });

      return next;
    });
  };

  const resolveMistake = (id: string) => {
    setMistakes((prev) => {
      const next = prev.map((m) =>
        m.id === id ? { ...m, resolved: true, attemptsCount: m.attemptsCount + 1 } : m
      );
      storageService.saveMistakes(next);
      return next;
    });
    updateProfile({ totalXp: profile.totalXp + 20 });
  };

  const addMistake = (mistakeData: Omit<MistakeItem, 'id' | 'createdAt' | 'resolved' | 'attemptsCount'>) => {
    const newMistake: MistakeItem = {
      ...mistakeData,
      id: `mistake-${Date.now()}`,
      createdAt: 'Just now',
      resolved: false,
      attemptsCount: 1,
    };
    setMistakes((prev) => {
      const next = [newMistake, ...prev];
      storageService.saveMistakes(next);
      return next;
    });
  };

  const completeLesson = (id: string, score: number) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, completed: true, score } : l))
    );
    updateProfile({
      completedLessonsCount: profile.completedLessonsCount + 1,
      totalXp: profile.totalXp + 50,
    });
  };

  const resetProgress = () => {
    storageService.resetAll();
    setProfile(defaultProfile);
    setMistakes(INITIAL_MISTAKES);
    setVocabulary(INITIAL_VOCABULARY);
    setLessons(TELUGU_LESSONS);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        updateProfile,
        currentLanguage,
        setTargetLanguage,
        activeTab,
        setActiveTab,
        vocabulary,
        toggleSaveWord,
        toggleLearnedWord,
        mistakes,
        resolveMistake,
        addMistake,
        lessons,
        activeLessonId,
        setActiveLessonId,
        completeLesson,
        theme,
        setTheme,
        showLandingPage,
        setShowLandingPage,
        showOnboarding,
        setShowOnboarding,
        resetProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
