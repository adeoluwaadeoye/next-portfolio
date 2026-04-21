'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Search, Database, Terminal, Globe, Cpu, ShieldCheck,
  Layers, Braces, Container, GitBranch, Clock,
  Package, Settings, BarChart3, TestTube2, FlaskConical,
  Bug, Lock, Workflow, FileJson,
  LayoutGrid, List, Copy, Check, Flame, Zap,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

type Category = 'All' | 'Frontend' | 'Backend' | 'DevOps' | 'Database' | 'Testing';
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
type ViewMode = 'grid' | 'list';
type SortMode = 'default' | 'az' | 'hot';

interface Tool {
  id: string;
  name: string;
  description: string;
  usage: string;
  icon: React.ReactNode;
  category: Category;
  color: string;
  bgColor: string;
  hot?: boolean;
  tags: string[];
  difficulty: Difficulty;
}

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Beginner: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20',
  Intermediate: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
  Advanced: 'bg-rose-500/10 text-rose-500 border border-rose-500/20',
};

const CATEGORY_COLORS: Record<Category, string> = {
  All: 'bg-primary/10 text-primary',
  Frontend: 'bg-sky-500/10 text-sky-400',
  Backend: 'bg-emerald-500/10 text-emerald-400',
  DevOps: 'bg-orange-500/10 text-orange-400',
  Database: 'bg-rose-500/10 text-rose-400',
  Testing: 'bg-violet-500/10 text-violet-400',
};

const CATEGORIES: Category[] = ['All', 'Frontend', 'Backend', 'DevOps', 'Database', 'Testing'];

