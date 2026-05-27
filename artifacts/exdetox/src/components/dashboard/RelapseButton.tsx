import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AlertTriangle } from "lucide-react";
import { format } from "date-fns";

export function RelapseButton() {
  const [ncDate, setNcDate] = useLocalStorage<string>("exdetox_nc_date", "");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleRelapse = () => {
    setNcDate(new Date().toISOString());
    setConfirmOpen(false);
  };

  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, 0],
      transition: { duration: 0.4 }
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <Button 
          variant="outline"
          size="sm"
          onClick={() => {
            setShaking(true);
            setTimeout(() => setShaking(false), 400);
            setConfirmOpen(true);
          }}
          className="text-destructive border-destructive/30 hover:bg-destructive/10 bg-transparent rounded-full px-6 h-10 shadow-[0_0_10px_hsl(var(--destructive)/0.1)]"
        >
          I texted them.
        </Button>
      </div>

      <AnimatePresence>
        {confirmOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              variants={shakeVariants}
              animate={shaking ? "shake" : "stop"}
              className="bg-card border border-destructive/50 p-6 rounded-3xl max-w-sm w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-destructive" />
              
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4 opacity-80" />
              
              <h3 className="text-xl font-bold text-foreground mb-2">Are you sure?</h3>
              <p className="text-muted-foreground text-sm mb-6">
                This will reset your streak to 0. <br/>
                <span className="italic">"It happens. Start again. Day 1."</span>
              </p>

              <div className="flex flex-col gap-3">
                <Button 
                  onClick={handleRelapse}
                  className="bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl h-12 font-bold"
                >
                  Yes, reset my streak
                </Button>
                <Button 
                  onClick={() => setConfirmOpen(false)}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground rounded-xl h-12"
                >
                  No, I was just thinking about it
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
