'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectModal from '@/components/projects/ProjectModal';
import { TechIcon } from "@/components/icons/TechIcon";

// Shadcn UI
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

type Project = (typeof projects)[number];

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-16 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* 1. HEADER - Enhanced Spacing & Impact */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-8 sm:mb-12">
          <div className="space-y-6 max-w-3xl">
            <Badge variant="outline" className="px-5 py-2 uppercase tracking-[0.3em] text-[10px] font-black border-primary bg-primary/5 text-primary">
              Selected Work
            </Badge>
            <h2 className="text-5xl sm:text-8xl font-black tracking-tighter text-foreground leading-[0.85] uppercase">
              Built for impact,<br />
              <span className="text-primary">engineered for scale.</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg sm:text-xl max-w-sm border-l-4 border-primary pl-6 py-2 font-medium leading-relaxed">
            A curated selection of full-stack applications showcasing architecture and performance.
          </p>
        </div>

        {/* 2. PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.slice(0, 4).map((project, index) => {
            const isLarge = index % 3 === 0;
            return (
              <Card
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`group cursor-pointer overflow-hidden border-2 border-border bg-secondary/10  transition-all duration-500  shadow-none hover:shadow-2xl active:scale-[0.99] touch-manipulation ${isLarge ? 'md:col-span-2' : 'md:col-span-1'
                  }`}
              >
                <CardContent className="p-0">
                  {/* IMAGE SECTION - Added perspective for the tilt */}
                  <div className="relative w-full aspect-16/10 sm:aspect-video overflow-hidden border-b-2 border-border group-hover:border-primary/20 transition-colors perspective-[1000px]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      // Added: -rotate-2 and scale-110 on hover for the "Tilt + Zoom" effect
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-2 group-hover:translate-y-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
                      priority={index === 0}
                    />

                    {/* Overlay for Desktop */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center backdrop-blur-sm">
                      <div className="bg-white text-black  px-8 py-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 font-black flex items-center gap-3 uppercase text-sm tracking-widest">
                        View Project <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* CONTENT SECTION */}
                  <div className={`p-8 sm:p-12 ${!isLarge ? 'sm:p-8' : ''}`}>
                    <div className={`flex flex-col gap-6 ${isLarge ? 'lg:flex-row lg:items-center lg:justify-between' : ''}`}>

                      {/* Text Side - Title now wraps fully */}
                      <div className="space-y-3 flex-1 min-w-0">
                        <span className="text-[11px] font-black tracking-[0.25em] text-primary uppercase">
                          {project.category}
                        </span>
                        {/* Removed 'truncate' and added 'whitespace-normal' */}
                        <h3 className={`${isLarge ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-4xl'} font-black text-foreground uppercase tracking-tight leading-tight whitespace-normal`}>
                          {project.title}
                        </h3>
                      </div>

                      {/* Stack Side */}
                      <div className="flex flex-row flex-nowrap items-center gap-2 sm:gap-3 shrink-0">
                        {project.stack.slice(0, 4).map((tech) => (
                          <div
                            key={tech}
                            className="w-11 h-11 sm:w-14 sm:h-14 border-2 border-border bg-background flex items-center justify-center shadow-sm group-hover:border-primary/30 transition-all hover:scale-110 hover:shadow-md"
                          >
                            <TechIcon name={tech} className="w-6 h-6 sm:w-7 sm:h-7" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 3. FOOTER - Massive Call to Action */}
        <div className="mt-4 sm:mt-6 text-center">
          <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent mb-16" />
          <div className="inline-block group">
            <p className="text-muted-foreground text-xs font-black uppercase tracking-[0.3em] mb-6">Want to see the underlying logic?</p>
            <Link
              href="https://github.com/adeoluwaadeoye"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-3xl sm:text-5xl font-black text-foreground hover:text-primary transition-all inline-flex items-center gap-4 uppercase tracking-tighter"
            >
              Explore the Codebases
              <span className="bg-primary text-white p-4 rounded-full group-hover:rotate-12 group-hover:scale-110 transition-all shadow-xl shadow-primary/20">
                <ArrowUpRight className="w-8 h-8 sm:w-10 sm:h-10" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}