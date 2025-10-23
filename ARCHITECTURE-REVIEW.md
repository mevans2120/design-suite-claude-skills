# Design Dashboard - Architectural Review

**Project**: Design Dashboard
**Review Date**: October 23, 2025
**Reviewed By**: technical-architecture skill
**Version**: 1.1
**Status**: Decisions Made - Ready for Implementation

---

## Decisions Made (2025-10-23)

### ✅ Technology Stack: Next.js + React
**Decision**: Switch from Vite + Lit to Next.js 14+ (App Router) + React + Tailwind CSS

### ✅ Critical Questions Answered

1. **Data Management**: Developer-only tool, static JSON files. No need to optimize for multi-user or CRUD operations yet.
2. **File Storage**: < 100 files, commit to `/public/outputs/` in repository
3. **Search & Filter**: Not needed. Only phase filtering (DD-13) required.
4. **Authentication**: Not public, developer-only. No authentication required.
5. **Real-Time Updates**: Not needed at this time.
6. **Performance**: Internal tool - reasonable optimization but no strict Lighthouse score requirements.
7. **Mobile**: Not a priority for this internal tool.
8. **Activity Tab**: Designs/specs will be provided later (Phase 2+).
9. **Project Creation**: Designs/specs will be provided later (Phase 2+).
10. **External Dashboard Links**: Placeholder for now, not a concern.

### Scope Clarification

**In Scope (Phase 1-4):**
- View existing projects and deliverables
- Phase-based filtering
- Design principles and insights display
- Visual previews for deliverables
- Responsive design (desktop/tablet)
- Accessibility (WCAG AA)

**Out of Scope (Future Phases):**
- User authentication
- Project creation UI
- Search functionality
- Real-time collaboration
- Mobile optimization
- Activity/timeline views

---

## Executive Summary

The Design Dashboard is a **well-scoped internal tool** for developers to view design projects and deliverables. With the tech stack decision made (Next.js + React + Tailwind) and critical questions answered, the project is **ready for implementation**. Feature phasing has been adjusted to 6 phases over 7 weeks.

---

## 1. Technology Stack Analysis

### Current Proposed Stack
- **Framework**: Vite + Lit 3.x Web Components
- **Data**: Static JSON (projects.json)
- **Routing**: Lit Router or vanilla History API
- **Deploy**: Static hosting (Netlify, Vercel, GitHub Pages)

### Recommended Stack (AI-Optimized)
I recommend **reconsidering the tech stack** for better AI development support:

**Primary Recommendation: Next.js 14+ (App Router) + React**

**Rationale:**
1. **AI Code Generation**: Next.js/React has vastly more training data and examples for AI tools
2. **TypeScript Support**: End-to-end type safety out of the box
3. **Documentation**: Extensive, well-structured documentation
4. **Component Ecosystem**: shadcn/ui, Radix UI for accessible components
5. **Routing**: Built-in file-based routing (clearer than Lit Router)
6. **Static Export**: `next build && next export` for static hosting
7. **Future-Proofing**: Easy to add API routes, server components, authentication later

**Alternative Stack:**
```
- Framework: Next.js 14+ with App Router
- UI Library: React 18+
- Styling: Tailwind CSS (matches your design tokens perfectly)
- Components: shadcn/ui (accessible, customizable)
- Data: JSON (initially), easy migration to database later
- Deploy: Vercel (free tier, optimized for Next.js)
```

**Why Not Lit?**
- **Limited AI training data**: Fewer examples for Claude/AI tools to learn from
- **Smaller ecosystem**: Fewer component libraries and patterns
- **Learning curve**: Less familiar to most developers
- **Hiring**: Harder to find developers with Lit experience

**Migration Effort:**
If already committed to Lit:
- Components will translate 1:1 to React
- Design tokens map directly to Tailwind config
- Keep Lit if team expertise exists, but expect slower AI-assisted development

---

## 2. Architectural Pattern Recommendation

**Recommended**: **Serverless Monolith** (Well-Structured)

### Reasoning:

