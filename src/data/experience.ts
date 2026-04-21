export type EmploymentType = 'Full-Time' | 'Contract' | 'Freelance'

export interface Achievement {
  metric: string
  label: string
}

export interface TimelineItem {
  id: number
  era: string
  role: string
  company: string
  type: EmploymentType
  location: string
  period: string
  duration: string
  description: string
  impact: string[]
  achievements: Achievement[]
  tags: string[]
  highlight: string
  current?: boolean
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    era: 'Full-Stack Scale & Optimization',
    role: 'Senior Full-Stack Engineer',
    company: 'Zyrotech Digital Services',
    type: 'Full-Time',
    location: 'Lagos, Nigeria · Remote',
    period: 'Jan 2025 — Present',
    duration: '1yr+',
    current: true,
    description:
      'Spearheading end-to-end application architecture with a focus on high-performance, scalable systems and team-level technical leadership across multiple product lines.',
    impact: [
      'Architecting robust systems using TypeScript and Node.js to ensure long-term maintainability across 3 concurrent product lines.',
      'Bridging complex frontend interfaces with high-integrity MongoDB/PostgreSQL backends, cutting query latency by 35%.',
      'Leading cross-functional agile teams — aligning technical delivery with strategic business objectives across 4 concurrent sprints.',
      'Mentoring 2 junior engineers through weekly code reviews and pairing sessions, raising team PR quality scores by 28%.',
    ],
    achievements: [
      { metric: '35%', label: 'Latency Cut' },
      { metric: '4', label: 'Sprint Leads' },
      { metric: '28%', label: 'Quality ↑' },
    ],
    tags: ['TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB', 'Next.js', 'Docker', 'System Design'],
    highlight:
      'Led architecture for 3 product lines concurrently with zero production incidents in 12+ months.',
  },
  {
    id: 2,
    era: 'Data Integration & Schema Mastery',
    role: 'Full-Stack Developer',
    company: 'Kopak Tech Solutions',
    type: 'Contract',
    location: 'Abuja, Nigeria · Hybrid',
    period: 'Jun 2024 — Dec 2024',
    duration: '7 mo',
    description:
      'Optimizing data flow through modern API patterns and deep database performance tuning for enterprise-grade client applications.',
    impact: [
      'Built GraphQL and RESTful API layers that consolidated 5 fragmented data sources into a single unified service mesh.',
      'Redesigned database schemas and query plans — improved read throughput by 40% across high-traffic endpoints.',
      'Partnered with 3 backend engineers to deliver a real-time event pipeline, slashing dashboard latency from 4s to 600ms.',
      'Introduced automated API contract testing (Postman + CI) that caught 12 regressions before they reached staging.',
    ],
    achievements: [
      { metric: '40%', label: 'Throughput ↑' },
      { metric: '4s→600ms', label: 'Latency' },
      { metric: '12', label: 'Bugs Caught' },
    ],
    tags: ['GraphQL', 'REST APIs', 'PostgreSQL', 'React.js', 'TypeScript', 'Postman', 'CI/CD'],
    highlight:
      'Slashed dashboard latency from 4 seconds to 600ms through schema redesign and query caching.',
  },
  {
    id: 3,
    era: 'Modular Architecture & UI Efficiency',
    role: 'Frontend Engineer',
    company: 'ITGEN Solutions',
    type: 'Full-Time',
    location: 'Lagos, Nigeria · On-Site',
    period: 'Mar 2023 — May 2024',
    duration: '1yr 2mo',
    description:
      'Transforming UX requirements into modular, reusable frontend ecosystems that drive development velocity and design consistency across client products.',
    impact: [
      'Architected a shared component library of 60+ reusable React components, reducing new feature build time by 40%.',
      'Translated Figma designs pixel-perfectly into responsive, mobile-first interfaces with Tailwind CSS for 8 client products.',
      'Integrated Redux Toolkit for state management across a multi-module enterprise dashboard serving 5,000+ daily users.',
      'Introduced Storybook-driven development — cutting cross-team design inconsistencies by 60% across the org.',
    ],
    achievements: [
      { metric: '60+', label: 'Components' },
      { metric: '40%', label: 'Build Time ↓' },
      { metric: '5K+', label: 'Daily Users' },
    ],
    tags: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'TypeScript', 'Figma', 'Storybook', 'Vite'],
    highlight:
      'Built a 60+ component library that became the shared design system across 8 client products.',
  },
  {
    id: 4,
    era: 'Foundational Engineering & Community Impact',
    role: 'Junior Web Developer',
    company: 'P&S Solutions / Tiidelab',
    type: 'Freelance',
    location: 'Nigeria · Remote',
    period: 'Apr 2020 — Dec 2022',
    duration: '2yr 8mo',
    description:
      'Establishing strong SDLC practices while digitizing community resources and delivering client-facing web solutions at an early stage of my engineering career.',
    impact: [
      'Developed 15+ reusable UI components and automated record-keeping tools for 3 community transparency projects.',
      'Built and shipped client-facing features in HTML, CSS, and JavaScript, integrating them with live backend REST endpoints.',
      'Participated in agile sprints (2-week cycles), consistently delivering within scope across 10 product iterations.',
      'Mentored 5 student developers through Tiidelab bootcamp — all secured their first tech roles within 6 months.',
    ],
    achievements: [
      { metric: '15+', label: 'Components' },
      { metric: '10', label: 'Sprints Shipped' },
      { metric: '5', label: 'Devs Mentored' },
    ],
    tags: ['JavaScript', 'HTML/CSS', 'REST APIs', 'Agile/SDLC', 'Git', 'Bootstrap'],
    highlight:
      'Mentored 5 junior developers through Tiidelab bootcamp — all placed in tech roles within 6 months.',
  },
]
