'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background transition-colors duration-300">
      <div className="relative flex flex-col items-center">
        
        {/* The "TV Beam" Loader */}
        <div className="relative h-1 w-48 sm:w-64 bg-muted overflow-hidden rounded-full mb-8">
          {/* Main fast-moving line */}
          <div className="absolute inset-0 bg-primary animate-tv-beam" />
          {/* Glow effect for that "Electrical" feel */}
          <div className="absolute inset-0 bg-primary blur-md animate-tv-beam" />
        </div>

        {/* Professional Minimalist Text */}
        <div className="overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground animate-reveal-up">
             Initializing
          </p>
        </div>

        {/* Decorative corner accents for a "Terminal" look */}
        <div className="absolute -inset-10 pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
        </div>
      </div>
    </div>
  );
}