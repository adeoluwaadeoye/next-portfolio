'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    FiActivity,
    FiCpu,
    FiDatabase,
    FiGlobe,
    FiTerminal,
} from 'react-icons/fi';
import { Badge } from '@/components/ui/badge';


const DOMAINS = [
    {
        id: 'fe',
        index: '01',
        title: 'Frontend Architecture',
        meta: 'UI · DX · Performance',
        icon: FiGlobe,
        description:
            'Building resilient, type-safe interfaces with atomic design principles and buttery runtime performance across every viewport and device.',
        skills: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Shadcn/UI'],
        level: 95,
        color: '#3b82f6',
    },
    {
        id: 'be',
        index: '02',
        title: 'Backend Engineering',
        meta: 'APIs · Databases · Scale',
        icon: FiDatabase,
        description:
            'Architecting scalable microservices and high-concurrency database systems built for real-world load, fault tolerance, and low-latency reads.',
        skills: ['Node.js', 'PostgreSQL', 'Redis', 'Supabase', 'Prisma'],
        level: 88,
        color: '#10b981',
    },
    {
        id: 'ops',
        index: '03',
        title: 'Cloud & Infrastructure',
        meta: 'DevOps · IaC · Containers',
        icon: FiCpu,
        description:
            'Automating deployment pipelines and managing highly available containerized environments at scale with zero-downtime release strategies.',
        skills: ['Docker', 'AWS', 'CI/CD', 'Vercel', 'Terraform'],
        level: 82,
        color: '#f97316',
    },
    {
        id: 'logic',
        index: '04',
        title: 'Core Logic & Systems',
        meta: 'Algorithms · Architecture · Design',
        icon: FiTerminal,
        description:
            'Algorithm optimization, clean architecture patterns, and translating complex requirements into elegant, maintainable systems built to last.',
        skills: ['Python', 'GraphQL', 'REST APIs', 'Unit Testing', 'System Design'],
        level: 92,
        color: '#a855f7',
    },
];

export default function SkillsSection() {
    return (
        <section className="relative bg-background py-24 overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-size-[40px_40px] opacity-30 dark:opacity-15 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <Badge
                        variant="outline"
                        className="mb-7 border-primary/40 text-primary px-5 py-1.5 bg-background/50 backdrop-blur-sm"
                    >
                        <FiActivity className="mr-2 animate-pulse" /> CORE SYSTEMS ONLINE
                    </Badge>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.88] uppercase text-foreground">
                            Technical<br />
                            <span className="bg-linear-to-r from-primary via-violet-500 to-emerald-500 bg-clip-text text-transparent italic">
                                Expertise.
                            </span>
                        </h1>
                        <p className="md:max-w-65 text-muted-foreground text-sm leading-relaxed md:text-right md:pb-1">
                            Engineering digital ecosystems that scale, perform, and endure across every layer of the stack.
                        </p>
                    </div>
                </motion.div>

                {/* ── Domain entries — always fully visible ── */}
                <div className="border-t border-border mb-20">
                    {DOMAINS.map((domain, idx) => {
                        const Icon = domain.icon;
                        return (
                            <motion.div
                                key={domain.id}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.55, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                className="relative grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 py-14 border-b border-border overflow-hidden"
                            >
                                {/* Ghost watermark number */}
                                <div
                                    className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none hidden md:block"
                                    style={{
                                        fontSize: 'clamp(100px, 16vw, 220px)',
                                        color: domain.color,
                                        opacity: 0.04,
                                        lineHeight: 0.85,
                                    }}
                                >
                                    {domain.index}
                                </div>

                                {/* LEFT — identity + description */}
                                <div className="space-y-5 relative">
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono text-[10px] text-muted-foreground/40 font-bold tabular-nums select-none">
                                            {domain.index}
                                        </span>
                                        <Icon size={13} style={{ color: domain.color }} />
                                        <span
                                            className="font-mono text-[10px] uppercase tracking-[0.22em] font-bold"
                                            style={{ color: domain.color }}
                                        >
                                            {domain.meta}
                                        </span>
                                    </div>

                                    <h2 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tighter leading-none">
                                        {domain.title}
                                    </h2>

                                    <p className="text-muted-foreground text-[15px] leading-relaxed max-w-md">
                                        {domain.description}
                                    </p>
                                </div>

                                {/* RIGHT — level bar + skills */}
                                <div className="space-y-8 relative">
                                    {/* Proficiency bar */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
                                            <span className="text-muted-foreground/60">Proficiency Index</span>
                                            <span style={{ color: domain.color }}>{domain.level}%</span>
                                        </div>

                                        {/* Segmented bar */}
                                        <div className="flex gap-0.75">
                                            {Array.from({ length: 20 }).map((_, i) => {
                                                const filled = i < Math.round(domain.level / 5);
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        className="flex-1 h-1.25 rounded-[1px]"
                                                        style={{
                                                            backgroundColor: filled ? domain.color : undefined,
                                                        }}
                                                        initial={{ opacity: 0, scaleY: 0 }}
                                                        whileInView={{
                                                            opacity: filled ? 1 : 0.12,
                                                            scaleY: 1,
                                                            backgroundColor: filled ? domain.color : 'hsl(var(--border))',
                                                        }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            duration: 0.3,
                                                            delay: 0.1 + i * 0.025,
                                                            ease: 'easeOut',
                                                        }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground/50 mb-4">
                                            Core Stack
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {domain.skills.map((skill, i) => (
                                                <motion.span
                                                    key={skill}
                                                    initial={{ opacity: 0, y: 6 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-border/70 bg-card/40 text-foreground hover:border-accent hover:text-accent transition-colors duration-200 cursor-default"
                                                    style={{ '--accent': domain.color } as React.CSSProperties}
                                                >
                                                    <span
                                                        className="w-1 h-1 rounded-full shrink-0"
                                                        style={{ backgroundColor: domain.color }}
                                                    />
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
