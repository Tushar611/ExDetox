import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { differenceInDays } from "date-fns";
import { toPng } from "html-to-image";
import { ChevronLeft, Download, Share2, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";

const LEVELS = [
  { name: "Broken",      startDay: 0,  color: "#ef4444", glow: "#ef444440" },
  { name: "Recovering",  startDay: 7,  color: "#fb923c", glow: "#fb923c40" },
  { name: "Detaching",   startDay: 14, color: "#facc15", glow: "#facc1540" },
  { name: "Detached",    startDay: 30, color: "#4ade80", glow: "#4ade8040" },
  { name: "Reborn",      startDay: 60, color: "#2dd4bf", glow: "#2dd4bf40" },
  { name: "Unreachable", startDay: 90, color: "#a78bfa", glow: "#a78bfa60" },
];

const LEVEL_QUOTES: Record<string, string[]> = {
  Broken: [
    "The hurt is fresh. But you're still here.",
    "Day 1 is the hardest. You did it.",
    "One day at a time. That's all.",
    "You're not weak. You're healing.",
  ],
  Recovering: [
    "Starting to breathe again.",
    "Every day without contact is a vote for yourself.",
    "You're learning what you deserve.",
    "The fog is lifting.",
  ],
  Detaching: [
    "Distance is becoming real now.",
    "You're not theirs anymore. That's power.",
    "They're becoming a memory, not a wound.",
    "You're starting to remember who you were.",
  ],
  Detached: [
    "The grip is loosening. You're free.",
    "You chose yourself 30 times.",
    "This is what healing actually looks like.",
    "You're not running from them. You're running toward yourself.",
  ],
  Reborn: [
    "You rebuilt yourself from scratch.",
    "60 days of choosing your peace.",
    "The old version of you wouldn't believe this.",
    "You are not who you were. That's everything.",
  ],
  Unreachable: [
    "They can't reach you anymore. Not even in your mind.",
    "Unreachable. Exactly where you belong.",
    "90+ days. You did the impossible.",
    "You became someone new. Someone better.",
  ],
};

function getLevel(days: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (days >= LEVELS[i].startDay) return LEVELS[i];
  }
  return LEVELS[0];
}

function getQuote(levelName: string, seed: number): string {
  const quotes = LEVEL_QUOTES[levelName] ?? LEVEL_QUOTES["Broken"];
  return quotes[seed % quotes.length];
}

const CARD_THEMES = [
  { id: "purple", bg: "#0d0b14", accent: "#8b5cf6", glow: "#8b5cf6" },
  { id: "rose",   bg: "#110a10", accent: "#f43f5e", glow: "#f43f5e" },
  { id: "teal",   bg: "#091210", accent: "#2dd4bf", glow: "#2dd4bf" },
  { id: "gold",   bg: "#120f06", accent: "#f59e0b", glow: "#f59e0b" },
];

