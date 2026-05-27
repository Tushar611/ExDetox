import { useState } from "react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { ProGate } from "@/components/pro/ProGate";
import { Shield, Pencil, Check } from "lucide-react";

const DEFAULT_PLEDGE = "I choose my peace over my past. I am done giving them free rent in my head.";

function PledgeContent() {
  const [pledge, setPledge] = useLocalStorage<string>("exdetox_pledge", DEFAULT_PLEDGE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(pledge);

  const save = () => {
    setPledge(draft.trim() || DEFAULT_PLEDGE);
    setEditing(false);
  };

  return (
    <div className="w-full bg-card/40 border border-primary/20 rounded-2xl p-5 backdrop-blur-sm shadow-[0_0_30px_hsl(var(--primary)/0.07)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Shield size={14} /> My Pledge
        </h3>
        <button
          data-testid="button-edit-pledge"
          onClick={() => { setDraft(pledge); setEditing(!editing); }}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Pencil size={14} />
        </button>
      </div>

      {editing ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <textarea
            data-testid="textarea-pledge"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground outline-none resize-none min-h-[80px] border-b border-primary/30 pb-2 leading-relaxed"
            autoFocus
          />
          <button
            data-testid="button-save-pledge"
            onClick={save}
            className="flex items-center gap-1 text-xs font-bold text-primary"
          >
            <Check size={12} /> Save pledge
          </button>
        </motion.div>
      ) : (
        <motion.p
          key={pledge}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-foreground/90 leading-relaxed italic font-medium"
        >
          "{pledge}"
        </motion.p>
      )}
    </div>
  );
}

export function CustomPledge() {
  return (
    <ProGate
      feature="Custom No-Contact Pledge"
      description="Write your own personal promise to yourself. See it every day."
    >
      <PledgeContent />
    </ProGate>
  );
}
