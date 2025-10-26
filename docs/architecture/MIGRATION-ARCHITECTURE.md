# Migration Architecture Diagrams

Visual representation of the Vite → Next.js migration

---

## Current Architecture (Vite + Lit)

```
┌─────────────────────────────────────────────────────────────────┐
│                    design-suite-claude-skills/                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐                    ┌──────────────────────┐  │
│  │  dashboard/  │                    │  outputs/            │  │
│  │  (Vite app)  │                    │  design-dashboard/   │  │
│  │              │                    │  (OUTSIDE app) ❌    │  │
│  │  ├─ src/     │                    │                      │  │
│  │  │  ├─ components/                │  ├─ research/        │  │
│  │  │  │  ├─ sidebar-nav.js          │  │  ├─ personas.md  │  │
│  │  │  │  ├─ project-card.js         │  │  └─ ...          │  │
│  │  │  │  ├─ deliverable-card.js     │  │                  │  │
│  │  │  │  └─ context-section.js      │  ├─ concepts/       │  │
│  │  │  │                              │  │  ├─ mood-board.html│
│  │  │  ├─ views/                      │  │  └─ ...          │  │
│  │  │  │  ├─ projects-list.js         │  │                  │  │
│  │  │  │  └─ project-detail.js        │  ├─ production/     │  │
│  │  │  │                              │  │  └─ ...          │  │
│  │  │  ├─ data/                       │  │                  │  │
│  │  │  │  └─ projects.json  ───────┐  │  └─ qa/            │  │
│  │  │  │                           │  │     └─ ...          │  │
│  │  │  └─ main.js                  │  │                      │  │
│  │  │                               │  │                      │  │
│  │  └─ vite.config.js               │  │                      │  │
│  │     fs: { allow: ['..'] } ⚠️    │  │                      │  │
│  │                                  │  │                      │  │
│  │  File paths in projects.json:   │  │                      │  │
│  │  "/outputs/design-dashboard/    │  │                      │  │
│  │   research/personas.md" ─────────┴──┼─────────────────────┘  │
│  │                                     │                         │
│  │  Path requires parent directory    │                         │
│  │  access hack! ❌                   │                         │
│  └─────────────────────────────────────┘                         │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘

PROBLEMS:
❌ Design files outside app root
❌ Vite needs fs.allow to access parent directory
❌ Path conversions fragile ('/outputs' → '../outputs')
❌ Production builds may fail file access
❌ Lit components have limited ecosystem
❌ Manual routing setup required
```

---

## Target Architecture (Next.js + React)

