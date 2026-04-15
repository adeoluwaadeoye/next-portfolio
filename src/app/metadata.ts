import type { Metadata } from 'next'

const baseUrl = 'https://your-domain.com' // replace with your actual domain

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

  authors: [
    {
      name: 'Adeoluwa Adeoye',
      url: baseUrl,
    },
  ],

  creator: 'Adeoluwa Adeoye',

  openGraph: {
    title: 'Adeoluwa Adeoye — Senior Fullstack Engineer',
    description:
      'Building scalable, performant, and user-focused digital products.',
    url: baseUrl,
    siteName: 'Adeoluwa Portfolio',
    images: [
      {
        url: `${baseUrl}/images/og-image.png`,
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
    description:
      'Building scalable, performant, and user-focused digital products.',
    images: [`${baseUrl}/images/og-image.png`],
    creator: '@yourhandle', // replace with your Twitter/X handle
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
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
}