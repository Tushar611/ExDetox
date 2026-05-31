import { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { format, differenceInDays, parseISO } from "date-fns";
import {
  getSituLevel,
  getDailySituMissions,
  getDailySituQuote,
  getSituCheckinResult,
  SITU_CHECKIN_QUESTIONS,
  SITU_CLARITY_LEVELS,
} from "@/lib/situationship-data";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Flame, Flag, Pencil, RotateCcw, X, AlertTriangle } from "lucide-react";
import { useLocation } from "wouter";

/* ── Red Flag Collector ──────────────────────────────────── */
function RedFlagCollector() {
  const [flags, setFlags] = useLocalStorage<string[]>("exdetox_situ_flags", []);
  const [draft, setDraft] = useState("");

  const add = () => {
    const t = draft.trim();
    if (!t) return;
    setFlags([...flags, t]);
    setDraft("");
  };

  return (
    <div className="bg-card/40 border border-red-900/30 rounded-2xl p-5 backdrop-blur-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-red-400/70 flex items-center gap-2 mb-4">
        <Flag size={13} /> Red Flag Log
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Write them down. Every time you want to go back, re-read this list.
      </p>

      <div className="flex gap-2 mb-4">
        <input
          data-testid="input-red-flag"
          type="text"
          placeholder="e.g. Never introduced me to friends"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === "Enter" && add()}
          className="flex-1 bg-background/50 border border-border/50 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-red-500/50 transition-colors placeholder:text-muted-foreground/40"
        />
        <button
          data-testid="button-add-flag"
          onClick={add}
          disabled={!draft.trim()}
          className="px-4 py-2 rounded-xl bg-red-900/40 border border-red-800/40 text-red-400 text-sm font-bold disabled:opacity-40 hover:bg-red-900/60 transition-all"
        >
          Add
        </button>
      </div>

      {flags.length > 0 ? (
        <div className="space-y-2">
          {flags.map((flag, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-red-950/20 border border-red-900/20"
            >
              <span className="text-red-400 mt-0.5 flex-shrink-0">🚩</span>
              <span className="text-sm text-foreground/80 flex-1">{flag}</span>
              <button
                data-testid={`button-remove-flag-${idx}`}
                onClick={() => setFlags(flags.filter((_, i) => i !== idx))}
                className="text-muted-foreground/30 hover:text-muted-foreground transition-colors flex-shrink-0"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
          <p className="text-xs text-red-400/50 text-center pt-1">
            {flags.length} flag{flags.length !== 1 ? "s" : ""} logged. Evidence doesn't lie.
          </p>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground/40 text-center py-3 italic">
          Start logging. It'll help more than you think.
        </p>
      )}
    </div>
  );
}

/* ── Clarity Check-In ────────────────────────────────────── */
function ClarityCheckin() {
  const [step, setStep] = useState<"idle" | "quiz" | "result">("idle");
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);

  const reset = () => { setStep("idle"); setQIdx(0); setScore(0); };
  const choose = (pts: number) => {
    const next = score + pts;
    if (qIdx < SITU_CHECKIN_QUESTIONS.length - 1) {
      setScore(next);
      setQIdx(qIdx + 1);
    } else {
      setScore(next);
      setStep("result");
    }
  };

  const result = getSituCheckinResult(score);

  return (
    <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
        <AlertTriangle size={13} /> Clarity Check-In
      </h3>

      <AnimatePresence mode="wait">
        {step === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-2">
            <p className="text-sm text-muted-foreground mb-4">
              5 quick questions. How stuck are you really?
            </p>
            <button
              data-testid="button-start-checkin"
              onClick={() => setStep("quiz")}
              className="px-5 py-2.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-sm font-bold hover:bg-primary/30 transition-all"
            >
              Start Check-In
            </button>
          </motion.div>
        )}

        {step === "quiz" && (
          <motion.div
            key={`q-${qIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {SITU_CHECKIN_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${i <= qIdx ? "bg-primary w-6" : "bg-muted/40 w-3"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">{qIdx + 1}/{SITU_CHECKIN_QUESTIONS.length}</span>
            </div>

            <p className="text-sm font-semibold mb-4 leading-snug">
              {SITU_CHECKIN_QUESTIONS[qIdx].question}
            </p>

            <div className="space-y-2">
              {SITU_CHECKIN_QUESTIONS[qIdx].options.map((opt, i) => (
                <button
                  key={i}
                  data-testid={`button-checkin-opt-${i}`}
                  onClick={() => choose(opt.points)}
                  className="w-full text-left p-3 rounded-xl bg-background/50 border border-border/30 text-sm hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-2"
          >
            <div className="text-4xl mb-3">
              {score <= 3 ? "😌" : score <= 7 ? "💜" : score <= 11 ? "😶" : "😵"}
            </div>
            <h4 className="text-lg font-bold mb-1">{result.label}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">{result.copy}</p>
            <button
              data-testid="button-checkin-retake"
              onClick={reset}
              className="flex items-center gap-2 mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw size={12} /> Take again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── The Letter ──────────────────────────────────────────── */
function TheUnssentLetter() {
  const [letter, setLetter] = useLocalStorage<string>("exdetox_situ_letter", "");
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Pencil size={13} /> The Letter You'll Never Send
        </h3>
        <button
          data-testid="button-edit-letter"
          onClick={() => setEditing(!editing)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {editing ? "Done" : letter ? "Edit" : "Write"}
        </button>
      </div>

      {editing ? (
        <textarea
          data-testid="textarea-unsent-letter"
          value={letter}
          onChange={e => setLetter(e.target.value)}
          placeholder={`Dear [their name],\n\nI want you to know that...`}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 outline-none resize-none min-h-[160px] leading-relaxed"
          autoFocus
        />
      ) : letter ? (
        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-4 italic">{letter}</p>
      ) : (
        <p className="text-sm text-muted-foreground/50 italic text-center py-4">
          Say everything you can't say. They'll never see it.
        </p>
      )}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────── */
function SituationshipContent() {
  const [, setLocation] = useLocation();
  const [situDate, setSituDate] = useLocalStorage<string | null>("exdetox_situ_date", null);
  const [missions, setMissions] = useLocalStorage<Record<string, string[]>>("exdetox_situ_missions", {});
  const [showSetup, setShowSetup] = useState(!situDate);
  const [dateInput, setDateInput] = useState(format(new Date(), "yyyy-MM-dd"));
  const controls = useAnimation();

  const today = format(new Date(), "yyyy-MM-dd");
  const days = situDate ? Math.max(0, differenceInDays(new Date(), parseISO(situDate))) : 0;
  const level = getSituLevel(days);
  const quote = getDailySituQuote(today);
  const dailyMissions = getDailySituMissions(today, 4);
  const completedToday = missions[today] || [];

  const currentLevelIdx = SITU_CLARITY_LEVELS.findIndex(l => l.label === level.label);
  const nextLevel = SITU_CLARITY_LEVELS[currentLevelIdx + 1];
  const progressPct = nextLevel
    ? Math.min(100, ((days - level.minDays) / (nextLevel.minDays - level.minDays)) * 100)
    : 100;

  const handleStart = () => {
    setSituDate(dateInput);
    setShowSetup(false);
  };

  const handleReset = async () => {
    if (!confirm("Reset your situationship clarity streak?")) return;
    await controls.start({ x: [-6, 6, -6, 6, 0], transition: { duration: 0.4 } });
    setSituDate(today);
  };

  const toggleMission = (m: string) => {
    const updated = completedToday.includes(m)
      ? completedToday.filter(x => x !== m)
      : [...completedToday, m];
    setMissions({ ...missions, [today]: updated });
  };

  if (showSetup) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-5xl mb-4">🌫️</div>
          <h2 className="text-2xl font-bold mb-2">Situationship Mode</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-xs">
              Track your clarity streak from the last time you interacted, texted, or checked up on them. This is the tracker for the people who are still stuck in gray area.
          </p>

          <div className="w-full max-w-xs space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                When did you last interact with them?
              </p>
              <input
                data-testid="input-situ-date"
                type="date"
                value={dateInput}
                max={format(new Date(), "yyyy-MM-dd")}
                onChange={e => setDateInput(e.target.value)}
                className="w-full bg-card/40 border border-border/50 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
              />
            </div>
            <button
              data-testid="button-start-situ"
              onClick={handleStart}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
            >
              Start Clarity Streak
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div animate={controls} className="flex-1 flex flex-col p-5 pb-32 gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pt-6">
        <button
          data-testid="button-back"
          onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center flex-shrink-0"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">🌫️ Situationship Mode</h1>
          <p className="text-xs text-muted-foreground">Your unclear, in-between chapter.</p>
        </div>
      </div>

      {/* Clarity Streak */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card/40 border border-border/50 rounded-2xl p-6 text-center backdrop-blur-sm relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary blur-3xl" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Days of Clarity
        </p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-accent to-primary my-2"
        >
          {days}
        </motion.div>
        <p className="text-xs text-muted-foreground">
          since you last gave them access to your peace
        </p>

        {/* Level */}
        <div className="mt-5 pt-4 border-t border-border/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-primary">{level.label}</span>
            {nextLevel && (
              <span className="text-xs text-muted-foreground">{nextLevel.minDays - days}d to {nextLevel.label}</span>
            )}
          </div>
          <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">{level.desc}</p>
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="py-5 px-4 border-y border-border/30 text-center relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        <p className="text-base font-serif italic text-foreground/80 leading-relaxed">"{quote}"</p>
      </motion.div>

      {/* Clarity Check-In */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <ClarityCheckin />
      </motion.div>

      {/* Daily Clarity Missions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Clarity Missions
            </h3>
            <span className="text-xs font-mono font-bold text-primary px-2 py-1 bg-primary/10 rounded-md">
              {completedToday.length}/{dailyMissions.length}
            </span>
          </div>
          <div className="space-y-3">
            {dailyMissions.map((mission, idx) => {
              const done = completedToday.includes(mission);
              return (
                <motion.div
                  key={mission}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/30"
                >
                  <Checkbox
                    id={`sm-${idx}`}
                    checked={done}
                    onCheckedChange={() => toggleMission(mission)}
                    className="mt-0.5 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <label
                    htmlFor={`sm-${idx}`}
                    className={`text-sm font-medium leading-tight cursor-pointer transition-all ${done ? "text-muted-foreground line-through" : "text-foreground"}`}
                  >
                    {mission}
                  </label>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Red Flag Collector */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <RedFlagCollector />
      </motion.div>

      {/* Unsent Letter */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <TheUnssentLetter />
      </motion.div>

      {/* Reset */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center">
        <button
          data-testid="button-reset-situ"
          onClick={handleReset}
          className="flex items-center gap-2 mx-auto text-xs text-muted-foreground/50 hover:text-destructive transition-colors"
        >
          <RotateCcw size={12} /> Reset clarity streak
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function Situationship() {
  return (
    <ProGate
      feature="Situationship Mode"
      description="A separate tracker built for the 'we were never official' pain. Your own clarity streak, red flag log, and more."
    >
      <SituationshipContent />
    </ProGate>
  );
}
