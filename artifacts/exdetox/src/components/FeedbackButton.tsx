import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setLoading(true);
    try {
      // Replace this with your Google Forms submission URL or Apps Script
      // For now, using a placeholder - we'll set this up in Google Sheets
      const response = await fetch(
        "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse",
        {
          method: "POST",
          mode: "no-cors",
          body: new FormData(
            Object.assign(document.createElement("form"), {
              elements: [
                Object.assign(document.createElement("input"), {
                  name: "entry.YOUR_FIELD_ID",
                  value: feedback,
                }),
                Object.assign(document.createElement("input"), {
                  name: "entry.TIMESTAMP_FIELD",
                  value: new Date().toISOString(),
                }),
              ],
            })
          ),
        }
      );

      setSent(true);
      setFeedback("");
      setTimeout(() => {
        setSent(false);
        setOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <MessageCircle size={22} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-8 z-50 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-violet-600/20 to-pink-600/20 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-white">Send us feedback</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What can we improve? Your ideas matter..."
                disabled={loading || sent}
                className="w-full h-28 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-violet-500 focus:outline-none resize-none disabled:opacity-60"
              />

              {sent ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-400 text-center font-semibold bg-green-950/30 border border-green-900/50 rounded-lg py-2"
                >
                  ✓ Thank you for your feedback!
                </motion.div>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !feedback.trim()}
                  className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold py-2.5 rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={16} />
                      Send feedback
                    </>
                  )}
                </button>
              )}

              <p className="text-xs text-slate-500 text-center">
                We read every suggestion and take user feedback seriously.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