**Project Characteristics:**
- Small to medium application (33 features, mostly UI)
- Single team/developer
- Static data initially (JSON)
- Simple deployment preferred
- Cost-conscious
- Room to grow (may add API later)

**Architecture:**
```
/design-dashboard (Next.js app)
├── app/
│   ├── (routes)/              # File-based routing
│   │   ├── page.tsx          # Projects list
│   │   └── project/[id]/     # Project detail
│   ├── layout.tsx            # Root layout with sidebar
│   └── globals.css           # Design tokens as CSS vars
├── components/
│   ├── ui/                   # shadcn components
│   ├── project-card.tsx
│   ├── deliverable-card.tsx
│   └── sidebar-nav.tsx
├── lib/
│   ├── data/
│   │   └── projects.ts       # Data loading logic
│   ├── types.ts              # TypeScript types
│   └── utils.ts              # Utilities
├── public/
│   ├── data/
│   │   └── projects.json     # Static data
│   └── outputs/              # Design deliverables
└── tailwind.config.ts        # Design tokens
```

**Pros:**
- ✅ Simple deployment (static export initially)
- ✅ Easy to understand and maintain
- ✅ Fast development with AI tools
- ✅ Can add API routes later without refactor
- ✅ Vercel free tier includes CDN, analytics
- ✅ Clear module boundaries prevent complexity

**Cons:**
- ⚠️ All-or-nothing scaling (not a concern at this stage)
- ⚠️ Longer build times as it grows (mitigated by Next.js incremental builds)

---

## 3. Feature Prioritization Review

### Phase Assignments Analysis

**Phase 1 (Foundation) - 8 features**: ✅ **Logical**
- DD-1: Projects List View
- DD-2: Project Detail View
- DD-3: Sidebar Navigation
- DD-9: Design Principles Display
- DD-10: Key Insights Display
- DD-13: Phase Filters
- DD-28: Back Navigation
- DD-30: Footer Links

**Recommendation**: ✅ Phase 1 is well-scoped. These features form the MVP.

---

**Phase 2 (Components & Content) - 13 features**: ⚠️ **Too Large**
- 8 UI components (cards, buttons, tabs, badges, etc.)
- 5 content/interaction features

**Recommendation**: Split Phase 2:
- **Phase 2A (Core Components)**: DD-4, DD-5, DD-6, DD-7, DD-11 (5 features)
- **Phase 2B (Enhanced Content)**: DD-8, DD-12, DD-14, DD-15, DD-16, DD-25, DD-26, DD-29 (8 features)

This creates more manageable milestones and allows testing after each phase.

---

**Phase 3 (Responsive & States) - 5 features**: ✅ **Logical**
- DD-17: Responsive Layout
- DD-18: Mobile Sidebar
- DD-21: Loading States
- DD-22: Empty States
- DD-23: Error States

**Recommendation**: ✅ Good grouping of polish features.

---

**Phase 4 (Polish & Accessibility) - 7 features**: ⚠️ **Reconsider Timing**
- DD-19: Hover States
- DD-20: Focus States (accessibility)
- DD-24: Page Transitions
- DD-27: Expand/Collapse Animation
- DD-31: Keyboard Navigation (accessibility)
- DD-32: Screen Reader Support (accessibility)
- DD-33: Reduced Motion Support (accessibility)

**Recommendation**: Move accessibility features EARLIER:
- **Phase 2C (Accessibility Foundation)**: DD-20, DD-31, DD-32, DD-33 (4 features)
  - *Rationale*: Build accessibility in from the start, not as an afterthought
- **Phase 4 (Polish & Animation)**: DD-19, DD-24, DD-27 (3 features)

---

### Suggested Phase Reorganization

| Phase | Focus | Features | Duration |
|-------|-------|----------|----------|
| Phase 1 | Foundation & MVP | 8 features | Week 1-2 |
| Phase 2A | Core Components | 5 features | Week 3 |
| Phase 2B | Enhanced Content | 8 features | Week 4 |
| Phase 2C | Accessibility Foundation | 4 features | Week 5 |
| Phase 3 | Responsive & States | 5 features | Week 6 |
| Phase 4 | Polish & Animation | 3 features | Week 7 |

