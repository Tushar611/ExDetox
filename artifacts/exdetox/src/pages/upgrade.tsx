import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProStatus } from "@/hooks/use-pro-status";
import { useLocation } from "wouter";
import {
  Crown, Check, Zap, BookOpen, BarChart2, Music2,
  Target, ChevronLeft, Sparkles, Shield, X, Ghost, Brain, Heart, Moon
} from "lucide-react";

const FREE_FEATURES = [
  "No-contact streak tracker",
  "Healing level system",
  "Daily rotating quote",
  "Basic mood tracker (today only)",
  "3 daily recovery missions",
  "STOP ME emergency mode",
  "Relapse & reset button",
  "How Cooked Are You? quiz",
];

const PRO_FEATURES = [
  { icon: Brain, label: "Ex Analysis", desc: "8-question deep dive into your relationship dynamic" },
  { icon: Heart, label: "Attachment Style Quiz", desc: "Discover your attachment pattern & growth edge" },
  { icon: Moon, label: "Shadow Work Prompts", desc: "30 deep reflective prompts to heal at the root" },
  { icon: Ghost, label: "Situationship Mode", desc: "Clarity streak, red flag log & unsent letter" },
  { icon: BookOpen, label: "Glow Up Journal", desc: "Daily private entries tracking your growth" },
  { icon: BarChart2, label: "Mood Analytics", desc: "7-day & 30-day mood trends + streak history" },
  { icon: Music2, label: "Healing Playlist", desc: "Mood-matched song recommendations" },
  { icon: Target, label: "Custom No-Contact Pledge", desc: "Write your own personal promise" },
  { icon: Zap, label: "All 20 Daily Missions", desc: "Full mission library unlocked" },
  { icon: Sparkles, label: "Priority healing content", desc: "New quotes & missions weekly" },
];

type Step = "pricing" | "payment" | "success";

