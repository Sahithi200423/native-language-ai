import React, { useState } from 'react';
import {
  Bot,
  Send,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { aiService } from '../services/ai/aiService';
import { TutorMessage } from '../types';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';

export const AITutorPage: React.FC = () => {
  const { currentLanguage, profile } = useApp();

  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: 'm-1',
      sender: 'tutor',
      timestamp: 'Just now',
      content: `Hello ${profile.name}! I am your AI ${currentLanguage.name} Tutor. I explain grammar rules in English, break down vocabulary, translate phrases, and generate realistic everyday examples. What would you like to learn or practice today?`,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    { label: 'Explain Telugu Grammar (SOV)', intent: 'explain_grammar' as const },
    { label: 'Translate "Nice to meet you"', intent: 'translate' as const },
    { label: 'Generate everyday examples', intent: 'generate_examples' as const },
    { label: 'Polite vs Informal ("Unnaru" vs "Unnava")', intent: 'explain_grammar' as const },
  ];

  const handleSendMessage = async (textToSend?: string, promptIntent?: any) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: TutorMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiService.generateTutorResponse({
        message: text,
        language: currentLanguage.code,
        level: profile.level,
        history: messages,
        intent: promptIntent || 'general',
      });

      const tutorReply: TutorMessage = {
        id: `tut-${Date.now()}`,
        sender: 'tutor',
        timestamp: 'Just now',
        content: response.reply,
        learningPhrase: response.nativePhrase
          ? {
              id: `lp-${Date.now()}`,
              english: response.nativePhrase.english,
              native: response.nativePhrase.native,
              romanization: response.nativePhrase.romanization,
              pronunciationGuide: response.nativePhrase.pronunciationGuide,
              englishMeaning: response.nativePhrase.english,
            }
          : undefined,
      };

      setMessages((prev) => [...prev, tutorReply]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-10rem)] animate-in fade-in">
      {/* Header in English */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
              <Bot className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              AI Tutor
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            English-guided explanations for {currentLanguage.name} grammar, vocabulary, and cultural nuances
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Architecture Ready (Mock Engine)
        </span>
      </div>

      {/* Quick Prompts Bar in English */}
      <div className="my-3 flex flex-wrap gap-2">
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(p.label, p.intent)}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-brand-400"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 space-y-4 overflow-y-auto p-2 pr-4">
        {messages.map((msg) => {
          const isTutor = msg.sender === 'tutor';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                isTutor ? 'justify-start' : 'justify-end'
              }`}
            >
              {isTutor && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm dark:bg-brand-500">
                  <Bot className="h-4.5 w-4.5" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 text-sm leading-relaxed ${
                  isTutor
                    ? 'border border-slate-200 bg-white shadow-card dark:border-slate-800 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                    : 'bg-brand-600 text-white shadow-sm font-medium'
                }`}
              >
                <div className="whitespace-pre-line">{msg.content}</div>

                {/* Structured Target Content with 3-tier block */}
                {msg.learningPhrase && (
                  <div className="mt-3 rounded-2xl border border-brand-100 bg-brand-50/50 p-4 dark:border-brand-900/40 dark:bg-slate-800/80">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 mb-1 border-b border-brand-100/60 pb-1.5 dark:border-slate-700">
                      {currentLanguage.name} Example
                    </div>
                    <TargetLanguageBlock
                      content={{
                        native: msg.learningPhrase.native,
                        romanization: msg.learningPhrase.romanization,
                        englishMeaning: msg.learningPhrase.englishMeaning,
                        pronunciationGuide: msg.learningPhrase.pronunciationGuide,
                      }}
                      size="md"
                      showAudio={true}
                      showPronunciation={true}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Bot className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 text-xs text-slate-500">
              AI Tutor is analyzing grammar rules and preparing explanation...
            </div>
          </div>
        )}
      </div>

      {/* Input Composer in English */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-4 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-card dark:border-slate-800 dark:bg-slate-900"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={`Ask a question about ${currentLanguage.name}, request a translation, or practice...`}
          className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 focus:outline-none dark:text-white"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isLoading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-40 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
