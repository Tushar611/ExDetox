import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { Clock } from "lucide-react";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { DailyMissions } from "@/components/dashboard/DailyMissions";
import { StopMeButton } from "@/components/dashboard/StopMeButton";
import { RelapseButton } from "@/components/dashboard/RelapseButton";
import { HealingPlaylist } from "@/components/dashboard/HealingPlaylist";
import { CustomPledge } from "@/components/dashboard/CustomPledge";
import { SituationshipCard } from "@/components/dashboard/SituationshipCard";
import { RotatingQuote } from "@/components/dashboard/RotatingQuote";
import { ProFeaturesRow } from "@/components/dashboard/ProFeaturesRow";
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const [ncDate] = useLocalStorage<string>("exdetox_nc_date", new Date().toISOString());
  const { isPro, trialActive, trialDaysLeft } = useProStatus();

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

      {/* Trial banner */}
      {trialActive && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/10 border border-primary/25 text-xs font-semibold"
        >
          <Clock size={13} className="text-primary flex-shrink-0" />
          <span className="text-primary">Pro Trial active — <span className="font-black">{trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left</span></span>
          <Link href="/upgrade" className="ml-auto text-primary/70 hover:text-primary underline transition-colors">Upgrade</Link>
        </motion.div>
      )}

      {/* Streak */}
      <StreakCounter ncDate={ncDate} />

      {/* Rotating Quote */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <RotatingQuote />
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

      {/* Healing Tools (Pro) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
        <ProFeaturesRow />
      </motion.div>

      {/* Situationship Mode */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
        <SituationshipCard />
      </motion.div>

      {/* Healing Playlist (Pro) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
        <HealingPlaylist />
      </motion.div>

      {/* Share Progress Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}>
        <Link href="/healing-card">
          <motion.div
            whileTap={{ scale: 0.98 }}
            data-testid="card-healing-card-link"
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 cursor-pointer hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Share Your Progress</p>
              <p className="text-xs text-muted-foreground">Create a card for Instagram Stories</p>
            </div>
            <span className="text-primary text-lg">→</span>
          </motion.div>
        </Link>
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
