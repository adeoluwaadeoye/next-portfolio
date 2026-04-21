# Adeoluwa Adeoye — Fullstack Portfolio

Personal portfolio and booking platform for **Adeoluwa Adeoye**, Senior Fullstack Engineer. Built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4.

---

## Features

- **Multi-page portfolio** with animated page transitions (Framer Motion + `template.tsx`)
- **Theme system** — light/dark toggle with View Transitions API circular-reveal animation
- **Intro loader** — one-time animated splash screen on full page load, theme-aware
- **Booking system** — multi-step date/time/service selection form with email confirmation
- **Contact form** — honeypot-protected with auto-reply to sender
- **Email automation** — transactional emails via Resend (booking & contact)
- **Responsive** — mobile, tablet, and desktop layouts across all pages
- **Performance** — React Compiler, Next.js static optimisation, Suspense boundaries

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — Hero, About, Experience, Skills, Projects, Contact sections |
| `/about` | Extended about page |
| `/projects` | Projects showcase |
| `/experience` | Work history |
| `/services` | Services offered |
| `/tools` | Tools & stack |
| `/thoughts` | Blog / thought pieces |
| `/contact` | Contact form |
| `/booking` | Multi-step session booking |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| UI Primitives | shadcn/ui + Radix UI |
| Animations | Framer Motion 12 |
| Theme | next-themes |
| Email | Resend |
| Forms | React Hook Form + Zod |
| Calendar | react-day-picker |
| Fonts | Figtree (body) · Space Grotesk (headings) |

---

## Project Structure

```
src/
├── app/                    # App Router pages & layouts
│   ├── layout.tsx          # Root layout (fonts, metadata, ThemeProvider)
│   ├── template.tsx        # Per-navigation animation wrapper
│   ├── page.tsx            # Home page
│   ├── about/
│   ├── booking/
│   ├── contact/
│   ├── experience/
│   ├── projects/
│   ├── services/
│   ├── thoughts/
│   └── tools/
├── components/
│   ├── layout/             # Header, Footer, MobileMenu, ClientShell
│   ├── sections/           # Hero, About, Experience, Skills, Projects, Contact
│   ├── ui/                 # Buttons, inputs, ThemeToggle, PageLoader, IntroLoader
│   ├── icons/              # Tech, social, and UI icon wrappers
│   └── projects/           # ProjectModal
├── data/                   # Static data (navigation, experience, projects)
├── hooks/                  # useMediaQuery, useScroll, useScrollSpy, useUITheme
├── lib/                    # utils, server actions, email logic, constants
├── providers/              # ThemeProvider wrapper
├── styles/                 # globals.css
└── types/                  # Type declarations
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Resend](https://resend.com) account for email delivery

### Installation

```bash
git clone <repo-url>
cd fullstack-portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend API key — used for booking confirmations and contact form emails |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

---

## Email Flow

**Booking** (`/booking`):
1. User selects date, time slot, and service type
2. Fills in name and email
3. Server action `sendBookingEmail` dispatches two emails via Resend:
   - Admin notification to the site owner
   - Confirmation email to the client with session details

**Contact** (`/contact`):
1. User fills name, email, project type, and message
2. Honeypot field silently drops bot submissions
3. Server action `sendEmail` dispatches:
   - Inquiry notification to the site owner
   - Auto-reply confirmation to the sender

---

## Key Design Decisions

**`template.tsx` for page transitions** — Next.js App Router creates a new instance of `template.tsx` on every navigation, making Framer Motion `initial`/`animate` work naturally without manual route tracking.

**View Transitions API for theme toggle** — The circular-reveal animation originates from the exact click coordinates, expands across the viewport, and falls back to instant toggle in unsupported browsers.

**`ClientShell.tsx` for the intro loader** — Wraps the entire app client-side so `IntroLoader` fires once on hard refresh and never again during client-side navigation (state lives in the shell, not remounted on route changes).

**Tailwind CSS v4** — No `tailwind.config.*` file; configuration lives in `globals.css` via `@theme` blocks and CSS custom properties.

---

## Scripts

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## License

Personal portfolio — all rights reserved. Not licensed for reuse or redistribution.
