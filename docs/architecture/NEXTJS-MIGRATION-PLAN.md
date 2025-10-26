# Next.js Migration Plan: Design Dashboard

**Version**: 1.0
**Date**: October 25, 2025
**Status**: Planning
**Decision**: ADR-001 - Next.js + React Tech Stack

---

## Executive Summary

This document outlines the comprehensive migration plan for converting the Design Dashboard from **Vite + Lit** to **Next.js 14+ with React**. The migration addresses critical file management pain points while upgrading to a more widely-supported technology stack with better AI development assistance and ecosystem support.

### Key Benefits of Migration

1. **Eliminates File Access Hacks**: Design files move into app structure, no more `fs.allow` workarounds
2. **Improved Developer Experience**: Better TypeScript support, hot reload, React ecosystem
3. **AI Development Velocity**: Claude has extensive Next.js training data for faster development
4. **Future-Ready Architecture**: Easy path to authentication, API routes, database integration
5. **Component Ecosystem**: Access to shadcn/ui, Radix UI, and thousands of React libraries

### Migration Timeline

- **Phase 1** (Week 1): Next.js setup and file structure design
- **Phase 2** (Week 2): Core component migration and styling
- **Phase 3** (Week 3): Views, routing, and data loading
- **Phase 4** (Week 4): File management system and polish
- **Phase 5** (Week 5): Testing, deployment, and documentation

### Risk Level: **Medium**

The existing Phase 1 implementation provides a solid foundation. Migration is primarily technical debt cleanup with architectural improvement, not a feature rewrite.

---

## Current State Analysis

### Technology Stack (Vite + Lit)

**Framework**:
- Vite 5.x (build tool)
- Lit 3.x (web components)
- Vanilla routing via history API
- JSON data storage

**Current Structure**:
```
design-suite-claude-skills/
├── dashboard/                      # Current Vite app
│   ├── src/
│   │   ├── components/            # Lit web components (4 files)
│   │   │   ├── sidebar-nav.js
│   │   │   ├── project-card.js
│   │   │   ├── deliverable-card.js
│   │   │   └── context-section.js
│   │   ├── views/                 # Route views (2 files)
│   │   │   ├── projects-list.js
│   │   │   └── project-detail.js
│   │   ├── data/
│   │   │   └── projects.json      # Project data
│   │   ├── styles/
│   │   │   └── global.css
│   │   └── main.js                # App entry
│   ├── vite.config.js
│   └── package.json
│
└── outputs/
    └── design-dashboard/           # Design deliverables (OUTSIDE app)
        ├── research/               # 4 markdown files
        ├── concepts/               # 5 HTML files
        └── production/             # 6 files (specs, tokens, guides)
```

### Pain Points (Why We're Migrating)

1. **File Access Issues**
   - Design files in `/outputs/design-dashboard/` are OUTSIDE the app root
   - Vite requires `fs.allow: ['..']` to serve parent directory files
   - Path conversions (`/outputs/...` → `../outputs/...`) are fragile
   - Production builds may break file access

2. **Component Interoperability**
   - Lit components less widely adopted than React
   - Smaller ecosystem for UI libraries
   - Fewer developers familiar with Lit
   - Limited AI training data for code generation

3. **Developer Experience**
   - Manual routing setup (no file-based routing)
   - Less TypeScript ecosystem support
   - Harder to find examples and solutions
   - Limited component libraries

4. **File Management**
   - No clear system for adding/updating design files
   - Manual JSON updates required
   - No file upload or organization UI
   - Assets scattered across directories

5. **Future Limitations**
   - No easy path to authentication
   - Database integration more complex
   - API routes require additional setup
   - Server-side rendering not available

### What's Working Well (Keep This)

1. **Design System**: Design tokens, color palette, spacing system
2. **Component Specs**: All component designs are production-ready
3. **Data Model**: `projects.json` schema is well-designed
4. **Design Deliverables**: Research, concepts, production files complete
5. **Documentation**: Comprehensive specs and guides

---

## Target State: Next.js Architecture

### Technology Stack (Next.js + React)

**Framework**:
- Next.js 14+ with App Router
- React 18+ with Server Components
- TypeScript throughout
- Tailwind CSS for styling
- shadcn/ui for component primitives

**Why This Stack** (per ADR-001):
- Extensive AI training data (optimal for Claude development)
- Large component ecosystem (shadcn/ui, Radix UI)
- Strong TypeScript support end-to-end
- Built-in file-based routing
- Static export capability (no backend needed initially)
- Easy to add API routes later
- Familiar to most developers

### Proposed File Structure

```
design-suite-claude-skills/
├── dashboard-next/                 # New Next.js app
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout with sidebar
│   │   ├── page.tsx                # Projects list (/)
│   │   ├── project/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Project detail
│   │   ├── globals.css             # Global styles + Tailwind
│   │   └── api/                    # API routes (future)
│   │       └── projects/
│   │           └── route.ts
│   │
│   ├── components/                 # React components
│   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── tabs.tsx
│   │   ├── sidebar-nav.tsx         # Migrated from Lit
│   │   ├── project-card.tsx
│   │   ├── deliverable-card.tsx
│   │   ├── context-section.tsx
│   │   └── file-viewer-modal.tsx
│   │
│   ├── lib/                        # Utilities and data
│   │   ├── data/
│   │   │   └── projects.ts         # Data fetching
│   │   ├── utils.ts                # Utility functions
│   │   └── constants.ts            # Design tokens
│   │
│   ├── public/                     # Static assets
│   │   ├── data/
│   │   │   └── projects.json       # Project data (accessible)
│   │   └── deliverables/           # Design files (MOVED HERE)
│   │       ├── research/
│   │       ├── concepts/
│   │       ├── production/
│   │       └── qa/
│   │
│   ├── types/                      # TypeScript types
│   │   ├── project.ts
│   │   └── deliverable.ts
│   │
│   ├── tailwind.config.ts          # Tailwind + design tokens
│   ├── next.config.js              # Next.js config
│   ├── tsconfig.json               # TypeScript config
│   └── package.json
│
├── dashboard/                      # OLD Vite app (keep during migration)
└── outputs/
    └── design-dashboard/           # OLD location (archived after migration)
```

