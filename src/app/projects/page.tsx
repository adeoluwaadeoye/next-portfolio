'use client'

import React, { useRef, useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion, useScroll, useSpring, useTransform, AnimatePresence,
} from 'framer-motion'
import {
  FaGithub, FaExternalLinkAlt, FaRocket, FaCode, FaServer,
  FaLightbulb, FaSearch, FaThLarge, FaList, FaTimes,
  FaCheckCircle, FaStar, FaLayerGroup, FaBolt, FaShieldAlt, FaChartLine,
  FaClock, FaUserTie, FaEnvelope, FaTools, FaKey, FaBrain, FaLock,
} from 'react-icons/fa'
import {
  SiNextdotjs, SiMongodb, SiTailwindcss, SiTypescript,
  SiDocker, SiClerk, SiNodedotjs, SiExpress, SiVercel,
  SiPrisma, SiGithub,
} from 'react-icons/si'
import { projects, Project } from '@/data/projects'

// ─── Secondary images ─────────────────────────────────────────────────────────
const SECONDARY: Record<number, string | null> = {
  1: '/assets/project1a.jpg',
  2: '/assets/project2a.jpg',
  3: '/assets/project3a.jpg',
  4: null,
}

// ─── Tech icons ───────────────────────────────────────────────────────────────
const TECH_ICONS: Record<string, React.ReactNode> = {
  'Next.js':      <SiNextdotjs />,
  'MongoDB':      <SiMongodb className="text-green-500" />,
  'Tailwind CSS': <SiTailwindcss className="text-sky-400" />,
  'TypeScript':   <SiTypescript className="text-blue-500" />,
  'Docker':       <SiDocker className="text-blue-400" />,
  'Clerk':        <SiClerk className="text-violet-400" />,
  'Node.js':      <SiNodedotjs className="text-green-600" />,
  'Express':      <SiExpress />,
  'Vercel':       <SiVercel />,
  'Prisma':       <SiPrisma className="text-teal-400" />,
  'Git':          <SiGithub />,
  'Groq':         <FaBrain className="text-orange-400" />,
  'Paystack':     <FaChartLine className="text-teal-500" />,
  'Resend':       <FaEnvelope className="text-blue-400" />,
  'Passport.js':  <FaKey className="text-indigo-400" />,
  'Socket.io':    <FaBolt className="text-yellow-400" />,
}

// ─── Metadata ─────────────────────────────────────────────────────────────────
type Meta = {
  status: 'live' | 'development'
  role: string; year: string; duration: string; complexity: number
  highlights: string[]
  metrics: { label: string; value: string }[]
  architecture: string; deployment: string; security: string; performance: string
}

