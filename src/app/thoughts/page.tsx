'use client'

import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { HiPlus, HiOutlineSparkles } from 'react-icons/hi'
import { RiDoubleQuotesL, RiDoubleQuotesR, RiVerifiedBadgeFill } from 'react-icons/ri'
import { FaStar, FaGithub, FaLinkedin } from 'react-icons/fa'
import { FiPhoneCall, FiArrowUpRight, FiUsers } from 'react-icons/fi'
import { SiGooglemeet } from 'react-icons/si'
import { FaXTwitter } from 'react-icons/fa6'
import { TbMessageStar, TbBrandProducthunt } from 'react-icons/tb'
import { MdOutlineWorkspacePremium } from 'react-icons/md'
import { BiSolidQuoteLeft } from 'react-icons/bi'

// ─── Types ──────────────────────────────────────────────────────────────────

type Platform = 'LinkedIn' | 'GitHub' | 'Twitter' | 'ProductHunt'
type Category = 'All' | 'Engineering' | 'Design' | 'Leadership' | 'Delivery'

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  shortQuote: string
  initials: string
  platform: Platform
  category: Category
  color: string
  accentColor: string
  featured?: boolean
  projectTag?: string
  dateLabel?: string
}

// ─── Data ───────────────────────────────────────────────────────────────────

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Chinedu Okeke',
    role: 'Founding Engineer',
    company: 'LagosTech',
    content:
      'The full-stack architecture Adeolu delivered was not only scalable but incredibly clean. His understanding of distributed systems and African market constraints is something you simply cannot teach — it\'s hard-won experience. He shipped features in weeks that our previous team couldn\'t deliver in quarters.',
    shortQuote: 'Shipped in weeks what others couldn\'t in quarters.',
    initials: 'CO',
    platform: 'LinkedIn',
    category: 'Engineering',
    color: 'bg-blue-500/10',
    accentColor: 'text-blue-500',
    featured: true,
    projectTag: 'SaaS Platform',
    dateLabel: 'Q4 2024',
  },
  {
    name: 'Marcus Chen',
    role: 'Founder',
    company: 'Peak SaaS',
    content:
      'Transformed our legacy codebase into a modern, high-performance application. The ROI was immediate. Adeolu\'s code quality is top-tier — reviewers on my team were genuinely impressed by his architectural decisions, especially around database indexing and query optimization.',
    shortQuote: 'The ROI was immediate. Code quality is top-tier.',
    initials: 'MC',
    platform: 'GitHub',
    category: 'Engineering',
    color: 'bg-slate-500/10',
    accentColor: 'text-slate-500',
    projectTag: 'Legacy Migration',
    dateLabel: 'Q1 2025',
  },
  {
    name: 'Amina Yusuf',
    role: 'Product Manager',
    company: 'FinTrack',
    content:
      'Insightful, professional, and brilliant at bridging the gap between product vision and technical execution. He never just builds what you ask — he asks why you need it, then builds it better. One of the best collaborators I\'ve worked with in years.',
    shortQuote: 'He never just builds what you ask — he builds it better.',
    initials: 'AY',
    platform: 'Twitter',
    category: 'Delivery',
    color: 'bg-emerald-500/10',
    accentColor: 'text-emerald-500',
    featured: true,
    projectTag: 'FinTech Dashboard',
    dateLabel: 'Q2 2025',
  },
  {
    name: 'Tolani Adeyemi',
    role: 'CTO',
    company: 'BuildNG',
    content:
      'Rare to find someone who can own both the frontend experience and backend infrastructure at this level. Adeolu architected our entire API layer, set up CI/CD pipelines, and still had time to polish the UI with micro-animations that our users actually comment on.',
    shortQuote: 'Owns frontend experience and backend infrastructure at this level.',
    initials: 'TA',
    platform: 'LinkedIn',
    category: 'Leadership',
    color: 'bg-violet-500/10',
    accentColor: 'text-violet-500',
    projectTag: 'Full Product Build',
    dateLabel: 'Q3 2024',
  },
  {
    name: 'Sophie Müller',
    role: 'Lead Designer',
    company: 'Studio Nord',
    content:
      'I\'ve worked with many developers who promise to implement designs pixel-perfect and then compromise on everything. Adeolu was different. He not only respected the design system but proactively suggested improvements for accessibility and responsive breakpoints.',
    shortQuote: 'Respected the design system and improved it.',
    initials: 'SM',
    platform: 'Twitter',
    category: 'Design',
    color: 'bg-rose-500/10',
    accentColor: 'text-rose-500',
    projectTag: 'Design System',
    dateLabel: 'Q2 2024',
  },
  {
    name: 'Kayode Balogun',
    role: 'Engineering Manager',
    company: 'Flutterwave',
    content:
      'Exceptionally self-directed. Handed him an ambiguous ticket and he came back with a solution, the edge cases he handled, and a performance benchmark. That level of ownership is hard to find at any seniority level. He elevated the whole team\'s standards.',
    shortQuote: 'Elevated the whole team\'s standards.',
    initials: 'KB',
    platform: 'LinkedIn',
    category: 'Leadership',
    color: 'bg-amber-500/10',
    accentColor: 'text-amber-500',
    projectTag: 'Payments Infrastructure',
    dateLabel: 'Q1 2024',
  },
]

