import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EMOTION_TRANSITION_EXERCISES } from '../../data/actingData';
import { TargetLanguageBlock } from '../../components/common/TargetLanguageBlock';
import { Eye, Smile, Sparkles, ArrowRight, ShieldAlert, Volume2 } from 'lucide-react';
import { ttsService } from '../../services/ttsService';

export const FacialAndEyeTab: React.FC = () => {
  const { currentLanguage } = useApp();
  const [activeSubSection, setActiveSubSection] = useState<'facial' | 'eye' | 'transitions'>('facial');
  const [selectedTransitionId, setSelectedTransitionId] = useState<string>(EMOTION_TRANSITION_EXERCISES[0].id);

  const selectedTransition = EMOTION_TRANSITION_EXERCISES.find(t => t.id === selectedTransitionId) || EMOTION_TRANSITION_EXERCISES[0];

  const facialBreakdown = [
    {
      emotion: 'Anger',
      emoji: '😡',
      eyes: 'Intense and focused directly on the subject, unblinking.',
      eyebrows: 'Drawn sharply downward and pulled together.',
      forehead: 'Vertical furrow between the brows; avoid over-scrunching the entire scalp.',
      mouth: 'Firm, tight horizontal line, pressed lips; do not bare teeth like a cartoon.',
      jaw: 'Controlled tension and clenched molars, visible jaw muscle tightening.',
      principle: 'Natural anger is simmered and controlled. Shouting and flared nostrils without internal focus looks comedic rather than threatening.'
    },
    {
      emotion: 'Sadness',
      emoji: '😢',
      eyes: 'Gaze tends to dip downward or drift into soft focus; heavy eyelids.',
      eyebrows: 'Inner corners of the eyebrows pull slightly upward and together.',
      forehead: 'Subtle horizontal wrinkles at the center brow only.',
      mouth: 'Corners of the lips drop naturally, lower lip may show slight tremor without forced pouting.',
      jaw: 'Relaxed, slackened tension.',
      principle: 'Avoid exaggerated crying or forcing tears. Real grief is quiet; the effort to hide sorrow is far more moving than theatrical sobbing.'
    },
    {
      emotion: 'Happiness',
      emoji: '😊',
      eyes: 'Crow\'s feet wrinkles at the corners (Duchenne smile), sparkling and warm.',
      eyebrows: 'Naturally relaxed or slightly arched.',
      forehead: 'Smooth, relaxed and open.',
      mouth: 'Corners pulled upward symmetrically, teeth gently visible without rigid grinning.',
      jaw: 'Completely relaxed and free.',
      principle: 'Genuine joy activates the muscles around the eyes (orbicularis oculi). If only the mouth smiles, the expression reads as sarcastic or deceptive.'
    },
    {
      emotion: 'Fear',
      emoji: '😨',
      eyes: 'Eyes widen, showing whites around the iris; hyper-vigilant scanning.',
      eyebrows: 'Raised and flattened across the forehead.',
      forehead: 'Horizontal wrinkles stretching across.',
      mouth: 'Slightly open or lips drawn back horizontally towards the ears.',
      jaw: 'Rigid, breath catching in the throat.',
      principle: 'Fear triggers a fight-or-flight freeze. The sudden lack of blinking and rapid shallow breathing sell fear far better than loud gasping.'
    }
  ];

  const eyeTechniques = [
    {
      title: 'Holding Eye Contact',
      description: 'Used for intense honesty, confrontation, dominance, or romantic intimacy. Unwavering focus holds the listener in place.',
      cue: 'Fix gaze on a single pupil of the listener or lens. Resist the reflex to glance away.'
    },
    {
      title: 'Breaking Eye Contact Downward',
      description: 'Signals shame, internal reflection, submission, or heavy sorrow. Lowering the gaze brings the audience into your private thought.',
      cue: 'Drop eyelids smoothly, pause for 2 counts, then slowly lift back to the horizon.'
    },
    {
      title: 'Looking Away (Lateral Break)',
      description: 'Used when searching for memory, concealing a truth, or feeling overwhelmed by what was just heard.',
      cue: 'Shift eyes 30 degrees to the left or right, hold briefly while formulating your response, then return.'
    },
    {
      title: 'The Emotional Gaze (Soft Focus)',
      description: 'Used in nostalgic remembrance or processing traumatic realization. The eyes look through the person rather than at them.',
      cue: 'Relax focal convergence as if observing a memory 10 feet behind the camera.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => setActiveSubSection('facial')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubSection === 'facial'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <Smile className="w-4 h-4" />
          Facial Expression Practice
        </button>
        <button
          onClick={() => setActiveSubSection('eye')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubSection === 'eye'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          Eye Expression & Focus
        </button>
        <button
          onClick={() => setActiveSubSection('transitions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeSubSection === 'transitions'
              ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Emotion Transitions
        </button>
      </div>

      {/* SECTION 1: FACIAL EXPRESSIONS */}
      {activeSubSection === 'facial' && (
        <div className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-200">The Golden Rule of Natural Acting</h4>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                Never "make faces" to telegraph an emotion. Think the thought, feel the impulse in the breath, and let the micro-muscles of the face react organically. Audiences detect exaggerated grimacing immediately.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {facialBreakdown.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl p-2 bg-gray-50 dark:bg-gray-800 rounded-xl">{item.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.emotion}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Micro-muscle alignment & control</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-700 dark:text-gray-300">
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <strong className="text-gray-900 dark:text-white block mb-0.5 font-semibold">Eyes:</strong>
                      {item.eyes}
                    </div>
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <strong className="text-gray-900 dark:text-white block mb-0.5 font-semibold">Eyebrows & Forehead:</strong>
                      {item.eyebrows} {item.forehead}
                    </div>
                    <div className="p-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <strong className="text-gray-900 dark:text-white block mb-0.5 font-semibold">Mouth & Jaw:</strong>
                      {item.mouth} {item.jaw}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-xs text-primary-600 dark:text-primary-400 font-medium">
                  💡 {item.principle}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: EYE EXPRESSION */}
      {activeSubSection === 'eye' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary-600" />
              Eye Direction & Psychological Focus
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              In film and screen performance, the camera reads the eyes before anything else. Rapid, erratic blinking reveals nervousness, while intentional focus commands emotional authority.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eyeTechniques.map((tech, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{tech.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{tech.description}</p>
                  <div className="text-xs p-2.5 bg-primary-50 dark:bg-primary-950/40 text-primary-800 dark:text-primary-300 rounded-lg font-medium">
                    🎯 <strong>Acting Cue:</strong> {tech.cue}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Betrayal Eye Progression Case Study */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-6 border border-red-200 dark:border-red-900/30">
            <h3 className="text-base font-bold text-red-950 dark:text-red-300 mb-1">
              Case Study: The "Betrayal Discovery" Eye Progression
            </h3>
            <p className="text-xs text-red-800/80 dark:text-red-400/80 mb-5">
              Practice this 4-step sequence looking at the camera or in front of a mirror without uttering a word.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-red-100 dark:border-gray-800 shadow-sm">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">1. Shock</span>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-medium">Wide open eyes</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Pupils dilate, blinking stops dead for 2 seconds. The mind freezes.</p>
              </div>
              <div className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-red-100 dark:border-gray-800 shadow-sm">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">2. Realization</span>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-medium">Rapid downward flick</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Eyes drift down to the right as memory pieces connect together.</p>
              </div>
              <div className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-red-100 dark:border-gray-800 shadow-sm">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">3. Hurt</span>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-medium">Softening & moisture</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Single slow blink; inner brow corners pinch upwards with deep disbelief.</p>
              </div>
              <div className="p-3.5 bg-white dark:bg-gray-900 rounded-xl border border-red-100 dark:border-gray-800 shadow-sm">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300">4. Controlled Anger</span>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-2 font-medium">Locking eye contact</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Eyelids narrow into laser focus; jaw hardens without shifting head position.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: EMOTION TRANSITIONS */}
      {activeSubSection === 'transitions' && (
        <div className="space-y-6">
          {/* Transition Selector */}
          <div className="flex flex-wrap gap-2">
            {EMOTION_TRANSITION_EXERCISES.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedTransitionId(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedTransitionId === item.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            {/* Header with from -> to */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 font-bold text-sm capitalize">
                {selectedTransition.fromEmotion}
              </span>
              <ArrowRight className="w-5 h-5 text-gray-400" />
              <span className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold text-sm capitalize">
                {selectedTransition.toEmotion}
              </span>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 italic">
              Scenario: "{selectedTransition.scenario}"
            </p>

            {/* Step-by-Step Transition Progression */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Step-by-Step Transition Guidance
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedTransition.steps.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300">
                          Step {step.step}
                        </span>
                        <span className="text-xs font-semibold text-gray-900 dark:text-white">{step.emotion}</span>
                      </div>

                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mb-3">
                        🎯 Cue: {step.cue}
                      </p>

                      <div className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                        <p><strong className="text-gray-900 dark:text-white">Eyes:</strong> {step.eyes}</p>
                        <p><strong className="text-gray-900 dark:text-white">Face:</strong> {step.face}</p>
                        <p><strong className="text-gray-900 dark:text-white">Voice:</strong> {step.voice}</p>
                        <p><strong className="text-gray-900 dark:text-white">Pause:</strong> {step.pause}</p>
                        <p><strong className="text-gray-900 dark:text-white">Body:</strong> {step.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
