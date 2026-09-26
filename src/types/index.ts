export type SupportedLanguageCode = 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'bn';

export interface LanguageInfo {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
  script: string;
  flagEmoji: string;
  description: string;
  status: 'active' | 'coming_soon';
  speakersCount: string;
  sampleGreeting: {
    english: string;
    native: string;
    romanization: string;
    pronunciation: string;
  };
}

export type LearnerLevel = 'beginner' | 'elementary' | 'intermediate' | 'conversational';

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  dailyMinutes: number;
  iconName: string;
}

export interface UserProfile {
  name: string;
  targetLanguage: SupportedLanguageCode;
  level: LearnerLevel;
  goalMinutesPerDay: number;
  streakDays: number;
  totalXp: number;
  completedLessonsCount: number;
  learnedWordsCount: number;
  speakingSessionsCount: number;
  isOnboarded: boolean;
  theme: 'light' | 'dark' | 'system';
  settings: {
    showPronunciationGuide: boolean;
    showRomanization: boolean;
    autoPlayAudio: boolean;
    speechSpeed: number; // 0.8 to 1.2
    dailyReminder: boolean;
  };
}

export interface LearningPhrase {
  id: string;
  english: string;
  native: string; // Telugu script e.g. "ఎలా ఉన్నారు?"
  romanization: string; // "Ela unnaru?"
  pronunciationGuide: string; // "Eh-la un-naa-ru?"
  englishMeaning: string; // "How are you? (polite / formal)"
  breakdown?: {
    word: string;
    romanized: string;
    meaning: string;
  }[];
  culturalNote?: string;
  audioSampleUrl?: string;
}

export interface Lesson {
  id: string;
  languageCode: SupportedLanguageCode;
  unit: number;
  unitTitle: string;
  title: string;
  description: string;
  level: LearnerLevel;
  estimatedMinutes: number;
  phrases: LearningPhrase[];
  practiceExercises: PracticeExercise[];
  completed: boolean;
  score?: number;
}

export type ExerciseType = 'multiple_choice' | 'translate_to_target' | 'arrange_words' | 'audio_listen';

export interface TargetLanguageContent {
  native: string;
  romanization: string;
  englishMeaning: string;
  pronunciationGuide?: string;
}

export interface PracticeOption {
  id: string;
  native: string;
  romanization: string;
  englishMeaning: string;
}

export interface PracticeExercise {
  id: string;
  type: ExerciseType;
  prompt: string; // Stays in English
  options: PracticeOption[];
  correctOptionId: string;
  explanation: string; // Stays in English
  audioPrompt?: string;
}

export interface VocabularyWord {
  id: string;
  languageCode: SupportedLanguageCode;
  category: 'Greetings' | 'Family' | 'Food' | 'Travel' | 'Numbers' | 'Essentials' | 'Emotions';
  word: string; // Native script
  romanization: string;
  pronunciationGuide: string;
  englishMeaning: string;
  partOfSpeech: string;
  exampleSentence: {
    native: string;
    romanization: string;
    english: string;
  };
  isSaved: boolean;
  isLearned: boolean;
  lastReviewedAt?: string;
}

export type MistakeCategory =
  | 'grammar'
  | 'vocabulary'
  | 'pronunciation'
  | 'word_order'
  | 'spelling'
  | 'natural_expression';

export interface MistakeItem {
  id: string;
  languageCode: SupportedLanguageCode;
  category: MistakeCategory;
  whatYouSaid: string;
  betterVersion: string;
  nativeScript: string;
  romanization: string;
  whatYouDidWell: string;
  simpleExplanation: string;
  invitationToRetry: string;
  createdAt: string;
  resolved: boolean;
  attemptsCount: number;
}

export interface ConfidenceFeedback {
  whatYouDidWell: string;
  oneImportantCorrection: string;
  simpleExplanation: string;
  betterVersion: {
    native: string;
    romanization: string;
    englishMeaning: string;
  };
  invitationToTryAgain: string;
  metrics: {
    pronunciationScore: number; // 0 - 100
    grammarScore: number;
    vocabularyScore: number;
    naturalnessScore: number;
    confidenceScore: number;
  };
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'tutor';
  timestamp: string;
  content: string;
  learningPhrase?: LearningPhrase;
  feedback?: ConfidenceFeedback;
  type?: 'general' | 'grammar_breakdown' | 'vocabulary_help' | 'pronunciation_tip';
}

export interface SpeakingScenario {
  id: string;
  title: string;
  context: string;
  level: LearnerLevel;
  aiFirstMessage: {
    native: string;
    romanization: string;
    english: string;
  };
  expectedResponseExample: {
    native: string;
    romanization: string;
    english: string;
  };
}
