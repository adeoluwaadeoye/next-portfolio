'use client'

import { useTheme as useNextTheme } from 'next-themes'

export function useTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme()

  const resolvedTheme =
    theme === 'system' ? systemTheme : theme

  const isDark = resolvedTheme === 'dark'

  return {
    theme,
    systemTheme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme: () =>
      setTheme(isDark ? 'light' : 'dark'),
  }
}