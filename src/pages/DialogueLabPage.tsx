import React, { useState } from 'react';
import {
  Clapperboard,
  Search,
  Filter,
  Volume2,
  Mic,
  Bookmark,
  AlertTriangle,
  Play,
  Layers,
  Sparkles,
  Info,
  CheckCircle,
  Eye,
  Smile,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ACTING_DIALOGUES, VERSATILE_BENCHMARK_DIALOGUE, EMOTIONS_DATA } from '../data/actingData';
import { ActingDialogue, EmotionType, SceneType } from '../types';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { ttsService } from '../services/ttsService';

export const DialogueLabPage: React.FC = () => {
  const { currentLanguage, recordDialogueCompletion, addActorMistake, setActiveTab } = useApp();

  const [activeTabMode, setActiveTabMode] = useState<'catalog' | 'multi-emotion'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('all');
  const [selectedSceneType, setSelectedSceneType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const [activeDialogueId, setActiveDialogueId] = useState<string>(ACTING_DIALOGUES[0].id);
  const [savedDialogueIds, setSavedDialogueIds] = useState<string[]>([]);
  const [recordedTakes, setRecordedTakes] = useState<Record<string, number>>({});
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  // Multi-emotion benchmark state
  const [benchmarkEmotion, setBenchmarkEmotion] = useState<string>('Sadness');

  const sceneTypes: SceneType[] = [
    'Romantic',
    'Emotional',
    'Argument',
    'Family',
    'Friendship',
    'Comedy',
    'Serious',
    'Audition',
    'Confrontation',
    'Goodbye',
    'Reunion',
    'Fear',
    'Success',
    'Failure',
    'Betrayal',
    'Confession',
  ];

  const filteredDialogues = ACTING_DIALOGUES.filter((d) => {
    const tr = d.translations[currentLanguage.code] || d.translations.te;
    const matchesSearch =
      tr.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tr.romanization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tr.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.context && d.context.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesEmotion = selectedEmotion === 'all' || d.emotion === selectedEmotion;
    const matchesScene = selectedSceneType === 'all' || d.sceneType === selectedSceneType;
    const matchesDiff = selectedDifficulty === 'all' || d.difficulty === selectedDifficulty;

    return matchesSearch && matchesEmotion && matchesScene && matchesDiff;
  });

  const activeDialogue =
    ACTING_DIALOGUES.find((d) => d.id === activeDialogueId) || filteredDialogues[0] || ACTING_DIALOGUES[0];

  const activeTr = activeDialogue.translations[currentLanguage.code] || activeDialogue.translations.te;

  const toggleSave = (id: string) => {
    setSavedDialogueIds((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id]
    );
    showNotice(savedDialogueIds.includes(id) ? 'Removed from saved' : 'Saved to your Actor Repertoire!');
  };

  const handleRecordTake = (id: string) => {
    setRecordedTakes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    recordDialogueCompletion(id);
    showNotice('Take recorded! Practice logged to Progress (+25 XP)');
  };

  const handleAddToMistakes = (dialogue: ActingDialogue) => {
    const trLocal = dialogue.translations[currentLanguage.code] || dialogue.translations.te;
    addActorMistake({
      languageCode: currentLanguage.code,
      category: 'Unnatural Delivery',
      dialogueSnippet: trLocal.native,
      whatIDid: `Pacing or emotional inflection felt ungrounded during the ${dialogue.emotion} take.`,
      whatToImprove: `Refine the pause points and vocal modulation for authentic ${dialogue.emotion} delivery.`,
      whyItMatters: 'Scenes lose their impact if an actor rushes through lines without subtext.',
      howToFixIt: dialogue.delivery.pause,
      practiceDialogue: {
        native: trLocal.native,
        romanization: trLocal.romanization,
        englishMeaning: trLocal.englishMeaning,
      },
    });
    showNotice('Added dialogue to your Mistake Sessions for deliberate drills!');
  };

  const showNotice = (msg: string) => {
    setNoticeMessage(msg);
    setTimeout(() => setNoticeMessage(null), 3500);
  };

  // Benchmark multi-emotion translation
  const benchmarkTr =
    VERSATILE_BENCHMARK_DIALOGUE.translations[currentLanguage.code] ||
    VERSATILE_BENCHMARK_DIALOGUE.translations.te;
  const benchmarkDelivery = VERSATILE_BENCHMARK_DIALOGUE.deliveries[benchmarkEmotion];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Notice Toast */}
      {noticeMessage && (
        <div className="fixed top-20 right-6 z-50 bg-amber-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl animate-in slide-in-from-top-2">
          {noticeMessage}
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <Clapperboard className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Dialogue Lab
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rehearse full dramatic lines in {currentLanguage.name} across 16 scene genres, and master the "1 Line, 8 Emotions" versatility benchmark.
          </p>
        </div>

        {/* Tab Toggle: Catalog vs Same Dialogue Multiple Emotions */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl self-start sm:self-center">
          <button
            onClick={() => setActiveTabMode('catalog')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTabMode === 'catalog'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Scene Catalog
          </button>
          <button
            onClick={() => setActiveTabMode('multi-emotion')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTabMode === 'multi-emotion'
                ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            1 Line, 8 Emotions
          </button>
        </div>
      </div>

      {/* MODE 1: SCENE CATALOG */}
      {activeTabMode === 'catalog' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dialogue, meaning..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            {/* Scene Type Filter (16 Types) */}
            <div>
              <select
                value={selectedSceneType}
                onChange={(e) => setSelectedSceneType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All Scene Types (16)</option>
                {sceneTypes.map((st) => (
                  <option key={st} value={st}>
                    Scene: {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Emotion Filter */}
            <div>
              <select
                value={selectedEmotion}
                onChange={(e) => setSelectedEmotion(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium capitalize"
              >
                <option value="all">All Emotions</option>
                {EMOTIONS_DATA.map((em) => (
                  <option key={em.id} value={em.id}>
                    {em.emoji} {em.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner Lines</option>
                <option value="Intermediate">Intermediate Scenes</option>
                <option value="Advanced">Advanced Dramatic Soliloquies</option>
              </select>
            </div>
          </div>

          {/* Main Layout: Dialogue List (Left 5) & Rehearsal Studio (Right 7) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Dialogue Selection List */}
            <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
              {filteredDialogues.length === 0 ? (
                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
                  <p className="text-xs text-slate-400">No dialogues match your filter criteria.</p>
                </div>
              ) : (
                filteredDialogues.map((item) => {
                  const itemTr = item.translations[currentLanguage.code] || item.translations.te;
                  const isSelected = activeDialogue.id === item.id;
                  const takesCount = recordedTakes[item.id] || 0;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveDialogueId(item.id)}
                      className={`p-4 rounded-3xl border text-left cursor-pointer transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 shadow-sm ring-1 ring-amber-500/20'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {item.sceneType || 'Dramatic'}
                          </span>
                          <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 capitalize">
                            • {item.emotion}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            • {item.difficulty || 'Intermediate'}
                          </span>
                        </div>
                        {takesCount > 0 && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            {takesCount} Takes
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 font-telugu">
                        {itemTr.native}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {itemTr.englishMeaning}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Active Dialogue Actor Rehearsal Lab */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                {/* Dialogue Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        {activeDialogue.sceneType || 'Scene'}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 capitalize">
                        Emotion: {activeDialogue.emotion}
                      </span>
                      <span className="text-xs text-slate-400">
                        Intensity: {activeDialogue.intensity}
                      </span>
                    </div>
                    {activeDialogue.context && (
                      <p className="text-xs text-slate-500 italic mt-1.5">
                        Context: "{activeDialogue.context}"
                      </p>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSave(activeDialogue.id)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                        savedDialogueIds.includes(activeDialogue.id)
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Save to Repertoire"
                    >
                      <Bookmark className="w-4 h-4" />
                      <span className="hidden sm:inline">Save</span>
                    </button>
                    <button
                      onClick={() => handleAddToMistakes(activeDialogue)}
                      className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 text-xs font-semibold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1"
                      title="Add to Mistake Sessions"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      <span className="hidden sm:inline">Add to Mistakes</span>
                    </button>
                  </div>
                </div>

                {/* Primary Dialogue Target Block */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Dialogue in {currentLanguage.name}
                    </span>
                    <button
                      onClick={() => ttsService.speak(activeTr.native, currentLanguage.code)}
                      className="p-1.5 rounded-xl text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/60 transition-colors flex items-center gap-1 text-xs font-bold"
                    >
                      <Volume2 className="w-4 h-4" />
                      Listen Native Audio
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <TargetLanguageBlock
                      content={{
                        native: activeTr.native,
                        romanization: activeTr.romanization,
                        englishMeaning: activeTr.englishMeaning,
                      }}
                      size="lg"
                    />
                  </div>
                </div>

                {/* Word-by-Word Breakdown if available */}
                {activeTr.wordByWord && activeTr.wordByWord.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Word-by-Word Breakdown for Diction
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {activeTr.wordByWord.map((w, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-center">
                          <p className="text-xs font-bold text-slate-900 dark:text-white font-telugu">{w.word}</p>
                          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{w.roman}</p>
                          <p className="text-[10px] text-slate-500">{w.meaning}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Director's Acting Notes Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Director's Performance Notes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        🎯 Acting Intention
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {activeDialogue.actingIntention || 'Connect deeply with the objective behind the speech.'}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        ⏸ Dramatic Pause
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {activeDialogue.delivery.pause}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        👁 Eye Expression
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {activeDialogue.delivery.eyes}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">
                        🎙 Voice & Modulation
                      </span>
                      <p className="text-slate-700 dark:text-slate-300">
                        {activeDialogue.delivery.voice}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Performance Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => handleRecordTake(activeDialogue.id)}
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 transition-all"
                  >
                    <Mic className="w-4 h-4" />
                    Record Audio Rehearsal (+25 XP)
                  </button>

                  <button
                    onClick={() => setActiveTab('performance-review')}
                    className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Take to Camera Review Studio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SAME DIALOGUE — MULTIPLE EMOTIONS BENCHMARK */}
      {activeTabMode === 'multi-emotion' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 border border-amber-200 dark:border-amber-900/30">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              The Versatility Benchmark: Same Line, 8 Different Emotions
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
              Acting is not merely changing words; it is altering the underlying thought, breath, eye focus, pauses, and intensity.
              Practice delivering this single masterclass sentence across 8 emotional colors.
            </p>
          </div>

          {/* Master Sentence Display */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Benchmark Line ({currentLanguage.name})
              </span>
              <button
                onClick={() => ttsService.speak(benchmarkTr.native, currentLanguage.code)}
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" />
                Listen
              </button>
            </div>

            <TargetLanguageBlock
              content={{
                native: benchmarkTr.native,
                romanization: benchmarkTr.romanization,
                englishMeaning: VERSATILE_BENCHMARK_DIALOGUE.englishBase,
              }}
              size="lg"
            />
          </div>

          {/* Emotion Pills */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(VERSATILE_BENCHMARK_DIALOGUE.deliveries).map((em) => (
              <button
                key={em}
                onClick={() => setBenchmarkEmotion(em)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  benchmarkEmotion === em
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {em}
              </button>
            ))}
          </div>

          {/* Emotion Delivery Breakdown Card */}
          {benchmarkDelivery && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-amber-600 dark:text-amber-400">
                    Delivery as {benchmarkEmotion}
                  </span>
                  <span className="text-xs text-slate-400">
                    Intensity: {benchmarkDelivery.intensity}
                  </span>
                </div>
              </div>

              {/* Character Inner Monologue */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/30 text-xs">
                <span className="font-bold text-amber-900 dark:text-amber-200 block mb-1">
                  💭 Inner Monologue / Subtext:
                </span>
                <p className="text-slate-800 dark:text-slate-200 italic">
                  "{benchmarkDelivery.thought}"
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">👁 Eyes & Gaze:</strong>
                  <p className="text-slate-600 dark:text-slate-400">{benchmarkDelivery.eyes}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">🙂 Facial Expression:</strong>
                  <p className="text-slate-600 dark:text-slate-400">{benchmarkDelivery.face}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">🎙 Voice & Pace:</strong>
                  <p className="text-slate-600 dark:text-slate-400">{benchmarkDelivery.voice} ({benchmarkDelivery.pace})</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">⏸ Pause Timing:</strong>
                  <p className="text-slate-600 dark:text-slate-400">{benchmarkDelivery.pause}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">🧍 Body Language:</strong>
                  <p className="text-slate-600 dark:text-slate-400">{benchmarkDelivery.body}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">🔥 Emotional Stakes:</strong>
                  <p className="text-slate-600 dark:text-slate-400">{benchmarkDelivery.intensity}</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => handleRecordTake(`benchmark-${benchmarkEmotion}`)}
                  className="py-2.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                >
                  <Mic className="w-4 h-4" />
                  Record {benchmarkEmotion} Take (+25 XP)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
