import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { format } from "date-fns";
import { getDailyMissions, MISSIONS } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Crown, Lock } from "lucide-react";

export function DailyMissions() {
  const [missionsMap, setMissionsMap] = useLocalStorage<Record<string, string[]>>("exdetox_missions", {});
  const { isPro } = useProStatus();
  const today = format(new Date(), "yyyy-MM-dd");

  const todaysMissions = isPro ? getDailyMissions(today, 5) : getDailyMissions(today, 3);
  const completed = missionsMap[today] || [];

  const toggleMission = (mission: string) => {
    let newCompleted = [...completed];
    if (newCompleted.includes(mission)) {
      newCompleted = newCompleted.filter(m => m !== mission);
    } else {
      newCompleted.push(mission);
    }
    setMissionsMap({ ...missionsMap, [today]: newCompleted });
  };

  return (
    <div className="w-full bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Daily Missions
        </h3>
        <span className="text-xs font-mono font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">
          {completed.length}/{todaysMissions.length}
        </span>
      </div>

      <div className="space-y-3">
        {todaysMissions.map((mission, idx) => {
          const isDone = completed.includes(mission);
          return (
            <motion.div
              key={mission}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/30"
            >
              <Checkbox
                id={`mission-${idx}`}
                checked={isDone}
                onCheckedChange={() => toggleMission(mission)}
                className="mt-0.5 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <label
                htmlFor={`mission-${idx}`}
                className={`text-sm font-medium leading-tight cursor-pointer transition-all ${isDone ? "text-muted-foreground line-through" : "text-foreground"}`}
              >
                {mission}
              </label>
            </motion.div>
          );
        })}
      </div>

      {/* Pro upsell for extra missions */}
      {!isPro && (
        <Link href="/upgrade">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5 cursor-pointer hover:border-primary/40 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Lock size={12} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary">+{MISSIONS.length - 3} more missions with Pro</p>
              <p className="text-[10px] text-muted-foreground">Full library unlocked. ₹99/month.</p>
            </div>
            <Crown size={14} className="text-primary" />
          </motion.div>
        </Link>
      )}
    </div>
  );
}
