'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { FileDown, LayoutGrid, ChevronDown } from 'lucide-react'
import { HiOutlineMenuAlt3 } from "react-icons/hi"

import { navigation, socialLinks } from '@/data/navigation'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useUITheme } from '@/hooks/useUITheme'
import SocialIcon from '@/components/icons/SocialIcon'
import { getSocialStyle } from '@/lib/SocialStyles'

import MobileMenu from './MobileMenu'
import { ThemeToggleSwitch } from '@/components/ui/ThemeToggle'

export default function Header() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  useUITheme()

  const [open, setOpen] = useState(false)
  const [showExtra, setShowExtra] = useState(false)

  useEffect(() => {
    if (!showExtra) return
    const prevent = (e: Event) => e.preventDefault()
    const preventKeys = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', ' ', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) e.preventDefault()
    }
    document.addEventListener('wheel', prevent, { passive: false })
    document.addEventListener('touchmove', prevent, { passive: false })
    document.addEventListener('keydown', preventKeys)
    return () => {
      document.removeEventListener('wheel', prevent)
      document.removeEventListener('touchmove', prevent)
      document.removeEventListener('keydown', preventKeys)
    }
  }, [showExtra])

  const mainNav = navigation.slice(0, 5)
  const extraNav = navigation.slice(5)

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3">
        <div
          className="w-full max-w-7xl border border-white/10 dark:border-white/20 bg-white/90 dark:bg-[#121212]/95 backdrop-blur-md shadow-sm flex items-center justify-between px-4 md:px-8 py-3.5 rounded-2xl relative"
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary via-blue-500 to-violet-600 flex items-center justify-center shadow-md shadow-primary/30 group-hover:scale-105 group-hover:shadow-primary/50 transition-all duration-200 shrink-0 relative">
              <span className="font-black text-white text-sm leading-none tracking-tight">AA</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
            </div>
            <div className="hidden sm:flex flex-col leading-none gap-0.5">
              <span className="font-black text-sm tracking-tight bg-linear-to-r from-primary to-violet-500 bg-clip-text text-transparent">Adeoluwa</span>
              <span className="text-[10px] font-bold text-muted-foreground tracking-[0.15em] uppercase">Adeoye</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          {!isMobile && (
            <nav className="flex items-center gap-10">
              {mainNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setShowExtra(false)}
                    className={clsx(
                      'relative text-sm font-bold tracking-widest transition-colors group',
                      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {item.label}
                    <span className={clsx(
                      'absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-primary rounded-full transition-transform duration-200 origin-left',
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )} />
                  </Link>
                )
              })}

              <div className="relative">
                <button
                  onClick={() => setShowExtra(!showExtra)}
                  className={clsx(
                    "flex items-center gap-2 transition-all px-3 py-1.5 border",
                    showExtra
                      ? "bg-foreground text-background border-foreground"
                      : "text-muted-foreground border-transparent hover:bg-muted/50"
                  )}
                >
                  <LayoutGrid size={16} />
                  <span className="text-xs font-black uppercase tracking-tighter">More</span>
                  <ChevronDown
                    size={14}
                    className={clsx("transition-transform duration-300", showExtra && "rotate-180")}
                  />
                </button>

                {/* ANIMATED POP-OUT CARD */}
                <AnimatePresence>
                  {showExtra && (
                    <>
                      <div
                        className="fixed inset-0 z-[-1] cursor-default"
                        onClick={() => setShowExtra(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                        className="absolute top-full right-0 mt-4 w-72 p-5 border border-border bg-background shadow-2xl z-50 origin-top-right rounded-2xl"
                      >
                        <div className="flex flex-col gap-1 mb-5">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black px-2 mb-2">
                            Explore
                          </span>
                          {extraNav.map((item) => {
                            const isActive = pathname === item.href
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setShowExtra(false)}
                                className={clsx(
                                  'relative px-3 py-2.5 transition-all flex items-center justify-between group',
                                  'font-bold tracking-widest text-sm',
                                  isActive
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'
                                )}
                              >
                                {/* Underline scoped to label text only */}
                                <span className="relative">
                                  {item.label}
                                  <span className={clsx(
                                    'absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-primary rounded-full transition-transform duration-200 origin-left',
                                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                  )} />
                                </span>
                                <ChevronDown size={14} className="-rotate-90 opacity-0 group-hover:opacity-100 transition-all" />
                              </Link>
                            )
                          })}

                          <div className="h-px bg-border my-3" />

                          <Link
                            href="/assets/ADE_RESUME.pdf"
                            download="Adeoluwa_Adeoye_Resume.pdf"
                            className="text-sm p-3 bg-green-500/10 text-green-600 dark:text-green-400 font-bold flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all"
                          >
                            Download Resume <FileDown size={18} />
                          </Link>
                        </div>

                        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-black px-2 mb-3 block">
                          Socials
                        </span>
                        <div className="flex justify-between px-1">
                          {socialLinks.map((social) => {
                            const style = getSocialStyle(social.label)
                            return (
                              <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg active:scale-90"
                                style={{ backgroundColor: style.bg, color: style.icon }}
                              >
                                <SocialIcon name={social.label} className="text-xl" />
                              </Link>
                            )
                          })}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <ThemeToggleSwitch />

            {!isMobile && (
              <Link
                href="/booking"
                onClick={() => setShowExtra(false)}
                className="bg-foreground text-background font-black transition-all hover:scale-105 active:scale-95 px-6 py-2 text-sm"
              >
                Book a Call
              </Link>
            )}

            {isMobile && (
              <button
                onClick={() => setOpen(true)}
                className="p-2 border border-border bg-muted/20"
              >
                <HiOutlineMenuAlt3 size={28} />
              </button>
            )}
          </div>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
