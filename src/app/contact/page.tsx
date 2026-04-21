'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const MotionLink = motion.create(Link)
import {
  Mail, Phone, MessageCircle, Send, CheckCircle2, Loader2,
  Clock, MapPin, Zap, ArrowRight, Globe, Server, Layers, Terminal, BarChart3
} from 'lucide-react'
import { toast, Toaster } from 'sonner'

import { socialLinks } from '@/data/navigation'
import SocialIcon from '@/components/icons/SocialIcon'
import { getSocialStyle } from '@/lib/SocialStyles'
import { sendEmail } from '@/lib/sendEmail'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const PROJECT_TYPES = [
  { id: 'fullstack', label: 'Fullstack App', icon: <Layers size={14} /> },
  { id: 'backend',   label: 'API / Backend', icon: <Server size={14} /> },
  { id: 'frontend',  label: 'Frontend',      icon: <Globe size={14} /> },
  { id: 'devops',    label: 'DevOps',         icon: <Terminal size={14} /> },
  { id: 'consult',   label: 'Consulting',     icon: <BarChart3 size={14} /> },
]

const NEXT_STEPS = [
  { step: '01', title: 'Review & Reply', desc: 'I read every message and reply within 24 h.' },
  { step: '02', title: 'Discovery Call', desc: '30-min call to align on scope, stack & goals.' },
  { step: '03', title: 'Proposal',       desc: 'Detailed plan with timeline and pricing.' },
]

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay: i * 0.08 },
  }),
} as const

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending,      setIsPending]      = useState(false)
  const [isSuccess,      setIsSuccess]      = useState(false)
  const [messageLength,  setMessageLength]  = useState(0)
  const [localTime,      setLocalTime]      = useState<string>('')
  const [selectedType,   setSelectedType]   = useState<string>('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Lagos',
      hour: 'numeric', minute: '2-digit', hour12: true,
    })
    const tick = () => setLocalTime(fmt.format(new Date()))
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  const phoneNumber  = '+2348140898790'
  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=Hi%20Adeolu%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!`

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    try {
      const result = await sendEmail(formData)
      if (result.success) {
        setIsSuccess(true)
        toast.success('Message sent!', { description: "I'll reply within 24–48 hours." })
        formRef.current?.reset()
        setMessageLength(0)
        setSelectedType('')
        setTimeout(() => setIsSuccess(false), 6500)
      } else {
        toast.error(result.error || 'Failed to send message.')
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsPending(false)
    }
  }

  const charPct = Math.min((messageLength / 800) * 100, 100)

  return (
    <main className="min-h-screen pt-28 pb-28 px-4 md:px-6 bg-background relative overflow-hidden">
      <Toaster position="top-center" richColors closeButton />

      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -right-40 w-150 h-150 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-125 h-125 rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      {/* Floating WhatsApp */}
      <MotionLink
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20c65b] text-white px-6 py-3.5 shadow-2xl font-semibold text-sm"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">Chat on WhatsApp</span>
      </MotionLink>

      <div className="max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate="visible"
          className="mb-16 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Available for new projects
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95]">
            Let&apos;s build something{' '}
            <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
              legendary
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            Open for freelance projects and full-time opportunities.
            Fast replies, transparent process, zero fluff.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="lg:col-span-5 space-y-6">

            {/* Contact cards */}
            {[
              {
                href: 'mailto:adeoluadeoye7@gmail.com',
                icon: <Mail className="w-5 h-5" />,
                label: 'Email',
                value: 'adeoluadeoye7@gmail.com',
                i: 1,
              },
              {
                href: `tel:${phoneNumber}`,
                icon: <Phone className="w-5 h-5" />,
                label: 'Phone / WhatsApp',
                value: '+234 814 089 8790',
                i: 2,
              },
            ].map(({ href, icon, label, value, i }) => (
              <MotionLink
                key={label}
                href={href}
                variants={fadeUp} custom={i} initial="hidden" animate="visible"
                className="group flex items-center gap-5 p-6 border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:border-primary/40 group-hover:scale-110 transition-all duration-300">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">{label}</p>
                  <p className="font-semibold text-base mt-0.5 truncate">{value}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </MotionLink>
            ))}

            {/* Location + time */}
            <motion.div
              variants={fadeUp} custom={3} initial="hidden" animate="visible"
              className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-card"
            >
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Lagos, Nigeria</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-semibold text-base">{localTime} WAT</span>
                </div>
              </div>
            </motion.div>

            {/* What happens next */}
            <motion.div
              variants={fadeUp} custom={4} initial="hidden" animate="visible"
              className="p-6 rounded-2xl border border-border bg-card space-y-5"
            >
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">What happens next</p>
              <div className="space-y-4">
                {NEXT_STEPS.map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 w-7 h-7 rounded-lg bg-primary/10 text-primary text-[11px] font-black flex items-center justify-center">
                      {step}
                    </span>
                    <div>
                      <p className="font-semibold text-sm">{title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp} custom={5} initial="hidden" animate="visible"
            >
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-4 px-1">Connect online</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => {
                  const style = getSocialStyle(social.label)
                  return (
                    <MotionLink
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 flex items-center justify-center transition-shadow hover:shadow-xl active:scale-95"
                      style={{ backgroundColor: style.bg, color: style.icon }}
                    >
                      <SocialIcon name={social.label} className="text-xl" />
                    </MotionLink>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN – FORM ── */}
          <motion.div
            variants={fadeUp} custom={1} initial="hidden" animate="visible"
            className="lg:col-span-7"
          >
            <div className="relative bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl shadow-black/5">

              {/* Accent gradient line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent rounded-full" />

              {/* Success overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 bg-background/96 backdrop-blur-xl flex flex-col items-center justify-center rounded-3xl text-center px-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                      className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </motion.div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                      I&apos;ll review your project details and get back to you within 24–48 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mb-7">
                <h2 className="text-xl font-black tracking-tight">Send a message</h2>
                <p className="text-sm text-muted-foreground mt-1">Fill in the details below and I&apos;ll get back to you promptly.</p>
              </div>

              {/* Project type chips */}
              <div className="mb-7">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Project type</p>
                <input type="hidden" name="projectType" value={selectedType} />
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map(({ id, label, icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSelectedType(prev => prev === id ? '' : id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200
                        ${selectedType === id
                          ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
                        }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <form ref={formRef} action={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</Label>
                    <Input id="fullName" name="fullName" required placeholder="John Doe" className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="emailAddress" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                    <Input id="emailAddress" name="emailAddress" type="email" required placeholder="john@example.com" className="h-11 rounded-xl" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Budget Range</Label>
                    <Select name="budget">
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$1k-$5k">$1,000 – $5,000</SelectItem>
                        <SelectItem value="$5k-$15k">$5,000 – $15,000</SelectItem>
                        <SelectItem value="$15k-$30k">$15,000 – $30,000</SelectItem>
                        <SelectItem value="$30k+">$30,000+</SelectItem>
                        <SelectItem value="exploring">Just exploring</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Timeline</Label>
                    <Select name="timeline">
                      <SelectTrigger className="h-11 rounded-xl">
                        <SelectValue placeholder="When do you need this?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (next 2 weeks)</SelectItem>
                        <SelectItem value="1month">Within 1 month</SelectItem>
                        <SelectItem value="1-3months">1–3 months</SelectItem>
                        <SelectItem value="3-6months">3–6 months</SelectItem>
                        <SelectItem value="planning">Just planning ahead</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="details" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project Details</Label>
                    <span className={`text-xs font-mono tabular-nums transition-colors ${charPct > 85 ? 'text-orange-500' : 'text-muted-foreground'}`}>
                      {messageLength}/800
                    </span>
                  </div>
                  <Textarea
                    id="details"
                    name="details"
                    required
                    rows={6}
                    maxLength={800}
                    placeholder="Describe your project, goals, tech stack, constraints..."
                    className="resize-y min-h-32 rounded-xl"
                    onChange={(e) => setMessageLength(e.target.value.length)}
                  />
                  {/* Progress bar */}
                  <div className="h-0.5 w-full bg-border rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${charPct > 85 ? 'bg-orange-500' : 'bg-primary'}`}
                      animate={{ width: `${charPct}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <Button
                  disabled={isPending}
                  type="submit"
                  size="lg"
                  className="w-full h-13 text-sm font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 group cursor-pointer"
                >
                  {isPending ? (
                    <>
                      Sending
                      <Loader2 className="ml-3 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Zap className="ml-3 h-4 w-4 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  <Send className="inline w-3 h-3 mr-1 -mt-0.5" />
                  Average response time: <span className="font-semibold text-foreground">under 24 hours</span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
