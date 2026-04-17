import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import {
  Inter,
  Space_Grotesk,
  JetBrains_Mono,
  Dancing_Script, Geist } from 'next/font/google';

import { cn } from '@/lib/utils';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const cursiveFont = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-cursive',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Adeoluwa Adeoye — Senior Fullstack Engineer',
  description: 'Building scalable, performant, and user-focused digital products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
              inter.variable,
              headingFont.variable,
              jetbrainsMono.variable,
              cursiveFont.variable
            , "font-sans", geist.variable)}
    >
      <body className="min-h-screen antialiased font-body">
        <ThemeProvider>
          <Header />
          <main className="flex flex-col min-h-[80vh]">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}