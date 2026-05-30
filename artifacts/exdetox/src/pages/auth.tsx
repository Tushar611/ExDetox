import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithGoogle } from "@/lib/auth";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";

const HEADLINES = [
  "You stopped crying. Now stop checking.",
  "They moved on. So can you.",
  "The hardest delete is from your mind.",
  "You deserve a love that doesn't haunt you.",
  "Day 1 of choosing yourself starts here.",
];

const STATS = [
  { value: "12,400+", label: "people healing right now" },
  { value: "89%", label: "didn't relapse after 7 days" },
  { value: "Day 1", label: "is where power begins" },
];

export default function Auth() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (user) setLocation("/dashboard");
  }, [user, setLocation]);

  useEffect(() => {
    const t = setInterval(() => {
      setHeadlineIdx((i) => (i + 1) % HEADLINES.length);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Sign-in failed";
      if (!msg.includes("popup-closed")) setError("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-between"
      style={{ background: "#09080f" }}>

      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{
            top: "10%", left: "50%", transform: "translateX(-50%)",
            width: "520px", height: "520px", borderRadius: "50%",
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute"
          style={{
            bottom: "15%", right: "5%",
            width: "300px", height: "300px", borderRadius: "50%",
            background: "radial-gradient(circle, #ec4899 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute"
          style={{
            top: "40%", left: "0%",
            width: "250px", height: "250px", borderRadius: "50%",
            background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            background: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#ec4899" : "#2dd4bf",
            opacity: 0.4,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Top logo */}
      <div className="relative z-10 pt-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-black tracking-tight"
          style={{
            background: "linear-gradient(90deg, #a78bfa, #c084fc, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ExDetox
        </motion.div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-md gap-8">

        {/* Rotating headline */}
        <div className="min-h-[80px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={headlineIdx}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-3xl font-black leading-tight text-white"
            >
              {HEADLINES[headlineIdx]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base text-slate-400 leading-relaxed"
        >
          Track your no-contact streak, log your moods, complete healing missions — and become unreachable.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-6 justify-center w-full"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-0.5">
              <span className="text-lg font-black text-white">{s.value}</span>
              <span className="text-[10px] text-slate-500 text-center leading-tight max-w-[70px]">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Google sign-in button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full flex flex-col gap-3"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all relative overflow-hidden"
            style={{
              background: loading
                ? "rgba(255,255,255,0.06)"
                : "linear-gradient(135deg, #7c3aed 0%, #9333ea 50%, #a855f7 100%)",
              boxShadow: loading ? "none" : "0 0 40px rgba(124,58,237,0.5), 0 0 80px rgba(124,58,237,0.2)",
              color: "#fff",
            }}
          >
            {!loading && (
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, #6d28d9 0%, #7c3aed 50%, #9333ea 100%)",
                }}
              />
            )}
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                <svg className="w-5 h-5 relative z-10" viewBox="0 0 24 24">
                  <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="rgba(255,255,255,0.85)" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="rgba(255,255,255,0.7)" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="rgba(255,255,255,0.9)" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="relative z-10">Continue with Google</span>
              </>
            )}
          </motion.button>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-sm text-red-400 text-center">{error}</motion.p>
          )}

          <p className="text-xs text-slate-600 text-center leading-relaxed">
            By continuing, you agree to our terms. Your data stays private and is never sold.
          </p>
        </motion.div>
      </div>

      {/* Bottom testimonial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 pb-8 px-6 text-center max-w-sm"
      >
        <p className="text-xs text-slate-600 italic leading-relaxed">
          "I was checking their Instagram 30 times a day. After 14 days on ExDetox, I stopped caring."
        </p>
        <p className="text-xs text-slate-700 mt-1">— Priya, Day 21</p>
      </motion.div>
    </div>
  );
}
