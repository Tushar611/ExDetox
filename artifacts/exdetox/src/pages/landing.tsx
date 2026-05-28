import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import {
  Flame, Brain, Heart, Moon, BarChart2, BookOpen,
  Ghost, Music2, Zap, ChevronRight, Star, Shield,
  TrendingUp, Clock, ArrowRight
} from "lucide-react";

const FEATURES_FREE = [
  { icon: Flame, title: "No-Contact Streak", desc: "Track every hour and day since you last caved. Watch the number grow." },
  { icon: TrendingUp, title: "Healing Levels", desc: "Broken → Recovering → Detaching → Detached → Reborn → Unreachable." },
  { icon: Clock, title: "Daily Missions", desc: "3 recovery tasks every day to keep you moving forward." },
  { icon: Shield, title: "STOP ME Mode", desc: "About to text them? Hit the emergency button before you spiral." },
];

const FEATURES_PRO = [
  { icon: Brain, title: "Ex Analysis", desc: "8 questions. Deep psychological insight into what your relationship really was." },
  { icon: Heart, title: "Attachment Style Quiz", desc: "Understand why you loved the way you did — and how to do it differently." },
  { icon: Moon, title: "Shadow Work Prompts", desc: "30 deep reflective prompts to heal at the root, not just the surface." },
  { icon: Ghost, title: "Situationship Mode", desc: "Clarity streak, red flag tracker, and the unsent letter you need to write." },
  { icon: BookOpen, title: "Glow Up Journal", desc: "Daily private entries that track your growth over time." },
  { icon: BarChart2, title: "Mood Analytics", desc: "7-day and 30-day mood trends to see how far you've actually come." },
];