const META: Record<number, Meta> = {
  1: {
    status: 'live', role: 'Full-Stack', year: '2024', duration: '5 wks', complexity: 3,
    highlights: [
      'Kanban board with real-time drag-and-drop',
      'Google & GitHub OAuth via Passport.js',
      'Admin analytics dashboard with live metrics',
      'Dockerized — zero-config local & cloud deploy',
    ],
    metrics: [{ label: 'Uptime', value: '99.9%' }, { label: 'Users', value: '50+' }, { label: 'Perf', value: '94' }],
    architecture: 'Express REST API + Next.js App Router, MVC layering, MongoDB Atlas with compound indexes',
    deployment: 'Docker Compose locally; GitHub Actions CI/CD → Vercel on every push to main',
    security: 'Passport.js OAuth (Google + GitHub), JWT sessions, CSRF protection, env-secured secrets',
    performance: '94 Lighthouse — SSR + ISR, MongoDB indexed aggregations, Next.js Image optimization',
  },
  2: {
    status: 'live', role: 'Full-Stack', year: '2024', duration: '4 wks', complexity: 3,
    highlights: [
      'Multi-tenant SaaS with org-level data isolation',
      'Paystack payment gateway with webhook handler',
      'Automated invoice PDF emails via Resend API',
      'Clerk RBAC with organization & team roles',
    ],
    metrics: [{ label: 'Invoices', value: '200+' }, { label: 'Tenants', value: '10+' }, { label: 'Perf', value: '91' }],
    architecture: 'Next.js 15 Server Components, Clerk multi-org tenancy, MongoDB scoped per organization',
    deployment: 'Vercel Edge with automatic preview deployments per PR and production promotion flow',
    security: 'Clerk RBAC org roles, Paystack webhook HMAC verification, server-side validation',
    performance: '91 Lighthouse — React Server Components, optimistic UI, lazy-loaded invoice lists',
  },
  3: {
    status: 'live', role: 'Full-Stack + AI', year: '2025', duration: '6 wks', complexity: 3,
    highlights: [
      'AI parses any job description in under 1 second',
      'Groq LLaMA generates bespoke cover letters instantly',
      'Kanban tracker with filter, sort, and status columns',
      'Prisma ORM with MongoDB — fully typed query layer',
    ],
    metrics: [{ label: 'LLM', value: 'Groq' }, { label: 'Model', value: 'LLaMA' }, { label: 'Status', value: 'Beta' }],
    architecture: 'Next.js App Router + Prisma/MongoDB, streaming AI responses via edge API routes',
    deployment: 'Vercel Edge for AI inference routes, ISR for static pages, optimistic mutations',
    security: 'Auth-protected routes, rate-limited AI endpoints, sanitized & structured LLM prompts',
    performance: 'Sub-second Groq inference, response streaming, optimistic kanban state without refetch',
  },
  4: {
    status: 'development', role: 'Full-Stack', year: '2025', duration: '8 wks', complexity: 3,
    highlights: [
      'Real-time co-editing with conflict-free CRDT merging',
      'Live team presence — cursors, avatars, activity feed',
      'Embedded code snippet blocks with syntax highlighting',
      'Project boards with drag-and-drop task management',
    ],
    metrics: [{ label: 'Stack', value: 'WS' }, { label: 'Collab', value: 'Live' }, { label: 'Status', value: 'Soon' }],
    architecture: 'Next.js App Router + Socket.io, CRDT-based operational transforms for real-time sync',
    deployment: 'Vercel frontend; Socket.io on Railway with sticky sessions and horizontal scaling',
    security: 'JWT-authenticated WebSocket handshake, room-scoped access control, rate-limited broadcasts',
    performance: 'Sub-50ms latency with event batching, optimistic local state, lazy-loaded doc history',
  },
}

const ALL_CATS = ['All', ...Array.from(new Set(projects.map(p => p.category ?? 'Other')))]

// ─── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: 'live' | 'development' }) {
  return status === 'live' ? (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />Soon
    </span>
  )
}

function TechPill({ tech }: { tech: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary/50 border border-border/50 rounded-md text-[11px] font-semibold text-muted-foreground">
      {TECH_ICONS[tech] && <span className="text-[9px] shrink-0">{TECH_ICONS[tech]}</span>}
      {tech}
    </span>
  )
}

