'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  FaCode, FaDatabase, FaCloudUploadAlt,
  FaGitAlt, FaServer, FaArrowRight, FaDownload, FaEnvelope,
} from 'react-icons/fa'
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiDocker, SiRedis, SiPrisma, SiGraphql,
  SiTailwindcss, SiVercel, SiGithubactions,
} from 'react-icons/si'

/* ─── Constants ─────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.1 },
  }),
}

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (i = 0) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.07 },
  }),
}

/* ═══════════════════════════════════════════════════════
   ORBIT IMAGE
   ─ Text first on mobile/tablet, orbit second
   ─ Large photos: outer w-24, inner w-20, centre w-48
   ─ Hover + tap + touch all zoom via whileHover / whileTap
     on a wrapper that is separate from the positioning div
═══════════════════════════════════════════════════════ */
const OUTER_PHOTOS = [
  { src: '/assets/ade2.jpg', alt: 'Adeoluwa 2', deg: 0   },
  { src: '/assets/ade4.jpg', alt: 'Adeoluwa 4', deg: 90  },
  { src: '/assets/ade6.jpg', alt: 'Adeoluwa 7', deg: 180 },
  { src: '/assets/ade3.jpg', alt: 'Adeoluwa 5', deg: 270 },
]
const INNER_PHOTOS = [
  { src: '/assets/ade5.jpg', alt: 'Adeoluwa 3', deg: 45  },
  { src: '/assets/ade7.jpg', alt: 'Adeoluwa 6', deg: 225 },
]

/* Single orbiting photo node — positioning and animation fully separated */
function OrbitPhoto({
  src, alt, size, ringDuration, ringDir, r, deg,
  onOpen,
}: {
  src: string; alt: string; size: string
  ringDuration: number; ringDir: 1 | -1; r: number; deg: number
  onOpen: (src: string) => void
}) {
  const rad = (deg * Math.PI) / 180
  const x   = Math.cos(rad) * r
  const y   = Math.sin(rad) * r

  return (
    /* 1 — position only, no framer-motion here */
    <div
      className="absolute"
      style={{ top: '50%', left: '50%', transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
    >
      {/* 2 — zoom on hover / tap / touch, no position transform */}
      <motion.button
        onClick={() => onOpen(src)}
        whileHover={{ scale: 1.65 }}
        whileTap={{ scale: 1.75 }}
        transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        className={`relative ${size} rounded-full overflow-visible cursor-zoom-in focus:outline-none`}
        style={{ touchAction: 'manipulation', zIndex: 1 }}
        onHoverStart={(e) => { (e.target as HTMLElement).style.zIndex = '30' }}
        onHoverEnd={(e)   => { (e.target as HTMLElement).style.zIndex = '1'  }}
      >
        {/* 3 — circular crop wrapper */}
        <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-background shadow-2xl ring-2 ring-primary/40">
          {/* 4 — counter-rotate so photo stays upright */}
          <motion.div
            animate={{ rotate: ringDir * -360 }}
            transition={{ duration: ringDuration, repeat: Infinity, ease: 'linear' }}
            className="relative w-full h-full"
          >
            <Image src={src} alt={alt} fill sizes="120px" className="object-cover object-top" />
          </motion.div>
        </div>
      </motion.button>
    </div>
  )
}

function OrbitImage() {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <>
      {/* ── Canvas ───────────────────────────────────── */}
      <div className="relative flex items-center justify-center w-100 h-100 sm:w-116 sm:h-116 lg:w-140 lg:h-140 shrink-0 mt-2">

        {/* Outer dashed ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 pointer-events-none" />
        {/* Inner dashed ring */}
        <div className="absolute rounded-full border border-dashed border-accent/25 pointer-events-none"
          style={{ inset: '108px' }} />

        {/* ── OUTER ORBIT (clockwise) ── */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{ transformOrigin: 'center' }}
        >
          {OUTER_PHOTOS.map((p) => (
            <OrbitPhoto
              key={p.src} {...p}
              size="w-40 h-40 sm:w-32 sm:h-32 lg:w-36 lg:h-36"
              ringDuration={34} ringDir={1} r={165}
              onOpen={setLightbox}
            />
          ))}
        </motion.div>

        {/* ── INNER ORBIT (counter-clockwise) ── */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{ transformOrigin: 'center' }}
        >
          {INNER_PHOTOS.map((p) => (
            <OrbitPhoto
              key={p.src} {...p}
              size="w-20 h-20 sm:w-28 sm:h-28 lg:w-24 lg:h-24"
              ringDuration={22} ringDir={-1} r={100}
              onOpen={setLightbox}
            />
          ))}
        </motion.div>

        {/* ── Centre profile ── */}
        <motion.button
          onClick={() => setLightbox('/assets/ade1.jpg')}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.15 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-background shadow-2xl ring-2 ring-primary/40 cursor-zoom-in focus:outline-none"
          style={{ touchAction: 'manipulation' }}
        >
          <Image src="/assets/ade1.jpg" alt="Adeoluwa Adeoye" fill
            className="object-cover object-top" priority sizes="220px" />
        </motion.button>

        {/* Glow */}
        <div className="absolute inset-[30%] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      </div>

      {/* ── Lightbox ─────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/88 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[90vw] max-w-120 aspect-square rounded-3xl overflow-hidden shadow-2xl ring-2 ring-primary/40"
            >
              <Image src={lightbox} alt="Preview" fill className="object-cover object-top" sizes="480px" />
              <button onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center text-xl leading-none hover:bg-black/80 transition-colors">
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ═══════════════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════════════ */
function SectionLabel({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
      <span className="w-5 h-px bg-primary" />
      {label}
    </span>
  )
}

function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number
}) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-56px' })
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} custom={delay} className={className}>
      {children}
    </motion.div>
  )
}

