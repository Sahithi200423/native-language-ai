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
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ttsService } from '../services/ttsService';
import { aiActingCoachService } from '../services/aiActingCoachService';

interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  source?: 'remote-ai' | 'local-rule-based';
  languageCorrection?: string;
  actingAdvice?: string;
  practiceExercise?: string;
}

export const AIActingCoachPage: React.FC = () => {
  const { currentLanguage, profile } = useApp();
  const isServiceConfigured = aiActingCoachService.isServiceConfigured();

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<CoachMessage[]>([
    {
      id: 'msg-1',
      sender: 'coach',
      source: isServiceConfigured ? 'remote-ai' : 'local-rule-based',
      text: `Hello! I am your Acting & Language Coach for ${currentLanguage.name}. Ask me about character intentions, subtext, natural pauses, screen gaze, or how to avoid melodrama in your scenes.`,
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

  const handleSendPrompt = async (question: string) => {
    if (!question.trim() || isLoading) return;

    const userMsg: CoachMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: question,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await aiActingCoachService.askCoach({
        question,
        languageCode: currentLanguage.code,
        languageName: currentLanguage.name,
        currentRole: profile.currentRole,
      });

      const coachMsg: CoachMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        source: response.source,
        text: response.message,
        languageCorrection: response.languageCorrection,
        actingAdvice: response.actingAdvice,
        practiceExercise: response.practiceExercise,
      };

      setMessages((prev) => [...prev, coachMsg]);
    } catch (err: any) {
      const errorMsg: CoachMessage = {
        id: `coach-err-${Date.now()}`,
        sender: 'coach',
        source: 'local-rule-based',
        text: 'Coaching response could not be generated. Please try asking with different phrasing.',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
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
              {isServiceConfigured ? 'AI Acting Coach' : 'Acting Coach (Demo Mode)'}
            </h1>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isServiceConfigured
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {isServiceConfigured ? 'Live AI Connected' : 'Rule-Based Demo Mode'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Get structured performance direction and linguistic coaching for your {currentLanguage.name} roles.
          </p>
        </div>
      </div>

      {/* Transparent AI Configuration Notice */}
      {!isServiceConfigured && (
        <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-amber-900 dark:text-amber-200">
            <span className="font-bold">AI service not configured: </span>
            Operating in local rule-based rehearsal mode. To connect an external LLM endpoint, set <code className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/50 rounded font-mono text-[11px]">VITE_AI_COACH_API_URL</code> in your environment.
          </div>
        </div>
      )}

      {/* Suggested Quick Questions */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Frequent Actor Questions:
        </span>
        <div className="flex flex-wrap gap-2">
          {quickPromptQuestions.map((q, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSendPrompt(q)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-400 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors disabled:opacity-50"
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
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      m.source === 'remote-ai'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {m.source === 'remote-ai' ? 'Live AI Response' : 'Local Rule-Based Guidance'}
                  </span>
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

        {isLoading && (
          <div className="flex flex-col items-start animate-pulse">
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
              <span>Analyzing performance question and preparing acting direction...</span>
            </div>
          </div>
        )}
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
