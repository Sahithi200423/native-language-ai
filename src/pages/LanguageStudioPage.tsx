import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  CheckCircle,
  Play,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  Mic,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACTING_DIALOGUES } from '../data/actingData';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { ttsService } from '../services/ttsService';

export const LanguageStudioPage: React.FC = () => {
  const { currentLanguage, completeLesson, setActiveTab } = useApp();

  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedDialogueIndex, setSelectedDialogueIndex] = useState(0);

  const activeDialogue = ACTING_DIALOGUES[selectedDialogueIndex] || ACTING_DIALOGUES[0];
  const tr = activeDialogue.translations[currentLanguage.code] || activeDialogue.translations.te;

  const levels: { level: 1 | 2 | 3 | 4 | 5; label: string; desc: string; icon: string }[] = [
    { level: 1, label: 'Level 1: Diction & Phonetics', desc: 'Isolate sounds, dental vowels, and retroflex consonants', icon: '🔤' },
    { level: 2, label: 'Level 2: Sentence Cadence', desc: 'Grammar rhythm and connecting word compounds', icon: '📝' },
    { level: 3, label: 'Level 3: Natural Delivery', desc: 'Colloquial cadence vs formal classroom tone', icon: '🗣' },
    { level: 4, label: 'Level 4: Emotional Layering', desc: 'Infusing intention, pauses, and subtext into speech', icon: '🎭' },
    { level: 5, label: 'Level 5: Full Performance', desc: 'Master take ready for camera or stage audition', icon: '🎬' },
  ];

  const handleLevelComplete = () => {
    if (activeLevel < 5) {
      setActiveLevel((activeLevel + 1) as any);
    } else {
      completeLesson(activeDialogue.id, 100);
      setActiveTab('dialogue-lab');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Language Studio for Actors
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            5-Stage progression: from basic phonetic diction to natural native speech and full dramatic performance in {currentLanguage.name}.
          </p>
        </div>

        {/* Scene Dialogue Selector */}
        <div className="w-full sm:w-64">
          <select
            value={selectedDialogueIndex}
            onChange={(e) => {
              setSelectedDialogueIndex(Number(e.target.value));
              setActiveLevel(1);
            }}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            {ACTING_DIALOGUES.map((d, idx) => (
              <option key={d.id} value={idx}>
                [{d.sceneType || 'Scene'}] {d.situation}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 5-Level Stepper */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {levels.map((lvl) => {
          const isCurrent = activeLevel === lvl.level;
          const isPassed = activeLevel > lvl.level;
          return (
            <button
              key={lvl.level}
              onClick={() => setActiveLevel(lvl.level)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isCurrent
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                  : isPassed
                  ? 'border-emerald-300 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-base">{lvl.icon}</span>
                {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                {lvl.label}
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">{lvl.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Master Dialogue Target Block */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {activeDialogue.sceneType || 'Scene'}
            </span>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 capitalize">
              Target Emotion: {activeDialogue.emotion}
            </span>
          </div>

          <button
            onClick={() => ttsService.speak(tr.native, currentLanguage.code)}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4" />
            Listen
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <TargetLanguageBlock
            content={{
              native: tr.native,
              romanization: tr.romanization,
              englishMeaning: tr.englishMeaning,
            }}
            size="lg"
          />
        </div>
      </div>

      {/* Active Level Content Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">{levels[activeLevel - 1].icon}</span>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {levels[activeLevel - 1].label}
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400">Step {activeLevel} of 5</span>
        </div>

        {/* LEVEL 1: Diction & Phonetics */}
        {activeLevel === 1 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Break down the phrase into clean individual syllables. Accurate native vowels ensure your dialogue sounds crisp on studio microphones.
            </p>

            {tr.wordByWord && tr.wordByWord.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tr.wordByWord.map((w, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white font-telugu">{w.word}</p>
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{w.roman}</p>
                    <p className="text-[10px] text-slate-500">{w.meaning}</p>
                    <button
                      onClick={() => ttsService.speak(w.word, currentLanguage.code)}
                      className="pt-1 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-amber-600 flex items-center justify-center gap-1 mx-auto"
                    >
                      <Volume2 className="w-3 h-3" /> Say
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-xs text-slate-600">
                Practice clean vowel releases on each word: <strong>{tr.romanization}</strong>. Ensure tongue touches the palate accurately without Anglicized sliding vowels.
              </div>
            )}
          </div>
        )}

        {/* LEVEL 2: Sentence Cadence */}
        {activeLevel === 2 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Focus on the grammatical flow of the complete line. Pay close attention to where the operative thought pivots.
            </p>
            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-xs space-y-2">
              <strong className="text-amber-900 dark:text-amber-200 block">Pause Points & Hinge:</strong>
              <p className="text-slate-800 dark:text-slate-200 font-mono text-sm">{tr.pauseGuidance}</p>
            </div>
          </div>
        )}

        {/* LEVEL 3: Natural Delivery */}
        {activeLevel === 3 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Colloquial native speech connects phrases effortlessly. Avoid pronouncing each word like a robotic language textbook.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-rose-600 block mb-1">❌ Textbook Reading:</span>
                <p className="text-slate-600 dark:text-slate-400">Equal emphasis on every syllable, flat pitch, stiff diction.</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-1">✓ Actor's Natural Speech:</span>
                <p className="text-slate-700 dark:text-slate-300">Fluid syllable glide, dropping minor particles and leaning into operative nouns.</p>
              </div>
            </div>
          </div>
        )}

        {/* LEVEL 4: Emotional Layering */}
        {activeLevel === 4 && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Layer the subtext and emotional stakes beneath the words. What is your character trying to get from the listener?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <strong className="text-amber-600 block mb-0.5">🎯 Intention:</strong>
                <p className="text-slate-700 dark:text-slate-300">{activeDialogue.actingIntention || 'Demand honest answers.'}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <strong className="text-amber-600 block mb-0.5">👁 Eye Focus:</strong>
                <p className="text-slate-700 dark:text-slate-300">{activeDialogue.delivery.eyes}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <strong className="text-amber-600 block mb-0.5">🎙 Voice:</strong>
                <p className="text-slate-700 dark:text-slate-300">{activeDialogue.delivery.voice}</p>
              </div>
            </div>
          </div>
        )}

        {/* LEVEL 5: Full Performance */}
        {activeLevel === 5 && (
          <div className="space-y-4 text-center py-4">
            <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
            <h4 className="text-base font-black text-slate-900 dark:text-white">
              Ready for the Full Performance Take
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You have refined the diction, cadence, natural glide, and emotional intention. Perform the complete line now!
            </p>
          </div>
        )}

        {/* Advance Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleLevelComplete}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
          >
            {activeLevel < 5 ? (
              <>
                Advance to Level {activeLevel + 1}
                <ArrowRight className="w-4 h-4" />
              </>
            ) : (
              <>
                Complete Scene & Go to Dialogue Lab
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
