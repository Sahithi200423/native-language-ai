# Native Language AI

Native Language AI is a modern AI language-learning web application built from scratch to help users learn native Indian languages through English.

The initial active target language is **Telugu**, with a modular architecture ready for **Hindi**, **Tamil**, **Kannada**, **Malayalam**, and **Bengali**.

---

## 🎯 Pedagogical Model

```
English (support language)
        ↓
Target / Native language
        ↓
Understand
        ↓
Practice
        ↓
Speak
        ↓
AI Correction (Empathetic Confidence Coach)
        ↓
Retry
        ↓
Build Confidence
```

### 5-Tier Language Representation
Every phrase is presented in 5 layers:
1. **English (Support Language)**: Context and query
2. **Native Script**: e.g., `ఎలా ఉన్నారు?`
3. **Romanization**: e.g., `Ela unnaru?`
4. **English Pronunciation Guidance**: e.g., `Eh-la un-naa-ru?`
5. **English Meaning**: e.g., `How are you? (polite / formal)`

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom design system tokens
- **Typography**: Google Fonts (*Plus Jakarta Sans*, *Noto Sans Telugu*, *Noto Sans Devanagari*)
- **Icons**: Lucide React
- **Audio / Speech**: Web Speech API synthesis service with phonetic voice fallback
- **State & Storage**: React Context + localStorage persistence

---

## 🛠️ Features Included

1. **Landing Page**: Explains the 7-step pedagogical model, multi-sensory phonics preview, and multi-language roadmap.
2. **Onboarding Modal**: Multi-step setup for target language, skill level, daily time commitment, and name.
3. **Dashboard**: Live metrics for current language, level, daily streak, completed lessons, mastered vocabulary, speaking sessions, and overall progress.
4. **Learn Section**: Structured syllabus with unit modules, 5-tier phrase breakdowns, audio playback, and lesson completion rewards.
5. **Practice Section**: Interactive drills (multiple choice, translation, word order) with instant constructive feedback and automated mistake logging.
6. **AI Tutor**: Level-adapted chat interface with prompt chips (*Explain Grammar*, *Translate*, *Generate Examples*, *Polite vs. Informal*).
7. **Speaking Coach**: Scenario-based dialogue simulation, microphone input, audio prompts, and 5-pillar Confidence Coach feedback (*Pronunciation*, *Grammar*, *Vocabulary*, *Naturalness*, *Confidence*).
8. **Vocabulary Bank**: Searchable, topic-filtered flashcard cards with native script, Romanization, pronunciation, examples, and *Save* / *Mark as Learned* controls.
9. **Mistake Bank**: Stores mistakes across 6 categories (*Grammar*, *Vocabulary*, *Pronunciation*, *Word Order*, *Spelling*, *Natural Expression*) with explanations and interactive retry verification.
10. **Progress & Analytics**: Weekly activity heatmap, XP tracker, and competency bars.
11. **Settings**: Target language switching, dark/light theme, display toggles, audio speed, and data management.
12. **Dark / Light Mode**: Seamless theme switching with class-based Tailwind tokens.

---

## 🏃‍♂️ How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```
