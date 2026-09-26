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

export type LearnerLevel = 'beginner' | 'basic' | 'intermediate' | 'advanced' | 'elementary' | 'conversational';

export type ActorImprovementGoal =
  | 'Acting'
  | 'Dialogue Delivery'
  | 'Language Pronunciation'
  | 'Diction'
  | 'Emotional Expression'
  | 'Voice Modulation'
  | 'Audition Preparation'
  | 'Speaking Confidence'
  | 'Learning a New Language for a Role';

export type ActingMedium =
  | 'Film'
  | 'Television'
  | 'Theatre'
  | 'Web Series'
  | 'Short Films'
  | 'Auditions'
  | 'General Acting Practice';

export type FirstPracticePreference =
  | 'Dialogue'
  | 'Emotion'
  | 'Pronunciation'
  | 'Voice'
  | 'Facial Expression'
  | 'Full Performance';

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
  actorGoals?: string[];
  actingMedium?: string;
  firstPracticePreference?: string;
  currentRole?: string;
  settings: {
    showPronunciationGuide: boolean;
    showRomanization: boolean;
    autoPlayAudio: boolean;
    speechSpeed: number; // 0.8 to 1.2
    dailyReminder: boolean;
    cameraEnabled?: boolean;
    micEnabled?: boolean;
    cloudStorageEnabled?: boolean;
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
  emotion?: string;
  actingIntention?: string;
  pausePoints?: string;
  voiceGuidance?: string;
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
  category: 'Greetings' | 'Family' | 'Food' | 'Travel' | 'Numbers' | 'Essentials' | 'Emotions' | 'Audition' | 'Scene' | 'Character';
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

// Actor-specific Mistake Categories (20 categories)
export type ActorMistakeCategory =
  | 'Pronunciation'
  | 'Diction'
  | 'Wrong Word'
  | 'Wrong Pause'
  | 'Wrong Emphasis'
  | 'Voice Modulation'
  | 'Speaking Too Fast'
  | 'Speaking Too Slowly'
  | 'Emotion Not Clear'
  | 'Overacting'
  | 'Underacting'
  | 'Facial Expression'
  | 'Eye Expression'
  | 'Body Language'
  | 'Lack of Confidence'
  | 'Unnatural Delivery'
  | 'Wrong Emotional Intensity'
  | 'Dialogue Memory'
  | 'Lip Movement'
  | 'Scene Understanding';

export interface ActorMistake {
  id: string;
  languageCode: SupportedLanguageCode;
  category: ActorMistakeCategory;
  dialogueSnippet: string;
  whatIDid: string;
  whatToImprove: string;
  whyItMatters: string;
  howToFixIt: string;
  practiceDialogue: {
    native: string;
    romanization: string;
    englishMeaning: string;
  };
  resolved: boolean;
  createdAt: string;
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
  type?: 'general' | 'grammar_breakdown' | 'vocabulary_help' | 'pronunciation_tip' | 'acting_direction';
  actingTip?: string;
  languageCorrection?: string;
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

export type EmotionType =
  | 'happiness'
  | 'sadness'
  | 'anger'
  | 'grief'
  | 'love'
  | 'fear'
  | 'surprise'
  | 'disappointment'
  | 'calm'
  | 'frustration'
  | 'confidence'
  | 'shyness'
  | 'confusion'
  | 'shock'
  | 'excitement'
  | 'jealousy'
  | 'nervousness'
  | 'hope'
  | 'regret'
  | 'longing';

export interface EmotionDetail {
  id: EmotionType;
  name: string;
  emoji: string;
  shortDescription: string;
  face: {
    overall: string;
    eyes: string;
    eyebrows: string;
    forehead: string;
    mouth: string;
    jaw: string;
  };
  voice: {
    pitch: string;
    volume: string;
    speed: string;
    pauses: string;
    energy: string;
    emotionalTone: string;
  };
  body: {
    posture: string;
    shoulders: string;
    hands: string;
    breathing: string;
  };
  intensityLevels: {
    level: 1 | 2 | 3 | 4;
    label: string;
    guidance: string;
  }[];
}

// 16 Scene Types for Dialogue Lab
export type SceneType =
  | 'Romantic'
  | 'Emotional'
  | 'Argument'
  | 'Family'
  | 'Friendship'
  | 'Comedy'
  | 'Serious'
  | 'Audition'
  | 'Confrontation'
  | 'Goodbye'
  | 'Reunion'
  | 'Fear'
  | 'Success'
  | 'Failure'
  | 'Betrayal'
  | 'Confession';

export interface ActingDialogue {
  id: string;
  emotion: EmotionType;
  situation: string; // e.g. 'Goodbye'
  sceneType?: SceneType;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  intensity: 'Mild' | 'Medium' | 'Strong';
  actingIntention?: string;
  context?: string;
  translations: Record<
    SupportedLanguageCode,
    {
      native: string;
      romanization: string;
      englishMeaning: string;
      pauseGuidance: string;
      wordByWord?: { word: string; roman: string; meaning: string }[];
    }
  >;
  delivery: {
    voice: string;
    pause: string;
    eyes: string;
    face: string;
    body: string;
    emphasis?: string;
  };
}

export interface MultiEmotionDelivery {
  emotion: EmotionType;
  thought: string;
  eyes: string;
  face: string;
  voice: string;
  pace: string;
  pause: string;
  body: string;
  intensity: string;
}

export interface VersatileDialogue {
  id: string;
  englishBase: string;
  translations: Record<
    SupportedLanguageCode,
    {
      native: string;
      romanization: string;
    }
  >;
  deliveries: Record<string, MultiEmotionDelivery>;
}

export interface EmotionTransitionExercise {
  id: string;
  fromEmotion: EmotionType;
  toEmotion: EmotionType;
  title: string;
  scenario: string;
  steps: {
    step: number;
    emotion: string;
    cue: string;
    eyes: string;
    face: string;
    voice: string;
    pause: string;
    body: string;
  }[];
}

export interface ActingChallenge {
  day: number;
  title: string;
  description: string;
  emotion: EmotionType;
  promptPhrase: string;
  instructions: string[];
}

export interface ActingProgressState {
  practicedEmotions: string[];
  completedDialogues: string[];
  completedVoiceExercises: string[];
  completedEyeExercises: string[];
  completedFacialExercises: string[];
  completedChallenges: number[];
  selfEvaluations: {
    id: string;
    date: string;
    dialogueId: string;
    emotion: string;
    checklist: Record<string, boolean>;
    notes: string;
  }[];
}

// Performance Video Review
export interface PerformanceTimelineEvent {
  timestamp: string; // e.g. "00:03"
  seconds: number;
  note: string;
  type: 'positive' | 'needs_work' | 'neutral';
}

export interface PerformanceDimensionReview {
  name: string;
  icon: string;
  status: 'Strong' | 'Good' | 'Needs Practice' | 'Not Enough Evidence';
  whatWentWell: string;
  whatToImprove: string;
  exercise: string;
}

export interface PerformanceReviewItem {
  id: string;
  title: string;
  languageCode: SupportedLanguageCode;
  dialogueTitle: string;
  emotion: string;
  videoBlobUrl?: string;
  videoDuration?: number;
  fileSize?: string;
  createdAt: string;
  timelineNotes: PerformanceTimelineEvent[];
  dimensions: PerformanceDimensionReview[];
  topImprovements: string[];
  serviceConnected: boolean;
}