// ─── ProjectImage ─────────────────────────────────────────────────────────────
// Primary: no overlay.
// Mouse hover / touch tap → secondary slides in from right (0.6s smooth).
// Secondary always shows bottom gradient overlay with GitHub + Live icon buttons.
// pointerType check separates desktop hover from touch tap — no double-fire.
function ProjectImage({ project }: { project: Project }) {
  const [active, setActive] = useState(false)
  const secondary = SECONDARY[project.id]
  const meta = META[project.id]
  const hasGithub = !!(project.githubUrl && project.githubUrl !== '#')
  const hasLive   = !!(project.liveUrl   && project.liveUrl   !== '#')
  const isUpcoming = meta?.status === 'development'

  return (
    <div
      className="relative w-full aspect-video overflow-hidden select-none"
      onPointerEnter={e => { if (e.pointerType === 'mouse') setActive(true)  }}
      onPointerLeave={e => { if (e.pointerType === 'mouse') setActive(false) }}
      onPointerUp={e => {
        if (e.pointerType === 'touch') {
          e.currentTarget.releasePointerCapture(e.pointerId)
          setActive(v => !v)
        }
      }}
    >
      {/* ── Primary image – clean, no overlay ── */}
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes="(max-width: 768px) calc(100vw - 40px), 768px"
        className="object-cover"
        draggable={false}
      />

      {/* ── Secondary – slides in from right ── */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ x: active ? '0%' : '100%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {secondary ? (
          <Image src={secondary} alt="" fill sizes="(max-width: 768px) calc(100vw - 40px), 768px" className="object-cover" draggable={false} />
        ) : (
          /* No secondary: darken primary + dev state for upcoming */
          <>
            <Image src={project.image} alt="" fill sizes="(max-width: 768px) calc(100vw - 40px), 768px" className="object-cover brightness-[0.35]" draggable={false} />
            {isUpcoming && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                >
                  <FaTools size={26} className="text-amber-400/80" />
                </motion.div>
                <p className="text-amber-400/70 text-[10px] font-bold uppercase tracking-widest">In Development</p>
              </div>
            )}
          </>
        )}

        {/* Bottom overlay – always present on secondary, houses link icons */}
        <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/90 via-black/50 to-transparent pt-20 pb-4 px-4 pointer-events-none">
          <div className="flex items-end justify-between pointer-events-auto">

            {/* Two link icon buttons */}
            <div className="flex items-center gap-3">
              {hasGithub ? (
                <Link
                  href={project.githubUrl!}
                  target="_blank"
                  onClick={e => e.stopPropagation()}
                  onPointerUp={e => e.stopPropagation()}
                  title="Source Code"
                  className="w-11 h-11 bg-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
                >
                  <FaGithub size={20} className="text-black" />
                </Link>
              ) : (
                <div className="w-11 h-11 bg-white/8 border border-white/12 rounded-full flex items-center justify-center" title="Private repo">
                  <FaLock size={13} className="text-white/25" />
                </div>
              )}

              {hasLive ? (
                <Link
                  href={project.liveUrl!}
                  target="_blank"
                  onClick={e => e.stopPropagation()}
                  onPointerUp={e => e.stopPropagation()}
                  title="View Live"
                  className="w-11 h-11 bg-primary flex items-center justify-center shadow-xl shadow-primary/40 hover:scale-110 active:scale-95 transition-transform"
                >
                  <FaExternalLinkAlt size={15} className="text-white" />
                </Link>
              ) : (
                <div className="w-11 h-11 bg-amber-500/15 border border-amber-400/25 rounded-full flex items-center justify-center" title="Coming soon">
                  <FaTools size={13} className="text-amber-400/50" />
                </div>
              )}
            </div>

            {meta && <StatusBadge status={meta.status} />}
          </div>
        </div>
      </motion.div>

      {/* Subtle hint on primary (fades out when active) */}
      <motion.span
        className="absolute bottom-2.5 right-3 text-[8px] text-white/35 font-mono pointer-events-none select-none"
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {secondary ? 'hover · tap' : isUpcoming ? 'coming soon' : ''}
      </motion.span>
    </div>
  )
}

// ─── Animated separator ───────────────────────────────────────────────────────
function Separator({ num }: { num: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="relative flex items-center gap-3 my-1 origin-left"
    >
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 20 }}
        className="shrink-0 w-6 h-6 rounded-full border border-border/60 bg-background flex items-center justify-center"
      >
        <span className="text-[7px] font-mono text-muted-foreground/40">{String(num).padStart(2, '0')}</span>
      </motion.div>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
      {/* travelling shimmer */}
      <motion.div
        animate={{ x: ['-60px', '110vw'] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'linear', repeatDelay: 3 }}
        className="absolute inset-y-0 w-14 bg-linear-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
      />
    </motion.div>
  )
}

