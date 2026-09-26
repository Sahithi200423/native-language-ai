import { SupportedLanguageCode } from '../types';

const langCodeMap: Record<SupportedLanguageCode, string> = {
  te: 'te-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  bn: 'bn-IN',
};

export const ttsService = {
  speak(text: string, langCode: SupportedLanguageCode = 'te', rate: number = 0.95): Promise<void> {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // Stop any pending speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;

      const targetLang = langCodeMap[langCode] || 'en-US';
      utterance.lang = targetLang;

      // Try finding an exact or native matching voice
      const voices = window.speechSynthesis.getVoices();
      const matchedVoice = voices.find(
        (v) => v.lang.toLowerCase() === targetLang.toLowerCase() || v.lang.startsWith(langCode)
      );

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    });
  },

  stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};