const CATEGORIES: Category[] = ['All', 'Engineering', 'Design', 'Leadership', 'Delivery']

const STATS = [
  { value: '40+', label: 'Projects Delivered', icon: TbBrandProducthunt },
  { value: '98%', label: 'Client Satisfaction', icon: TbMessageStar },
  { value: '15+', label: 'Long-term Partners', icon: FiUsers },
  { value: '5★', label: 'Average Rating', icon: MdOutlineWorkspacePremium },
]

// ─── Platform Icon Map ───────────────────────────────────────────────────────

function PlatformIcon({ platform }: { platform: Platform }) {
  const icons: Record<Platform, React.ReactNode> = {
    LinkedIn: <FaLinkedin className="text-blue-600" size={16} />,
    GitHub: <FaGithub className="text-slate-800 dark:text-white" size={16} />,
    Twitter: <FaXTwitter className="text-black dark:text-white" size={16} />,
    ProductHunt: <TbBrandProducthunt className="text-orange-500" size={16} />,
  }
  return <>{icons[platform]}</>
}

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
}

// ─── Stat Counter ────────────────────────────────────────────────────────────

function StatCard({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-border bg-card/60 backdrop-blur-sm text-center group hover:border-primary/30 hover:bg-primary/5 transition-all duration-500"
    >
      <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="text-primary" size={20} />
      </div>
      <span className="text-2xl md:text-4xl font-black tracking-tighter text-foreground">{stat.value}</span>
      <span className="text-[10px] md:text-sm text-muted-foreground font-semibold tracking-wide uppercase">{stat.label}</span>
    </motion.div>
  )
}

// ─── Featured Testimonial ────────────────────────────────────────────────────

