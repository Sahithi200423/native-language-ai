import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  CheckCircle2,
  Sliders,
  Wind,
  Activity,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';
import { AudioButton } from '../../components/common/AudioButton';
import { SupportedLanguageCode } from '../../types';

interface VoiceModulationExercise {
  id: string;
  name: string;
  emoji: string;
  description: string;
  pitch: string;
  volume: string;
  speed: string;
  emphasis: string;
  breath: string;
  audioRate: number;
}

export const VoiceModulationTab: React.FC = () => {
  const { currentLanguage, actingProgress, recordVoiceExerciseCompletion } = useApp();

  const [activeVoiceMode, setActiveVoiceMode] = useState<string>('happy');

  // Multi-language practice phrase
  const sentenceMap: Record<
    SupportedLanguageCode,
    { native: string; romanization: string; english: string }
  > = {
    te: {
      native: 'నేను ఇక్కడికి మళ్ళీ ఎప్పటికీ రాను.',
      romanization: 'Nenu ikkadiki malli eppatikee raanu.',
      english: 'I will never come back here again.',
    },
    hi: {
      native: 'मैं यहाँ कभी वापस नहीं आऊंगा।',
      romanization: 'Main yahaan kabhi waapas nahin aaoonga.',
      english: 'I will never come back here again.',
    },
    ta: {
      native: 'நான் இனி ஒருபோதும் இங்கு வரமாட்டேன்.',
      romanization: 'Naan ini orupothum ingu varamaattaen.',
      english: 'I will never come back here again.',
    },
    kn: {
      native: 'ನಾನು ಇನ್ನು ಮುಂದೆ ಎಂದಿಗೂ ಇಲ್ಲಿಗೆ ಬರುವುದಿಲ್ಲ.',
      romanization: 'Naanu innu munde endigoo illige baruvudilla.',
      english: 'I will never come back here again.',
    },
    ml: {
      native: 'ഞാൻ ഇനി ഒരിക്കലും ഇവിടെ തിരിച്ചുവരില്ല.',
      romanization: 'Njaan ini orikkalum ivide thirichuvarilla.',
      english: 'I will never come back here again.',
    },
    bn: {
      native: 'আমি আর কখনোই এখানে ফিরে আসব না।',
      romanization: 'Ami ar kokhonoi ekhane phire ashbo na.',
      english: 'I will never come back here again.',
    },
  };

  const sentence = sentenceMap[currentLanguage.code] || sentenceMap.te;

  const voiceModes: VoiceModulationExercise[] = [
    {
      id: 'happy',
      name: 'Happy Voice',
      emoji: '😊',
      description: 'Bright, upward inflection, energized breathing, and open throat resonance.',
      pitch: 'Mid-high register with buoyant melodic lifts.',
      volume: 'Warm, forward-projected, cheerful.',
      speed: 'Brisk and fluid (around 1.1x speed).',
      emphasis: 'Emphasize positive verbs with a lifted smile.',
      breath: 'Light diaphragmatic inhalation, releasing sound on a joyful exhale.',
      audioRate: 1.1,
    },
    {
      id: 'sad',
      name: 'Sad Voice',
      emoji: '😢',
      description: 'Breathy, downward cadences, trailing off into silence with heavy pauses.',
      pitch: 'Lowered chest register with falling inflection.',
      volume: 'Intimate, whisper-soft, low projection.',
      speed: 'Slow and measured (around 0.8x speed).',
      emphasis: 'Words trail off gently at the ends of phrases.',
      breath: 'Shallow breath, sighing out through relaxed vocal folds.',
      audioRate: 0.8,
    },
    {
      id: 'angry',
      name: 'Angry Voice',
      emoji: '😡',
      description: 'Tight throat, clipped consonants, staccato rhythm, and piercing focus.',
      pitch: 'Compressed low growl or sudden explosive punchiness.',
      volume: 'Projected, intense, biting articulation.',
      speed: 'Staccato, punchy, driving forward.',
      emphasis: 'Bite off hard consonants and stop sounds sharply.',
      breath: 'Heavy diaphragmatic breath held before explosive release.',
      audioRate: 1.0,
    },
    {
      id: 'calm',
      name: 'Calm Voice',
      emoji: '😌',
      description: 'Anchored low chest resonance, unhurried, reassuring, and steady.',
      pitch: 'Smooth, grounded, stable frequency.',
      volume: 'Moderate, soothing, confident.',
      speed: 'Steady, deliberate, rhythmic (around 0.9x speed).',
      emphasis: 'Even distribution across all syllables without spikes.',
      breath: 'Deep, silent belly breathing supporting a steady stream of air.',
      audioRate: 0.9,
    },
    {
      id: 'fearful',
      name: 'Fearful Voice',
      emoji: '😨',
      description: 'Constricted throat, breathless waver, lacking low bass frequencies.',
      pitch: 'High, thin, tight, prone to cracks.',
      volume: 'Furtive whisper or choked tone.',
      speed: 'Erratic: rushing forward then freezing.',
      emphasis: 'Breath catches mid-phrase.',
      breath: 'Fast, high upper-chest gasps.',
      audioRate: 1.15,
    },
    {
      id: 'confident',
      name: 'Confident Voice',
      emoji: '😏',
      description: 'Rich vocal fry or resonant chest power, comfortable with pregnant pauses.',
      pitch: 'Deep, resonant, relaxed pitch center.',
      volume: 'Commanding without shouting; fills the room effortlessly.',
      speed: 'Unhurried; comfortable taking all the time needed.',
      emphasis: 'Intentional weight on the key operative words.',
      breath: 'Deep power breathing rooted in the abdomen.',
      audioRate: 0.95,
    },
  ];

  const currentMode = voiceModes.find((m) => m.id === activeVoiceMode) || voiceModes[0];
  const isDone = actingProgress.completedVoiceExercises.includes(currentMode.id);

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in">
      {/* Header in English */}
      <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          Vocal Mechanics
        </span>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
          Voice & Modulation Training
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Master pitch, volume, speed, pauses, breath, and sentence endings in {currentLanguage.name}.
        </p>
      </div>

      {/* 8 Core Voice Principles Reference Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { title: 'Pitch', desc: 'High musicality vs. grounded low chest register' },
          { title: 'Volume', desc: 'Intimate whisper to resonant projection' },
          { title: 'Speed / Pace', desc: 'Staccato urgency to lingering slow cadences' },
          { title: 'Pauses', desc: 'Silence carries emotional revelation' },
          { title: 'Emphasis', desc: 'Highlighting the operative dramatic word' },
          { title: 'Breath', desc: 'High chest gasps vs. deep diaphragmatic support' },
          { title: 'Sentence Endings', desc: 'Falling finality vs. rising vulnerability' },
          { title: 'Emotional Tone', desc: 'Vocal warmth, edge, gravel, or softness' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-subtle dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {item.title}
            </div>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Main Interactive Practice Box */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Modulation Exercise
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Deliver This Sentence Across 6 Distinct Vocal Registers
          </h3>
        </div>

        {/* Target Language Sentence */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/50">
          <TargetLanguageBlock
            content={{
              native: sentence.native,
              romanization: sentence.romanization,
              englishMeaning: sentence.english,
            }}
            size="lg"
            showAudio={true}
          />
        </div>

        {/* Voice Mode Selector Tabs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Select Voice Mode:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {voiceModes.map((mode) => {
              const isSelected = mode.id === activeVoiceMode;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveVoiceMode(mode.id)}
                  className={`rounded-2xl border p-3 text-left transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/80 ring-2 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-950/60'
                      : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span className="text-2xl">{mode.emoji}</span>
                  <div className="mt-1 text-xs font-bold text-slate-900 dark:text-white">
                    {mode.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Vocal Guide for Current Mode */}
        <div className="rounded-2xl border border-brand-100 bg-brand-50/30 p-5 dark:border-brand-900/40 dark:bg-brand-950/20 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-100/60 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentMode.emoji}</span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                How to Modulate in {currentMode.name}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              <AudioButton
                text={sentence.romanization}
                size="sm"
                variant="filled"
                label="Listen Sample"
              />
              <button
                onClick={() => recordVoiceExerciseCompletion(currentMode.id)}
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{isDone ? 'Completed ✓' : 'Mark Practiced (+15 XP)'}</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentMode.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white">Pitch Register: </strong>
              <span className="text-slate-600 dark:text-slate-300">{currentMode.pitch}</span>
            </div>
            <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white">Volume & Projection: </strong>
              <span className="text-slate-600 dark:text-slate-300">{currentMode.volume}</span>
            </div>
            <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white">Pacing & Speed: </strong>
              <span className="text-slate-600 dark:text-slate-300">{currentMode.speed}</span>
            </div>
            <div className="rounded-xl bg-white p-3 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <strong className="text-slate-900 dark:text-white">Breath & Inhalation: </strong>
              <span className="text-slate-600 dark:text-slate-300">{currentMode.breath}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
