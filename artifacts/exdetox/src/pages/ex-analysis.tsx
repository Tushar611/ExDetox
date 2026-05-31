import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { EX_QUESTIONS, analyzeEx, type ExArchetype } from "@/lib/ex-analysis-data";
import { ChevronLeft, Brain, RotateCcw, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

type Step = "intro" | "quiz" | "result";

function ExAnalysisContent() {
  const [, setLocation] = useLocation();
  const [savedResult, setSavedResult] = useLocalStorage<ExArchetype | null>("exdetox_ex_archetype", null);
  const [step, setStep] = useState<Step>(savedResult ? "result" : "intro");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [result, setResult] = useState<ExArchetype | null>(savedResult);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const currentQ = EX_QUESTIONS[qIdx];

  const choose = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    const tags = currentQ.options[optionIdx].tags;
    const newAnswers = { ...answers, [currentQ.id]: tags };

    setTimeout(() => {
      if (qIdx < EX_QUESTIONS.length - 1) {
        setAnswers(newAnswers);
        setQIdx(qIdx + 1);
        setSelectedOption(null);
      } else {
        const archetype = analyzeEx(newAnswers);
        setResult(archetype);
        setSavedResult(archetype);
        setStep("result");
      }
    }, 300);
  };

  const restart = () => {
    setStep("intro");
    setQIdx(0);
    setAnswers({});
    setResult(null);
    setSavedResult(null);
    setSelectedOption(null);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen overflow-y-auto pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pt-8">
        <button
          data-testid="button-back"
          onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Brain size={18} className="text-primary" /> Ex Analysis
          </h1>
          <p className="text-xs text-muted-foreground">Understand the dynamic. Get clarity.</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* INTRO */}
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center flex-1 px-6 text-center gap-6 py-8"
          >
            <div className="text-6xl">🧠</div>
            <div>
              <h2 className="text-2xl font-bold mb-2">What was that, really?</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                8 quick questions about your relationship. We'll identify the dynamic you were in and give you the honest, useful insight you need to move forward.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-3 text-left">
              {["Love Bomb Aftermath", "Avoidant Bond", "Codependency Loop", "Trauma Bond", "Healthy Heartbreak", "Undefined Chapter"].map((a) => (
                <div key={a} className="flex items-center gap-3 p-3 rounded-xl bg-card/30 border border-border/30">
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{a}</span>
                </div>
              ))}
            </div>

            <button
              data-testid="button-start-analysis"
              onClick={() => setStep("quiz")}
              className="w-full max-w-xs py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
            >
              Start the analysis →
            </button>
            <p className="text-xs text-muted-foreground">~2 minutes. No right or wrong answers.</p>
          </motion.div>
        )}

        {/* QUIZ */}
        {step === "quiz" && (
          <motion.div
            key={`q-${qIdx}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 px-5 py-4 gap-6"
          >
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Question {qIdx + 1} of {EX_QUESTIONS.length}</span>
                <span>{Math.round((qIdx / EX_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  animate={{ width: `${((qIdx) / EX_QUESTIONS.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="py-4">
              <p className="text-xl font-bold leading-snug">{currentQ.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, i) => (
                <motion.button
                  key={i}
                  data-testid={`button-answer-${i}`}
                  onClick={() => choose(i)}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                    selectedOption === i
                      ? "border-primary bg-primary/15 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.2)]"
                      : "border-border/50 bg-card/40 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  {opt.text}
                </motion.button>
              ))}
            </div>

            {qIdx > 0 && (
              <button
                data-testid="button-prev-q"
                onClick={() => { setQIdx(qIdx - 1); setSelectedOption(null); }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ChevronLeft size={12} /> Back
              </button>
            )}
          </motion.div>
        )}

        {/* RESULT */}
        {step === "result" && result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col px-5 py-4 gap-5"
          >
            {/* Archetype header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-card/60 to-primary/10 border border-primary/30 rounded-3xl p-6 text-center backdrop-blur-sm shadow-[0_0_40px_hsl(var(--primary)/0.1)]"
            >
              <div className="text-5xl mb-3">{result.emoji}</div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/20 rounded-full text-xs font-bold text-primary uppercase tracking-wider mb-3">
                Your dynamic
              </div>
              <h2 className="text-2xl font-black mb-2">{result.name}</h2>
              <p className="text-sm text-primary/90 italic font-medium">"{result.tagline}"</p>
            </motion.div>

            {/* What happened */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">What happened</h3>
              <p className="text-sm text-foreground/85 leading-relaxed">{result.description}</p>
            </motion.div>

            {/* The real insight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/5 border border-primary/20 rounded-2xl p-5"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">The insight</h3>
              <p className="text-sm text-foreground/85 leading-relaxed">{result.insight}</p>
            </motion.div>

            {/* Healing tips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Your healing steps</h3>
              <div className="space-y-2.5">
                {result.healingTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground/80 leading-snug">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Retake */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              data-testid="button-retake-analysis"
              onClick={restart}
              className="flex items-center gap-2 mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              <RotateCcw size={12} /> Retake analysis
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ExAnalysis() {
  return (
    <ProGate
      feature="Ex Analysis"
      description="Answer 8 questions about your relationship and get a deep psychological insight into the dynamic you were in."
    >
      <ExAnalysisContent />
    </ProGate>
  );
}