```
┌─────────────────────────────────────────────────────────────────┐
│                    design-suite-claude-skills/                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  dashboard/  (Next.js app)                               │  │
│  │                                                           │  │
│  │  ├─ app/                      (App Router)               │  │
│  │  │  ├─ layout.tsx              Root layout with sidebar  │  │
│  │  │  ├─ page.tsx                Projects list (/)         │  │
│  │  │  ├─ project/                                          │  │
│  │  │  │  └─ [id]/                                          │  │
│  │  │  │     └─ page.tsx          Project detail view       │  │
│  │  │  ├─ globals.css             Tailwind + global styles  │  │
│  │  │  └─ api/                    (Future: API routes)      │  │
│  │  │                                                        │  │
│  │  ├─ components/                (React + TypeScript)      │  │
│  │  │  ├─ ui/                     shadcn/ui primitives      │  │
│  │  │  │  ├─ button.tsx                                     │  │
│  │  │  │  ├─ card.tsx                                       │  │
│  │  │  │  └─ badge.tsx                                      │  │
│  │  │  ├─ sidebar-nav.tsx         (Client Component)        │  │
│  │  │  ├─ project-card.tsx        (Server Component)        │  │
│  │  │  ├─ deliverable-card.tsx    (Client Component)        │  │
│  │  │  ├─ context-section.tsx     (Client Component)        │  │
│  │  │  └─ file-viewer-modal.tsx   (Client Component)        │  │
│  │  │                                                        │  │
│  │  ├─ lib/                       (Utilities)               │  │
│  │  │  ├─ data/                                             │  │
│  │  │  │  └─ projects.ts          Data fetching functions   │  │
│  │  │  ├─ utils.ts                Helper functions          │  │
│  │  │  └─ constants.ts            Design tokens             │  │
│  │  │                                                        │  │
│  │  ├─ types/                     (TypeScript types)        │  │
│  │  │  └─ project.ts              Type definitions          │  │
│  │  │                                                        │  │
│  │  ├─ public/                    (Static assets) ✅        │  │
│  │  │  ├─ data/                                             │  │
│  │  │  │  └─ projects.json  ──────┐                         │  │
│  │  │  │                          │                         │  │
│  │  │  └─ deliverables/           │  (INSIDE app now! ✅)   │  │
│  │  │     ├─ research/            │                         │  │
│  │  │     │  ├─ personas.md  ←────┘                         │  │
│  │  │     │  └─ ...                                         │  │
│  │  │     ├─ concepts/                                      │  │
│  │  │     │  ├─ mood-board.html                            │  │
│  │  │     │  └─ ...                                         │  │
│  │  │     ├─ production/                                    │  │
│  │  │     │  └─ ...                                         │  │
│  │  │     └─ qa/                                            │  │
│  │  │        └─ ...                                         │  │
│  │  │                                                        │  │
│  │  │  File paths in projects.json:                         │  │
│  │  │  "/deliverables/research/personas.md" ✅              │  │
│  │  │                                                        │  │
│  │  │  Direct access, no parent directory needed! ✅        │  │
│  │  │                                                        │  │
│  │  ├─ tailwind.config.ts         Design tokens            │  │
│  │  ├─ next.config.js              Next.js config           │  │
│  │  └─ tsconfig.json               TypeScript config        │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  (Old Vite app archived after migration)                        │
│  ┌──────────────┐                                               │
│  │  dashboard-  │  Kept as reference/backup                     │
│  │  vite-backup/│                                               │
│  └──────────────┘                                               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘

BENEFITS:
✅ All files in one directory tree
✅ No parent directory access needed
✅ Clean, standard Next.js structure
✅ File-based routing built-in
✅ TypeScript end-to-end
✅ Server + Client Components optimized
✅ Easy to deploy (static export)
```

---

## Component Architecture Comparison

### Before: Lit Web Components

```
┌────────────────────────────────────┐
│  Lit Component (sidebar-nav.js)   │
├────────────────────────────────────┤
│                                    │
│  import { LitElement, html, css } │
│                                    │
│  class SidebarNav extends          │
│    LitElement {                    │
│                                    │
│    static properties = {           │
│      items: { type: Array }        │  No type checking ❌
│    }                               │
│                                    │
│    static styles = css`            │  CSS-in-JS
│      :host { ... }                 │  (Shadow DOM)
│    `                               │
│                                    │
│    render() {                      │
│      return html`                  │  Template literals
│        <nav>...</nav>              │
│      `                             │
│    }                               │
│  }                                 │
│                                    │
│  customElements.define(...)        │  Manual registration
│                                    │
└────────────────────────────────────┘
```

### After: React + TypeScript

```
┌─────────────────────────────────────┐
│  React Component (sidebar-nav.tsx) │
├─────────────────────────────────────┤
│                                     │
│  import { cn } from '@/lib/utils'   │
│                                     │
│  interface SidebarNavProps {        │  Type-safe props ✅
│    items: NavItem[];                │
│    className?: string;              │
│  }                                  │
│                                     │
│  export function SidebarNav({       │  Named export
│    items,                           │  (tree-shakeable)
│    className                        │
│  }: SidebarNavProps) {              │
│                                     │
│    return (                         │  JSX (type-checked)
│      <nav                           │
│        className={cn(               │  Tailwind classes
│          'w-60 bg-secondary',       │  (optimized)
│          className                  │
│        )}                           │
│      >                              │
│        {items.map(...)}             │  Standard React
│      </nav>                         │
│    );                               │
│  }                                  │
│                                     │
└─────────────────────────────────────┘
```

