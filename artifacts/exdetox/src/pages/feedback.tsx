import { useAuth } from "@/contexts/auth-context";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Feedback() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) {
      setLocation("/auth");
    }
  }, [user, setLocation]);

  if (!user) {
    return null;
  }

  // Pre-fill user email in the form URL
  const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSdPmuzaKnD6-tEJ_R-cDuIU67TmpxLa7D0oaltkOpXczEQoGQ/viewform?usp=pp_url&entry.EMAIL=${encodeURIComponent(user.email || "")}`;

  return (
    <div className="min-h-screen w-full bg-slate-950 relative overflow-hidden">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-black text-white mb-3">We'd love your feedback</h1>
          <p className="text-slate-400">Help us improve ExDetox with your thoughts and suggestions</p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm"
        >
          <iframe
            src={formUrl}
            width="100%"
            height="800"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            style={{
              borderRadius: "12px",
              border: "1px solid #1e293b",
            }}
            title="Customer Feedback Form"
          >
            Loading form...
          </iframe>
        </motion.div>

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm text-slate-500 mt-6"
        >
          Your email has been pre-filled. All feedback is valuable and helps us build better features.
        </motion.p>
      </div>
    </div>
  );
}
