import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { Heart, ChevronLeft, RotateCcw } from "lucide-react";
import { useLocation } from "wouter";

const ATTACHMENT_QUESTIONS = [
  {
    q: "When you're into someone, you usually...",
    options: [
      { text: "Feel comfortable getting close and being vulnerable", style: "secure", pts: 3 },
      { text: "Want closeness but worry they'll pull away", style: "anxious", pts: 3 },
      { text: "Enjoy the connection but need a lot of space", style: "avoidant", pts: 3 },
      { text: "Want them close but also get scared when they are", style: "fearful", pts: 3 },
    ],
  },
  {
    q: "When they don't text back for hours, you...",
    options: [
      { text: "Get on with your day — they're probably busy", style: "secure", pts: 2 },
      { text: "Spiral a little and check their last seen", style: "anxious", pts: 2 },
      { text: "Feel secretly relieved to have space", style: "avoidant", pts: 2 },
      { text: "Go from worried to 'I don't care anyway'", style: "fearful", pts: 2 },
    ],
  },
  {
    q: "In arguments, you tend to...",
    options: [
      { text: "Stay present and try to resolve things", style: "secure", pts: 2 },
      { text: "Get escalated and need reassurance", style: "anxious", pts: 2 },
      { text: "Shut down or go quiet", style: "avoidant", pts: 2 },
      { text: "Oscillate between wanting to fix it and wanting to end it", style: "fearful", pts: 2 },
    ],
  },
  {
    q: "When a relationship is going really well, you...",
    options: [
      { text: "Enjoy it and feel grateful", style: "secure", pts: 2 },
      { text: "Worry it's too good and something will go wrong", style: "anxious", pts: 2 },
      { text: "Start to feel a bit smothered and need distance", style: "avoidant", pts: 2 },
      { text: "Feel happy but also like you're waiting for the other shoe to drop", style: "fearful", pts: 2 },
    ],
  },
  {
    q: "After a breakup, you typically...",
    options: [
      { text: "Grieve genuinely, then move forward at your own pace", style: "secure", pts: 2 },
      { text: "Obsess over what went wrong and struggle to let go", style: "anxious", pts: 2 },
      { text: "Keep busy and avoid thinking about it too much", style: "avoidant", pts: 2 },
      { text: "Go through intense grief followed by sudden numbness", style: "fearful", pts: 2 },
    ],
  },
];

const ATTACHMENT_RESULTS: Record<string, { title: string; emoji: string; description: string; growth: string[] }> = {
  secure: {
    title: "Secure Attachment",
    emoji: "🌱",
    description:
      "You have a healthy foundation for relationships. You can be vulnerable, communicate needs, and handle conflict without catastrophizing. This doesn't mean you're immune to heartbreak — but you have the tools to heal and connect again.",
    growth: [
      "Your challenge: making sure you don't dismiss others' anxious or avoidant patterns as 'too much'",
      "Keep nurturing your ability to express needs clearly",
      "Check in with yourself about whether you're settling out of ease",
    ],
  },
  anxious: {
    title: "Anxious Attachment",
    emoji: "🫀",
    description:
      "You love deeply and want deep connection — but fear of abandonment often drives your behavior. You can come across as 'too much' to avoidant types, which creates painful push-pull cycles. Your sensitivity is a gift; the goal is learning to self-soothe.",
    growth: [
      "Learn to distinguish between intuition and anxiety — they feel the same at first",
      "Build a life so full that one person can't make or break it",
      "Practice: when you want to reach out from anxiety, wait 20 minutes first",
      "Therapy (especially IFS or attachment-focused) is incredibly helpful",
    ],
  },
  avoidant: {
    title: "Avoidant Attachment",
    emoji: "🧊",
    description:
      "You value independence highly and often feel smothered by partners who want more closeness than you're comfortable giving. This isn't coldness — it's protection. Somewhere along the way, you learned that depending on others wasn't safe.",
    growth: [
      "Notice when you're pulling away and ask: is this preference or protection?",
      "Being vulnerable once without running — even a little — rewires the pattern",
      "Journaling about what closeness felt like in your childhood can unlock a lot",
      "You can want space AND want connection — these aren't opposites",
    ],
  },
  fearful: {
    title: "Fearful-Avoidant (Disorganized)",
    emoji: "🌀",
    description:
      "You deeply want love AND deeply fear it. This creates a push-pull dynamic that's exhausting for you and confusing for partners. This style often develops from inconsistent early caregiving. It's the most complex — but also the most healable with the right support.",
    growth: [
      "This attachment style benefits most from working with a therapist",
      "Your nervous system needs safety before your heart can open",
      "Small, consistent safe experiences in relationships rewrite the wiring",
      "Somatic work (body-based therapy) can be especially powerful",
    ],
  },
};

