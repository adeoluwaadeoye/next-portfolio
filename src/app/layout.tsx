import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/providers/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Figtree, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import ClientShell from '@/components/layout/ClientShell';

const baseUrl = 'https://adeoluwadeoye.vercel.app';

const figtreeBody = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

// Integrated Metadata
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: 'Adeoluwa Adeoye — Senior Fullstack Engineer',
    template: '%s | Adeoluwa Adeoye',
  },

  description:
    'Senior Fullstack Engineer based in Nigeria, specializing in building scalable, high-performance web applications with modern technologies.',

  keywords: [
    'Adeoluwa Adeoye',
    'Fullstack Developer Nigeria',
    'Senior Frontend Engineer',
    'Next.js Developer',
    'React Developer',
    'TypeScript Engineer',
    'Web Performance',
    'Scalable Systems',
  ],

  authors: [{ name: 'Adeoluwa Adeoye', url: baseUrl }],
  creator: 'Adeoluwa Adeoye',

  openGraph: {
    title: 'Adeoluwa Adeoye — Senior Fullstack Engineer',
    description: 'Building scalable, performant, and user-focused digital products.',
    url: baseUrl,
    siteName: 'Adeoluwa Portfolio',
    images: [
      {
        url: `${baseUrl}/bg.jpg`,
        width: 1200,
        height: 630,
        alt: 'Adeoluwa Adeoye Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Adeoluwa Adeoye — Senior Fullstack Engineer',
    description: 'Building scalable, performant, and user-focused digital products.',
    images: [`${baseUrl}/bg.jpg`],
    creator: '@AdeDadB',
  },

  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: baseUrl,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
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
      data-scroll-behavior="smooth"
      className={cn(
        figtreeBody.variable,
        headingFont.variable,
        'font-sans'
      )}
    >
      <body className="min-h-screen antialiased font-body">
        <ThemeProvider>
          <ClientShell>
            <Header />
            <main className="flex flex-col min-h-[80vh]">
              {children}
            </main>
            <Footer />
          </ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}