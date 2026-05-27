import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { useLocation } from "wouter";
import { Trash2, Crown, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [, setStarted] = useLocalStorage("exdetox_started", false);
  const { isPro, plan, deactivate } = useProStatus();

  const handleResetEverything = () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      localStorage.removeItem("exdetox_started");
      localStorage.removeItem("exdetox_nc_date");
      localStorage.removeItem("exdetox_moods");
      localStorage.removeItem("exdetox_missions");
      localStorage.removeItem("exdetox_quiz_result");
      localStorage.removeItem("exdetox_journal");
      localStorage.removeItem("exdetox_pledge");
      setStarted(false);
      setLocation("/");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-8 mb-8"
      >
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your detox journey.</p>
      </motion.div>

      <div className="space-y-5">
        {/* Plan status */}
        {isPro ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/30 rounded-2xl p-5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-primary" />
                <h3 className="font-bold">ExDetox Pro</h3>
              </div>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {plan === "annual" ? "Annual plan — ₹799/year" : "Monthly plan — ₹99/month"}. All premium features unlocked.
            </p>
            <button
              data-testid="button-cancel-pro"
              onClick={() => {
                if (confirm("Cancel your Pro plan? You'll lose access to premium features.")) {
                  deactivate();
                }
              }}
              className="text-xs text-muted-foreground underline hover:text-destructive transition-colors"
            >
              Cancel plan
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <Crown size={18} className="text-muted-foreground" />
              <h3 className="font-bold">Free Plan</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              You're on the free plan. Upgrade to unlock journal, analytics, playlist & more.
            </p>
            <Link href="/upgrade">
              <button
                data-testid="button-upgrade-settings"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-shadow"
              >
                <Zap size={14} />
                Upgrade to Pro — ₹99/month
              </button>
            </Link>
          </motion.div>
        )}

        {/* Danger zone */}
        <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <h3 className="font-bold text-destructive flex items-center gap-2 mb-2">
            <Trash2 size={18} /> Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Erase all history, moods, journal, and your current streak. You will be sent back to the start.
          </p>
          <Button
            variant="destructive"
            className="w-full font-bold tracking-wide"
            onClick={handleResetEverything}
            data-testid="button-reset-everything"
          >
            Reset Everything
          </Button>
        </div>
      </div>

      <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
        <p>ExDetox v2.0.0</p>
        <p className="mt-1">Detox from the past.</p>
      </div>
    </div>
  );
}
