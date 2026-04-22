'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Briefcase, 
  CheckCircle2, 
  Zap, 
  Trophy,  
  Cpu 
} from 'lucide-react';

import { timelineData } from '@/data/experience';

const Experience = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="relative py-24 lg:py-32 tablet-landscape:py-14 bg-background overflow-hidden">
      
      {/* Fixed Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-violet-500 to-emerald-500 z-50 origin-left"
        style={{ scaleX }}
      />

      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 tablet-landscape:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="w-5 h-5 text-primary" />
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-black uppercase tracking-[0.5em] text-muted-foreground">
                EXECUTION LOG
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-foreground">
              Work<br />
              <span className="bg-linear-to-r from-primary via-violet-500 to-emerald-500 bg-clip-text text-transparent">
                History.
              </span>
            </h2>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 sm:gap-8 p-5 sm:p-8 rounded-3xl bg-card border border-border w-full lg:w-auto"
          >
            <div className="text-center flex-1">
              <p className="text-3xl sm:text-4xl font-black text-primary">5+</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">Years Exp</p>
            </div>
            <div className="w-px bg-border shrink-0" />
            <div className="text-center flex-1">
              <p className="text-3xl sm:text-4xl font-black text-primary">40%</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">Dev Boost</p>
            </div>
            <div className="w-px bg-border shrink-0" />
            <div className="text-center flex-1">
              <p className="text-3xl sm:text-4xl font-black text-primary">15+</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground mt-1">Projects</p>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-border to-transparent" />

          <div className="space-y-24">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-12 md:gap-16 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-card border-4 border-primary flex items-center justify-center z-20 shadow-xl">
                  <Trophy className="w-7 h-7 text-primary" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 pl-14 md:pl-0 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                  <div className="group relative p-1 rounded-3xl bg-linear-to-br from-primary/10 to-transparent hover:from-primary/20 transition-all duration-500">
                    <div className="bg-card border border-border rounded-3xl p-8 md:p-10 transition-all hover:shadow-2xl">
                      
                      {/* Period & Role */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <span className="inline-block px-4 py-1.5 text-xs font-bold rounded-full bg-primary/10 text-primary mb-3">
                            {item.period}
                          </span>
                          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                            {item.era}
                          </h3>
                        </div>

                        <div className="p-3 bg-secondary rounded-2xl">
                          <Briefcase className="w-6 h-6 text-muted-foreground" />
                        </div>
                      </div>

                      <p className="text-xl font-semibold text-primary mb-6">
                        {item.company}
                      </p>

                      {/* Impact Points */}
                      <div className="space-y-5 mb-10">
                        {item.impact.map((point, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="mt-1.5 shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-border">
                        {item.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-4 py-1.5 text-xs font-medium rounded-full bg-secondary text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-all"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Side Element */}
                <div className="hidden md:block w-5/12">
                  <motion.div 
                    whileHover={{ scale: 1.08, rotate: 8 }}
                    className="flex justify-center items-center h-full opacity-40 group-hover:opacity-70 transition-all duration-500"
                  >
                    <Zap className="w-24 h-24 text-primary/20" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;