# Design Dashboard - Implementation Guide

**Project**: Design Dashboard
**Tech Stack**: Next.js 14+ (App Router) + React + Tailwind + shadcn/ui
**Status**: Ready to Begin Phase 1
**Start Date**: 2025-10-23

---

## Quick Start

```bash
# 1. Create Next.js project
npx create-next-app@latest design-dashboard \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd design-dashboard

# 2. Install shadcn/ui
npx shadcn-ui@latest init

# 3. Add initial components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge

# 4. Start development server
npm run dev
```

---

## Project Structure

```
design-dashboard/
├── app/
│   ├── layout.tsx                 # Root layout with sidebar
│   ├── page.tsx                   # Projects list (/)
│   ├── project/
│   │   └── [id]/
│   │       └── page.tsx           # Project detail
│   └── globals.css                # Global styles + design tokens
├── components/
│   ├── ui/                        # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── badge.tsx
│   ├── sidebar-nav.tsx            # Sidebar navigation
│   ├── project-card.tsx           # Project card component
│   ├── deliverable-card.tsx       # Deliverable card
│   └── context-section.tsx        # Collapsible context sections
├── lib/
│   ├── data/
│   │   └── projects.ts            # Data loading functions
│   ├── types.ts                   # TypeScript types
│   └── utils.ts                   # Utility functions (cn, etc.)
├── public/
│   ├── data/
│   │   └── projects.json          # Project data
│   └── outputs/                   # Design deliverables
│       └── design-dashboard/
│           ├── research/
│           ├── concepts/
│           └── production/
├── docs/
│   └── architecture/
│       └── ADR-001-nextjs-tech-stack.md
├── tailwind.config.ts             # Design tokens configuration
├── next.config.js                 # Next.js config (static export)
└── package.json
```

---

## Phase 1: Foundation & MVP (Weeks 1-2)

### Step 1: Project Setup (Day 1)

**Create Project:**
```bash
npx create-next-app@latest design-dashboard --typescript --tailwind --app
cd design-dashboard
npx shadcn-ui@latest init
```

**Configure static export** (`next.config.js`):
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

---

### Step 2: Design Tokens Setup (Day 1)

**Convert design tokens to Tailwind** (`tailwind.config.ts`):

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Background layers
        'bg-primary': '#0a0a0a',
        'bg-secondary': '#1a1a1a',
        'bg-tertiary': '#2a2a2a',

        // Text hierarchy
        'text-primary': '#f3f4f6',
        'text-secondary': '#9ca3af',
        'text-tertiary': '#6b7280',

        // Brand colors
        'brand-primary': '#2563eb',
        'brand-hover': '#1d4ed8',
        'brand-subtle': 'rgba(37, 99, 235, 0.2)',

        // Status colors
        'status-research': '#a78bfa',
        'status-concepts': '#60a5fa',
        'status-production': '#fbbf24',
        'status-qa': '#34d399',

        // Border
        'border': '#2a2a2a',
      },
      spacing: {
        // 8px base unit system
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
      },
      borderRadius: {
        'sm': '4px',
        'base': '6px',
        'md': '8px',
        'lg': '12px',
      },
      maxWidth: {
        'content': '1400px',
      },
      width: {
        'sidebar': '240px',
      },
      transitionDuration: {
        'default': '150ms',
      },
    },
  },
  plugins: [],
}

export default config
```

**Global styles** (`app/globals.css`):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-bg-primary text-text-primary;
    font-family: 'Inter', sans-serif;
  }

  * {
    @apply transition-colors duration-default;
  }
}
```

---

### Step 3: TypeScript Types (Day 1)

**Create type definitions** (`lib/types.ts`):

```typescript
export interface Project {
  id: string
  name: string
  description: string
  status: 'research' | 'concepts' | 'production' | 'qa'
  createdDate: string
  lastUpdated: string
  designGoals: string[]
  designPrinciples: DesignPrinciple[]
  keyInsights: string[]
  deliverables: Deliverable[]
}

export interface DesignPrinciple {
  title: string
  description: string
  rationale?: string
}

export interface Deliverable {
  id: string
  type: string
  skill: 'design-research' | 'design-concepts' | 'design-production' | 'design-qa'
  title: string
  summary: string
  filePath: string
  createdDate: string
  visible: boolean
  visualAssets?: {
    colorPalette?: string[]
    preview?: string
  }
}

export type StatusBadgeVariant = 'research' | 'concepts' | 'production' | 'qa'
```

