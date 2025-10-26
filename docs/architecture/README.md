# Architecture Documentation

Central hub for Design Dashboard architecture decisions and migration planning.

---

## Quick Navigation

### Current Documentation

1. **[ADR-001: Next.js Tech Stack Decision](/Users/michaelevans/design-suite-claude-skills/docs/architecture/ADR-001-nextjs-tech-stack.md)**
   - Why we chose Next.js over Vite + Lit
   - Technology evaluation and scoring
   - Trade-offs and decision rationale
   - **Status**: Accepted (2025-10-23)

2. **[Next.js Migration Plan](/Users/michaelevans/design-suite-claude-skills/docs/architecture/NEXTJS-MIGRATION-PLAN.md)**
   - Comprehensive 50+ page migration guide
   - 5-week phased implementation plan
   - Component conversion strategies
   - File management system design
   - Risk assessment and mitigation
   - **Status**: Planning

3. **[Migration Summary](/Users/michaelevans/design-suite-claude-skills/docs/architecture/MIGRATION-SUMMARY.md)**
   - Quick reference guide (2-3 pages)
   - Timeline overview
   - Key changes summary
   - Testing checklist
   - **Use this for**: Quick overview, stakeholder updates

4. **[Migration Architecture Diagrams](/Users/michaelevans/design-suite-claude-skills/docs/architecture/MIGRATION-ARCHITECTURE.md)**
   - Visual before/after comparisons
   - Component architecture diagrams
   - Data flow illustrations
   - Deployment architecture
   - **Use this for**: Understanding the big picture

---

## Current State Summary

### Technology Stack (Vite + Lit)
- **Build Tool**: Vite 5.x
- **Framework**: Lit 3.x web components
- **Routing**: Manual (vanilla history API)
- **Data**: Static JSON files
- **Styling**: CSS-in-JS (shadow DOM)

### Pain Points
1. Design files outside app root require `fs.allow` hack
2. Limited Lit ecosystem vs React
3. Less AI training data for development
4. Manual routing setup
5. No clear file management system

---

## Target State Summary

### Technology Stack (Next.js + React)
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI primitives)
- **Language**: TypeScript throughout
- **Deployment**: Static export (Vercel/Netlify)

### Benefits
1. All files in single directory tree
2. Extensive React ecosystem + AI assistance
3. Built-in routing, loading states, error handling
4. Type safety end-to-end
5. Foundation for web-based file management

---

## Migration Timeline

### 5-Week Plan

**Week 1: Foundation Setup**
- Initialize Next.js project
- Migrate design tokens to Tailwind
- Move files to `/public/deliverables/`
- Set up TypeScript types

**Week 2: Component Migration**
- Convert 4 Lit components to React
- Install shadcn/ui
- Match visual design with Tailwind

**Week 3: Views & Routing**
- Build Projects List page
- Build Project Detail page
- Implement file viewer modal
- Add loading/error states

**Week 4: File Management & Polish**
- Markdown rendering
- Responsive design
- Accessibility improvements
- Performance optimization

**Week 5: Testing & Deployment**
- Comprehensive testing (functional, responsive, a11y, performance)
- Production build
- Deploy to hosting
- Cutover from Vite version

### Risk Level: **Medium**
Mitigated by parallel development strategy (no user disruption).

---

## Key Architectural Changes

### File Structure

**Before**:
```
design-suite-claude-skills/
├── dashboard/           # Vite app
└── outputs/
    └── design-dashboard/  # Files OUTSIDE app ❌
```

**After**:
```
design-suite-claude-skills/
└── dashboard/           # Next.js app
    └── public/
        └── deliverables/  # Files INSIDE app ✅
```

### File Paths

**Before**: `/outputs/design-dashboard/research/personas.md`
**After**: `/deliverables/research/personas.md`

All paths in `projects.json` updated via automated script.

### Component Architecture

| Before | After |
|--------|-------|
| Lit web components | React + TypeScript |
| CSS-in-JS (shadow DOM) | Tailwind utility classes |
| Manual event dispatch | Callback props |
| No type checking | Full type safety |

### Routing

| Before | After |
|--------|-------|
| Manual `popstate` handling | File-based routing |
| Switch/case logic | `app/` directory structure |
| No loading states | Built-in `loading.tsx` |
| No error boundaries | Built-in `error.tsx` |

---

## Decision Rationale

### Why Next.js? (ADR-001)

**Scored 4.7 / 5.0** vs Vite+Lit (3.0) and Vite+React (3.8)

