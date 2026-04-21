'use client';

import { useEffect, useState } from 'react';

const SEQUENCE = [
    { delay: 200,  text: 'INITIALIZING' },
    { delay: 600,  text: 'LOADING ASSETS' },
    { delay: 1050, text: 'MOUNTING SYSTEMS' },
    { delay: 1500, text: 'READY' },
];

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const [status, setStatus] = useState('BOOTING');
    const [progress, setProgress] = useState(0);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        SEQUENCE.forEach(({ delay, text }, i) => {
            setTimeout(() => {
                setStatus(text);
                setProgress(Math.round(((i + 1) / SEQUENCE.length) * 100));
            }, delay);
        });

        const exitTimer = setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 700);
        }, 2100);

        return () => clearTimeout(exitTimer);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-200 flex flex-col items-center justify-center bg-background transition-all duration-700 ease-in-out ${
                exiting ? 'opacity-0 -translate-y-3 pointer-events-none' : 'opacity-100 translate-y-0'
            }`}
        >
            {/* Perspective warp grid — theme-aware via CSS vars */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.18] dark:opacity-[0.25]"
                    style={{ perspective: '500px', perspectiveOrigin: '50% 50%' }}
                >
                    <div
                        className="absolute inset-0 animate-[warp_2s_linear_infinite]"
                        style={{
                            backgroundImage: `
                                linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                                linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                            transform: 'rotateX(60deg) translateY(0)',
                            transformOrigin: 'top',
                            maskImage: 'linear-gradient(to bottom, transparent, black 40%, transparent)',
                        }}
                    />
                </div>
            </div>

            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center gap-10">

                {/* Glow orb */}
                <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full scale-[2] pointer-events-none" />

                {/* Logotype */}
                <div className="relative">
                    <h1 className="text-7xl md:text-9xl font-black tracking-[0.12em] uppercase text-foreground leading-none select-none">
                        ADE
                        <span className="bg-linear-to-r from-primary via-violet-500 to-primary bg-clip-text text-transparent">
                            .
                        </span>
                    </h1>
                    {/* Subtle ghost duplicate for depth */}
                    <span
                        aria-hidden
                        className="absolute top-0 left-0 text-7xl md:text-9xl font-black tracking-[0.12em] uppercase text-foreground opacity-[0.04] translate-x-0.75 translate-y-0.75 pointer-events-none select-none"
                    >
                        ADE.
                    </span>
                </div>

                {/* Status + progress */}
                <div className="flex flex-col items-center gap-4 w-64">
                    <div className="flex justify-between w-full px-0.5 font-mono text-[10px] tracking-widest uppercase">
                        <span className="text-primary font-bold">{status}</span>
                        <span className="text-muted-foreground">{progress}%</span>
                    </div>

                    {/* Track */}
                    <div className="relative w-full h-px bg-border overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <p className="text-[9px] font-mono text-muted-foreground/50 tracking-[0.2em] uppercase">
                        Adeoluwa Adeoye · Portfolio
                    </p>
                </div>
            </div>
        </div>
    );
}
