import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Clapperboard,
  Drama,
  Video,
  AlertTriangle,
  Mic,
  BookOpen,
  CheckCircle2,
  Play,
  Film,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';

export const LandingPage: React.FC = () => {
  const { setShowLandingPage, setShowOnboarding, setTargetLanguage, setActiveTab, currentLanguage } = useApp();

  const handleStartPracticing = () => {
    setShowLandingPage(false);
    setShowOnboarding(true);
  };

  const handleExploreActing = () => {
    setShowLandingPage(false);
    setActiveTab('dialogue-lab');
  };

  const handleUploadPerformance = () => {
    setShowLandingPage(false);
    setActiveTab('performance-review');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white select-none">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 text-white shadow-lg shadow-amber-500/20">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                SceneLingo
              </span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Languages • Dialogues • Performance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartPracticing}
              className="rounded-2xl bg-amber-500 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-amber-500/20 hover:bg-amber-600 transition-all"
            >
              Enter Actor Studio
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-50/80 px-4 py-1.5 text-xs font-bold text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
            <Clapperboard className="h-4 w-4" />
            <span>The Actor's Personal Language & Performance Studio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Languages. Dialogues. <br />
            <span className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent">
              Emotions. Performance.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Learn a new language for your role, master your dialogues with natural diction, and practice emotional performance with scene-tested guidance.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleStartPracticing}
              className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-amber-500/25 hover:bg-amber-600 active:scale-95 transition-all"
            >
              Start Practicing
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={handleExploreActing}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              <Drama className="h-4 w-4 text-rose-500" />
              Explore Acting
            </button>

            <button
              onClick={handleUploadPerformance}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3.5 text-sm font-bold shadow-md hover:bg-black dark:hover:bg-slate-100 transition-all"
            >
              <Video className="h-4 w-4 text-indigo-400" />
              Upload Performance
            </button>
          </div>

          {/* Languages supported pill row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <span>Supported Languages:</span>
            {SUPPORTED_LANGUAGES.map((l) => (
              <span key={l.code} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <span>{l.flagEmoji}</span>
                <span>{l.name}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CORE 6 FEATURES AS REQUESTED */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-100 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Built Specifically for Performers & Audition Candidates
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Generic language apps teach you how to order coffee. SceneLingo trains you to deliver dramatic lines with camera-ready truth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: Learn a Language for Your Role */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Learn a Language for Your Role
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Step-by-step 5-level actor progression: phonetic diction, sentence cadence, natural speech glide, and full performance takes.
              </p>
            </div>

            {/* Feature 2: Practice Real Dialogues */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
                <Clapperboard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Practice Real Dialogues
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Explore 16 scene genres from Confrontations to Romantic Confessions, complete with native script, Romanization, and word-by-word diction.
              </p>
            </div>

            {/* Feature 3: Train Emotional Expression */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
                <Drama className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Train Emotional Expression
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Master 20 nuanced acting emotions. Learn facial micro-muscles, eye gaze directions, and pitch modulation to avoid theatrical overacting.
              </p>
            </div>

            {/* Feature 4: Improve Pronunciation & Diction */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Improve Pronunciation & Diction
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Listen to accurate target-language audio synthesis, practice syllable stress, and master tongue placements for crisp audio takes.
              </p>
            </div>

            {/* Feature 5: Review Your Performances */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Review Your Performances
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Upload or record acting takes. Scrub through interactive timeline feedback and evaluate pacing, eye focus, and body posture across 8 dimensions.
              </p>
            </div>

            {/* Feature 6: Track Your Mistakes to Mastery */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Track Your Mistakes to Mastery
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Turn performance flaws into strengths with structured Mistake Sessions across 20 actor categories—from wrong pauses to overacting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white">
          Ready for your next role in Telugu, Hindi, Tamil, Kannada, Malayalam, or Bengali?
        </h3>
        <button
          onClick={handleStartPracticing}
          className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-lg shadow-amber-500/25 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Launch SceneLingo Studio
        </button>
        <p className="text-[11px] text-slate-400">
          SceneLingo • "Languages. Dialogues. Emotions. Performance."
        </p>
      </footer>
    </div>
  );
};
