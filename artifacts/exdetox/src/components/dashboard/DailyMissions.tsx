import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { format } from "date-fns";
import { getDailyMissions, MISSIONS } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Crown, Lock, CheckCircle2, Zap } from "lucide-react";

// Mini celebration component
function MissionCompletionCelebration() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 1, 
            x: 0, 
            y: 0,
            scale: 1
          }}
          animate={{ 
            opacity: 0, 
            x: (Math.random() - 0.5) * 100,
            y: -100,
            scale: 0
          }}
          transition={{ 
            duration: 0.8, 
            delay: Math.random() * 0.2
          }}
          className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            background: ['#a78bfa', '#f472b6', '#4ade80'][i % 3],
            transform: `translate(-50%, -50%)`
          }}
        />
      ))}
    </div>
  );
}

export function DailyMissions() {
  const [missionsMap, setMissionsMap] = useLocalStorage<Record<string, string[]>>("exdetox_missions", {});
  const { isPro } = useProStatus();
  const today = format(new Date(), "yyyy-MM-dd");
  const [justCompleted, setJustCompleted] = useLocalStorage<string>("exdetox_mission_just_completed", "");

  const todaysMissions = isPro ? getDailyMissions(today, 5) : getDailyMissions(today, 3);
  const completed = missionsMap[today] || [];
  const completionPercentage = Math.round((completed.length / todaysMissions.length) * 100);
  const allCompleted = completed.length === todaysMissions.length && todaysMissions.length > 0;

  const toggleMission = (mission: string) => {
    let newCompleted = [...completed];
    const isCompleting = !newCompleted.includes(mission);
    
    if (isCompleting) {
      newCompleted.push(mission);
      setJustCompleted(mission);
      setTimeout(() => setJustCompleted(""), 1500);
    } else {
      newCompleted = newCompleted.filter(m => m !== mission);
    }
    setMissionsMap({ ...missionsMap, [today]: newCompleted });
  };

  return (
    <div className="w-full bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      {/* Header with progress */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Daily Missions
        </h3>
        <motion.span 
          animate={allCompleted ? { scale: [1, 1.1, 1] } : {}}
          className="text-xs font-mono font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-md"
        >
          {completed.length}/{todaysMissions.length}
        </motion.span>
      </div>

      {/* Progress bar */}
      <motion.div 
        className="mb-4 h-1 w-full bg-muted/30 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
        />
      </motion.div>

      {/* All completed banner */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
              <Zap size={16} className="text-primary" />
            </motion.div>
            <p className="text-sm font-bold text-primary">Perfect day! All missions completed 🔥</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Missions list */}
      <div className="space-y-3">
        {todaysMissions.map((mission, idx) => {
          const isDone = completed.includes(mission);
          const isJustCompleted = justCompleted === mission;
          
          return (
            <motion.div
              key={mission}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="relative"
            >
              {isJustCompleted && <MissionCompletionCelebration />}
              
              <motion.button
                onClick={() => toggleMission(mission)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${
                  isDone
                    ? 'bg-primary/10 border-primary/30 hover:border-primary/50'
                    : 'bg-background/50 border-border/30 hover:bg-background/70 hover:border-border/50'
                }`}
              >
                {/* Custom checkbox with animation */}
                <motion.div
                  animate={isDone ? { scale: [0, 1.2, 1] } : { scale: 1 }}
                  className="mt-0.5 flex-shrink-0"
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-primary border-primary'
                      : 'border-muted-foreground/40 hover:border-primary/60'
                  }`}>
                    {isDone && (
                      <motion.svg
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                </motion.div>

                {/* Mission text */}
                <div className="flex-1 min-w-0">
                  <motion.p
                    animate={isDone ? { opacity: 0.6 } : { opacity: 1 }}
                    className={`text-sm font-medium leading-tight transition-all ${
                      isDone
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground'
                    }`}
                  >
                    {mission}
                  </motion.p>
                </div>

                {/* Completion badge */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <CheckCircle2 size={16} className="text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
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
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.4)' }}
            className="mt-4 flex items-center gap-3 p-3 rounded-xl border border-primary/20 bg-primary/5 cursor-pointer hover:bg-primary/10 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Lock size={12} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-primary">+{MISSIONS.length - 3} more missions with Pro</p>
              <p className="text-[10px] text-muted-foreground">Full library unlocked. ₹99/month.</p>
            </div>
            <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <Crown size={14} className="text-primary" />
            </motion.div>
          </motion.div>
        </Link>
      )}
    </div>
  );
}
