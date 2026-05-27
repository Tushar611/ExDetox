import { useLocalStorage } from "@/hooks/use-local-storage";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MOODS = [
  { value: "sad", emoji: "🥺", label: "Sad" },
  { value: "angry", emoji: "😡", label: "Angry" },
  { value: "empty", emoji: "🫥", label: "Empty" },
  { value: "healing", emoji: "🩹", label: "Healing" },
  { value: "peaceful", emoji: "✨", label: "Peaceful" }
];

export function MoodTracker() {
  const [moods, setMoods] = useLocalStorage<Record<string, string>>("exdetox_moods", {});
  const today = format(new Date(), "yyyy-MM-dd");
  
  const handleSelect = (val: string) => {
    setMoods({ ...moods, [today]: val });
  };

  const todayMood = moods[today];

  // Get last 7 days history
  const history = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = format(d, "yyyy-MM-dd");
    return { date: dateStr, mood: moods[dateStr] };
  }).reverse();

  return (
    <div className="w-full bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
        Today's Vibe
      </h3>
      
      <div className="flex justify-between items-center gap-2 mb-6">
        {MOODS.map(m => (
          <button
            key={m.value}
            onClick={() => handleSelect(m.value)}
            className={cn(
              "flex flex-col items-center gap-2 transition-all p-2 rounded-xl",
              todayMood === m.value 
                ? "bg-primary/20 scale-110 shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
                : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 hover:bg-muted/30"
            )}
          >
            <span className="text-3xl">{m.emoji}</span>
            <span className={cn(
              "text-[10px] font-bold tracking-wide uppercase",
              todayMood === m.value ? "text-primary" : "text-muted-foreground"
            )}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <div className="border-t border-border/50 pt-4">
        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 text-center">Last 7 Days</p>
        <div className="flex justify-center gap-1.5">
          {history.map((h, i) => {
            const moodObj = MOODS.find(m => m.value === h.mood);
            return (
              <div 
                key={h.date}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                  moodObj ? "bg-card border border-border" : "bg-muted/20 border border-dashed border-border/30"
                )}
                title={h.date}
              >
                {moodObj ? moodObj.emoji : ""}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
