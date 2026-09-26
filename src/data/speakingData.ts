import { SpeakingScenario } from '../types';

export const SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: 'scenario-cafe',
    title: 'Ordering at a Traditional Café',
    context: 'You are at a local cafe in Hyderabad. The server greets you and asks what you would like to order.',
    level: 'beginner',
    aiFirstMessage: {
      native: 'నమస్కారం అండి! మీకు ఏమి కావాలి?',
      romanization: 'Namaskaram andi! Meeku emi kaavali?',
      english: 'Hello sir/madam! What would you like to have?'
    },
    expectedResponseExample: {
      native: 'నాకు ఒక కప్పు వేడి చాయ్ కావాలి, ధన్యవాదాలు.',
      romanization: 'Naaku oka kappu vedi chai kaavali, dhanyavaadaalu.',
      english: 'I would like a cup of hot tea, thank you.'
    }
  },
  {
    id: 'scenario-family',
    title: 'Meeting a Friend\'s Elders',
    context: 'You are visiting your Telugu friend\'s home. Their mother opens the door with a warm smile.',
    level: 'beginner',
    aiFirstMessage: {
      native: 'రండి బాబూ, లోపలికి రండి! ఎలా ఉన్నారు?',
      romanization: 'Randi babu, lopaliki randi! Ela unnaru?',
      english: 'Welcome, please come inside! How are you doing?'
    },
    expectedResponseExample: {
      native: 'నమస్కారం ఆంటీ! నేను బాగున్నాను, మీరు ఎలా ఉన్నారు?',
      romanization: 'Namaskaram aunty! Nenu baagunnanu, meeru ela unnaru?',
      english: 'Greetings aunty! I am doing well, how are you?'
    }
  },
  {
    id: 'scenario-directions',
    title: 'Asking for Directions to Charminar',
    context: 'You are walking in the city and want to confirm the way to the landmark.',
    level: 'elementary',
    aiFirstMessage: {
      native: 'చెప్పండి, మీకు ఏదైనా సహాయం కావాలా?',
      romanization: 'Cheppandi, meeku edaina sahaayam kaavaalaa?',
      english: 'Tell me, do you need any assistance?'
    },
    expectedResponseExample: {
      native: 'అవునండి, చార్మినార్ కు వెళ్ళే దారి ఏది?',
      romanization: 'Avunandi, Charminar ku velle daari edi?',
      english: 'Yes please, which is the way to go to Charminar?'
    }
  }
];
