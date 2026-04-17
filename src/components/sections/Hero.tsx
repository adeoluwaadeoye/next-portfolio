'use client';

import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import Link from 'next/link';

// React Icons
import { FaLinkedin } from 'react-icons/fa';
import { SiGithub } from 'react-icons/si';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { RiCommandLine } from 'react-icons/ri';
import { FiMousePointer } from 'react-icons/fi';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="relative flex flex-col justify-start overflow-hidden w-full py-4">
      
      {/* 1. BACKGROUND DECOR */}
      <div className="absolute -top-12 -right-12 z-0 pointer-events-none hidden md:block">
        <div className="w-96 h-96 bg-primary opacity-10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full">
        <div className="flex flex-col space-y-10 md:space-y-14">
          
          {/* STATUS & SOCIALS */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-primary bg-primary/5 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-[11px] font-black tracking-widest uppercase text-foreground">
                Active for hire
              </span>
            </div>
            
            <div className="flex items-center gap-5 text-foreground">
              <Link href="https://www.github.com/adeoluwaadeoye" target="_blank" className="hover:text-primary transition-transform hover:scale-120">
                <SiGithub size={24} />
              </Link>
              <Link href="https://www.linkedin.com/in/adeoyeadeoluwa" target="_blank" className="hover:text-primary transition-transform hover:scale-120">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </motion.div>

          {/* MASSIVE RESPONSIVE TYPOGRAPHY */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl sm:text-8xl lg:text-[clamp(5rem,9vw,9rem)] font-black leading-[0.8] tracking-tighter text-foreground uppercase"
            >
              FULLSTACK <br />
              <span className="text-primary/80">
                DEVELOPER
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-2xl text-xl sm:text-2xl text-muted-foreground leading-relaxed font-medium border-l-4 border-primary pl-6 py-1"
            >
              Building high-availability systems and <span className="text-foreground font-bold">bespoke digital solutions</span>. I bridge the gap between complex engineering and elegant design.
            </motion.p>
          </div>

          {/* ACTIONS */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col sm:flex-row gap-4 pt-2"
          >
            <Button asChild size="lg" className="w-full sm:w-auto rounded-xl h-16 px-10 text-lg font-black group shadow-xl">
              <Link href="#projects">
                See My Work 
                <HiOutlineArrowNarrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-xl h-16 px-10 text-lg font-black border-2 transition-all active:scale-95">
              <Link href="/contact">
                Get In Touch
                <FiMousePointer className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          {/* METRICS - Adjusted for massive numbers side-by-side */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-row items-center justify-between gap-1 sm:gap-10 pt-12 border-t-2 border-border"
          >
            <Metric label="Experience" value={5} suffix="+" />
            <div className="h-10 w-px bg-border/50" />
            <Metric label="Projects" value={30} suffix="+" />
            <div className="h-10 w-px bg-border/50" />
            <Metric label="Uptime" value={99} suffix="%" />
          </motion.div>

          {/* TECH CHIPS - Optimized for Mobile Arrangement */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 pt-4">
            <span className="flex items-center gap-2 text-[11px] md:text-[13px] font-medium tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground uppercase">
              <RiCommandLine className="text-primary w-4 h-4 md:w-5 md:h-5" />
              Main Stack:
            </span>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {['Next.js 15', 'Cloud Native', 'PostgreSQL'].map(tech => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="bg-secondary text-[11px] md:text-[14px] font-normal tracking-wide px-3 md:px-5 py-1.5 md:py-2 rounded-lg border-none text-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, suffix }: { label: string, value: number, suffix: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start flex-1 group">
      <h2 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-foreground flex items-baseline gap-0.5 tabular-nums group-hover:text-primary transition-colors">
        <CountUp end={value} duration={3} enableScrollSpy scrollSpyOnce />
        <span className="text-primary text-xl xs:text-2xl sm:text-4xl md:text-7xl transition-transform group-hover:scale-110">
          {suffix}
        </span>
      </h2>
      <p className="text-[8px] sm:text-[12px] font-black uppercase tracking-widest sm:tracking-[0.2em] text-muted-foreground group-hover:text-foreground transition-colors truncate">
        {label}
      </p>
    </div>
  );
}