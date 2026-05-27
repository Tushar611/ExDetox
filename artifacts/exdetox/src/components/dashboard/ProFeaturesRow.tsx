import { motion } from "framer-motion";
import { Link } from "wouter";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { Brain, Heart, Moon, Crown, ChevronRight } from "lucide-react";
import { type ExArchetype } from "@/lib/ex-analysis-data";

const PRO_TOOLS = [
  {
    href: "/ex-analysis",
    icon: Brain,
    label: "Ex Analysis",
    desc: "Identify your dynamic",
    resultKey: "exdetox_ex_archetype",
    resultLabel: (v: ExArchetype | null) => v?.name ?? null,
  },
  {
    href: "/attachment-quiz",
    icon: Heart,
    label: "Attachment Style",
    desc: "Understand how you love",
    resultKey: "exdetox_attachment_style",
    resultLabel: (v: string | null) => {
      const map: Record<string, string> = {
        secure: "Secure",
        anxious: "Anxious",
        avoidant: "Avoidant",
        fearful: "Fearful-Avoidant",
      };
      return v ? map[v] ?? v : null;
    },
  },
  {
    href: "/shadow-work",
    icon: Moon,
    label: "Shadow Work",
    desc: "Heal at the root",
    resultKey: "exdetox_shadow",
    resultLabel: (v: unknown[] | null) =>
      v && v.length > 0 ? `${v.length} response${v.length !== 1 ? "s" : ""}` : null,
  },
];

function ProToolCard({
  href,
  icon: Icon,
  label,
  desc,
  resultKey,
  resultLabel,
  isPro,
}: (typeof PRO_TOOLS)[0] & { isPro: boolean }) {
  const [stored] = useLocalStorage<unknown>(resultKey, null);
  const result = resultLabel(stored as never);

  return (
    <Link href={isPro ? href : "/upgrade"}>
      <motion.div
        whileTap={{ scale: 0.97 }}
        data-testid={`card-pro-${label.toLowerCase().replace(/\s/g, "-")}`}
        className={`flex-shrink-0 w-40 rounded-2xl border p-4 flex flex-col gap-2 cursor-pointer transition-all ${
          isPro
            ? "bg-card/50 border-border/50 hover:border-primary/40"
            : "bg-card/20 border-dashed border-border/30"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isPro ? "bg-primary/15" : "bg-muted/20"}`}>
            <Icon size={15} className={isPro ? "text-primary" : "text-muted-foreground/40"} />
          </div>
          {!isPro && <Crown size={11} className="text-primary" />}
          {isPro && result && <ChevronRight size={12} className="text-muted-foreground/40" />}
        </div>
        <div>
          <p className={`text-xs font-bold leading-tight ${isPro ? "text-foreground" : "text-muted-foreground/50"}`}>{label}</p>
          {result ? (
            <p className="text-[10px] text-primary font-semibold mt-0.5 leading-tight truncate">{result}</p>
          ) : (
            <p className="text-[10px] text-muted-foreground/50 mt-0.5 leading-tight">{desc}</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export function ProFeaturesRow() {
  const { isPro } = useProStatus();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Healing Tools
        </h3>
        {!isPro && (
          <Link href="/upgrade">
            <span className="text-xs text-primary font-bold flex items-center gap-1">
              <Crown size={10} /> Pro
            </span>
          </Link>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {PRO_TOOLS.map(tool => (
          <ProToolCard key={tool.href} {...tool} isPro={isPro} />
        ))}
      </div>
    </div>
  );
}
