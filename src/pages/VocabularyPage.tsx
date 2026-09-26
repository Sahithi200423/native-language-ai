import React, { useState } from 'react';
import {
  BookmarkCheck,
  Bookmark,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AudioButton } from '../components/common/AudioButton';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';

export const VocabularyPage: React.FC = () => {
  const { vocabulary, toggleSaveWord, toggleLearnedWord, profile, currentLanguage } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Greetings',
    'Essentials',
    'Food',
    'Family',
    'Travel',
    'Numbers',
    'Emotions',
  ];

  const filteredWords = vocabulary.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.romanization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pronunciationGuide.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const learnedCount = vocabulary.filter((w) => w.isLearned).length;
  const savedCount = vocabulary.filter((w) => w.isSaved).length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header & Stats in English */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Vocabulary Bank
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {currentLanguage.name} Vocabulary Cards
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Every card shows the native script, Romanization, and English meaning.
          </p>
        </div>

        {/* Counter Badges */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {learnedCount} Learned
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-950/60 dark:text-brand-300">
            <Bookmark className="h-3.5 w-3.5" />
            {savedCount} Saved
          </span>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input in English */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${currentLanguage.name}, English meaning, or Romanization...`}
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white dark:bg-brand-500'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWords.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col justify-between rounded-3xl border bg-white p-5 shadow-card transition-all duration-200 dark:bg-slate-900 ${
              item.isLearned
                ? 'border-emerald-200/90 dark:border-emerald-950/60'
                : 'border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <div>
              {/* Top Card Controls */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 dark:border-slate-800">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {item.category}
                </span>

                <div className="flex items-center gap-1.5">
                  <AudioButton text={item.romanization} size="sm" variant="ghost" />

                  {/* Save Button */}
                  <button
                    onClick={() => toggleSaveWord(item.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      item.isSaved
                        ? 'text-brand-600 bg-brand-50 dark:text-brand-400 dark:bg-brand-950/60'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                    }`}
                    title={item.isSaved ? 'Word is saved' : 'Save for review'}
                  >
                    <Bookmark className={`h-4 w-4 ${item.isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Target Language 3-tier Word block */}
              <div className="my-4">
                <TargetLanguageBlock
                  content={{
                    native: item.word,
                    romanization: item.romanization,
                    englishMeaning: item.englishMeaning,
                    pronunciationGuide: profile.settings.showPronunciationGuide
                      ? item.pronunciationGuide
                      : undefined,
                  }}
                  size="md"
                  showPronunciation={profile.settings.showPronunciationGuide}
                />
              </div>

              {/* Example Sentence block */}
              <div className="rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/50 space-y-1 border border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Example Sentence
                </div>
                <div className="text-base font-bold font-telugu text-slate-900 dark:text-white">
                  {item.exampleSentence.native}
                </div>
                <div className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                  {item.exampleSentence.romanization}
                </div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  "{item.exampleSentence.english}"
                </div>
              </div>
            </div>

            {/* Bottom Actions: Save & Learned Button */}
            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 capitalize">
                {item.partOfSpeech}
              </span>

              <button
                onClick={() => toggleLearnedWord(item.id)}
                className={`inline-flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  item.isLearned
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{item.isLearned ? 'Learned ✓' : 'Mark as Learned'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No vocabulary matches your search or filter.
          </p>
        </div>
      )}
    </div>
  );
};
