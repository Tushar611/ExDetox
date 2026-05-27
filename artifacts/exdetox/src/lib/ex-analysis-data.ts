export interface ExQuestion {
  id: string;
  question: string;
  options: { text: string; tags: string[] }[];
}

export const EX_QUESTIONS: ExQuestion[] = [
  {
    id: "duration",
    question: "How long were you together?",
    options: [
      { text: "Less than 3 months", tags: ["short", "idealized"] },
      { text: "3 months – 1 year", tags: ["medium"] },
      { text: "1 – 3 years", tags: ["long", "deep"] },
      { text: "3+ years", tags: ["long", "deep", "enmeshed"] },
    ],
  },
  {
    id: "ending",
    question: "How did it end?",
    options: [
      { text: "They broke up with me suddenly", tags: ["abandoned", "avoidant"] },
      { text: "I ended it — even though it hurt", tags: ["self-aware"] },
      { text: "We both agreed it wasn't working", tags: ["mutual", "healthy"] },
      { text: "It just... faded out", tags: ["fade", "ambiguous"] },
    ],
  },
  {
    id: "security",
    question: "Did they make you feel secure?",
    options: [
      { text: "Yes, always — they were consistent", tags: ["secure", "healthy"] },
      { text: "Sometimes, when they were in the mood", tags: ["avoidant", "inconsistent"] },
      { text: "Rarely — I was always guessing", tags: ["anxious", "avoidant"] },
      { text: "No — I was constantly on edge", tags: ["anxious", "traumabond"] },
    ],
  },
  {
    id: "redflags",
    question: "Were there red flags you ignored?",
    options: [
      { text: "No, they were genuinely good to me", tags: ["healthy", "grieving"] },
      { text: "A few small ones I noticed but excused", tags: ["idealized"] },
      { text: "Yes, I saw them but hoped they'd change", tags: ["codependent", "hopeful"] },
      { text: "Major ones — I just couldn't leave", tags: ["traumabond", "codependent"] },
    ],
  },
  {
    id: "conflict",
    question: "When you argued, what happened?",
    options: [
      { text: "We talked it out like adults", tags: ["secure", "healthy"] },
      { text: "I usually apologized even when I wasn't wrong", tags: ["codependent", "fawn"] },
      { text: "They went cold / silent / shut down", tags: ["avoidant", "stonewall"] },
      { text: "Things escalated — yelling, harsh words", tags: ["traumabond", "volatile"] },
    ],
  },
  {
    id: "support",
    question: "Did they support your goals and growth?",
    options: [
      { text: "Yes — they were my biggest cheerleader", tags: ["healthy", "grieving"] },
      { text: "They were supportive when it suited them", tags: ["inconsistent"] },
      { text: "They were mostly indifferent", tags: ["avoidant"] },
      { text: "They subtly undermined my confidence", tags: ["narcissistic", "controlling"] },
    ],
  },
  {
    id: "start",
    question: "How did the relationship start?",
    options: [
      { text: "Slow and steady — it built naturally", tags: ["secure", "healthy"] },
      { text: "Fast and intense — swept off my feet", tags: ["lovebomb", "idealized"] },
      { text: "Complicated from the start", tags: ["codependent", "ambiguous"] },
      { text: "I chased, they warmed up eventually", tags: ["anxious", "avoidant"] },
    ],
  },
  {
    id: "miss",
    question: "Right now, what do you miss most?",
    options: [
      { text: "Them — specifically who they were", tags: ["grieving", "healthy"] },
      { text: "The comfort and routine", tags: ["comfort", "enmeshed"] },
      { text: "The highs — when it was good, it was incredible", tags: ["lovebomb", "volatile"] },
      { text: "Honestly, the idea of them more than them", tags: ["idealized", "anxious"] },
    ],
  },
];

export interface ExArchetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  insight: string;
  healingTips: string[];
  triggerTags: string[];
}

