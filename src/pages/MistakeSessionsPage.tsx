import React, { useState } from 'react';
import {
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Check,
  Filter,
  Mic,
  Volume2,
  Sparkles,
  ArrowRight,
  Square,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActorMistake, ActorMistakeCategory } from '../types';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { ACTING_DIALOGUES, EMOTIONS_DATA } from '../data/actingData';
import { ttsService } from '../services/ttsService';

export const MistakeSessionsPage: React.FC = () => {
  const { currentLanguage, actorMistakes, resolveActorMistake, addActorMistake } = useApp();

  const [activeTabMode, setActiveTabMode] = useState<'log' | 'workflow'>('log');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterResolved, setFilterResolved] = useState<'all' | 'open' | 'resolved'>('all');

  // Interactive Mistake Session Workflow State
  const [workflowStep, setWorkflowStep] = useState<1 | 2 | 3>(1);
  const [sessionDialogueId, setSessionDialogueId] = useState<string>(ACTING_DIALOGUES[0].id);
  const [sessionEmotion, setSessionEmotion] = useState<string>('sadness');
  const [isRecordingTake, setIsRecordingTake] = useState(false);
  const [takeSeconds, setTakeSeconds] = useState(0);
  const [takeCompleted, setTakeCompleted] = useState(false);
  const [timerRef, setTimerRef] = useState<any>(null);

  const categories: ActorMistakeCategory[] = [
    'Pronunciation',
    'Diction',
    'Wrong Word',
    'Wrong Pause',
    'Wrong Emphasis',
    'Voice Modulation',
    'Speaking Too Fast',
    'Speaking Too Slowly',
    'Emotion Not Clear',
    'Overacting',
    'Underacting',
    'Facial Expression',
    'Eye Expression',
    'Body Language',
    'Lack of Confidence',
    'Unnatural Delivery',
    'Wrong Emotional Intensity',
    'Dialogue Memory',
    'Lip Movement',
    'Scene Understanding',
  ];

  const filteredMistakes = actorMistakes.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesResolved =
      filterResolved === 'all'
        ? true
        : filterResolved === 'open'
        ? !m.resolved
        : m.resolved;
    return matchesCategory && matchesResolved;
  });

  const selectedDialogue =
    ACTING_DIALOGUES.find((d) => d.id === sessionDialogueId) || ACTING_DIALOGUES[0];
  const tr =
    selectedDialogue.translations[currentLanguage.code] || selectedDialogue.translations.te;

  const startTakeRecording = () => {
    setIsRecordingTake(true);
    setTakeSeconds(0);
    setTakeCompleted(false);
    const interval = setInterval(() => {
      setTakeSeconds((prev) => prev + 1);
    }, 1000);
    setTimerRef(interval);
  };

  const stopTakeRecording = () => {
    setIsRecordingTake(false);
    clearInterval(timerRef);
    setTakeCompleted(true);
    setWorkflowStep(3);
  };

  const resetWorkflow = () => {
    setWorkflowStep(1);
    setTakeCompleted(false);
    setTakeSeconds(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:bg-rose-400/10 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Mistake Sessions
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            "Turn performance mistakes into improvement." Categorize acting and diction errors, analyze why they matter, and practice until natural.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start sm:self-center">
          <button
            onClick={() => setActiveTabMode('log')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTabMode === 'log'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Mistakes Bank ({actorMistakes.filter((m) => !m.resolved).length} Open)
          </button>
          <button
            onClick={() => setActiveTabMode('workflow')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTabMode === 'workflow'
                ? 'bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Start Mistake Session
          </button>
        </div>
      </div>

      {/* MODE 1: MISTAKES LOG & REHEARSAL CARDS */}
      {activeTabMode === 'log' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex-1 w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All 20 Performance Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Category: {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {(['all', 'open', 'resolved'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterResolved(mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                    filterResolved === mode
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Mistakes Cards Grid */}
          <div className="space-y-4">
            {filteredMistakes.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-60" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  No Mistakes in this category!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  All logged performance adjustments have been mastered.
                </p>
              </div>
            ) : (
              filteredMistakes.map((mst) => (
                <div
                  key={mst.id}
                  className={`p-6 rounded-3xl border transition-all ${
                    mst.resolved
                      ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-75'
                      : 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/40 shadow-sm'
                  }`}
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300">
                        {mst.category}
                      </span>
                      {mst.resolved ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> Mastered & Corrected
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">
                          Logged {mst.createdAt}
                        </span>
                      )}
                    </div>

                    {!mst.resolved ? (
                      <button
                        onClick={() => resolveActorMistake(mst.id)}
                        className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 transition-colors"
                      >
                        ✓ Mark Corrected (+25 XP)
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                        Resolved
                      </span>
                    )}
                  </div>

                  {/* Target Dialogue Block */}
                  <div className="my-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Practice Dialogue
                      </span>
                      <button
                        onClick={() => ttsService.speak(mst.practiceDialogue.native, currentLanguage.code)}
                        className="text-amber-600 hover:text-amber-700 text-xs font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        Listen
                      </button>
                    </div>

                    <TargetLanguageBlock
                      content={{
                        native: mst.practiceDialogue.native,
                        romanization: mst.practiceDialogue.romanization,
                        englishMeaning: mst.practiceDialogue.englishMeaning,
                      }}
                      size="md"
                    />
                  </div>

                  {/* 4-Box Structured Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <strong className="text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[10px] block mb-1">
                        WHAT I DID
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300">{mst.whatIDid}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <strong className="text-amber-600 dark:text-amber-400 uppercase tracking-wider text-[10px] block mb-1">
                        WHAT TO IMPROVE
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300">{mst.whatToImprove}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <strong className="text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[10px] block mb-1">
                        WHY IT MATTERS
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300">{mst.whyItMatters}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                      <strong className="text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">
                        HOW TO FIX IT
                      </strong>
                      <p className="text-slate-700 dark:text-slate-300">{mst.howToFixIt}</p>
                    </div>
                  </div>

                  {/* Practice Again CTA */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <button
                      onClick={() => {
                        setSessionDialogueId(ACTING_DIALOGUES[0].id);
                        setActiveTabMode('workflow');
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Practice Again in Mistake Session
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODE 2: DEDICATED MISTAKE SESSION WORKFLOW */}
      {activeTabMode === 'workflow' && (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Workflow Step Tracker */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className={workflowStep === 1 ? 'text-amber-600' : 'text-slate-400'}>
              1. Select Dialogue & Emotion
            </span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <span className={workflowStep === 2 ? 'text-amber-600' : 'text-slate-400'}>
              2. Record Performance
            </span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
            <span className={workflowStep === 3 ? 'text-amber-600' : 'text-slate-400'}>
              3. Self-Review & Fix
            </span>
          </div>

          {/* STEP 1: Select Dialogue & Emotion */}
          {workflowStep === 1 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Step 1: Choose Dialogue & Target Emotion
              </h3>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 block">
                  Select Dialogue from Scene Catalog
                </label>
                <select
                  value={sessionDialogueId}
                  onChange={(e) => setSessionDialogueId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                >
                  {ACTING_DIALOGUES.map((d) => (
                    <option key={d.id} value={d.id}>
                      [{d.sceneType || 'Scene'}] {d.situation} ({d.emotion})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 block">
                  Target Emotion
                </label>
                <select
                  value={sessionEmotion}
                  onChange={(e) => setSessionEmotion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium capitalize text-slate-900 dark:text-white"
                >
                  {EMOTIONS_DATA.map((em) => (
                    <option key={em.id} value={em.id}>
                      {em.emoji} {em.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview Block */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <TargetLanguageBlock
                  content={{
                    native: tr.native,
                    romanization: tr.romanization,
                    englishMeaning: tr.englishMeaning,
                  }}
                  size="md"
                />
              </div>

              <button
                onClick={() => setWorkflowStep(2)}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
              >
                Proceed to Record Take →
              </button>
            </div>
          )}

          {/* STEP 2: Record Take */}
          {workflowStep === 2 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Step 2: Record Performance Rehearsal
              </h3>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 max-w-lg mx-auto">
                <TargetLanguageBlock
                  content={{
                    native: tr.native,
                    romanization: tr.romanization,
                    englishMeaning: tr.englishMeaning,
                  }}
                  size="lg"
                />
              </div>

              <div className="py-6">
                {isRecordingTake ? (
                  <div className="space-y-4">
                    <div className="text-2xl font-mono font-bold text-rose-500 animate-pulse">
                      🔴 00:{takeSeconds < 10 ? `0${takeSeconds}` : takeSeconds}
                    </div>
                    <button
                      onClick={stopTakeRecording}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      Finish Recording & Review
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={startTakeRecording}
                    className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm inline-flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all"
                  >
                    <Mic className="w-5 h-5" />
                    Start Audio Recording
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Performance Review & Top 3 Improvements */}
          {workflowStep === 3 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Step 3: Performance Review
                </h3>
                <span className="text-xs font-bold text-emerald-600">Take Captured ({takeSeconds}s)</span>
              </div>

              {/* Assessment Checklist Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                  <span>Pronunciation</span>
                  <span className="font-bold">✓ Good</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                  <span>Dialogue Accuracy</span>
                  <span className="font-bold">✓ Good</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 flex items-center justify-between">
                  <span>Emotion</span>
                  <span className="font-bold">Needs Practice</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 flex items-center justify-between">
                  <span>Pause</span>
                  <span className="font-bold">Needs Practice</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                  <span>Voice Modulation</span>
                  <span className="font-bold">✓ Good</span>
                </div>
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 flex items-center justify-between">
                  <span>Facial Expression</span>
                  <span className="font-bold">Needs Practice</span>
                </div>
              </div>

              {/* TOP 3 THINGS TO IMPROVE */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/30 border border-rose-200 dark:border-rose-900/40 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300">
                  Top 3 Things to Improve
                </span>
                <ol className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">1.</span>
                    <span>Make the {sessionEmotion} emotion clearer before beginning the line.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">2.</span>
                    <span>Slow down the second clause: {selectedDialogue.delivery.pause}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-rose-600">3.</span>
                    <span>Hold eye focus for one extra beat after delivering the final syllable.</span>
                  </li>
                </ol>
              </div>

              {/* Repeat Practice Action */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWorkflowStep(2)}
                  className="flex-1 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  Practice Again (Take 2)
                </button>
                <button
                  onClick={resetWorkflow}
                  className="px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  New Dialogue
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
