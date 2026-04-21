'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Smartphone, Layers, Cloud, Network, Lightbulb,
  ArrowRight, CheckCircle2, ChevronDown, ChevronUp,
  Zap, Clock, Users, Award, Rocket, MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Service {
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  stack: string[];
  delivery: string;
  color: string;
}

const services: Service[] = [
  {
    title: 'Full-Stack Development',
    tagline: 'Scalable. Modern. Performant.',
    description: 'End-to-end web applications built with Next.js, TypeScript, and cloud-native architectures that scale from MVP to millions of users.',
    icon: <Code2 className="w-7 h-7" />,
    features: ['Custom Web Applications', 'RESTful & GraphQL APIs', 'Database Architecture', 'Auth & Authorization'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis'],
    delivery: '4–12 weeks',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    title: 'Mobile Development',
    tagline: 'iOS & Android. One codebase.',
    description: 'Cross-platform mobile apps using React Native and Expo — pixel-perfect UI, native animations, and 60fps performance on both platforms.',
    icon: <Smartphone className="w-7 h-7" />,
    features: ['React Native / Expo', 'Offline-First Architecture', 'Push Notifications', 'App Store Publishing'],
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
    delivery: '6–14 weeks',
    color: 'from-violet-600 to-purple-500',
  },
  {
    title: 'UI/UX Architecture',
    tagline: 'Design systems that scale.',
    description: 'Component-driven design systems and accessible interfaces that close the gap between Figma and production — with zero layout drift.',
    icon: <Layers className="w-7 h-7" />,
    features: ['Design Systems & Tokens', 'Interactive Prototypes', 'WCAG Accessibility', 'Storybook Documentation'],
    stack: ['Figma', 'Tailwind', 'Storybook', 'Framer Motion'],
    delivery: '2–6 weeks',
    color: 'from-rose-600 to-orange-500',
  },
  {
    title: 'Cloud & DevOps',
    tagline: 'Ship faster. Break less.',
    description: 'Infrastructure as code, automated CI/CD pipelines, and containerized deployments — so your team ships confidently without touching servers.',
    icon: <Cloud className="w-7 h-7" />,
    features: ['Docker & Kubernetes', 'GitHub Actions Pipelines', 'AWS / Vercel / Railway', 'Monitoring & Alerting'],
    stack: ['Docker', 'AWS', 'Terraform', 'GitHub Actions'],
    delivery: '1–4 weeks',
    color: 'from-cyan-600 to-teal-500',
  },
  {
    title: 'API Design & Integration',
    tagline: 'Clean contracts. Zero ambiguity.',
    description: 'API-first design with OpenAPI specs, type-safe client generation, and third-party integrations — Stripe, Twilio, Clerk, and beyond.',
    icon: <Network className="w-7 h-7" />,
    features: ['OpenAPI / tRPC Design', 'Third-Party Integrations', 'Webhook Architecture', 'SDK Generation'],
    stack: ['REST', 'GraphQL', 'tRPC', 'OpenAPI'],
    delivery: '1–3 weeks',
    color: 'from-emerald-600 to-green-500',
  },
  {
    title: 'Technical Consulting',
    tagline: 'Clarity when it matters most.',
    description: 'Architecture audits, code reviews, and engineering roadmaps for teams that need an outside perspective before making big decisions.',
    icon: <Lightbulb className="w-7 h-7" />,
    features: ['Architecture Reviews', 'Code & Security Audits', 'Team Mentoring', 'Roadmap Planning'],
    stack: ['System Design', 'Code Review', 'Docs', 'ADRs'],
    delivery: 'On-demand',
    color: 'from-amber-500 to-yellow-400',
  },
];

const PROCESS = [
  {
    step: '01',
    title: 'Discovery Call',
    desc: 'We map out your goals, constraints, and success criteria in a focused 60-minute session.',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    step: '02',
    title: 'Architecture Plan',
    desc: 'I deliver a detailed technical proposal — stack, milestones, and delivery timeline.',
    icon: <Layers className="w-5 h-5" />,
  },
  {
    step: '03',
    title: 'Build & Iterate',
    desc: 'Weekly demos, async updates, and a staging environment from day one.',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    step: '04',
    title: 'Ship & Support',
    desc: 'Production deploy with docs, monitoring, and a 30-day support window.',
    icon: <Rocket className="w-5 h-5" />,
  },
];

const FAQS = [
  {
    q: 'How long does a typical project take?',
    a: 'It depends on scope — a focused MVP takes 4–6 weeks; a full-scale product is typically 3–4 months. I break work into two-week sprints so you see progress constantly.',
  },
  {
    q: 'Do you work with existing codebases or only greenfield?',
    a: 'Both. I regularly jump into legacy codebases for refactors, audits, and feature additions. An architecture review is often the best first step for existing projects.',
  },
  {
    q: 'What is your availability and timezone?',
    a: 'I am based in West Africa (WAT/GMT+1) and available for async collaboration globally. For real-time calls I accommodate EU and US timezones with advance scheduling.',
  },
  {
    q: 'Do you offer retainer or ongoing support arrangements?',
    a: 'Yes — I offer monthly retainer packages for teams that need ongoing engineering capacity, code reviews, and architectural guidance without a full-time hire.',
  },
  {
    q: 'What happens if the scope changes mid-project?',
    a: 'Scope changes are normal. I handle them with a transparent change-order process — no surprise bills. We agree on the delta before any additional work begins.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/60 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className="font-semibold text-base group-hover:text-primary transition-colors">{q}</span>
        {open
          ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
          : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <div className="py-8 mt-20 px-6 border-b border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="h-0.5 w-8 bg-primary" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Capabilities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95]"
          >
            Crafting Digital<br />
            <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Experiences.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            End-to-end engineering — from pixel-perfect UI to production infrastructure. I build things that work, scale, and last.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ─── SERVICES GRID ────────────────────────────────────────────── */}
        <div className="py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl border border-border bg-card overflow-hidden flex flex-col"
              >
                {/* glow */}
                <div className={`absolute -right-16 -top-16 w-48 h-48 rounded-full bg-linear-to-br ${service.color} blur-[80px] opacity-0 group-hover:opacity-15 transition-opacity duration-700`} />

                {/* index */}
                <div className="absolute top-5 right-5 text-[10px] font-black text-muted-foreground/25 tracking-widest">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <div className={`inline-flex p-3.5 rounded-2xl bg-linear-to-br ${service.color} text-white mb-6 shadow-lg w-fit`}>
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight mb-1">{service.title}</h3>
                  <p className="text-xs font-black uppercase tracking-widest text-primary mb-4">{service.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{service.description}</p>

                  {/* stack chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.stack.map(s => (
                      <span key={s} className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-secondary text-muted-foreground border border-border/50">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feat, fi) => (
                      <li key={fi} className="flex items-center gap-2.5 text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-200">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* delivery */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 pt-4 border-t border-border/50">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-semibold">Typical delivery:</span>
                    <span>{service.delivery}</span>
                  </div>

                  {/* THE CTA BUTTON: Adjusted for visibility in any theme */}
                  <Link href="/booking" className="block w-full">
                    <Button 
                      className="w-full group/btn bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300 border-0"
                    >
                      <span className="font-bold tracking-tight">Start a Project</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── HOW I WORK ───────────────────────────────────────────────── */}
        <div className="py-20 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-0.5 w-8 bg-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.95]">
              How I{' '}
              <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">Work.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-border/60 -translate-x-4 z-0" />
                )}
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                      {step.icon}
                    </div>
                    <span className="text-3xl font-black text-muted-foreground/20 leading-none">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── STATS ────────────────────────────────────────────────────── */}
        <div className="py-16 border-t border-border/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Rocket className="w-4 h-4" />, value: '50+', label: 'Projects Shipped' },
              { icon: <Users className="w-4 h-4" />, value: '30+', label: 'Happy Clients' },
              { icon: <Award className="w-4 h-4" />, value: '4', label: 'Design Awards' },
              { icon: <Zap className="w-4 h-4" />, value: '5 yrs', label: 'Experience' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="inline-flex items-center gap-1.5 text-primary mb-2 text-sm">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black italic mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── FAQ ──────────────────────────────────────────────────────── */}
        <div className="py-20 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-0.5 w-8 bg-primary" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.95]">
              Common{' '}
              <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">Questions.</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* ─── CTA ──────────────────────────────────────────────────────── */}
        <div className="py-0 mb-2 border-t border-border/50">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.95] mb-4">
              Ready to{' '}
              <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">build?</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Book a free 30-minute discovery call and let&apos;s scope your project together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/booking">
                <Button size="lg" className="px-8 font-black uppercase tracking-wider shadow-lg shadow-primary/20">
                  <Rocket className="w-4 h-4 mr-2" /> Book a Call
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="px-8 font-black uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 mr-2" /> Send a Message
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}