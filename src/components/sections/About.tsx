'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
  FiArrowRight, FiLayers, FiSearch, FiSettings,
  FiShield, FiCpu, FiActivity, FiMail
} from 'react-icons/fi';

import { TechIcon } from "@/components/icons/TechIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const techStack = [
  "Next.js", "TypeScript", "React", "Node.js", "PostgreSQL",
  "Prisma", "Tailwind CSS", "Docker", "AWS", "Supabase"
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background py-24 lg:py-32 px-6 lg:px-8 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10 pointer-events-none">
        <svg className="w-full h-full" fill="none">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="1.5" fill="currentColor" className="text-muted-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-24"
        >

          {/* HERO SECTION */}
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="flex items-center gap-3">
              <FiCpu className="text-primary" size={22} />
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground">
                SYSTEM PROFILE v2.0
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-foreground">
              Engineering<br />
              <span className="bg-linear-to-r from-primary via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                Mindset.
              </span>
            </h1>

            <div className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Full-Stack Engineer who builds systems like living organisms — 
              optimized from database to edge, with performance and elegance in every layer.
            </div>
          </motion.section>

          {/* BIO */}
          <motion.section variants={itemVariants} className="max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              I specialize in <span className="text-foreground font-semibold">high-velocity architectures</span>
              {' — building systems that don\'t just work, but scale effortlessly while maintaining sub-second response times.'}
            </p>
            <p>
              My approach focuses on vertical integration: clean database schemas, type-safe logic, 
              and buttery-smooth client experiences. I believe great software should feel invisible to the user.
            </p>
          </motion.section>

          {/* PERFORMANCE VITALS */}
          <motion.section variants={itemVariants}>
            <Card className="border-border bg-card/80 backdrop-blur">
              <div className="p-8 border-b border-border flex items-center gap-3">
                <FiActivity className="text-primary animate-pulse" size={22} />
                <span className="uppercase text-xs font-black tracking-[0.5em]">Engineering Performance</span>
              </div>

              <CardContent className="p-8 grid md:grid-cols-3 gap-10">
                {[
                  { label: "Database I/O", value: 94, color: "bg-blue-500" },
                  { label: "Render Speed", value: 98, color: "bg-emerald-500" },
                  { label: "System Safety", value: 100, color: "bg-violet-500" },
                ].map((stat, i) => (
                  <div key={i} className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{stat.label}</span>
                      <span className="font-mono font-bold">{stat.value}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        viewport={{ once: true }}
                        className={`h-full ${stat.color} rounded-full`}
                        transition={{ duration: 1.2, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          {/* WORKFLOW */}
          <motion.section variants={itemVariants} className="space-y-10">
            <div className="uppercase text-xs font-black tracking-[0.5em] text-muted-foreground">Production Workflow</div>

            <div className="space-y-12">
              {[
                { icon: <FiSearch />, color: "text-blue-500", title: "Discovery & Audit", desc: "Deep analysis of requirements, legacy systems, and performance bottlenecks." },
                { icon: <FiLayers />, color: "text-violet-500", title: "Architecture & Design", desc: "Creating scalable, maintainable blueprints with atomic design principles." },
                { icon: <FiSettings />, color: "text-amber-500", title: "Implementation", desc: "Building clean, type-safe, high-performance code across the full stack." },
                { icon: <FiShield />, color: "text-emerald-500", title: "Testing & Hardening", desc: "Rigorous stress testing, security audits, and optimization cycles." },
              ].map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl bg-card border border-border flex items-center justify-center text-2xl ${step.color} group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-semibold tracking-tight mb-2">{step.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* TECH STACK - Infinite Marquee */}
          <motion.section variants={itemVariants} className="space-y-6">
            <div className="uppercase text-xs font-black tracking-[0.5em] text-muted-foreground">Core Technology Stack</div>

            <div className="relative overflow-hidden py-4">
              <motion.div
                className="flex gap-6 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              >
                {[...techStack, ...techStack].map((tech, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-card border border-border px-7 py-4 rounded-2xl hover:border-primary/50 transition-all group shrink-0"
                  >
                    <div className="w-9 h-9 flex items-center justify-center">
                      <TechIcon name={tech} className="w-9 h-9 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="font-semibold text-sm tracking-wide">{tech}</span>
                  </div>
                ))}
              </motion.div>

              {/* Fade Edges */}
              <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent z-10" />
            </div>
          </motion.section>

          {/* FINAL CTA */}
          <motion.section
            variants={itemVariants}
            className="bg-linear-to-br from-primary to-violet-600 text-primary-foreground rounded-3xl p-12 md:p-16 text-center"
          >
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                Ready to build the next<br />exceptional system?
              </h2>
              <p className="text-lg opacity-90">
                Currently open to exciting opportunities and challenging projects.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button asChild size="lg" variant="secondary" className="rounded-full h-14 px-10 font-bold">
                  <Link href="/projects">
                    Explore My Work <FiArrowRight className="ml-2" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="rounded-full h-14 px-10 font-bold border-white/30 hover:bg-white hover:text-primary">
                  <Link href="#contact">
                    Start a Conversation <FiMail className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}