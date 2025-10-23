# ADR-001: Use Next.js + React for Design Dashboard

**Date:** 2025-10-23
**Status:** Accepted
**Deciders:** Development Team

---

## Context

The Design Dashboard is an internal tool for developers to view design projects and deliverables through all phases (Research → Concepts → Production → QA). We need to choose a frontend framework and build tooling.

**Initial Proposal:**
- **Framework**: Vite + Lit 3.x Web Components
- **Rationale**: Lightweight, native web components, fast build times

**Constraints:**
- Internal developer tool (not public)
- Static data (< 100 projects, JSON files)
- No authentication required
- Mobile not a priority
- Performance important but no strict Lighthouse requirements
- Team will use AI tools (Claude, GitHub Copilot) extensively

---

## Decision

We will use **Next.js 14+ (App Router) with React 18+, Tailwind CSS, and shadcn/ui**.

**Full Stack:**
- **Framework**: Next.js 14+ with App Router
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)
- **Data**: Static JSON files in `/public/data/`
- **Assets**: Design deliverables in `/public/outputs/`
- **Deployment**: Vercel (static export)
- **TypeScript**: Yes, throughout

---

## Alternatives Considered

### Option 1: Vite + Lit Web Components (Original Proposal)

**Pros:**
- Lightweight bundle size (~30KB)
- Native web components (no framework lock-in)
- Fast build times
- Modern web standards

**Cons:**
- Limited AI training data (harder for Claude/Copilot to generate code)
- Smaller ecosystem (fewer component libraries)
- Less familiar to most developers
- Hiring challenge (fewer Lit developers)
- Routing requires additional library (Lit Router or vanilla)
- Less TypeScript ecosystem support

**Score**: 3.0 / 5.0 (weighted)

---

### Option 2: Next.js + React (Chosen)

**Pros:**
- Extensive AI training data (optimal for Claude/Copilot)
- Large component ecosystem (shadcn/ui, Radix UI, etc.)
- Strong TypeScript support throughout
- Built-in file-based routing
- Static export capability (no backend needed)
- Easy to add API routes later if needed
- Familiar to most developers
- Excellent documentation

**Cons:**
- Larger initial bundle (~80-100KB vs 30KB for Lit)
- Framework-specific patterns (some lock-in)
- Slightly longer build times

**Score**: 4.7 / 5.0 (weighted)

---

### Option 3: Vite + React (Not Chosen)

**Pros:**
- Fast build times (faster than Next.js)
- Flexible (no framework opinions)
- Good AI support (React ecosystem)
- Lighter than Next.js

**Cons:**
- Manual routing setup needed (React Router)
- No built-in optimizations (images, fonts)
- More boilerplate required
- Less opinionated (more decisions needed)

**Score**: 3.8 / 5.0 (weighted)

---

## Decision Factors

### AI Development Experience (High Priority)

**Winner: Next.js**

- Claude and AI tools have extensive Next.js training data
- React patterns are well-understood by AI assistants
- Tailwind CSS has strong AI code generation support
- shadcn/ui components are well-documented and AI-friendly

### TypeScript Support (High Priority)

**Winner: Next.js**

- End-to-end type safety (client + server)
- Excellent TypeScript ecosystem
- Auto-imports and IntelliSense throughout

### Component Ecosystem (High Priority)

**Winner: Next.js**

- shadcn/ui for accessible, customizable components
- Radix UI primitives (WCAG AA compliant by default)
- Huge ecosystem of React libraries

### Performance (Medium Priority - Internal Tool)

**Winner: Lit** (but not critical)

- Bundle size difference: ~50KB (acceptable for internal tool)
- Both are fast enough for < 100 projects
- Next.js Image optimization adds value despite bundle size

### Future Extensibility (Medium Priority)

**Winner: Next.js**

- Easy to add API routes if needed
- Built-in authentication patterns (NextAuth.js)
- Database integration straightforward (Prisma)
- Server Components for data fetching

