'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiNodedotjs, SiPostgresql, SiPrisma, SiDocker, 
  SiTerraform, SiGo, SiFramer, SiRedis, 
  SiMongodb, SiGraphql, SiKubernetes, SiPython, 
  SiOpenai, SiRust, SiVercel, SiSupabase, SiExpress, SiPostman
} from 'react-icons/si';
import { FaAws } from "react-icons/fa";
import { ChevronRight, Cpu } from 'lucide-react';

const TECH_CATEGORIES = [
  {
    id: "frontend",
    label: "Frontend",
    accent: "#61DAFB",
    items: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "Framer", icon: <SiFramer />, color: "#0055FF" },
      { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
    ]
  },
  {
    id: "backend",
    label: "Backend",
    accent: "#339933",
    items: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Express", icon: <SiExpress />, color: "#FFFFFF" },
      { name: "Go", icon: <SiGo />, color: "#00ADD8" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "Rust", icon: <SiRust />, color: "#FFFFFF" }, // Set to white for visibility
      { name: "GraphQL", icon: <SiGraphql />, color: "#E10098" },
    ]
  },
  {
    id: "database",
    label: "Database",
    accent: "#4169E1",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
      { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E" },
      { name: "Redis", icon: <SiRedis />, color: "#FF4438" },
      { name: "Prisma", icon: <SiPrisma />, color: "#5A67D8" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
    ]
  },
  {
    id: "devops",
    label: "DevOps & AI",
    accent: "#FF9900",
    items: [
      { name: "AWS", icon: <FaAws />, color: "#FF9900" },
      { name: "OpenAI", icon: <SiOpenai />, color: "#412991" },
      { name: "Vercel", icon: <SiVercel />, color: "#FFFFFF" },
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
      { name: "Terraform", icon: <SiTerraform />, color: "#7B42BC" },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
    ]
  }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState(TECH_CATEGORIES[0].id);

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-3 h-3 text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">Core Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Technical <span className="text-muted-foreground/80 italic">Stack.</span>
          </h2>
        </div>

        {/* Responsive Side-by-Side View */}
        <div className="flex flex-row gap-3 md:gap-8 items-start overflow-x-auto no-scrollbar pb-6">
          
          {/* Navigation - Smaller buttons on mobile */}
          <div className="flex flex-col gap-1.5 w-32 md:w-64 shrink-0">
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center justify-between p-3 md:p-5 rounded-lg border transition-all duration-300 ${
                  activeTab === cat.id 
                  ? "bg-secondary/10 border-primary/40 shadow-sm" 
                  : "bg-transparent border-border/30 hover:border-border"
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div 
                    className="w-0.5 h-3 md:h-5 rounded-full" 
                    style={{ backgroundColor: activeTab === cat.id ? cat.accent : 'transparent' }}
                  />
                  <span className={`text-[9px] md:text-xs font-bold uppercase tracking-wider ${
                    activeTab === cat.id ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {cat.label}
                  </span>
                </div>
                <ChevronRight className={`w-3 h-3 md:opacity-100 opacity-0 ${activeTab === cat.id ? "translate-x-0" : "-translate-x-2"}`} />
              </button>
            ))}
          </div>

          {/* Icon Display - Responsive Grid inside the flex container */}
          <div className="grow min-h-87.5 md:min-h-112.5 p-6 md:p-12 rounded-2xl md:rounded-4xl bg-secondary/5 border border-border/40 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6 md:gap-12"
              >
                {TECH_CATEGORIES.find(c => c.id === activeTab)?.items.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center md:items-start gap-3 group">
                    <div 
                      className={`text-3xl md:text-5xl transition-transform duration-300 group-hover:scale-110
                        ${(tech.color === "#FFFFFF") ? "invert dark:invert-0" : ""}
                        ${(tech.name === "Rust") ? "text-orange-600 dark:text-orange-500" : ""}`}
                      style={{ color: tech.name === "Rust" ? undefined : tech.color }}
                    >
                      {tech.icon}
                    </div>
                    <div className="text-center md:text-left space-y-1">
                      <span className="block text-[10px] md:text-xs font-mono font-bold uppercase text-foreground/70 group-hover:text-foreground transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Background ID Watermark */}
            <div className="absolute -bottom-2 -right-1 md:bottom-6 md:right-8 text-4xl md:text-6xl font-black opacity-30 pointer-events-none italic uppercase select-none">
              {activeTab}
            </div>
          </div>
        </div>

        {/* Minimal Footer Info */}
        <div className="mt-8 flex items-center text-foreground justify-between text-[8px] font-mono uppercase tracking-[0.4em]">
          <span>End_Transmission</span>
          <span>Load_Time: 0.002s</span>
        </div>
      </div>
    </section>
  );
}