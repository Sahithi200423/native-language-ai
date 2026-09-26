import React from 'react';
import { AudioButton } from './AudioButton';
import { TargetLanguageContent } from '../../types';

interface TargetLanguageBlockProps {
  content: TargetLanguageContent;
  size?: 'sm' | 'md' | 'lg';
  showAudio?: boolean;
  showMeaning?: boolean;
  showPronunciation?: boolean;
  className?: string;
  nativeClassName?: string;
  isCorrect?: boolean;
  isSelected?: boolean;
}

export const TargetLanguageBlock: React.FC<TargetLanguageBlockProps> = ({
  content,
  size = 'md',
  showAudio = false,
  showMeaning = true,
  showPronunciation = false,
  className = '',
  nativeClassName = '',
}) => {
  const sizeStyles = {
    sm: {
      native: 'text-lg',
      roman: 'text-xs',
      meaning: 'text-xs',
      pronounce: 'text-[11px]',
    },
    md: {
      native: 'text-xl sm:text-2xl',
      roman: 'text-sm',
      meaning: 'text-xs sm:text-sm',
      pronounce: 'text-xs',
    },
    lg: {
      native: 'text-2xl sm:text-3xl',
      roman: 'text-base',
      meaning: 'text-sm sm:text-base',
      pronounce: 'text-xs sm:text-sm',
    },
  }[size];

  return (
    <div className={`space-y-1 ${className}`}>
      {/* 1. Native script — Primary target-language text */}
      <div className="flex items-center justify-between gap-2">
        <div
          className={`font-bold font-telugu text-slate-900 dark:text-white leading-snug tracking-wide ${sizeStyles.native} ${nativeClassName}`}
        >
          {content.native}
        </div>
        {showAudio && (
          <AudioButton
            text={content.romanization}
            size={size === 'lg' ? 'md' : 'sm'}
            variant="ghost"
          />
        )}
      </div>

      {/* 2. Romanization — Secondary pronunciation aid */}
      <div
        className={`font-semibold text-brand-600 dark:text-brand-400 ${sizeStyles.roman}`}
      >
        {content.romanization}
      </div>

      {/* Optional: Phonetic syllable guide */}
      {showPronunciation && content.pronunciationGuide && (
        <div
          className={`inline-block rounded bg-amber-50 px-2 py-0.5 font-mono font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-200 ${sizeStyles.pronounce}`}
        >
          🗣️ {content.pronunciationGuide}
        </div>
      )}

      {/* 3. English meaning — Supporting translation */}
      {showMeaning && (
        <div
          className={`font-medium text-slate-600 dark:text-slate-300 ${sizeStyles.meaning}`}
        >
          {content.englishMeaning}
        </div>
      )}
    </div>
  );
};
