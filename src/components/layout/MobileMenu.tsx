'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  LayoutGrid,
  Wrench,
  PenTool,
  PhoneCall,
  Settings,
  User,
  Download,
} from 'lucide-react'

import SocialIcon from '@/components/icons/SocialIcon'
import { socialLinks } from '@/data/navigation'
import { getSocialStyle } from '@/lib/SocialStyles'
import { ThemeToggleSwitch } from '@/components/ui/ThemeToggle'

type Props = {
  open: boolean
  onClose: () => void
}

type NavItem = {
  label: string
  href: string
  icon: React.ElementType
  download?: boolean
}

/* NAV DATA */
const mainLinks: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Projects', href: '/projects', icon: LayoutGrid },
  { label: 'About', href: '/about', icon: User },
]

const exploreLinks: NavItem[] = [
  { label: 'Tools', href: '/tools', icon: Wrench },
  { label: 'Thoughts', href: '/thoughts', icon: PenTool },
  { label: 'Services', href: '/services', icon: Settings },
]

const actionLinks: NavItem[] = [
  { label: 'Book a Call', href: '/booking', icon: PhoneCall },
]

/* CV ITEM (SPECIAL) */
const cvItem: NavItem = {
  label: 'Download CV',
  href: '/assets/ADEOLUWA_CV.pdf',
  icon: Download,
  download: true,
}

/* DIVIDER */
const Divider = () => (
  <div className="my-2 h-px w-full bg-foreground/15 dark:bg-foreground/25" />
)

export default function MobileMenu({ open, onClose }: Props) {

  useEffect(() => {
    const body = document.body
    const html = document.documentElement

    if (open) {
      body.style.overflow = 'hidden'
      body.style.position = 'fixed'
      body.style.width = '100%'
      html.style.overflow = 'hidden'
    } else {
      body.style.overflow = ''
      body.style.position = ''
      body.style.width = ''
      html.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
      body.style.position = ''
      body.style.width = ''
      html.style.overflow = ''
    }
  }, [open])

  const renderLink = (item: NavItem, i: number, delay: number) => {
    const Icon = item.icon

    const baseClasses =
      "flex items-center gap-3 py-2.5 px-2 rounded-lg " +
      "text-muted-foreground hover:text-foreground hover:bg-muted/40 transition"

    const content = (
      <>
        <Icon size={18} />
        <span className="text-sm font-medium">{item.label}</span>
      </>
    )

    return (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: delay + i * 0.04 }}
      >
        {item.download ? (
          <a
            href={item.href}
            download="ADEOLUWA_CV.pdf"
            className={baseClasses}
            onClick={onClose}
          >
            {content}
          </a>
        ) : (
          <Link href={item.href} onClick={onClose} className={baseClasses}>
            {content}
          </Link>
        )}
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.aside
            className="
              fixed right-0 top-0 z-50
              h-full w-full sm:w-105
              bg-background text-foreground
              border-l border-border
              flex flex-col
            "
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
          >

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-xl font-semibold">
                  AA
                </span>
                <p className="text-[10px] uppercase tracking-wider">
                  Creative Engineer
                </p>
                <p className="text-[9px] font-bold text-green-600 tracking-widest leading-loose">
                  Building the Future
                </p>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="
                  w-12 h-12 text-lg font-bold flex items-center justify-center
                  rounded-md border border-border
                  hover:bg-muted/30 active:scale-95 transition
                "
              >
                ✕
              </button>
            </div>

            {/* THEME */}
            <div className="flex items-center justify-between px-5 py-1 border-b border-border">
              <span className="text-xs text-muted-foreground">
                Appearance
              </span>
              <ThemeToggleSwitch />
            </div>

            {/* NAV */}
            <nav className="flex flex-col flex-1 px-5 py-3">

              <span className="text-[10px] uppercase text-muted-foreground">
                Main
              </span>
              {mainLinks.map((item, i) => renderLink(item, i, 0.03))}

              <Divider />

              <span className="text-[10px] uppercase text-muted-foreground">
                Explore
              </span>
              {exploreLinks.map((item, i) => renderLink(item, i, 0.15))}

              <Divider />

              <span className="text-[10px] uppercase text-muted-foreground">
                Action
              </span>
              {actionLinks.map((item, i) => renderLink(item, i, 0.25))}

              {/* CV DOWNLOAD (NEW) */}
              <Divider />
              <span className="text-[10px] uppercase text-muted-foreground">
                Resume
              </span>
              {renderLink(cvItem, 0, 0.3)}

            </nav>

            {/* SOCIAL */}
            <div className="border-t border-border py-4 px-5">
              <div className="flex justify-center gap-5">
                {socialLinks.map((item, i) => {
                  const style = getSocialStyle(item.label)

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.04 }}
                      className="flex flex-col items-center gap-1"
                    >
                      <span
                        className="w-9 h-9 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: style.bg,
                          color: style.icon,
                        }}
                      >
                        <SocialIcon name={item.label} className="text-[16px]" />
                      </span>

                      <span className="text-[10px] text-muted-foreground">
                        {item.label}
                      </span>
                    </motion.a>
                  )
                })}
              </div>
            </div>

          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}