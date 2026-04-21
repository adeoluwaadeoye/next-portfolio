'use client';

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import Link from 'next/link';

import { FaLinkedin } from 'react-icons/fa';
import { SiGithub, SiNextdotjs, SiTypescript, SiPostgresql, SiDocker, SiTailwindcss } from 'react-icons/si';
import { RiDownloadLine } from 'react-icons/ri'; 
import { FiArrowUpRight, FiActivity, FiZap } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center py-4 md:py-8 overflow-hidden bg-background">
      
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e5e5_0.8px,transparent_1px)] dark:bg-[radial-gradient(#27272a_0.8px,transparent_1px)] bg-size-[40px_40px] opacity-30 dark:opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-10 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-500 font-mono text-xs font-black uppercase tracking-[0.5em]">
              <FiActivity className="animate-pulse" />
              <span>ID_NODE_01</span>
            </div>
            <Separator orientation="vertical" className="h-4 opacity-30" />
            <span className="text-xs font-medium tracking-widest text-muted-foreground">
              STATUS: <span className="text-emerald-600 dark:text-emerald-500 font-semibold">ACTIVE_SESSION</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <SocialLink href="https://github.com/adeoluwaadeoye" icon={<SiGithub size={18} />} />
            <SocialLink href="https://linkedin.com/in/adeoyeadeoluwa" icon={<FaLinkedin size={18} />} />

            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="h-10 text-xs font-black uppercase tracking-widest border-border hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Link
                href="/assets/ADE_RESUME.pdf"
                download="Adeoluwa_Adeoye_Resume.pdf"
                className="flex items-center gap-2"
              >
                <RiDownloadLine className="w-4 h-4" />
                DOWNLOAD RESUME
              </Link>
            </Button>
          </div>
        </div>

        {/* MAIN HERO */}
        <div className="pt-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[3.2rem] leading-[0.9] sm:text-6xl md:text-7xl lg:text-[92px] xl:text-[110px] font-black tracking-[-2.5px] text-foreground">
              Architecting <br />
              <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
                High-Scale
              </span> <br />
              Solutions.
            </h1>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-7 space-y-12">
              <p className="text-lg sm:text-xl md:text-2xl leading-tight text-muted-foreground max-w-2xl">
                Fullstack developer crafting high-availability systems where 
                <span className="text-foreground font-semibold"> structural integrity</span> meets 
                <span className="text-primary font-medium"> aesthetic precision</span>.
              </p>

              {/* ACTION AREA & UNIFIED STACK */}
              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="h-14 text-base font-semibold group w-full sm:w-auto shadow-lg shadow-primary/20">
                    <Link href="#projects" className="flex items-center justify-center gap-3">
                      Initialize Work
                      <FiZap className="group-hover:rotate-12 transition-transform" />
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg" className="h-14 text-base font-semibold border-border hover:border-primary w-full sm:w-auto">
                    <Link href="#contact" className="flex items-center gap-2">
                      Get In Touch
                      <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>

                {/* Unified Stack Directly Under CTA */}
                <div className="relative pt-4">
                  <div className="flex flex-wrap gap-4 items-center">
                    <StackIcon icon={<SiNextdotjs />} label="Next.js" color="text-foreground" />
                    <StackIcon icon={<SiTypescript />} label="TypeScript" color="text-[#3178C6]" />
                    <StackIcon icon={<SiTailwindcss />} label="Tailwind" color="text-[#06B6D4]" />
                    <StackIcon icon={<SiPostgresql />} label="Postgres" color="text-[#4169E1]" />
                    <StackIcon icon={<SiDocker />} label="Docker" color="text-[#2496ED]" />
                  </div>
                  
                  {/* Parallel Animated Divider */}
                  <div className="relative mt-8 h-px w-full bg-border overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                      className="absolute inset-0 w-1/3 bg-linear-to-r from-transparent via-primary to-transparent opacity-50"
                    />
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 1 }}
                      className="absolute inset-0 w-1/2 bg-linear-to-r from-transparent via-violet-500 to-transparent opacity-30"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-x-12 gap-y-14 border-l border-border pl-8 lg:pl-8">
              <MetricItem label="Years Experience" value={5} suffix="+" accent="text-blue-600" />
              <MetricItem label="Deployments" value={30} suffix="+" accent="text-emerald-600" />
              <MetricItem label="System Uptime" value={99} suffix="%" accent="text-violet-600" />
              <MetricItem label="Optimization" value={100} suffix="%" accent="text-orange-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StackIcon({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all group">
      <span className={`${color} text-xl transition-transform group-hover:scale-110`}>
        {icon}
      </span>
      <span className="text-xs font-bold tracking-tight text-muted-foreground group-hover:text-foreground">
        {label}
      </span>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      className="p-3 border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/60 transition-all hover:-translate-y-1"
    >
      {icon}
    </Link>
  );
}

function MetricItem({ label, value, suffix, accent }: { 
  label: string; 
  value: number; 
  suffix: string; 
  accent: string;
}) {
  return (
    <div className="group">
      <div className="flex items-baseline gap-1">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground">
          <CountUp end={value} duration={2.5} enableScrollSpy scrollSpyOnce />
        </h2>
        <span className={`${accent} text-2xl font-bold`}>{suffix}</span>
      </div>
      <p className="mt-1 text-[12px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
        {label}
      </p>
    </div>
  );
}