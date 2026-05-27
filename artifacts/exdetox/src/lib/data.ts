export const QUOTES = [
  "You miss the memories, not the disrespect.",
  "Healing starts when stalking stops.",
  "They're not thinking about you as much as you're thinking about them.",
  "Closure is something you give yourself.",
  "Soft life era. No drama, no contact, no exceptions.",
  "The best revenge is not caring.",
  "Your future self is grateful you didn't text.",
  "They didn't change. You just stopped making excuses for them.",
  "Block. Mute. Move on. In that order.",
  "You're the main character. Stop giving them screen time.",
  "Romanticize your own life before romanticizing theirs.",
  "Deleting old texts isn't moving on — it's moving up.",
  "If they wanted to, they would.",
  "Don't trip over something behind you.",
  "Sometimes the trash takes itself out.",
  "You survived worse days than this.",
  "Focus on your goals, not your ghosts.",
  "Don't lose yourself trying to fix them.",
  "Peace is better than attention.",
  "They are a lesson, not a life sentence.",
  "Unbothered is the highest level you can reach.",
  "Your healing is not a slow process. It's a brave one.",
  "You deserve a love that doesn't make you question your worth.",
  "Stop being available for people who ghost you.",
  "Being alone is better than being chosen only sometimes.",
  "They lost someone who actually cared. You lost someone who didn't.",
  "You didn't fail. You learned what you'll never accept again.",
  "The version of them you loved might not even exist anymore.",
  "It's not love if it only shows up when it's convenient.",
  "Your standards aren't too high. Their effort was just too low.",
  "Stop shrinking yourself to fit someone who doesn't deserve your full size.",
  "One day you'll laugh at how much you cried over this.",
  "You can miss someone and still know they weren't good for you.",
  "The right person won't make you feel like a backup plan.",
  "Detachment is a superpower. Start practicing it.",
  "Your peace is more valuable than any relationship.",
  "They left and the sun still rose. That's your sign.",
  "You're not hard to love. They were just scared of real love.",
  "Healing isn't linear. Bad days don't mean you're starting over.",
  "Every day of no contact is a vote for your future self."
];

export const MISSIONS = [
  "Don't stalk their profile today",
  "Drink 8 glasses of water",
  "Go for a 20-minute walk",
  "Delete one old screenshot or convo",
  "Message a friend you've been ignoring",
  "Study or work for 30 mins straight",
  "Watch something that has nothing to do with love",
  "Eat a real meal, not just snacks",
  "Write 3 things you're grateful for",
  "Put your phone down for 1 hour",
  "Clean your space",
  "Listen to a hype playlist, not a sad one",
  "Touch grass (literally go outside)",
  "Journal 5 minutes",
  "Do 10 push-ups or sit-ups",
  "Take a long, hot shower",
  "Cook yourself a nice meal",
  "Read 10 pages of a book",
  "Organize your digital files",
  "Try a new hobby or activity"
];

export const STOP_ME_QUOTES = [
  "Close the app. Put your phone down. You'll regret it.",
  "Don't do it. You're better than this.",
  "They aren't worth resetting your streak.",
  "Breathe. This feeling will pass.",
  "Texting them won't give you the answer you want."
];

export const STOP_ME_DISTRACTIONS = [
  "Do 20 jumping jacks RIGHT NOW.",
  "Go drink a full glass of cold water.",
  "Write down 5 reasons why it ended.",
  "Call a friend instead.",
  "Do a 2-minute plank."
];

export const QUIZ_QUESTIONS = [
  {
    question: "How many times have you checked their profile today?",
    options: [
      { text: "0", points: 0 },
      { text: "1-3", points: 1 },
      { text: "4-10", points: 2 },
      { text: "I lost count", points: 3 }
    ]
  },
  {
    question: "When a song comes on that reminds you of them, you...",
    options: [
      { text: "skip it", points: 0 },
      { text: "feel it for 30s", points: 1 },
      { text: "cry in the Uber", points: 2 },
      { text: "spiral for hours", points: 3 }
    ]
  },
  {
    question: "What did you do with their number?",
    options: [
      { text: "blocked", points: 0 },
      { text: "still saved", points: 1 },
      { text: "renamed to 'Do Not Open'", points: 2 },
      { text: "texted 'hey' last week", points: 3 }
    ]
  },
  {
    question: "Your current sleep quality is...",
    options: [
      { text: "perfect", points: 0 },
      { text: "a bit off", points: 1 },
      { text: "3am thoughts", points: 2 },
      { text: "what is sleep", points: 3 }
    ]
  },
  {
    question: "Rate your delusion level...",
    options: [
      { text: "I'm fine", points: 0 },
      { text: "mild yearning", points: 1 },
      { text: "sending subtweets", points: 2 },
      { text: "writing essays in notes app", points: 3 }
    ]
  }
];

export const getDailyQuote = (dateString: string) => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % QUOTES.length;
  return QUOTES[index];
};

export const getDailyMissions = (dateString: string, count = 3) => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0;
  }
  const result = [];
  const available = [...MISSIONS];
  const limit = Math.min(count, available.length);

  for (let i = 0; i < limit; i++) {
    const nextHash = Math.abs(hash + i * 31) % available.length;
    result.push(available[nextHash]);
    available.splice(nextHash, 1);
  }

  return result;
};