const TESTIMONIALS = [
  { text: "I relapsed 4 times before ExDetox. Now I'm on day 47. The Ex Analysis literally named exactly what happened to me.", handle: "@softgirl_heals" },
  { text: "The 'Unreachable' level is the most motivating thing I've ever seen in an app. I want to get there so bad.", handle: "@iykyk_vibes" },
  { text: "Shadow Work section hit different. I cried writing my first response. That was healing tho.", handle: "@journaling.gen.z" },
  { text: "My therapist literally told me to track my no-contact streak. Glad there's finally an app built for this.", handle: "@bouncing.back.daily" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Set your no-contact date", desc: "Tell ExDetox when you last had contact with your ex. That's day zero." },
  { step: "02", title: "Track, heal, level up", desc: "Log your mood, complete daily missions, and watch yourself climb from Broken to Unreachable." },
  { step: "03", title: "Go deep with Pro tools", desc: "Understand your attachment style, analyze your relationship dynamic, and do the shadow work." },
];

const FAQS = [
  { q: "Is ExDetox actually free?", a: "Yes — the core features are free forever. Streak tracking, healing levels, mood tracker, daily missions, STOP ME mode. Pro adds the deeper healing tools." },
  { q: "Does ExDetox store my data anywhere?", a: "No. Everything stays on your device in your browser. Nothing is sent to any server. Your breakup data is completely private." },
  { q: "What if I relapse?", a: "There's a reset button. It's not a punishment — it's a reset. Your healing isn't linear and ExDetox doesn't pretend it is." },
  { q: "What's the difference between Pro and free?", a: "Free gives you the streak and daily tools. Pro gives you Ex Analysis, Attachment Style Quiz, Shadow Work, Journal, Mood Analytics, Situationship Mode, and more." },
  { q: "Can I use this on my phone?", a: "Yes — ExDetox is built mobile-first. Open it in your browser and it works like an app. You can add it to your home screen." },
];

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto overflow-x-hidden bg-background text-foreground">

      {/* NAV */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 border-b border-border/20 bg-background/80 backdrop-blur-xl">
        <span className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          ExDetox
        </span>
        <div className="flex items-center gap-3">
          <Link href="/upgrade">
            <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
          </Link>
          <Link href="/onboarding">
            <button
              data-testid="button-nav-start"
              className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              Start Free
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 pt-20 pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-lg mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6">
            <Star size={11} fill="currentColor" /> Built for Gen Z heartbreak survivors
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-5">
            Stop checking their<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Instagram.
            </span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
            ExDetox is the breakup recovery tracker built for people who want to actually heal — not just distract. Track your no-contact streak, understand your attachment style, and go from <strong className="text-foreground">Broken</strong> to <strong className="text-primary">Unreachable</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/onboarding">
              <motion.button
                data-testid="button-hero-start"
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)] transition-all"
              >
                Start Your Detox — Free
              </motion.button>
            </Link>
            <Link href="/upgrade">
              <button className="px-8 py-4 rounded-2xl border border-border/50 bg-card/30 text-sm font-semibold hover:border-primary/30 transition-all">
                See Pro Features →
              </button>
            </Link>
          </div>

          <p className="text-xs text-muted-foreground/50 mt-4">No account needed. Data stays on your device.</p>
        </motion.div>

        {/* Healing levels preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 mt-14 flex gap-2 overflow-x-auto no-scrollbar pb-2"
        >
          {[
            { label: "Broken", color: "bg-red-500/20 border-red-500/30 text-red-400" },
            { label: "Recovering", color: "bg-orange-500/20 border-orange-500/30 text-orange-400" },
            { label: "Detaching", color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" },
            { label: "Detached", color: "bg-green-500/20 border-green-500/30 text-green-400" },
            { label: "Reborn", color: "bg-teal-500/20 border-teal-500/30 text-teal-400" },
            { label: "Unreachable", color: "bg-primary/20 border-primary/30 text-primary" },
          ].map((l, i) => (
            <div key={l.label} className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold ${l.color} ${i === 5 ? "shadow-[0_0_20px_hsl(var(--primary)/0.3)]" : ""}`}>
              {l.label}
            </div>
          ))}
        </motion.div>
        <p className="text-xs text-muted-foreground/40 mt-2">Your journey from day 0 to day 90+</p>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-16 max-w-lg mx-auto w-full">
        <h2 className="text-2xl font-black text-center mb-10">How it works</h2>
        <div className="space-y-6">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-black text-primary">{s.step}</span>
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">{s.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FREE FEATURES */}
      <section className="px-5 py-16 bg-card/20 border-y border-border/20">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Free forever</span>
            <h2 className="text-2xl font-black mt-2">Everything you need to start</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {FEATURES_FREE.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background/60 border border-border/40 rounded-2xl p-4"
              >
                <f.icon size={20} className="text-primary mb-2" />
                <h3 className="font-bold text-xs mb-1">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/onboarding">
              <button
                data-testid="button-free-start"
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm"
              >
                Start Free →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* PRO FEATURES */}
      <section className="px-5 py-16 max-w-lg mx-auto w-full">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Star size={11} fill="currentColor" /> Pro Plan
          </span>
          <h2 className="text-2xl font-black mt-2">Go deeper. Heal faster.</h2>
          <p className="text-sm text-muted-foreground mt-2">₹99/month or ₹799/year</p>
        </div>
        <div className="space-y-3">
          {FEATURES_PRO.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex gap-4 items-start p-4 rounded-2xl bg-card/30 border border-border/40 hover:border-primary/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <f.icon size={15} className="text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xs mb-0.5">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/upgrade">
            <button
              data-testid="button-pro-upgrade"
              className="px-8 py-3.5 rounded-2xl border border-primary/40 bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 transition-colors"
            >
              See Pro Plans →
            </button>
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-5 py-16 bg-card/20 border-y border-border/20">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-black text-center mb-10">People are healing</h2>
          <div className="space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background/60 border border-border/40 rounded-2xl p-4"
              >
                <p className="text-sm text-foreground/85 leading-relaxed mb-2">"{t.text}"</p>
                <p className="text-xs text-primary font-semibold">{t.handle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 max-w-lg mx-auto w-full">
        <h2 className="text-2xl font-black text-center mb-10">FAQs</h2>
        <div className="space-y-4">
          {FAQS.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border border-border/40 rounded-2xl p-5"
            >
              <h3 className="font-bold text-sm mb-2">{f.q}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-sm mx-auto"
        >
          <h2 className="text-3xl font-black mb-4 leading-tight">
            Day 1 starts<br />when you decide.
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            You don't need to be ready. You just need to start. No account, no email, no judgment — just your streak and the road ahead.
          </p>
          <Link href="/onboarding">
            <motion.button
              data-testid="button-final-cta"
              whileTap={{ scale: 0.97 }}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-[0_0_50px_hsl(var(--primary)/0.4)]"
            >
              Start My Detox — It's Free
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-8 border-t border-border/20 text-center">
        <p className="text-xs text-muted-foreground/40">
          © 2026 ExDetox · Built for breakup survivors ·{" "}
          <Link href="/upgrade"><span className="hover:text-primary cursor-pointer transition-colors">Pro</span></Link>
          {" · "}
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
        </p>
      </footer>
    </div>
  );
}