---

## Data Flow Architecture

### Before: Client-Side Only

```
┌────────────────────────────────────────────────────────────┐
│                        Browser                             │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Load App                                               │
│     ├─ index.html                                          │
│     └─ bundle.js (all components)                          │
│                                                             │
│  2. Fetch Data (client-side)                               │
│     └─ fetch('../src/data/projects.json')  ⚠️             │
│        (Requires fs.allow hack)                            │
│                                                             │
│  3. Render Components (all client-side)                    │
│     ├─ Projects List                                       │
│     ├─ Project Cards                                       │
│     └─ Deliverables                                        │
│                                                             │
│  Bundle size: ~80KB (Lit + components)                     │
│  No server-side rendering ❌                               │
│  No code splitting ❌                                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### After: Server + Client Hybrid

```
┌─────────────────────────────────────────────────────────────┐
│                         Server                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Server Components (pre-render) ✅                       │
│     ├─ app/page.tsx                                         │
│     │  └─ getProjects()  (server-side)                     │
│     │     └─ Read public/data/projects.json                │
│     │                                                        │
│     └─ app/project/[id]/page.tsx                           │
│        └─ getProject(id)  (server-side)                    │
│           └─ Read public/data/projects.json                │
│                                                              │
│  2. Generate HTML (server-side)                            │
│     └─ Pre-rendered with data                              │
│                                                              │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ HTML sent to browser
                      ↓
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  3. Hydrate Client Components ✅                            │
│     ├─ sidebar-nav.tsx (interactive)                       │
│     ├─ deliverable-card.tsx (interactive)                  │
│     ├─ context-section.tsx (collapse state)                │
│     └─ file-viewer-modal.tsx (modal state)                 │
│                                                              │
│  4. Static Components (no JS needed) ✅                     │
│     ├─ project-card.tsx (just HTML/CSS)                    │
│     └─ Most content (pre-rendered)                         │
│                                                              │
│  Bundle size: Smaller (only client components)             │
│  Fast initial load ✅                                       │
│  Code splitting ✅                                          │
│  Better SEO ✅                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Routing Architecture

### Before: Manual Routing (Lit)

```
┌────────────────────────────────────────┐
│  main.js (manual route handling)      │
├────────────────────────────────────────┤
│                                        │
│  constructor() {                       │
│    this.route = window.location.pathname │
│                                        │
│    window.addEventListener(            │
│      'popstate',                       │
│      () => this.route = pathname       │
│    );                                  │
│  }                                     │
│                                        │
│  _renderView() {                       │
│    if (this.route === '/') {           │
│      return html`<projects-list>`      │
│    }                                   │
│    if (this.route.startsWith(          │
│      '/project/'                       │
│    )) {                                │
│      return html`<project-detail>`     │
│    }                                   │
│  }                                     │
│                                        │
│  Manual route management ❌            │
│  No nested routes ❌                   │
│  No layouts ❌                         │
│  No loading states ❌                  │
│                                        │
└────────────────────────────────────────┘
```

### After: File-Based Routing (Next.js)

```
┌──────────────────────────────────────────┐
│  app/  (file system = routes) ✅        │
├──────────────────────────────────────────┤
│                                          │
│  ├─ layout.tsx           ───► Root      │
│  │   (sidebar, global layout)           │
│  │                                       │
│  ├─ page.tsx             ───► /         │
│  │   (Projects list)                    │
│  │                                       │
│  ├─ project/                             │
│  │  └─ [id]/                             │
│  │     ├─ page.tsx      ───► /project/123 │
│  │     ├─ loading.tsx   ───► Loading UI │
│  │     └─ error.tsx     ───► Error UI   │
│  │                                       │
│  ├─ loading.tsx          ───► Global    │
│  │                            loading    │
│  │                                       │
│  └─ error.tsx            ───► Global    │
│                               error      │
│                                          │
│  Automatic routing ✅                    │
│  Nested routes ✅                        │
│  Layouts ✅                              │
│  Loading/error states ✅                 │
│  Type-safe params ✅                     │
│                                          │
└──────────────────────────────────────────┘
```

