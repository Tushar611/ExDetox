import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { differenceInDays, parseISO } from "date-fns";
import { ChevronRight, Crown, Lock } from "lucide-react";
import { getSituLevel } from "@/lib/situationship-data";

export function SituationshipCard() {
  const { isPro } = useProStatus();
  const [situDate] = useLocalStorage<string | null>("exdetox_situ_date", null);

  const days = situDate ? Math.max(0, differenceInDays(new Date(), parseISO(situDate))) : null;
  const level = days !== null ? getSituLevel(days) : null;

  if (!isPro) {
    return (
      <Link href="/upgrade">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          data-testid="card-situationship-locked"
          className="w-full bg-card/30 border border-dashed border-primary/20 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:border-primary/40 transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Lock size={16} className="text-primary/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground/60">Situationship Mode</p>
            <p className="text-xs text-muted-foreground/50 mt-0.5">For when it was never official</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary font-bold flex-shrink-0">
            <Crown size={11} /> Pro
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href="/situationship">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        data-testid="card-situationship"
        className="w-full bg-gradient-to-br from-card/50 to-primary/5 border border-primary/20 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:border-primary/40 hover:shadow-[0_0_20px_hsl(var(--primary)/0.1)] transition-all"
      >
        <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center flex-shrink-0 text-2xl">
          🌫️
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">Situationship Mode</p>
          {days !== null && level ? (
            <>
              <p className="text-xs text-primary font-semibold mt-0.5">{level.label} — {days}d of clarity</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{level.desc}</p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground mt-0.5">Tap to start your clarity streak</p>
          )}
        </div>
        <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
      </motion.div>
    </Link>
  );
}
