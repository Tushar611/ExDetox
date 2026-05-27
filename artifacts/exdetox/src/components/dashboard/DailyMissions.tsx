import { useLocalStorage } from "@/hooks/use-local-storage";
import { format } from "date-fns";
import { getDailyMissions } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export function DailyMissions() {
  const [missionsMap, setMissionsMap] = useLocalStorage<Record<string, string[]>>("exdetox_missions", {});
  const today = format(new Date(), "yyyy-MM-dd");
  
  const todaysMissions = getDailyMissions(today);
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
          {completed.length}/3
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
    </div>
  );
}
