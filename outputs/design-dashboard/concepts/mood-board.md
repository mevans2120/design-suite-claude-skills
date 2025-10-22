# Design Dashboard - Mood Board & Visual Direction

**Project**: Design Dashboard
**Date**: October 22, 2025
**Skill**: design-concepts
**Fidelity**: Mood board / Visual direction

---

## Executive Summary

Visual direction for a clean, modern design dashboard focused on **clarity, scanability, and visual review**. Drawing inspiration from Linear's speed and clarity, Notion's flexible organization, and Storybook's component documentation approach.

**Key Visual Themes**:
- Professional but approachable
- Content-first (design work is the star)
- Fast and lightweight
- Desktop-optimized with clear hierarchy

---

## Color Palette

### Primary Palette

**Neutrals** (Foundation)
- `#0a0a0a` - Rich black (backgrounds, high-contrast text)
- `#1a1a1a` - Dark gray (cards, elevated surfaces)
- `#2a2a2a` - Medium dark (borders, dividers)
- `#4a4a4a` - Medium gray (secondary text, icons)
- `#9ca3af` - Light gray (tertiary text, subtle elements)
- `#f3f4f6` - Off-white (light mode backgrounds)
- `#ffffff` - Pure white (text on dark, light mode surfaces)

**Brand Accent**
- `#2563eb` - Primary blue (links, CTAs, active states)
- `#1d4ed8` - Darker blue (hover states)
- `#3b82f6` - Lighter blue (focus rings, highlights)

**Status Colors**
- `#10b981` - Success green (complete, shipped)
- `#f59e0b` - Warning amber (in-progress, review needed)
- `#ef4444` - Error red (blocked, critical issues)
- `#8b5cf6` - Info purple (concepts, ideation)

### Rationale

**Dark Mode First**: Design work shows best on dark backgrounds (reduces eye strain, focuses attention on content). Light mode available but dark is default.

**Muted Palette**: Neutral grays let design work (colorful mockups, vibrant mood boards) stand out. Dashboard chrome recedes.

**Blue Accent**: Professional, trustworthy, not overwhelming. Used sparingly for interactive elements.

**Status Colors**: Industry-standard meanings (green=good, red=bad, amber=caution) for instant recognition.

---

## Typography

### Font Stack

**Primary**: `Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Why Inter**: Clean, highly readable, excellent at small sizes, open source
- System fallbacks ensure fast loading and native feel

**Monospace** (for code, IDs, technical details): `'Monaco', 'Courier New', monospace`

### Type Scale

```
Display (48px / 3rem)     - Project hero, dashboard title
H1 (32px / 2rem)          - Page titles
H2 (24px / 1.5rem)        - Section headers
H3 (18px / 1.125rem)      - Subsection headers, card titles
Body (16px / 1rem)        - Primary content, summaries
Small (14px / 0.875rem)   - Metadata, captions, secondary info
Tiny (12px / 0.75rem)     - Labels, tags, timestamps
```

### Hierarchy Rules

- **Line height**: 1.5 for body text, 1.2 for headings
- **Font weight**: 600 (semibold) for headings, 400 (regular) for body, 500 (medium) for emphasis
- **Letter spacing**: Tight (-0.01em) for large headings, normal for body
- **Contrast**: WCAG AA minimum (4.5:1 for body, 3:1 for large text)

---

## Layout & Spacing

### Grid System

**Desktop (1440px+)**:
- Main container: `max-width: 1400px`
- Sidebar: `280px` fixed
- Content: `flex-grow` (responsive)
- Gutter: `24px`

**Spacing Scale** (Tailwind-inspired):
```
4px   (0.25rem)  - Tiny gaps
8px   (0.5rem)   - Compact spacing
12px  (0.75rem)  - Cozy elements
16px  (1rem)     - Base unit
24px  (1.5rem)   - Section spacing
32px  (2rem)     - Major sections
48px  (3rem)     - Page margins
64px  (4rem)     - Hero spacing
```

### Card Design

**Deliverable Cards**:
- Background: `#1a1a1a` (dark) or `#ffffff` (light)
- Border: `1px solid #2a2a2a`
- Border radius: `8px` (subtle rounding)
- Padding: `20px`
- Shadow: Subtle on hover (`0 4px 12px rgba(0,0,0,0.1)`)
- Transition: `150ms ease-out` (fast, responsive)

**Interaction States**:
- Default: Flat, minimal shadow
- Hover: Slight elevation, border brightens
- Active/Selected: Blue border or background tint
- Focus: Blue outline ring for accessibility

---

## Visual Reference & Inspiration

### Similar Tools Analysis

