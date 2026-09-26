import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Clapperboard,
  Drama,
  HelpCircle,
  Volume2,
  CheckCircle2,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ttsService } from '../services/ttsService';

interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  languageCorrection?: string;
  actingAdvice?: string;
  practiceExercise?: string;
}

export const AIActingCoachPage: React.FC = () => {
  const { currentLanguage } = useApp();

  const [inputQuestion, setInputQuestion] = useState('');
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'msg-1',
      sender: 'coach',
      text: `Hello! I am your AI Acting & Language Coach for ${currentLanguage.name}. Ask me about character intentions, subtext, natural pauses, screen gaze, or how to avoid melodrama in your scenes.`,
    },
  ]);

  const quickPromptQuestions = [
    'How can I show sadness without crying?',
    'How do I perform controlled anger?',
    'How can I improve my dramatic pauses?',
    'How should my eyes move in this scene?',
    `How can I sound natural in ${currentLanguage.name}?`,
    'How do I avoid overacting on camera?',
  ];

  const handleSendPrompt = (question: string) => {
    if (!question.trim()) return;

    const userMsg: CoachMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
    };

    // Generate structured coaching distinguishing Language Correction from Acting Advice
    let response: CoachMessage = {
      id: `coach-${Date.now() + 1}`,
      sender: 'coach',
      text: `Here is structured performance direction for your question: "${question}"`,
    };

    if (question.includes('sadness') || question.includes('crying')) {
      response = {
        ...response,
        languageCorrection: `In ${currentLanguage.name}, avoid over-elongating sorrowful vowels into a theatrical wail. Keep consonants grounded.`,
        actingAdvice: `Audiences are moved not by seeing an actor cry, but by seeing an actor fight NOT to cry. Keep your eyes heavy and still; allow your breath to hitch slightly on the intake before speaking.`,
        practiceExercise: `Deliver your line with a 1.5-second downward gaze, swallow quietly, then raise your eyes into the lens with clear vulnerability.`,
      };
    } else if (question.includes('controlled anger') || question.includes('anger')) {
      response = {
        ...response,
        languageCorrection: `In ${currentLanguage.name}, articulate your sentence-ending imperative verbs with crisp dental precision rather than loud vocal volume.`,
        actingAdvice: `Shouting releases the character's energy and reduces dramatic tension. True menace comes from stillness. Lower your voice into a steady, resonant chest whisper and stop blinking.`,
        practiceExercise: `Lock eyes onto a fixed point, breathe out from your abdomen, and speak at 70% volume while keeping your shoulders pinned down.`,
      };
    } else if (question.includes('pause')) {
      response = {
        ...response,
        languageCorrection: `In Dravidian and Indo-Aryan sentence structures, placing the pause before the verb or question particle heightens the suspense.`,
        actingAdvice: `A pause is not empty silence; it is where the character discovers their next thought. Inhale the thought before you speak the word.`,
        practiceExercise: `Count 2 internal beats between the pronoun and the revelation clause. Let the audience watch the thought cross your eyes.`,
      };
    } else if (question.includes('eyes') || question.includes('eye')) {
      response = {
        ...response,
        languageCorrection: `Match eye shifts with phrase boundaries rather than shifting eyes randomly mid-word.`,
        actingAdvice: `Rapid erratic blinking signals an unprepared actor. Hold eye contact on a single pupil of your partner. Break contact only when your character is overwhelmed or recalling a memory.`,
        practiceExercise: `Perform your dialogue with a single intentional focal shift: look down on the discovery, then lock into the listener for the conclusion.`,
      };
    } else if (question.includes('overacting')) {
      response = {
        ...response,
        languageCorrection: `Drop unnecessary dramatic flourishes. Speak with the casual economy of a native speaker having a private conversation.`,
        actingAdvice: `Trust that the camera sees everything. If you feel it internally and think the exact thought, the micro-muscles of your face will communicate it without you needing to push.`,
        practiceExercise: `Perform the dialogue with your body completely relaxed and motionless. Let only the voice and eyes do the work.`,
      };
    } else {
      response = {
        ...response,
        languageCorrection: `Ensure retroflex consonants and vowel lengths match natural ${currentLanguage.name} rhythms.`,
        actingAdvice: `Clarify your character's immediate objective: what do you need the other person in the scene to feel or do right now?`,
        practiceExercise: `Run the line 3 times: first at 50% emotional intensity, then 100%, then settle at an authentic 75%.`,
      };
    }

    setMessages((prev) => [...prev, userMsg, response]);
    setInputQuestion('');
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <Bot className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              AI Acting Coach
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Get structured performance direction and linguistic coaching for your {currentLanguage.name} roles.
          </p>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Frequent Actor Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPromptQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-400 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-4 max-h-[550px] overflow-y-auto p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {m.sender === 'user' ? (
              <div className="max-w-md p-3.5 rounded-2xl bg-amber-500 text-white text-xs font-semibold shadow-sm">
                {m.text}
              </div>
            ) : (
              <div className="max-w-2xl p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-[10px]">
                    🎬
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">Acting Coach</span>
                </div>

                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{m.text}</p>

                {/* Structured Breakdown: Language vs Acting */}
                {(m.languageCorrection || m.actingAdvice) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {m.languageCorrection && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40">
                        <strong className="text-indigo-900 dark:text-indigo-300 block mb-1 font-bold">
                          📖 Language Guidance:
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300">{m.languageCorrection}</p>
                      </div>
                    )}

                    {m.actingAdvice && (
                      <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40">
                        <strong className="text-amber-900 dark:text-amber-300 block mb-1 font-bold">
                          🎭 Acting Direction:
                        </strong>
                        <p className="text-slate-700 dark:text-slate-300">{m.actingAdvice}</p>
                      </div>
                    )}
                  </div>
                )}

                {m.practiceExercise && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800/40">
                    <strong>🎯 Try This Rehearsal Drill:</strong> {m.practiceExercise}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt(inputQuestion)}
          placeholder="Ask how to deliver a line, handle controlled anger, manage eye contact..."
          className="flex-1 px-3 py-2 text-xs bg-transparent text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400"
        />
        <button
          onClick={() => handleSendPrompt(inputQuestion)}
          className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all shadow-md shadow-amber-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
