export type Project = {
  id: number;
  title: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "AdminHub",
    description:
      "A production-ready, full-stack task management platform built with Next.js App Router, Express REST API, MongoDB Atlas, and Passport.js OAuth. Features a comprehensive admin dashboard, real-time analytics, kanban board, and secure authentication with Google and GitHub OAuth.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Passport.js",
      "Docker",
      "Git",
    ],
    image: "/assets/project1.jpg",
    liveUrl: "https://adminhub-sigma.vercel.app/",
    githubUrl: "https://github.com/adeoluwaadeoye/AdminHub",
    category: "Admin System",
  },

  {
    id: 2,
    title: "Invoicely SaaS",
    description:
      "A full-stack multi-tenant SaaS invoicing application built with Next.js 16, MongoDB, Clerk, Paystack, and Resend. Built as a portfolio project to demonstrate production-grade fullstack engineering skills. Includes authentication, invoice automation, and payment workflows.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Clerk",
      "Paystack",
      "Resend",
      "Node.js",
      "Vercel",
    ],
    image: "/assets/project2.jpg",
    liveUrl: "https://invoicely-chi-mauve.vercel.app/",
    githubUrl: "https://github.com/adeoluwaadeoye/invoicely",
    category: "SaaS Platform",
  },

  {
    id: 3,
    title: "Job Tracker AI",
    description:
      "A full-stack web application that helps engineers track job applications intelligently. Paste any job description and AI instantly extracts the role details, required skills, and writes a tailored cover letter. Built with Next.js, MongoDB, and Groq.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Groq",
      "Prisma",
      "Vercel",
    ],
    image: "/assets/project3.jpg",
    liveUrl: "#",
    githubUrl: "#",
    category: "AI Productivity Tool",
  },
];