**Linear** (https://linear.app)
- ✅ **Speed & Performance**: Instant load, smooth animations
- ✅ **Typography**: Clear hierarchy, excellent readability
- ✅ **Dark Mode**: Best-in-class dark mode design
- ✅ **Keyboard-first**: Fast navigation without mouse
- 🔄 **Adapt**: Maintain speed/clarity, tone down complexity

**Notion** (https://notion.so)
- ✅ **Flexible Organization**: Nested content, collapsible sections
- ✅ **Content Blocks**: Modular, composable UI
- ✅ **Progressive Disclosure**: Show details on demand
- 🔄 **Adapt**: Use block-based deliverable cards, avoid feature bloat

**Storybook** (https://storybook.js.org)
- ✅ **Component Documentation**: Clear specs with visual examples
- ✅ **Sidebar Navigation**: Easy project/component switching
- ✅ **Code + Visual**: Shows both design and implementation
- 🔄 **Adapt**: Sidebar for projects, main area for visual review

**Figma** (https://figma.com)
- ✅ **Design-First**: Visual content is primary, not secondary
- ✅ **Collaborative**: Multiple viewers, clear ownership
- ✅ **Version History**: Track design evolution
- 🔄 **Adapt**: Emphasize visuals, plan for version history in Phase 2

### UI Patterns to Use

**Card-based layouts** (Notion, Linear)
- Scannable at a glance
- Group related information
- Easy to add/remove/reorder

**Collapsible sections** (Notion, GitHub)
- Progressive disclosure
- Reduce cognitive load
- Let users control information density

**Status indicators** (Linear, Jira)
- Color-coded dots/badges
- Instant visual feedback
- Consistent across dashboard

**Empty states** (Linear, Stripe)
- Guide users to action
- Friendly, helpful tone
- Visual illustration + clear CTA

---

## Visual Design Principles Application

### 1. Context Before Details
**Visual Implementation**:
- Project header always visible (sticky)
- Design goals and principles above deliverables
- Status badges prominent
- Visual hierarchy guides eye: Goals → Principles → Insights → Deliverables

### 2. Summaries with Easy Depth
**Visual Implementation**:
- Cards show key info at a glance
- Visual previews (thumbnails, color swatches) communicate instantly
- "View Full" always visible but not intrusive
- Expand/collapse for optional detail

### 3. Status Transparency
**Visual Implementation**:
- Large status badge (Research/Concepts/Production/QA/Complete)
- Color-coded for instant recognition
- "Last updated: 2 days ago" always visible
- Phase progress indicator (1 → 2 → 3 → 4)

### 4. Design-Focused with Context Awareness
**Visual Implementation**:
- Design deliverables dominate screen real estate
- PM link subtle (footer or top nav, small)
- Visual content large and prominent
- No PM features competing for attention

### 5. Design Work is Storytelling
**Visual Implementation**:
- Deliverables grouped by phase with clear labels
- Visual flow indicator (Research → Concepts → Production → QA)
- Timeline view showing progression
- Breadcrumbs or phase nav for easy jumping

---

## Component Mood Board

### Navigation
```
┌─────────────────────────────────────┐
│ DESIGN DASHBOARD                    │  ← Simple wordmark
│ ─────────────────────────────────   │
│ 🟢 Active (3)                       │  ← Collapsible groups
│   › Checkout Redesign               │  ← Hover reveals metadata
│   › Onboarding Flow                 │
│ ⚪ Complete (8) [Show]              │  ← Collapsed by default
└─────────────────────────────────────┘
```

### Project Card
```
┌─────────────────────────────────────────┐
│ Checkout Redesign         🟡 Production │  ← Status badge
│ ─────────────────────────────────────   │
│ Streamline checkout to reduce cart...   │  ← Brief description
│ 12 deliverables  •  Updated 2d ago      │  ← Metadata
│                          [View Project →]│  ← Clear CTA
└─────────────────────────────────────────┘
```

### Deliverable Card with Visual
```
┌──────────────────────────────────────────┐
│ 🎨 Mood Board            Oct 22, 2025   │  ← Icon + date
│ ──────────────────────────────────────  │
│ ┌────────────────────────────────────┐  │
│ │ [Color swatches] [Visual ref imgs] │  │  ← Visual preview
│ └────────────────────────────────────┘  │
│ Clean, modern aesthetic with muted       │  ← Text summary
│ palette and clear hierarchy              │
│ design-concepts          [View Full →]  │  ← Source + CTA
└──────────────────────────────────────────┘
```

---

## Interaction & Animation

**Micro-interactions**:
- Hover: Subtle elevation (2→4px shadow), border color shift
- Click: Brief "active" state (pressed appearance)
- Loading: Skeleton screens (avoid spinners)
- Success: Subtle checkmark animation
- Error: Shake + red border

**Page Transitions**:
- Instant (<50ms) for snappy feel
- No page reloads (SPA behavior)
- Preserve scroll position when navigating back
- Breadcrumb or back button always visible

**Performance Budget**:
- First paint: <500ms
- Interactive: <1s
- Smooth scrolling: 60fps
- Image lazy loading with fade-in

---

## Accessibility

**WCAG AA Compliance** (minimum):
- Color contrast: 4.5:1 for body text, 3:1 for large text
- Focus indicators: Visible 2px blue outline on all interactive elements
- Keyboard navigation: Full support (Tab, Enter, Escape, Arrow keys)
- Screen reader: Semantic HTML, ARIA labels where needed
- Motion: Respect `prefers-reduced-motion`

**Dark Mode Contrast**:
- White text on dark: 15:1 contrast
- Gray text on dark: 7:1 contrast
- Blue accent on dark: 8:1 contrast

---

## Next Steps

This mood board establishes visual direction. Next:

1. **✅ Wireframes**: Create lo-fi wireframes for key views (projects list, project detail)
2. **Concept Mockups**: Higher-fidelity mockups showing color, typography, spacing
3. **Interactive Prototype**: Clickable prototype for key user flows
4. **Visual Asset Creation**: Screenshots of referenced tools, color palette swatches, typography samples

**Decision Point**: Validate this visual direction before proceeding to high-fidelity mockups. Does the team agree with:
- Dark mode first approach?
- Muted neutral palette?
- Linear/Notion-inspired aesthetic?
- Card-based layout?

---

**Visual References**:
- Linear: Clean, fast, dark mode excellence
- Notion: Flexible organization, progressive disclosure
- Storybook: Component documentation, sidebar pattern
- Figma: Design-first, visual prominence

**This mood board will evolve** as we create wireframes and mockups. Think of it as a starting point, not a final specification.