---

### Step 4: Data Loading (Day 2)

**Create data loader** (`lib/data/projects.ts`):

```typescript
import { Project } from '../types'
import projectsData from '@/public/data/projects.json'

export async function getProjects(): Promise<Project[]> {
  return projectsData.projects as Project[]
}

export async function getProject(id: string): Promise<Project | null> {
  const projects = await getProjects()
  return projects.find(p => p.id === id) || null
}

export async function getProjectsByPhase(phase: string): Promise<Project[]> {
  const projects = await getProjects()
  if (phase === 'all') return projects
  return projects.filter(p => p.status === phase)
}
```

**Create sample data** (`public/data/projects.json`):

```json
{
  "projects": [
    {
      "id": "design-dashboard",
      "name": "Design Dashboard",
      "description": "A centralized dashboard for tracking design projects through all phases",
      "status": "concepts",
      "createdDate": "2025-10-22",
      "lastUpdated": "2025-10-23",
      "designGoals": [
        "Provide clear visibility into all design projects",
        "Enable easy access to design deliverables"
      ],
      "designPrinciples": [
        {
          "title": "Context Before Details",
          "description": "Show goals, principles, insights before deliverables",
          "rationale": "Users need context to understand design decisions"
        }
      ],
      "keyInsights": [
        "Design managers need a single source of truth",
        "Visual previews are critical for quick scanning"
      ],
      "deliverables": [
        {
          "id": "deliv-001",
          "type": "personas",
          "skill": "design-research",
          "title": "User Personas",
          "summary": "Three key personas for design management",
          "filePath": "/outputs/design-dashboard/research/personas.md",
          "createdDate": "2025-10-22",
          "visible": true
        }
      ]
    }
  ]
}
```

---

### Step 5: Root Layout with Sidebar (Day 2-3)

**Root layout** (`app/layout.tsx`):

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SidebarNav } from '@/components/sidebar-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Design Dashboard',
  description: 'Centralized dashboard for design projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <SidebarNav />
          <main className="flex-1 ml-sidebar">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
```

**Sidebar component** (`components/sidebar-nav.tsx`):

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'All Projects', href: '/', count: 3 },
  { label: 'Active', href: '/?filter=active', count: 2 },
  { label: 'Complete', href: '/?filter=complete', count: 1 },
]

const phaseItems = [
  { label: 'Research', href: '/?phase=research' },
  { label: 'Concepts', href: '/?phase=concepts' },
  { label: 'Production', href: '/?phase=production' },
  { label: 'QA', href: '/?phase=qa' },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-sidebar bg-bg-secondary border-r border-border p-6">
      <div className="mb-8">
        <h1 className="text-lg font-semibold">Design Dashboard</h1>
      </div>

      <nav className="space-y-6">
        <div>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-2 py-2 rounded-base hover:bg-bg-tertiary"
                >
                  <span className="text-sm">{item.label}</span>
                  {item.count && (
                    <span className="text-xs text-text-tertiary">
                      ({item.count})
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="px-2 mb-2 text-xs uppercase text-text-tertiary">
            Phase
          </h3>
          <ul className="space-y-1">
            {phaseItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-2 py-2 text-sm rounded-base hover:bg-bg-tertiary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
```

---

### Step 6: Projects List View (Day 3-4)

**Projects list page** (`app/page.tsx`):

```typescript
import { getProjects } from '@/lib/data/projects'
import { ProjectCard } from '@/components/project-card'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Projects</h1>
        <p className="text-text-secondary">
          View and manage all design projects
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <footer className="mt-16 pt-6 border-t border-border flex gap-6 text-sm text-text-secondary">
        <a href="#" className="hover:text-brand-primary">
          PM Dashboard
        </a>
        <a href="#" className="hover:text-brand-primary">
          Engineering Dashboard
        </a>
      </footer>
    </div>
  )
}
```

**Project card component** (`components/project-card.tsx`):

