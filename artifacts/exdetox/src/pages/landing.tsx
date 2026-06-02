import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import {
  Flame, Brain, Heart, Moon, BarChart2, BookOpen,
  Ghost, Music2, Zap, ChevronRight, Star, Shield,
  TrendingUp, Clock, ArrowRight, CheckCircle2, Users, Sparkles
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
  { 
    text: "I relapsed 4 times before ExDetox. Now I'm on day 47. The Ex Analysis literally named exactly what happened to me.",
    handle: "@softgirl_heals",
    avatar: "👩‍🦰",
    rating: 5
  },
  { 
    text: "The 'Unreachable' level is the most motivating thing I've ever seen in an app. I want to get there so bad.",
    handle: "@iykyk_vibes",
    avatar: "🧠",
    rating: 5
  },
  { 
    text: "Shadow Work section hit different. I cried writing my first response. That was healing tho.",
    handle: "@journaling.gen.z",
    avatar: "✨",
    rating: 5
  },
  { 
    text: "My therapist literally told me to track my no-contact streak. Glad there's finally an app built for this.",
    handle: "@bouncing.back.daily",
    avatar: "💜",
    rating: 5
  },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Set your no-contact date", desc: "Tell ExDetox when you last had contact with your ex. That becomes your day zero." },
  { step: "02", title: "Track, heal, level up", desc: "Log your mood, complete daily missions, and watch yourself move from Broken to Unreachable." },
  { step: "03", title: "Go deep with Pro tools", desc: "Understand your attachment style, analyze your relationship dynamic, and do the shadow work." },
];

const MOOD_OPTIONS = [
  {
    label: "Still thinking about them",
    desc: "A streak timer, mood check-ins, and simple tasks to help you stop refreshing their profile." },
  {
    label: "About to text them",
    desc: "Use STOP ME Mode and emergency reminders so you can pause before sending a message you'll later regret." },
  {
    label: "Ready to rebuild",
    desc: "Track your emotional progress and journal the wins so you actually feel the growth over time." },
];

const FAQS = [
  { q: "Is ExDetox actually free?", a: "Yes — the core features are free forever. Streak tracking, healing levels, mood tracker, daily missions, STOP ME mode. Pro adds the deeper healing tools." },
  { q: "Does ExDetox store my data anywhere?", a: "No. Everything stays on your device in your browser. Nothing is sent to any server. Your breakup data is completely private." },
  { q: "What if I relapse?", a: "There's a reset button. It's not a punishment — it's a reset. Your healing isn't linear and ExDetox doesn't pretend it is." },
  { q: "What's the difference between Pro and free?", a: "Free gives you the streak and daily tools. Pro gives you Ex Analysis, Attachment Style Quiz, Shadow Work, Journal, Mood Analytics, Situationship Mode, and all 20 daily missions." },
  { q: "Can I use this on my phone?", a: "Yes — ExDetox is built mobile-first. Open it in your browser and it works like an app. You can add it to your home screen." },
];

const STATS = [
  { number: "12,400+", label: "People healing right now" },
  { number: "89%", label: "Didn't relapse after 7 days" },
  { number: "47 days avg", label: "No-contact streak" },
];

