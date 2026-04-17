import '@/styles/globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { Inter, Outfit, Geist, Figtree } from 'next/font/google';
import { cn } from '@/lib/utils';

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});


// BODY FONT: Inter is the gold standard for UI readability
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// HEADING FONT: Outfit offers a more geometric, modern "Architect" aesthetic
const headingFont = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
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
      // Combining the variables and setting font-body as the default
      className={cn(
              inter.variable,
              headingFont.variable,
              "scroll-smooth"
            , "font-sans", figtree.variable)}
    >
      <body className="min-h-screen antialiased font-body bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-200">
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