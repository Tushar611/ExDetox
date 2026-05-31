import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [started, setStarted] = useLocalStorage<boolean>("exdetox_started", false);
  const [ncDate, setNcDate] = useLocalStorage<string>("exdetox_nc_date", new Date().toISOString());
  
  const [date, setDate] = useState<Date>(new Date(ncDate));

  const handleStart = () => {
    setNcDate(date.toISOString());
    setStarted(true);
    setLocation("/dashboard");
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent mb-4 drop-shadow-[0_0_25px_hsl(var(--primary)/0.5)]">
          ExDetox
        </h1>
        <p className="text-xl font-medium text-foreground tracking-wide">
          Make no-contact less lonely.
        </p>
        <p className="mt-4 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          Every hour you don't text them is progress. Pick the day you started, then use the tools here to keep moving forward without overthinking it.
        </p>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="w-full max-w-sm flex flex-col items-center gap-8"
      >
        <p className="text-muted-foreground italic text-lg">
          "Every day you don't text them is a win."
        </p>

        <div className="w-full flex flex-col gap-3">
          <label className="text-sm font-semibold tracking-wider uppercase text-foreground/80">
            When did no-contact start?
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-card/50 border-border/50 h-14",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-card border-border" align="center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                initialFocus
                className="bg-card text-foreground"
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          onClick={handleStart}
          className="w-full h-14 text-lg font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.6)] transition-all bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-4"
        >
          Start the detox
        </Button>
      </motion.div>
    </div>
  );
}
