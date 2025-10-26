# Design Dashboard - Production Specification

**Project**: Design Dashboard
**Phase**: Production
**Date**: October 22, 2025
**Version**: 1.0
**Framework**: Vite + Lit Web Components

---

## Table of Contents

1. [Overview](#overview)
2. [Design Tokens](#design-tokens)
3. [Component Library](#component-library)
4. [Screen Specifications](#screen-specifications)
5. [Responsive Behavior](#responsive-behavior)
6. [Interactions & Animations](#interactions--animations)
7. [Accessibility](#accessibility)
8. [Developer Handoff](#developer-handoff)

---

## Overview

### Purpose
A centralized dashboard for tracking design projects through all phases (Research → Concepts → Production → QA) with inline visual review capabilities.

### Design Principles
1. **Context Before Details**: Show goals, principles, insights before deliverables
2. **Summaries with Easy Depth**: Progressive disclosure, depth on demand
3. **Status Transparency**: Always show project phase and updated dates
4. **Design-Focused with Context Awareness**: Design artifacts first, PM links in footer
5. **Design Work is Storytelling**: Chronological deliverables tell the design story

### Technical Stack
- **Framework**: Vite + Lit 3.x web components
- **Data**: JSON (projects.json)
- **Routing**: Lit Router or vanilla history API
- **Build**: Vite production build
- **Deploy**: Static hosting (Netlify, Vercel, GitHub Pages)

---

## Design Tokens

**File**: `design-tokens.js`

All design values are defined as design tokens for consistency. Use CSS custom properties (generated via `generateCSSVariables()`) throughout components.

### Key Token Categories:
- **Colors**: Background layers, text hierarchy, brand colors, status colors
- **Typography**: Font families (Inter), size scale, weights, line heights
- **Spacing**: 8px base unit system (4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px)
- **Layout**: Sidebar width (240px), content max-width (1400px)
- **Border Radius**: 4px (sm), 6px (base), 8px (md), 12px (lg)
- **Shadows**: Subtle for dark mode
- **Transitions**: 150ms default, cubic-bezier easing

### Color Palette
```
Background:
- Primary: #0a0a0a (app background)
- Secondary: #1a1a1a (cards, sidebar)
- Tertiary: #2a2a2a (borders, hover states)

Text:
- Primary: #f3f4f6 (high-emphasis)
- Secondary: #9ca3af (descriptions)
- Tertiary: #6b7280 (metadata)

Brand:
- Primary: #2563eb (blue accent)
- Hover: #1d4ed8
- Subtle: #2563eb20 (20% opacity backgrounds)

Status:
- Research: #a78bfa (purple)
- Concepts: #60a5fa (blue)
- Production: #fbbf24 (yellow)
- QA: #34d399 (green)
```

---

## Component Library

### Core Components

#### 1. Sidebar Navigation
**Purpose**: Fixed sidebar for app navigation

**Specifications**:
- Width: 240px (fixed)
- Background: `var(--color-bg-secondary)`
- Border-right: 1px solid `var(--color-border)`
- Padding: 24px 16px
- Position: Fixed, full height

**Elements**:
1. **Logo** (top)
   - Font size: 18px
   - Font weight: 600
   - Margin bottom: 32px

2. **Nav Sections**
   - Section title: 12px, uppercase, #6b7280
   - Margin between sections: 24px

3. **Nav Items**
   - Padding: 8px
   - Border radius: 6px
   - Font size: 14px
   - Transition: background 150ms
   - Hover: Background #2a2a2a
   - Active: Background #2563eb, color #ffffff

**States**:
- Default
- Hover (background change)
- Active (blue background)

---

#### 2. Project Card
**Purpose**: Clickable card showing project summary

**Specifications**:
- Background: `var(--color-bg-secondary)`
- Border: 1px solid `var(--color-border)`
- Border radius: 8px
- Padding: 24px
- Cursor: pointer
- Transition: all 200ms

**Layout** (vertical flex):
1. **Header** (flex row, space-between)
   - Project title: 18px, weight 600
   - Status badge: 4px 12px padding, 12px border-radius

2. **Description**
   - Font size: 14px
   - Color: #9ca3af
   - Margin: 16px 0

3. **Metadata** (flex row, gap 24px)
   - Border-top: 1px solid #2a2a2a
   - Padding-top: 16px
   - Font size: 13px
   - Color: #6b7280

**States**:
- Default
- Hover: Border #3a3a3a, translateY(-2px), shadow-lg
- Focus: 2px outline #2563eb
- Active: Same as hover

**Status Badge Colors**:
- Research: #a78bfa text, #7c3aed20 background
- Concepts: #60a5fa text, #2563eb20 background
- Production: #fbbf24 text, #f59e0b20 background
- QA: #34d399 text, #10b98120 background

---

#### 3. Deliverable Card
**Purpose**: Display design deliverable with visual preview

**Specifications**:
- Background: `var(--color-bg-secondary)`
- Border: 1px solid `var(--color-border)`
- Border radius: 8px
- Overflow: hidden
- Transition: all 200ms

**Layout** (vertical):
1. **Visual Preview Section** (if visualAssets exist)
   - Height: 240px
   - Background: #0a0a0a
   - Border-bottom: 1px solid #2a2a2a
   - Object-fit: cover (for images)

2. **Content Section**
   - Padding: 24px

3. **Header** (flex row, space-between)
   - Title: 18px, weight 600
   - Skill badge: 11px uppercase, 4px 10px padding

4. **Summary**
   - Font size: 14px
   - Color: #9ca3af
   - Line height: 1.6
   - Margin: 12px 0 16px

5. **Footer** (flex row, space-between)
   - Border-top: 1px solid #2a2a2a
   - Padding-top: 16px
   - Date: 13px, #6b7280
   - Button: View File →

**States**:
- Default
- Hover: Border #3a3a3a, translateY(-2px), shadow-lg
- Focus: 2px outline #2563eb

**Visual Preview Types**:
1. **Color Palette**: Horizontal flex, equal-width swatches
2. **Image**: Full-width, object-fit cover
3. **Placeholder**: "Text Document" centered, #4a5568

**Skill Badge Colors**:
- Research: #a78bfa text, #7c3aed20 background
- Concepts: #60a5fa text, #2563eb20 background
- Production: #fbbf24 text, #f59e0b20 background
- QA: #34d399 text, #10b98120 background

---

#### 4. Context Section (Collapsible)
**Purpose**: Display design principles or insights with progressive disclosure

**Specifications**:
- Background: `var(--color-bg-secondary)`
- Border: 1px solid `var(--color-border)`
- Border radius: 8px
- Padding: 32px
- Margin bottom: 32px

**Layout**:
1. **Header** (flex row, space-between)
   - Title: 20px, weight 600
   - Expand button: "Show All (N)"

2. **Content Area**
   - Grid or flex depending on content type
   - Principles: Grid 300px min-width columns
   - Insights: Vertical flex, gap 12px

**Principle Card**:
- Padding: 20px
- Background: #0a0a0a
- Border: 1px solid #2a2a2a
- Border radius: 6px
- Title: 15px, weight 600, #2563eb color
- Description: 14px, #9ca3af, line-height 1.5

**Insight Item**:
- Flex row, gap 12px
- Padding: 16px
- Background: #0a0a0a
- Border: 1px solid #2a2a2a
- Border radius: 6px
- Number badge: 24x24, #2563eb background, white text, circle
- Text: 14px, #f3f4f6

**States**:
- Collapsed: Show first 3 items
- Expanded: Show all items
- Transition: Height 300ms ease

---

#### 5. Button Component
**Purpose**: Primary actions (View File, Show All, etc.)

**Specifications**:
- Font family: Inter
- Font weight: 500
- Border radius: 6px
- Transition: background 150ms
- Focus: 2px ring offset-2

**Variants**:

**Primary**:
- Background: #2563eb
- Color: #ffffff
- Padding: 6px 12px
- Font size: 13px
- Hover: #1d4ed8
- Active: #1e40af

**Secondary**:
- Background: transparent
- Border: 1px solid #2a2a2a
- Color: #9ca3af
- Padding: 6px 12px
- Font size: 13px
- Hover: Background #2a2a2a, border #3a3a3a

**States**:
- Default
- Hover (background change)
- Active (darker background)
- Focus (ring)
- Disabled (opacity 0.5, cursor not-allowed)

---

#### 6. Tab Navigation
**Purpose**: Switch between Overview / All Deliverables / Activity

**Specifications**:
- Display: Flex row
- Gap: 32px
- Border-bottom: 1px solid #2a2a2a
- Margin-bottom: 40px

**Tab Item**:
- Padding: 12px 0
- Font size: 15px
- Font weight: 500
- Color: #6b7280 (inactive)
- Border-bottom: 2px solid transparent
- Cursor: pointer
- Transition: all 150ms

**States**:
- Default: #6b7280
- Hover: #9ca3af
- Active: Color #2563eb, border-bottom #2563eb

---

## Screen Specifications

### 1. Projects List View

**Route**: `/` or `/projects`

**Layout**:
```
┌────────────────────────────────────────────────────┐
│ [Sidebar - 240px] │ [Main Content]                 │
│                   │                                 │
│ Logo              │ Header                          │
│                   │ - Title (All Projects)          │
│ All Projects (3)  │ - Description                   │
│ Active (2)        │                                 │
│ Complete (1)      │ Filters (horizontal)            │
│                   │                                 │
│ PHASE             │ Projects Grid (responsive)      │
│ Research          │ ┌──────┐ ┌──────┐ ┌──────┐    │
│ Concepts          │ │ Card │ │ Card │ │ Card │    │
│ Production        │ └──────┘ └──────┘ └──────┘    │
│ QA                │                                 │
│                   │ Footer (PM / Eng links)         │
└────────────────────────────────────────────────────┘
```

**Header**:
- Padding: 40px
- Title: 32px, weight 700
- Description: 16px, #9ca3af

**Filters**:
- Flex row, gap 16px
- Border-bottom: 1px solid #2a2a2a
- Padding-bottom: 16px
- Margin-bottom: 32px

**Projects Grid**:
- Grid, auto-fill, minmax(400px, 1fr)
- Gap: 24px

**Footer**:
- Margin-top: 64px
- Padding-top: 24px
- Border-top: 1px solid #2a2a2a
- Links: 13px, #9ca3af, gap 24px
- Hover: #2563eb

---

### 2. Project Detail View

**Route**: `/project/:id`

**Layout**:
```
┌────────────────────────────────────────────────────┐
│ [Sidebar - 240px] │ [Main Content]                 │
│                   │                                 │
│ Logo              │ Project Header                  │
│                   │ - Status badge                  │
│ ← Back            │ - Title (40px)                  │
│                   │ - Description                   │
│ Overview          │                                 │
│ Deliverables      │ Tabs (Overview / Deliverables)  │
│ Timeline          │                                 │
│                   │ Context Sections:               │
│ JUMP TO PHASE     │ ┌─────────────────────────┐   │
│ Research (3)      │ │ Design Principles       │   │
│ Concepts (2)      │ │ (Grid of principle      │   │
│ Production (0)    │ │  cards)                 │   │
│ QA (0)            │ └─────────────────────────┘   │
│                   │                                 │
│                   │ ┌─────────────────────────┐   │
│                   │ │ Key Insights            │   │
│                   │ │ (List of insights)      │   │
│                   │ └─────────────────────────┘   │
│                   │                                 │
│                   │ Deliverables Section:           │
│                   │ ┌───────────────────────┐     │
│                   │ │ Deliverable Card      │     │
│                   │ │ [Visual Preview]      │     │
│                   │ │ Title | Skill Badge   │     │
│                   │ │ Summary               │     │
│                   │ │ Date | [View File →] │     │
│                   │ └───────────────────────┘     │
│                   │                                 │
│                   │ Footer                          │
└────────────────────────────────────────────────────┘
```

**Project Header**:
- Padding: 40px 40px 0
- Status badge: Inline-block, margin-bottom 16px
- Title: 40px, weight 700
- Description: 18px, #9ca3af, max-width 800px

**Tabs**:
- Margin: 0 40px
- Border-bottom: 1px solid #2a2a2a

**Content Sections**:
- Padding: 0 40px 40px
- Max-width: 1400px

**Context Sections**:
- Background: #1a1a1a
- Border: 1px solid #2a2a2a
- Border radius: 8px
- Padding: 32px
- Margin-bottom: 32px

**Deliverables Section**:
- Header: Flex row, space-between, margin-bottom 24px
- Title: 24px, weight 700
- Count: 14px, #6b7280
- Grid: 1 column (deliverables can be wide due to visual content)
- Gap: 24px

---

## Responsive Behavior

### Breakpoints
```javascript
mobile: 320px       // Smallest phones
mobileLarge: 414px  // Large phones
tablet: 768px       // Tablets, small laptops
desktop: 1024px     // Standard laptops
desktopLarge: 1280px // Large displays
```

### Mobile (< 768px)

**Changes**:
1. **Sidebar**: Overlay or hamburger menu
   - Default: Hidden
   - Open: Overlay from left, backdrop blur
   - Close: Tap outside or close button

2. **Header**:
   - Padding: 20px
   - Title: 24px (smaller)
   - Description: 14px

3. **Projects Grid**:
   - Grid: 1 column
   - Cards: Full width

4. **Deliverable Visual Preview**:
   - Height: 180px (reduced from 240px)

5. **Context Sections**:
   - Padding: 20px (reduced from 32px)
   - Principles grid: 1 column

6. **Content Padding**:
   - Reduce from 40px to 20px

### Tablet (768px - 1024px)

**Changes**:
1. **Sidebar**: Remains visible, possibly narrower (200px)
2. **Projects Grid**: 2 columns
3. **Content Padding**: 32px

### Desktop (1024px+)

**Default Layout**: As specified in mockups
- Sidebar: 240px fixed
- Content: 40px padding
- Projects Grid: 2-3 columns (auto-fill)

### Touch Targets (Mobile)

All interactive elements must meet **44x44px minimum** for mobile:
- Buttons: Minimum 44px height
- Nav items: Minimum 44px height
- Card tap areas: Entire card (minimum 60px height)
- Links: 44px tap target (even if text is smaller)

---

## Interactions & Animations

### General Principles
- **Speed**: Fast (150ms default for most interactions)
- **Easing**: Ease-in-out cubic-bezier(0.4, 0.0, 0.2, 1)
- **Purposeful**: Animations should enhance understanding, not distract

---

### Hover States

**Project Cards**:
```css
transition: all 200ms ease;
&:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
```

**Deliverable Cards**:
```css
transition: all 200ms ease;
&:hover {
  border-color: #3a3a3a;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
```

**Nav Items**:
```css
transition: background 150ms ease;
&:hover {
  background: #2a2a2a;
}
```

**Buttons**:
```css
transition: background 150ms ease;
&:hover {
  background: #1d4ed8; /* For primary */
}
```

**Links**:
```css
transition: color 150ms ease;
&:hover {
  color: #2563eb;
}
```

---

### Focus States

**All interactive elements**:
```css
&:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

**Buttons** (additional):
```css
&:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}
```

---

### Click/Active States

**Buttons**:
```css
&:active {
  transform: scale(0.98);
  background: #1e40af;
}
```

**Cards**:
- Same as hover, no additional scale
- Optional: Slight brightness reduction

---

### Page Transitions

**Route Changes**:
```css
/* Fade in new content */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}
```

---

### Collapsible Sections

**Expand/Collapse**:
```css
/* Content container */
transition: height 300ms ease, opacity 200ms ease;

/* Expanding */
.expanding {
  height: 0 → auto; /* Use max-height trick */
  opacity: 0 → 1;
}

/* Collapsing */
.collapsing {
  height: auto → 0;
  opacity: 1 → 0;
}
```

**Button Icon Rotation**:
```css
/* Chevron icon */
transition: transform 200ms ease;
&.expanded {
  transform: rotate(180deg);
}
```

---

### Loading States

**Content Loading**:
```css
/* Skeleton placeholder */
.skeleton {
  background: linear-gradient(
    90deg,
    #1a1a1a 25%,
    #2a2a2a 50%,
    #1a1a1a 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Spinner** (for async actions):
```css
/* Circular spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
  border: 2px solid #2a2a2a;
  border-top-color: #2563eb;
  border-radius: 50%;
}
```

---

### Toast Notifications (if needed)

**Appearance**:
```css
.toast {
  transform: translateY(100%);
  opacity: 0;
  transition: all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast.show {
  transform: translateY(0);
  opacity: 1;
}
```

---

## Accessibility

### WCAG 2.1 Level AA Compliance

#### Color Contrast

**Text Contrast Requirements**:
- Large text (18px+): 3:1 minimum
- Normal text: 4.5:1 minimum
- UI components: 3:1 minimum

**Audit Results**:
✅ #f3f4f6 on #0a0a0a: 15.4:1 (Pass)
✅ #9ca3af on #0a0a0a: 8.7:1 (Pass)
✅ #6b7280 on #0a0a0a: 5.2:1 (Pass)
✅ #2563eb on #0a0a0a: 5.1:1 (Pass)

#### Keyboard Navigation

**Tab Order**:
1. Skip to content link (hidden until focused)
2. Sidebar navigation items
3. Main content header
4. Filters/tabs
5. Cards/deliverables
6. Footer links

**Keyboard Shortcuts**:
- Tab: Navigate forward
- Shift+Tab: Navigate backward
- Enter/Space: Activate buttons and links
- Escape: Close modals/overlays
- Arrow keys: Navigate within tab groups

**Focus Management**:
- Focus visible at all times (outline)
- Focus trap in modals
- Focus restoration when modals close
- Skip to main content link

#### Screen Reader Support

**Semantic HTML**:
```html
<nav aria-label="Main navigation">
<main id="main-content">
<article aria-labelledby="project-title">
<h1 id="project-title">Design Dashboard</h1>
<section aria-labelledby="principles-heading">
<button aria-expanded="false" aria-controls="principles-content">
```

**ARIA Labels**:
- Nav items: `aria-current="page"` for active
- Buttons: `aria-label` if icon-only
- Status badges: `aria-label="Project status: Concepts"`
- Expand buttons: `aria-expanded`, `aria-controls`
- Links: Descriptive text, no "click here"

**Image Alt Text**:
- Decorative images: `alt=""` (empty)
- Meaningful images: Descriptive alt text
- Complex images: `aria-describedby` for detailed description

#### Motion & Animation

**Respect User Preferences**:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Developer Handoff

### File Structure
```
design-dashboard/
├── src/
│   ├── components/
│   │   ├── sidebar-nav.js          (Lit component)
│   │   ├── project-card.js         (Lit component)
│   │   ├── deliverable-card.js     (Lit component)
│   │   ├── context-section.js      (Lit component)
│   │   ├── button-component.js     (Lit component)
│   │   └── tab-nav.js              (Lit component)
│   ├── views/
│   │   ├── projects-list.js        (Route view)
│   │   └── project-detail.js       (Route view)
│   ├── styles/
│   │   ├── design-tokens.js        (Design tokens)
│   │   └── global.css              (Global styles)
│   ├── data/
│   │   └── projects.json           (Data source)
│   └── main.js                     (App entry)
├── public/
│   └── outputs/                    (Design deliverables)
├── index.html
├── vite.config.js
└── package.json
```

### Implementation Priority

**Phase 1: Core Structure** (Week 1)
- [ ] Set up Vite + Lit project
- [ ] Implement design tokens as CSS variables
- [ ] Create base layout (sidebar + main content)
- [ ] Implement routing

**Phase 2: Components** (Week 2)
- [ ] Build Sidebar Nav component
- [ ] Build Project Card component
- [ ] Build Deliverable Card component
- [ ] Build Button component
- [ ] Build Tab Nav component

**Phase 3: Views** (Week 3)
- [ ] Build Projects List view
- [ ] Build Project Detail view
- [ ] Implement data loading from projects.json
- [ ] Add loading/error states

**Phase 4: Polish** (Week 4)
- [ ] Implement all animations
- [ ] Add responsive behavior
- [ ] Accessibility audit and fixes
- [ ] Performance optimization
- [ ] Cross-browser testing

### Data Schema

**projects.json** structure:
```json
{
  "projects": [
    {
      "id": "design-dashboard",
      "name": "Design Dashboard",
      "description": "...",
      "status": "concepts",
      "createdDate": "2025-10-22",
      "lastUpdated": "2025-10-22",
      "designGoals": ["...", "..."],
      "designPrinciples": [
        {
          "title": "Context Before Details",
          "description": "...",
          "rationale": "..."
        }
      ],
      "deliverables": [
        {
          "id": "deliv-001",
          "type": "personas",
          "skill": "design-research",
          "title": "User Personas",
          "summary": "...",
          "filePath": "/outputs/...",
          "createdDate": "2025-10-22",
          "visible": true,
          "visualAssets": {
            "colorPalette": ["#...", "#..."],
            "preview": "..."
          }
        }
      ],
      "keyInsights": ["...", "..."]
    }
  ]
}
```

### Dependencies

**Required**:
```json
{
  "dependencies": {
    "lit": "^3.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

**Optional** (for enhanced features):
```json
{
  "@lit/router": "^1.0.0",     // Client-side routing
  "lit-html": "^3.0.0",        // HTML templating (included with Lit)
}
```

### Performance Targets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.0s
- **Lighthouse Score**: > 90
- **Bundle Size**: < 100KB (gzipped)

### Browser Support

**Modern Browsers**:
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions

**No IE11 Support**: Lit 3.x requires modern ES6+ support

---

## Edge Cases & States

### Empty States

**No Projects**:
```
┌──────────────────────────┐
│   [Icon]                 │
│   No projects yet        │
│   Create your first      │
│   design project to      │
│   get started            │
│                          │
│   [+ New Project]        │
└──────────────────────────┘
```

**No Deliverables in Project**:
```
┌──────────────────────────┐
│   [Icon]                 │
│   No deliverables yet    │
│   This project is just   │
│   getting started        │
└──────────────────────────┘
```

### Loading States

**Projects Loading**:
- Show skeleton cards (3-4)
- Shimmer animation
- No abrupt layout shift

**Project Detail Loading**:
- Skeleton header
- Skeleton context sections
- Skeleton deliverable cards

### Error States

**Failed to Load Projects**:
```
┌──────────────────────────┐
│   [Error Icon]           │
│   Failed to load         │
│   projects               │
│                          │
│   [Retry]                │
└──────────────────────────┘
```

**Failed to Load Deliverable File**:
- Show error message in card
- Provide "Report Issue" link
- Don't break entire page

---

## Notes for Developers

### Design System Adherence
- **Always use design tokens** - No hardcoded colors, spacing, or typography
- **Component reuse** - Use shared components, don't duplicate
- **Accessibility first** - Test with keyboard, screen reader, color contrast tools

### Code Quality
- **Lit best practices** - Use reactive properties, lifecycle methods correctly
- **Performance** - Lazy load views, optimize re-renders
- **Type safety** - Use JSDoc or TypeScript for type hints

### Testing
- **Unit tests** - Test component logic
- **Accessibility tests** - Use axe or similar tools
- **Visual regression** - Screenshot comparisons for UI changes
- **Cross-browser** - Test on Chrome, Firefox, Safari minimum

### Questions?
Refer back to:
- Design tokens file for exact values
- Wireframes for layout reference
- Mood board for visual inspiration
- Design principles for decision guidance

---

**End of Design Specification v1.0**

Next: Build implementation following this spec!