const tools: Tool[] = [
  {
    id: '1',
    name: 'TypeScript Interface Generator',
    description: 'Convert JSON responses into clean TypeScript interfaces and Zod schemas instantly.',
    usage: 'Paste any JSON → Get ready-to-use interfaces + validation schemas.',
    icon: <Braces className="w-6 h-6" />,
    category: 'Frontend',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    hot: true,
    tags: ['TypeScript', 'Zod', 'Schema'],
    difficulty: 'Beginner',
  },
  {
    id: '2',
    name: 'Tailwind Class Sorter',
    description: 'Automatically sorts Tailwind classes for better readability and consistency across your codebase.',
    usage: 'Paste messy class strings → Get perfectly ordered classes following Tailwind best practices.',
    icon: <Layers className="w-6 h-6" />,
    category: 'Frontend',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    tags: ['Tailwind', 'CSS', 'Formatting'],
    difficulty: 'Beginner',
  },
  {
    id: '3',
    name: 'React Component Analyzer',
    description: 'Analyzes React components for performance issues, unnecessary re-renders, and best practices.',
    usage: 'Drop your component code → Receive detailed suggestions and optimization tips.',
    icon: <Code2 className="w-6 h-6" />,
    category: 'Frontend',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    hot: true,
    tags: ['React', 'Performance', 'Re-renders'],
    difficulty: 'Intermediate',
  },
  {
    id: '10',
    name: 'Bundle Size Analyzer',
    description: 'Analyzes your JavaScript bundle and pinpoints exactly what is taking up space.',
    usage: 'Upload bundle stats JSON → Identify bloat, tree-shake opportunities, and quick wins.',
    icon: <Package className="w-6 h-6" />,
    category: 'Frontend',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    tags: ['Webpack', 'Vite', 'Performance'],
    difficulty: 'Intermediate',
  },
  {
    id: '12',
    name: 'Core Web Vitals Monitor',
    description: 'Quick overview of LCP, FID, CLS, and Lighthouse scores with actionable fix suggestions.',
    usage: 'Input your site URL → Get instant performance insights and prioritized recommendations.',
    icon: <BarChart3 className="w-6 h-6" />,
    category: 'Frontend',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    tags: ['Lighthouse', 'Web Vitals', 'SEO'],
    difficulty: 'Beginner',
  },
  {
    id: '4',
    name: 'API Response Formatter',
    description: 'Pretty-prints and validates JSON/XML API responses with syntax highlighting.',
    usage: 'Paste raw API response → Instantly see formatted, readable output with copy button.',
    icon: <Globe className="w-6 h-6" />,
    category: 'Backend',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    tags: ['JSON', 'XML', 'REST'],
    difficulty: 'Beginner',
  },
  {
    id: '5',
    name: 'JWT Token Debugger',
    description: 'Decode, inspect payload, verify signature, and check expiry of any JWT token.',
    usage: 'Paste any JWT → See header, payload, expiration timestamp, and validation status.',
    icon: <ShieldCheck className="w-6 h-6" />,
    category: 'Backend',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-600/10',
    hot: true,
    tags: ['Auth', 'JWT', 'Security'],
    difficulty: 'Beginner',
  },
  {
    id: '11',
    name: 'Env Variable Validator',
    description: 'Validates .env files against expected schema and types, catching missing or mistyped vars.',
    usage: 'Paste your .env content → Get instant validation with type checking and missing variable alerts.',
    icon: <Settings className="w-6 h-6" />,
    category: 'Backend',
    color: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    tags: ['.env', 'Config', 'Validation'],
    difficulty: 'Beginner',
  },
  {
    id: '14',
    name: 'API Rate Limiter Tester',
    description: 'Stress-tests how your backend handles rate limiting, backoff, and burst traffic scenarios.',
    usage: 'Configure endpoint + limits → Simulate concurrent requests and observe response behavior.',
    icon: <Clock className="w-6 h-6" />,
    category: 'Backend',
    color: 'text-rose-400',
    bgColor: 'bg-rose-600/10',
    hot: true,
    tags: ['Rate Limiting', 'Load Testing', 'Throttle'],
    difficulty: 'Advanced',
  },
  {
    id: '16',
    name: 'CORS Policy Inspector',
    description: 'Validates your CORS configuration and simulates cross-origin requests from any origin.',
    usage: 'Enter your endpoint + origin → See exactly which headers are missing or misconfigured.',
    icon: <Lock className="w-6 h-6" />,
    category: 'Backend',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    tags: ['CORS', 'Security', 'Headers'],
    difficulty: 'Intermediate',
  },
  {
    id: '6',
    name: 'SQL Query Explainer',
    description: 'Visual breakdown of EXPLAIN plans for PostgreSQL and MySQL with index suggestions.',
    usage: 'Paste your SQL query → Understand execution plan, costs, and optimization opportunities.',
    icon: <Database className="w-6 h-6" />,
    category: 'Database',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    tags: ['SQL', 'PostgreSQL', 'MySQL'],
    difficulty: 'Advanced',
  },
  {
    id: '9',
    name: 'Redis Key Explorer',
    description: 'Browse, search, and visualize Redis key patterns with TTL countdowns and memory usage.',
    usage: 'Connect to Redis → Inspect key patterns, values, TTL, and real-time memory usage.',
    icon: <Cpu className="w-6 h-6" />,
    category: 'Database',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    tags: ['Redis', 'Cache', 'Key-Value'],
    difficulty: 'Intermediate',
  },
  {
    id: '17',
    name: 'Schema Diagram Generator',
    description: 'Generates interactive ER diagrams from Prisma schemas, Drizzle, or raw SQL DDL.',
    usage: 'Paste your schema → Get a visual ER diagram with all relationships auto-mapped.',
    icon: <FileJson className="w-6 h-6" />,
    category: 'Database',
    color: 'text-teal-500',
    bgColor: 'bg-teal-500/10',
    hot: true,
    tags: ['Prisma', 'ER Diagram', 'Drizzle'],
    difficulty: 'Intermediate',
  },
  {
    id: '7',
    name: 'Docker Compose Visualizer',
    description: 'Interactive builder and validator for docker-compose.yml with service dependency graphs.',
    usage: 'Build services visually or paste YAML → Validate config and see the dependency graph.',
    icon: <Container className="w-6 h-6" />,
    category: 'DevOps',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    hot: true,
    tags: ['Docker', 'Containers', 'YAML'],
    difficulty: 'Intermediate',
  },
  {
    id: '8',
    name: 'Conventional Commit Builder',
    description: 'Generates perfectly formatted conventional commit messages from your change description.',
    usage: 'Describe your changes → Get a properly scoped conventional commit with correct type prefix.',
    icon: <GitBranch className="w-6 h-6" />,
    category: 'DevOps',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    tags: ['Git', 'Commits', 'Conventional'],
    difficulty: 'Beginner',
  },
  {
    id: '13',
    name: 'Log Pattern Analyzer',
    description: 'Detects recurring error patterns, anomalies, and performance signals from application logs.',
    usage: 'Paste server or app logs → Get summarized insights, error patterns, and suggested fixes.',
    icon: <Terminal className="w-6 h-6" />,
    category: 'DevOps',
    color: 'text-zinc-400',
    bgColor: 'bg-zinc-500/10',
    tags: ['Logs', 'Debugging', 'Monitoring'],
    difficulty: 'Intermediate',
  },
  {
    id: '18',
    name: 'CI/CD Pipeline Builder',
    description: 'Visual builder for GitHub Actions, GitLab CI, and CircleCI pipeline configurations.',
    usage: 'Select your stack and steps → Generate production-ready CI/CD YAML with best practices baked in.',
    icon: <Workflow className="w-6 h-6" />,
    category: 'DevOps',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    tags: ['GitHub Actions', 'CI/CD', 'Automation'],
    difficulty: 'Advanced',
  },
  {
    id: '19',
    name: 'Jest / Vitest Setup Wizard',
    description: 'Generates complete test configurations, mock factories, and boilerplate for React + Node projects.',
    usage: 'Select your framework and features → Get full config files + example test suites.',
    icon: <TestTube2 className="w-6 h-6" />,
    category: 'Testing',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    hot: true,
    tags: ['Jest', 'Vitest', 'Unit Tests'],
    difficulty: 'Intermediate',
  },
  {
    id: '20',
    name: 'E2E Test Generator',
    description: 'Generates Playwright and Cypress test scripts from plain-language user journey descriptions.',
    usage: 'Describe the user flow → Get complete E2E test scripts with role-based selectors.',
    icon: <FlaskConical className="w-6 h-6" />,
    category: 'Testing',
    color: 'text-fuchsia-500',
    bgColor: 'bg-fuchsia-500/10',
    tags: ['Playwright', 'Cypress', 'E2E'],
    difficulty: 'Advanced',
  },
  {
    id: '21',
    name: 'API Contract Tester',
    description: 'Validates your API implementation against OpenAPI/Swagger specs and catches drift early.',
    usage: 'Upload your OpenAPI spec → Run contract tests against any live or mock endpoint.',
    icon: <Bug className="w-6 h-6" />,
    category: 'Testing',
    color: 'text-lime-500',
    bgColor: 'bg-lime-500/10',
    tags: ['OpenAPI', 'Contract Tests', 'Swagger'],
    difficulty: 'Advanced',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      onClick={handle}
      title="Copy usage"
      className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground shrink-0"
    >
      {copied
        ? <Check className="w-4 h-4 text-emerald-500" />
        : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function FullstackToolbox() {
  const [filter, setFilter] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<ViewMode>('grid');
  const [sort, setSort] = useState<SortMode>('default');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<Category, number>> = {};
    for (const cat of CATEGORIES) {
      counts[cat] = cat === 'All' ? tools.length : tools.filter(t => t.category === cat).length;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    let result = tools.filter(t =>
      (filter === 'All' || t.category === filter) &&
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())))
    );
    if (sort === 'az') result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'hot') result = [...result].sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0));
    return result;
  }, [filter, search, sort]);

  const hotTools = tools.filter(t => t.hot);

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <div className="px-6 border-b border-border/50 py-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="h-0.5 w-8 bg-primary" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" /> Dev.Toolkit
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.95]"
          >
            Tools for{' '}
            <span className="bg-linear-to-r from-primary via-blue-600 to-violet-600 bg-clip-text text-transparent">
              Real Work.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Practical dev utilities — no fluff, no sign-up. Just open and use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { label: 'Tools', value: tools.length },
              { label: 'Categories', value: CATEGORIES.length - 1 },
              { label: 'Hot picks', value: hotTools.length },
            ].map(s => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-4xl font-black">{s.value}</span>
                <span className="text-base text-muted-foreground font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* ─── HOT PICKS ────────────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-5">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-black uppercase tracking-widest text-orange-500">Hot Picks</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotTools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${tool.bgColor} ${tool.color} shrink-0`}>
                    {tool.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base leading-tight mb-1.5 group-hover:text-primary transition-colors">{tool.name}</h3>
                    <p className="text-[13px] text-muted-foreground line-clamp-2 leading-relaxed">{tool.description}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${DIFFICULTY_COLORS[tool.difficulty]}`}>
                        {tool.difficulty}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[tool.category]}`}>
                        {tool.category}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── TOOLBAR ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                ref={searchRef}
                placeholder="Search tools, tags… (⌘K)"
                className="pl-11 h-12 rounded-2xl bg-card border-border text-base"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-muted-foreground hover:text-foreground leading-none"
                >
                  ×
                </button>
              )}
            </div>

            <select
              value={sort}
              onChange={e => setSort(e.target.value as SortMode)}
              className="h-12 px-4 rounded-2xl border border-border bg-card text-base font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="default">Default order</option>
              <option value="az">A → Z</option>
              <option value="hot">Hot first</option>
            </select>

            <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-2xl h-12">
              <button
                onClick={() => setView('grid')}
                className={`p-2.5 rounded-xl transition-all ${view === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2.5 rounded-xl transition-all ${view === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`h-10 px-5 text-sm font-semibold border transition-all duration-200 ${
                  filter === cat
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20'
                    : 'bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {cat}
                <span className={`ml-2 text-xs font-bold ${filter === cat ? 'opacity-70' : 'opacity-40'}`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
            <span className="ml-auto text-sm text-muted-foreground font-medium">
              {filtered.length} tool{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* ─── TOOLS GRID / LIST ─────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${filter}-${sort}-${view}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={view === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'}
            >
              {filtered.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025 }}
                  className={view === 'grid' ? 'h-full' : ''}
                >
                  {view === 'grid' ? (
                    <div className="group relative h-full flex flex-col rounded-4xl border border-border bg-card overflow-hidden hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                      {tool.hot && (
                        <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs font-black px-3 py-1 rounded-full">
                          <Flame className="w-3.5 h-3.5" /> HOT
                        </div>
                      )}
                      <div className="p-8 flex-1 flex flex-col">
                        <div className={`inline-flex p-4 rounded-2xl ${tool.bgColor} ${tool.color} mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
                          {tool.icon}
                        </div>
                        <h3 className="font-bold text-xl leading-tight mb-3 group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-1">
                          {tool.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tool.tags.map(tag => (
                            <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="px-8 py-5 border-t border-border/60 bg-secondary/10">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Usage</p>
                            <p className="text-sm text-foreground/90 font-medium leading-relaxed">{tool.usage}</p>
                          </div>
                          <CopyButton text={tool.usage} />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${DIFFICULTY_COLORS[tool.difficulty]}`}>
                            {tool.difficulty}
                          </span>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[tool.category]}`}>
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="group flex items-center gap-6 p-6 rounded-2xl border border-border bg-card hover:border-primary/40 transition-all duration-200 hover:shadow-md">
                      <div className={`p-4 rounded-xl ${tool.bgColor} ${tool.color} shrink-0 group-hover:scale-105 transition-transform`}>
                        {tool.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors truncate">{tool.name}</h3>
                          {tool.hot && <Flame className="w-4 h-4 text-orange-500 shrink-0" />}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{tool.description}</p>
                      </div>
                      <div className="hidden lg:flex items-center gap-2 shrink-0">
                        {tool.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-muted-foreground">{tag}</span>
                        ))}
                      </div>
                      <span className={`hidden sm:inline-flex text-xs font-bold px-3 py-1 rounded-full shrink-0 ${DIFFICULTY_COLORS[tool.difficulty]}`}>
                        {tool.difficulty}
                      </span>
                      <CopyButton text={tool.usage} />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-24 text-center"
            >
              <div className="mx-auto w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No tools found</h3>
              <p className="text-muted-foreground text-base mb-6">Try a different search term or category</p>
              <button
                onClick={() => { setSearch(''); setFilter('All'); }}
                className="text-base font-bold text-primary hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── FOOTER STRIP ─────────────────────────────────────────────── */}
        <div className="mt-20 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {tools.length} tools across {CATEGORIES.length - 1} categories — updated regularly.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
            <Zap className="w-4 h-4 text-primary" />
            <span>No account required. Use freely.</span>
          </div>
        </div>
      </div>
    </div>
  );
}