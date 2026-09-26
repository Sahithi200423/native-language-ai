import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Headphones,
  Mic,
  RotateCcw,
  CheckCircle2,
  BookOpen,
  Languages,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { AudioButton } from '../components/common/AudioButton';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';

export const LandingPage: React.FC = () => {
  const { setShowLandingPage, setShowOnboarding, currentLanguage } = useApp();

  const handleStart = () => {
    setShowLandingPage(false);
    setShowOnboarding(true);
  };

  const handleExplore = () => {
    setShowLandingPage(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 flex h-18 w-full items-center justify-between border-b border-slate-200/80 bg-white/90 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-brand-500 text-white shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Native Language AI
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2 py-0.5 rounded-full">
              Telugu & Indian Languages
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExplore}
            className="hidden sm:inline-flex rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Dashboard
          </button>
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 active:scale-95 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            <span>Get Started</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 sm:px-12 lg:pt-24 lg:pb-28 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-xs font-semibold text-brand-700 dark:border-brand-900 dark:bg-brand-950/50 dark:text-brand-300 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Powered Native Language Learning</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Learn your native language{' '}
            <span className="text-brand-600 dark:text-brand-400">through English</span>{' '}
            with confidence.
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300">
            A modern, supportive learning experience designed for conversational mastery.
            Starting with <strong className="text-slate-900 dark:text-white">Telugu</strong>, powered by an empathetic AI coach that encourages you at every step.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-md hover:bg-brand-700 active:scale-95 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              <span>Start Learning Telugu</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button
              onClick={handleExplore}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <span>Explore Dashboard</span>
            </button>
          </div>
        </div>

        {/* Core Learning Model Visual Hierarchy */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-card dark:border-slate-800 dark:bg-slate-900">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              The Pedagogical Engine
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              The 7-Step Confidence Learning Model
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Bridge your English fluency directly into authentic native expression.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { step: '1', title: 'English', desc: 'Support language context' },
              { step: '2', title: 'Target Script', desc: 'Telugu script & sound' },
              { step: '3', title: 'Understand', desc: 'Grammar & word structure' },
              { step: '4', title: 'Practice', desc: 'Active recall drills' },
              { step: '5', title: 'Speak', desc: 'Microphone & dialogue' },
              { step: '6', title: 'AI Correction', desc: 'Empathetic feedback' },
              { step: '7', title: 'Confidence', desc: 'Retry & natural flow' },
            ].map((m, idx) => (
              <div
                key={m.step}
                className="relative flex flex-col items-center rounded-2xl border border-slate-100 bg-slate-50/70 p-4 transition-all hover:border-brand-300 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700 text-xs font-bold dark:bg-brand-900 dark:text-brand-300 mb-2">
                  {m.step}
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {m.title}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authentic 5-Tier Language Learning Demo */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 mb-3">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Multi-Sensory Phonics</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Every phrase clearly decoded in 5 layers.
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              No guesswork or confusion. You see the native script, accessible Romanization, phonetic pronunciation guidance, and exact English meanings with cultural context.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 text-xs font-bold">✓</div>
                <span>Phonetic guide makes pronouncing soft Dravidian consonants effortless</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 text-xs font-bold">✓</div>
                <span>Cultural nuance notes explain polite vs. peer forms</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-300 text-xs font-bold">✓</div>
                <span>Audio pronunciation at standard and comfortable speeds</span>
              </div>
            </div>
          </div>

          {/* Interactive Card Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Preview</span>
              <AudioButton text="Ela unnaru?" size="sm" variant="pill" label="Listen" />
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                Concept: "How are you?"
              </div>
              <TargetLanguageBlock
                content={{
                  native: 'మీరు ఎలా ఉన్నారు?',
                  romanization: 'Meeru ela unnaaru?',
                  englishMeaning: 'How are you? (Polite & respectful)',
                  pronunciationGuide: 'Eh-la un-naa-ru?',
                }}
                size="lg"
                showPronunciation={true}
              />
            </div>
          </div>
        </div>

        {/* Multi-Language Architecture Showcase */}
        <div className="mt-20 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Scalable Language Architecture
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Engineered for all major Indian languages
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto mt-1">
            Built from day one to expand from Telugu to Hindi, Tamil, Kannada, Malayalam, Bengali, and beyond.
          </p>

          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <div
                key={lang.code}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-subtle dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-2xl">{lang.flagEmoji}</span>
                <div className="mt-1 font-bold text-slate-900 dark:text-white text-sm">{lang.name}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{lang.nativeName}</div>
                <div className="mt-2">
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      lang.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {lang.status === 'active' ? 'Active' : 'Architecture Ready'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 p-8 sm:p-12 text-center text-white shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Ready to speak Telugu naturally?
          </h3>
          <p className="mt-2 text-slate-300 max-w-lg mx-auto text-sm sm:text-base">
            Start with the basic greetings, test your pronunciation, and build confidence with our supportive AI coach.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-base font-bold text-slate-900 shadow-md hover:bg-slate-100 active:scale-95 transition-all"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