function FeaturedCard({ t }: { t: Testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative col-span-full rounded-4xl md:rounded-[2.5rem] border border-primary/20 bg-card overflow-hidden p-8 md:p-16 group shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full md:w-2/3 h-full bg-linear-to-br from-primary/8 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-accent/5 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
        <div className="space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
            <HiOutlineSparkles size={12} /> Featured
          </div>

          <div className="relative">
            <BiSolidQuoteLeft className="absolute -top-6 -left-4 text-primary/10 md:text-primary/20 w-12 h-12 md:w-16 md:h-16" />
            <p className="relative text-xl md:text-4xl font-black tracking-tight leading-tight md:leading-[1.15] text-foreground">
              &quot;{t.content}&quot;
            </p>
          </div>

          <div className="flex gap-1 text-orange-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} size={14} className="md:w-4 md:h-4" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-4 md:gap-6 pt-6 border-t border-border/50 lg:border-none lg:pt-0">
          <div className={`w-14 h-14 md:w-20 md:h-20 ${t.color} rounded-2xl md:rounded-3xl flex items-center justify-center font-black text-xl md:text-2xl text-primary border border-primary/10 shadow-inner`}>
            {t.initials}
          </div>
          <div className="text-left lg:text-right">
            <p className="font-black text-base md:text-lg tracking-tight">{t.name}</p>
            <p className="text-xs md:text-sm text-muted-foreground font-semibold">{t.role}</p>
            <p className="text-xs md:text-sm text-primary font-bold">{t.company}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 md:px-3 py-1 rounded-full font-bold uppercase tracking-widest">{t.projectTag}</span>
            <span className="text-[10px] text-muted-foreground bg-secondary px-2 md:px-3 py-1 rounded-full font-bold">{t.dateLabel}</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
            <RiVerifiedBadgeFill className="text-primary" size={14} />
            Verified · <PlatformIcon platform={t.platform} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Standard Testimonial Card ───────────────────────────────────────────────

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="break-inside-avoid relative p-6 md:p-8 rounded-3xl md:rounded-4xl border bg-card text-card-foreground shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 group cursor-default"
    >
      <div className="absolute inset-0 rounded-3xl md:rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-primary/4 via-transparent to-transparent pointer-events-none" />

      <div className="relative flex justify-between items-start mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 md:w-12 md:h-12 ${t.color} rounded-xl md:rounded-2xl flex items-center justify-center font-black text-sm md:text-base text-primary border border-primary/10 shadow-inner shrink-0`}>
            {t.initials}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm md:text-base leading-tight tracking-tight truncate">{t.name}</h4>
            <p className="text-[10px] md:text-xs text-muted-foreground font-semibold truncate">{t.role}</p>
            <p className={`text-[10px] md:text-xs font-bold truncate ${t.accentColor}`}>{t.company}</p>
          </div>
        </div>
        <div className="p-2 bg-secondary/60 rounded-lg md:rounded-xl border group-hover:bg-background transition-colors shrink-0 ml-2">
          <PlatformIcon platform={t.platform} />
        </div>
      </div>

      <div className="relative flex gap-0.5 text-orange-400 mb-4">
        {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={10} className="md:w-3 md:h-3" />)}
        <span className="ml-2 text-[10px] text-muted-foreground font-semibold self-center">5.0</span>
      </div>

      <RiDoubleQuotesL className="text-primary/20 mb-2" size={24} />

      <div className="relative space-y-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={expanded ? 'full' : 'short'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-sm md:text-base leading-relaxed font-medium text-foreground/85 italic"
          >
            &quot;{expanded ? t.content : t.shortQuote}&quot;
          </motion.p>
        </AnimatePresence>
        <div className="flex justify-end">
          <RiDoubleQuotesR className="text-primary/20" size={18} />
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[10px] md:text-xs text-primary font-bold hover:underline underline-offset-2 flex items-center gap-1 transition-colors"
        >
          {expanded ? 'Show less' : 'Read full review'} <FiArrowUpRight size={12} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="relative mt-6 pt-4 border-t border-dashed flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
          <RiVerifiedBadgeFill className="text-primary" size={12} />
          Verified
        </div>
        <div className="flex gap-2">
          {t.projectTag && (
            <span className="text-[9px] font-bold uppercase tracking-widest bg-secondary px-2 py-0.5 rounded-full text-muted-foreground border">{t.projectTag}</span>
          )}
          {t.dateLabel && (
            <span className="text-[9px] font-bold bg-secondary px-2 py-0.5 rounded-full text-muted-foreground/70 border">{t.dateLabel}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ThoughtsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const blobY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const filteredTestimonials = TESTIMONIALS.filter(
    (t) => activeCategory === 'All' || t.category === activeCategory,
  )

  const featuredTestimonials = filteredTestimonials.filter((t) => t.featured)
  const regularTestimonials = filteredTestimonials.filter((t) => !t.featured)

  return (
    <main className="min-h-screen mt-6 bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-violet-500 to-accent z-50 origin-left shadow-[0_0_12px_rgba(var(--primary),0.4)]"
        style={{ scaleX }}
      />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ y: blobY }} className="absolute top-[-15%] left-[-10%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-primary/4 blur-[100px] md:blur-[140px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[70%] md:w-[40%] h-[40%] rounded-full bg-accent/4 blur-[100px] md:blur-[120px]" />
      </div>

      <div className="relative z-10 pt-20 md:pt-28 pb-20 md:pb-32 px-4 sm:px-12">
        <div className="max-w-7xl mx-auto">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 items-end mb-16 md:mb-28">

            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 md:space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-secondary border text-secondary-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm">
                <RiDoubleQuotesL size={14} className="text-primary" />
                Social Proof
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl capitalize font-black tracking-tighter mb-4 md:mb-6 leading-[0.95]">
                Words from <br />
                <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">those who know.</span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground/70 font-bold uppercase tracking-widest leading-relaxed max-w-xs">
                Real collaborators. Real projects. Real outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 md:space-y-8"
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Collaboration is the core of great software. Here is what happens when Nigerian engineering resilience meets global-standard technical execution.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="group px-6 md:px-8 py-3.5 md:py-4 bg-primary text-primary-foreground  font-bold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 active:scale-95"
                >
                  Add Your Review <HiPlus className="group-hover:rotate-90 transition-transform duration-300" />
                </Link>
                <Link
                  href="/contact"
                  className="group px-6 md:px-8 py-3.5 md:py-4 bg-secondary text-secondary-foreground border  font-bold flex items-center justify-center gap-3 hover:bg-background hover:border-primary/30 transition-all duration-300 active:scale-95"
                >
                  Work Together <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ── STATS ROW ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16 md:mb-20">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* ── CATEGORY FILTER ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 md:gap-3 mb-10 md:mb-14"
          >
            <span className="w-full md:w-auto text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 md:mb-0 md:mr-2">Filter by</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-secondary text-secondary-foreground border-border hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
            <span className="hidden md:inline-block ml-auto text-xs text-muted-foreground/50 font-semibold">
              {filteredTestimonials.length} review{filteredTestimonials.length !== 1 ? 's' : ''}
            </span>
          </motion.div>

          {/* ── FEATURED CARDS ────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {featuredTestimonials.length > 0 && (
              <motion.div
                key={activeCategory + '-featured'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 gap-6 md:gap-8 mb-6 md:mb-8"
              >
                {featuredTestimonials.map((t) => (
                  <FeaturedCard key={t.name} t={t} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── MASONRY GRID ──────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + '-regular'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6"
            >
              {regularTestimonials.map((t, i) => (
                <TestimonialCard key={t.name} t={t} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── TRUST STRIP ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 md:mt-20 py-8 md:py-10 px-6 md:px-8 rounded-3xl border border-dashed border-border/60 flex flex-col md:flex-row items-center justify-between gap-8 bg-secondary/20"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
              <div className="flex -space-x-3">
                {TESTIMONIALS.slice(0, 5).map((t) => (
                  <div
                    key={t.initials}
                    className={`w-8 h-8 md:w-10 md:h-10 ${t.color} rounded-full flex items-center justify-center text-[10px] md:text-xs font-black text-primary border-2 border-background`}
                  >
                    {t.initials}
                  </div>
                ))}
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center text-[10px] md:text-xs font-black text-primary border-2 border-background">
                  +{TESTIMONIALS.length - 5}
                </div>
              </div>
              <div>
                <p className="font-black text-sm md:text-base tracking-tight">Join {TESTIMONIALS.length}+ satisfied clients</p>
                <p className="text-xs md:text-sm text-muted-foreground">Across fintech, SaaS, design systems &amp; more</p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-1 text-orange-400">
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <FaStar key={i} size={16} />)}
                </div>
                <span className="text-lg md:text-xl font-black text-foreground ml-1">5.0</span>
              </div>
              <span className="text-[10px] md:text-sm text-muted-foreground">average across all platforms</span>
            </div>
          </motion.div>

          {/* ── CTA CARD ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 md:mt-24 p-0.5 bg-linear-to-tr from-primary via-violet-500 to-accent rounded-4xl md:rounded-[3rem] shadow-2xl shadow-primary/20"
          >
            <div className="bg-card rounded-[1.9rem] md:rounded-[2.9rem] p-8 md:p-20 flex flex-col xl:flex-row items-center justify-between gap-12 md:gap-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

              <div className="relative space-y-6 text-center xl:text-left w-full xl:w-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <HiOutlineSparkles size={12} /> Ready to collaborate?
                </div>
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-none">
                  Start a <br className="hidden md:block" />
                  <span className="italic font-serif text-muted-foreground/40">conversation.</span>
                </h2>
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 md:gap-4">
                  <div className="flex items-center gap-2 text-[10px] md:text-sm font-bold text-muted-foreground bg-secondary px-3 md:px-4 py-2 rounded-full border">
                    <SiGooglemeet className="text-red-500" size={14} />
                    Virtual Meet
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-sm font-bold text-muted-foreground bg-secondary px-3 md:px-4 py-2 rounded-full border">
                    🌍 Lagos, NG (GMT+1)
                  </div>
                  <div className="flex items-center gap-2 text-[10px] md:text-sm font-bold text-muted-foreground bg-secondary px-3 md:px-4 py-2 rounded-full border">
                    ⚡ Fast Response
                  </div>
                </div>
              </div>

              <div className="relative flex flex-col gap-4 w-full md:w-auto items-center xl:items-end">
                <Link
                  href="tel:+2348140898790"
                  className="group w-full md:w-auto px-8 md:px-10 py-5 md:py-6 bg-primary text-primary-foreground font-bold text-lg md:text-xl hover:bg-primary/90 hover:shadow-[0_20px_60px_rgba(var(--primary),0.35)] transition-all duration-300 flex items-center justify-center gap-4 active:scale-95"
                >
                  <FiPhoneCall size={20} className="md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" />
                  +234 814 089 8790
                </Link>
                <Link
                  href="/booking"
                  className="group w-full md:w-auto px-8 md:px-10 py-4 md:py-5 bg-secondary text-secondary-foreground border border-border font-bold text-sm md:text-base hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
                >
                  Book a Discovery Call
                  <FiArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
                <p className="text-[10px] md:text-xs text-muted-foreground/50 text-center font-medium">
                  No commitment. Just a conversation.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}