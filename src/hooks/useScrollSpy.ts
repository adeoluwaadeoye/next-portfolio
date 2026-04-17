'use client'

import { useEffect, useState } from 'react'

type Options = {
  rootMargin?: string
  threshold?: number
}

export function useScrollSpy(sectionIds: string[], options?: Options) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        root: null,
        rootMargin: options?.rootMargin ?? '-40% 0px -55% 0px',
        threshold: options?.threshold ?? 0.1,
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds, options])

  return activeId
}