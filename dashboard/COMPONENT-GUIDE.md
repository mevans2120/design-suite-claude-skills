# Component Usage Guide

Quick reference for using the migrated React components in the Design Dashboard.

## Core Components

### StatusBadge

Display color-coded status badges for project phases.

```tsx
import { StatusBadge } from '@/components/status-badge';

<StatusBadge status="production" />
<StatusBadge status="research" className="ml-2" />
```

**Props:**
- `status`: `'research' | 'concepts' | 'production' | 'qa' | 'complete'`
- `className?`: Optional additional classes

**Colors:**
- Research: Purple
- Concepts: Blue
- Production: Yellow
- QA: Green
- Complete: Gray

---

### SidebarNav

Fixed sidebar navigation with project counts.

```tsx
import { SidebarNav } from '@/components/sidebar-nav';

const projectCounts = await getProjectCounts();

<SidebarNav
  projectCounts={projectCounts}
  showBackButton={false}
/>
```

**Props:**
- `projectCounts`: `Record<string, number>` - Object with project counts
- `showBackButton?`: `boolean` - Show "Back to Projects" link (default: false)

**Notes:**
- Client component (uses Next.js navigation hooks)
- Fixed width: 240px
- Automatically highlights active route

---

### ProjectCard

Interactive card displaying project overview.

```tsx
import { ProjectCard } from '@/components/project-card';

<ProjectCard project={project} />
```

**Props:**
- `project`: `Project` - Project object from data layer

**Features:**
- Click to navigate to detail page
- Keyboard accessible (Enter/Space)
- Hover effects
- Shows deliverable count and last updated date

---

### DeliverableCard

Card displaying deliverable with visual preview.

```tsx
import { DeliverableCard } from '@/components/deliverable-card';

<DeliverableCard deliverable={deliverable} />
```

**Props:**
- `deliverable`: `Deliverable` - Deliverable object from data layer

**Features:**
- Text preview (auto-loads for .md/.txt files)
- Color palette display
- Image preview support
- Skill badge
- "View File" button

**Preview Types:**
1. **Color Palette** - If `visualAssets.colorPalette` exists
2. **Image** - If `visualAssets.preview` exists
3. **Text** - Auto-loads for markdown/text files
4. **Placeholder** - Default fallback

---

### ContextSection

Collapsible section for principles or insights.

```tsx
import { ContextSection } from '@/components/context-section';

// For design principles
<ContextSection
  title="Design Principles"
  items={project.designPrinciples}
  itemType="principles"
  previewCount={3}
/>

// For key insights
<ContextSection
  title="Key Insights"
  items={project.keyInsights}
  itemType="insights"
  previewCount={3}
/>
```

**Props:**
- `title`: `string` - Section heading
- `items`: `DesignPrinciple[] | string[]` - Array of items to display
- `itemType`: `'principles' | 'insights'` - Display format
- `previewCount?`: `number` - Items to show before expand (default: 3)

**Features:**
- Progressive disclosure (show N, expand to all)
- Expand/collapse functionality
- Grid layout for principles
- Numbered list for insights

---

### ProjectsGrid

Grid layout for project cards with filtering support.

```tsx
import { ProjectsGrid } from '@/components/projects-grid';

const projects = await getProjects();

<ProjectsGrid projects={projects} />
```

**Props:**
- `projects`: `Project[]` - Array of projects to display

**Features:**
- Responsive grid layout
- Empty state handling
- Prepared for filtering (Phase 3)

---

## Layout Pattern

### Standard Page with Sidebar

```tsx
import { SidebarNav } from '@/components/sidebar-nav';
import { getProjectCounts } from '@/lib/data/projects';

export default async function Page() {
  const projectCounts = await getProjectCounts();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SidebarNav projectCounts={projectCounts} />

      {/* Main Content - offset by sidebar width */}
      <main className="flex-1 ml-60 p-10">
        <div className="max-w-7xl mx-auto">
          {/* Your content */}
        </div>
      </main>
    </div>
  );
}
```

---

## Styling Guidelines

### Using Design Tokens

All components use CSS variables for theming. Access them via Tailwind:

```tsx
// Text colors
className="text-[var(--color-text-primary)]"
className="text-[var(--color-text-secondary)]"
className="text-[var(--color-text-tertiary)]"

// Background colors
className="bg-[var(--color-background-primary)]"
className="bg-[var(--color-background-secondary)]"
className="bg-[var(--color-background-tertiary)]"

// Brand color
className="text-[var(--color-brand)]"
className="bg-[var(--color-brand)]"

// Border
className="border-[var(--color-border)]"
className="hover:border-[var(--color-border-hover)]"
```

### Spacing Scale