// ─── Timeline Item ────────────────────────────────────────────────────────────
// Single-column layout — same on mobile, tablet, and desktop.
function TimelineItem({ project, index }: { project: Project; index: number }) {
  const meta = META[project.id]

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ type: 'spring', stiffness: 50, damping: 18 }}
    >
      {/* ── Project header row ── */}
      <div className="flex items-start gap-4 mb-5">
        <span className="text-[4.5rem] leading-none font-black text-border/20 tabular-nums select-none shrink-0 -mt-2">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="pt-1 flex-1 min-w-0">
          <h2 className="text-xl md:text-2xl font-black tracking-tight truncate">{project.title}</h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
            {meta && <StatusBadge status={meta.status} />}
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 bg-secondary/40 border border-border/40 px-2 py-0.5 rounded-md whitespace-nowrap">
              {project.category}
            </span>
            {meta && (
              <>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground/55 whitespace-nowrap">
                  <FaUserTie size={9} />{meta.role}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground/55 whitespace-nowrap">
                  <FaClock size={9} />{meta.duration}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground/45">{meta.year}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Image ── */}
      <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg shadow-black/10">
        <ProjectImage project={project} />
      </div>

      {/* ── Content ── */}
      <div className="mt-6 space-y-5">

        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Metrics */}
        {meta && (
          <div className="flex flex-wrap gap-2">
            {meta.metrics.map(m => (
              <div key={m.label} className="px-4 py-2.5 bg-secondary/30 border border-border/40 rounded-xl text-center min-w-20">
                <div className="text-sm font-black text-primary">{m.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        {meta && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {meta.highlights.map(h => (
              <div key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                <FaCheckCircle className="text-primary/60 mt-0.5 shrink-0 text-[9px]" />
                {h}
              </div>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map(t => <TechPill key={t} tech={t} />)}
        </div>

        {/* Technical breakdown */}
        {meta && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border/30">
            {[
              { icon: <FaCode className="text-blue-400/80" size={10} />,   label: 'Architecture', text: meta.architecture },
              { icon: <FaServer className="text-green-400/80" size={10} />, label: 'Deployment',   text: meta.deployment },
              { icon: <FaShieldAlt className="text-purple-400/80" size={10} />, label: 'Security', text: meta.security },
              { icon: <FaBolt className="text-yellow-400/80" size={10} />, label: 'Performance',   text: meta.performance },
            ].map(item => (
              <div key={item.label} className="p-3.5 bg-secondary/15 border border-border/30 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1.5">
                  {item.icon}
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">{item.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Complexity indicator */}
        {meta && (
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest shrink-0">Complexity</span>
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className={`w-8 h-1 rounded-full ${i < meta.complexity ? 'bg-primary/50' : 'bg-border/50'}`} />
              ))}
            </div>
            <span className="text-[10px] font-mono text-primary/60">{meta.complexity}/3</span>
          </div>
        )}
      </div>
    </motion.article>
  )
}

// ─── Grid Card ────────────────────────────────────────────────────────────────
function GridCard({ project, index }: { project: Project; index: number }) {
  const meta = META[project.id]

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 55, damping: 18, delay: (index % 2) * 0.06 }}
      className="flex flex-col bg-secondary/8 border border-border/60 rounded-2xl overflow-hidden hover:border-primary/25 transition-colors duration-300"
    >
      {/* Image */}
      <ProjectImage project={project} />

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3.5">

        {/* Number + category */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-black text-primary/60 bg-primary/8 px-1.5 py-0.5 rounded">
            #{String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground/55 font-semibold">{project.category}</span>
          {meta && <span className="text-[10px] font-mono text-muted-foreground/45 ml-auto">{meta.year}</span>}
        </div>

        {/* Title + status */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-black tracking-tight leading-tight">{project.title}</h3>
          {meta && <div className="shrink-0 mt-0.5"><StatusBadge status={meta.status} /></div>}
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{project.description}</p>

        {/* Metrics */}
        {meta && (
          <div className="flex gap-2">
            {meta.metrics.map(m => (
              <div key={m.label} className="flex-1 px-2 py-2 bg-secondary/40 border border-border/30 rounded-xl text-center">
                <div className="text-xs font-black text-primary">{m.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech */}
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 5).map(t => <TechPill key={t} tech={t} />)}
          {project.stack.length > 5 && (
            <span className="text-[10px] text-muted-foreground/50 px-1.5 py-0.5 bg-secondary/30 rounded self-center">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* 2 highlights */}
        {meta && (
          <ul className="space-y-1.5 pt-0.5">
            {meta.highlights.slice(0, 2).map(h => (
              <li key={h} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <FaCheckCircle className="text-primary/55 shrink-0 mt-px text-[10px]" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const containerRef = useRef(null)
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [view, setView]           = useState<'timeline' | 'grid'>('timeline')

  const { scrollYProgress } = useScroll()
  const scaleY      = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const scrollWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const filtered = useMemo(() =>
    projects.filter(p => {
      const matchCat = category === 'All' || p.category === category
      const q = search.toLowerCase()
      return matchCat && (!q
        || p.title.toLowerCase().includes(q)
        || p.stack.some(t => t.toLowerCase().includes(q))
        || p.description.toLowerCase().includes(q))
    }),
  [search, category])

  const totalTechs = useMemo(() => new Set(projects.flatMap(p => p.stack)).size, [])
  const liveCount  = useMemo(() => projects.filter(p => META[p.id]?.status === 'live').length, [])

  return (
    <main ref={containerRef} className="relative min-h-screen bg-background pt-24 pb-36 overflow-x-hidden">

      {/* Progress bar */}
      <motion.div
        style={{ width: scrollWidth }}
        className="fixed top-0 left-0 h-0.5 bg-linear-to-r from-primary via-purple-500 to-blue-500 z-50 origin-left"
      />

      {/* Timeline spine — desktop only */}
      {view === 'timeline' && (
        <motion.div
          style={{ scaleY }}
          className="absolute left-[2.35rem] top-56 bottom-56 w-px bg-linear-to-b from-primary/0 via-primary/15 to-primary/0 origin-top hidden xl:block pointer-events-none"
        />
      )}

      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-primary/4 blur-[120px]" />
        <div className="absolute top-1/2 -left-32 w-100 h-100 rounded-full bg-purple-500/3 blur-[100px]" />
        <div className="absolute -bottom-20 right-1/3 w-87.5 h-87.5 rounded-full bg-blue-500/3 blur-[90px]" />
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-8">

        {/* ── HEADER ── */}
        <header className="mb-16 md:mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
            className="w-14 h-14 bg-primary/8 border border-primary/15 rounded-2xl flex items-center justify-center mb-7"
          >
            <FaLightbulb className="text-primary text-xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 border border-primary/12 rounded-full text-primary text-[9px] font-bold uppercase tracking-widest mb-5">
              <FaStar size={7} /> Portfolio · {projects.length} Projects
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, type: 'spring', stiffness: 55 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 leading-[0.9]"
          >
            The{' '}
            <span className="bg-linear-to-r from-primary via-blue-500 to-violet-500 bg-clip-text text-transparent">
              Build Log.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg"
          >
            From first{' '}
            <code className="text-primary bg-primary/8 px-1.5 py-0.5 rounded font-mono text-xs">init</code>
            {' '}to final deploy — a complete record of what I&apos;ve engineered.
          </motion.p>
        </header>

        {/* ── STATS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        >
          {[
            { icon: <FaLayerGroup size={13} className="text-primary" />,       value: projects.length, label: 'Projects' },
            { icon: <FaCheckCircle size={13} className="text-emerald-400" />,  value: liveCount,       label: 'Live' },
            { icon: <FaCode size={13} className="text-blue-400" />,            value: totalTechs,      label: 'Technologies' },
            { icon: <FaChartLine size={13} className="text-purple-400" />,     value: '90+',           label: 'Avg Perf' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3 px-4 py-3.5 bg-secondary/15 border border-border/50 rounded-2xl hover:border-primary/20 transition-colors">
              {s.icon}
              <div>
                <div className="text-lg font-black tracking-tight">{s.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">{s.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CONTROLS ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="flex flex-col gap-3 mb-10"
        >
          {/* Row 1: search + view toggle */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-[10px]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full pl-9 pr-8 py-2.5 bg-secondary/25 border border-border/60 rounded-xl text-sm placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary/40 focus:bg-secondary/40 transition-all"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                  <FaTimes size={10} />
                </button>
              )}
            </div>

            <div className="flex gap-0.5 p-1 bg-secondary/25 border border-border/60 rounded-xl shrink-0">
              <button
                onClick={() => setView('timeline')}
                className={`p-2 rounded-lg transition-all ${view === 'timeline' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground/60 hover:text-foreground'}`}
                title="Timeline"
              >
                <FaList size={11} />
              </button>
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground/60 hover:text-foreground'}`}
                title="Grid"
              >
                <FaThLarge size={11} />
              </button>
            </div>
          </div>

          {/* Row 2: category filters */}
          <div className="flex gap-1.5 flex-wrap">
            {ALL_CATS.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                  category === cat
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-secondary/25 border border-border/50 text-muted-foreground/60 hover:text-foreground hover:border-primary/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Result info */}
        <AnimatePresence>
          {(search || category !== 'All') && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-xs text-muted-foreground mb-7"
            >
              <span className="text-foreground font-bold">{filtered.length}</span> of {projects.length} projects
              {category !== 'All' && <> in <span className="text-primary font-semibold">{category}</span></>}
              {search && <> matching &ldquo;<span className="text-primary font-semibold">{search}</span>&rdquo;</>}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── PROJECT LIST ── */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-28"
            >
              <FaSearch className="text-4xl text-muted-foreground/15 mx-auto mb-4" />
              <p className="text-muted-foreground/60 font-semibold mb-5">No projects found</p>
              <button
                onClick={() => { setSearch(''); setCategory('All') }}
                className="px-5 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Clear filters
              </button>
            </motion.div>

          ) : view === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {filtered.map((p, i) => <GridCard key={p.id} project={p} index={i} />)}
            </motion.div>

          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filtered.map((p, i) => (
                <React.Fragment key={p.id}>
                  <div className="py-14">
                    <TimelineItem project={p} index={i} />
                  </div>
                  {i < filtered.length - 1 && <Separator num={i + 2} />}
                </React.Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="mt-32 p-px bg-linear-to-br from-primary/60 via-purple-500/40 to-blue-500/60 rounded-3xl"
        >
          <div className="bg-background rounded-[calc(1.5rem-1px)] p-8 md:p-14 text-center relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-primary/4 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-purple-500/4 blur-2xl" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/8 border border-primary/15 rounded-full text-primary text-[9px] font-bold uppercase tracking-widest mb-6">
              <FaRocket size={7} />{'Let\'s Build Together'}
            </span>

            <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-4">
              The Next Chapter{' '}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-400">
                Could Be Yours.
              </span>
            </h2>

            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-8 leading-relaxed">
              Whether it&apos;s SaaS, an admin system, or AI-powered tooling — I turn ideas into production-grade applications.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/booking" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-primary text-primary-foreground font-black shadow-lg hover:opacity-90 transition-opacity text-xs uppercase tracking-wider">
                <FaRocket size={10} /> Hire Me Today
              </Link>
              <Link href="/assets/ADE_RESUME.pdf" download="Adeoluwa_Adeoye_Resume.pdf" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-secondary text-foreground font-black border border-border hover:border-primary/30 transition-colors text-xs uppercase tracking-wider">
                <FaCode size={10} /> Download Resume
              </Link>
              <Link href="https://github.com/adeoluwaadeoye" target="_blank" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-secondary text-foreground font-black border border-border hover:border-primary/30 transition-colors text-xs uppercase tracking-wider">
                <FaGithub size={12} /> GitHub Profile
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  )
}
