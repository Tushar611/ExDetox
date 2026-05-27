import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QUOTES } from "@/lib/data";

export function RotatingQuote() {
  const [index, setIndex] = useState(() => {
    const seed = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % QUOTES.length;
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const DURATION = 15000;
    const TICK = 100;
    let elapsed = 0;

    const ticker = setInterval(() => {
      elapsed += TICK;
      setProgress((elapsed / DURATION) * 100);
      if (elapsed >= DURATION) {
        elapsed = 0;
        setProgress(0);
        setIndex(prev => (prev + 1) % QUOTES.length);
      }
    }, TICK);

    return () => clearInterval(ticker);
  }, [index]);

  const goNext = () => setIndex(prev => (prev + 1) % QUOTES.length);
  const goPrev = () => setIndex(prev => (prev - 1 + QUOTES.length) % QUOTES.length);

  return (
    <div className="py-6 px-4 border-y border-border/40 text-center relative select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      {/* Quote text */}
      <div className="min-h-[72px] flex items-center justify-center overflow-hidden px-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="text-base font-serif italic text-foreground/90 leading-relaxed"
            data-testid="text-rotating-quote"
          >
            "{QUOTES[index]}"
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-4 w-full max-w-[120px] mx-auto h-[2px] bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Prev / Next controls */}
      <div className="flex items-center justify-center gap-4 mt-3">
        <button
          data-testid="button-prev-quote"
          onClick={goPrev}
          className="text-muted-foreground/40 hover:text-primary transition-colors text-xs"
          aria-label="Previous quote"
        >
          ←
        </button>
        <span className="text-[10px] text-muted-foreground/30 font-mono">
          {index + 1} / {QUOTES.length}
        </span>
        <button
          data-testid="button-next-quote"
          onClick={goNext}
          className="text-muted-foreground/40 hover:text-primary transition-colors text-xs"
          aria-label="Next quote"
        >
          →
        </button>
      </div>
    </div>
  );
}
