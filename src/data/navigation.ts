export type NavItem = {
  label: string
  href: string
  external?: boolean
}

export const navigation: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'Experience',
    href: '/experience',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

export type SocialLink = {
  label: string
  href: string
  external: true
}

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/adeoluwaadeoye',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/adeoyeadeoluwa',
    external: true,
  },
  {
    label: 'X',
    href: 'https://x.com/AdeDadB',
    external: true,
  },
  {
    label: 'Email',
    href: 'adeoluadeoye7@gmail.com',
    external: true,
  },
]