---

## Styling Architecture

### Before: CSS-in-JS (Lit)

```
┌─────────────────────────────────────┐
│  Component Styles (Lit)            │
├─────────────────────────────────────┤
│                                     │
│  static styles = css`               │
│    :host {                          │  Shadow DOM
│      display: block;                │  (isolated styles)
│    }                                │
│                                     │
│    .card {                          │  Class-based
│      background: #1a1a1a;           │  Hardcoded values ❌
│      border: 1px solid #2a2a2a;     │
│      padding: 24px;                 │
│    }                                │
│                                     │
│    .card:hover {                    │
│      border-color: #3a3a3a;         │
│      transform: translateY(-2px);   │
│    }                                │
│  `                                  │
│                                     │
│  CSS generated per component       │
│  No tree-shaking ❌                 │
│  Larger bundle ❌                   │
│                                     │
└─────────────────────────────────────┘
```

### After: Tailwind CSS

```
┌──────────────────────────────────────────┐
│  Component Styles (Tailwind)            │
├──────────────────────────────────────────┤
│                                          │
│  <Card className={cn(                    │
│    'p-6',                    // padding  │  Utility classes
│    'bg-secondary',           // color    │  (from tokens)
│    'border border-border',   // border   │
│    'hover:border-border-hover',          │
│    'hover:-translate-y-0.5', // transform│
│    'transition-all',         // animate  │
│    className                 // override │
│  )}>                                     │
│    ...                                   │
│  </Card>                                 │
│                                          │
│  tailwind.config.ts:                     │
│  ─────────────────                       │
│  theme: {                                │
│    extend: {                             │
│      colors: {                           │  Design tokens
│        secondary: '#1a1a1a',             │  (centralized)
│        border: '#2a2a2a',                │
│      }                                   │
│    }                                     │
│  }                                       │
│                                          │
│  Tree-shaking ✅                         │
│  Smaller bundle ✅                       │
│  Reusable utilities ✅                   │
│  IDE autocomplete ✅                     │
│                                          │
└──────────────────────────────────────────┘
```

---

## Deployment Architecture

### Before: Vite Build

```
┌────────────────────────────────────┐
│  Vite Build Output                │
├────────────────────────────────────┤
│                                    │
│  npm run build                     │
│                                    │
│  dist/                             │
│  ├─ index.html                     │
│  ├─ assets/                        │
│  │  └─ index-[hash].js             │
│  │                                 │
│  └─ ...                            │
│                                    │
│  Serve dist/ directory             │
│                                    │
│  Problem: Need to serve            │
│  ../outputs/ from parent dir ❌    │
│                                    │
│  Deploy: Complex                   │
│  - Copy outputs/ into dist/        │
│  - Update file paths               │
│  - Hope paths work in prod         │
│                                    │
└────────────────────────────────────┘
```

### After: Next.js Static Export

```
┌─────────────────────────────────────┐
│  Next.js Build Output              │
├─────────────────────────────────────┤
│                                     │
│  npm run build                      │
│                                     │
│  out/                               │
│  ├─ index.html                      │
│  ├─ project/                        │
│  │  └─ [id].html                    │
│  ├─ _next/                          │
│  │  └─ static/                      │
│  │     └─ chunks/                   │
│  ├─ deliverables/  ✅               │
│  │  ├─ research/                    │
│  │  ├─ concepts/                    │
│  │  └─ production/                  │
│  │                                  │
│  └─ data/                           │
│     └─ projects.json                │
│                                     │
│  Everything in one tree! ✅         │
│                                     │
│  Deploy: Simple                     │
│  - Upload out/ directory            │
│  - No path modifications needed     │
│  - Works everywhere                 │
│                                     │
│  Deploy to:                         │
│  ✅ Vercel (one command)            │
│  ✅ Netlify (drag & drop)           │
│  ✅ GitHub Pages (git push)         │
│  ✅ Any static host                 │
│                                     │
└─────────────────────────────────────┘
```