export default function Upgrade() {
  const [, setLocation] = useLocation();
  const { isPro, activate, plan } = useProStatus();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("annual");
  const [step, setStep] = useState<Step>(isPro ? "success" : "pricing");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card">("upi");
  const [upiId, setUpiId] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    if (!upiId && paymentMethod === "upi") return;
    setProcessing(true);
    setTimeout(() => {
      activate(selectedPlan);
      setProcessing(false);
      setStep("success");
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen pb-10 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 pt-8">
        <button
          data-testid="button-back"
          onClick={() => setLocation("/dashboard")}
          className="w-9 h-9 rounded-full bg-card/60 border border-border/50 flex items-center justify-center"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg flex items-center gap-2">
            <Crown size={18} className="text-primary" /> ExDetox Pro
          </h1>
          <p className="text-xs text-muted-foreground">Upgrade your healing journey</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === "pricing" && (
          <motion.div
            key="pricing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col px-5 gap-5"
          >
            {/* Hero */}
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/30 flex items-center justify-center mx-auto mb-4 shadow-[0_0_40px_hsl(var(--primary)/0.3)]">
                <Crown size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-1">Go Pro</h2>
              <p className="text-sm text-muted-foreground">Everything you need to actually heal.</p>
            </div>

            {/* Plan toggle */}
            <div className="grid grid-cols-2 gap-3">
              <button
                data-testid="button-plan-monthly"
                onClick={() => setSelectedPlan("monthly")}
                className={`rounded-2xl p-4 border text-left transition-all ${
                  selectedPlan === "monthly"
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                    : "border-border/50 bg-card/40"
                }`}
              >
                <p className="text-xs text-muted-foreground mb-1">Monthly</p>
                <p className="text-2xl font-bold">₹99</p>
                <p className="text-xs text-muted-foreground">per month</p>
              </button>

              <button
                data-testid="button-plan-annual"
                onClick={() => setSelectedPlan("annual")}
                className={`rounded-2xl p-4 border text-left relative transition-all ${
                  selectedPlan === "annual"
                    ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.15)]"
                    : "border-border/50 bg-card/40"
                }`}
              >
                <div className="absolute -top-2.5 right-3 bg-gradient-to-r from-primary to-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  SAVE 33%
                </div>
                <p className="text-xs text-muted-foreground mb-1">Annual</p>
                <p className="text-2xl font-bold">₹799</p>
                <p className="text-xs text-muted-foreground">₹67/month</p>
              </button>
            </div>

            {/* Pro features */}
            <div className="bg-card/40 border border-border/50 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-4">What you unlock</p>
              <div className="space-y-3">
                {PRO_FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Free comparison */}
            <div className="bg-card/20 border border-border/30 rounded-2xl p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Free plan includes</p>
              <div className="grid grid-cols-1 gap-1.5">
                {FREE_FEATURES.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Check size={12} className="text-muted-foreground/50 flex-shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>

            <button
              data-testid="button-continue-to-pay"
              onClick={() => setStep("payment")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-[0_0_30px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-shadow"
            >
              Continue → {selectedPlan === "monthly" ? "₹99/month" : "₹799/year"}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield size={12} /> <span>Cancel anytime. No hidden charges.</span>
            </div>
          </motion.div>
        )}

        {step === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="flex flex-col px-5 gap-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Complete Payment</h2>
              <button
                data-testid="button-back-to-pricing"
                onClick={() => setStep("pricing")}
                className="text-xs text-muted-foreground underline"
              >
                Back
              </button>
            </div>

            {/* Order summary */}
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">ExDetox Pro</p>
                  <p className="text-xs text-muted-foreground">{selectedPlan === "monthly" ? "Monthly plan" : "Annual plan"}</p>
                </div>
                <p className="text-xl font-bold text-primary">{selectedPlan === "monthly" ? "₹99" : "₹799"}</p>
              </div>
            </div>

            {/* Payment method tabs */}
            <div className="flex bg-card/40 border border-border/50 rounded-xl p-1 gap-1">
              <button
                data-testid="button-pay-upi"
                onClick={() => setPaymentMethod("upi")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${paymentMethod === "upi" ? "bg-primary text-white shadow-md" : "text-muted-foreground"}`}
              >
                UPI
              </button>
              <button
                data-testid="button-pay-card"
                onClick={() => setPaymentMethod("card")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${paymentMethod === "card" ? "bg-primary text-white shadow-md" : "text-muted-foreground"}`}
              >
                Card
              </button>
            </div>

            {paymentMethod === "upi" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <p className="text-sm text-muted-foreground">Enter your UPI ID</p>
                <input
                  data-testid="input-upi-id"
                  type="text"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  className="w-full bg-card/40 border border-border/60 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                />
                <div className="flex gap-2 flex-wrap">
                  {["@okaxis", "@paytm", "@ybl", "@ibl"].map(vpa => (
                    <button
                      key={vpa}
                      data-testid={`button-vpa-${vpa}`}
                      onClick={() => setUpiId(prev => prev.split("@")[0] + vpa)}
                      className="text-xs px-2 py-1 rounded-md bg-card/60 border border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
                    >
                      {vpa}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic">
                  Accepted: PhonePe, Google Pay, Paytm, BHIM UPI
                </p>
              </motion.div>
            )}

            {paymentMethod === "card" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                <input
                  data-testid="input-card-number"
                  type="text"
                  placeholder="Card number"
                  maxLength={19}
                  className="w-full bg-card/40 border border-border/60 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    data-testid="input-card-expiry"
                    type="text"
                    placeholder="MM / YY"
                    maxLength={5}
                    className="bg-card/40 border border-border/60 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                  />
                  <input
                    data-testid="input-card-cvv"
                    type="text"
                    placeholder="CVV"
                    maxLength={3}
                    className="bg-card/40 border border-border/60 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>
              </motion.div>
            )}

            <button
              data-testid="button-pay-now"
              onClick={handlePay}
              disabled={processing || (paymentMethod === "upi" && !upiId)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-[0_0_30px_hsl(var(--primary)/0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing…
                </span>
              ) : (
                `Pay ${selectedPlan === "monthly" ? "₹99" : "₹799"}`
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield size={12} /> <span>256-bit encrypted. 100% secure.</span>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center flex-1 px-8 text-center gap-6 py-16"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 border border-primary/50 flex items-center justify-center shadow-[0_0_60px_hsl(var(--primary)/0.5)]"
            >
              <Crown size={40} className="text-primary" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-bold mb-2">You're Pro now.</h2>
              <p className="text-muted-foreground text-sm">
                {isPro && !processing
                  ? "Your premium features are already active."
                  : "All premium features are now unlocked. You've invested in yourself — that's the first step."}
              </p>
            </div>

            <div className="w-full bg-card/40 border border-primary/20 rounded-2xl p-4 text-left space-y-2">
              {PRO_FEATURES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 text-sm">
                  <Check size={14} className="text-primary flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <button
              data-testid="button-go-to-dashboard"
              onClick={() => setLocation("/dashboard")}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
            >
              Start Healing →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
