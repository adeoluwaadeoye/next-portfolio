'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  Variants,
} from 'framer-motion'
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaRocket,
  FaStar,
  FaCode,
  FaBolt,
  FaGlobe,
  FaClock,
  FaBuilding,
  FaLayerGroup,
  FaEnvelope,
  FaGithub,
  FaQuoteLeft,
} from 'react-icons/fa'
import {
  SiTypescript,
  SiNodedotjs,
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiTailwindcss,
  SiRedux,
  SiDocker,
  SiGithub,
  SiFigma,
  SiExpress,
  SiPrisma,
  SiVercel,
} from 'react-icons/si'
import { timelineData, EmploymentType, TimelineItem } from '@/data/experience'

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 60, damping: 20 },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 18 },
  },
}

// ─── Type badge styles ────────────────────────────────────────────────────────
const TYPE_STYLE: Record<EmploymentType, string> = {
  'Full-Time': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Contract:    'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Freelance:   'bg-blue-500/10 text-blue-400 border-blue-500/30',
}

// ─── Company accent colors ────────────────────────────────────────────────────
const COMPANY_GRADIENTS = [
  'from-violet-500 to-purple-700',
  'from-emerald-500 to-teal-700',
  'from-blue-500 to-cyan-700',
  'from-orange-500 to-amber-700',
]

// ─── Tech icon registry ───────────────────────────────────────────────────────
const TECH_ICONS: Record<string, React.ReactNode> = {
  TypeScript:      <SiTypescript className="text-blue-500" />,
  'Node.js':       <SiNodedotjs className="text-green-600" />,
  'React.js':      <SiReact className="text-cyan-400" />,
  'Next.js':       <SiNextdotjs />,
  MongoDB:         <SiMongodb className="text-green-500" />,
  PostgreSQL:      <SiPostgresql className="text-blue-400" />,
  GraphQL:         <SiGraphql className="text-pink-500" />,
  'Tailwind CSS':  <SiTailwindcss className="text-sky-400" />,
  'Redux Toolkit': <SiRedux className="text-violet-500" />,
  Docker:          <SiDocker className="text-blue-400" />,
  Git:             <SiGithub />,
  Figma:           <SiFigma className="text-pink-400" />,
  Express:         <SiExpress />,
  Prisma:          <SiPrisma className="text-teal-400" />,
  Vercel:          <SiVercel />,
  'REST APIs':     <FaGlobe className="text-blue-300" />,
  'CI/CD':         <FaBolt className="text-yellow-400" />,
}

// ─── Skills data ──────────────────────────────────────────────────────────────
const SKILLS: Record<string, { name: string; icon: React.ReactNode }[]> = {
  Frontend: [
    { name: 'Next.js',       icon: <SiNextdotjs /> },
    { name: 'React.js',      icon: <SiReact className="text-cyan-400" /> },
    { name: 'TypeScript',    icon: <SiTypescript className="text-blue-500" /> },
    { name: 'Tailwind CSS',  icon: <SiTailwindcss className="text-sky-400" /> },
    { name: 'Redux Toolkit', icon: <SiRedux className="text-violet-500" /> },
    { name: 'Figma',         icon: <SiFigma className="text-pink-400" /> },
  ],
  Backend: [
    { name: 'Node.js',   icon: <SiNodedotjs className="text-green-600" /> },
    { name: 'Express',   icon: <SiExpress /> },
    { name: 'GraphQL',   icon: <SiGraphql className="text-pink-500" /> },
    { name: 'REST APIs', icon: <FaGlobe className="text-blue-300" /> },
    { name: 'Prisma',    icon: <SiPrisma className="text-teal-400" /> },
  ],
  Database: [
    { name: 'MongoDB',    icon: <SiMongodb className="text-green-500" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" /> },
  ],
  'DevOps & Tools': [
    { name: 'Docker', icon: <SiDocker className="text-blue-400" /> },
    { name: 'Vercel', icon: <SiVercel /> },
    { name: 'Git',    icon: <SiGithub /> },
    { name: 'CI/CD',  icon: <FaBolt className="text-yellow-400" /> },
  ],
}

// ─── Reusable sub-components ──────────────────────────────────────────────────
function TechPill({ name, icon }: { name: string; icon?: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/60 border border-border/60 rounded-lg text-[11px] font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all cursor-default">
      {icon && <span className="text-xs">{icon}</span>}
      {name}
    </span>
  )
}

function AchievementChip({ metric, label }: { metric: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-xl min-w-14 text-center">
      <span className="text-sm font-black text-primary leading-none">{metric}</span>
      <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 leading-none">
        {label}
      </span>
    </div>
  )
}

function TimelineNode({ index, current }: { index: number; current?: boolean }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 14, delay: 0.2 }}
        className={`w-14 h-14 rounded-2xl rotate-45 border-2 flex items-center justify-center shadow-xl ${
          current
            ? 'bg-primary border-primary shadow-primary/30'
            : 'bg-background border-primary/50'
        }`}
      >
        <span
          className={`-rotate-45 text-sm font-black ${
            current ? 'text-primary-foreground' : 'text-primary'
          }`}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
      {current && (
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          className="mt-2 text-[9px] font-black text-primary uppercase tracking-widest"
        >
          Now
        </motion.span>
      )}
    </div>
  )
}

