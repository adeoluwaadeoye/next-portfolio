'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggleSwitch() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) {
    return <div className="w-21 h-11 rounded-full bg-gray-200 border-2 border-gray-300" />
  }

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    if (!('startViewTransition' in document)) {
      setTheme(newTheme)
      return
    }

    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    const transition = (document as Document & {
      startViewTransition: (cb: () => void) => { ready: Promise<void> }
    }).startViewTransition(() => {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      setTheme(newTheme)
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center rounded-full p-1 bg-gray-200 dark:bg-[#020D1A] border-2 border-gray-300 dark:border-blue-700/50 transition-colors duration-300 cursor-pointer outline-none"
      aria-label="Toggle theme"
    >
      {/* SLIDING INDICATOR */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="absolute w-9 h-9 rounded-full bg-white dark:bg-[#0A0A0A] shadow-md"
        style={{ left: currentTheme === 'dark' ? 'calc(100% - 38px)' : '2px' }}
      />

      <div className="relative flex items-center justify-between gap-1 z-10">
        <motion.div
          animate={{ rotate: currentTheme === 'light' ? 0 : 90, scale: currentTheme === 'light' ? 1 : 0.8, opacity: currentTheme === 'light' ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 flex items-center justify-center"
        >
          <Sun size={20} className="text-amber-500 fill-amber-500/10" />
        </motion.div>

        <motion.div
          animate={{ rotate: currentTheme === 'dark' ? 0 : -90, scale: currentTheme === 'dark' ? 1 : 0.8, opacity: currentTheme === 'dark' ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 flex items-center justify-center"
        >
          <Moon size={18} className="text-blue-400 fill-blue-400/10" />
        </motion.div>
      </div>
    </button>
  )
}
