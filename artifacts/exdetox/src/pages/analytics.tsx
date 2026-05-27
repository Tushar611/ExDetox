import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { differenceInDays, format, subDays, parseISO } from "date-fns";
import { BarChart2, Flame, TrendingUp, Calendar } from "lucide-react";

const MOOD_META: Record<string, { emoji: string; color: string; value: number }> = {
  peaceful: { emoji: "😌", color: "hsl(var(--primary))", value: 5 },
  healing:  { emoji: "💜", color: "hsl(270 70% 75%)",   value: 4 },
  empty:    { emoji: "😶", color: "hsl(270 20% 50%)",   value: 3 },
  sad:      { emoji: "😢", color: "hsl(220 80% 60%)",   value: 2 },
  angry:    { emoji: "😤", color: "hsl(0 72% 55%)",     value: 1 },
};

function MoodBar({ value, max, label, emoji, color }: { value: number; max: number; label: string; emoji: string; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-base w-6">{emoji}</span>
      <div className="flex-1">
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
      </div>
      <span className="text-xs font-mono text-muted-foreground w-8 text-right">{value}x</span>
      <span className="text-xs text-muted-foreground w-14">{label}</span>
    </div>
  );
}

function AnalyticsContent() {
  const [moods] = useLocalStorage<Record<string, string>>("exdetox_moods", {});
  const [ncDate] = useLocalStorage<string>("exdetox_nc_date", new Date().toISOString());

  const streakDays = Math.max(0, differenceInDays(new Date(), new Date(ncDate)));

  const last7 = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = format(subDays(new Date(), 6 - i), "yyyy-MM-dd");
      return { date: d, mood: moods[d] || null };
    });
  }, [moods]);

  const moodCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    Object.values(moods).forEach(m => {
      counts[m] = (counts[m] || 0) + 1;
    });
    return counts;
  }, [moods]);

  const totalMoods = Object.values(moodCounts).reduce((a, b) => a + b, 0);

  const avgScore = useMemo(() => {
    if (totalMoods === 0) return 0;
    const sum = Object.entries(moodCounts).reduce((acc, [mood, count]) => {
      return acc + (MOOD_META[mood]?.value ?? 3) * count;
    }, 0);
    return (sum / totalMoods).toFixed(1);
  }, [moodCounts, totalMoods]);

  const topMood = useMemo(() => {
    const sorted = Object.entries(moodCounts).sort((a, b) => b[1] - a[1]);
    return sorted[0]?.[0] || null;
  }, [moodCounts]);

  const maxCount = Math.max(...Object.values(moodCounts), 1);

  return (
    <div className="flex-1 flex flex-col p-5 pb-24 gap-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 size={20} className="text-primary" />
          <h1 className="text-2xl font-bold">Healing Analytics</h1>
        </div>
        <p className="text-sm text-muted-foreground">See how far you've actually come.</p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 gap-3"
      >
        <div className="bg-card/40 border border-border/50 rounded-2xl p-4 backdrop-blur-sm">
          <Flame size={18} className="text-primary mb-2" />
          <p className="text-3xl font-bold">{streakDays}</p>
          <p className="text-xs text-muted-foreground mt-1">Days strong</p>
        </div>
        <div className="bg-card/40 border border-border/50 rounded-2xl p-4 backdrop-blur-sm">
          <TrendingUp size={18} className="text-primary mb-2" />
          <p className="text-3xl font-bold">{avgScore}</p>
          <p className="text-xs text-muted-foreground mt-1">Mood avg /5</p>
        </div>
        <div className="bg-card/40 border border-border/50 rounded-2xl p-4 backdrop-blur-sm">
          <Calendar size={18} className="text-primary mb-2" />
          <p className="text-3xl font-bold">{totalMoods}</p>
          <p className="text-xs text-muted-foreground mt-1">Moods logged</p>
        </div>
        <div className="bg-card/40 border border-border/50 rounded-2xl p-4 backdrop-blur-sm">
          <span className="text-2xl mb-1 block">{topMood ? MOOD_META[topMood]?.emoji : "—"}</span>
          <p className="text-sm font-bold capitalize">{topMood || "None yet"}</p>
          <p className="text-xs text-muted-foreground mt-1">Most frequent</p>
        </div>
      </motion.div>

      {/* 7-day timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm"
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Last 7 days</h3>
        <div className="flex justify-between items-end gap-1">
          {last7.map(({ date, mood }, idx) => {
            const meta = mood ? MOOD_META[mood] : null;
            const val = meta ? meta.value : 0;
            const dayLabel = format(parseISO(date), "EEE");
            return (
              <div key={date} className="flex flex-col items-center gap-1 flex-1">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(val * 8, 4)}px` }}
                  transition={{ delay: idx * 0.07, duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-t-lg min-h-[4px] max-w-[28px] mx-auto"
                  style={{ background: meta ? meta.color : "hsl(var(--muted)/0.3)" }}
                />
                <span className="text-[10px] text-muted-foreground">{dayLabel}</span>
                {mood && <span className="text-xs">{meta?.emoji}</span>}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Mood breakdown */}
      {totalMoods > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm"
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">All-time breakdown</h3>
          <div className="space-y-3">
            {Object.entries(MOOD_META).map(([mood, { emoji, color }]) => (
              <MoodBar
                key={mood}
                value={moodCounts[mood] || 0}
                max={maxCount}
                label={mood}
                emoji={emoji}
                color={color}
              />
            ))}
          </div>
        </motion.div>
      )}

      {totalMoods === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <BarChart2 size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No mood data yet.</p>
          <p className="text-xs mt-1">Log your first mood on the dashboard.</p>
        </div>
      )}
    </div>
  );
}

export default function Analytics() {
  return (
    <ProGate
      feature="Healing Analytics"
      description="Track your mood trends, streak history, and emotional progress with beautiful charts."
    >
      <AnalyticsContent />
    </ProGate>
  );
}
