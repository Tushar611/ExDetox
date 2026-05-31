import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { QUIZ_QUESTIONS } from "@/lib/data";

export default function Quiz() {
  const [lastResult, setLastResult] = useLocalStorage<string | null>("exdetox_quiz_result", null);
  
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (points: number) => {
    setScore(score + points);
    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const finalScore = score + points;
      let resultText = "";
      if (finalScore <= 5) resultText = "Stable Human — You're actually doing this. Proud of you.";
      else if (finalScore <= 10) resultText = "Slightly Cooked — Healing with a side of chaos. Keep going.";
      else if (finalScore <= 15) resultText = "Delusional Era — Babe. Put the phone down.";
      else resultText = "Final Boss of Overthinking — We need to talk.";
      
      setLastResult(resultText);
      setShowResult(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
  };

  if (showResult || lastResult && currentQ === 0 && !showResult && score === 0) {
    return (
      <div className="flex-1 flex flex-col p-6 items-center justify-center text-center space-y-8 pb-32">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6 max-w-sm"
        >
          <div className="w-24 h-24 rounded-full bg-accent/20 mx-auto flex items-center justify-center text-4xl shadow-[0_0_30px_hsl(var(--accent)/0.3)]">
            🧠
          </div>
          <h2 className="text-3xl font-bold">Quiz Result</h2>
          <p className="text-xl font-medium text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
            {lastResult}
          </p>
          <Button 
            onClick={restart}
            variant="outline"
            className="mt-8 rounded-full border-primary text-primary hover:bg-primary/10 w-full"
          >
            Try again
          </Button>
        </motion.div>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQ];

  return (
    <div className="flex-1 flex flex-col p-6 pb-32 max-w-md mx-auto w-full">
      <div className="pt-8 mb-12">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">
            Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
          </span>
        </div>
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: `${(currentQ / QUIZ_QUESTIONS.length) * 100}%` }}
            animate={{ width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-8 leading-tight">
            {q.question}
          </h2>
          
          <div className="space-y-3 mt-auto mb-8">
            {q.options.map((opt, i) => (
              <Button
                key={i}
                onClick={() => handleAnswer(opt.points)}
                variant="outline"
                className="w-full h-auto py-4 px-6 justify-start text-left whitespace-normal border-border/50 bg-card/40 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-all rounded-2xl"
              >
                {opt.text}
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
