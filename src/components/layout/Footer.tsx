'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import SocialIcon from '@/components/icons/SocialIcon'
import { socialLinks } from '@/data/navigation'
import { getSocialStyle } from '@/lib/SocialStyles'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* BRAND */}
          <div className="text-center md:text-left">
            <p className="font-heading text-lg font-semibold tracking-tight">
              Adeoluwa Adeoye
            </p>

            <p className="text-sm text-muted-foreground">
              Building scalable, high-performance web experiences.
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex items-center gap-4">
            {socialLinks.map((item, i) => {
              const style = getSocialStyle(item.label)

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    className="
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      hover:scale-110 transition
                    "
                    style={{
                      backgroundColor: style.bg,
                      color: style.icon, // ✅ FIXED (was style.color)
                    }}
                  >
                    <SocialIcon name={item.label} size={18} />
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CV LINK */}
          <div>
            <Link
              href="/ADEOLUWA_RESUME.pdf"
              download
              className="
                text-sm font-medium
                text-muted-foreground
                hover:text-foreground
                transition
                relative
                after:absolute after:left-0 after:-bottom-1
                after:h-px after:w-0
                after:bg-current
                after:transition-all after:duration-300
                hover:after:w-full
              "
            >
              ADEOLUWA_RESUME
            </Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-border" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Adeoluwa Adeoye</p>

          <p className="opacity-70">
            Crafted with precision using Next.js & Tailwind
          </p>
        </div>

      </div>
    </footer>
  )
}