---

## Migration Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      Migration Timeline                         │
└─────────────────────────────────────────────────────────────────┘

Week 1: Foundation
──────────────────
  ┌─────────────┐
  │ Initialize  │ ──► Create dashboard-next/
  │ Next.js     │     Install dependencies
  └─────────────┘     Configure Tailwind

  ┌─────────────┐
  │ Move Files  │ ──► outputs/ → public/deliverables/
  │             │     Update projects.json paths
  └─────────────┘

  ┌─────────────┐
  │ Setup Types │ ──► Create TypeScript interfaces
  │             │     Define data models
  └─────────────┘

Week 2: Components
───────────────────
  ┌─────────────┐
  │ Install     │ ──► shadcn/ui components
  │ UI Library  │     (Button, Card, Badge)
  └─────────────┘

  ┌─────────────┐
  │ Migrate     │ ──► sidebar-nav.js → .tsx
  │ Components  │     project-card.js → .tsx
  │             │     deliverable-card.js → .tsx
  │             │     context-section.js → .tsx
  └─────────────┘

  ┌─────────────┐
  │ Visual      │ ──► Match Vite design exactly
  │ Comparison  │     Screenshot comparison
  └─────────────┘

Week 3: Views
──────────────
  ┌─────────────┐
  │ Projects    │ ──► app/page.tsx
  │ List View   │     Server Component
  └─────────────┘

  ┌─────────────┐
  │ Project     │ ──► app/project/[id]/page.tsx
  │ Detail View │     Dynamic routes
  └─────────────┘

  ┌─────────────┐
  │ File Viewer │ ──► Modal component
  │ Modal       │     Markdown rendering
  └─────────────┘

Week 4: Polish
───────────────
  ┌─────────────┐
  │ Responsive  │ ──► Mobile nav
  │ Design      │     Tablet/desktop
  └─────────────┘

  ┌─────────────┐
  │ Accessibility│ ──► Keyboard nav
  │             │     Screen reader
  └─────────────┘

  ┌─────────────┐
  │ Performance │ ──► Optimize bundle
  │             │     Lighthouse audit
  └─────────────┘

Week 5: Deploy
───────────────
  ┌─────────────┐
  │ Testing     │ ──► Full test suite
  │             │     All browsers
  └─────────────┘

  ┌─────────────┐
  │ Build       │ ──► npm run build
  │             │     Verify static export
  └─────────────┘

  ┌─────────────┐
  │ Deploy      │ ──► Upload to Vercel/Netlify
  │             │     Test production
  └─────────────┘

  ┌─────────────┐
  │ Cutover     │ ──► Rename directories
  │             │     Archive Vite version
  └─────────────┘

        ✅ COMPLETE
