'use client';

import Image from 'next/image';
import { VscGithub } from 'react-icons/vsc';
import { RiExternalLinkFill } from 'react-icons/ri';
import Link from 'next/link';
import { X } from 'lucide-react';

import { TechIcon } from "@/components/icons/TechIcon"; // Ensure path is correct
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
    if (!project) return null;

    return (
        <Dialog open={!!project} onOpenChange={(open: boolean) => !open && onClose()}>
            <DialogContent className="max-w-[95vw] md:max-w-4xl lg:max-w-5xl p-0 overflow-hidden border-border bg-background shadow-2xl transition-all duration-300">

                {/* Floating Close Button */}
                <DialogClose className="absolute right-4 top-4 z-20 rounded-full bg-destructive text-white p-2  backdrop-blur-md transition-all hover:scale-110 border border-border/50">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                </DialogClose>

                <ScrollArea className="max-h-[92vh] w-full">
                    <div className="flex flex-col">

                        {/* 1. Hero Image Section */}
                        <div className="relative aspect-video w-full overflow-hidden group">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                priority
                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            {/* Responsive Gradient Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-90" />
                        </div>

                        {/* 2. Content Section */}
                        <div className="px-6 py-8 sm:px-12 sm:py-12">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                                {/* Left Column: Story & Info */}
                                <div className="lg:col-span-7 space-y-8">
                                    <div className="space-y-4">
                                        <Badge variant="outline" className="px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-bold border-primary/30 text-primary bg-primary/5">
                                            {project.category || 'Featured Project'}
                                        </Badge>
                                        <DialogTitle className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
                                            {project.title}
                                        </DialogTitle>
                                    </div>

                                    <DialogDescription className="text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium">
                                        {project.description}
                                    </DialogDescription>

                                    {/* Optional: Add a "Key Features" or "Process" section here if you have the data */}
                                </div>

                                {/* Right Column: Tech & Actions */}
                                <div className="lg:col-span-5 space-y-10">

                                    {/* Tech Stack Grid - Now 2 columns even on mobile */}
                                    <div className="space-y-5">
                                        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.25em] flex items-center gap-3">
                                            <span className="w-6 h-px bg-border" />
                                            Core Stack
                                        </h4>

                                        {/* 'grid-cols-2' ensures they are side-by-side on all devices */}
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            {project.stack.map((tech) => (
                                                <div
                                                    key={tech}
                                                    className="flex items-center gap-2.5 px-3 py-3 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/20 hover:border-border transition-all duration-300 group"
                                                >
                                                    {/* Icon Wrapper */}
                                                    <div className="transition-transform group-hover:scale-110 duration-300">
                                                        <TechIcon name={tech} />
                                                    </div>

                                                    {/* Label - Truncated for very small screens to prevent layout breaking */}
                                                    <span className="text-[11px] sm:text-xs font-bold text-foreground/70 group-hover:text-foreground transition-colors truncate">
                                                        {tech}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Call to Actions - Stacked for better thumb-reach on mobile */}
                                    <div className="flex flex-col gap-3 pt-4">
                                        {project.liveUrl && (
                                            <Button asChild size="lg" className="w-full rounded-2xl font-bold h-16 text-sm shadow-xl shadow-primary/10 transition-all active:scale-95">
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    Live Preview
                                                    <RiExternalLinkFill className="ml-2 h-4 w-4" />
                                                </Link>
                                            </Button>
                                        )}

                                        {project.githubUrl && (
                                            <Button asChild variant="outline" size="lg" className="w-full rounded-2xl font-bold h-16 text-sm border-2 transition-all active:scale-95">
                                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    View Code
                                                    <VscGithub className="ml-2 h-4 w-4" />
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