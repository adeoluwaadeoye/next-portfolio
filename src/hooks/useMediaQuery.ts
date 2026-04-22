'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean | null {
  // null = not yet mounted (SSR / before hydration)
  const [matches, setMatches] = useState<boolean | null>(null)

  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])

  return matches
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 768px), ((orientation: landscape) and (max-height: 500px))')
}

export function useIsDesktop() {
  return useMediaQuery('(min-width: 769px) and not ((orientation: landscape) and (max-height: 500px))')
}