function StatCard({ value, label, sub, i }: { value: string; label: string; sub: string; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} custom={i}
      className="relative p-6 md:p-8 rounded-2xl border border-border bg-card overflow-hidden group hover:border-primary/60 transition-all duration-400">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <p className="text-4xl md:text-5xl font-black tracking-tighter mb-1">{value}</p>
      <p className="text-sm font-bold text-foreground/80">{label}</p>
      <p className="text-[11px] font-mono text-muted-foreground mt-1">{sub}</p>
    </motion.div>
  )
}

function SkillBadge({ icon, name, color, i = 0 }: { icon: React.ReactNode; name: string; color: string; i?: number }) {
  return (
    <motion.div variants={fadeLeft} initial="hidden" whileInView="visible"
      viewport={{ once: true }} custom={i}
      className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-xl hover:border-primary hover:shadow-sm hover:shadow-primary/10 transition-all duration-300 cursor-default">
      <span className={`text-base ${color}`}>{icon}</span>
      <span className="text-xs font-bold uppercase tracking-tight">{name}</span>
    </motion.div>
  )
}

function ProficiencyBar({ skill, level, i }: { skill: string; level: number; i: number }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const delay  = i * 0.1
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} custom={i} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-foreground/90">{skill}</span>
        <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.95, duration: 0.35 }}
          className="text-xs font-mono font-bold text-primary">{level}%</motion.span>
      </div>
      <div className="relative h-3 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.15, ease: EASE, delay }}
          className="absolute inset-y-0 left-0 bg-primary rounded-full" />
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={inView ? { x: `${level + 30}%`, opacity: [0, 0.65, 0] } : {}}
          transition={{ duration: 0.5, ease: 'easeOut', delay: delay + 1.2 }}
          className="absolute inset-y-0 left-0 w-16 bg-linear-to-r from-transparent via-white/55 to-transparent"
          style={{ maxWidth: `${level}%` }} />
      </div>
    </motion.div>
  )
}

function TimelineItem({ year, title, tech, desc, i }: {
  year: string; title: string; tech: string; desc: string; i: number
}) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} custom={i}
      className="relative pl-8 pb-10 last:pb-0 before:absolute before:left-2 before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-primary before:ring-4 before:ring-primary/20 after:absolute after:left-2.75 after:top-5 after:w-px after:bottom-0 after:bg-border last:after:hidden">
      <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{year}</span>
      <h4 className="text-base font-black mt-1 mb-1.5">{title}</h4>
      <span className="text-[10px] font-mono px-2.5 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20">{tech}</span>
      <p className="text-sm text-muted-foreground leading-relaxed mt-2.5">{desc}</p>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   ENGINEERING APPROACH — compact 3-col bento grid