export const EX_ARCHETYPES: ExArchetype[] = [
  {
    id: "lovebomb",
    name: "The Love Bomb Aftermath",
    emoji: "💣",
    tagline: "The highs were everything. That's why the crash hit so hard.",
    description:
      "Your relationship started with incredible intensity — you were made to feel like the most special person in the world. Then something shifted. The crash after love bombing is brutal because the high was real, even if the consistency wasn't.",
    insight:
      "You weren't naive. Love bombing is designed to bypass your defenses. The feelings were real; the sustainability wasn't. What you're grieving is the version of them you first met — and the loss of who you thought you were to them.",
    healingTips: [
      "Write down the specific behaviors that changed after the honeymoon phase",
      "Notice if you're minimizing red flags from early on in your memory",
      "Remind yourself: intensity ≠ depth, and fast ≠ real",
      "Research love bombing — recognizing the pattern protects you next time",
    ],
    triggerTags: ["lovebomb", "idealized"],
  },
  {
    id: "avoidant",
    name: "The Avoidant Bond",
    emoji: "🧊",
    tagline: "You mistook their distance for depth.",
    description:
      "You fell for someone emotionally unavailable. Their walls made you work harder. The problem isn't that you loved them — it's that their inconsistency triggered something in you that made you want to earn what should have been freely given.",
    insight:
      "Avoidant partners often create anxious dynamics in the other person. If you found yourself constantly chasing reassurance or reading into their behavior, that's a trauma response — not weakness. You deserved consistent love, not puzzle pieces.",
    healingTips: [
      "Notice if you're attracted to unavailability — that's attachment style work",
      "Ask yourself: did you confuse 'hard to get' with 'worth having'?",
      "Consistency will feel boring at first. Learn to appreciate it.",
      "Look into anxious-avoidant attachment dynamics",
    ],
    triggerTags: ["avoidant", "anxious", "stonewall"],
  },
  {
    id: "codependent",
    name: "The Codependency Loop",
    emoji: "🔄",
    tagline: "Your worth got tangled up in their validation.",
    description:
      "In this dynamic, the relationship became the center of your identity. You gave more than you received, apologized when you weren't wrong, and stayed longer than was healthy. That's not love — that's codependency, and it runs deep.",
    insight:
      "Codependency often comes from learning early on that love is conditional and earned. You didn't choose this — it was wired in. The work now is learning to validate yourself without an external source.",
    healingTips: [
      "Identify one area where you abandoned your own needs for theirs",
      "Practice saying 'I disagree' without apologizing after",
      "Therapy is especially helpful here — specifically CBT or attachment-focused",
      "Read: 'Codependent No More' by Melody Beattie",
    ],
    triggerTags: ["codependent", "fawn", "enmeshed"],
  },
  {
    id: "traumabond",
    name: "The Trauma Bond",
    emoji: "⛓️",
    tagline: "The chaos felt like passion. It wasn't.",
    description:
      "High highs and low lows. You might have stayed long after you knew something was wrong. That's not weakness — trauma bonding is a neurological response to intermittent reinforcement. The unpredictability made your nervous system addicted to them.",
    insight:
      "What felt like love was partly adrenaline. When someone treats you badly and then well, your brain releases more dopamine on the 'good' moments than if they were consistently good. You were literally chemically attached.",
    healingTips: [
      "Strict no contact is non-negotiable for trauma bond recovery — even more than most breakups",
      "Ground your nervous system daily: cold showers, breathwork, walks",
      "Therapy is strongly recommended — trauma bonds are hard to break alone",
      "Don't romanticize the highs without remembering what caused the lows",
    ],
    triggerTags: ["traumabond", "volatile", "controlling", "narcissistic"],
  },
  {
    id: "healthy",
    name: "The Healthy Heartbreak",
    emoji: "💔",
    tagline: "This one was real. That's exactly why it hurts.",
    description:
      "Not every breakup is a lesson in red flags. Sometimes two people who care deeply just don't work out — different timing, different paths, different needs. This kind of loss is some of the hardest to process because there's no villain to blame.",
    insight:
      "Grieving a genuinely good relationship is valid and hard. You don't need to demonize them or the relationship to move on. It was real, it ended, and both things are true at once.",
    healingTips: [
      "Allow yourself to grieve without needing a reason it 'should' hurt",
      "You don't have to hate them to heal — you can miss them and still move forward",
      "Journal about what this relationship taught you about what you want",
      "Understand that 'right person wrong time' is real — and painful",
    ],
    triggerTags: ["healthy", "grieving", "mutual"],
  },
  {
    id: "ambiguous",
    name: "The Undefined Chapter",
    emoji: "🌫️",
    tagline: "The lack of clarity was the cruelest part.",
    description:
      "Your story didn't have a clean ending. No big fight, no closure conversation — just ambiguity that left you holding all the weight. The 'slow fade' is one of the most modern and underrated forms of emotional harm.",
    insight:
      "When there's no clear ending, your brain invents narratives to fill the gap. You can spend months analyzing what went wrong when the truth is: they didn't have the maturity to give you a real goodbye. That's on them.",
    healingTips: [
      "Write the goodbye conversation they should have had with you",
      "Stop trying to 'figure out' what happened — some things don't have clean answers",
      "Closure is yours to create, not theirs to give",
      "Ambiguous endings often reflect on their avoidance, not your inadequacy",
    ],
    triggerTags: ["fade", "ambiguous", "comfort"],
  },
];

export function analyzeEx(answers: Record<string, string[]>): ExArchetype {
  const tagCounts: Record<string, number> = {};

  Object.values(answers).forEach(tags => {
    tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  let bestArchetype = EX_ARCHETYPES[4]; // default: healthy
  let bestScore = 0;

  for (const archetype of EX_ARCHETYPES) {
    const score = archetype.triggerTags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestArchetype = archetype;
    }
  }

  return bestArchetype;
}
