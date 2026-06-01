import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { format, parseISO } from "date-fns";
import { BookOpen, Plus, X, Sparkles, Lock } from "lucide-react";
import { Link } from "wouter";
import { Crown } from "lucide-react";

interface JournalEntry {
  id: string;
  date: string;
  text: string;
  mood?: string;
}

const PROMPTS = [
  "What's one thing you did for yourself today?",
  "Name something you're slowly letting go of.",
  "What would you tell your heartbroken past self right now?",
  "What's getting easier than it was last week?",
  "Describe one moment today you felt like yourself.",
  "What are you learning about yourself through this?",
  "One small win from today, even if it's tiny:",
  "What do you want your life to look like in 3 months?",
  "What are you done tolerating?",
  "Write about something that made you smile today.",
];

function JournalContent() {
  const [entries, setEntries] = useLocalStorage<JournalEntry[]>("exdetox_journal", []);
  const [writing, setWriting] = useState(false);
  const [text, setText] = useState("");
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const { isPro } = useProStatus();
  const today = format(new Date(), "yyyy-MM-dd");
  const hasEntryToday = entries.some(e => e.date === today);
  
  // Free tier: 3 total entries limit
  const entriesLimit = isPro ? Infinity : 3;
  const canWrite = isPro || entries.length < entriesLimit;

  const save = () => {
    if (!text.trim() || !canWrite) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: today,
      text: text.trim(),
    };
    setEntries([entry, ...entries]);
    setText("");
    setWriting(false);
  };

  return (
    <div className="flex-1 flex flex-col p-5 pb-32 gap-5">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen size={20} className="text-primary" />
          <h1 className="text-2xl font-bold">Glow Up Journal</h1>
        </div>
        <p className="text-sm text-muted-foreground">Private. Raw. Yours. Write the truth you haven't said out loud.</p>
        {!isPro && entries.length >= entriesLimit && (
          <p className="text-xs text-amber-500 mt-2 flex items-center gap-1">
            <Lock size={12} /> Free tier: {entries.length}/{entriesLimit} entries used
          </p>
        )}
      </motion.div>

      {/* Write entry - limited for free users */}
      {!hasEntryToday && !writing && canWrite && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          data-testid="button-new-entry"
          onClick={() => setWriting(true)}
          className="w-full bg-card/40 border border-primary/30 rounded-2xl p-5 text-left backdrop-blur-sm shadow-[0_0_20px_hsl(var(--primary)/0.1)] hover:border-primary/60 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
              <Plus size={16} className="text-primary" />
            </div>
            <span className="font-semibold text-sm">Today's entry</span>
          </div>
          <p className="text-sm text-muted-foreground italic">"{PROMPTS[promptIdx]}"</p>
          <p className="text-xs text-muted-foreground mt-3">Write what your heart actually needed today.</p>
        </motion.button>
      )}

      {/* Upgrade CTA for free users who hit limit */}
      {!isPro && entries.length >= entriesLimit && !hasEntryToday && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/40 rounded-2xl p-5 text-center"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center">
              <Lock size={18} className="text-primary" />
            </div>
          </div>
          <h3 className="font-bold mb-1">3 free entries used</h3>
          <p className="text-xs text-muted-foreground mb-4">
            Upgrade to Pro for unlimited entries and keep your healing journey going strong.
          </p>
          <Link href="/upgrade">
            <button className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold hover:shadow-lg transition-shadow">
              <Crown size={14} />
              Upgrade to Pro
            </button>
          </Link>
        </motion.div>
      )}

      <AnimatePresence>
        {writing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="bg-card/40 border border-primary/30 rounded-2xl p-5 backdrop-blur-sm"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs font-medium text-primary italic">"{PROMPTS[promptIdx]}"</p>
              <button
                data-testid="button-close-write"
                onClick={() => setWriting(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>
            <textarea
              data-testid="textarea-journal-entry"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Start typing... no one else can see this."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 outline-none resize-none min-h-[140px] leading-relaxed"
              autoFocus
            />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
              <span className="text-xs text-muted-foreground">{text.length} chars</span>
              <button
                data-testid="button-save-entry"
                onClick={save}
                disabled={!text.trim()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold disabled:opacity-40 transition-opacity"
              >
                Save Entry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entries list */}
      {entries.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Previous entries — {entries.length}{!isPro ? "/" + entriesLimit : ""} {!isPro && entries.length >= entriesLimit ? "(limit reached)" : ""}
          </h3>
          {entries.map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card/30 border border-border/40 rounded-2xl p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-primary font-mono">
                  {format(parseISO(entry.date), "MMM d, yyyy")}
                </span>
                <button
                  data-testid={`button-delete-entry-${entry.id}`}
                  onClick={() => setEntries(entries.filter(e => e.id !== entry.id))}
                  className="text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{entry.text}</p>
            </motion.div>
          ))}
        </div>
      )}

      {entries.length === 0 && !writing && (
        <div className="text-center py-12 text-muted-foreground">
          <Sparkles size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Your journal is empty.</p>
          <p className="text-xs mt-1">Try writing one honest sentence about today.</p>
        </div>
      )}
    </div>
  );
}

export default function Journal() {
  return <JournalContent />;
}