═══════════════════════════════════════════════════════ */
const PILLARS = [
  { n: '01', title: 'Scalability',    accent: 'bg-blue-500',   desc: 'Multi-tenant SaaS and distributed systems that grow without fracture points.',   tags: ['H-scaling', 'Event queues'] },
  { n: '02', title: 'Performance',    accent: 'bg-yellow-500', desc: 'Sub-second loads, aggressive indexing and efficient memory as a baseline.',       tags: ['Web Vitals', 'Edge cache'] },
  { n: '03', title: 'Resilience',     accent: 'bg-green-500',  desc: 'Circuit breakers, retries and graceful degradation so systems self-heal.',        tags: ['Fault tolerance', 'OTEL'] },
  { n: '04', title: 'DevOps Culture', accent: 'bg-orange-500', desc: 'Automated CI/CD, containerised workloads, IaC — deployment is a non-event.',      tags: ['Docker', 'GitHub Actions'] },
  { n: '05', title: 'Architecture',   accent: 'bg-purple-500', desc: 'DDD, clean patterns, composable microservices with clear ownership boundaries.',   tags: ['DDD', 'CQRS', 'GraphQL'] },
  { n: '06', title: 'Velocity',       accent: 'bg-pink-500',   desc: 'TDD, trunk-based dev and Agile sprints that keep delivery cadence consistently high.', tags: ['TDD', 'Feature flags'] },
]