### Learning Curve (Low Priority)

**Winner: Next.js** (for most developers)

- React is more widely known
- File-based routing is intuitive
- More tutorials and resources

---

## Consequences

### Positive

- ✅ **Faster AI-assisted development**: Claude can generate high-quality Next.js/React code
- ✅ **Rich component ecosystem**: Access to shadcn/ui, Radix UI, and thousands of React libraries
- ✅ **Built-in optimizations**: Image optimization, font optimization, code splitting
- ✅ **Type safety**: End-to-end TypeScript support improves code quality
- ✅ **Future-proof**: Easy to add server-side features (API routes, authentication) later
- ✅ **Better documentation**: Extensive Next.js and React documentation
- ✅ **Easier hiring**: Most frontend developers know React

### Negative

- ⚠️ **Larger bundle size**: ~80-100KB vs ~30KB for Lit (acceptable for internal tool)
- ⚠️ **Framework lock-in**: Some Next.js-specific patterns (mitigated by React portability)
- ⚠️ **Longer build times**: Seconds vs milliseconds (not a concern for small project)

### Neutral

- Static export means we don't use Next.js server features initially (but have them if needed)
- Design tokens will map to Tailwind config (same effort as CSS variables)
- Component structure similar between Lit and React (easy mental model)

---

## Implementation Notes

### Phase 1 Setup

1. Initialize Next.js with TypeScript:
   ```bash
   npx create-next-app@latest design-dashboard --typescript --tailwind --app
   ```

2. Install shadcn/ui:
   ```bash
   npx shadcn-ui@latest init
   ```

3. Convert design tokens to Tailwind config:
   ```typescript
   // tailwind.config.ts
   module.exports = {
     theme: {
       extend: {
         colors: {
           'bg-primary': '#0a0a0a',
           'bg-secondary': '#1a1a1a',
           // ... from design-tokens.js
         }
       }
     }
   }
   ```

4. Set up static data loading:
   ```typescript
   // lib/data/projects.ts
   import projectsData from '@/public/data/projects.json'
   export async function getProjects() { /* ... */ }
   ```

5. Configure static export:
   ```typescript
   // next.config.js
   module.exports = {
     output: 'export',
     images: { unoptimized: true }
   }
   ```

### Design Spec Compatibility

All components from Vite + Lit design spec translate 1:1 to React:
- Sidebar Nav → React component
- Project Card → React component
- Deliverable Card → React component
- Context Section → React component with useState for collapse
- Buttons → shadcn/ui Button with variants

No design changes required.

---

## Migration Path (if needed)

If we need to move away from Next.js later:

1. **React components are portable** → Can move to Vite + React
2. **Tailwind is framework-agnostic** → Works everywhere
3. **File-based routing** → Translate to React Router
4. **Static data loading** → Simple JS module imports

Estimated migration effort: 2-3 days for experienced developer.

---

## Success Criteria

- ✅ Development velocity increases with AI assistance
- ✅ Component reuse across views (DRY principle)
- ✅ Type safety catches errors at compile time
- ✅ Build completes in < 30 seconds
- ✅ Bundle size < 150KB (gzipped)
- ✅ First Contentful Paint < 2s (internal tool standard)

---

## Related

- [ARCHITECTURE-REVIEW.md](../../ARCHITECTURE-REVIEW.md) - Full architectural review
- [Design Specification](../../outputs/design-dashboard/production/design-specification.md) - Original Vite + Lit spec
- [Feature Registry](../../design-dashboard-registry.csv) - 33 features to implement

---

## Review Schedule

- **Next Review**: After Phase 1 completion (Week 2)
- **Criteria**: Evaluate AI development experience, bundle size, type safety benefits
- **Action**: Reaffirm decision or course-correct if major issues found

---

**Approved By**: Development Team
**Implementation Start**: 2025-10-23
