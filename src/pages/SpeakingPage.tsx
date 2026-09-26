import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SPEAKING_SCENARIOS } from '../data/speakingData';
import { AudioButton } from '../components/common/AudioButton';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { ConfidenceBanner } from '../components/common/ConfidenceBanner';
import { aiService } from '../services/ai/aiService';
import { ConfidenceFeedback } from '../types';

export const SpeakingPage: React.FC = () => {
  const { currentLanguage, updateProfile, profile, addMistake } = useApp();

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [feedback, setFeedback] = useState<ConfidenceFeedback | null>(null);

  const scenario = SPEAKING_SCENARIOS[selectedScenarioIndex];

  const handleStartRecording = () => {
    setIsRecording(true);
    setFeedback(null);

    // Simulate microphone recording speech input with realistic starter text
    setTimeout(() => {
      setSpokenText(scenario.expectedResponseExample.romanization);
    }, 1500);
  };

  const handleStopRecordingAndEvaluate = async () => {
    setIsRecording(false);
    setIsEvaluating(true);

    try {
      const evaluation = await aiService.evaluateSpeakingResponse({
        scenarioId: scenario.id,
        language: currentLanguage.code,
        promptText: scenario.aiFirstMessage.native,
        userSpokenText: spokenText || scenario.expectedResponseExample.romanization,
      });

      setFeedback(evaluation);
      updateProfile({
        speakingSessionsCount: profile.speakingSessionsCount + 1,
        totalXp: profile.totalXp + 30,
      });

      if (evaluation.oneImportantCorrection) {
        addMistake({
          languageCode: currentLanguage.code,
          category: 'natural_expression',
          whatYouSaid: spokenText || 'Informal response',
          betterVersion: evaluation.betterVersion.romanization,
          nativeScript: evaluation.betterVersion.native,
          romanization: evaluation.betterVersion.romanization,
          whatYouDidWell: evaluation.whatYouDidWell,
          simpleExplanation: evaluation.simpleExplanation,
          invitationToRetry: evaluation.invitationToTryAgain,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleResetForRetry = () => {
    setFeedback(null);
    setSpokenText('');
    setIsRecording(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in">
      {/* Header in English */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Speaking Coach • Scene Rehearsals
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Actor Scene Drills & Spoken Delivery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Listen to your scene partner's cue in {currentLanguage.name}, respond naturally in character, and receive targeted delivery feedback.
          </p>
        </div>

        {/* Metric Pills in English */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">Diction</span>
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">Cadence</span>
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 dark:bg-slate-800">Presence</span>
        </div>
      </div>

      {/* Scenario Selector Pills in English */}
      <div className="flex flex-wrap gap-2">
        {SPEAKING_SCENARIOS.map((sc, idx) => (
          <button
            key={sc.id}
            onClick={() => {
              setSelectedScenarioIndex(idx);
              handleResetForRetry();
            }}
            className={`rounded-2xl border px-4 py-2 text-xs font-semibold transition-all ${
              selectedScenarioIndex === idx
                ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {sc.title}
          </button>
        ))}
      </div>

      {/* Active Conversation Stage */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-card dark:border-slate-800 dark:bg-slate-900 space-y-6">
        {/* Scenario Context in English */}
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Scenario Context
          </div>
          <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
            {scenario.context}
          </p>
        </div>

        {/* 1. Step 1 Instruction: Listen and repeat */}
        <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-5 dark:border-brand-900/40 dark:bg-brand-950/20">
          <div className="flex items-center justify-between border-b border-brand-100/60 pb-3 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600 text-white text-xs font-bold">
                1
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-300">
                Listen and repeat:
              </span>
            </div>
            <AudioButton
              text={scenario.aiFirstMessage.romanization}
              size="sm"
              variant="filled"
              label="Play Voice"
            />
          </div>

          <div className="mt-4">
            <TargetLanguageBlock
              content={{
                native: scenario.aiFirstMessage.native,
                romanization: scenario.aiFirstMessage.romanization,
                englishMeaning: scenario.aiFirstMessage.english,
              }}
              size="lg"
            />
          </div>
        </div>

        {/* 2. Step 2 Instruction: Now say the sentence */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-800 text-white text-xs font-bold dark:bg-slate-200 dark:text-slate-900">
                2
              </span>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Now say the sentence:
              </label>
            </div>
            <span className="text-xs text-slate-400">
              Suggested: "{scenario.expectedResponseExample.english}"
            </span>
          </div>

          {/* Suggested Pronunciation Guide Box */}
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Suggested Target Response
            </div>
            <TargetLanguageBlock
              content={{
                native: scenario.expectedResponseExample.native,
                romanization: scenario.expectedResponseExample.romanization,
                englishMeaning: scenario.expectedResponseExample.english,
              }}
              size="md"
              showAudio={true}
            />
          </div>

          {/* Your Pronunciation / Input Box */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Your Pronunciation (Spoken Transcript):
            </label>
            <textarea
              rows={2}
              value={spokenText}
              onChange={(e) => setSpokenText(e.target.value)}
              placeholder="Click 'Tap to Record' or type your response here..."
              className="w-full rounded-2xl border border-slate-200 bg-white p-3.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            />
          </div>

          {/* Action Buttons in English */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            {!isRecording ? (
              <button
                type="button"
                onClick={handleStartRecording}
                className="inline-flex items-center gap-2 rounded-2xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-rose-700 active:scale-95 transition-all"
              >
                <Mic className="h-4 w-4" />
                <span>Tap to Record</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStopRecordingAndEvaluate}
                className="inline-flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-amber-700 animate-pulse transition-all"
              >
                <MicOff className="h-4 w-4" />
                <span>Stop Recording</span>
              </button>
            )}

            <button
              disabled={isEvaluating}
              onClick={handleStopRecordingAndEvaluate}
              className="inline-flex items-center gap-2 rounded-2xl bg-brand-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 disabled:opacity-40 transition-all dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isEvaluating ? 'Evaluating Speech...' : 'Analyze Pronunciation'}</span>
            </button>
          </div>
        </div>

        {/* 3. Feedback in English with TargetLanguageBlock for corrections */}
        {feedback && (
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <ConfidenceBanner feedback={feedback} onRetry={handleResetForRetry} />
          </div>
        )}
      </div>
    </div>
  );
};
