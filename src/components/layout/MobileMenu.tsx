'use client'

import Link from 'next/link'
import { navigation, socialLinks } from '@/data/navigation'
import { X } from 'lucide-react'
import clsx from 'clsx'

type Props = {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: Props) {
  return (
    <div
      className={clsx(
        'fixed inset-0 z-60 transition-all duration-300',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 bg-white dark:bg-black">

        {/* GUARANTEED CLOSE BUTTON (FIX) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 border rounded-md"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="text-2xl font-heading"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-6 text-sm opacity-70">
          {socialLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}