**Total**: 33 features over 7 weeks (vs original 4-phase plan)

---

## 4. Dependency Analysis

### Critical Path
```
DD-1 (Projects List)
  → DD-2 (Project Detail)
    → DD-3 (Sidebar) → DD-13 (Phase Filters), DD-18 (Mobile Sidebar), DD-28 (Back Nav)
    → DD-6 (Context Section) → DD-14 (Progressive Disclosure)
    → DD-11 (Status Badges) → DD-25 (Skill Badges)
    → DD-17 (Responsive) → DD-18 (Mobile Sidebar)
    → DD-20 (Focus States) → DD-31 (Keyboard Nav), DD-32 (Screen Reader)
    → DD-7 (Button) → DD-26 (View File Action)
```

### Blocking Issues Found
- DD-18 (Mobile Sidebar) depends on both DD-3 (Sidebar) and DD-17 (Responsive)
  - Currently DD-18 is Phase 3, but DD-17 is also Phase 3
  - ✅ **Acceptable** - implement DD-17 first in Phase 3

- DD-2 (Project Detail) marked as depending on DD-1 (Projects List)
  - ✅ **Logical** - need navigation from list to detail

---

## 5. Concerns & Risks

### 🔴 High Priority Concerns

**1. Data Management Strategy Unclear**
- **Issue**: Starting with static JSON, but what's the plan for dynamic data?
- **Question**: Will projects be created by users? Or only added by developers?
- **Risk**: If user-generated, you'll need a database + API. This changes architecture significantly.
- **Recommendation**: Clarify data CRUD requirements NOW before building.

**2. File Path Management**
- **Issue**: Deliverables reference file paths (`/outputs/design-dashboard/...`)
- **Question**: Are these files committed to repo? Uploaded to CDN?
- **Risk**: Large files in git, or broken links if files move
- **Recommendation**:
  - If < 100 files: Commit to `/public/outputs/`
  - If > 100 files: Use CDN (Vercel Blob, S3 + CloudFront)

**3. Search & Filter Not in Feature List**
- **Issue**: Design spec mentions "Filters (horizontal)" but only DD-13 (Phase Filters)
- **Question**: Is there search by name? Filter by date? Tags?
- **Missing Features**:
  - Search input component
  - Client-side search logic
  - URL query params for filters
- **Recommendation**: Add explicit feature for search if needed

---

### 🟡 Medium Priority Concerns

**4. Authentication Not Addressed**
- **Question**: Is this a public dashboard? Or does it need login?
- **Impact**: If auth is needed, add NextAuth.js early (Phase 1 or 2A)

**5. Real-Time Updates**
- **Question**: Do multiple users collaborate? Need real-time project updates?
- **Impact**: If yes, consider Supabase Realtime or WebSockets

**6. Visual Preview Loading Performance**
- **Issue**: DD-12 (Visual Preview System) shows 240px height images
- **Risk**: Large images slow page load
- **Recommendation**:
  - Use Next.js `<Image>` component with automatic optimization
  - Lazy load images below fold
  - Provide thumbnails vs full-size

**7. Mobile Performance**
- **Issue**: Lit Web Components can have larger bundle size than expected
- **Risk**: Slow mobile load times
- **Recommendation**:
  - Target < 100KB total bundle (gzipped)
  - Use Lighthouse CI in GitHub Actions
  - Monitor Core Web Vitals

---

### 🟢 Low Priority Observations

**8. Activity Tab Mentioned, Not Specified**
- Design spec mentions "Overview / All Deliverables / Activity" tabs
- Only Overview and Deliverables are detailed
- **Question**: What goes in Activity tab? Timeline? Changelog?

**9. No Feature for Adding New Projects**
- All 33 features are read-only UI
- **Question**: How are projects created? Manual JSON editing?

**10. PM Dashboard & Engineering Dashboard Links**
- Footer links to external dashboards (DD-30)
- **Question**: Do these exist? URLs?

---

## 6. Scalability Considerations