export default function Landing() {
  const [selectedMood, setSelectedMood] = useState(0);

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto overflow-x-hidden bg-background text-foreground">

      {/* NAV */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between px-5 lg:px-10 py-4">
          <motion.span 
            whileHover={{ scale: 1.05 }}
            className="text-lg font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent cursor-pointer"
          >
            ExDetox
          </motion.span>
          <div className="flex items-center gap-3">
            <Link href="/upgrade">
              <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</button>
            </Link>
            <Link href="/onboarding">
              <motion.button
                data-testid="button-nav-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all"
              >
                Start Free
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center px-5 lg:px-10 pt-16 lg:pt-24 pb-20 lg:pb-24 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" 
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-5xl mx-auto text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
              <Star size={11} fill="currentColor" />
            </motion.div>
            Built for Gen Z heartbreak survivors
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-5">
            Stop checking their<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
              Instagram.
            </span>
          </h1>

          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-8 max-w-sm lg:max-w-2xl mx-auto lg:mx-0">
            ExDetox is the breakup recovery sidekick that actually gets you. Stop refreshing their profile, keep your streak, and build a better version of yourself with tools that feel real, not clinical.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link href="/onboarding">
              <motion.button
                data-testid="button-hero-start"
                whileHover={{ scale: 1.05, shadow: "0 0 60px hsl(var(--primary) / 0.6)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-[0_0_40px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_60px_hsl(var(--primary)/0.6)] transition-all flex items-center gap-2 justify-center"
              >
                Start Your Detox — Free
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={14} />
                </motion.div>
              </motion.button>
            </Link>
            <Link href="/upgrade">
              <motion.button 
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary) / 0.5)' }}
                className="px-8 py-4 rounded-2xl border border-border/50 bg-card/30 text-sm font-semibold hover:border-primary/30 transition-all"
              >
                See Pro Features →
              </motion.button>
            </Link>
          </div>

          <motion.p 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-xs text-muted-foreground/50 mt-4"
          >
            ✨ No account needed. Data stays on your device.
          </motion.p>
        </motion.div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 mt-16 grid grid-cols-3 gap-8 max-w-2xl"
        >
          {STATS.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <motion.p 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-black text-primary"
              >
                {stat.number}
              </motion.p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mood section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="relative z-10 mt-16 max-w-5xl mx-auto w-full"
        >
          <div className="rounded-[2rem] border border-border/30 bg-card/70 p-5 sm:p-6 shadow-xl shadow-black/5 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-2 text-left">
                <p className="text-xs uppercase tracking-[0.35em] font-bold text-muted-foreground">What feels most like you?</p>
                <h2 className="text-xl font-black">Choose your current mood and see how ExDetox helps.</h2>
              </div>
              <div className="text-right text-xs text-muted-foreground hidden sm:block">
                Tap a card to see the next step your recovery needs.
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {MOOD_OPTIONS.map((mood, index) => (
                <motion.button
                  key={mood.label}
                  type="button"
                  onClick={() => setSelectedMood(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-3xl border p-4 text-left transition-all ${selectedMood === index ? "border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.12)]" : "border-border/40 hover:border-border/60 bg-background/40"}`}
                >
                  <p className="text-sm font-bold mb-2">{mood.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{mood.desc}</p>
                </motion.button>
              ))}
            </div>

            <motion.div 
              key={selectedMood}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-5 rounded-[2rem] border border-border/20 bg-background p-5 text-left"
            >
              <p className="text-sm font-semibold flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                Right now: {MOOD_OPTIONS[selectedMood].label}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {MOOD_OPTIONS[selectedMood].desc}
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Healing levels preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="relative z-10 mt-14 flex flex-wrap justify-center gap-2 pb-2 max-w-5xl"
        >
          {[
            { label: "Broken", color: "bg-red-500/20 border-red-500/30 text-red-400" },
            { label: "Recovering", color: "bg-orange-500/20 border-orange-500/30 text-orange-400" },
            { label: "Detaching", color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400" },
            { label: "Detached", color: "bg-green-500/20 border-green-500/30 text-green-400" },
            { label: "Reborn", color: "bg-teal-500/20 border-teal-500/30 text-teal-400" },
            { label: "Unreachable", color: "bg-primary/20 border-primary/30 text-primary shadow-[0_0_20px_hsl(var(--primary)/0.3)]" },
          ].map((l, i) => (
            <motion.div 
              key={l.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.1 }}
              className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold ${l.color} transition-all`}
            >
              {l.label}
            </motion.div>
          ))}
        </motion.div>
        <p className="text-xs text-muted-foreground/40 mt-2">Your journey from day 0 to day 90+</p>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-5 lg:px-10 py-16 max-w-6xl mx-auto w-full">
        <h2 className="text-2xl font-black text-center mb-10">How it works</h2>
        <div className="space-y-6">
          {HOW_IT_WORKS.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 10 }}
              className="flex gap-4 items-start p-4 rounded-2xl hover:bg-card/30 transition-colors"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-xs font-black text-primary">{s.step}</span>
              </motion.div>
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
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Free forever
            </motion.span>
            <h2 className="text-2xl font-black mt-2">Start healing without paying a rupee</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {FEATURES_FREE.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -5, borderColor: 'hsl(var(--primary) / 0.5)' }}
                className="bg-background/60 border border-border/40 rounded-2xl p-4 transition-all cursor-pointer"
              >
                <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
                  <f.icon size={20} className="text-primary mb-2" />
                </motion.div>
                <h3 className="font-bold text-xs mb-1">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/onboarding">
              <motion.button
                data-testid="button-free-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all"
              >
                Start Free →
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* PRO FEATURES */}
      <section className="px-5 lg:px-10 py-16 max-w-6xl mx-auto w-full">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
              <Star size={11} fill="currentColor" />
            </motion.div>
            Pro Plan
          </motion.span>
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
              whileHover={{ x: 5, borderColor: 'hsl(var(--primary) / 0.5)' }}
              className="flex gap-4 items-start p-4 rounded-2xl bg-card/30 border border-border/40 hover:border-primary/30 transition-all cursor-pointer"
            >
              <motion.div 
                whileHover={{ rotate: 20 }}
                className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"
              >
                <f.icon size={15} className="text-primary" />
              </motion.div>
              <div>
                <h3 className="font-bold text-xs mb-0.5">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/upgrade">
            <motion.button
              data-testid="button-pro-upgrade"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-2xl border border-primary/40 bg-primary/10 text-primary font-bold text-sm hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all"
            >
              See Pro Plans →
            </motion.button>
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="px-5 py-16 bg-card/20 border-y border-border/20">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Users size={16} className="text-primary" />
              <p className="text-xs font-semibold text-primary">Real people, real results</p>
            </motion.div>
            <h2 className="text-2xl font-black">People are healing</h2>
          </div>
          <div className="space-y-4">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.02, borderColor: 'hsl(var(--primary) / 0.3)' }}
                className="bg-background/60 border border-border/40 rounded-2xl p-4 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl">{t.avatar}</span>
                  <div className="flex-1">
                    <p className="text-xs text-primary font-semibold">{t.handle}</p>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed">"{t.text}"</p>
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
              whileHover={{ borderColor: 'hsl(var(--border) / 0.6)' }}
              className="border border-border/40 rounded-2xl p-5 transition-all hover:bg-card/20"
            >
              <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 size={14} className="text-primary" />
                {f.q}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.a}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" 
          />
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
              whileHover={{ scale: 1.05, shadow: "0 0 50px hsl(var(--primary) / 0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-5 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-bold text-base shadow-[0_0_50px_hsl(var(--primary)/0.4)] hover:shadow-[0_0_70px_hsl(var(--primary)/0.6)] transition-all"
            >
              Start My Detox — It's Free
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* FOOTER */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="px-5 py-8 border-t border-border/20 text-center"
      >
        <p className="text-xs text-muted-foreground/40">
          © 2026 ExDetox · Built for breakup survivors ·{" "}
          <Link href="/upgrade"><span className="hover:text-primary cursor-pointer transition-colors">Pro</span></Link>
          {" · "}
          <span className="hover:text-primary cursor-pointer transition-colors">Privacy</span>
        </p>
      </motion.footer>
    </div>
  );
}
