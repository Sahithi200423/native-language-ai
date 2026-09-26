import { SupportedLanguageCode } from '../types';

export interface CoachQueryRequest {
  question: string;
  languageCode: SupportedLanguageCode;
  languageName: string;
  currentRole?: string;
  sceneContext?: string;
}

export interface CoachQueryResponse {
  isConfigured: boolean;
  source: 'remote-ai' | 'local-rule-based';
  message: string;
  languageCorrection?: string;
  actingAdvice: string;
  practiceExercise: string;
}

class AIActingCoachService {
  private apiUrl: string | null;

  constructor() {
    this.apiUrl = (import.meta as any).env?.VITE_AI_COACH_API_URL || null;
  }

  public isServiceConfigured(): boolean {
    return Boolean(this.apiUrl && this.apiUrl.trim().length > 0);
  }

  /**
   * Queries the acting coach.
   * If remote endpoint is configured, dispatches a POST request with timeout.
   * If not configured, provides structured rule-based coaching labeled clearly as local/demo.
   */
  public async askCoach(req: CoachQueryRequest): Promise<CoachQueryResponse> {
    if (this.isServiceConfigured()) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const res = await fetch(`${this.apiUrl}/coach`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`AI Coach API responded with status ${res.status}`);
        }

        const data = await res.json();
        return {
          isConfigured: true,
          source: 'remote-ai',
          message: data.message || 'Analysis received from remote AI Acting Coach.',
          languageCorrection: data.languageCorrection,
          actingAdvice: data.actingAdvice || data.advice,
          practiceExercise: data.practiceExercise || data.exercise,
        };
      } catch (err: any) {
        console.warn('AI Coach remote API connection failed, falling back to local studio direction:', err);
        const fallback = this.generateLocalCoaching(req);
        return {
          ...fallback,
          isConfigured: false,
          message: `Remote AI service unreachable (${err.message || 'Connection error'}). Providing local studio direction:`,
        };
      }
    }

    // Explicitly unconfigured: Provide transparent local rule-based direction
    return this.generateLocalCoaching(req);
  }

  /**
   * Generates structured local rule-based coaching.
   * Clearly marked as local studio guidance so users are never misled.
   */
  public generateLocalCoaching(req: CoachQueryRequest): CoachQueryResponse {
    const q = req.question.toLowerCase();
    const lang = req.languageName;

    if (q.includes('sadness') || q.includes('crying') || q.includes('grief')) {
      return {
        isConfigured: false,
        source: 'local-rule-based',
        message: 'Local Rule-Based Performance Direction:',
        languageCorrection: `In ${lang}, avoid dragging out sorrowful vowels into a theatrical wail. Keep consonants grounded and articulate cleanly.`,
        actingAdvice: `Audiences are moved not by seeing an actor cry, but by seeing an actor fight NOT to cry. Keep your eyes heavy and still; allow your breath to hitch slightly on the intake before speaking.`,
        practiceExercise: `Deliver your line with a 1.5-second downward gaze, swallow quietly, then raise your eyes into the lens with clear vulnerability.`,
      };
    }

    if (q.includes('controlled anger') || q.includes('anger') || q.includes('fury') || q.includes('rage')) {
      return {
        isConfigured: false,
        source: 'local-rule-based',
        message: 'Local Rule-Based Performance Direction:',
        languageCorrection: `In ${lang}, articulate your sentence-ending imperative verbs with crisp dental precision rather than loud vocal volume.`,
        actingAdvice: `Shouting releases the character's energy and collapses dramatic tension. True menace comes from stillness. Lower your voice into a steady, resonant chest whisper and stop blinking.`,
        practiceExercise: `Lock eyes onto a fixed point, breathe out from your abdomen, and speak at 70% volume while keeping your shoulders pinned down.`,
      };
    }

    if (q.includes('pause') || q.includes('silence') || q.includes('rhythm') || q.includes('timing')) {
      return {
        isConfigured: false,
        source: 'local-rule-based',
        message: 'Local Rule-Based Performance Direction:',
        languageCorrection: `In ${lang}'s sentence structures, placing the pause before the verb or crucial question particle heightens the suspense naturally.`,
        actingAdvice: `A pause is never empty silence; it is where the character discovers their next thought. Inhale the thought before you utter the word.`,
        practiceExercise: `Count 2 internal beats between the pronoun and the revelation clause. Let the audience watch the realization cross your eyes.`,
      };
    }

    if (q.includes('eyes') || q.includes('eye') || q.includes('gaze') || q.includes('look') || q.includes('blink')) {
      return {
        isConfigured: false,
        source: 'local-rule-based',
        message: 'Local Rule-Based Performance Direction:',
        languageCorrection: `Match eye shifts with phrase boundaries rather than darting your pupils mid-syllable.`,
        actingAdvice: `Rapid erratic blinking signals an unprepared or anxious actor. Hold eye contact on a single pupil of your partner. Break contact only when your character is overwhelmed or recalling a memory.`,
        practiceExercise: `Perform your dialogue with a single intentional focal shift: look down on the internal discovery, then lock into the listener for the conclusion.`,
      };
    }

    if (q.includes('overacting') || q.includes('melodrama') || q.includes('subtle') || q.includes('natural')) {
      return {
        isConfigured: false,
        source: 'local-rule-based',
        message: 'Local Rule-Based Performance Direction:',
        languageCorrection: `Drop unnecessary dramatic flourishes. Speak with the casual economy of a native speaker having an intimate, private conversation in ${lang}.`,
        actingAdvice: `Trust that the camera registers micro-movements. If you feel it internally and think the exact thought, the micro-muscles of your face will communicate it without you having to push.`,
        practiceExercise: `Perform the dialogue with your body completely relaxed and motionless. Let only the voice and eyes do the work.`,
      };
    }

    if (q.includes('dialogue') || q.includes('perform') || q.includes('scene') || q.includes('audition')) {
      return {
        isConfigured: false,
        source: 'local-rule-based',
        message: 'Local Rule-Based Performance Direction:',
        languageCorrection: `Pay special attention to natural vowel elongations and retroflex consonants in ${lang}. Never rush through the opening greeting.`,
        actingAdvice: `Identify your character's immediate scene objective: what do you need the other person to feel or do right now? Play the objective, not the emotion.`,
        practiceExercise: `Rehearse the scene three times: first as an accusation, second as a plea, third as a quiet confession. Settle into the confession.`,
      };
    }

    return {
      isConfigured: false,
      source: 'local-rule-based',
      message: 'Local Rule-Based Performance Direction:',
      languageCorrection: `Ensure retroflex consonants and syllable lengths match native ${lang} speech patterns.`,
      actingAdvice: `Clarify your character's internal subtext. What is the character refusing to say aloud while speaking these words?`,
      practiceExercise: `Run the line 3 times: first at 50% emotional intensity, then 100%, then settle at an authentic, camera-ready 75%.`,
    };
  }
}

export const aiActingCoachService = new AIActingCoachService();
