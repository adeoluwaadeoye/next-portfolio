'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, MapPin, Download } from 'lucide-react'
import { FaCode } from 'react-icons/fa'
import SocialIcon from '@/components/icons/SocialIcon'
import { navigation, socialLinks } from '@/data/navigation'
import { getSocialStyle } from '@/lib/SocialStyles'

const MotionLink = motion.create(Link)

const navGroups = [
  { label: 'Navigation', links: navigation.slice(0, 5) },
  { label: 'More',       links: navigation.slice(5) },
]

const stack = ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion']

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative border-t border-border/50 bg-background overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-10 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 pb-10 sm:pb-12 lg:pb-14 border-b border-border/40">

          {/* Brand — full width on mobile & sm, 4/12 on lg */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            <Link href="/" className="inline-flex items-center gap-2 group w-fit">
              <span className="font-heading font-black text-2xl tracking-tight group-hover:text-primary transition-colors">AA</span>
              <span className="text-xs font-mono text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">.dev</span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm lg:max-w-xs">
              Full-stack engineer crafting high-performance web applications and scalable
              digital products — from Lagos, Nigeria, to the world.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <MapPin size={12} />
              <span>Lagos, Nigeria · Open to Remote</span>
            </div>

            <Link
              href="mailto:adeoluadeoye7@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <Mail size={14} />
              adeoluadeoye7@gmail.com
            </Link>

            {/* Social icons */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              {socialLinks.map((social, i) => {
                const style = getSocialStyle(social.label)
                return (
                  <MotionLink
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="w-9 h-9 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-0.5 active:scale-95 shadow-sm"
                    style={{ backgroundColor: style.bg, color: style.icon }}
                  >
                    <SocialIcon name={social.label} size={16} />
                  </MotionLink>
                )
              })}
            </div>
          </div>

          {/* Nav columns — each half on sm, 2/12 on lg */}
          {navGroups.map((group) => (
            <div key={group.label} className="lg:col-span-2 flex flex-col gap-4 sm:gap-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
                {group.label}
              </h4>
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group w-fit flex items-center gap-1.5"
                    >
                      <span className="absolute -left-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary text-[10px]">›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA column — full width on sm, 4/12 on lg */}
          <div className="sm:col-span-2 lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
              Work Together
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              <Link
                href="/booking"
                className="group inline-flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border border-border/60 bg-foreground text-background hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300"
              >
                <div>
                  <p className="text-sm font-black">Book a Strategy Call</p>
                  <p className="text-xs opacity-60 mt-0.5">Free 30-min consultation</p>
                </div>
                <ArrowUp className="rotate-45 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" size={16} />
              </Link>

              <Link
                href="/assets/ADE_RESUME.pdf"
                download="Adeoluwa_Adeoye_Resume.pdf"
                className="group inline-flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 sm:py-4 border border-border/60 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300"
              >
                <div>
                  <p className="text-sm font-bold text-foreground">Download Resume</p>
                  <p className="text-xs text-muted-foreground mt-0.5">PDF · Updated {year}</p>
                </div>
                <Download size={16} className="text-muted-foreground group-hover:text-foreground shrink-0 transition-colors" />
              </Link>
            </div>

            {/* Stack badges */}
            <div className="pt-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 font-black mb-2.5">
                Built with
              </p>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-border/50 bg-secondary/30 text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground order-3 sm:order-1">
            <FaCode size={11} className="text-primary/50" />
            <span suppressHydrationWarning>© {year} Adeoluwa Adeoye — All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground order-1 sm:order-2">
            Built with love
            <span className="text-base leading-none" role="img" aria-label="love">❤️</span>
            in Lagos
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group order-2 sm:order-3 flex items-center gap-2 text-xs text-foreground hover:text-foreground transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full border border-border/50 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
              <ArrowUp size={13} />
            </div>
          </button>
        </div>

      </div>
    </footer>
  )
}
