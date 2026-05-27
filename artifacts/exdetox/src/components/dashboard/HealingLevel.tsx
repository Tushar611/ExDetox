import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const LEVELS = [
  { max: 6, name: "Broken" },
  { max: 13, name: "Recovering" },
  { max: 29, name: "Detaching" },
  { max: 59, name: "Detached" },
  { max: 89, name: "Reborn" },
  { max: Infinity, name: "Unreachable" }
];

export function HealingLevel({ days }: { days: number }) {
  const currentLevelIndex = LEVELS.findIndex(l => days <= l.max);
  const currentLevel = LEVELS[currentLevelIndex] || LEVELS[LEVELS.length - 1];
  
  const prevMax = currentLevelIndex > 0 ? LEVELS[currentLevelIndex - 1].max : -1;
  const daysInLevel = days - prevMax;
  const levelDuration = currentLevel.max - prevMax;
  
  const progress = currentLevel.max === Infinity ? 100 : Math.min(100, Math.max(0, (daysInLevel / levelDuration) * 100));

  return (
    <div className="w-full bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex justify-between items-end mb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Status</p>
          <h3 className="text-2xl font-bold text-foreground drop-shadow-[0_0_10px_hsl(var(--primary)/0.2)]">
            {currentLevel.name}
          </h3>
        </div>
        {currentLevel.max !== Infinity && (
          <p className="text-sm font-mono text-primary font-bold">
            {currentLevel.max - days + 1} days to next
          </p>
        )}
      </div>
      
      <div className="relative pt-1">
        <Progress value={progress} className="h-2 bg-muted/50" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-primary/20 blur-sm pointer-events-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