**Top Reasons**:
1. **AI Development Experience**: Claude has extensive Next.js training data
2. **Component Ecosystem**: shadcn/ui, Radix UI, thousands of React libraries
3. **TypeScript Support**: End-to-end type safety
4. **Built-in Features**: Routing, optimizations, API routes
5. **Future Extensibility**: Easy to add auth, database, server features

**Accepted Trade-offs**:
- Slightly larger bundle (~100KB vs 30KB for Lit)
- Framework-specific patterns (mitigated by React portability)

**Decision Date**: October 23, 2025

### Why Static Export (Phase 1)?

**Rationale**:
- No backend needed yet
- Simple deployment
- Fast hosting (CDN)
- Matches current architecture

**Future Path**:
- Phase 2+ can switch to server deployment
- Enable API routes, authentication
- Database integration straightforward

---

## Implementation Strategy

### Parallel Development

**Approach**: Build new version alongside existing Vite app

**Benefits**:
- ✅ No user disruption during development
- ✅ Thorough testing before cutover
- ✅ Easy rollback if issues arise
- ✅ Side-by-side comparison possible

**Process**:
1. Create `dashboard-next/` directory (Weeks 1-4)
2. Develop and test thoroughly (Weeks 1-5)
3. Cutover when ready (Week 5):
   ```bash
   mv dashboard dashboard-vite-backup
   mv dashboard-next dashboard
   ```
4. Archive old version for reference

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Component conversion errors | Incremental migration, visual comparison |
| Data incompatibility | TypeScript types enforce schema |
| File path breakage | Automated migration script |
| Performance regression | Lighthouse testing, monitoring |
| Deployment failures | Test static export locally first |
| User disruption | Parallel development, thorough testing |

---

## Success Criteria

### Technical
- ✅ All components migrated to React + TypeScript
- ✅ Visual design matches existing implementation
- ✅ All deliverables accessible without hacks
- ✅ TypeScript compiles without errors
- ✅ Lighthouse score > 90
- ✅ Bundle size < 150KB (gzipped)

### Functional
- ✅ All routes accessible
- ✅ Projects and deliverables display correctly
- ✅ File viewer works (markdown + HTML)
- ✅ Mobile navigation functional
- ✅ Keyboard navigation works

### Performance
- ✅ Page load < 2s
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ No console errors

### Accessibility
- ✅ WCAG AA compliant
- ✅ Keyboard accessible
- ✅ Screen reader compatible
- ✅ Color contrast passes

---

## Documentation Structure

```
docs/architecture/
├── README.md                      # This file (index)
├── ADR-001-nextjs-tech-stack.md  # Technology decision
├── NEXTJS-MIGRATION-PLAN.md      # Full implementation plan (50+ pages)
├── MIGRATION-SUMMARY.md          # Quick reference (2-3 pages)
└── MIGRATION-ARCHITECTURE.md     # Visual diagrams
```

### When to Use Each Document

**For a quick overview**:
→ Read `MIGRATION-SUMMARY.md` (5 min read)

**For implementation details**:
→ Read `NEXTJS-MIGRATION-PLAN.md` (comprehensive guide)

**For visual understanding**:
→ Read `MIGRATION-ARCHITECTURE.md` (diagrams)

**For decision rationale**:
→ Read `ADR-001-nextjs-tech-stack.md` (why Next.js)

**For stakeholder updates**:
→ Use `MIGRATION-SUMMARY.md` (executive-friendly)

---

## Getting Started

### Review Phase (Now)

1. **Read the summary**: Start with `MIGRATION-SUMMARY.md`
2. **Understand the decision**: Review `ADR-001-nextjs-tech-stack.md`
3. **Visualize the changes**: Browse `MIGRATION-ARCHITECTURE.md`
4. **Review the full plan**: Read `NEXTJS-MIGRATION-PLAN.md`
5. **Ask questions**: Clarify any concerns before starting

### Implementation Phase (Week 1 Start)

1. **Follow the plan**: Use `NEXTJS-MIGRATION-PLAN.md` as your guide
2. **Track progress**: Check off tasks weekly
3. **Test incrementally**: Verify each phase before proceeding
4. **Document learnings**: Update plan with discoveries
5. **Communicate status**: Share progress with stakeholders

### Testing Phase (Week 5)

1. **Run all tests**: Follow testing checklist in migration plan
2. **Performance audit**: Lighthouse, bundle size, load times
3. **Accessibility audit**: WCAG compliance, keyboard nav
4. **Cross-browser**: Chrome, Firefox, Safari, Edge
5. **User acceptance**: Internal team review