```tsx
// Padding/margin
p-4   // 16px
p-6   // 24px
p-8   // 32px
p-10  // 40px

// Gaps
gap-4  // 16px
gap-6  // 24px
gap-8  // 32px
```

### Common Patterns

**Card with hover effect:**
```tsx
className="bg-[var(--color-background-secondary)] border border-[var(--color-border)] rounded-lg p-6 transition-all hover:border-[var(--color-border-hover)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
```

**Section heading:**
```tsx
className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]"
```

**Secondary text:**
```tsx
className="text-sm text-[var(--color-text-secondary)]"
```

---

## Utility Functions

### formatDate

Format dates to relative time strings.

```tsx
import { formatDate } from '@/lib/utils';

formatDate('2025-10-20') // "5 days ago"
formatDate('2025-10-24') // "yesterday"
formatDate('2025-10-25') // "today"
```

### cn

Merge Tailwind classes safely.

```tsx
import { cn } from '@/lib/utils';

className={cn(
  'base-class',
  isActive && 'active-class',
  className // from props
)}
```

---

## Data Fetching

### Server Components (Recommended)

```tsx
import { getProjects, getProject, getProjectCounts } from '@/lib/data/projects';

// Get all projects
const projects = await getProjects();

// Get single project
const project = await getProject('project-id');

// Get project counts
const counts = await getProjectCounts();
```

### Available Functions

- `getProjects()` - Returns all projects
- `getProject(id)` - Returns single project by ID
- `getProjectsByStatus(status)` - Filter by status
- `getProjectCounts()` - Returns count object

---

## Accessibility

### Keyboard Navigation

All interactive components support keyboard navigation:
- **Tab** - Move focus
- **Enter/Space** - Activate buttons/links
- **Escape** - Close modals (future)

### Focus States

Focus states are visible on all interactive elements:
```tsx
focus:outline focus:outline-2 focus:outline-[var(--color-brand)] focus:outline-offset-2
```

### Semantic HTML

Use proper semantic elements:
- `<nav>` for navigation
- `<main>` for main content
- `<aside>` for sidebars
- `<article>` for independent content
- `<section>` for thematic grouping
- Proper heading hierarchy (h1 → h2 → h3)

---

## Performance Tips

### Server vs Client Components

**Use Server Components for:**
- Static content
- Data fetching
- SEO-critical content

**Use Client Components for:**
- Interactivity (onClick, onChange)
- Hooks (useState, useEffect, useRouter)
- Browser APIs

### Code Example

```tsx
// Server Component (default)
export default async function Page() {
  const data = await fetchData(); // Server-side
  return <ClientComponent data={data} />;
}

// Client Component
'use client';

export function ClientComponent({ data }) {
  const [state, setState] = useState();
  // Interactive logic
}
```

---

## Common Issues

### Issue: Component not updating
**Solution:** Ensure client component has `'use client'` directive

### Issue: CSS variables not working
**Solution:** Use bracket notation: `text-[var(--color-text-primary)]`

### Issue: Build errors with TypeScript
**Solution:** Check all props match interface definitions

### Issue: Sidebar not fixed
**Solution:** Ensure `fixed` class and `ml-60` offset on main content

---

## Best Practices

1. **Type Safety**: Always use TypeScript interfaces for props
2. **Reusability**: Keep components focused on single responsibility
3. **Accessibility**: Include ARIA labels and keyboard support
4. **Performance**: Default to server components, use client only when needed
5. **Styling**: Use design tokens via CSS variables for consistency
6. **Error Handling**: Handle loading and error states gracefully

---

## Example: Complete Page

```tsx
import { getProject, getProjectCounts } from '@/lib/data/projects';
import { SidebarNav } from '@/components/sidebar-nav';
import { StatusBadge } from '@/components/status-badge';
import { DeliverableCard } from '@/components/deliverable-card';
import { ContextSection } from '@/components/context-section';

export default async function ProjectPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);
  const projectCounts = await getProjectCounts();

  return (
    <div className="flex min-h-screen">
      <SidebarNav
        projectCounts={projectCounts}
        showBackButton={true}
      />

      <main className="flex-1 ml-60 p-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <StatusBadge status={project.status} />
            <h1 className="text-4xl font-bold mt-4">
              {project.name}
            </h1>
          </header>

          <ContextSection
            title="Design Principles"
            items={project.designPrinciples}
            itemType="principles"
          />

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">
              Deliverables
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project.deliverables.map((deliverable) => (
                <DeliverableCard
                  key={deliverable.id}
                  deliverable={deliverable}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
```

---

For more information, see:
- [PHASE2-REPORT.md](./PHASE2-REPORT.md) - Complete implementation details
- [README.md](./README.md) - Project overview
- [Migration Plan](../docs/architecture/NEXTJS-MIGRATION-PLAN.md) - Full migration strategy
