'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import IntroLoader from '@/components/ui/IntroLoader';
import Contact from '@/components/sections/Contact';
import SkillsSection from '@/components/sections/Skills';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 2. Force scroll to top on initial mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}

      {/* Classy Grain Texture Overlay */}
      <div className="fixed inset-0 z-99 pointer-events-none opacity-[0.03] contrast-125 brightness-100 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main
        className={`min-h-screen bg-background transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isLoading ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 md:py-16 mt-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

            {/* 
                SIDEBAR CONTAINER 
                - lg:sticky: Only sticks on desktop.
                - lg:top-8: Positioning when stuck.
                - lg:self-start: Prevents height stretching.
                - On mobile/tablet, it flows normally (static).
            */}
            <aside className="w-full lg:w-80 lg:shrink-0 lg:sticky lg:top-8 lg:self-start">
              <Sidebar />
            </aside>

            {/* 
                MAIN CONTENT 
                - scroll-mt-32: Consistent offset for all sections to land below header.
            */}
            <div className="flex-1 min-w-0 space-y-8 pt-4 lg:pt-0">
              <section id="hero" className="scroll-mt-12">
                <Hero />
              </section>
              
              <section id="projects" className="scroll-mt-24">
                <Projects />
              </section>
              
              <section id="about">
                <About />
              </section>
              
              <section id="experience">
                <Experience />
              </section>
              
              <section id="skills" className="scroll-mt-16">
                <SkillsSection />
              </section>
              
              <section id="contact">
                <Contact />
              </section>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}