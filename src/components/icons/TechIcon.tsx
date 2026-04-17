'use client';

import React from "react";
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss,
  SiFramer, SiNodedotjs, SiExpress, SiMongodb, SiPrisma, SiPostgresql,
  SiDocker, SiVercel, SiGit, SiGithub, SiClerk, SiResend, SiSupabase, SiFirebase
} from "react-icons/si";
import { FaAws, FaCss3 } from "react-icons/fa6";

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className }: TechIconProps) {
  // We define the components rather than the rendered nodes so we can pass props
  const icons: Record<string, React.ElementType> = {
    "Next.js": SiNextdotjs,
    "React": SiReact,
    "TypeScript": SiTypescript,
    "JavaScript": SiJavascript,
    "HTML5": SiHtml5,
    "CSS3": FaCss3,
    "Tailwind CSS": SiTailwindcss,
    "Framer Motion": SiFramer,
    "Node.js": SiNodedotjs,
    "Express": SiExpress,
    "MongoDB": SiMongodb,
    "Prisma": SiPrisma,
    "PostgreSQL": SiPostgresql,
    "Supabase": SiSupabase,
    "Firebase": SiFirebase,
    "Clerk": SiClerk,
    "Resend": SiResend,
    "Docker": SiDocker,
    "AWS": FaAws,
    "Vercel": SiVercel,
    "Git": SiGit,
    "GitHub": SiGithub,
  };

  const IconComponent = icons[name];

  if (!IconComponent) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
      </div>
    );
  }

  // Define brand colors to keep logic separate from JSX
  const brandColors: Record<string, string> = {
    "React": "text-[#61DAFB]",
    "TypeScript": "text-[#3178C6]",
    "JavaScript": "text-[#F7DF1E]",
    "HTML5": "text-[#E34F26]",
    "CSS3": "text-[#1572B6]",
    "Tailwind CSS": "text-[#06B6D4]",
    "Node.js": "text-[#339933]",
    "MongoDB": "text-[#47A248]",
    "PostgreSQL": "text-[#4169E1]",
    "Supabase": "text-[#3ECF8E]",
    "Firebase": "text-[#FFCA28]",
    "Clerk": "text-[#6C47FF]",
    "Docker": "text-[#2496ED]",
    "AWS": "text-[#FF9900]",
    "Git": "text-[#F05032]",
  };

  const colorClass = brandColors[name] || "text-foreground";

  return <IconComponent className={`${colorClass} ${className} shrink-0`} />;
}