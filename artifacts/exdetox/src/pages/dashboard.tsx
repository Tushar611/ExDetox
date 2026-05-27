import { useLocalStorage } from "@/hooks/use-local-storage";
import { format, differenceInDays } from "date-fns";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { HealingLevel } from "@/components/dashboard/HealingLevel";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { DailyMissions } from "@/components/dashboard/DailyMissions";
import { StopMeButton } from "@/components/dashboard/StopMeButton";
import { RelapseButton } from "@/components/dashboard/RelapseButton";
import { getDailyQuote } from "@/lib/data";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [ncDate] = useLocalStorage<string>("exdetox_nc_date", new Date().toISOString());
  
  const today = format(new Date(), "yyyy-MM-dd");
  const dailyQuote = getDailyQuote(today);
  const days = Math.max(0, differenceInDays(new Date(), new Date(ncDate)));

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto overflow-x-hidden space-y-8 scroll-smooth pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-4"
      >
        <h1 className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          ExDetox
        </h1>
      </motion.div>

      {/* Streak */}
      <StreakCounter ncDate={ncDate} />

      {/* Level */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <HealingLevel days={days} />
      </motion.div>

      {/* Quote */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2 }}
        className="py-6 px-4 border-y border-border/40 text-center relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        <p className="text-lg font-serif italic text-foreground/90 leading-relaxed">
          "{dailyQuote}"
        </p>
      </motion.div>

      {/* Mood */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <MoodTracker />
      </motion.div>

      {/* Missions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <DailyMissions />
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5 }}
        className="pt-4 space-y-4"
      >
        <StopMeButton />
        <RelapseButton />
      </motion.div>
    </div>
  );
}
