import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/providers/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Adeoluwa Adeoye — Senior Fullstack Engineer',
  description:
    'Building scalable, performant, and user-focused digital products.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, headingFont.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Header />

          <main className="flex flex-col min-h-[80vh]">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}