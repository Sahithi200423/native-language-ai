import React from 'react';
import {
  Flame,
  Award,
  Clapperboard,
  Drama,
  Mic,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Play,
  Volume2,
  Clock,
  Video,
  Film,
  Target,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { ACTING_DIALOGUES, EMOTIONS_DATA } from '../data/actingData';
import { ttsService } from '../services/ttsService';

export const DashboardPage: React.FC = () => {
  const {
    profile,
    currentLanguage,
    setActiveTab,
    actorMistakes,
    actingProgress,
  } = useApp();

  const unresolvedActorMistakes = actorMistakes.filter((m) => !m.resolved);

  // Next Practice Dialogue
  const nextDialogue = ACTING_DIALOGUES[0];
  const tr = nextDialogue.translations[currentLanguage.code] || nextDialogue.translations.te;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Actor Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 p-6 sm:p-8 text-white shadow-xl border border-amber-900/20">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur border border-white/10">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Target Language: {currentLanguage.name} for Acting</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight">
            Prepare your {currentLanguage.name} dialogues, strengthen your diction, and perform with confidence.
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Welcome to SceneLingo. From audition scenes to lead roles, rehearse dialogues with natural emotional inflection, precise pauses, and camera-ready presence.
          </p>

          {/* Actor Quick Metadata Chips */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Target Language</span>
              <strong className="text-white text-sm">{currentLanguage.name} ({currentLanguage.nativeName})</strong>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Current Role / Goal</span>
              <strong className="text-white text-sm truncate block">{profile.currentRole || 'Audition Preparation'}</strong>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Today's Practice</span>
              <strong className="text-white text-sm flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {profile.goalMinutesPerDay} Minutes
              </strong>
            </div>

            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">Rehearsal Streak</span>
              <strong className="text-white text-sm flex items-center gap-1 text-amber-400">
                <Flame className="w-3.5 h-3.5 fill-current" />
                {profile.streakDays} Days
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* "WHAT SHOULD I PRACTICE TODAY?" - NEXT PRACTICE CARD */}
      <div className="rounded-3xl border border-amber-200/80 bg-white p-6 shadow-sm dark:border-amber-900/30 dark:bg-slate-900 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Recommended Daily Rehearsal
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Scene: {nextDialogue.sceneType || 'Goodbye'}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Practice this dialogue with {nextDialogue.emotion}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => ttsService.speak(tr.native, currentLanguage.code)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Volume2 className="w-4 h-4 text-amber-600" />
              Listen
            </button>
            <button
              onClick={() => setActiveTab('dialogue-lab')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Practice in Lab
            </button>
            <button
              onClick={() => setActiveTab('performance-review')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold shadow-sm transition-all"
            >
              <Video className="w-3.5 h-3.5" />
              Record Take
            </button>
          </div>
        </div>

        {/* Target Dialogue Display */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <TargetLanguageBlock
            content={{
              native: tr.native,
              romanization: tr.romanization,
              englishMeaning: tr.englishMeaning,
            }}
            size="lg"
          />
        </div>

        {/* Actor Delivery Guidance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">Voice & Tone:</span>
            <p className="text-slate-700 dark:text-slate-300">{nextDialogue.delivery.voice}</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">Pause Placement:</span>
            <p className="text-slate-700 dark:text-slate-300">{nextDialogue.delivery.pause}</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">Eye Expression:</span>
            <p className="text-slate-700 dark:text-slate-300">{nextDialogue.delivery.eyes}</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30">
            <span className="font-bold text-amber-900 dark:text-amber-300 block mb-0.5">Acting Intention:</span>
            <p className="text-slate-700 dark:text-slate-300">{nextDialogue.actingIntention || 'Deliver with authentic vulnerability.'}</p>
          </div>
        </div>
      </div>

      {/* Main Studio Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Dialogue Lab Card */}
        <div
          onClick={() => setActiveTab('dialogue-lab')}
          className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-amber-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <Clapperboard className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dialogue Lab</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Browse 16 scene genres, practice the versatile "1 Line, 8 Emotions" benchmark, and rehearse line deliveries in {currentLanguage.name}.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <span>Explore Dialogues</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Emotion Studio Card */}
        <div
          onClick={() => setActiveTab('emotion-studio')}
          className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-rose-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <Drama className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Emotion Studio</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Master 20 nuanced acting emotions. Learn micro-muscle facial control, eye gaze angles, and voice pitch dynamics.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
            <span>Open Emotion Studio</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Performance Review Card */}
        <div
          onClick={() => setActiveTab('performance-review')}
          className="group cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Video className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Performance Review</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload or record your acting takes. Analyze pacing, eye focus, and diction with the 8-dimension actor evaluation rubric.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <span>Review Takes</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Performance Progress & Recent Actor Mistakes Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              Actor Rehearsal Progress
            </h3>
            <button
              onClick={() => setActiveTab('progress')}
              className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
            >
              Full Progress
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {actingProgress.completedDialogues.length}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Dialogues Mastered</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {actingProgress.practicedEmotions.length} / 20
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Emotions Explored</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {actingProgress.selfEvaluations.length}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Takes Evaluated</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Completed <strong>{actingProgress.completedChallenges.length}</strong> of 7 daily actor challenges.</span>
          </div>
        </div>

        {/* Recent Performance Mistakes */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-rose-500" />
              Recent Rehearsal Mistakes ({unresolvedActorMistakes.length})
            </h3>
            <button
              onClick={() => setActiveTab('mistakes')}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline"
            >
              Open Mistake Sessions
            </button>
          </div>

          {unresolvedActorMistakes.length === 0 ? (
            <p className="text-xs text-slate-500 italic py-6 text-center">
              No unresolved performance mistakes. Great delivery consistency!
            </p>
          ) : (
            <div className="space-y-2.5">
              {unresolvedActorMistakes.slice(0, 2).map((mst) => (
                <div
                  key={mst.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-[10px]">
                      {mst.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{mst.createdAt}</span>
                  </div>
                  <p className="text-slate-800 dark:text-slate-200 font-medium">
                    "{mst.dialogueSnippet}"
                  </p>
                  <p className="text-slate-500 text-[11px]">
                    <strong>Fix:</strong> {mst.whatToImprove}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
