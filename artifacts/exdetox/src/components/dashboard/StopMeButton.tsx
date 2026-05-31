import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { STOP_ME_QUOTES, STOP_ME_DISTRACTIONS } from "@/lib/data";

export function StopMeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [quote, setQuote] = useState("");
  const [distraction, setDistraction] = useState("");

  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
    return;
  }, [isOpen, timeLeft]);

  const handleOpen = () => {
    setQuote(STOP_ME_QUOTES[Math.floor(Math.random() * STOP_ME_QUOTES.length)]);
    setDistraction(STOP_ME_DISTRACTIONS[Math.floor(Math.random() * STOP_ME_DISTRACTIONS.length)]);
    setTimeLeft(300);
    setIsOpen(true);
  };

  return (
    <>
      <Button 
        onClick={handleOpen}
        className="w-full h-16 text-xl font-black tracking-widest uppercase bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-[0_0_25px_hsl(var(--destructive)/0.5)] rounded-2xl animate-pulse"
        style={{ animationDuration: '2s' }}
      >
        STOP ME
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            {/* Breathing circle */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-[80vw] h-[80vw] max-w-[400px] max-h-[400px] rounded-full bg-destructive/20 blur-3xl pointer-events-none"
            />

            <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center gap-8">
              <h2 className="text-3xl font-bold text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                {quote}
              </h2>
              
              <div className="bg-destructive/10 border border-destructive/30 p-6 rounded-2xl w-full">
                <p className="text-sm font-semibold uppercase text-destructive tracking-widest mb-2">
                  Do this right now:
                </p>
                <p className="text-xl font-bold text-foreground">
                  {distraction}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  Wait before doing anything stupid
                </p>
                <div className="text-6xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-b from-destructive to-destructive/50 drop-shadow-[0_0_15px_hsl(var(--destructive)/0.5)]">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <Button 
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="mt-8 h-14 w-full rounded-full border-border bg-transparent text-foreground hover:bg-white/5"
              >
                I'm okay now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
