import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { differenceInDays, differenceInHours } from "date-fns";

export function StreakCounter({ ncDate }: { ncDate: string }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const start = new Date(ncDate);
    const now = new Date();
    setDays(Math.max(0, differenceInDays(now, start)));
    setHours(Math.max(0, differenceInHours(now, start) % 24));
  }, [ncDate]);

  const milestones = [7, 14, 30, 60, 90];
  const hitMilestone = milestones.includes(days);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-8 relative"
    >
      {hitMilestone && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-4 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_hsl(var(--accent))]"
        >
          {days} Day Milestone! 🎉
        </motion.div>
      )}
      
      <div className="flex items-baseline gap-2">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-primary drop-shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
        >
          {days}
        </motion.span>
        <span className="text-xl text-muted-foreground font-mono font-bold">d</span>
        
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold ml-4 text-foreground/80"
        >
          {hours}
        </motion.span>
        <span className="text-lg text-muted-foreground font-mono font-bold">h</span>
      </div>
      <p className="text-sm font-medium uppercase tracking-widest text-primary mt-2">
        Since Detox Started
      </p>
    </motion.div>
  );
}