### Current Scale
- **Projects**: ~10-50 expected?
- **Deliverables**: ~5-10 per project
- **Users**: Single user? Team of 5? 50?
- **Traffic**: Internal tool? Public portfolio?

### Scaling Strategy

**If < 100 projects, < 10 users:**
- ✅ Static JSON is perfect
- ✅ Static hosting (Vercel free tier)
- ✅ No database needed

**If 100-1000 projects, 10-50 users:**
- ⚠️ Move to database (Supabase Postgres)
- ⚠️ Add API routes for CRUD
- ✅ Still serverless (Next.js API routes)
- ⚠️ Add authentication (NextAuth.js)

**If > 1000 projects, > 50 users:**
- ⚠️ Database with indexes and caching (Supabase + Redis)
- ⚠️ CDN for deliverable files (Vercel Blob or S3)
- ⚠️ Search engine (Algolia or Typesense)
- ⚠️ Monitoring (Sentry, Vercel Analytics)

---

## 7. Security Review

### Current Posture: ✅ Low Risk (Static Site)

**If Staying Static:**
- ✅ No authentication needed
- ✅ No sensitive data (all design files)
- ✅ HTTPS automatic on Vercel/Netlify
- ⚠️ Consider: Do design files contain any confidential information?

**If Adding Dynamic Features:**
- ⚠️ Input validation (Zod for form data)
- ⚠️ Authentication (NextAuth.js or Supabase Auth)
- ⚠️ Authorization (RBAC if multi-tenant)
- ⚠️ Rate limiting (Vercel Edge Config or Upstash)
- ⚠️ CSRF protection (Next.js includes by default)

---

## 8. Quick Wins & Simplifications

### Combine Features

**1. Merge Status & Skill Badges**
- DD-11 (Status Badges) and DD-25 (Skill Badges) use same component
- **Save**: 1 feature, reuse badge component with variant prop

**2. Combine Animation Features**
- DD-19 (Hover States), DD-24 (Page Transitions), DD-27 (Expand Animation)
- **Save**: Bundle as single "Animations & Transitions" feature
- Implement all at once for consistency

**3. Merge Accessibility Features**
- DD-20, DD-31, DD-32, DD-33 all accessibility-related
- **Save**: Bundle as "WCAG AA Compliance" feature
- Implement together in Phase 2C

### Reduce Scope (Optional)

**Activity Tab** (DD-8 mentions it)
- **Impact**: Low value if not specified
- **Recommendation**: Cut from Phase 1, add later if needed

**Mobile Hamburger Menu** (DD-18)
- **Alternative**: Keep sidebar visible on tablet, hide completely on mobile
- **Impact**: Simpler implementation
- **Trade-off**: Less navigation on mobile

---

## 9. Technology Decision Matrix

| Criteria | Next.js + React | Vite + Lit | Weight | Winner |
|----------|-----------------|------------|--------|--------|
| AI Tool Support | 5 | 2 | High | Next.js |
| Documentation | 5 | 3 | High | Next.js |
| Component Ecosystem | 5 | 2 | High | Next.js |
| Performance (Bundle Size) | 4 | 5 | Medium | Lit |
| TypeScript Support | 5 | 4 | High | Next.js |
| Learning Curve | 4 | 3 | Low | Next.js |
| Future Extensibility | 5 | 3 | Medium | Next.js |
| Deployment | 5 | 5 | Medium | Tie |
| **Total Weighted Score** | **4.7** | **3.0** | | **Next.js** |

---

## 10. Questions for Clarification

### Critical (Must Answer Before Building)

1. **Data Management**:
   - Will users create projects via UI? Or only developers via JSON?
   - If via UI, need authentication + database now

2. **File Storage**:
   - Where are design deliverables stored long-term?
   - Repo (`/public/outputs/`)? CDN? External service?
   - How many MB of files total?

3. **Users & Access**:
   - Is this a public portfolio site? Or private team tool?
   - Does it need authentication/authorization?
   - Single user or multi-user?

4. **Tech Stack Commitment**:
   - Is Vite + Lit a hard requirement? Or open to Next.js?
   - Does team have Lit expertise? Or learning from scratch?

