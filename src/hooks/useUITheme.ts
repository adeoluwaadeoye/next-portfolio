'use client'

import { useTheme as useNextTheme } from "next-themes"
import { useMemo } from "react"

export type UITheme = "light" | "dark"

export function useUITheme() {
  const { resolvedTheme, setTheme, theme } = useNextTheme()

  const uiTheme: UITheme = useMemo(() => {
    return resolvedTheme === "dark" ? "dark" : "light"
  }, [resolvedTheme])

  const toggleTheme = () => {
    setTheme(uiTheme === "light" ? "dark" : "light")
  }

  return {
    theme: uiTheme,
    rawTheme: theme,
    setTheme,
    toggleTheme,
    isDark: uiTheme === "dark",
    isLight: uiTheme === "light",
  }
}