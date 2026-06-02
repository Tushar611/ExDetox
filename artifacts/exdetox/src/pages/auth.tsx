import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithEmail, signUpWithEmail, resetPassword } from "@/lib/auth";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/auth-context";
import { firebaseConfigured } from "@/lib/firebase";

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

function getErrorMessage(error: unknown): string {
  const maybeError = error as { code?: string; message?: string };
  const code = maybeError.code ?? "";

  const messages: Record<string, string> = {
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/user-not-found": "No account exists for that email.",
    "auth/wrong-password": "Password is incorrect.",
    "auth/email-already-in-use": "This email is already in use. Try signing in.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many failed attempts. Try again later.",
    "auth/network-request-failed": "Network error. Check your connection.",
  };

  return messages[code] || maybeError.message || "Something went wrong. Try again.";
}

export default function Auth() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: unknown) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!forgotEmail) {
      setError("Enter your email address.");
      setLoading(false);
      return;
    }

    try {
      await resetPassword(forgotEmail);
      setForgotSent(true);
      setTimeout(() => setShowForgot(false), 3000);
    } catch (error: unknown) {
      setError(getErrorMessage(error));
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
      </div>

      {/* Top logo */}
      <div className="relative z-10 pt-10">
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
      <div className="relative z-10 flex flex-col items-center px-6 text-center w-full max-w-md gap-6">

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

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-slate-400 leading-relaxed"
        >
          Stop the scrolling, keep your streak, and use healing tools that actually help you feel better.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 justify-center w-full text-xs"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="font-black text-white text-sm">{s.value}</span>
              <span className="text-slate-500 text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Auth form */}
        <AnimatePresence mode="wait">
          {!showForgot ? (
            <motion.form
              key="auth"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col gap-4"
            >
              {/* Email input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-300 text-left">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none transition"
                />
              </div>

              {/* Password input */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-300 text-left">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none transition"
                />
              </div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-3 py-2 text-center"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit button */}
              <motion.button
                whileTap={!loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-50"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : isSignup ? (
                  "Create account"
                ) : (
                  "Sign in"
                )}
              </motion.button>

              {/* Toggle signup/signin */}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setError("");
                }}
                disabled={loading}
                className="text-xs text-slate-400 hover:text-white underline transition"
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Create one"}
              </button>

              {/* Forgot password link */}
              {!isSignup && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForgot(true);
                    setError("");
                  }}
                  disabled={loading}
                  className="text-xs text-slate-400 hover:text-slate-200 transition"
                >
                  Forgot password?
                </button>
              )}
            </motion.form>
          ) : (
            /* Forgot password form */
            <motion.form
              key="forgot"
              onSubmit={handleForgotPassword}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full flex flex-col gap-4"
            >
              <h3 className="text-lg font-bold text-white">Reset your password</h3>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-300 text-left">Email address</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  disabled={loading || forgotSent}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none transition"
                />
              </div>

              {forgotSent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-400 bg-green-950/30 border border-green-900/50 rounded-lg px-3 py-3 text-center"
                >
                  <div className="mb-1">✓ Check your email for password reset link</div>
                  <div className="text-xs text-green-300 font-semibold">💡 Tip: Check your spam folder too!</div>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-400 bg-red-950/30 border border-red-900/50 rounded-lg px-3 py-2 text-center"
                >
                  {error}
                </motion.div>
              ) : null}

              <motion.button
                whileTap={!loading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={loading || forgotSent}
                className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 px-5 py-3 text-sm font-bold text-white transition hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-50"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : "Send reset link"}
              </motion.button>

              <button
                type="button"
                onClick={() => {
                  setShowForgot(false);
                  setForgotEmail("");
                  setForgotSent(false);
                  setError("");
                }}
                disabled={loading}
                className="text-xs text-slate-400 hover:text-white underline transition"
              >
                Back to sign in
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xs text-slate-600 leading-relaxed"
        >
          By continuing, you agree to our terms. Your data stays private and is never sold.
        </motion.p>
      </div>

      {/* Bottom testimonial */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 pb-8 px-6 text-center max-w-sm"
      >
        <p className="text-xs text-slate-600 italic leading-relaxed">
          "I was checking their Instagram 30 times a day. After 14 days on ExDetox, I stopped caring and started feeling stronger."
        </p>
        <p className="text-xs text-slate-700 mt-1">— Priya, Day 21</p>
      </motion.div>
    </div>
  );
}
