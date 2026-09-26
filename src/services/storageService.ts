import { ActingProgressState, ActorMistake, MistakeItem, PerformanceReviewItem, UserProfile } from '../types';
import { INITIAL_ACTOR_MISTAKES } from '../data/actorMistakesData';

const PROFILE_KEY = 'scenelingo_profile';
const OLD_PROFILE_KEY = 'native_lang_ai_profile';
const VOCAB_KEY = 'scenelingo_vocab';
const MISTAKES_KEY = 'scenelingo_mistakes';
const ACTOR_MISTAKES_KEY = 'scenelingo_actor_mistakes';
const ACTING_KEY = 'scenelingo_acting';
const REVIEWS_KEY = 'scenelingo_reviews';

export const defaultActingProgress: ActingProgressState = {
  practicedEmotions: [],
  completedDialogues: [],
  completedVoiceExercises: [],
  completedEyeExercises: [],
  completedFacialExercises: [],
  completedChallenges: [],
  selfEvaluations: [],
};

export const defaultProfile: UserProfile = {
  name: 'Actor',
  targetLanguage: 'te', // Telugu as primary initial language
  level: 'beginner',
  goalMinutesPerDay: 15,
  streakDays: 1,
  totalXp: 0,
  completedLessonsCount: 0,
  learnedWordsCount: 0,
  speakingSessionsCount: 0,
  isOnboarded: false,
  theme: 'light',
  actorGoals: ['Dialogue Delivery', 'Language Pronunciation', 'Emotional Expression', 'Audition Preparation'],
  actingMedium: 'Film',
  firstPracticePreference: 'Dialogue',
  currentRole: 'Lead in Regional Drama',
  settings: {
    showPronunciationGuide: true,
    showRomanization: true,
    autoPlayAudio: false,
    speechSpeed: 1.0,
    dailyReminder: true,
    cameraEnabled: true,
    micEnabled: true,
    cloudStorageEnabled: false,
  },
};

export const storageService = {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY) || localStorage.getItem(OLD_PROFILE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to load profile from storage', e);
    }
    return defaultProfile;
  },

  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to storage', e);
    }
  },

  getSavedVocab(): Record<string, { isSaved: boolean; isLearned: boolean }> {
    try {
      const data = localStorage.getItem(VOCAB_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load vocab state', e);
    }
    return {};
  },

  saveVocabState(vocabMap: Record<string, { isSaved: boolean; isLearned: boolean }>): void {
    try {
      localStorage.setItem(VOCAB_KEY, JSON.stringify(vocabMap));
    } catch (e) {
      console.error('Failed to save vocab state', e);
    }
  },

  getMistakes(): MistakeItem[] | null {
    try {
      const data = localStorage.getItem(MISTAKES_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load mistakes', e);
    }
    return null;
  },

  saveMistakes(mistakes: MistakeItem[]): void {
    try {
      localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
    } catch (e) {
      console.error('Failed to save mistakes', e);
    }
  },

  getActorMistakes(): ActorMistake[] {
    try {
      const data = localStorage.getItem(ACTOR_MISTAKES_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load actor mistakes', e);
    }
    return INITIAL_ACTOR_MISTAKES;
  },

  saveActorMistakes(mistakes: ActorMistake[]): void {
    try {
      localStorage.setItem(ACTOR_MISTAKES_KEY, JSON.stringify(mistakes));
    } catch (e) {
      console.error('Failed to save actor mistakes', e);
    }
  },

  getPerformanceReviews(): PerformanceReviewItem[] {
    try {
      const data = localStorage.getItem(REVIEWS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load performance reviews', e);
    }
    return [];
  },

  savePerformanceReviews(reviews: PerformanceReviewItem[]): void {
    try {
      localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save performance reviews', e);
    }
  },

  getActingProgress(): ActingProgressState {
    try {
      const data = localStorage.getItem(ACTING_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load acting progress', e);
    }
    return defaultActingProgress;
  },

  saveActingProgress(progress: ActingProgressState): void {
    try {
      localStorage.setItem(ACTING_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save acting progress', e);
    }
  },

  resetAll(): void {
    try {
      localStorage.removeItem(PROFILE_KEY);
      localStorage.removeItem(OLD_PROFILE_KEY);
      localStorage.removeItem(VOCAB_KEY);
      localStorage.removeItem(MISTAKES_KEY);
      localStorage.removeItem(ACTOR_MISTAKES_KEY);
      localStorage.removeItem(ACTING_KEY);
      localStorage.removeItem(REVIEWS_KEY);
    } catch (e) {
      console.error('Failed to reset storage', e);
    }
  },
};
