import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ttsService } from '../../services/ttsService';
import { SupportedLanguageCode } from '../../types';

interface AudioButtonProps {
  text: string;
  langCode?: SupportedLanguageCode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'filled' | 'pill';
  className?: string;
  label?: string;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  langCode = 'te',
  size = 'md',
  variant = 'ghost',
  className = '',
  label,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    await ttsService.speak(text, langCode);
    setIsPlaying(false);
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs gap-1',
    md: 'p-2 text-sm gap-1.5',
    lg: 'px-3 py-2 text-base gap-2',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  const variantClasses = {
    ghost:
      'text-brand-600 hover:text-brand-700 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-slate-800 rounded-lg',
    filled:
      'bg-brand-600 hover:bg-brand-700 text-white shadow-sm rounded-lg dark:bg-brand-500 dark:hover:bg-brand-600',
    pill: 'bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 rounded-full dark:bg-slate-800 dark:text-brand-300 dark:border-slate-700',
  }[variant];

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${variantClasses} ${sizeClasses} ${className}`}
      title={isPlaying ? 'Stop audio' : 'Listen to pronunciation'}
      aria-label={label || 'Listen to pronunciation'}
    >
      {isPlaying ? (
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
          <Volume2 className={`${iconSizes} animate-pulse`} />
          {label && <span>Listening...</span>}
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <Volume2 className={iconSizes} />
          {label && <span>{label}</span>}
        </span>
      )}
    </button>
  );
};
