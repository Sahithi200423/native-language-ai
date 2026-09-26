import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Clapperboard,
  Film,
  Mic,
  Drama,
  Clock,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { ActingMedium, ActorImprovementGoal, FirstPracticePreference, LanguageInfo, LearnerLevel, SupportedLanguageCode } from '../types';

export const OnboardingModal: React.FC = () => {
  const { showOnboarding, setShowOnboarding, updateProfile, setTargetLanguage, currentLanguage, profile } =
    useApp();

  const [step, setStep] = useState(1);

  // Step 1: Improvement Goals (Multi-select)
  const [selectedGoals, setSelectedGoals] = useState<ActorImprovementGoal[]>(
    (profile.actorGoals as ActorImprovementGoal[]) || [
      'Acting',
      'Dialogue Delivery',
      'Language Pronunciation',
      'Emotional Expression',
    ]
  );

  // Step 2: Language
  const [selectedLang, setSelectedLang] = useState<SupportedLanguageCode>(profile.targetLanguage);

  // Step 3: Level
  const [selectedLevel, setSelectedLevel] = useState<LearnerLevel>(profile.level || 'beginner');

  // Step 4: Acting Medium
  const [selectedMedium, setSelectedMedium] = useState<ActingMedium>(
    (profile.actingMedium as ActingMedium) || 'Film'
  );

  // Step 5: Practice Time
  const [selectedMinutes, setSelectedMinutes] = useState<number>(profile.goalMinutesPerDay || 15);

  // Step 6: First Practice Preference
  const [firstPractice, setFirstPractice] = useState<FirstPracticePreference>(
    (profile.firstPracticePreference as FirstPracticePreference) || 'Dialogue'
  );

  if (!showOnboarding) return null;

  const toggleGoal = (goal: ActorImprovementGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleFinish = () => {
    setTargetLanguage(selectedLang);
    updateProfile({
      targetLanguage: selectedLang,
      level: selectedLevel,
      goalMinutesPerDay: selectedMinutes,
      actorGoals: selectedGoals,
      actingMedium: selectedMedium,
      firstPracticePreference: firstPractice,
      isOnboarded: true,
    });
    setShowOnboarding(false);
  };

  const improvementGoalOptions: ActorImprovementGoal[] = [
    'Acting',
    'Dialogue Delivery',
    'Language Pronunciation',
    'Diction',
    'Emotional Expression',
    'Voice Modulation',
    'Audition Preparation',
    'Speaking Confidence',
    'Learning a New Language for a Role',
  ];

  const actingMediumOptions: ActingMedium[] = [
    'Film',
    'Television',
    'Theatre',
    'Web Series',
    'Short Films',
    'Auditions',
    'General Acting Practice',
  ];

  const levelOptions: { id: LearnerLevel; label: string; desc: string }[] = [
    { id: 'beginner', label: 'Beginner', desc: 'No prior experience with this language; starting fresh for a role' },
    { id: 'basic', label: 'Basic', desc: 'Understand simple phrases, but struggling with natural pronunciation' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Can deliver basic lines, seeking emotional nuance and authentic cadence' },
    { id: 'advanced', label: 'Advanced', desc: 'Fluent or near-fluent, polishing high-stakes dramatic deliveries' },
  ];

  const timeOptions = [5, 10, 15, 20, 30];

  const firstPracticeOptions: { id: FirstPracticePreference; label: string; desc: string; icon: string }[] = [
    { id: 'Dialogue', label: 'Dialogue Practice', desc: 'Jump directly into scenes and lines', icon: '🎬' },
    { id: 'Emotion', label: 'Emotion Studio', desc: 'Explore the 20 fundamental acting emotions', icon: '🎭' },
    { id: 'Pronunciation', label: 'Pronunciation & Diction', desc: 'Master native syllables and phonetics', icon: '🗣' },
    { id: 'Voice', label: 'Voice Modulation', desc: 'Train pitch, registers, and volume dynamics', icon: '🎙' },
    { id: 'Facial Expression', label: 'Facial & Eye Acting', desc: 'Hone camera presence and subtle gaze', icon: '👁' },
    { id: 'Full Performance', label: 'Full Performance Take', desc: 'Record a complete monologue on camera', icon: '📹' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
        {/* Step Progress Dots */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-white shadow-sm">
              <Clapperboard className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                SceneLingo • Step {step} of 6
              </span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Actor Studio Setup
              </h3>
            </div>
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i === step
                    ? 'w-6 bg-amber-500'
                    : i < step
                    ? 'w-2 bg-amber-300 dark:bg-amber-800'
                    : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto py-6 pr-1 space-y-6">
          {/* STEP 1: What are you here to improve? */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  What are you here to improve?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select all skills that apply to your current acting or role preparation goals.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {improvementGoalOptions.map((goal) => {
                  const isChecked = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50/80 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{goal}</span>
                      <div
                        className={`h-5 w-5 rounded-lg flex items-center justify-center border transition-all ${
                          isChecked
                            ? 'bg-amber-500 border-amber-500 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isChecked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Language Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  What language do you want to learn?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Choose the primary Indian language you are preparing for your audition or performance.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUPPORTED_LANGUAGES.map((lang: LanguageInfo) => {
                  const isSelected = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => setSelectedLang(lang.code as SupportedLanguageCode)}
                      className={`flex items-center gap-3.5 p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-md'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="text-3xl">{lang.flagEmoji}</span>
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{lang.name}</div>
                        <div className="text-xs text-slate-500 font-telugu">{lang.nativeName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Current Level */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  What is your current level in this language?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  We customize the pronunciation breakdown and line complexity to your baseline.
                </p>
              </div>

              <div className="space-y-2.5">
                {levelOptions.map((lvl) => {
                  const isSelected = selectedLevel === lvl.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setSelectedLevel(lvl.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">{lvl.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lvl.desc}</div>
                      </div>
                      <div
                        className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-500 bg-amber-500 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: What type of acting do you practice? */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  What type of acting do you practice?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Different mediums require different subtlety in vocal projection and eye movement.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {actingMediumOptions.map((medium) => {
                  const isSelected = selectedMedium === medium;
                  return (
                    <button
                      key={medium}
                      type="button"
                      onClick={() => setSelectedMedium(medium)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{medium}</span>
                      {isSelected && <Check className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: Practice Time */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  How much time can you practice per day?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Consistency is key to muscle memory in dialogue delivery and tongue placement.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {timeOptions.map((mins) => {
                  const isSelected = selectedMinutes === mins;
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setSelectedMinutes(mins)}
                      className={`p-4 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/30'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <Clock className="w-5 h-5 mx-auto mb-1 opacity-80" />
                      <div className="text-lg font-black">{mins}</div>
                      <div className="text-[10px] uppercase font-bold tracking-wider">Minutes</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: What do you want to practice first? */}
          {step === 6 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  What do you want to practice first?
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  We'll land you right into your chosen studio module.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {firstPracticeOptions.map((opt) => {
                  const isSelected = firstPractice === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFirstPractice(opt.id)}
                      className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/80 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">{opt.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white text-xs font-bold shadow-lg shadow-amber-500/30 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Enter SceneLingo Studio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