```typescript
import Link from 'next/link'
import { Project } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

interface ProjectCardProps {
  project: Project
}

const statusColors = {
  research: 'bg-status-research/20 text-status-research',
  concepts: 'bg-status-concepts/20 text-status-concepts',
  production: 'bg-status-production/20 text-status-production',
  qa: 'bg-status-qa/20 text-status-qa',
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <article className="bg-bg-secondary border border-border rounded-md p-6 hover:border-bg-tertiary hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <Badge className={statusColors[project.status]}>
            {project.status}
          </Badge>
        </div>

        <p className="text-sm text-text-secondary mb-4">
          {project.description}
        </p>

        <div className="flex gap-6 pt-4 border-t border-border text-xs text-text-tertiary">
          <div>
            <span className="font-medium">{project.deliverables.length}</span> deliverables
          </div>
          <div>Updated {project.lastUpdated}</div>
        </div>
      </article>
    </Link>
  )
}
```

---

### Step 7: Project Detail View (Day 4-5)

**Project detail page** (`app/project/[id]/page.tsx`):

```typescript
import { getProject } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { DeliverableCard } from '@/components/deliverable-card'
import { ContextSection } from '@/components/context-section'

interface PageProps {
  params: { id: string }
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="p-10 max-w-content">
      <header className="mb-8">
        <Badge className="mb-4">
          {project.status}
        </Badge>
        <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
        <p className="text-lg text-text-secondary max-w-3xl">
          {project.description}
        </p>
      </header>

      <div className="space-y-8">
        <ContextSection
          title="Design Principles"
          items={project.designPrinciples}
          type="principles"
        />

        <ContextSection
          title="Key Insights"
          items={project.keyInsights}
          type="insights"
        />

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Deliverables</h2>
            <span className="text-sm text-text-tertiary">
              {project.deliverables.length} items
            </span>
          </div>

          <div className="space-y-6">
            {project.deliverables.map((deliverable) => (
              <DeliverableCard
                key={deliverable.id}
                deliverable={deliverable}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
```

---

### Step 8: Remaining Components (Day 5)

**Deliverable Card** (`components/deliverable-card.tsx`)
**Context Section** (`components/context-section.tsx`)
**Badge variations** (use shadcn/ui Badge with Tailwind variants)

See design spec for full component details.

---

## Phase 1 Checklist

- [ ] Project setup and dependencies installed
- [ ] Design tokens configured in Tailwind
- [ ] TypeScript types defined
- [ ] Data loading functions created
- [ ] Sample projects.json created
- [ ] Root layout with sidebar implemented
- [ ] Sidebar navigation component
- [ ] Projects list view (/)
- [ ] Project card component
- [ ] Project detail view (/project/[id])
- [ ] Context section component (collapsible)
- [ ] Deliverable card component
- [ ] Status badges with colors
- [ ] Basic responsive layout (desktop/tablet)

**Milestone**: Can view all projects and navigate to detail views with full context and deliverables.

---

## Phase 2A-4: See Roadmap

Continue with remaining phases as outlined in [ARCHITECTURE-REVIEW.md](./ARCHITECTURE-REVIEW.md):
- Phase 2A: Core Components (Week 3)
- Phase 2B: Enhanced Content (Week 4)
- Phase 2C: Accessibility Foundation (Week 5)
- Phase 3: Responsive & States (Week 6)
- Phase 4: Polish & Animation (Week 7)

---

## Development Tips

### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Prettier - Code formatter
- ESLint

### Helpful Commands
```bash
# Development
npm run dev

# Build for production (static export)
npm run build

# Preview production build
npx serve@latest out

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

### AI-Assisted Development
When working with Claude or GitHub Copilot:
- Provide the design specification for context
- Reference Tailwind classes from design tokens
- Ask for shadcn/ui component implementations
- Request TypeScript types for new features

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Design Specification](outputs/design-dashboard/production/design-specification.md)
- [Architecture Review](ARCHITECTURE-REVIEW.md)
- [ADR-001: Next.js Tech Stack](docs/architecture/ADR-001-nextjs-tech-stack.md)

---

**Ready to Start?** Run the Quick Start commands above and begin with Phase 1, Step 1!