### Deployment Phase (Week 5 End)

1. **Build production**: `npm run build` in `dashboard-next/`
2. **Test locally**: Verify static export works
3. **Deploy to staging**: Test in production-like environment
4. **Final approval**: Stakeholder sign-off
5. **Cutover**: Rename directories, go live
6. **Monitor**: Watch for issues, ready to rollback if needed

---

## Related Documentation

### Design Documentation
- **Product Brief**: `/briefs/design-dashboard-brief.md`
- **Design Specification**: `/outputs/design-dashboard/production/design-specification.md`
- **Component Guide**: `/outputs/design-dashboard/production/component-implementation-guide.md`
- **Design Tokens**: `/outputs/design-dashboard/production/design-tokens.js`

### Research Deliverables
- **User Personas**: `/outputs/design-dashboard/research/personas.md`
- **Design Principles**: `/outputs/design-dashboard/research/design-principles.md`
- **Key Insights**: `/outputs/design-dashboard/research/key-insights.md`

### Concept Deliverables
- **Mood Board**: `/outputs/design-dashboard/concepts/mood-board.html`
- **Wireframes**: `/outputs/design-dashboard/concepts/wireframe-*.html`

---

## Questions & Decisions

### Open Questions

1. **Hosting Platform**: Vercel, Netlify, or GitHub Pages?
   - **Recommendation**: Vercel (optimal Next.js support)

2. **Environment Variables**: Any needed for Phase 1?
   - **Answer**: No, static data only

3. **Custom Domain**: Configure custom domain?
   - **Answer**: TBD based on deployment environment

4. **Analytics**: Add analytics tracking?
   - **Answer**: Phase 2 consideration

### Decided Questions

1. **Static vs Server Deployment**?
   - ✅ **Decision**: Static export for Phase 1
   - **Rationale**: Simple, fast, no backend needed yet

2. **TypeScript Throughout**?
   - ✅ **Decision**: Yes, full TypeScript
   - **Rationale**: Type safety, better DX, catches errors early

3. **Tailwind vs Styled Components**?
   - ✅ **Decision**: Tailwind CSS
   - **Rationale**: Better tree-shaking, utilities-first, consistent with shadcn/ui

4. **App Router vs Pages Router**?
   - ✅ **Decision**: App Router
   - **Rationale**: Modern, Server Components, future-proof

---

## Changelog

### October 25, 2025
- Created comprehensive migration plan
- Added visual architecture diagrams
- Created quick reference summary
- Documented decision rationale in ADR-001

### October 23, 2025
- ADR-001: Decided on Next.js + React tech stack
- Evaluated Vite+Lit, Next.js+React, Vite+React
- Scored Next.js highest (4.7/5.0)

### October 22, 2025
- Completed Phase 1 Vite + Lit implementation
- Identified file management pain points
- Documented need for architectural improvement

---

## Contributing

### Updating This Documentation

When making architectural decisions:

1. **Create ADR**: Follow ADR-001 template format
2. **Update plan**: Reflect changes in migration plan
3. **Update summary**: Keep quick reference current
4. **Update diagrams**: Visual consistency important
5. **Update this README**: Maintain index accuracy

### Proposing Changes

1. **Document rationale**: Explain why change is needed
2. **Assess impact**: How does it affect timeline/scope?
3. **Get approval**: Review with team before implementing
4. **Update docs**: Keep all documentation in sync

---

## Support & Resources

### Internal Resources
- Design Dashboard Team
- Architecture Review Board
- Development Team

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Learning Resources
- [Next.js App Router Tutorial](https://nextjs.org/learn)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app)
- [Tailwind UI Components](https://tailwindui.com)

---

## Next Steps

**For Decision Makers**:
1. Review ADR-001 for decision rationale
2. Review migration summary for timeline/scope
3. Approve approach and timeline
4. Allocate resources for 5-week implementation

**For Developers**:
1. Read full migration plan
2. Set up development environment
3. Begin Phase 1: Foundation setup
4. Follow week-by-week implementation guide

**For Stakeholders**:
1. Review migration summary
2. Understand benefits and timeline
3. Provide feedback on priorities
4. Schedule weekly progress reviews

---

**Ready to proceed?** Start with Week 1 in the [Migration Plan](/Users/michaelevans/design-suite-claude-skills/docs/architecture/NEXTJS-MIGRATION-PLAN.md)! 🚀

---

*Last Updated: October 25, 2025*
*Status: Planning Phase*
*Next Review: After Week 1 Completion*
