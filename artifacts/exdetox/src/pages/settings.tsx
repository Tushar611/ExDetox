import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useLocation } from "wouter";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [started, setStarted] = useLocalStorage("exdetox_started", false);

  const handleResetEverything = () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      localStorage.removeItem("exdetox_started");
      localStorage.removeItem("exdetox_nc_date");
      localStorage.removeItem("exdetox_moods");
      localStorage.removeItem("exdetox_missions");
      localStorage.removeItem("exdetox_quiz_result");
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

      <div className="space-y-6">
        <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <h3 className="font-bold text-destructive flex items-center gap-2 mb-2">
            <Trash2 size={18} /> Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Erase all history, moods, and your current streak. You will be sent back to the onboarding screen.
          </p>
          <Button 
            variant="destructive" 
            className="w-full font-bold tracking-wide"
            onClick={handleResetEverything}
          >
            Reset Everything
          </Button>
        </div>
      </div>
      
      <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
        <p>ExDetox v1.0.0</p>
        <p className="mt-1">Detox from the past.</p>
      </div>
    </div>
  );
}
