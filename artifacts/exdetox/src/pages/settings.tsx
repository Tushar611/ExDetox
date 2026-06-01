import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useProStatus } from "@/hooks/use-pro-status";
import { useLocation } from "wouter";
import { signOut } from "@/lib/auth";
import { Trash2, Crown, Zap, Gift, Copy, Check, Users, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { getMyReferralCode, getReferralShareUrl, getReferralCount } from "@/lib/referral";

export default function Settings() {
  const [, setLocation] = useLocation();
  const [, setStarted] = useLocalStorage("exdetox_started", false);
  const { isPro, plan, trialActive, trialDaysLeft, deactivate } = useProStatus();
  const [copied, setCopied] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const referralCode = getMyReferralCode();
  const shareUrl = getReferralShareUrl(referralCode);
  const referralCount = getReferralCount();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (!confirm("Are you sure you want to sign out? You can sign back in anytime.")) return;
    setSigningOut(true);
    try {
      await signOut();
      setLocation("/");
    } finally {
      setSigningOut(false);
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) return;
    
    setFeedbackSubmitting(true);
    try {
      // Google Form submission endpoint
      const sheetFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdPmuzaKnD6-tEJ_R-cDuIU67TmpxLa7D0oaltkOpXczEQoGQ/formResponse";
      
      const formData = new FormData();
      // Update these entry IDs with yours from "Get pre-filled link"
      formData.append("entry.1234567890", feedbackText); // Replace 1234567890 with Feedback field ID
      formData.append("entry.9876543210", new Date().toISOString()); // Replace with Timestamp field ID (optional)
      
      await fetch(sheetFormUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });
      
      setFeedbackSent(true);
      setFeedbackText("");
      setTimeout(() => setFeedbackSent(false), 3000);
    } catch (error) {
      console.error("Feedback submission failed:", error);
    } finally {
      setFeedbackSubmitting(false);
    }
  };

  const handleResetEverything = () => {
    if (confirm("Are you sure you want to delete all data? This cannot be undone.")) {
      [
        "exdetox_started", "exdetox_nc_date", "exdetox_moods", "exdetox_missions",
        "exdetox_quiz_result", "exdetox_journal", "exdetox_pledge", "exdetox_pro_plan",
        "exdetox_trial_expires", "exdetox_referral_used", "exdetox_shadow",
        "exdetox_ex_archetype", "exdetox_attachment_style",
      ].forEach(k => localStorage.removeItem(k));
      setStarted(false);
      setLocation("/");
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 pb-32 overflow-y-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pt-8 mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your detox journey.</p>
      </motion.div>

      <div className="space-y-5">

        {/* Plan status */}
        {isPro ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/30 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-primary" />
                <h3 className="font-bold">ExDetox Pro</h3>
              </div>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                {trialActive ? "Trial" : "Active"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {trialActive
                ? `Free trial — ${trialDaysLeft} day${trialDaysLeft !== 1 ? "s" : ""} remaining. Upgrade to keep access.`
                : plan === "annual"
                ? "Annual plan — ₹799/year. All premium features unlocked."
                : "Monthly plan — ₹99/month. All premium features unlocked."}
            </p>
            {trialActive ? (
              <Link href="/upgrade">
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold">
                  Upgrade to keep Pro →
                </button>
              </Link>
            ) : (
              <button
                data-testid="button-cancel-pro"
                onClick={() => {
                  if (confirm("Cancel your Pro plan? You'll lose access to premium features.")) deactivate();
                }}
                className="text-xs text-muted-foreground underline hover:text-destructive transition-colors"
              >
                Cancel plan
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Crown size={18} className="text-muted-foreground" />
              <h3 className="font-bold">Free Plan</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to unlock journal, analytics, ex analysis, attachment quiz & more.
            </p>
            <Link href="/upgrade">
              <button data-testid="button-upgrade-settings"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <Zap size={14} /> Upgrade to Pro — ₹99/month
              </button>
            </Link>
          </motion.div>
        )}

        {/* Refer a friend */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Gift size={18} className="text-primary" />
            <h3 className="font-bold">Refer a Friend</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Send your link. They get <span className="text-primary font-semibold">7 days free Pro</span> when they open it — and you both win.
          </p>

          {/* Referral code display */}
          <div className="flex items-center gap-2 p-3 bg-background/50 border border-border/40 rounded-xl mb-3">
            <span className="font-mono text-xs text-muted-foreground flex-1 truncate">{shareUrl}</span>
            <button
              data-testid="button-copy-referral"
              onClick={copyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                copied ? "bg-green-500/15 text-green-400 border border-green-500/30" : "bg-primary/15 text-primary border border-primary/20 hover:bg-primary/25"
              }`}
            >
              {copied ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
            </button>
          </div>

          {/* Share buttons */}
          <div className="flex gap-2">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Bro I found this app that's actually helping me get over my ex 💀 It tracks your no-contact streak and has this Ex Analysis thing that's kinda accurate. 7 days free if you use my link: ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold text-center hover:bg-green-500/20 transition-colors"
            >
              Share on WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`found an app that's genuinely helping me heal after a breakup. tracks your no-contact streak, has an ex analysis, attachment style quiz, shadow work prompts.\n\nget 7 days free pro: ${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold text-center hover:bg-sky-500/20 transition-colors"
            >
              Share on X
            </a>
          </div>

          {/* Stats */}
          {referralCount > 0 && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
              <Users size={13} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                <span className="text-primary font-bold">{referralCount}</span> friend{referralCount !== 1 ? "s" : ""} activated their free trial from your link
              </span>
            </div>
          )}
        </motion.div>

        {/* Feedback */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={18} className="text-primary" />
            <h3 className="font-bold">Send Feedback</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Help us improve. What's working? What could be better?
          </p>
          
          {feedbackSent ? (
            <div className="text-center py-3 px-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <p className="text-sm text-green-400 font-semibold">✓ Feedback received! Thank you 💜</p>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us what's on your mind..."
                className="w-full bg-background/50 border border-border/50 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-primary/50 transition-colors resize-none min-h-[100px]"
              />
              <button
                onClick={handleSubmitFeedback}
                disabled={!feedbackText.trim() || feedbackSubmitting}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-bold disabled:opacity-50 hover:shadow-lg transition-all"
              >
                <Send size={14} />
                {feedbackSubmitting ? "Sending..." : "Send Feedback"}
              </button>
            </div>
          )}
        </motion.div>

        {/* Danger zone */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <h3 className="font-bold text-destructive flex items-center gap-2 mb-2">
            <Trash2 size={18} /> Danger Zone
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Erase all history, moods, journal entries, and your current streak. You'll be sent back to day one.
          </p>
          <Button variant="destructive" className="w-full font-bold tracking-wide"
            onClick={handleResetEverything} data-testid="button-reset-everything">
            Reset Everything
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
          <h3 className="font-bold mb-2">Account</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Sign out when you need a break and come back whenever you're ready.
          </p>
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full py-3.5 rounded-2xl border border-border/50 bg-background/70 font-semibold text-sm text-foreground hover:bg-card/60 transition-colors disabled:opacity-60"
          >
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </motion.div>
      </div>

      <div className="mt-auto pt-8 text-center text-xs text-muted-foreground">
        <p>ExDetox v2.0.0</p>
        <p className="mt-1">Detox from the past.</p>
      </div>
    </div>
  );
}
