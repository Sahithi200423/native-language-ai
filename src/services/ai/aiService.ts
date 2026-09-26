import {
  ConfidenceFeedback,
  LearnerLevel,
  SupportedLanguageCode,
  TutorMessage,
} from '../../types';

/**
 * AI Service Contract (Abstraction Layer)
 * 
 * NOTE ON SECURITY & ARCHITECTURE:
 * In production, this interface will communicate with a secure backend API route
 * (e.g. /api/ai/tutor, /api/ai/evaluate-speech) rather than bundling API keys directly
 * into frontend client code.
 * Currently, MockAIService provides realistic responses, latency simulation, and 
 * structured confidence coaching.
 */
export interface AIService {
  generateTutorResponse(params: {
    message: string;
    language: SupportedLanguageCode;
    level: LearnerLevel;
    history: TutorMessage[];
    intent?: 'explain_grammar' | 'explain_vocab' | 'translate' | 'generate_examples' | 'general';
  }): Promise<{
    reply: string;
    englishTranslation?: string;
    grammarNote?: string;
    nativePhrase?: {
      native: string;
      romanization: string;
      pronunciationGuide: string;
      english: string;
    };
  }>;

  evaluateSpeakingResponse(params: {
    scenarioId: string;
    language: SupportedLanguageCode;
    promptText: string;
    userSpokenText: string;
    audioBlob?: Blob;
  }): Promise<ConfidenceFeedback>;
}

export class MockAIService implements AIService {
  private delay(ms: number = 700): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generateTutorResponse(params: {
    message: string;
    language: SupportedLanguageCode;
    level: LearnerLevel;
    history: TutorMessage[];
    intent?: 'explain_grammar' | 'explain_vocab' | 'translate' | 'generate_examples' | 'general';
  }) {
    await this.delay(850);
    const lower = params.message.toLowerCase();

    if (params.intent === 'explain_grammar' || lower.includes('grammar') || lower.includes('verb') || lower.includes('tense')) {
      return {
        reply: `In Telugu, verb endings reflect both the subject's politeness/respect and person. When speaking politely or to someone older, use the plural/respectful suffix **-aru** (గారు / గారు ఉన్నారా). For informal peers, it shifts to **-avu** (ఉన్నావు). Notice how word order is typically **Subject + Object + Verb (SOV)**, unlike English (SVO)!`,
        grammarNote: 'SOV word order rule: "Nenu" (I) + "Annam" (Food) + "Tinnanu" (Ate) = I ate food.',
        nativePhrase: {
          native: 'నేను అన్నం తిన్నాను',
          romanization: 'Nenu annam tinnanu',
          pronunciationGuide: 'Ne-nu un-num thin-naa-nu',
          english: 'I ate food (Subject + Object + Verb)'
        }
      };
    }

    if (params.intent === 'translate' || lower.includes('how do you say') || lower.includes('translate')) {
      return {
        reply: `Here is how you say that in Telugu! In everyday natural conversation, respect is key when addressing elders or acquaintances.`,
        englishTranslation: 'Glad to meet you / Nice to meet you',
        nativePhrase: {
          native: 'మిమ్మల్ని కలవడం చాలా సంతోషంగా ఉంది',
          romanization: 'Mimmalni kalavadam chaalaa santoshamgaa undi',
          pronunciationGuide: 'Mim-mul-ni ku-lu-vu-dum chaa-laa sun-tho-shum-gaa oon-di',
          english: 'Nice to meet you (polite/warm)'
        }
      };
    }

    if (params.intent === 'generate_examples' || lower.includes('example')) {
      return {
        reply: `Here are two practical, everyday examples you can use right away:`,
        nativePhrase: {
          native: 'మీ పేరు ఏమిటి? / నా పేరు రాహుల్',
          romanization: 'Mee peru emiti? / Naa peru Rahul',
          pronunciationGuide: 'Mee pay-roo ay-mi-ti? / Naa pay-roo Rahul',
          english: 'What is your name? / My name is Rahul'
        }
      };
    }

    // Default friendly conversational response
    return {
      reply: `Great question! Learning Telugu step-by-step through English is very natural once you get comfortable with the sounds and phonetic rhythm. Would you like me to break down formal greetings, daily essentials, or simple sentence patterns?`,
      nativePhrase: {
        native: 'మళ్ళీ కలుద్దాం!',
        romanization: 'Malli kaluddam!',
        pronunciationGuide: 'Mul-lee ku-lood-daam!',
        english: 'See you again / Let\'s meet again!'
      }
    };
  }

  async evaluateSpeakingResponse(params: {
    scenarioId: string;
    language: SupportedLanguageCode;
    promptText: string;
    userSpokenText: string;
    audioBlob?: Blob;
  }): Promise<ConfidenceFeedback> {
    await this.delay(1100);

    const hasContent = params.userSpokenText.trim().length > 3;

    if (hasContent) {
      return {
        whatYouDidWell: 'Excellent effort! Your confidence was strong and your pronunciation of the primary vowel sounds was very clear and recognizable.',
        oneImportantCorrection: 'Pay slight attention to the polite verb ending: remember to use "unnaru" (ఉన్నారు) instead of informal "unnava" when addressing someone respectfully.',
        simpleExplanation: 'In Telugu culture, adding the respectful ending "-aru" signifies honor and politeness towards adults, colleagues, and new acquaintances.',
        betterVersion: {
          native: 'నేను బాగున్నాను, మీరు ఎలా ఉన్నారు?',
          romanization: 'Nenu baagunnanu, meeru ela unnaru?',
          englishMeaning: 'I am doing well, how are you? (polite and natural)'
        },
        invitationToTryAgain: 'Try recording this phrase one more time focusing on elongating the "naa" in "baagunnaanu". You are doing wonderfully!',
        metrics: {
          pronunciationScore: 88,
          grammarScore: 84,
          vocabularyScore: 92,
          naturalnessScore: 80,
          confidenceScore: 90
        }
      };
    }

    return {
      whatYouDidWell: 'Good attempt to speak up! Stepping outside your comfort zone is the biggest hurdle in language learning.',
      oneImportantCorrection: 'The phrasing was a bit incomplete. Try matching the full response format.',
      simpleExplanation: 'Start with the affirmative "Baagunnanu" (I am fine) to confirm you understood the prompt.',
      betterVersion: {
        native: 'బాగున్నాను, ధన్యవాదాలు!',
        romanization: 'Baagunnanu, dhanyavaadaalu!',
        englishMeaning: 'I am fine, thank you!'
      },
      invitationToTryAgain: 'Give it another shot! Speak clearly into the microphone at your own pace.',
      metrics: {
        pronunciationScore: 72,
        grammarScore: 75,
        vocabularyScore: 78,
        naturalnessScore: 70,
        confidenceScore: 75
      }
    };
  }
}

// Export singleton instance
export const aiService = new MockAIService();
