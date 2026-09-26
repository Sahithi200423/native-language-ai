import { ActingProgressState, MistakeItem, UserProfile } from '../types';

const PROFILE_KEY = 'native_lang_ai_profile';
const VOCAB_KEY = 'native_lang_ai_vocab';
const MISTAKES_KEY = 'native_lang_ai_mistakes';
const ACTING_KEY = 'native_lang_ai_acting';

export const defaultActingProgress: ActingProgressState = {
  practicedEmotions: ['happiness', 'sadness', 'anger'],
  completedDialogues: ['act-dial-1'],
  completedVoiceExercises: ['voice-happy', 'voice-sad'],
  completedEyeExercises: ['eye-1'],
  completedFacialExercises: ['face-1'],
  completedChallenges: [1],
  selfEvaluations: [
    {
      id: 'eval-1',
      date: 'Yesterday',
      dialogueId: 'act-dial-1',
      emotion: 'sadness',
      checklist: {
        maintainedEmotion: true,
        naturalFace: true,
        effectiveEyes: true,
        appropriatePauses: true,
        changedVoice: true,
        avoidedOveracting: true,
        naturalBody: true,
        clearPronunciation: true,
      },
      notes: 'Focused on relaxing shoulders and speaking with softer breath resonance.',
    },
  ],
};

export const defaultProfile: UserProfile = {
  name: 'Learner',
  targetLanguage: 'te', // Telugu as primary initial language
  level: 'beginner',
  goalMinutesPerDay: 15,
  streakDays: 4,
  totalXp: 340,
  completedLessonsCount: 3,
  learnedWordsCount: 18,
  speakingSessionsCount: 5,
  isOnboarded: true,
  theme: 'light',
  settings: {
    showPronunciationGuide: true,
    showRomanization: true,
    autoPlayAudio: false,
    speechSpeed: 1.0,
    dailyReminder: true,
  },
};

export const storageService = {
  getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
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
      localStorage.removeItem(VOCAB_KEY);
      localStorage.removeItem(MISTAKES_KEY);
      localStorage.removeItem(ACTING_KEY);
    } catch (e) {
      console.error('Failed to reset storage', e);
    }
  },
};
