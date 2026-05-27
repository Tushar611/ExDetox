import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { format, parseISO } from "date-fns";
import { Moon, X, ChevronLeft, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";

const SHADOW_PROMPTS = [
  "What did this relationship teach you about what you secretly believe you deserve?",
  "What part of yourself did you hide to keep them interested?",
  "What would you have done differently if you truly believed you were 'enough'?",
  "What childhood wound did this relationship trigger?",
  "What did you accept from them that you would never accept from a friend?",
  "What fear drove most of your decisions in this relationship?",
  "Who did you become in this relationship that you didn't like?",
  "What did you need from them that you've never learned to give yourself?",
  "What story did you tell yourself to stay when you knew something was wrong?",
  "What parts of the breakup feel like confirmation of your worst fears about yourself?",
  "What would you say to them if you knew they'd truly understand you — not react?",
  "What pattern from this relationship have you seen in past ones too?",
  "What were you afraid would happen if you fully expressed your needs?",
  "What did you find attractive about them that might actually have been a red flag?",
  "In what ways did this relationship reflect how you see your own worth?",
  "What are you avoiding feeling by staying busy and distracted?",
  "What would 'loving yourself first' have looked like in this relationship?",
  "What part of you is relieved it's over, even if you don't want to admit it?",
  "What are you most afraid to discover about yourself through this process?",
  "What do you wish you had said before it ended?",
  "How did you abandon yourself in this relationship?",
  "What do you want your next relationship to feel like — not look like, but feel like?",
  "What boundaries did you know you needed but didn't enforce?",
  "What would you need to believe about yourself to never accept this again?",
  "What emotions are you most uncomfortable sitting with right now?",
  "How has this breakup revealed something you need to heal from before them?",
  "What's the difference between the person you were with them vs. alone?",
  "What would you do differently if you knew someone was watching — and approving of you?",
  "What part of the grief is actually for a version of yourself you lost?",
  "If this relationship was trying to teach you something, what would that lesson be?",
];

function getPromptForDate(dateStr: string, offset = 0): string {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return SHADOW_PROMPTS[Math.abs(hash + offset * 13) % SHADOW_PROMPTS.length];
}

interface ShadowEntry {
  id: string;
  date: string;
  prompt: string;
  response: string;
}

function ShadowWorkContent() {
  const [, setLocation] = useLocation();
  const [entries, setEntries] = useLocalStorage<ShadowEntry[]>("exdetox_shadow", []);
  const [promptOffset, setPromptOffset] = useState(0);
  const [response, setResponse] = useState("");
  const [saved, setSaved] = useState(false);

  const today = format(new Date(), "yyyy-MM-dd");
  const todaysPrompt = getPromptForDate(today, promptOffset);
  const hasEntryForPrompt = entries.some(e => e.prompt === todaysPrompt);

  const save = () => {
    if (!response.trim()) return;
    const entry: ShadowEntry = {
      id: Date.now().toString(),
      date: today,
      prompt: todaysPrompt,
      response: response.trim(),
    };
    setEntries([entry, ...entries]);
    setResponse("");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-10">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pt-8">
        <button
          data-testid="button-back"
          onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Moon size={18} className="text-primary" /> Shadow Work
          </h1>
          <p className="text-xs text-muted-foreground">Go deeper. Heal at the root.</p>
        </div>
      </div>

      <div className="flex flex-col px-5 gap-5">
        {/* What is shadow work */}
        <div className="text-xs text-muted-foreground/70 bg-card/20 border border-border/20 rounded-xl p-3 leading-relaxed">
          Shadow work means looking at the parts of yourself and your patterns that you normally avoid. It's uncomfortable. It's also where real healing happens.
        </div>

        {/* Today's prompt */}
        <div className="bg-gradient-to-br from-card/60 to-primary/5 border border-primary/20 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Today's prompt</span>
            <button
              data-testid="button-shuffle-prompt"
              onClick={() => setPromptOffset(prev => prev + 1)}
              className="text-muted-foreground/50 hover:text-primary transition-colors"
              title="Get a different prompt"
            >
              <RefreshCw size={13} />
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={todaysPrompt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-base font-semibold leading-snug"
            >
              {todaysPrompt}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Response area */}
        {!hasEntryForPrompt && (
          <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
            <textarea
              data-testid="textarea-shadow-response"
              value={response}
              onChange={e => setResponse(e.target.value)}
              placeholder="Be honest. No one else will read this..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/30 outline-none resize-none min-h-[160px] leading-relaxed"
            />
            <div className="flex justify-between items-center pt-3 border-t border-border/30 mt-3">
              <span className="text-xs text-muted-foreground">{response.length} chars</span>
              <AnimatePresence mode="wait">
                {saved ? (
                  <motion.span
                    key="saved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-primary font-bold"
                  >
                    ✓ Saved
                  </motion.span>
                ) : (
                  <motion.button
                    key="save"
                    data-testid="button-save-shadow"
                    onClick={save}
                    disabled={!response.trim()}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-xs font-bold disabled:opacity-40"
                  >
                    Save Response
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {hasEntryForPrompt && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-center">
            <p className="text-sm text-primary font-semibold">✓ You answered this one.</p>
            <p className="text-xs text-muted-foreground mt-1">Tap shuffle above for another prompt, or read past entries below.</p>
          </div>
        )}

        {/* Past entries */}
        {entries.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Past responses — {entries.length} total
            </h3>
            {entries.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="bg-card/30 border border-border/40 rounded-2xl p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs text-primary font-mono">
                    {format(parseISO(entry.date), "MMM d, yyyy")}
                  </span>
                  <button
                    data-testid={`button-delete-shadow-${entry.id}`}
                    onClick={() => setEntries(entries.filter(e => e.id !== entry.id))}
                    className="text-muted-foreground/30 hover:text-muted-foreground"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p className="text-xs text-primary/70 italic mb-2 leading-snug">"{entry.prompt}"</p>
                <p className="text-sm text-foreground/75 leading-relaxed line-clamp-3">{entry.response}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShadowWork() {
  return (
    <ProGate
      feature="Shadow Work"
      description="Deep reflective prompts to help you understand your patterns at the root level. Real healing lives here."
    >
      <ShadowWorkContent />
    </ProGate>
  );
}