### Important (Answer in Phase 1)

5. **Search & Filter**:
   - Is DD-13 (Phase Filters) the only filtering?
   - Need text search by project name?
   - Filter by date, tags, or other metadata?

6. **Activity Tab**:
   - What should appear in Activity tab (mentioned in spec)?
   - Timeline? Changelog? Comments?

7. **Project Creation**:
   - How are new projects added to the dashboard?
   - Manual JSON editing? Admin UI?

8. **External Dashboard Links**:
   - Do PM Dashboard and Engineering Dashboard exist?
   - URLs? Or placeholders for now?

### Nice-to-Know (Answer in Phase 2-3)

9. **Real-Time Features**:
   - Multiple users viewing same project simultaneously?
   - Need real-time updates?

10. **Analytics**:
    - Track page views, interactions?
    - Which tool? (Vercel Analytics, PostHog, etc.)

---

## 11. Recommended Architecture (Next.js)

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     Client (Browser)                     │
│                                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Next.js App (React)                    │  │
│  │                                                   │  │
│  │  • App Router (file-based routing)              │  │
│  │  • Server Components (data fetching)            │  │
│  │  • Client Components (interactions)             │  │
│  │  • Tailwind CSS (styling)                       │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                  Static Data Layer                       │
│                                                           │
│  • /public/data/projects.json (data)                    │
│  • /public/outputs/**/* (deliverable files)             │
│                                                           │
│  Future: Supabase Postgres (if dynamic data needed)     │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────┐
│                    Deployment                            │
│                                                           │
│  • Vercel (CDN + Edge Network)                          │
│  • Static Site Generation (SSG)                         │
│  • Automatic HTTPS                                       │
│  • Analytics Included                                    │
└─────────────────────────────────────────────────────────┘
```

### Component Architecture (C4 Level 3)

```
┌──────────────────────────────────────────────────┐
│              App Layout (Root)                    │
│  • Sidebar Nav (global)                          │
│  • Main Content Area                             │
└──────────────────────────────────────────────────┘
                      │
        ┌─────────────┴──────────────┐
        ▼                            ▼
┌────────────────────┐    ┌────────────────────┐
│  Projects List     │    │  Project Detail    │
│  (Route: /)        │    │  (Route: /[id])    │
│                    │    │                    │
│  • Project Cards   │    │  • Context Section │
│  • Phase Filters   │    │  • Deliverable     │
│                    │    │    Cards           │
└────────────────────┘    └────────────────────┘
        │                            │
        └──────────┬─────────────────┘
                   ▼