### Key Architectural Decisions

#### 1. File Location Strategy

**Problem**: Design deliverables currently outside app root
**Solution**: Move all deliverables into `/public/deliverables/`

**Benefits**:
- Direct access via URLs (`/deliverables/research/personas.md`)
- No parent directory access required
- Clean deployment (everything in one tree)
- File paths in `projects.json` just need prefix update

**Migration Path**:
```bash
# Move deliverables into Next.js public directory
cp -r outputs/design-dashboard/* dashboard-next/public/deliverables/

# Update projects.json file paths
# FROM: /outputs/design-dashboard/research/personas.md
# TO:   /deliverables/research/personas.md
```

#### 2. Component Migration Strategy

**Lit → React Conversion**:
- Lit components are already well-structured
- Props/events pattern translates cleanly to React
- Shadow DOM → standard React component tree
- CSS-in-JS (Lit) → Tailwind classes

**Example Migration**:
```typescript
// BEFORE (Lit)
export class ProjectCard extends LitElement {
  static properties = {
    project: { type: Object }
  };

  static styles = css`...`;

  render() {
    return html`<div class="card">...</div>`;
  }
}

// AFTER (React + TypeScript)
interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="rounded-lg border border-border bg-secondary p-6 hover:shadow-lg transition-all">
      ...
    </div>
  );
}
```

#### 3. Styling Migration

**From**: CSS-in-JS (Lit) + CSS custom properties
**To**: Tailwind CSS + design tokens in `tailwind.config.ts`

**Design Token Mapping**:
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
        },
        text: {
          primary: '#f3f4f6',
          secondary: '#9ca3af',
          tertiary: '#6b7280',
        },
        brand: {
          primary: '#2563eb',
          hover: '#1d4ed8',
          active: '#1e40af',
        },
        status: {
          research: '#a78bfa',
          'research-bg': 'rgba(124, 58, 237, 0.12)',
          // ... all status colors
        }
      },
      spacing: {
        // 8px base system from tokens
      }
    }
  }
}
```

**Benefits**:
- Utilities-first CSS (faster development)
- Better tree-shaking (smaller bundles)
- Autocomplete in IDE
- Consistent with shadcn/ui components

#### 4. Data Loading Strategy

**Static Data (Phase 1)**:
```typescript
// lib/data/projects.ts
import projectsData from '@/public/data/projects.json';

export async function getProjects(): Promise<Project[]> {
  return projectsData.projects;
}

export async function getProject(id: string): Promise<Project | undefined> {
  return projectsData.projects.find(p => p.id === id);
}
```

**Server Components (Phase 1)**:
```typescript
// app/page.tsx (Server Component)
import { getProjects } from '@/lib/data/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
```

**Future: API Routes (Phase 2+)**:
```typescript
// app/api/projects/route.ts
export async function GET() {
  const projects = await getProjects(); // Could fetch from DB
  return Response.json(projects);
}

export async function POST(request: Request) {
  const data = await request.json();
  // Add new project
  return Response.json({ success: true });
}
```

#### 5. Routing Strategy

**File-Based Routing** (Next.js App Router):
- `/` → `app/page.tsx` (Projects list)
- `/project/[id]` → `app/project/[id]/page.tsx` (Project detail)
- `/api/projects` → `app/api/projects/route.ts` (API endpoint - future)

**No client-side router needed** - Next.js handles this

#### 6. TypeScript Integration

**Type Definitions**:
```typescript
// types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'research' | 'concepts' | 'production' | 'qa' | 'complete';
  createdDate: string;
  lastUpdated: string;
  pmDashboardUrl?: string;
  designGoals: string[];
  designPrinciples: DesignPrinciple[];
  deliverables: Deliverable[];
  keyInsights: string[];
}

export interface Deliverable {
  id: string;
  type: string;
  skill: string;
  title: string;
  summary: string;
  filePath: string;
  createdDate: string;
  visible: boolean;
  visualAssets?: VisualAssets;
}

export interface VisualAssets {
  colorPalette?: string[];
  images?: string[];
  preview?: string;
}
```

**Benefits**:
- Compile-time type checking
- Autocomplete in IDE
- Refactoring safety
- Self-documenting code

---

## Migration Strategy

### Approach: Parallel Development with Cutover

**Why Not In-Place Migration?**
- Keep existing dashboard functional during migration
- Test new version thoroughly before switching
- Easy rollback if issues arise
- Compare implementations side-by-side

**Process**:
1. Create new `dashboard-next/` directory
2. Build Next.js version in parallel
3. Test thoroughly
4. Switch over (rename directories)
5. Archive old Vite version

### Phase Breakdown

---

## Phase 1: Foundation Setup (Week 1)

### Goals
- Next.js project initialized
- Design tokens migrated to Tailwind
- File structure established
- Basic layout working

### Tasks

#### 1.1: Initialize Next.js Project
```bash
# In design-suite-claude-skills/
npx create-next-app@latest dashboard-next \
  --typescript \
  --tailwind \
  --app \
  --src-dir false \
  --import-alias "@/*"
```

**Configuration**:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- App Router: Yes
- Customize import alias: Yes (@/*)

#### 1.2: Install Dependencies
```bash
cd dashboard-next

# shadcn/ui setup
npx shadcn-ui@latest init

# Core dependencies (already included)
# - next@14+
# - react@18+
# - typescript
# - tailwindcss