export default function HealingCard() {
  const [, setLocation] = useLocation();
  const [ncDate] = useLocalStorage<string>("exdetox_nc_date", new Date().toISOString());
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [themeIdx, setThemeIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [shared, setShared] = useState(false);

  const days = Math.max(0, differenceInDays(new Date(), new Date(ncDate)));
  const level = getLevel(days);
  const quote = getQuote(level.name, quoteIdx);
  const theme = CARD_THEMES[themeIdx];

  const download = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: theme.bg,
      });
      const link = document.createElement("a");
      link.download = `exdetox-day-${days}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error(e);
    }
    setDownloading(false);
  };

  const share = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: theme.bg });
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `exdetox-day-${days}.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `ExDetox — Day ${days}` });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } else {
        download();
      }
    } catch {
      download();
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-10 bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pt-8">
        <button onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center">
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg">Healing Card</h1>
          <p className="text-xs text-muted-foreground">Save & share your progress.</p>
        </div>
      </div>

      <div className="flex flex-col items-center px-5 gap-6">

        {/* Card preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
          style={{ aspectRatio: "4/5" }}
        >
          {/* This div is what gets captured */}
          <div
            ref={cardRef}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: theme.bg,
              borderRadius: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "36px 32px",
              position: "relative",
              overflow: "hidden",
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
            }}
          >
            {/* Glow blobs */}
            <div style={{
              position: "absolute",
              top: "30%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${theme.glow}33 0%, transparent 70%)`,
              filter: "blur(40px)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              bottom: "10%",
              right: "10%",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: `radial-gradient(circle, ${level.glow} 0%, transparent 70%)`,
              filter: "blur(30px)",
              pointerEvents: "none",
            }} />

            {/* Top: Logo + tagline */}
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div style={{
                fontSize: "22px",
                fontWeight: "900",
                letterSpacing: "-0.5px",
                background: `linear-gradient(90deg, ${theme.accent}, #c084fc)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "4px",
              }}>ExDetox</div>
              <div style={{ fontSize: "11px", color: "#64748b", letterSpacing: "2px", textTransform: "uppercase" }}>
                No Contact Tracker
              </div>
            </div>

            {/* Center: Days + level */}
            <div style={{ textAlign: "center", zIndex: 1 }}>
              <div style={{
                fontSize: "10px",
                fontWeight: "700",
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#64748b",
                marginBottom: "8px",
              }}>
                Day
              </div>
              <div style={{
                fontSize: "96px",
                fontWeight: "900",
                lineHeight: "1",
                letterSpacing: "-4px",
                background: `linear-gradient(135deg, #ffffff 0%, ${theme.accent} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "16px",
                textShadow: "none",
              }}>
                {days}
              </div>
              {/* Level pill */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 16px",
                borderRadius: "100px",
                backgroundColor: `${level.color}18`,
                border: `1px solid ${level.color}50`,
              }}>
                <div style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: level.color,
                  boxShadow: `0 0 8px ${level.color}`,
                }} />
                <span style={{ fontSize: "13px", fontWeight: "700", color: level.color }}>
                  {level.name}
                </span>
              </div>
            </div>

            {/* Quote */}
            <div style={{
              zIndex: 1,
              textAlign: "center",
              padding: "0 8px",
            }}>
              <div style={{
                fontSize: "13px",
                fontStyle: "italic",
                color: "#94a3b8",
                lineHeight: "1.6",
                marginBottom: "20px",
              }}>
                "{quote}"
              </div>
              {/* Bottom: URL */}
              <div style={{
                fontSize: "11px",
                color: "#334155",
                letterSpacing: "1px",
                fontWeight: "600",
              }}>
                exdetox.app
              </div>
            </div>
          </div>
        </motion.div>

        {/* Controls row */}
        <div className="flex gap-3 w-full max-w-sm">
          {/* Theme switcher */}
          <div className="flex gap-2 items-center">
            {CARD_THEMES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setThemeIdx(i)}
                data-testid={`button-theme-${t.id}`}
                style={{ backgroundColor: t.accent }}
                className={`w-7 h-7 rounded-full transition-all ${
                  themeIdx === i ? "ring-2 ring-white ring-offset-2 ring-offset-background scale-110" : "opacity-60"
                }`}
              />
            ))}
          </div>
          {/* Shuffle quote */}
          <button
            onClick={() => setQuoteIdx(q => q + 1)}
            data-testid="button-shuffle-quote"
            className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-card/40 border border-border/50 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw size={12} /> Shuffle quote
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <motion.button
            data-testid="button-share-card"
            whileTap={{ scale: 0.97 }}
            onClick={share}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
          >
            <Share2 size={16} />
            {shared ? "Shared!" : "Share to Stories"}
          </motion.button>

          <button
            data-testid="button-download-card"
            onClick={download}
            disabled={downloading}
            className="w-full py-3.5 rounded-2xl border border-border/50 bg-card/40 font-semibold text-sm flex items-center justify-center gap-2 hover:border-primary/30 transition-colors disabled:opacity-50"
          >
            <Download size={15} />
            {downloading ? "Saving…" : "Save as Image"}
          </button>
        </div>

        {/* Tip */}
        <p className="text-xs text-muted-foreground/50 text-center max-w-xs leading-relaxed">
          The card saves as a PNG you can post to Instagram Stories, WhatsApp, or wherever. Switch themes and shuffle quotes to find what fits your vibe.
        </p>
      </div>
    </div>
  );
}
