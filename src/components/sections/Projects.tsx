'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMaximize2, FiGlobe, FiLayers, FiCpu, FiShield, FiBox } from 'react-icons/fi';
import { Zap } from 'lucide-react';
import { FaProjectDiagram } from "react-icons/fa";


import { projects } from '@/data/projects';
import ProjectModal from '@/components/projects/ProjectModal';

type Project = (typeof projects)[number];

const ACCENTS = ["text-blue-500", "text-emerald-500", "text-violet-500", "text-orange-500"];
const DIVIDER_ICONS = [FiCpu, FiShield, FiBox];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-4 max-w-6xl mx-auto px-6 relative">

      {/* 1. HEADER */}
      <div className="mb-8 md:mb-16">
        <div className="flex items-center gap-2 mb-2">
          <FaProjectDiagram className="w-4 h-4 text-primary" />
          <div className="h-0.5 w-8 bg-foreground" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Build_Archive
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-foreground">
          Selected<br />
          <span className="bg-linear-to-r from-primary via-violet-500 to-emerald-500 bg-clip-text text-transparent">
            Projects.
          </span>
        </h2>
      </div>

      {/* 2. PROJECT STACK */}
      <div className="space-y-4">
        {projects.slice(0, 4).map((project, index) => {
          const IconComponent = DIVIDER_ICONS[index % DIVIDER_ICONS.length];
          const accentColor = ACCENTS[index % ACCENTS.length];

          return (
            <div key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* BORDER LIGHT */}
                <div className="absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/40 transition-all duration-500 z-20 pointer-events-none" />

                <div className="relative overflow-hidden rounded-3xl border border-foreground/8 bg-secondary/5 transition-all duration-500 group-hover:bg-secondary/10">

                  {/* IMAGE VIEWPORT */}
                  <div
                    onClick={() => setActiveProject(project)}
                    className="relative w-full aspect-video bg-black cursor-pointer overflow-hidden"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) calc(100vw - 3rem), 1104px"
                      priority
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                    />

                    {/* CURVED "DIPPED" OVERLAY 
                        Radial gradient: Darker at corners (80% and 20% width), transparent in middle-top
                    */}
                    <div
                      className="absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none"
                      style={{
                        background: `linear-gradient(to top, var(--foreground) 0%, transparent 100%)`,
                        opacity: 0.15, // Subtle base layer
                        maskImage: `radial-gradient(55% 40% at 50% 100%, transparent 0%, black 100%)`,
                        WebkitMaskImage: `radial-gradient(55% 40% at 50% 100%, transparent 0%, black 100%)`,
                      }}
                    />

                    {/* Theme-Adaptive Corner Accents */}
                    <div
                      className="absolute inset-0 z-10 opacity-10 dark:opacity-20"
                      style={{
                        background: `
      radial-gradient(circle at 0% 100%, var(--foreground) 0%, transparent 25%),
      radial-gradient(circle at 100% 100%, var(--foreground) 0%, transparent 25%)
    `
                      }}
                    />

                    {/* SECONDARY ADAPTIVE HIGHLIGHT (Corner focus) */}
                    <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />

                    <div className="absolute bottom-4 right-4 z-10">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="p-3 rounded-full bg-primary text-white shadow-lg"
                      >
                        <FiMaximize2 size={18} />
                      </motion.div>
                    </div>
                  </div>

                  {/* SEPARATOR BAR */}
                  <div className="bg-foreground/3 border-y border-foreground/5 px-8 py-3 flex items-center justify-between">
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2 opacity-60">
                        <FiGlobe className={`w-3.5 h-3.5 ${accentColor}`} />
                        <span className="text-[8px] font-black uppercase tracking-widest text-foreground">Global_Deploy</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-60">
                        <FiLayers className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-foreground">Stack_Verified</span>
                      </div>
                    </div>
                    <div className="text-[8px] font-black font-mono opacity-30 text-foreground">PROT_V.4.0</div>
                  </div>

                  {/* DESCRIPTION AREA */}
                  <div className="px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Zap className={`w-3.5 h-3.5 fill-current ${accentColor}`} />
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest opacity-60">{project.category}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tighter">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {['Architecture', 'High_Performance', 'Secure'].map((label) => (
                          <span key={label} className="text-[7px] font-black uppercase border border-foreground/10 px-2 py-0.5 rounded opacity-40">
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveProject(project)}
                      className="w-full md:w-auto flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-primary hover:text-white"
                    >
                      Initialize <FiArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* PARALLEL LINE DIVIDER */}
              {index !== projects.length - 1 && (
                <div className="h-16 relative flex items-center justify-center w-full overflow-hidden">
                  <div className="absolute inset-0 flex flex-col justify-center gap-1.5 px-4">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-px w-full bg-linear-to-r from-transparent via-foreground/20 to-transparent"
                    />
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                      className="h-px w-full bg-linear-to-r from-transparent via-foreground/20 to-transparent"
                    />
                  </div>

                  <div className="relative z-10 bg-background px-6 py-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="flex items-center justify-center p-2 rounded-full border border-foreground/10 bg-secondary/5"
                    >
                      <IconComponent size={14} className="text-primary" />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}