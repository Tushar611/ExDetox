import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { FeedbackButton } from "@/components/FeedbackButton";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export function AppLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const showNav = location !== "/" && location !== "/onboarding";

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col relative overflow-hidden">
      {/* Floating particles background effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-primary/20 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-accent/20 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <main className="flex-1 z-10 w-full max-w-md lg:max-w-6xl mx-auto flex flex-col relative pb-[calc(env(safe-area-inset-bottom)+5rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {showNav && <BottomNav />}
      <FeedbackButton />
    </div>
  );
}
