import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { Flame, Clock, Star } from "lucide-react";

const LEVELS = [
  {
    name: "Broken",
    startDay: 0,
    endDay: 6,
    dot: "bg-red-500",
    glow: "shadow-[0_0_8px_#ef4444]",
    desc: "The hurt is fresh. One day at a time.",
    nextLabel: "Recovering",
  },
  {
    name: "Recovering",
    startDay: 7,
    endDay: 13,
    dot: "bg-orange-400",
    glow: "shadow-[0_0_8px_#fb923c]",
    desc: "Starting to breathe again.",
    nextLabel: "Detaching",
  },
  {
    name: "Detaching",
    startDay: 14,
    endDay: 29,
    dot: "bg-yellow-400",
    glow: "shadow-[0_0_8px_#facc15]",
    desc: "Distance is becoming real.",
    nextLabel: "Detached",
  },
  {
    name: "Detached",
    startDay: 30,
    endDay: 59,
    dot: "bg-green-400",
    glow: "shadow-[0_0_8px_#4ade80]",
    desc: "The grip is loosening. You're gaining distance.",
    nextLabel: "Reborn",
  },
  {
    name: "Reborn",
    startDay: 60,
    endDay: 89,
    dot: "bg-teal-400",
    glow: "shadow-[0_0_8px_#2dd4bf]",
    desc: "You're becoming a different person.",
    nextLabel: "Unreachable",
  },
  {
    name: "Unreachable",
    startDay: 90,
    endDay: Infinity,
    dot: "bg-primary",
    glow: "shadow-[0_0_8px_hsl(var(--primary))]",
    desc: "Fully free. They can't touch your peace.",
    nextLabel: null,
  },
];

function getLevelForDays(days: number) {
  return LEVELS.find(l => days >= l.startDay && days <= l.endDay) ?? LEVELS[LEVELS.length - 1];
}

export function StreakCounter({ ncDate }: { ncDate: string }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const update = () => {
      const start = new Date(ncDate);
      const now = new Date();
      const d = Math.max(0, differenceInDays(now, start));
      const h = Math.max(0, differenceInHours(now, start) % 24);
      const m = Math.max(0, differenceInMinutes(now, start) % 60);
      setDays(d);
      setHours(h);
      setMinutes(m);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [ncDate]);

  const level = getLevelForDays(days);
  const levelIdx = LEVELS.indexOf(level);

  const progress = level.endDay === Infinity
    ? 100
    : Math.min(100, Math.max(0, ((days - level.startDay) / (level.endDay - level.startDay + 1)) * 100));

  const daysToNext = level.endDay === Infinity ? 0 : level.endDay - days + 1;

  const milestones = [7, 14, 30, 60, 90];
  const hitMilestone = milestones.includes(days);

  return (
    <div className="flex flex-col gap-3">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full bg-card/50 border border-border/60 rounded-3xl p-6 backdrop-blur-sm overflow-hidden"
      >
        {/* background glow */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-primary blur-3xl" />
        </div>

        {/* Milestone banner */}
        {hitMilestone && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 right-3 bg-accent text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_12px_hsl(var(--accent))]"
          >
            {days}d Milestone 🎉
          </motion.div>
        )}

        {/* Header label */}
        <div className="flex items-center gap-2 mb-5">
          <Flame size={14} className="text-primary" />
          <span className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
            No Contact Streak
          </span>
        </div>

        {/* Big number */}
        <div className="flex items-baseline gap-3 mb-1">
          <motion.span
            key={days}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[80px] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-primary drop-shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
          >
            {days}
          </motion.span>
          <span className="text-2xl font-semibold text-muted-foreground mb-2">days</span>
        </div>

        {/* Hours + Minutes */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-5">
          <Clock size={13} />
          <span className="text-sm font-mono font-medium">{hours}h {minutes}m</span>
        </div>

        {/* Level pill */}
        <div className="flex items-center gap-2 mb-2">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border/80 text-sm font-bold backdrop-blur-sm`}>
            <Star size={12} className="text-primary fill-primary" />
            <span>{level.name}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          {level.desc}
        </p>

        {/* Progress bar row */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground/70">
            <span className="font-medium">{level.name}</span>
            {level.nextLabel && (
              <span className="font-medium">→ {level.nextLabel} in {daysToNext}d</span>
            )}
            {!level.nextLabel && (
              <span className="font-medium text-primary">Max level reached ✦</span>
            )}
          </div>
          <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </div>
      </motion.div>

      {/* Level chips row */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {LEVELS.map((lvl, idx) => {
          const isActive = idx === levelIdx;
          const isPast = idx < levelIdx;
          return (
            <motion.div
              key={lvl.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.06 }}
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3.5 py-2.5 rounded-2xl border transition-all ${
                isActive
                  ? "bg-card border-primary/50 shadow-[0_0_16px_hsl(var(--primary)/0.2)]"
                  : isPast
                  ? "bg-card/30 border-border/30"
                  : "bg-card/20 border-border/20"
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${lvl.dot} ${isActive ? lvl.glow : ""} ${isPast ? "opacity-60" : ""}`} />
              <span className={`text-[11px] font-bold whitespace-nowrap ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                {lvl.name}
              </span>
              <span className={`text-[10px] font-mono ${isActive ? "text-primary" : "text-muted-foreground/40"}`}>
                {lvl.startDay}d
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
