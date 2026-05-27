import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { format, differenceInDays } from "date-fns";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { HealingLevel } from "@/components/dashboard/HealingLevel";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { DailyMissions } from "@/components/dashboard/DailyMissions";
import { StopMeButton } from "@/components/dashboard/StopMeButton";
import { RelapseButton } from "@/components/dashboard/RelapseButton";
import { HealingPlaylist } from "@/components/dashboard/HealingPlaylist";
import { CustomPledge } from "@/components/dashboard/CustomPledge";
import { getDailyQuote } from "@/lib/data";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const [ncDate] = useLocalStorage<string>("exdetox_nc_date", new Date().toISOString());
  const { isPro } = useProStatus();

  const today = format(new Date(), "yyyy-MM-dd");
  const dailyQuote = getDailyQuote(today);
  const days = Math.max(0, differenceInDays(new Date(), new Date(ncDate)));

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto overflow-x-hidden space-y-8 scroll-smooth pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between pt-4"
      >
        <h1 className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          ExDetox
        </h1>
        {!isPro && (
          <Link href="/upgrade">
            <button
              data-testid="button-upgrade-banner"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
            >
              <Crown size={12} />
              Go Pro
            </button>
          </Link>
        )}
        {isPro && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
            <Crown size={12} />
            Pro
          </div>
        )}
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

      {/* Custom Pledge (Pro) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <CustomPledge />
      </motion.div>

      {/* Mood */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <MoodTracker />
      </motion.div>

      {/* Missions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <DailyMissions />
      </motion.div>

      {/* Healing Playlist (Pro) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <HealingPlaylist />
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
