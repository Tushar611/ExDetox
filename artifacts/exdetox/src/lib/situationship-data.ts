export const SITU_QUOTES = [
  "You can't get closure from someone who never opened.",
  "Being 'almost' in a relationship hurts just as much as a real one.",
  "You don't need a title to deserve respect.",
  "Almost doesn't count, but it still stings. That's valid.",
  "They kept you on the hook. That's on them, not you.",
  "You weren't crazy. The situationship was.",
  "Situationships are relationships without the accountability.",
  "They had all the benefits and none of the commitment. That's not love.",
  "You held space for someone who wasn't holding it back.",
  "Being chosen sometimes feels better than being loved. But it isn't.",
  "'We're just vibing' was never good enough for you.",
  "You deserve someone who's sure about you.",
  "The talking stage shouldn't last 8 months.",
  "If they wanted a label, they would have given you one.",
  "You were a placeholder. You deserved to be the plan.",
  "Undefined didn't mean undefined feelings — you felt everything.",
  "Stop analyzing the last text. There is no hidden message.",
  "They were never confused. They just liked having options.",
  "Your intuition was right the whole time.",
  "The 'what are we' conversation shouldn't be that hard.",
  "You gave exclusivity they never earned.",
  "Some people collect connections like trophies. Don't be a trophy.",
  "They liked you enough to keep you, not enough to commit to you.",
  "The uncertainty was by design. You deserved more.",
  "Soft launching someone who ghosted you later — never again.",
  "Your feelings were real. The relationship just wasn't.",
  "Catching feelings in a situationship is like tripping on nothing.",
  "You can mourn something that was never official. That's allowed.",
  "They showed you who they were. You just hoped they'd change.",
  "Done being a 'maybe' for someone who should have said yes.",
];

export const SITU_CLARITY_LEVELS = [
  { label: "Entangled",       minDays: 0,  maxDays: 3,  desc: "Still processing. That's okay." },
  { label: "Untangling",      minDays: 4,  maxDays: 6,  desc: "Starting to see it for what it was." },
  { label: "Gaining Distance", minDays: 7, maxDays: 13, desc: "The fog is slowly lifting." },
  { label: "Seeing Clearly",  minDays: 14, maxDays: 29, desc: "You're recognizing your worth." },
  { label: "Unbothered",      minDays: 30, maxDays: 59, desc: "They don't live in your head anymore." },
  { label: "Fully Free",      minDays: 60, maxDays: Infinity, desc: "You outgrew the whole chapter." },
];

export const getSituLevel = (days: number) => {
  return SITU_CLARITY_LEVELS.find(l => days >= l.minDays && days <= l.maxDays)
    ?? SITU_CLARITY_LEVELS[SITU_CLARITY_LEVELS.length - 1];
};

export const SITU_MISSIONS = [
  "Don't reread your old convos",
  "Stop checking if they've viewed your story",
  "Stop analyzing their 'last seen'",
  "Delete the screenshot you were about to send your friend",
  "Unfollow their close friends too, not just them",
  "Write down 3 times they let you down",
  "Stop justifying their behavior to yourself",
  "Block them on one more platform",
  "Go one hour without opening their profile",
  "Don't post anything to make them jealous",
  "Message a friend who actually checks on you",
  "Write down what you actually wanted from them",
  "Stop romanticizing the good moments only",
  "Remind yourself: consistency > chemistry",
  "Do one thing today purely for yourself",
  "Delete their contact from your Snapchat/IG DMs",
  "Write 'I deserve clarity' 5 times",
  "List 3 green flags you want in your next person",
  "Spend 20 mins on a hobby they never cared about",
  "Eat something good. You deserve to be nourished.",
];

export const SITU_CHECKIN_QUESTIONS = [
  {
    question: "In the last 24 hours, have you checked their profile?",
    options: [
      { text: "No. Clean.", points: 0 },
      { text: "Once, quickly", points: 1 },
      { text: "A few times", points: 2 },
      { text: "I basically live there", points: 3 },
    ],
  },
  {
    question: "When you think about them right now, you feel...",
    options: [
      { text: "Honestly, fine", points: 0 },
      { text: "A dull ache", points: 1 },
      { text: "Confused and a bit sad", points: 2 },
      { text: "Full spiral mode", points: 3 },
    ],
  },
  {
    question: "Have you convinced yourself they might still come back?",
    options: [
      { text: "Nope", points: 0 },
      { text: "Small part of me maybe", points: 1 },
      { text: "I'm lowkey waiting", points: 2 },
      { text: "I have a whole plan", points: 3 },
    ],
  },
  {
    question: "How much of your day are they taking up?",
    options: [
      { text: "Barely any", points: 0 },
      { text: "Occasional thoughts", points: 1 },
      { text: "Background noise all day", points: 2 },
      { text: "They're the main character of my brain", points: 3 },
    ],
  },
  {
    question: "Be honest: would you take them back if they texted right now?",
    options: [
      { text: "Absolutely not", points: 0 },
      { text: "I'd want an explanation first", points: 1 },
      { text: "Probably yes if they apologized", points: 2 },
      { text: "I'm waiting for that text rn", points: 3 },
    ],
  },
];

export const SITU_CHECKIN_RESULTS = [
  { maxScore: 3,  label: "Doing Great",         copy: "You're genuinely processing this healthily. Keep that energy." },
  { maxScore: 7,  label: "Still Healing",        copy: "You're doing okay but still in it. That's normal. Give it time." },
  { maxScore: 11, label: "A Bit Tangled",        copy: "You're still caught up. Try cutting off one more access point today." },
  { maxScore: 15, label: "Deep in the Fog",      copy: "Babe. They're living rent-free. Time to evict. Start with one block." },
];

export const getSituCheckinResult = (score: number) => {
  return SITU_CHECKIN_RESULTS.find(r => score <= r.maxScore) ?? SITU_CHECKIN_RESULTS[SITU_CHECKIN_RESULTS.length - 1];
};

export const getDailySituMissions = (dateString: string, count = 3) => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0;
  }
  const result: string[] = [];
  const available = [...SITU_MISSIONS];
  const limit = Math.min(count, available.length);
  for (let i = 0; i < limit; i++) {
    const idx = Math.abs(hash + i * 37) % available.length;
    result.push(available[idx]);
    available.splice(idx, 1);
  }
  return result;
};

export const getDailySituQuote = (dateString: string) => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = (hash << 5) - hash + dateString.charCodeAt(i);
    hash |= 0;
  }
  return SITU_QUOTES[Math.abs(hash + 7) % SITU_QUOTES.length];
};