// ─── Experience card ──────────────────────────────────────────────────────────
function ExperienceCard({ item, index }: { item: TimelineItem; index: number }) {
  const isEven = index % 2 === 0
  const gradient = COMPANY_GRADIENTS[index % COMPANY_GRADIENTS.length]
  const initials = item.company
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={`relative flex flex-col md:flex-row items-start gap-12 md:gap-20 ${
        isEven ? '' : 'md:flex-row-reverse'
      }`}
    >
      <TimelineNode index={index} current={item.current} />

      {/* ── Main card ── */}
      <div className="w-full md:w-[46%] group">
        <motion.div
          whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 24 } }}
          className="relative bg-secondary/15 border border-border rounded-3xl overflow-hidden hover:border-primary/40 transition-colors duration-300 shadow-lg hover:shadow-primary/10 hover:shadow-2xl"
        >
          {/* Backlight */}
          <div className="absolute -inset-px bg-linear-to-br from-primary/5 via-transparent to-violet-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-start gap-4">
              <div
                className={`w-14 h-14 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center shrink-0 shadow-lg`}
              >
                <span className="text-white font-black text-lg tracking-tight">{initials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${TYPE_STYLE[item.type]}`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current" />
                    {item.type}
                  </span>
                  {item.current && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-black tracking-tight leading-tight">{item.role}</h3>
                <p className="text-primary font-bold text-sm mt-0.5">{item.company}</p>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mt-4">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FaCalendarAlt className="text-primary/60" size={9} />
                {item.period}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FaClock className="text-primary/60" size={9} />
                {item.duration}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <FaMapMarkerAlt className="text-primary/60" size={9} />
                {item.location}
              </span>
            </div>
          </div>

          {/* Achievement chips */}
          <div className="px-6 py-4 border-b border-border/50 flex gap-2 flex-wrap">
            {item.achievements.map(a => (
              <AchievementChip key={a.label} metric={a.metric} label={a.label} />
            ))}
          </div>

          {/* Description */}
          <div className="px-6 pt-5 pb-2">
            <p className="text-xs text-muted-foreground italic leading-relaxed border-l-2 border-primary/30 pl-3">
              {item.description}
            </p>
          </div>

          {/* Impact bullets */}
          <div className="px-6 pt-3 pb-5 space-y-3">
            {item.impact.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-3 group/point"
              >
                <FaCheckCircle className="text-primary/40 group-hover/point:text-primary transition-colors mt-0.5 shrink-0 text-xs" />
                <p className="text-[12px] text-muted-foreground group-hover/point:text-foreground transition-colors leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Highlight quote */}
          <div className="mx-6 mb-5 p-3 rounded-xl bg-primary/5 border border-primary/15 flex gap-2">
            <FaQuoteLeft className="text-primary/30 shrink-0 mt-0.5" size={10} />
            <p className="text-[11px] font-semibold text-primary/80 leading-snug italic">
              {item.highlight}
            </p>
          </div>

          {/* Tech tags */}
          <div className="px-6 pb-6 border-t border-border/40 pt-4 space-y-2">
            <p className="text-[9px] font-mono font-bold text-muted-foreground/50 uppercase tracking-widest">
              Stack & Tools
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map(tag => (
                <TechPill key={tag} name={tag} icon={TECH_ICONS[tag]} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Side decoration ── */}
      <div
        className={`hidden md:flex w-[46%] flex-col justify-center gap-6 ${
          isEven ? 'items-start pl-10' : 'items-end pr-10'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`flex items-center gap-3 ${isEven ? '' : 'flex-row-reverse'}`}
        >
          <span className="h-px w-10 bg-primary/40" />
          <span className="text-xs font-black text-primary/60 uppercase tracking-widest">
            Chapter {index + 1}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className={`text-3xl xl:text-4xl font-black tracking-tight leading-tight ${
            isEven ? '' : 'text-right'
          }`}
        >
          {item.era}
        </motion.h2>

        {/* Large metric callout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className={`flex gap-6 ${isEven ? '' : 'justify-end'}`}
        >
          {item.achievements.slice(0, 2).map(a => (
            <div key={a.label} className={isEven ? '' : 'text-right'}>
              <p className="text-4xl xl:text-5xl font-black text-primary">{a.metric}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                {a.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Floating era badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`flex items-center gap-2 ${isEven ? '' : 'justify-end'}`}
        >
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${TYPE_STYLE[item.type]}`}
          >
            <FaBriefcase size={7} />
            {item.type} · {item.duration}
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Skills matrix section ─────────────────────────────────────────────────────
function SkillsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className="mt-40 space-y-12"
    >
      <motion.div variants={fadeUp} className="text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest">
          <FaLayerGroup size={10} /> Technical Arsenal
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
          Skills &amp; Technologies
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Battle-tested across production systems — from pixel-perfect UIs to high-throughput APIs
          and cloud infrastructure.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {Object.entries(SKILLS).map(([category, skills]) => (
          <motion.div
            key={category}
            variants={scaleIn}
            className="p-6 bg-secondary/15 border border-border rounded-3xl hover:border-primary/30 transition-colors space-y-4 group"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-6 bg-primary rounded-full group-hover:h-8 transition-all duration-300" />
              <h3 className="font-black text-sm uppercase tracking-widest">{category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <TechPill key={s.name} name={s.name} icon={s.icon} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// ─── Achievements banner ───────────────────────────────────────────────────────
function AchievementsBanner() {
  const stats = [
    { icon: <FaCode />,      value: '5yr+',  label: 'Engineering Experience' },
    { icon: <FaBuilding />,  value: '4',     label: 'Companies Worked At' },
    { icon: <FaGlobe />,     value: '20+',   label: 'Technologies Mastered' },
    { icon: <FaRocket />,    value: '100%',  label: 'Remote-Ready' },
    { icon: <FaStar />,      value: '3',     label: 'Production SaaS Shipped' },
    { icon: <FaBolt />,      value: '<600ms', label: 'Best Latency Achieved' },
  ]

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={stagger}
      className="mt-32 p-px bg-linear-to-r from-primary/30 via-violet-500/30 to-emerald-500/30 rounded-3xl"
    >
      <div className="bg-background rounded-3xl p-10">
        <motion.p
          variants={fadeUp}
          className="text-center text-[10px] font-black uppercase tracking-widest text-muted-foreground/50 mb-8"
        >
          Career Highlights
        </motion.p>
        <motion.div
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {stats.map(s => (
            <motion.div
              key={s.label}
              variants={scaleIn}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-secondary/20 border border-border/40 hover:border-primary/30 transition-colors group cursor-default"
            >
              <div className="text-primary text-base mb-2 group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <span className="text-2xl font-black">{s.value}</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1 leading-tight text-center">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ExperiencePage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const scrollSpring = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const scrollWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen bg-background pt-28 pb-40 overflow-hidden"
    >
      {/* Reading progress bar */}
      <motion.div
        style={{ width: scrollWidth }}
        className="fixed top-0 left-0 h-0.5 bg-linear-to-r from-primary via-violet-500 to-emerald-500 z-50 origin-left"
      />

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div style={{ y: yBg }} className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-violet-500/5 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-emerald-500/4 blur-3xl" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* ── HEADER ── */}
        <header className="text-center mb-24">

          {/* Icon badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/10"
          >
            <FaBriefcase className="text-primary text-3xl" />
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Available for hire · {timelineData.length} Roles
            </span>
          </motion.div>

          {/* Title — plain, no gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 60 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95]"
          >
            Work{' '}
            <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">Experience.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          >
            5+ years building production systems — from modular UI libraries to full-stack SaaS
            platforms. Every role shaped how I engineer and ship.
          </motion.p>

          {/* Inline stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12"
          >
            {[
              { icon: <FaBriefcase className="text-primary" />, value: '5yr+',  label: 'Experience' },
              { icon: <FaBuilding className="text-primary" />,  value: String(timelineData.length), label: 'Companies' },
              { icon: <FaCode className="text-primary" />,      value: '20+',   label: 'Technologies' },
              { icon: <FaGlobe className="text-primary" />,     value: '100%',  label: 'Remote-Ready' },
            ].map(({ icon, value, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 bg-secondary/30 border border-border/50 rounded-2xl hover:border-primary/30 transition-colors"
              >
                <div className="text-lg shrink-0">{icon}</div>
                <div className="text-left">
                  <div className="text-xl font-black leading-none">{value}</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-0.5">{label}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="flex gap-3 justify-center flex-wrap"
          >
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-black text-sm uppercase tracking-wider hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
            >
              <FaRocket size={11} /> Hire Me
            </Link>
            <Link
              href="https://github.com/adeoluwaadeoye"
              target="_blank"
              className="inline-flex items-center gap-2 px-7 py-3 bg-secondary text-foreground font-black border border-border text-sm uppercase tracking-wider hover:border-primary/40 transition-all"
            >
              <FaGithub size={11} /> GitHub
            </Link>
          </motion.div>

          {/* Scrolling marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-14 overflow-hidden border-y border-border/40 py-3"
          >
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
              className="flex gap-10 whitespace-nowrap"
            >
              {[...timelineData, ...timelineData].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 text-[11px] font-bold text-muted-foreground/35 uppercase tracking-widest shrink-0"
                >
                  <FaBolt className="text-primary/30" size={7} />
                  {item.company} · {item.role}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </header>

        {/* ── TIMELINE ── */}
        <section className="relative">
          {/* Animated center line */}
          <motion.div
            style={{ scaleY: scrollSpring }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary/60 via-primary/20 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-36">
            {timelineData.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* ── ACHIEVEMENTS BANNER ── */}
        <AchievementsBanner />

        {/* ── SKILLS MATRIX ── */}
        <SkillsSection />

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="mt-40 p-px bg-linear-to-r from-primary via-violet-500 to-emerald-500 rounded-[2.5rem]"
        >
          <div className="bg-background rounded-[2.4rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl" />
            </div>

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/10"
            >
              <FaRocket className="text-primary text-2xl" />
            </motion.div>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <FaStar size={10} /> Open to Opportunities
            </span>

            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
              Ready to Write the
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-violet-400">
                Next Chapter.
              </span>
            </h2>

            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-base leading-relaxed">
              Whether it&apos;s a startup MVP, enterprise platform, or an AI-powered product — I
              bring the engineering depth to ship it right, on time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-black shadow-2xl hover:shadow-primary/30 hover:opacity-90 transition-all text-sm uppercase tracking-wider"
              >
                <FaRocket /> Hire Me Today
              </Link>
              <Link
                href="mailto:adeoluadeoye7@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-secondary text-foreground font-black border border-border hover:border-primary/40 transition-all text-sm uppercase tracking-wider"
              >
                <FaEnvelope /> Send a Message
              </Link>
              <Link
                href="https://github.com/adeoluwaadeoye"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-secondary text-foreground font-black border border-border hover:border-primary/40 transition-all text-sm uppercase tracking-wider"
              >
                <FaGithub /> View GitHub
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
