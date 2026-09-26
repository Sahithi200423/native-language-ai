import { LearnerLevel, LearningGoal } from '../types';

export const LEARNER_LEVELS: {
  level: LearnerLevel;
  title: string;
  subtitle: string;
  badge: string;
}[] = [
  {
    level: 'beginner',
    title: 'Absolute Beginner',
    subtitle: 'New to the language. Starting with essential greetings, basic words, and pronunciation.',
    badge: 'Level 1',
  },
  {
    level: 'elementary',
    title: 'Elementary Learner',
    subtitle: 'Know a few common phrases. Ready to construct basic sentences and understand daily needs.',
    badge: 'Level 2',
  },
  {
    level: 'intermediate',
    title: 'Intermediate Speaker',
    subtitle: 'Can form simple sentences. Focus on past/future tenses, complex vocabulary, and smooth flow.',
    badge: 'Level 3',
  },
  {
    level: 'conversational',
    title: 'Conversational Fluency',
    subtitle: 'Understand speech well. Aiming for native idiomatic nuances, slang, and cultural fluency.',
    badge: 'Level 4',
  },
];

export const LEARNING_GOALS: LearningGoal[] = [
  {
    id: 'casual',
    title: 'Casual Pace',
    description: '5 minutes / day — Perfect for light daily exposure without pressure.',
    dailyMinutes: 5,
    iconName: 'Coffee',
  },
  {
    id: 'regular',
    title: 'Standard Habit',
    description: '15 minutes / day — Recommended balance for steady, noticeable improvement.',
    dailyMinutes: 15,
    iconName: 'Zap',
  },
  {
    id: 'serious',
    title: 'Fast-Track',
    description: '30 minutes / day — Intensive progress for upcoming travel or relocation.',
    dailyMinutes: 30,
    iconName: 'Flame',
  },
  {
    id: 'immersion',
    title: 'Total Immersion',
    description: '45+ minutes / day — Deep linguistic mastery and rapid conversational ease.',
    dailyMinutes: 45,
    iconName: 'Compass',
  },
];
