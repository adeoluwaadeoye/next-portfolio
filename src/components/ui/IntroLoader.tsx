'use client';

import { useEffect, useState } from 'react';

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = useState('Initializing');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const sequence = [
      { delay: 400, text: 'System Check...' },
      { delay: 900, text: 'Optimizing Assets...' },
      { delay: 1400, text: 'Welcome.' },
    ];

    sequence.forEach((s) => setTimeout(() => setStatus(s.text), s.delay));

    const timeout = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 700); 
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isExiting ? 'scale-[2] opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Brand */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 text-foreground italic">
          ADE<span className="text-primary not-italic">.</span>
        </h1>
        
        {/* Terminal Line */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-primary/40" />
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground w-45 text-center">
              {status}
            </p>
            <div className="h-px w-12 bg-primary/40" />
          </div>
          
          {/* Scanning Beam */}
          <div className="h-0.5 w-full bg-muted overflow-hidden rounded-full mt-2">
            <div className="h-full bg-primary animate-tv-beam w-1/3" />
          </div>
        </div>

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-[-100vh] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-size-[100%_4px,3px_100%] opacity-20" />
      </div>
    </div>
  );
}