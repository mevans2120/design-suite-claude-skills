# Next.js Migration Summary

**Quick Reference Guide**

---

## Overview

**What**: Migrate Design Dashboard from Vite + Lit to Next.js + React
**Why**: Better file management, improved DX, future-ready architecture
**When**: 5-week timeline (Weeks 1-5)
**Risk**: Medium (mitigated by parallel development)

---

## Key Benefits

1. **Eliminates File Hacks**: Move deliverables into app, no more `fs.allow`
2. **Better DX**: TypeScript, hot reload, React ecosystem, AI assistance
3. **Future-Ready**: Easy path to auth, API routes, database
4. **Component Library**: Access to shadcn/ui, Radix UI
5. **File Management**: Foundation for web-based uploads (Phase 2)

---

## Migration Approach

**Strategy**: Parallel development with cutover

```
Current:  dashboard/ (Vite + Lit)  ← Keep running
New:      dashboard-next/ (Next.js) ← Build here
Cutover:  Rename directories when ready
```

**No user disruption** - old version runs until new version is ready

---

## 5-Week Timeline

### Week 1: Foundation
- Initialize Next.js project
- Migrate design tokens to Tailwind
- Move files to `/public/deliverables/`
- Set up TypeScript types
- Create data loading utilities

### Week 2: Components
- Migrate all Lit components to React
- Install shadcn/ui components
- Match visual design
- Implement Tailwind styling

### Week 3: Views & Routing
- Build Projects List page
- Build Project Detail page
- Implement file viewer modal
- Add loading/error states

### Week 4: Polish
- Add markdown rendering
- Responsive design
- Accessibility improvements
- Performance optimization

### Week 5: Testing & Deploy
- Comprehensive testing
- Build production bundle
- Deploy to hosting
- Cutover from Vite version

---

## Critical Changes

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

**All paths in `projects.json` need updating** (automated script provided)

### Tech Stack

| Before | After |
|--------|-------|
| Vite 5.x | Next.js 14+ |
| Lit 3.x | React 18+ |
| CSS-in-JS | Tailwind CSS |
| Manual routing | File-based routing |
| No types | TypeScript |

---

## Component Migration

All 4 Lit components migrate to React:

| Lit Component | React Component | Type |
|---------------|----------------|------|
| `sidebar-nav.js` | `sidebar-nav.tsx` | Client |
| `project-card.js` | `project-card.tsx` | Server |
| `deliverable-card.js` | `deliverable-card.tsx` | Client |
| `context-section.js` | `context-section.tsx` | Client |

**Plus 2 new views**:
- `app/page.tsx` - Projects List (Server Component)
- `app/project/[id]/page.tsx` - Project Detail (Server Component)

---

## Skill Integration Updates

Design skills need minor path updates:

**Before**:
```python
# Write to:
outputs/design-dashboard/research/personas.md

# Update:
dashboard/src/data/projects.json
```

**After**:
```python
# Write to:
dashboard/public/deliverables/research/personas.md

# Update:
dashboard/public/data/projects.json
```

**Helper script provided** at `dashboard/scripts/add-deliverable.js`

---

## Testing Checklist

### Functional
- [ ] All routes work
- [ ] Projects display
- [ ] Deliverables display
- [ ] File viewer opens
- [ ] Markdown renders
- [ ] HTML in iframe

### Responsive
- [ ] Mobile (375px)
- [ ] Tablet (768px)
- [ ] Desktop (1440px)

### Accessibility
- [ ] Keyboard navigation
- [ ] Screen reader
- [ ] Color contrast
- [ ] Focus indicators

### Performance
- [ ] Lighthouse > 90
- [ ] FCP < 1.5s
- [ ] TTI < 3s
- [ ] Bundle < 150KB

---

## Deployment

### Static Export (Phase 1)

```bash
# Build
npm run build

# Output: /out directory (static files)

# Deploy to:
# - Vercel
# - Netlify
# - GitHub Pages
# - Any static host
```

### Configuration

```javascript
// next.config.js
module.exports = {
  output: 'export',  // Static export
  images: {
    unoptimized: true  // Required for static
  }
};
```

---

## Rollback Plan

If migration fails:

```bash
# Restore Vite version
mv dashboard dashboard-next-failed
mv dashboard-vite-backup dashboard

# Restore old files
mv outputs/design-dashboard-archived outputs/design-dashboard

# Restart Vite
cd dashboard && npm run dev
```

**Low risk** - Parallel development allows easy rollback

---

## Success Criteria

**Must Have**:
- ✅ All components migrated and functional
- ✅ Visual design matches Vite version
- ✅ All deliverables accessible
- ✅ No file path hacks needed
- ✅ TypeScript compiles without errors
- ✅ Production build succeeds

**Should Have**:
- ✅ Lighthouse score > 90
- ✅ Mobile responsive
- ✅ Accessible (WCAG AA)
- ✅ Loading/error states
- ✅ Markdown rendering

**Nice to Have**:
- ✅ Bundle < 150KB
- ✅ Animation polish
- ✅ Keyboard shortcuts

---

## Next Steps

1. **Review full plan**: `/docs/architecture/NEXTJS-MIGRATION-PLAN.md`
2. **Approve approach**: Confirm parallel development strategy
3. **Start Week 1**: Initialize Next.js project
4. **Track progress**: Weekly milestone reviews
5. **Test thoroughly**: Each phase before proceeding
6. **Deploy**: Week 5 after comprehensive testing

---

## Quick Commands

```bash
# Initialize (Week 1)
npx create-next-app@latest dashboard-next --typescript --tailwind --app

# Install shadcn/ui (Week 2)
npx shadcn-ui@latest init

# Build (Week 5)
npm run build

# Deploy to Vercel (Week 5)
vercel --prod
```

---

## Resources

**Full Plan**: `/docs/architecture/NEXTJS-MIGRATION-PLAN.md`
**ADR**: `/docs/architecture/ADR-001-nextjs-tech-stack.md`
**Current Spec**: `/outputs/design-dashboard/production/design-specification.md`

**Next.js Docs**: https://nextjs.org/docs
**shadcn/ui**: https://ui.shadcn.com
**Tailwind**: https://tailwindcss.com

---

## Questions?

Refer to:
- Full migration plan for detailed implementation steps
- ADR-001 for technology decision rationale
- Design specification for component details
- Component implementation guide for code examples

**Migration Champion**: Available for questions throughout 5-week process

---

**Ready to begin?** Start with Phase 1 in the full migration plan! 🚀
