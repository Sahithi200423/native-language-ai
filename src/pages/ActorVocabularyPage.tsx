import React, { useState } from 'react';
import {
  BookmarkCheck,
  Search,
  Volume2,
  CheckCircle,
  Bookmark,
  Sparkles,
  Clapperboard,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TargetLanguageBlock } from '../components/common/TargetLanguageBlock';
import { ttsService } from '../services/ttsService';

interface ActorVocabItem {
  id: string;
  category: 'Audition Phrases' | 'Words for Emotional Scenes' | 'Character Introduction' | 'Scene Vocabulary' | 'Everyday Dialogue';
  native: string;
  romanization: string;
  pronunciationGuide: string;
  englishMeaning: string;
  actingUsage: string;
  isLearned?: boolean;
}

export const ActorVocabularyPage: React.FC = () => {
  const { currentLanguage } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [learnedIds, setLearnedIds] = useState<string[]>([]);

  const actorVocabCategories: ActorVocabItem['category'][] = [
    'Audition Phrases',
    'Words for Emotional Scenes',
    'Character Introduction',
    'Scene Vocabulary',
    'Everyday Dialogue',
  ];

  const vocabItems: ActorVocabItem[] = [
    {
      id: 'av-1',
      category: 'Audition Phrases',
      native: currentLanguage.code === 'hi' ? 'नमस्ते, मैं इस भूमिका के लिए तैयार हूँ।' : 'నమస్కారం, నేను ఈ పాత్ర కోసం సిద్ధంగా ఉన్నాను.',
      romanization: currentLanguage.code === 'hi' ? 'Namaste, main is bhoomika ke liye taiyaar hoon.' : 'Namaskaram, nenu ee paathra kosam siddhanga unnanu.',
      pronunciationGuide: 'Nah-mas-kaa-ram, neh-nu ee paa-thra ko-sam...',
      englishMeaning: 'Hello, I am prepared to read for this role.',
      actingUsage: 'Audition slating phrase to establish warm, confident rapport with the casting director.',
    },
    {
      id: 'av-2',
      category: 'Words for Emotional Scenes',
      native: currentLanguage.code === 'hi' ? 'विश्वासघात' : 'నమ్మకద్రోహం',
      romanization: currentLanguage.code === 'hi' ? 'Vishwasghaat' : 'Nammaka droham',
      pronunciationGuide: 'Nam-ma-ka dro-ham',
      englishMeaning: 'Betrayal / Breach of Trust',
      actingUsage: 'High dramatic stakes; stress the sharp consonant release with a tightening jaw.',
    },
    {
      id: 'av-3',
      category: 'Character Introduction',
      native: currentLanguage.code === 'hi' ? 'मेरा नाम विक्रम है, और मैं यहाँ सच जानने आया हूँ।' : 'నా పేరు విక్రమ్, నేను ఇక్కడికి నిజం తెలుసుకోవడానికి వచ్చాను.',
      romanization: currentLanguage.code === 'hi' ? 'Mera naam Vikram hai, aur main yahan sach jaan-ne aaya hoon.' : 'Naa peru Vikram, nenu ikkadiki nijam telusukovadaniki vachhanu.',
      pronunciationGuide: 'Naa pe-ru... ne-nu ik-ka-di-ki ni-jam...',
      englishMeaning: 'My name is Vikram, and I came here to find the truth.',
      actingUsage: 'Establish unwavering character objective and direct eye focus on the listener.',
    },
    {
      id: 'av-4',
      category: 'Scene Vocabulary',
      native: currentLanguage.code === 'hi' ? 'रहस्य' : 'రహస్యం',
      romanization: currentLanguage.code === 'hi' ? 'Rahasya' : 'Rahasyam',
      pronunciationGuide: 'Ra-has-yam',
      englishMeaning: 'Secret / Mystery',
      actingUsage: 'Whisper resonance with a downward glance to draw the scene partner closer.',
    },
    {
      id: 'av-5',
      category: 'Everyday Dialogue',
      native: currentLanguage.code === 'hi' ? 'क्या हम एक पल अकेले बात कर सकते हैं?' : 'మనం ఒక్క క్షణం ఒంటరిగా మాట్లాడవచ్చా?',
      romanization: currentLanguage.code === 'hi' ? 'Kya hum ek pal akele baat kar sakte hain?' : 'Manam okka kshanam ontariga matladavachhaa?',
      pronunciationGuide: 'Ma-nam ok-ka ksha-nam...',
      englishMeaning: 'Can we speak alone for a moment?',
      actingUsage: 'Used in dramatic transitions to pivot the scene from public polite conversation to private confrontation.',
    },
    {
      id: 'av-6',
      category: 'Words for Emotional Scenes',
      native: currentLanguage.code === 'hi' ? 'तन्हाई' : 'ఒంటరితనం',
      romanization: currentLanguage.code === 'hi' ? 'Tanhaai' : 'Ontarithanam',
      pronunciationGuide: 'On-ta-ri-tha-nam',
      englishMeaning: 'Loneliness / Solitude',
      actingUsage: 'Soft vowel inflection accompanied by a heavy exhalation before voicing.',
    },
  ];

  const filteredItems = vocabItems.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.romanization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.englishMeaning.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleLearned = (id: string) => {
    setLearnedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <BookmarkCheck className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Vocabulary for Actors
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Scene vocabulary, emotional scene operative words, audition slating phrases, and character dialogue in {currentLanguage.name}.
          </p>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
              activeCategory === 'all'
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Repertoire Words
          </button>
          {actorVocabCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dialogue phrases, keywords, pronunciation..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => {
          const isLearned = learnedIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border transition-all ${
                isLearned
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {item.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => ttsService.speak(item.native, currentLanguage.code)}
                    className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950 rounded-lg text-xs font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    Say
                  </button>
                  <button
                    onClick={() => toggleLearned(item.id)}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      isLearned
                        ? 'text-emerald-600'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    {isLearned ? 'Mastered' : 'Mark Learned'}
                  </button>
                </div>
              </div>

              <TargetLanguageBlock
                content={{
                  native: item.native,
                  romanization: item.romanization,
                  englishMeaning: item.englishMeaning,
                  pronunciationGuide: item.pronunciationGuide,
                }}
                size="md"
                showPronunciation={true}
              />

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-800 dark:text-amber-300 italic">
                🎭 <strong>Actor's Objective:</strong> {item.actingUsage}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