# Additional utilities
npm install clsx tailwind-merge
npm install -D @types/node
```

#### 1.3: Configure Design Tokens

**File**: `tailwind.config.ts`
```typescript
import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Map from design-tokens.js
        background: {
          primary: '#0a0a0a',
          secondary: '#1a1a1a',
          tertiary: '#2a2a2a',
          elevated: '#3a3a3a',
        },
        text: {
          primary: '#f3f4f6',
          secondary: '#9ca3af',
          tertiary: '#6b7280',
          disabled: '#4a5568',
        },
        brand: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          active: '#1e40af',
          subtle: 'rgba(37, 99, 235, 0.12)',
        },
        status: {
          research: '#a78bfa',
          'research-bg': 'rgba(124, 58, 237, 0.12)',
          concepts: '#60a5fa',
          'concepts-bg': 'rgba(37, 99, 235, 0.12)',
          production: '#fbbf24',
          'production-bg': 'rgba(245, 158, 11, 0.12)',
          qa: '#34d399',
          'qa-bg': 'rgba(16, 185, 129, 0.12)',
        },
        border: {
          DEFAULT: '#2a2a2a',
          hover: '#3a3a3a',
          focus: '#2563eb',
        },
      },
      spacing: {
        // 8px base system (Tailwind already has this)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Monaco', 'monospace'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        DEFAULT: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
        lg: '0 8px 16px rgba(0, 0, 0, 0.4)',
        xl: '0 12px 24px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
```

#### 1.4: Create Directory Structure
```bash
mkdir -p app/project/[id]
mkdir -p components/ui
mkdir -p lib/data
mkdir -p public/data
mkdir -p public/deliverables
mkdir -p types
```

#### 1.5: Move Design Deliverables
```bash
# Copy deliverables into Next.js public directory
cp -r outputs/design-dashboard/* public/deliverables/

# Directory structure after move:
# public/
#   ├── deliverables/
#   │   ├── research/
#   │   ├── concepts/
#   │   ├── production/
#   │   └── qa/
```

#### 1.6: Update projects.json File Paths
```typescript
// Script to update file paths in projects.json
const projects = require('./dashboard/src/data/projects.json');

projects.projects.forEach(project => {
  project.deliverables.forEach(deliverable => {
    // FROM: /outputs/design-dashboard/research/personas.md
    // TO:   /deliverables/research/personas.md
    deliverable.filePath = deliverable.filePath.replace(
      '/outputs/design-dashboard/',
      '/deliverables/'
    );
  });
});

// Save to public/data/projects.json
fs.writeFileSync(
  'public/data/projects.json',
  JSON.stringify(projects, null, 2)
);
```

#### 1.7: Create TypeScript Types
**File**: `types/project.ts`
```typescript
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  createdDate: string;
  lastUpdated: string;
  pmDashboardUrl?: string;
  designGoals: string[];
  designPrinciples: DesignPrinciple[];
  deliverables: Deliverable[];
  keyInsights: string[];
}

export type ProjectStatus = 'research' | 'concepts' | 'production' | 'qa' | 'complete';

export interface DesignPrinciple {
  title: string;
  description: string;
  rationale: string;
}

export interface Deliverable {
  id: string;
  type: string;
  skill: string;
  title: string;
  summary: string;
  filePath: string;
  createdDate: string;
  visible: boolean;
  visualAssets?: VisualAssets;
}

export interface VisualAssets {
  colorPalette?: string[];
  images?: string[];
  preview?: string;
}
```

#### 1.8: Set Up Root Layout
**File**: `app/layout.tsx`
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Design Dashboard',
  description: 'Track design projects through research, concepts, production, and QA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background-primary text-text-primary`}>
        {children}
      </body>
    </html>
  );
}
```

**File**: `app/globals.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background-primary text-text-primary;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

#### 1.9: Create Data Loading Utilities
**File**: `lib/data/projects.ts`
```typescript
import { Project } from '@/types/project';
import projectsData from '@/public/data/projects.json';

export async function getProjects(): Promise<Project[]> {
  // In Phase 1: Return static data
  // In Phase 2+: Could fetch from API/database
  return projectsData.projects as Project[];
}

export async function getProject(id: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find(p => p.id === id);
}

export async function getProjectsByStatus(status: string): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter(p => p.status === status);
}
```

**File**: `lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
}
```

### Phase 1 Deliverables

- ✅ Next.js project initialized with TypeScript
- ✅ Design tokens migrated to Tailwind config
- ✅ File structure established
- ✅ Design deliverables moved to `/public/deliverables/`
- ✅ TypeScript types defined
- ✅ Data loading utilities created
- ✅ Root layout configured

### Phase 1 Testing

```bash
npm run dev
# Verify dev server starts at localhost:3000
# Check that routes are accessible
# Verify TypeScript compiles without errors
```

---

## Phase 2: Component Migration (Week 2)

### Goals
- Migrate all Lit components to React
- Implement shadcn/ui base components
- Create reusable UI primitives
- Match existing visual design

### Tasks

#### 2.1: Install shadcn/ui Components
```bash
# Button component
npx shadcn-ui@latest add button

# Card component
npx shadcn-ui@latest add card

# Tabs component
npx shadcn-ui@latest add tabs

# Badge component
npx shadcn-ui@latest add badge
```

#### 2.2: Migrate Sidebar Navigation

**From**: `dashboard/src/components/sidebar-nav.js` (Lit)
**To**: `components/sidebar-nav.tsx` (React)

**Key Changes**:
- `LitElement` → React functional component
- `static styles` → Tailwind classes
- `html` template → JSX
- Custom events → callback props

**Implementation**:
```typescript
// components/sidebar-nav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  count?: number;
}

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname();

  const mainNav: NavItem[] = [
    { label: 'All Projects', href: '/', count: 3 },
    { label: 'Active', href: '/active', count: 2 },
    { label: 'Complete', href: '/complete', count: 1 },
  ];

  const phaseNav: NavItem[] = [
    { label: 'Research', href: '/phase/research' },
    { label: 'Concepts', href: '/phase/concepts' },
    { label: 'Production', href: '/phase/production' },
    { label: 'QA', href: '/phase/qa' },
  ];

  return (
    <nav className={cn('w-60 bg-background-secondary border-r border-border p-6', className)}>
      {/* Logo */}
      <h1 className="text-lg font-semibold mb-8">Design Dashboard</h1>

      {/* Main Navigation */}
      <div className="mb-6">
        <ul className="space-y-1">
          {mainNav.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-brand text-white'
                    : 'text-text-secondary hover:bg-background-tertiary'
                )}
              >
                <span>{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-xs text-text-tertiary">{item.count}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Phase Navigation */}
      <div>
        <h2 className="text-xs uppercase text-text-tertiary mb-3 px-3">Phase</h2>
        <ul className="space-y-1">
          {phaseNav.map(item => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm transition-colors',
                  pathname === item.href
                    ? 'bg-brand text-white'
                    : 'text-text-secondary hover:bg-background-tertiary'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
```

#### 2.3: Migrate Project Card

**From**: `dashboard/src/components/project-card.js` (Lit)
**To**: `components/project-card.tsx` (React)

```typescript
// components/project-card.tsx
import Link from 'next/link';
import { Project } from '@/types/project';
import { cn, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const statusColors = {
  research: 'bg-status-research-bg text-status-research',
  concepts: 'bg-status-concepts-bg text-status-concepts',
  production: 'bg-status-production-bg text-status-production',
  qa: 'bg-status-qa-bg text-status-qa',
  complete: 'bg-green-500/10 text-green-500',
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <Link href={`/project/${project.id}`}>
      <Card
        className={cn(
          'p-6 cursor-pointer transition-all hover:border-border-hover hover:-translate-y-0.5 hover:shadow-lg',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {project.name}
          </h3>
          <Badge
            className={cn('capitalize', statusColors[project.status])}
            variant="outline"
          >
            {project.status}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* Metadata */}
        <div className="flex gap-6 pt-4 border-t border-border text-xs text-text-tertiary">
          <div className="flex items-center gap-1.5">
            <span>Deliverables:</span>
            <span className="text-text-primary font-medium">
              {project.deliverables?.length || 0}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Updated:</span>
            <span className="text-text-primary font-medium">
              {formatDate(project.lastUpdated)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
```

#### 2.4: Migrate Deliverable Card

**From**: `dashboard/src/components/deliverable-card.js` (Lit)
**To**: `components/deliverable-card.tsx` (React)

```typescript
// components/deliverable-card.tsx
'use client';

import { Deliverable } from '@/types/project';
import { cn, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DeliverableCardProps {
  deliverable: Deliverable;
  onViewFile?: (filePath: string) => void;
  className?: string;
}

const skillColors = {
  'design-research': 'bg-status-research-bg text-status-research',
  'design-concepts': 'bg-status-concepts-bg text-status-concepts',
  'design-production': 'bg-status-production-bg text-status-production',
  'design-qa': 'bg-status-qa-bg text-status-qa',
};

export function DeliverableCard({
  deliverable,
  onViewFile,
  className,
}: DeliverableCardProps) {
  if (!deliverable.visible) return null;

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all hover:border-border-hover hover:-translate-y-0.5 hover:shadow-lg',
        className
      )}
    >
      {/* Visual Preview */}
      {deliverable.visualAssets && (
        <div className="h-60 bg-background-primary border-b border-border">
          {/* Color Palette Preview */}
          {deliverable.visualAssets.colorPalette && (
            <div className="flex h-full">
              {deliverable.visualAssets.colorPalette.map((color, index) => (
                <div
                  key={index}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          )}

          {/* Image Preview */}
          {deliverable.visualAssets.preview && !deliverable.visualAssets.colorPalette && (
            <div className="h-full flex items-center justify-center text-text-tertiary">
              {deliverable.visualAssets.preview}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">
            {deliverable.title}
          </h3>
          <Badge
            className={cn(
              'text-xs uppercase',
              skillColors[deliverable.skill] || 'bg-background-tertiary text-text-secondary'
            )}
            variant="outline"
          >
            {deliverable.skill.replace('design-', '')}
          </Badge>
        </div>

        {/* Summary */}
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {deliverable.summary}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xs text-text-tertiary">
            {formatDate(deliverable.createdDate)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewFile?.(deliverable.filePath)}
          >
            View File →
          </Button>
        </div>
      </div>
    </Card>
  );
}
```

#### 2.5: Migrate Context Section

**From**: `dashboard/src/components/context-section.js` (Lit)
**To**: `components/context-section.tsx` (React)

```typescript
// components/context-section.tsx
'use client';

import { useState } from 'react';
import { DesignPrinciple } from '@/types/project';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ContextSectionProps {
  title: string;
  items: DesignPrinciple[] | string[];
  type: 'principles' | 'insights';
  initiallyExpanded?: boolean;
  className?: string;
}

export function ContextSection({
  title,
  items,
  type,
  initiallyExpanded = false,
  className,
}: ContextSectionProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const displayItems = isExpanded ? items : items.slice(0, 3);
  const hasMore = items.length > 3;

  return (
    <Card className={cn('p-8', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
        {hasMore && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : `Show All (${items.length})`}
          </Button>
        )}
      </div>

      {/* Content */}
      {type === 'principles' ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(displayItems as DesignPrinciple[]).map((principle, index) => (
            <div
              key={index}
              className="p-5 bg-background-primary border border-border rounded-md"
            >
              <h3 className="text-sm font-semibold text-brand mb-2">
                {principle.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {principle.description}
              </p>
              <p className="text-xs text-text-tertiary leading-relaxed">
                <span className="font-medium">Rationale:</span> {principle.rationale}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {(displayItems as string[]).map((insight, index) => (
            <div
              key={index}
              className="flex gap-3 p-4 bg-background-primary border border-border rounded-md"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand text-white text-xs font-medium flex items-center justify-center">
                {index + 1}
              </div>
              <p className="text-sm text-text-primary">{insight}</p>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
```

### Phase 2 Deliverables

- ✅ All Lit components migrated to React + TypeScript
- ✅ shadcn/ui base components installed and configured
- ✅ Visual design matches existing Lit implementation
- ✅ Components use Tailwind classes instead of CSS-in-JS
- ✅ Type-safe props and events

### Phase 2 Testing

- Visual comparison with Vite version
- Responsive behavior (desktop, tablet, mobile)
- Accessibility (keyboard navigation, screen readers)
- TypeScript compilation without errors

---

## Phase 3: Views and Routing (Week 3)

### Goals
- Implement Projects List view
- Implement Project Detail view
- Set up client/server component split
- Implement file viewer modal
- Add loading and error states

### Tasks

#### 3.1: Create Projects List Page

**File**: `app/page.tsx` (Server Component)
```typescript
import { getProjects } from '@/lib/data/projects';
import { ProjectCard } from '@/components/project-card';
import { SidebarNav } from '@/components/sidebar-nav';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen">
      <SidebarNav />

      <main className="flex-1 p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">All Projects</h1>
          <p className="text-text-secondary">
            Track design projects through research, concepts, production, and QA
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-border">
          <div className="flex gap-6 text-sm text-text-tertiary">
            <a href="#" className="hover:text-brand transition-colors">
              PM Dashboard
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              Engineering Wiki
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
```

#### 3.2: Create Project Detail Page

**File**: `app/project/[id]/page.tsx` (Server Component)
```typescript
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/data/projects';
import { SidebarNav } from '@/components/sidebar-nav';
import { ContextSection } from '@/components/context-section';
import { DeliverablesList } from '@/components/deliverables-list';
import { Badge } from '@/components/ui/badge';

export default async function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex min-h-screen">
      <SidebarNav />

      <main className="flex-1">
        {/* Project Header */}
        <div className="p-10 pb-0">
          <Badge className="mb-4" variant="outline">
            {project.status}
          </Badge>
          <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
          <p className="text-lg text-text-secondary max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Tabs */}
        <div className="px-10 mt-8 mb-10 border-b border-border">
          <div className="flex gap-8">
            <button className="pb-3 border-b-2 border-brand text-brand font-medium">
              Overview
            </button>
            <button className="pb-3 text-text-tertiary hover:text-text-secondary">
              All Deliverables
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-10 pb-10 max-w-7xl">
          {/* Design Goals */}
          {project.designGoals.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Design Goals</h2>
              <ul className="space-y-2">
                {project.designGoals.map((goal, index) => (
                  <li key={index} className="flex gap-3 text-text-primary">
                    <span className="text-brand">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Design Principles */}
          {project.designPrinciples.length > 0 && (
            <ContextSection
              title="Design Principles"
              items={project.designPrinciples}
              type="principles"
              initiallyExpanded={true}
              className="mb-8"
            />
          )}

          {/* Key Insights */}
          {project.keyInsights.length > 0 && (
            <ContextSection
              title="Key Insights"
              items={project.keyInsights}
              type="insights"
              className="mb-8"
            />
          )}

          {/* Deliverables */}
          <DeliverablesList deliverables={project.deliverables} />
        </div>
      </main>
    </div>
  );
}
```

#### 3.3: Create Deliverables List Component

**File**: `components/deliverables-list.tsx` (Client Component)
```typescript
'use client';

import { useState } from 'react';
import { Deliverable } from '@/types/project';
import { DeliverableCard } from '@/components/deliverable-card';
import { FileViewerModal } from '@/components/file-viewer-modal';

interface DeliverablesListProps {
  deliverables: Deliverable[];
}

export function DeliverablesList({ deliverables }: DeliverablesListProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Group by skill/phase
  const grouped = deliverables.reduce((acc, deliverable) => {
    const skill = deliverable.skill;
    if (!acc[skill]) acc[skill] = [];
    acc[skill].push(deliverable);
    return acc;
  }, {} as Record<string, Deliverable[]>);

  const phaseOrder = ['design-research', 'design-concepts', 'design-production', 'design-qa'];
  const sortedPhases = Object.keys(grouped).sort(
    (a, b) => phaseOrder.indexOf(a) - phaseOrder.indexOf(b)
  );

  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-6">Deliverables</h2>

        {sortedPhases.map(phase => (
          <div key={phase} className="mb-10">
            <h3 className="text-lg font-semibold text-text-secondary mb-4 capitalize">
              {phase.replace('design-', '')} Phase
            </h3>
            <div className="space-y-6">
              {grouped[phase].map(deliverable => (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                  onViewFile={setSelectedFile}
                />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* File Viewer Modal */}
      {selectedFile && (
        <FileViewerModal
          filePath={selectedFile}
          onClose={() => setSelectedFile(null)}
        />
      )}
    </>
  );
}
```

#### 3.4: Create File Viewer Modal

**File**: `components/file-viewer-modal.tsx` (Client Component)
```typescript
'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FileViewerModalProps {
  filePath: string;
  onClose: () => void;
}

export function FileViewerModal({ filePath, onClose }: FileViewerModalProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFile() {
      try {
        setLoading(true);
        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error('Failed to load file');
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadFile();
  }, [filePath]);

  // Keyboard shortcut: Esc to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className={cn(
          'relative w-full max-w-4xl h-[90vh] bg-background-secondary',
          'border border-border rounded-lg shadow-xl',
          'flex flex-col'
        )}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold truncate">{filePath.split('/').pop()}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-text-tertiary">Loading...</div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-500">Error: {error}</div>
            </div>
          )}

          {!loading && !error && (
            <div className="prose prose-invert max-w-none">
              {filePath.endsWith('.html') ? (
                <iframe
                  srcDoc={content}
                  className="w-full h-full border-0"
                  title="File preview"
                />
              ) : (
                <pre className="text-sm whitespace-pre-wrap">{content}</pre>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border flex justify-between">
          <span className="text-sm text-text-tertiary">
            Press Esc to close
          </span>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
```

#### 3.5: Add Loading States

**File**: `app/loading.tsx`
```typescript
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-text-tertiary">Loading...</div>
    </div>
  );
}
```

**File**: `app/project/[id]/loading.tsx`
```typescript
export default function ProjectLoading() {
  return (
    <div className="flex min-h-screen">
      <div className="w-60 bg-background-secondary border-r border-border" />
      <div className="flex-1 p-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-background-tertiary rounded w-1/3" />
          <div className="h-4 bg-background-tertiary rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}
```

#### 3.6: Add Error States

**File**: `app/error.tsx`
```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-text-secondary mb-6">{error.message}</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}
```

**File**: `app/project/[id]/not-found.tsx`
```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
        <p className="text-text-secondary mb-6">
          The project you're looking for doesn't exist.
        </p>
        <Link href="/">
          <Button>Back to Projects</Button>
        </Link>
      </div>
    </div>
  );
}
```

### Phase 3 Deliverables

- ✅ Projects List page implemented
- ✅ Project Detail page implemented
- ✅ File viewer modal working
- ✅ Client/server component split optimized
- ✅ Loading and error states added
- ✅ Keyboard shortcuts (Esc to close modal)

### Phase 3 Testing

- Navigate between pages
- Click project cards
- View deliverables
- Open file viewer modal
- Test keyboard shortcuts
- Verify loading states
- Test error handling

---

## Phase 4: File Management & Polish (Week 4)

### Goals
- Markdown rendering for deliverables
- Image optimization
- Responsive design polish
- Accessibility improvements
- Performance optimization

### Tasks

#### 4.1: Add Markdown Rendering

```bash
npm install react-markdown remark-gfm rehype-highlight
```

**File**: `components/markdown-renderer.tsx`
```typescript
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      className="prose prose-invert max-w-none"
      components={{
        // Custom components for better styling
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-3 mt-8">{children}</h2>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-brand hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="px-1.5 py-0.5 bg-background-tertiary rounded text-sm">
              {children}
            </code>
          ) : (
            <code className="block p-4 bg-background-primary rounded-lg overflow-x-auto">
              {children}
            </code>
          ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

#### 4.2: Update File Viewer to Use Markdown

**Update**: `components/file-viewer-modal.tsx`
```typescript
import { MarkdownRenderer } from '@/components/markdown-renderer';

// In render:
{!loading && !error && (
  filePath.endsWith('.md') ? (
    <MarkdownRenderer content={content} />
  ) : filePath.endsWith('.html') ? (
    <iframe srcDoc={content} className="w-full h-full border-0" />
  ) : (
    <pre className="text-sm whitespace-pre-wrap">{content}</pre>
  )
)}
```

#### 4.3: Mobile Responsive Sidebar

**File**: `components/mobile-nav.tsx`
```typescript
'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarNav } from '@/components/sidebar-nav';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 transform transition-transform md:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarNav />
      </div>
    </>
  );
}
```

#### 4.4: Responsive Layout Updates

Update layouts for mobile:
- Reduce padding on small screens
- Stack project cards vertically
- Make deliverable previews smaller
- Adjust font sizes

#### 4.5: Accessibility Audit

- Add skip-to-content link
- Ensure all interactive elements are keyboard accessible
- Add proper ARIA labels
- Test with screen reader
- Verify color contrast ratios
- Add focus indicators

#### 4.6: Performance Optimization

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Phase 1
  output: 'export',

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true,
  },

  // Trailing slash for consistent URLs
  trailingSlash: true,
};

module.exports = nextConfig;
```

### Phase 4 Deliverables

- ✅ Markdown rendering implemented
- ✅ Mobile navigation working
- ✅ Responsive design polished
- ✅ Accessibility improvements complete
- ✅ Performance optimized
- ✅ Static export configured

---

## Phase 5: Testing & Deployment (Week 5)

### Goals
- Comprehensive testing
- Build and deploy
- Documentation
- Cutover from Vite version

### Tasks

#### 5.1: Testing Checklist

**Functional Testing**:
- [ ] All routes accessible
- [ ] Project cards clickable
- [ ] Deliverables display correctly
- [ ] File viewer opens/closes
- [ ] Markdown renders properly
- [ ] HTML files display in iframe
- [ ] Loading states appear
- [ ] Error states handle gracefully

**Responsive Testing**:
- [ ] Mobile (375px - iPhone SE)
- [ ] Tablet (768px - iPad)
- [ ] Desktop (1440px - standard)
- [ ] Large desktop (1920px+)

**Accessibility Testing**:
- [ ] Keyboard navigation works
- [ ] Screen reader announces correctly
- [ ] Focus indicators visible
- [ ] Color contrast passes WCAG AA
- [ ] Skip to content link works

**Browser Testing**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Performance Testing**:
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle size < 150KB (gzipped)

#### 5.2: Build for Production

```bash
# Build static export
npm run build

# Test production build locally
npm run preview
# or
npx serve@latest out
```

#### 5.3: Deploy to Vercel/Netlify

**Option 1: Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Option 2: Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

**Option 3: GitHub Pages**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

#### 5.4: Documentation

**File**: `dashboard-next/README.md`
```markdown
# Design Dashboard - Next.js

A centralized dashboard for tracking design projects through research, concepts, production, and QA.

## Tech Stack

- Next.js 14+ (App Router)
- React 18+
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
\`\`\`

## Project Structure

- \`app/\` - Next.js App Router pages
- \`components/\` - React components
- \`lib/\` - Utilities and data loading
- \`public/\` - Static assets and deliverables
- \`types/\` - TypeScript type definitions

## Adding Projects

Edit \`public/data/projects.json\` to add or update projects.

## Adding Deliverables

1. Place files in \`public/deliverables/[phase]/\`
2. Update project entry in \`projects.json\`
3. Add summary and metadata

## Deployment

This app can be deployed as a static site to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service
```

#### 5.5: Migration Cutover

**Steps**:
1. Verify Next.js version fully working
2. Create backup of Vite version
3. Rename directories:
   ```bash
   mv dashboard dashboard-vite-backup
   mv dashboard-next dashboard
   ```
4. Update any external links/references
5. Archive old outputs directory:
   ```bash
   mv outputs/design-dashboard outputs/design-dashboard-archived
   ```

#### 5.6: Post-Migration Cleanup

- Remove Vite dependencies from root package.json
- Update documentation to reference Next.js
- Update skill integration scripts to write to new paths
- Archive Vite codebase (keep for reference)

### Phase 5 Deliverables

- ✅ All tests passing
- ✅ Production build successful
- ✅ Deployed to hosting service
- ✅ Documentation complete
- ✅ Migration cutover successful
- ✅ Old version archived

---

## Skill Integration Updates

### How Skills Will Add Deliverables (Post-Migration)

**Before (Vite)**:
```python
# Skills wrote to:
outputs/design-dashboard/research/personas.md

# And updated:
dashboard/src/data/projects.json
```

**After (Next.js)**:
```python
# Skills write to:
dashboard/public/deliverables/research/personas.md

# And update:
dashboard/public/data/projects.json
```

### Update Helper Script

**File**: `dashboard/scripts/add-deliverable.js`
```javascript
#!/usr/bin/env node

/**
 * Helper script for design skills to add deliverables
 *
 * Usage:
 *   node add-deliverable.js --project-id="design-dashboard" \
 *     --deliverable='{"id":"deliv-new","type":"personas",...}'
 */

const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../public/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

// Parse command line args
const args = process.argv.slice(2).reduce((acc, arg) => {
  const [key, value] = arg.split('=');
  acc[key.replace('--', '')] = value;
  return acc;
}, {});

const projectId = args['project-id'];
const deliverable = JSON.parse(args['deliverable']);

// Find project
const project = projects.projects.find(p => p.id === projectId);
if (!project) {
  console.error(`Project not found: ${projectId}`);
  process.exit(1);
}

// Add deliverable
project.deliverables.push(deliverable);
project.lastUpdated = new Date().toISOString().split('T')[0];

// Save
fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));

console.log(`✅ Added deliverable: ${deliverable.title}`);
```

### Skill Update Instructions

All design skills (research, concepts, production, QA) need minor updates:

1. **Update output paths**:
   - FROM: `outputs/design-dashboard/`
   - TO: `dashboard/public/deliverables/`

2. **Update projects.json path**:
   - FROM: `dashboard/src/data/projects.json`
   - TO: `dashboard/public/data/projects.json`

3. **Update file path references**:
   - FROM: `/outputs/design-dashboard/research/personas.md`
   - TO: `/deliverables/research/personas.md`

4. **Use helper script** (optional):
   ```bash
   node dashboard/scripts/add-deliverable.js \
     --project-id="my-project" \
     --deliverable='{"id":"deliv-123",...}'
   ```

---

## File Management System (Future Phase 2)

### Vision: Web-Based File Management

**Current State (Phase 1)**:
- Manual file placement in `public/deliverables/`
- Manual JSON editing

**Future State (Phase 2+)**:
- Web UI for uploading files
- Automatic deliverable creation
- File organization tools
- Search and filtering

### Proposed Features

#### File Upload UI
```typescript
// app/admin/upload/page.tsx
'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file!);

    await fetch('/api/deliverables/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Upload Deliverable</h1>

      <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
        <Upload className="w-12 h-12 mx-auto mb-4 text-text-tertiary" />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer text-brand hover:underline"
        >
          Choose file to upload
        </label>
      </div>

      {file && (
        <button
          onClick={handleUpload}
          className="mt-6 px-4 py-2 bg-brand text-white rounded-md"
        >
          Upload {file.name}
        </button>
      )}
    </div>
  );
}
```

#### API Route for Uploads
```typescript
// app/api/deliverables/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to public/deliverables/
  const filePath = path.join(process.cwd(), 'public/deliverables', file.name);
  await writeFile(filePath, buffer);

  return NextResponse.json({ success: true, path: `/deliverables/${file.name}` });
}
```

**Note**: File uploads require Node.js runtime (not static export). This would be Phase 2+ feature requiring server deployment.

---

## Risk Assessment & Mitigation

### Risk Matrix

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Component conversion errors** | Medium | Medium | Incremental migration, visual comparison testing |
| **Data structure incompatibility** | Low | High | TypeScript types enforce schema, test data loading early |
| **File path breakage** | Medium | High | Automated path migration script, comprehensive testing |
| **Performance regression** | Low | Medium | Lighthouse testing, bundle size monitoring |
| **Accessibility issues** | Medium | Medium | Accessibility audit checklist, screen reader testing |
| **Deployment failures** | Low | Medium | Test static export locally before deployment |
| **Skill integration breakage** | Medium | High | Update all skills simultaneously, test end-to-end |
| **User disruption** | Low | High | Parallel development, thorough testing before cutover |

### Mitigation Strategies

1. **Parallel Development**
   - Keep Vite version running during migration
   - No disruption to users
   - Easy rollback if needed

2. **Incremental Testing**
   - Test each component as migrated
   - Visual comparison screenshots
   - Automated accessibility tests

3. **Data Validation**
   - TypeScript ensures data structure correctness
   - Validate projects.json schema
   - Test data loading before building views

4. **Automated Path Migration**
   - Script to update file paths in projects.json
   - Verify all files accessible
   - Test links in production build

5. **Comprehensive Testing**
   - Manual testing checklist
   - Automated Lighthouse tests
   - Cross-browser verification

6. **Gradual Rollout**
   - Deploy to staging environment first
   - Internal team testing
   - Final cutover only after approval

---

## Success Criteria

### Technical Success

- ✅ All components migrated from Lit to React
- ✅ Visual design matches existing implementation
- ✅ All deliverables accessible without path hacks
- ✅ TypeScript compilation without errors
- ✅ Lighthouse score > 90
- ✅ Bundle size < 150KB (gzipped)
- ✅ Static export builds successfully

### Functional Success

- ✅ Users can view all projects
- ✅ Users can view project details
- ✅ Users can open deliverable files
- ✅ Markdown renders correctly
- ✅ HTML files display in iframe
- ✅ Mobile navigation works
- ✅ Keyboard navigation functional

### User Experience Success

- ✅ Page load time < 2s
- ✅ No visual regression from Vite version
- ✅ Responsive on all screen sizes
- ✅ Accessible to screen readers
- ✅ Intuitive navigation
- ✅ Fast interactions (< 100ms)

### Developer Experience Success

- ✅ TypeScript autocomplete working
- ✅ Hot reload functional
- ✅ Component library easy to use
- ✅ Clear documentation
- ✅ Easy to add new deliverables
- ✅ Skills integration straightforward

---

## Post-Migration Roadmap

### Phase 2: Enhanced Features (Month 2)

1. **Advanced File Management**
   - Web-based file upload
   - Drag-and-drop organization
   - File renaming and deletion
   - Bulk operations

2. **Search & Filter**
   - Full-text search across deliverables
   - Filter by phase, skill, date
   - Saved search queries

3. **Enhanced Markdown**
   - Mermaid diagram support
   - Embedded videos
   - Interactive code examples

### Phase 3: Collaboration (Month 3)

1. **Comments & Annotations**
   - Comment on deliverables
   - @mentions
   - Notification system

2. **Version History**
   - Track deliverable changes
   - Compare versions
   - Rollback capability

3. **Authentication**
   - NextAuth.js integration
   - Role-based access control
   - User profiles

### Phase 4: Integration (Month 4)

1. **PM Dashboard Integration**
   - Sync project status
   - Cross-link features
   - Unified navigation

2. **Design Tool Integration**
   - Figma plugin
   - Import designs automatically
   - Sync design tokens

3. **Database Migration**
   - Move from JSON to PostgreSQL
   - API endpoints for CRUD operations
   - Real-time updates

---

## Decision Log

### Why Next.js Over Vite + Lit?

**Decision**: Migrate to Next.js + React
**Date**: October 23, 2025
**Rationale**: Per ADR-001, extensive AI training data, larger ecosystem, better TypeScript support, easier future extensibility
**Trade-offs**: Larger bundle size (~80KB vs 30KB), but acceptable for internal tool

### Why Static Export (Phase 1)?

**Decision**: Use `output: 'export'` for initial deployment
**Rationale**: No backend needed yet, simple deployment, fast hosting
**Trade-offs**: No server-side features (API routes, auth), but these aren't needed in Phase 1
**Future**: Can switch to server deployment for Phase 2+

### Why Move Files into `/public/deliverables/`?

**Decision**: Relocate all design files from `outputs/` to `dashboard/public/deliverables/`
**Rationale**: Eliminates parent directory access hacks, cleaner deployment, standard Next.js pattern
**Trade-offs**: Need to update all file paths, but one-time migration cost
**Benefits**: No more Vite `fs.allow` workaround, cleaner architecture

### Why Tailwind Over Styled Components?

**Decision**: Use Tailwind CSS with design tokens
**Rationale**: Better tree-shaking, utilities-first approach, consistent with shadcn/ui, faster development
**Trade-offs**: Learning curve for Tailwind classes, but extensive documentation available
**Benefits**: Autocomplete, smaller bundle, faster styling

### Why App Router Over Pages Router?

**Decision**: Use Next.js App Router
**Rationale**: Modern pattern, Server Components, better performance, future-proof
**Trade-offs**: Newer API (less Stack Overflow answers), but better documentation
**Benefits**: File-based routing, Server Components, layouts, error boundaries

---

## Appendix

### A. Component Mapping (Lit → React)

| Lit Component | React Component | Status | Notes |
|---------------|----------------|--------|-------|
| `sidebar-nav.js` | `sidebar-nav.tsx` | ✅ Migrated | Client component for navigation |
| `project-card.js` | `project-card.tsx` | ✅ Migrated | Server component safe |
| `deliverable-card.js` | `deliverable-card.tsx` | ✅ Migrated | Client component for modal interaction |
| `context-section.js` | `context-section.tsx` | ✅ Migrated | Client component for collapse state |
| `projects-list.js` | `app/page.tsx` | ✅ Migrated | Server component |
| `project-detail.js` | `app/project/[id]/page.tsx` | ✅ Migrated | Server component |

### B. File Path Migration Script

```javascript
// scripts/migrate-file-paths.js
const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, '../dashboard/src/data/projects.json');
const projects = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));

let changedCount = 0;

projects.projects.forEach(project => {
  project.deliverables.forEach(deliverable => {
    const oldPath = deliverable.filePath;

    if (oldPath.startsWith('/outputs/design-dashboard/')) {
      deliverable.filePath = oldPath.replace(
        '/outputs/design-dashboard/',
        '/deliverables/'
      );
      changedCount++;
    }
  });
});

const outputPath = path.join(__dirname, '../dashboard-next/public/data/projects.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));

console.log(`✅ Migrated ${changedCount} file paths`);
console.log(`📝 Wrote to: ${outputPath}`);
```

### C. Deployment Checklist

- [ ] Build completes without errors
- [ ] All pages accessible in production build
- [ ] Images load correctly
- [ ] Files accessible from `/deliverables/`
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Accessibility audit passes
- [ ] Lighthouse score > 90
- [ ] Cross-browser tested
- [ ] Environment variables configured (if any)
- [ ] Domain configured (if custom)
- [ ] SSL certificate active

### D. Rollback Plan

If migration fails or critical issues found:

1. **Immediate Rollback**:
   ```bash
   mv dashboard dashboard-next-failed
   mv dashboard-vite-backup dashboard
   ```

2. **Restore Files**:
   ```bash
   mv outputs/design-dashboard-archived outputs/design-dashboard
   ```

3. **Restart Vite Server**:
   ```bash
   cd dashboard
   npm install
   npm run dev
   ```

4. **Document Issues**:
   - Log what went wrong
   - Identify blockers
   - Plan fixes before retry

### E. Resources & References

**Next.js Documentation**:
- [App Router](https://nextjs.org/docs/app)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

**shadcn/ui**:
- [Installation](https://ui.shadcn.com/docs/installation/next)
- [Components](https://ui.shadcn.com/docs/components)

**Tailwind CSS**:
- [Documentation](https://tailwindcss.com/docs)
- [Dark Mode](https://tailwindcss.com/docs/dark-mode)

**TypeScript**:
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

---

## Conclusion

This migration plan provides a comprehensive, step-by-step approach to converting the Design Dashboard from Vite + Lit to Next.js + React. The phased approach minimizes risk, the parallel development strategy prevents user disruption, and the detailed task breakdown ensures nothing is missed.

**Key Takeaways**:
1. Migration eliminates file access hacks and improves architecture
2. Next.js provides better developer experience and AI assistance
3. Parallel development allows thorough testing before cutover
4. File management improvements set foundation for future features
5. Five-week timeline is realistic with clear deliverables each week

**Next Steps**:
1. Review and approve this plan
2. Begin Phase 1: Foundation setup
3. Track progress against weekly milestones
4. Test thoroughly at each phase
5. Complete migration by end of Week 5

**Success depends on**:
- Following the phase-by-phase approach
- Thorough testing at each milestone
- Clear communication with stakeholders
- Willingness to iterate based on findings

Good luck with the migration! 🚀
