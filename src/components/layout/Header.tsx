'use client'

import Link from 'next/link'
import { useState } from 'react'
import { navigation } from '@/data/navigation'
import { useScroll } from '@/hooks/useScroll'
import { useTheme } from '@/hooks/useTheme'
import { useIsMobile } from '@/hooks/useMediaQuery'
import MobileMenu from './MobileMenu'
import clsx from 'clsx'
import { AlignLeft, Sun, Moon } from 'lucide-react'

export default function Header() {
  const { direction, isScrolled } = useScroll()
  const { isDark, toggleTheme } = useTheme()
  const isMobile = useIsMobile()

  const [open, setOpen] = useState(false)

  const hideHeader = direction === 'down' && isScrolled

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 w-full z-50 transition-transform duration-300',
          hideHeader ? '-translate-y-full' : 'translate-y-0',
          isScrolled
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur border-b'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          
          {/* Logo */}
          <Link href="/" className="font-heading text-lg">
            Adeoluwa
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm hover:opacity-60 transition"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 border rounded-md"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Menu Button */}
            {isMobile && (
              <button
                onClick={() => setOpen(true)}
                className="p-2 border rounded-md"
                aria-label="Open menu"
              >
                <AlignLeft size={20} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu (GLOBAL OVERLAY) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}