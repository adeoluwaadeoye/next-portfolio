'use client';

import Image from 'next/image';
import { VscGithub } from 'react-icons/vsc';
import { RiExternalLinkFill } from 'react-icons/ri';
import Link from 'next/link';
import { X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';   // ← Fixed: Added this import

import { TechIcon } from "@/components/icons/TechIcon";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from 'react';   // ← Removed unused useEffect

type Project = {
    id: number;
    title: string;
    description: string;
    stack: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    category?: string;
};

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    if (!project) return null;

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const scrollTop = target.scrollTop;
        const scrollHeight = target.scrollHeight;
        const clientHeight = target.clientHeight;

        const progress = Math.min(
            Math.max(((scrollTop) / (scrollHeight - clientHeight)) * 100, 0),
            100
        );
        setScrollProgress(progress);
    };

    return (
        <Dialog open={!!project} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent className="max-w-[95vw] md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden border-border bg-background shadow-2xl">

                {/* Floating Close Button */}
                <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-background/90 backdrop-blur-md p-2.5 border border-border hover:bg-destructive hover:text-white transition-all hover:scale-105">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <ScrollArea 
                    className="max-h-[92vh] w-full" 
                    onScrollCapture={handleScroll}
                    ref={scrollRef}
                >
                    <div className="flex flex-col relative">

                        {/* 1. Hero Image Section */}
                        <div className="relative aspect-video w-full overflow-hidden group">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(max-width: 768px) 95vw, (max-width: 1024px) 896px, 1024px"
                                priority
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

                            {/* Scroll Down Indicator */}
                            <div 
                                className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-500 z-10
                                    ${scrollProgress > 20 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                            >
                                <span className="text-[12px] font-mono font-extrabold tracking-[2px] text-muted-background mb-2">
                                    SCROLL TO EXPLORE
                                </span>
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <ChevronDown className="h-8 w-8 text-primary/70" />
                                </motion.div>
                            </div>
                        </div>

                        {/* 2. Content Section */}
                        <div className="px-6 py-10 sm:px-12 sm:py-14">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                                {/* Left Column: Story & Info */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="space-y-4">
                                        <Badge 
                                            variant="outline" 
                                            className="px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-bold border-primary/30 text-primary bg-primary/5"
                                        >
                                            {project.category || 'Featured Project'}
                                        </Badge>
                                        <DialogTitle className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                                            {project.title}
                                        </DialogTitle>
                                    </div>

                                    <DialogDescription className="text-lg sm:text-xl leading-relaxed text-muted-foreground">
                                        {project.description}
                                    </DialogDescription>
                                </div>

                                {/* Right Column: Tech & Actions */}
                                <div className="lg:col-span-5 space-y-10">

                                    {/* Tech Stack */}
                                    <div className="space-y-5">
                                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-3">
                                            <span className="flex-1 h-px bg-border" />
                                            CORE STACK
                                            <span className="flex-1 h-px bg-border" />
                                        </h4>

                                        <div className="grid grid-cols-2 gap-3">
                                            {project.stack.map((tech) => (
                                                <div
                                                    key={tech}
                                                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-border/50 bg-secondary/5 hover:bg-secondary/30 hover:border-border transition-all group"
                                                >
                                                    <div className="transition-transform group-hover:scale-110">
                                                        <TechIcon name={tech} className="h-9 w-9" />
                                                    </div>
                                                    <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground truncate">
                                                        {tech}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Call to Actions */}
                                    <div className="flex flex-col gap-4 pt-6">
                                        {project.liveUrl && (
                                            <Button 
                                                asChild 
                                                size="lg" 
                                                className="w-full h-16 text-base font-bold rounded-xl shadow-lg"
                                            >
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    Live Preview
                                                    <RiExternalLinkFill className="ml-2 h-5 w-5" />
                                                </Link>
                                            </Button>
                                        )}

                                        {project.githubUrl && (
                                            <Button 
                                                asChild 
                                                variant="outline" 
                                                size="lg" 
                                                className="w-full h-16 text-base font-bold rounded-xl border-2"
                                            >
                                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    View Source Code
                                                    <VscGithub className="ml-2 h-5 w-5" />
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}