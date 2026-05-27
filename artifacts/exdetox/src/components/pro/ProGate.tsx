import { ReactNode } from "react";
import { useProStatus } from "@/hooks/use-pro-status";
import { Link } from "wouter";
import { Crown, Lock } from "lucide-react";
import { motion } from "framer-motion";

interface ProGateProps {
  children: ReactNode;
  feature?: string;
  description?: string;
}

export function ProGate({ children, feature = "This feature", description = "Unlock the full healing experience." }: ProGateProps) {
  const { isPro } = useProStatus();

  if (isPro) return <>{children}</>;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-2xl border border-primary/30 p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/40 flex items-center justify-center mb-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
        >
          <Lock size={22} className="text-primary" />
        </motion.div>
        <h3 className="font-bold text-lg mb-1">{feature}</h3>
        <p className="text-sm text-muted-foreground mb-5">{description}</p>
        <Link href="/upgrade">
          <button
            data-testid="button-pro-upgrade"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-[0_0_20px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-shadow"
          >
            <Crown size={14} />
            Unlock Pro
          </button>
        </Link>
        <p className="text-xs text-muted-foreground mt-3">Starting at ₹99/month</p>
      </div>
      <div className="opacity-20 pointer-events-none select-none blur-sm">
        {children}
      </div>
    </div>
  );
}
