'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, Variants } from 'framer-motion'

const MotionLink = motion.create(Link)
import {
  Home,
  LayoutGrid,
  Wrench,
  PenTool,
  PhoneCall,
  User,
  Download,
  Briefcase,
  Mail,
  X,
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

const allLinks: NavItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'About', href: '/about', icon: User },
  { label: 'Projects', href: '/projects', icon: LayoutGrid },
  { label: 'Services', href: '/services', icon: Wrench }, // Added Services
  { label: 'Experience', href: '/experience', icon: Briefcase },
  { label: 'Tools', href: '/tools', icon: PenTool }, // Swapped to PenTool for variety
  { label: 'Thoughts', href: '/thoughts', icon: Mail }, 
  { label: 'Contact', href: '/contact', icon: PhoneCall },
  { label: 'Booking', href: '/booking', icon: Mail },
  { label: 'Resume', href: '/assets/ADE_RESUME.pdf', icon: Download, download: true },
]

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.04, 
      delayChildren: 0.1 
    }
  },
  exit: { 
    opacity: 0, 
    transition: { 
      staggerChildren: 0.02, 
      staggerDirection: -1 
    } 
  }
}

const itemVars: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { 
      type: 'spring', 
      stiffness: 260, 
      damping: 20 
    } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    transition: { duration: 0.15 } 
  }
}

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname()
  // --- STRICT BODY SCROLL LOCK (Prevents all background movement) ---
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (open) {
      const scrollbarWidth = window.innerWidth - html.clientWidth;
      
      // Lock scrolling on both containers
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none'; // Prevents iOS touch-drag scrolling
      
      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      // Restore scrolling
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.style.paddingRight = '';
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      body.style.paddingRight = '';
    }
  }, [open])

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* BACKDROP - Darker for higher contrast focus */}
          <motion.div
            className="fixed inset-0 z-60 bg-background/80 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* SIDE PANEL */}
          <motion.aside
            className="fixed right-0 top-0 z-70 flex h-full w-full flex-col bg-background shadow-2xl sm:max-w-sm"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-5 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary via-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-primary/30 shrink-0 relative">
                  <span className="font-black text-white text-sm leading-none tracking-tight">AA</span>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div className="flex flex-col leading-none gap-0.5">
                  <span className="font-black text-sm tracking-tight bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">Adeoluwa</span>
                  <span className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase">Adeoye</span>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="Close menu"
                className="group flex h-10 w-10 items-center justify-center border border-border bg-destructive text-white transition-all active:scale-90"
              >
                <X size={20} strokeWidth={2.5} className="transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* THEME TOGGLE */}
            <div className="mx-5 mb-3 flex items-center justify-between rounded-2xl bg-muted/50 p-3">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">VISUAL</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Switch Theme</span>
              </div>
              <ThemeToggleSwitch />
            </div>

            {/* NAVIGATION GRID - No background or borders on items */}
            <motion.nav 
              variants={containerVars}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid flex-1 grid-cols-3 gap-2 overflow-y-auto px-5 pb-3"
            >
              {allLinks.map((item) => {
                const isActive = !item.download && pathname === item.href
                const tileClass = `group flex aspect-square flex-col items-center justify-center gap-3 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-primary/10 border border-primary/25'
                    : 'hover:bg-muted/60'
                }`
                const iconClass = `transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                }`
                const labelClass = `text-[11px] font-bold uppercase tracking-tight transition-colors ${
                  isActive ? 'text-primary' : 'text-foreground/80 group-hover:text-foreground'
                }`

                return (
                  <motion.div key={item.href} variants={itemVars}>
                    {item.download ? (
                      <Link href={item.href} download="Adeoluwa_Adeoye_Resume.pdf" onClick={onClose} className={tileClass}>
                        <div className={iconClass}><item.icon size={28} strokeWidth={2} /></div>
                        <span className={labelClass}>{item.label}</span>
                      </Link>
                    ) : (
                      <Link href={item.href} onClick={onClose} className={tileClass}>
                        <div className={iconClass}><item.icon size={28} strokeWidth={2} /></div>
                        <span className={labelClass}>{item.label}</span>
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </motion.nav>

            {/* SOCIAL FOOTER */}
            <div className="mt-auto border-t border-border bg-muted/20 p-5 pt-3">
              <p className="mb-3 text-center text-[9px] font-black uppercase tracking-[0.4em] text-foreground/40">
                Find me on
              </p>
              <div className="flex justify-center gap-5">
                {socialLinks.map((item, i) => {
                  const style = getSocialStyle(item.label)
                  return (
                    <MotionLink
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center shadow-lg transition-shadow hover:shadow-primary/20"
                        style={{ backgroundColor: style.bg, color: style.icon }}
                      >
                        <SocialIcon name={item.label} className="text-lg" />
                      </div>
                    </MotionLink>
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