function tally(answers: string[]): string {
  const counts: Record<string, number> = { secure: 0, anxious: 0, avoidant: 0, fearful: 0 };
  answers.forEach(a => { counts[a] = (counts[a] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

function AttachmentContent() {
  const [, setLocation] = useLocation();
  const [savedStyle, setSavedStyle] = useLocalStorage<string | null>("exdetox_attachment_style", null);
  const [step, setStep] = useState<"intro" | "quiz" | "result">(savedStyle ? "result" : "intro");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultKey, setResultKey] = useState(savedStyle);

  const choose = (style: string) => {
    const next = [...answers, style];
    if (qIdx < ATTACHMENT_QUESTIONS.length - 1) {
      setAnswers(next);
      setQIdx(qIdx + 1);
    } else {
      const key = tally(next);
      setSavedStyle(key);
      setResultKey(key);
      setStep("result");
    }
  };

  const restart = () => {
    setStep("intro"); setQIdx(0); setAnswers([]);
    setResultKey(null); setSavedStyle(null);
  };

  const result = resultKey ? ATTACHMENT_RESULTS[resultKey] : null;

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-y-auto pb-10">
      <div className="flex items-center gap-3 p-5 pt-8">
        <button data-testid="button-back" onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Heart size={18} className="text-primary" /> Attachment Style
          </h1>
          <p className="text-xs text-muted-foreground">Understand why you love the way you do.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center px-6 py-8 gap-6 text-center">
            <div className="text-5xl">💞</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">How do you attach?</h2>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Your attachment style is not a label — it is a map. Knowing it helps you stop repeating the same painful cycle and know what your heart actually needs.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              {Object.entries(ATTACHMENT_RESULTS).map(([k, v]) => (
                <div key={k} className="p-3 bg-card/30 border border-border/30 rounded-xl text-center">
                  <div className="text-2xl mb-1">{v.emoji}</div>
                  <p className="text-xs font-semibold">{v.title}</p>
                </div>
              ))}
            </div>
            <button data-testid="button-start-attachment"
              onClick={() => setStep("quiz")}
              className="w-full max-w-xs py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
              Find your style →
            </button>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div key={`q-${qIdx}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="flex flex-col px-5 py-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{qIdx + 1} of {ATTACHMENT_QUESTIONS.length}</span>
                <span>{Math.round((qIdx / ATTACHMENT_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{ width: `${(qIdx / ATTACHMENT_QUESTIONS.length) * 100}%` }} />
              </div>
            </div>
            <p className="text-xl font-bold leading-snug py-2">{ATTACHMENT_QUESTIONS[qIdx].q}</p>
            <div className="space-y-3">
              {ATTACHMENT_QUESTIONS[qIdx].options.map((opt, i) => (
                <motion.button key={i} whileTap={{ scale: 0.98 }} data-testid={`button-attachment-${i}`}
                  onClick={() => choose(opt.style)}
                  className="w-full text-left p-4 rounded-2xl border border-border/50 bg-card/40 text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-all">
                  {opt.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "result" && result && (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col px-5 py-4 gap-5">
            <div className="bg-gradient-to-br from-card/60 to-primary/10 border border-primary/30 rounded-3xl p-6 text-center backdrop-blur-sm">
              <div className="text-5xl mb-3">{result.emoji}</div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">Your attachment style</p>
              <h2 className="text-2xl font-black">{result.title}</h2>
            </div>

            <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">What this means</h3>
              <p className="text-sm text-foreground/85 leading-relaxed">{result.description}</p>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Your growth edge</h3>
              <div className="space-y-2.5">
                {result.growth.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-foreground/80 leading-snug">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <button data-testid="button-retake-attachment" onClick={restart}
              className="flex items-center gap-2 mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors py-2">
              <RotateCcw size={12} /> Retake quiz
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AttachmentQuiz() {
  return (
    <ProGate feature="Attachment Style Quiz" description="Discover your attachment pattern and understand why you love the way you do.">
      <AttachmentContent />
    </ProGate>
  );
}