┌──────────────────────────────────────────────────┐
│          Shared UI Components                     │
│                                                   │
│  • Button         • Context Section              │
│  • Badge          • Tab Navigation               │
│  • Project Card   • Deliverable Card             │
└──────────────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│          Design System (shadcn/ui)               │
│  • Accessible primitives (Radix UI)              │
│  • Tailwind CSS (design tokens)                  │
└──────────────────────────────────────────────────┘
```

---

## 12. Implementation Roadmap (Adjusted)

### Phase 1: Foundation (Weeks 1-2)
**Goal**: MVP with projects list and detail views

- Setup Next.js + Tailwind + shadcn/ui
- Convert design tokens to Tailwind config
- Implement routing (App Router)
- Build Sidebar Nav component
- Build Projects List view
- Build Project Detail view
- Load data from projects.json
- Basic responsive layout

**Milestone**: Can view all projects and click into detail

---

### Phase 2A: Core Components (Week 3)
**Goal**: Reusable component library

- Button component (primary/secondary variants)
- Project Card component
- Deliverable Card component
- Context Section component (collapsible)
- Status/Skill Badge component (merged)

**Milestone**: All visual components built and tested

---

### Phase 2B: Enhanced Content (Week 4)
**Goal**: Rich content display

- Tab Navigation component
- Visual Preview System (images, color palettes)
- Progressive Disclosure (show 3, expand all)
- Project Header component
- Metadata Display component
- Jump to Phase Navigation
- View File Action

**Milestone**: Full content display with interactions

---

### Phase 2C: Accessibility Foundation (Week 5)
**Goal**: WCAG AA compliance

- Keyboard navigation (full tab order)
- Focus states (all interactive elements)
- Screen reader support (ARIA labels, semantic HTML)
- Reduced motion support (prefers-reduced-motion)

**Milestone**: Passes aXe accessibility audit

---

### Phase 3: Responsive & States (Week 6)
**Goal**: Multi-device support and error handling

- Responsive layout (breakpoints 320/768/1024)
- Mobile Sidebar (hamburger menu)
- Loading states (skeleton screens)
- Empty states (no projects/deliverables)
- Error states (failed data loads)

**Milestone**: Works on all devices, handles edge cases

---

### Phase 4: Polish & Animation (Week 7)
**Goal**: Delightful interactions

- Hover states (card lift, button changes)
- Page transitions (fade in)
- Expand/collapse animations
- Final performance optimization
- Cross-browser testing

**Milestone**: Production-ready, polished experience

---

## 13. Success Criteria

### Functional Requirements
- ✅ View all design projects in a grid
- ✅ Click into project to see detail view
- ✅ View design principles and key insights
- ✅ See all deliverables with visual previews
- ✅ Open deliverable files
- ✅ Filter projects by phase
- ✅ Navigate between projects
- ✅ Responsive on mobile/tablet/desktop

### Non-Functional Requirements
- ✅ Lighthouse score > 90
- ✅ First Contentful Paint < 1.5s
- ✅ Bundle size < 100KB (gzipped)
- ✅ WCAG 2.1 Level AA compliant
- ✅ Works in Chrome, Firefox, Safari (last 2 versions)
- ✅ No console errors or warnings

---

## 14. Final Recommendations

### Immediate Actions (Before Phase 1)

1. **✅ Clarify Data Strategy** (See Questions #1-4 above)
2. **✅ Decide on Tech Stack** (Next.js recommended, but Lit acceptable if committed)
3. **📋 Create Architecture Decision Record (ADR)** for tech stack choice
4. **📋 Define data schema** (projects.json structure)
5. **📋 Reorganize features** into 6 phases (as suggested above)

### During Development

6. **📋 Move accessibility to Phase 2C** (not Phase 4)
7. **📋 Add search feature** if needed (currently missing)
8. **📋 Implement performance monitoring** (Lighthouse CI)
9. **📋 Add error boundaries** (catch component failures)
10. **📋 Write unit tests** for components (Vitest or Jest)

### Post-Launch

11. **📋 Gather user feedback** (analytics, user interviews)
12. **📋 Monitor performance** (Core Web Vitals)
13. **📋 Plan v2 features** (search, tags, comments, collaboration)
14. **📋 Consider migration to database** if data grows > 100 projects

---

## Summary

**✅ Strengths:**
- Well-defined requirements and design spec
- Clear component structure
- Strong accessibility focus
- Logical feature breakdown

**⚠️ Concerns:**
- Tech stack choice (Vite + Lit less AI-friendly)
- Data management strategy unclear
- Phase 2 too large (split recommended)
- Accessibility pushed to Phase 4 (should be earlier)

**🚀 Recommendation:**
- **Strongly consider Next.js** for better AI development experience
- **Answer critical questions** before starting development
- **Reorganize phases** as suggested (6 phases instead of 4)
- **Move accessibility to Phase 2C** (not an afterthought)
- **Add search feature** if filtering beyond phases is needed

**Estimated Timeline:**
- 7 weeks to production-ready v1.0
- Additional 2-3 weeks for polish and testing
- Total: **9-10 weeks** for high-quality implementation

---

## References

- [Design Specification](outputs/design-dashboard/production/design-specification.md)
- [Feature Registry](design-dashboard-registry.csv)
- [Roadmap (Markdown)](roadmaps/design-dashboard-roadmap.md)
- [Roadmap (HTML)](roadmaps/design-dashboard-roadmap.html)
- [Roadmap (JSON)](roadmaps/design-dashboard-roadmap.json)

---

**Document Status**: Draft
**Next Review**: After critical questions answered
**Owner**: Design/Dev Team
