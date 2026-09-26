import { Lesson } from '../types';

export const TELUGU_LESSONS: Lesson[] = [
  {
    id: 'te-lesson-1',
    languageCode: 'te',
    unit: 1,
    unitTitle: 'Unit 1: Essential Greetings & Introductions',
    title: 'Warm Greetings & Politeness',
    description: 'Learn how to greet someone respectfully and ask how they are doing in Telugu.',
    level: 'beginner',
    estimatedMinutes: 8,
    completed: true,
    score: 95,
    phrases: [
      {
        id: 'te-p-1',
        english: 'Hello / Greetings',
        native: 'నమస్కారం',
        romanization: 'Namaskaram',
        pronunciationGuide: 'Nuh-mus-kaa-rum',
        englishMeaning: 'Hello / Respectful greetings',
        breakdown: [
          { word: 'నమస్కారం', romanized: 'Namaskaram', meaning: 'reverential greeting' }
        ],
        culturalNote: 'Used across formal and casual contexts, often accompanied by folding hands.'
      },
      {
        id: 'te-p-2',
        english: 'How are you?',
        native: 'మీరు ఎలా ఉన్నారు?',
        romanization: 'Meeru ela unnaaru?',
        pronunciationGuide: 'Mee-ru eh-la un-naa-ru?',
        englishMeaning: 'How are you? (polite / formal)',
        breakdown: [
          { word: 'మీరు', romanized: 'Meeru', meaning: 'You (polite)' },
          { word: 'ఎలా', romanized: 'Ela', meaning: 'How' },
          { word: 'ఉన్నారు', romanized: 'Unnaaru', meaning: 'are you' }
        ],
        culturalNote: '"Meeru" and "-unnaaru" show respect when talking to elders, colleagues, or new acquaintances.'
      },
      {
        id: 'te-p-3',
        english: 'I am fine.',
        native: 'నేను బాగున్నాను.',
        romanization: 'Nenu baagunnaanu.',
        pronunciationGuide: 'Nay-noo baa-goon-naa-noo.',
        englishMeaning: 'I am fine / I am doing well.',
        breakdown: [
          { word: 'నేను', romanized: 'Nenu', meaning: 'I' },
          { word: 'బాగున్నాను', romanized: 'Baagunnaanu', meaning: 'am fine / well' }
        ]
      },
      {
        id: 'te-p-4',
        english: 'Thank you.',
        native: 'ధన్యవాదాలు.',
        romanization: 'Dhanyavaadaalu.',
        pronunciationGuide: 'Dhun-yuh-vaa-daa-loo.',
        englishMeaning: 'Thank you.',
        breakdown: [
          { word: 'ధన్యవాదాలు', romanized: 'Dhanyavaadaalu', meaning: 'Gratitude / thanks' }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'te-ex-1',
        type: 'multiple_choice',
        prompt: 'Choose the correct respectful Telugu phrase for "How are you?":',
        options: [
          {
            id: 'opt-1',
            native: 'మీరు ఎలా ఉన్నారు?',
            romanization: 'Meeru ela unnaaru?',
            englishMeaning: 'How are you? (polite)'
          },
          {
            id: 'opt-2',
            native: 'మీరు ఎక్కడ ఉన్నారు?',
            romanization: 'Meeru ekkada unnaaru?',
            englishMeaning: 'Where are you?'
          },
          {
            id: 'opt-3',
            native: 'ఎవరు మీరు?',
            romanization: 'Evaru meeru?',
            englishMeaning: 'Who are you?'
          },
          {
            id: 'opt-4',
            native: 'ఏమిటి అది?',
            romanization: 'Emiti adi?',
            englishMeaning: 'What is that?'
          }
        ],
        correctOptionId: 'opt-1',
        explanation: '"Meeru ela unnaaru?" is the polite standard way to ask how someone is doing in Telugu.'
      },
      {
        id: 'te-ex-2',
        type: 'translate_to_target',
        prompt: 'Translate into Telugu: "I am fine."',
        options: [
          {
            id: 'opt-2a',
            native: 'నేను బాగున్నాను.',
            romanization: 'Nenu baagunnaanu.',
            englishMeaning: 'I am fine.'
          },
          {
            id: 'opt-2b',
            native: 'నేను వెళ్తున్నాను.',
            romanization: 'Nenu veltunnaanu.',
            englishMeaning: 'I am going.'
          },
          {
            id: 'opt-2c',
            native: 'మీరు ఎలా ఉన్నారు?',
            romanization: 'Meeru ela unnaaru?',
            englishMeaning: 'How are you?'
          },
          {
            id: 'opt-2d',
            native: 'ధన్యవాదాలు.',
            romanization: 'Dhanyavaadaalu.',
            englishMeaning: 'Thank you.'
          }
        ],
        correctOptionId: 'opt-2a',
        explanation: '"Nenu baagunnaanu" expresses "I am doing well / fine" in Telugu.'
      }
    ]
  },
  {
    id: 'te-lesson-2',
    languageCode: 'te',
    unit: 1,
    unitTitle: 'Unit 1: Essential Greetings & Introductions',
    title: 'Exchanging Names & Polite Enquiries',
    description: 'Learn how to ask someone\'s name and introduce yourself clearly in Telugu.',
    level: 'beginner',
    estimatedMinutes: 10,
    completed: true,
    score: 90,
    phrases: [
      {
        id: 'te-p-5',
        english: 'What is your name?',
        native: 'మీ పేరు ఏమిటి?',
        romanization: 'Mee peru emiti?',
        pronunciationGuide: 'Mee pay-roo ay-mi-ti?',
        englishMeaning: 'What is your name? (polite)',
        breakdown: [
          { word: 'మీ', romanized: 'Mee', meaning: 'Your (polite)' },
          { word: 'పేరు', romanized: 'Peru', meaning: 'Name' },
          { word: 'ఏమిటి', romanized: 'Emiti', meaning: 'What' }
        ]
      },
      {
        id: 'te-p-6',
        english: 'My name is Sahithi.',
        native: 'నా పేరు సహితి.',
        romanization: 'Naa peru Sahithi.',
        pronunciationGuide: 'Naa pay-roo Sahithi.',
        englishMeaning: 'My name is Sahithi.',
        breakdown: [
          { word: 'నా', romanized: 'Naa', meaning: 'My' },
          { word: 'పేరు', romanized: 'Peru', meaning: 'Name' }
        ]
      },
      {
        id: 'te-p-7',
        english: 'Nice to meet you.',
        native: 'మిమ్మల్ని కలవడం చాలా సంతోషంగా ఉంది.',
        romanization: 'Mimmalni kalavadam chaalaa santoshamgaa undi.',
        pronunciationGuide: 'Mim-mul-ni ku-lu-vu-dum chaa-laa sun-tho-shum-gaa oon-di.',
        englishMeaning: 'Nice to meet you (Meeting you brings great joy).',
        breakdown: [
          { word: 'మిమ్మల్ని', romanized: 'Mimmalni', meaning: 'You (polite)' },
          { word: 'కలవడం', romanized: 'Kalavadam', meaning: 'Meeting' },
          { word: 'చాలా', romanized: 'Chaalaa', meaning: 'Very' },
          { word: 'సంతోషంగా', romanized: 'Santoshamgaa', meaning: 'Happily' },
          { word: 'ఉంది', romanized: 'Undi', meaning: 'Is' }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'te-ex-3',
        type: 'multiple_choice',
        prompt: 'Translate into Telugu: "What is your name?"',
        options: [
          {
            id: 'opt-3a',
            native: 'మీ పేరు ఏమిటి?',
            romanization: 'Mee peru emiti?',
            englishMeaning: 'What is your name?'
          },
          {
            id: 'opt-3b',
            native: 'మీరు ఎక్కడ ఉన్నారు?',
            romanization: 'Meeru ekkada unnaaru?',
            englishMeaning: 'Where are you?'
          },
          {
            id: 'opt-3c',
            native: 'నా పేరు సహితి.',
            romanization: 'Naa peru Sahithi.',
            englishMeaning: 'My name is Sahithi.'
          },
          {
            id: 'opt-3d',
            native: 'ఇది ఏమిటి?',
            romanization: 'Idi emiti?',
            englishMeaning: 'What is this?'
          }
        ],
        correctOptionId: 'opt-3a',
        explanation: '"Mee" (your polite) + "peru" (name) + "emiti" (what) = "What is your name?".'
      }
    ]
  },
  {
    id: 'te-lesson-3',
    languageCode: 'te',
    unit: 2,
    unitTitle: 'Unit 2: Daily Essentials & Navigation',
    title: 'Drinking Water & Daily Needs',
    description: 'Crucial everyday survival expressions: drinking water, asking for help, and clarification.',
    level: 'beginner',
    estimatedMinutes: 12,
    completed: false,
    phrases: [
      {
        id: 'te-p-8',
        english: 'Water / Drinking water',
        native: 'మంచి నీళ్ళు',
        romanization: 'Manchi neellu',
        pronunciationGuide: 'Mun-chee neel-loo',
        englishMeaning: 'Drinking water (literally "good water")',
        breakdown: [
          { word: 'మంచి', romanized: 'Manchi', meaning: 'Good / clean' },
          { word: 'నీళ్ళు', romanized: 'Neellu', meaning: 'Water' }
        ],
        culturalNote: 'In Telugu households and restaurants, potable water is commonly requested as "manchi neellu".'
      },
      {
        id: 'te-p-9',
        english: 'Please give me water.',
        native: 'దయచేసి మంచి నీళ్ళు ఇవ్వండి.',
        romanization: 'Dayachesi manchi neellu ivvandi.',
        pronunciationGuide: 'Duh-yuh-chay-see mun-chee neel-loo eev-vun-di.',
        englishMeaning: 'Please give [drinking] water.',
        breakdown: [
          { word: 'దయచేసి', romanized: 'Dayachesi', meaning: 'Please' },
          { word: 'మంచి నీళ్ళు', romanized: 'Manchi neellu', meaning: 'Drinking water' },
          { word: 'ఇవ్వండి', romanized: 'Ivvandi', meaning: 'Please give' }
        ]
      },
      {
        id: 'te-p-10',
        english: 'I do not understand.',
        native: 'నాకు అర్థం కాలేదు.',
        romanization: 'Naaku ardham kaaledu.',
        pronunciationGuide: 'Naa-koo ur-thum kaa-lay-doo.',
        englishMeaning: 'I did not understand.',
        breakdown: [
          { word: 'నాకు', romanized: 'Naaku', meaning: 'To me' },
          { word: 'అర్థం', romanized: 'Ardham', meaning: 'Meaning' },
          { word: 'కాలేదు', romanized: 'Kaaledu', meaning: 'Not clear / did not happen' }
        ]
      }
    ],
    practiceExercises: [
      {
        id: 'te-ex-4',
        type: 'multiple_choice',
        prompt: 'In Telugu, what is the polite phrase for drinking water?',
        options: [
          {
            id: 'opt-4a',
            native: 'మంచి నీళ్ళు',
            romanization: 'Manchi neellu',
            englishMeaning: 'Good water / Drinking water'
          },
          {
            id: 'opt-4b',
            native: 'వేడి పాలు',
            romanization: 'Vedi paalu',
            englishMeaning: 'Hot milk'
          },
          {
            id: 'opt-4c',
            native: 'తీపి చాయ్',
            romanization: 'Teepi chaai',
            englishMeaning: 'Sweet tea'
          },
          {
            id: 'opt-4d',
            native: 'చల్లని గాలి',
            romanization: 'Challani gaali',
            englishMeaning: 'Cool breeze'
          }
        ],
        correctOptionId: 'opt-4a',
        explanation: '"Manchi neellu" literally translates to "good water" and is the standard Telugu phrase for drinking water.'
      },
      {
        id: 'te-ex-5',
        type: 'multiple_choice',
        prompt: 'What is the Telugu word for "water"?',
        options: [
          {
            id: 'opt-5a',
            native: 'నీళ్లు',
            romanization: 'Neellu',
            englishMeaning: 'Water'
          },
          {
            id: 'opt-5b',
            native: 'వేడి పాలు',
            romanization: 'Vedi paalu',
            englishMeaning: 'Hot milk'
          },
          {
            id: 'opt-5c',
            native: 'తీపి చాయ్',
            romanization: 'Teepi chaai',
            englishMeaning: 'Sweet tea'
          },
          {
            id: 'opt-5d',
            native: 'చల్లని గాలి',
            romanization: 'Challani gaali',
            englishMeaning: 'Cool breeze'
          }
        ],
        correctOptionId: 'opt-5a',
        explanation: '"Neellu" (నీళ్లు) is the direct Telugu noun for water.'
      }
    ]
  }
];
