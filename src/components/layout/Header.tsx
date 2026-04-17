'use client'

import Link from 'next/link'
import { useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { LaptopMinimal } from 'lucide-react'
import { HiOutlineMenuAlt3 } from "react-icons/hi"

import { navigation } from '@/data/navigation'
import { useScroll } from '@/hooks/useScroll'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useUITheme } from '@/hooks/useUITheme'

import MobileMenu from './MobileMenu'
import { ThemeToggleSwitch } from '@/components/ui/ThemeToggle'

export default function Header() {
  const { isScrolled } = useScroll()
  const isMobile = useIsMobile()

  useUITheme()

  const [open, setOpen] = useState(false)

  /**
   * userIntent = true  → expanded (hover/touch active)
   * userIntent = false → follow scroll state
   */
  const [userIntent, setUserIntent] = useState(false)

  const shouldShrink = isScrolled && !userIntent

  const EASE = [0.25, 0.8, 0.25, 1] as const

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 flex justify-center px-3">

        <motion.div
          onMouseEnter={() => setUserIntent(true)}
          onMouseLeave={() => setUserIntent(false)}
          onTouchStart={() => setUserIntent(true)}
          onTouchEnd={() => setTimeout(() => setUserIntent(false), 1200)}
          animate={{
            height: shouldShrink ? 56 : 72,
            paddingTop: shouldShrink ? 6 : 12,
            paddingBottom: shouldShrink ? 6 : 12,
          }}
          transition={{ duration: 0.55, ease: EASE }}
          className="
            w-full max-w-7xl
            rounded-2xl border border-border
            bg-background/95 backdrop-blur-sm shadow-sm
            flex items-center justify-between px-4 md:px-6
            overflow-hidden
          "
        >

          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">

            <motion.span
              animate={{ fontSize: shouldShrink ? 18 : 28 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="font-heading font-semibold tracking-tight"
            >
              AA
            </motion.span>

            <motion.div
              animate={{ scale: shouldShrink ? 0.9 : 1 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <LaptopMinimal size={shouldShrink ? 22 : 30} />
            </motion.div>

            {/* MICRO BRAND */}
            <motion.div
              animate={{
                opacity: shouldShrink ? 0 : 1,
                x: shouldShrink ? -10 : 0,
              }}
              transition={{ duration: 0.4, ease: EASE }}
              className="leading-tight"
            >
              <p className="text-[10px] uppercase tracking-wider">
                Creative Engineer
              </p>
              <p className="text-[9px] font-bold text-green-600 tracking-widest">
                Building the Future
              </p>
            </motion.div>

          </Link>

          {/* DESKTOP NAV */}
          {!isMobile && (
            <nav className="flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'font-normal tracking-widest transition-colors hover:text-foreground',
                    shouldShrink ? 'text-xs' : 'text-sm'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* ACTIONS */}
          <div className="flex items-center gap-3">

            <ThemeToggleSwitch />

            {!isMobile && (
              <Link
                href="/booking"
                className={clsx(
                  'rounded-lg bg-foreground text-background font-medium',
                  'transition-all duration-500 hover:scale-[1.03]',
                  shouldShrink ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
                )}
              >
                Book a Call
              </Link>
            )}

            {isMobile && (
              <button
                onClick={() => setOpen(true)}
                className={clsx(
                  'rounded-lg border border-border text-foreground transition-all',
                  shouldShrink ? 'p-1.5' : 'p-2'
                )}
                aria-label="Open menu"
              >
                <HiOutlineMenuAlt3
                  size={shouldShrink ? 26 : 32}
                  className="transition-all duration-500"
                />
              </button>
            )}

          </div>
        </motion.div>

      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}