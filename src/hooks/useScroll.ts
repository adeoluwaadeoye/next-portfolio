'use client'

import { useEffect, useState } from 'react'

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('up')

  useEffect(() => {
    let lastScroll = window.scrollY

    const onScroll = () => {
      const current = window.scrollY

      setScrollY(current)

      if (current > lastScroll) {
        setDirection('down')
      } else {
        setDirection('up')
      }

      lastScroll = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return {
    scrollY,
    direction,
    isScrolled: scrollY > 50,
  }
}