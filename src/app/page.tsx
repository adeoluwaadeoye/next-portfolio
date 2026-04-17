'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import TechStack from '@/components/sections/TechStack';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import IntroLoader from '@/components/ui/IntroLoader'; 

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Engineer the scroll lock and reset
  useEffect(() => {
    if (isLoading) {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <>
      {/* 1. INTRO SEQUENCE */}
      {isLoading && <IntroLoader onComplete={() => setIsLoading(false)} />}

      {/* 2. MAIN CONTENT REVEAL */}
      <main 
        className={`min-h-screen bg-background mt-18 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isLoading 
            ? 'opacity-0 scale-95 blur-2xl translate-y-10' 
            : 'opacity-100 scale-100 blur-0 translate-y-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

            {/* SIDEBAR */}
            <aside className="w-full lg:w-95 lg:shrink-0 lg:sticky lg:top-8 lg:self-start">
              <Sidebar />
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 min-w-0 space-y-4 lg:space-y-8 pt-4 lg:pt-2">
              <Hero />
              <Projects />
              <About />
              <TechStack />
              <Experience />
            </div>

          </div>
        </div>
      </main>
    </>
  );
}