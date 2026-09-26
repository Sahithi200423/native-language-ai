import { SupportedLanguageCode } from '../types';

const langCodeMap: Record<SupportedLanguageCode, { locale: string; name: string }> = {
  te: { locale: 'te-IN', name: 'Telugu' },
  hi: { locale: 'hi-IN', name: 'Hindi' },
  ta: { locale: 'ta-IN', name: 'Tamil' },
  kn: { locale: 'kn-IN', name: 'Kannada' },
  ml: { locale: 'ml-IN', name: 'Malayalam' },
  bn: { locale: 'bn-IN', name: 'Bengali' },
};

export interface TTSResult {
  success: boolean;
  message?: string;
}

type TTSListener = (msg: string) => void;

class TTSService {
  private listeners: Set<TTSListener> = new Set();

  public subscribeNotice(listener: TTSListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(msg: string) {
    this.listeners.forEach((l) => l(msg));
  }

  /**
   * Retrieves voices asynchronously to handle browser delays where getVoices() is initially empty.
   */
  public async getAvailableVoices(): Promise<SpeechSynthesisVoice[]> {
    if (!('speechSynthesis' in window)) return [];

    let voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) return voices;

    return new Promise((resolve) => {
      let resolved = false;

      const handleVoicesChanged = () => {
        if (resolved) return;
        resolved = true;
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        resolve(window.speechSynthesis.getVoices() || []);
      };

      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

      // Fallback timer: don't hang if browser never fires voiceschanged
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
          resolve(window.speechSynthesis.getVoices() || []);
        }
      }, 500);
    });
  }

  /**
   * Speaks the target dialogue text.
   * - Cancels previous speech.
   * - Searches exact locale (e.g. te-IN) then base language prefix (te).
   * - If no matching voice is available, cleanly notifies and does NOT play the wrong language.
   * - Resolves reliably with a safety watchdog timer so UI never freezes.
   */
  public async speak(
    text: string,
    langCode: SupportedLanguageCode = 'te',
    rate: number = 0.95
  ): Promise<TTSResult> {
    if (!('speechSynthesis' in window)) {
      const msg = 'Speech synthesis is not supported in this browser.';
      console.warn(msg);
      this.notify(msg);
      return { success: false, message: msg };
    }

    // Cancel any previous utterance before starting new speech
    window.speechSynthesis.cancel();

    const langInfo = langCodeMap[langCode] || { locale: 'te-IN', name: 'Telugu' };
    const targetLocale = langInfo.locale.toLowerCase();
    const baseCode = langCode.toLowerCase();

    const voices = await this.getAvailableVoices();

    // 1. Exact locale match (e.g. te-in, hi-in)
    let matchedVoice = voices.find(
      (v) => v.lang.replace('_', '-').toLowerCase() === targetLocale
    );

    // 2. Base language fallback (e.g. te, hi, ta)
    if (!matchedVoice) {
      matchedVoice = voices.find((v) =>
        v.lang.replace('_', '-').toLowerCase().startsWith(baseCode)
      );
    }

    // If no voice matches this target language, do NOT silently play in wrong voice
    if (!matchedVoice) {
      const warningMsg = `No matching voice is available in this browser for ${langInfo.name} (${langInfo.locale}).`;
      console.warn(warningMsg);
      this.notify(warningMsg);
      return { success: false, message: warningMsg };
    }

    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = matchedVoice;
      utterance.lang = langInfo.locale;
      utterance.rate = rate;
      utterance.pitch = 1.0;

      let hasFinished = false;

      // Safety timer so promise always resolves even if browser hangs onend
      const maxDuration = Math.max(text.length * 250 + 3000, 5000);
      const watchdog = setTimeout(() => {
        if (!hasFinished) {
          hasFinished = true;
          window.speechSynthesis.cancel();
          resolve({ success: true });
        }
      }, maxDuration);

      utterance.onend = () => {
        if (!hasFinished) {
          hasFinished = true;
          clearTimeout(watchdog);
          resolve({ success: true });
        }
      };

      utterance.onerror = (e) => {
        if (!hasFinished) {
          hasFinished = true;
          clearTimeout(watchdog);
          console.warn('Speech synthesis error:', e);
          resolve({ success: false, message: 'Speech playback encountered an error.' });
        }
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public stop(): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const ttsService = new TTSService();
