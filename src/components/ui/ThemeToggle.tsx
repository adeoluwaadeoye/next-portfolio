'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggleSwitch() {
  const { setTheme, resolvedTheme } = useTheme()

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const toggleTheme = () =>
    setTheme(currentTheme === 'light' ? 'dark' : 'light')

  return (
    <button
      onClick={toggleTheme}
      className="
        relative flex items-center
        rounded-full p-1
        bg-gray-200 dark:bg-[#020D1A]
        border border-border
        transition-colors
      "
      aria-label="Toggle theme"
    >
      {/* SLIDING INDICATOR */}
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="
          absolute w-9 h-9 rounded-full
          bg-white dark:bg-[#0A0A0A]
          shadow-sm
        "
        style={{
          left: currentTheme === 'dark' ? 'calc(100% - 36px)' : '2px',
        }}
      />

      {/* ICONS */}
      <div className="relative flex gap-2">
        {/* SUN */}
        <motion.div
          animate={{
            rotate: currentTheme === 'light' ? 0 : 90,
            scale: currentTheme === 'light' ? 1 : 0.8,
            opacity: currentTheme === 'light' ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="w-9 h-9 flex items-center justify-center"
        >
          <Sun size={18} />
        </motion.div>

        {/* MOON */}
        <motion.div
          animate={{
            rotate: currentTheme === 'dark' ? 0 : -90,
            scale: currentTheme === 'dark' ? 1 : 0.8,
            opacity: currentTheme === 'dark' ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
          className="w-9 h-9 flex items-center justify-center"
        >
          <Moon size={18} />
        </motion.div>
      </div>
    </button>
  )
}