function PillarCard({ n, title, accent, desc, tags, i }: typeof PILLARS[0] & { i: number }) {
  const ref    = useRef(null)
  const inView  = useInView(ref, { once: true, margin: '-20px' })
  return (
    <motion.div
      ref={ref} variants={fadeUp} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} custom={i}
      className="group relative p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-sm hover:shadow-primary/5 transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* accent bar */}
      <span className={`absolute top-0 left-0 w-full h-0.5 ${accent} opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-black leading-tight">{title}</h3>
        <span className="text-xs font-mono text-muted-foreground/50 ml-2 shrink-0">{n}</span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{desc}</p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-28 px-5 sm:px-8 relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-48 -left-48 w-175 h-175 rounded-full bg-primary/5 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-137.5 h-137.5 rounded-full bg-accent/5 blur-[110px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-28 md:space-y-36">

        {/* ══ 1 · HERO ═══════════════════════════════════════════════════════
            Mobile/tablet : text → orbit (flex-col)
            Desktop (lg+)  : text left, orbit right (flex-row)
        ═══════════════════════════════════════════════════════════════════ */}
        <section>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

            {/* Text — always renders first in DOM = first on mobile */}
            <Reveal className="flex-1 min-w-0 w-full">
              <SectionLabel label="About // Engineer Profile" />
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6">
                Engineering{' '}
                <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">Impact</span>
                <br />Through Systems Thinking.
              </h1>
              <div className="space-y-5 max-w-xl">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I am a Full-Stack Engineer who views code as a means to an end —
                  building resilient, scalable systems that solve real human problems.
                  My approach goes beyond writing functions; I reason about the entire
                  lifecycle of data, from a user&apos;s interaction to the database layer
                  and back, ensuring every layer is purposefully designed.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My philosophy centres on architectural integrity — bridging complex
                  backend requirements with performant, accessible frontends. I specialise
                  in systems that scale horizontally, fail gracefully, and ship fast.
                  If it cannot scale, it is not finished.
                </p>
              </div>
            </Reveal>

            {/* Orbit — second on mobile, right on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.15 }}
              className="shrink-0 w-full flex items-center justify-center lg:w-auto"
            >
              <OrbitImage />
            </motion.div>

          </div>
        </section>

        {/* ══ 2 · IMPACT METRICS ═══════════════════════════════════════════ */}
        <section>
          <Reveal><SectionLabel label="Impact by the Numbers" /></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="3+"  label="Years Engineering"  sub="Full-stack, production"  i={0} />
            <StatCard value="20+" label="Projects Shipped"   sub="Web · API · SaaS"         i={1} />
            <StatCard value="99%" label="Uptime Target"      sub="Zero-downtime deploys"    i={2} />
            <StatCard value="<1s" label="TTFB Goal"          sub="Performance-first builds" i={3} />
          </div>
        </section>

        {/* ══ 3 · ENGINEERING APPROACH ═════════════════════════════════════ */}
        <section>
          <Reveal className="mb-8">
            <SectionLabel label="Engineering Approach" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">
              How I Build &amp; Think
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PILLARS.map((p, i) => <PillarCard key={p.n} {...p} i={i} />)}
          </div>
        </section>

        {/* ══ 4 · TECHNICAL STACK ══════════════════════════════════════════ */}
        <section>
          <Reveal className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
            <div>
              <SectionLabel label="Technical Arsenal" />
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase">Stack &amp; Tools</h2>
            </div>
            <p className="text-xs font-mono text-muted-foreground shrink-0">Expertise_Index_v3.0</p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaCode className="text-blue-500" />
                <h4 className="font-black text-sm uppercase tracking-widest">Frontend</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <SkillBadge i={0} icon={<SiNextdotjs />}   name="Next.js 15"   color="text-foreground" />
                <SkillBadge i={1} icon={<SiReact />}       name="React"        color="text-cyan-400" />
                <SkillBadge i={2} icon={<SiTypescript />}  name="TypeScript"   color="text-blue-600" />
                <SkillBadge i={3} icon={<SiJavascript />}  name="JavaScript"   color="text-yellow-400" />
                <SkillBadge i={4} icon={<SiTailwindcss />} name="Tailwind CSS" color="text-sky-400" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaDatabase className="text-green-500" />
                <h4 className="font-black text-sm uppercase tracking-widest">Backend &amp; Data</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <SkillBadge i={0} icon={<SiNodedotjs />}  name="Node.js"    color="text-green-600" />
                <SkillBadge i={1} icon={<SiExpress />}    name="Express"    color="text-muted-foreground" />
                <SkillBadge i={2} icon={<SiPostgresql />} name="PostgreSQL" color="text-blue-400" />
                <SkillBadge i={3} icon={<SiMongodb />}    name="MongoDB"    color="text-green-500" />
                <SkillBadge i={4} icon={<SiRedis />}      name="Redis"      color="text-red-500" />
                <SkillBadge i={5} icon={<SiPrisma />}     name="Prisma"     color="text-indigo-400" />
                <SkillBadge i={6} icon={<SiGraphql />}    name="GraphQL"    color="text-pink-500" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaCloudUploadAlt className="text-orange-500" />
                <h4 className="font-black text-sm uppercase tracking-widest">Cloud &amp; Infra</h4>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <SkillBadge i={0} icon={<SiDocker />}        name="Docker"         color="text-blue-500" />
                <SkillBadge i={1} icon={<SiVercel />}        name="Vercel"         color="text-foreground" />
                <SkillBadge i={2} icon={<SiGithubactions />} name="GitHub Actions" color="text-foreground" />
                <SkillBadge i={3} icon={<FaServer />}        name="REST APIs"      color="text-purple-400" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <FaGitAlt className="text-orange-600" />
                <h4 className="font-black text-sm uppercase tracking-widest">Engineering Craft</h4>
              </div>
              <ul className="grid grid-cols-2 gap-y-3 text-sm text-muted-foreground">
                {['System Design','API Documentation','Agile / Scrum','TDD / Unit Testing',
                  'Performance Audit','Tech Mentorship','Code Review','Database Design'].map(item => (
                  <li key={item} className="flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ══ 5 · PROFICIENCY DEPTH ════════════════════════════════════════ */}
        <section>
          <Reveal className="mb-12">
            <SectionLabel label="Proficiency Depth" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Where I Go Deepest</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8">
            {[
              { skill: 'TypeScript / JavaScript', level: 93 },
              { skill: 'React / Next.js',          level: 91 },
              { skill: 'Node.js / Express',        level: 88 },
              { skill: 'PostgreSQL / MongoDB',     level: 85 },
              { skill: 'System Architecture',      level: 82 },
              { skill: 'Docker / CI-CD',           level: 79 },
              { skill: 'GraphQL / REST Design',    level: 80 },
              { skill: 'Redis / Caching Layer',    level: 76 },
            ].map((item, i) => (
              <ProficiencyBar key={item.skill} skill={item.skill} level={item.level} i={i} />
            ))}
          </div>
        </section>

        {/* ══ 6 · TIMELINE ═════════════════════════════════════════════════ */}
        <section>
          <Reveal className="mb-12">
            <SectionLabel label="Engineering Journey" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Milestones &amp; Focus Areas</h2>
          </Reveal>
          <div className="max-w-2xl">
            <TimelineItem i={0} year="2022 — Present" title="Full-Stack Product Engineering"
              tech="Next.js · Node.js · PostgreSQL"
              desc="Building end-to-end web products: REST and GraphQL API design, React frontends with server-side rendering, optimised for performance and SEO." />
            <TimelineItem i={1} year="2023" title="Distributed Systems & Microservices"
              tech="Docker · Redis · Event Queues"
              desc="Containerised microservice architectures, message-broker patterns, and distributed caching strategies to handle high concurrency workloads." />
            <TimelineItem i={2} year="2024" title="AI Integration & Serverless Edge"
              tech="LLM APIs · Vercel Edge · Streaming"
              desc="Integrated LLM APIs into production SaaS, leveraging serverless edge functions and streaming responses for minimal latency." />
            <TimelineItem i={3} year="2025 — Focus" title="Platform Engineering & Observability"
              tech="OpenTelemetry · IaC"
              desc="Deepening expertise in infrastructure-as-code, distributed tracing, and full-stack observability to achieve production-grade reliability at scale." />
          </div>
        </section>

        {/* ══ 7 · PHILOSOPHY BLOCK ═════════════════════════════════════════ */}
        <Reveal>
          <div className="relative p-10 md:p-16 rounded-[2.5rem] bg-primary text-primary-foreground overflow-hidden">
            <div className="pointer-events-none absolute inset-0 opacity-[0.055]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 39px,currentColor 39px,currentColor 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,currentColor 39px,currentColor 40px)' }} />
            <SectionLabel label="Philosophy" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-8">The Engineering Value</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-primary-foreground/90 leading-relaxed relative z-10">
              <div className="space-y-4">
                <p>I believe in clean code that delivers real value. My process begins with whiteboarding data flow and system boundaries, continues through API contract design, and ends with rigorous testing at every layer.</p>
                <p>Good software is invisible — it just works. That requires obsessing over failure modes as much as happy paths, and treating observability as a first-class feature from day one.</p>
              </div>
              <div className="space-y-4">
                <p>Currently focused on AI-driven automation and serverless edge computing — bridging the gap between powerful LLM capabilities and production-ready, maintainable systems.</p>
                <ul className="space-y-2 text-sm font-mono text-primary-foreground/65">
                  {['→ Ship fast, refactor early, document always',
                    '→ Data integrity over feature velocity',
                    '→ Observability built in, not bolted on',
                    '→ If it cannot scale, it is not finished'].map(l => <li key={l}>{l}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ 8 · CTA ══════════════════════════════════════════════════════ */}
        <Reveal className="text-center py-4">
          <SectionLabel label="Let's Build Together" />
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6">
            Ready to Ship<br />
            <span className="text-primary">Something Great?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed">
            Whether you have a product to build from scratch, a system to scale, or a
            team that needs a reliable engineer — I&apos;m available and ready to move fast.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}>
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                <FaEnvelope />Get in Touch<FaArrowRight className="text-xs" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}>
              <Link href="/projects"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-border font-black text-sm uppercase tracking-widest hover:border-primary transition-colors">
                View Projects<FaArrowRight className="text-xs" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}>
              <Link href="/assets/ADE_RESUME.pdf" download="Adeoluwa_Adeoye_Resume.pdf"
                className="inline-flex items-center gap-3 px-8 py-4 border border-border bg-secondary/30 font-black text-sm uppercase tracking-widest hover:border-primary transition-colors">
                <FaDownload className="text-xs" />Download Resume
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
            className="mt-10 inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border bg-secondary/30 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Currently open to new opportunities
          </motion.div>
        </Reveal>

      </div>
    </main>
  )
}