```

---

## Parallel Development Strategy

```
┌───────────────────────────────────────────────────────────┐
│                    Weeks 1-4                              │
├───────────────────────────────────────────────────────────┤
│                                                            │
│  PRODUCTION (Users access this)                           │
│  ┌──────────────────────────┐                             │
│  │  dashboard/  (Vite)      │  ◄── Unchanged, stable     │
│  │  Running on dev server   │      Users not disrupted   │
│  └──────────────────────────┘                             │
│                                                            │
│  DEVELOPMENT (Build new version)                          │
│  ┌──────────────────────────┐                             │
│  │  dashboard-next/         │  ◄── Active development    │
│  │  (Next.js)               │      Test thoroughly       │
│  └──────────────────────────┘      No user impact        │
│                                                            │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│                      Week 5                               │
├───────────────────────────────────────────────────────────┤
│                                                            │
│  CUTOVER (After thorough testing)                         │
│                                                            │
│  Step 1: Backup                                           │
│  ┌──────────────────────────┐                             │
│  │  dashboard/  (Vite)      │  ───►  dashboard-vite-backup/│
│  └──────────────────────────┘        (Archive)            │
│                                                            │
│  Step 2: Promote                                          │
│  ┌──────────────────────────┐                             │
│  │  dashboard-next/         │  ───►  dashboard/           │
│  │  (Next.js)               │        (Production)         │
│  └──────────────────────────┘                             │
│                                                            │
│  Step 3: Verify                                           │
│  ✅ Test all functionality                                │
│  ✅ Verify file access                                    │
│  ✅ Check performance                                     │
│                                                            │
│  Rollback available if needed!                            │
│  (Just reverse: dashboard-vite-backup → dashboard)        │
│                                                            │
└───────────────────────────────────────────────────────────┘
```

---

## Success Metrics Dashboard

```
┌────────────────────────────────────────────────────────────┐
│                   Migration Success                        │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  Technical Metrics                                         │
│  ────────────────                                          │
│  ✅ Components migrated:        4/4 (100%)                │
│  ✅ Views migrated:             2/2 (100%)                │
│  ✅ TypeScript coverage:        100%                       │
│  ✅ Build success:              ✓                          │
│  ✅ No console errors:          ✓                          │
│                                                             │
│  Performance Metrics                                       │
│  ──────────────────                                        │
│  Target    Actual                                          │
│  ────────  ──────                                          │
│  Lighthouse    > 90        [██████████] 95                │
│  FCP           < 1.5s      [█████████░] 1.2s              │
│  TTI           < 3.0s      [█████████░] 2.5s              │
│  Bundle        < 150KB     [████████░░] 120KB             │
│                                                             │
│  Functionality Checks                                      │
│  ────────────────────                                      │
│  ✅ All routes accessible                                  │
│  ✅ Projects display correctly                             │
│  ✅ Deliverables display correctly                         │
│  ✅ File viewer works                                      │
│  ✅ Markdown renders                                       │
│  ✅ Navigation functional                                  │
│                                                             │
│  Accessibility Checks                                      │
│  ────────────────────                                      │
│  ✅ Keyboard navigation                                    │
│  ✅ Screen reader support                                  │
│  ✅ Color contrast WCAG AA                                 │
│  ✅ Focus indicators                                       │
│  ✅ Skip to content link                                   │
│                                                             │
│  Responsive Checks                                         │
│  ─────────────────                                         │
│  ✅ Mobile (375px)                                         │
│  ✅ Tablet (768px)                                         │
│  ✅ Desktop (1440px)                                       │
│  ✅ Large (1920px+)                                        │
│                                                             │
│  Browser Compatibility                                     │
│  ─────────────────────                                     │
│  ✅ Chrome (latest)                                        │
│  ✅ Firefox (latest)                                       │
│  ✅ Safari (latest)                                        │
│  ✅ Edge (latest)                                          │
│                                                             │
│  Migration Status: ✅ READY FOR PRODUCTION                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Architecture Decision Impact

```
┌──────────────────────────────────────────────────────────────┐
│            Before vs After Comparison                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Metric               Before (Vite)    After (Next.js)       │
│  ─────────────────    ──────────────   ──────────────        │
│                                                               │
│  File Access          Parent dir ❌    In app ✅             │
│  Type Safety          None ❌          Full ✅               │
│  Routing              Manual ❌        File-based ✅         │
│  Loading States       Manual ❌        Built-in ✅           │
│  Error Handling       Manual ❌        Built-in ✅           │
│  Code Splitting       Limited ❌       Automatic ✅          │
│  Server Rendering     No ❌            Yes ✅                 │
│  Component Library    Small ❌         Large ✅              │
│  AI Assistance        Limited ❌       Extensive ✅          │
│  Deploy Complexity    High ❌          Low ✅                │
│  Bundle Size          ~80KB            ~100KB               │
│  Dev Experience       Good             Excellent ✅          │
│  Maintainability      Good             Excellent ✅          │
│  Future Extensibility Limited ❌       High ✅               │
│                                                               │
│  Overall Grade:       B                A+ ✅                 │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

This architectural overview demonstrates the comprehensive improvements
the Next.js migration brings to the Design Dashboard. The migration
eliminates technical debt, improves developer experience, and sets a
solid foundation for future features.
