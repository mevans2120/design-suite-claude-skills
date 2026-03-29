---
name: design-components
description: Designs components and sections within an existing design system. Creates 3 composition variations that use the project's actual tokens, colors, typography, and component primitives. Use when user says "design a component", "component variations", "design a card", "design a hero", "design a section", "component options", "design within our system", "new component", "component concept", or wants to explore how a component could look using their existing design system. Also use when designing larger composed sections (dashboards, settings pages, feature panels) that build on existing primitives. Do NOT use when the project has no design system yet (use design-system-init), when exploring entirely new visual directions (use design-concepts), or when reviewing implemented code (use design-qa).
---

# Design - Components

This skill guides Claude through designing components and sections within an existing design system. Unlike design-concepts (which explores new visual identities), this skill works within established constraints — same fonts, same colors, same tokens — and finds creative variation through composition, layout, interaction, and information hierarchy.

## Core Methodology

### Why Constrained Variation Matters

A design system gives you vocabulary. This skill is about writing different sentences with the same words:
- **Same palette, different emphasis**: Brand orange as a subtle border vs. a bold background vs. a gradient accent
- **Same type scale, different hierarchy**: Large title + small body vs. medium everything + bold labels
- **Same spacing tokens, different density**: Compact data table vs. airy editorial card
- **Same primitives, different composition**: Stacked cards vs. side-by-side panels vs. tabbed sections

The goal is showing stakeholders that meaningful variety exists within the system — and helping pick the composition that best serves the component's purpose.

### When to Create 3 Variations vs. 1

- **3 variations**: New component type, section redesign, unclear requirements, stakeholder needs to choose
- **1 variation**: Extending an existing pattern, minor variant of something that already works, clear requirements with no ambiguity

## Step 1: System Audit

Before designing anything, understand what you're working with. Read the project's design system files.

**Files to look for:**
```
- globals.css / global styles (CSS variables, tokens, layers)
- tailwind.config.ts/js (theme extensions, custom values)
- Design token files (colors, spacing, typography scales)
- Component library (shadcn components, Radix primitives, custom components)
- Existing components similar to what's being designed
- Any design docs (docs/design/, docs/css-quick-reference.md, etc.)
```

**What to catalog:**
1. **Color tokens**: Brand colors, semantic colors, neutral scale, accent colors, dark mode variants
2. **Typography**: Font families, size scale, weight scale, any utility classes (.text-page-title, .heading-font, etc.)
3. **Spacing**: Token scale (if semantic like section/card/element/rhythm, or numeric like Tailwind defaults)
4. **Animation**: Custom durations, easings, keyframes, transition patterns, motion preference support
5. **Component primitives**: What's already built — cards, buttons, badges, dialogs, inputs, etc.
6. **Patterns in use**: How existing components handle states, hover effects, responsive behavior, dark mode

**Output**: A brief system audit summary (mental model, not a separate file) that captures what tokens and patterns are available. Reference specific variable names and class names — these are the building blocks for concepts.

### Reading the System's Personality

Every design system has a personality even if it wasn't consciously designed. Before composing new components, identify it:

- **Opal Creek type**: Semantic and structured — named spacing tokens (section-lg, card-md), service-specific colors, utility-class typography. Wants consistency and predictability.
- **ProSocial type**: Dynamic and stateful — tiered color progressions, state machine components, gamified micro-interactions. Wants energy and feedback.
- **DOA type**: Atmospheric and textural — glassmorphism, text-stroke effects, gradient animations. Wants mood and visual drama.
- **Portfolio type**: Systematic and polished — comprehensive token coverage, custom easings, staggered animation delays. Wants precision and craft.

Match your composition approach to the system's personality. A compact data-dense card might be right for a structured system; an animated progressive-reveal card might be right for a dynamic one.

## Step 2: Component Brief

Ask the user (or extract from context):

1. **What**: What component or section? (a card, a nav bar, a hero section, a settings panel, a dashboard widget)
2. **Purpose**: What job does this component do for the user? What information does it convey or what action does it enable?
3. **Context**: Where does this live in the app? What's around it? What page/view?
4. **Content**: What data or content does it display? Be specific — names, numbers, labels, images, icons.
5. **States**: What states does it need? (empty, loading, error, populated, hover, active, disabled, selected, expanded/collapsed)
6. **Responsive**: Mobile-first? Desktop-only? Needs to work at both extremes?
7. **Constraints**: Anything off-limits? Any must-haves? Technical constraints?

If the user gives a brief answer ("design a task card"), fill in reasonable assumptions from the system audit and existing components, then confirm before proceeding.

## Step 3: Pattern Research

Two types of research, both quick:

### Internal Patterns
Look at how the project already handles similar components:
- Search the codebase for components with similar purposes
- Note which tokens, layouts, and interaction patterns are already established
- Identify conventions (do cards have borders or shadows? do sections use consistent padding tokens?)

### External Patterns
Quick web search for best practices:
```
web_search: "best [component type] UI patterns 2025"
web_search: "[component type] accessibility requirements WCAG"
web_search: "[component type] responsive design patterns"
```

Focus on: accessibility requirements for the component type, interaction patterns that work well, content hierarchy approaches, common mistakes to avoid.

## Step 4: Composition Strategy

### Composition Lenses

Instead of aesthetic lenses (the component design equivalent of design-concepts' lens system), select **composition lenses** — different strategies for arranging and presenting the same content within the same design system.

**Pick 3 lenses from these categories.** Mix across categories for variety.

#### Layout Lenses
| Lens | Character | Good For |
|------|-----------|----------|
| **Dense/Compact** | Maximum info per pixel, tight spacing, small type | Data-heavy dashboards, list views, power-user tools |
| **Spacious/Editorial** | Generous whitespace, large type, breathing room | Marketing sections, hero areas, onboarding, single-focus |
| **Modular/Grid** | Card grid, uniform modules, scannable | Galleries, dashboards, feature grids, pricing tables |
| **Asymmetric/Featured** | One dominant element + supporting details | Hero + sidebar, featured item + list, media + text |
| **Stacked/Sequential** | Vertical flow, clear reading order, progressive | Forms, timelines, step-by-step, mobile-first content |

#### Interaction Lenses
| Lens | Character | Good For |
|------|-----------|----------|
| **Static/Informational** | Read-only, clear hierarchy, no interaction needed | Status displays, summaries, reports, confirmation states |
| **Interactive/Explorable** | Hover reveals, click-to-expand, inline actions | Data tables, cards with actions, expandable panels |
| **Progressive/Layered** | Show summary first, reveal detail on demand | Complex data, mobile views, settings with advanced options |
| **Animated/Transitional** | State changes through motion, staggered reveals | Dashboards on load, status changes, gamified UI |

#### Emphasis Lenses
| Lens | Character | Good For |
|------|-----------|----------|
| **Color-Forward** | Bold use of system colors, colored backgrounds, gradient accents | CTAs, status indicators, branded sections, categories |
| **Typography-Forward** | Size contrast, weight hierarchy, type as design element | Editorial, headings-heavy, text-content sections |
| **Space-Forward** | Whitespace as design element, minimal decoration | Premium feel, single-purpose screens, focus states |
| **Border/Structure** | Visible containers, dividers, outlined elements | Complex layouts, data organization, forms |

### How to Select Lenses

1. Review the system audit — what does this design system do well?
2. Consider the component's purpose — a data table and a hero section want very different compositions
3. Pick 3 combinations that produce **meaningfully different components**
4. At least one should be a stretch — unexpected but defensible for this use case
5. Tell the user your lens selections before building

**Example:**
> For a "care task card" in a system with tiered colors, state progressions, and semantic spacing:
> - **Lens 1: Dense/Compact + Interactive** — Tight card with inline actions, hover-reveal details
> - **Lens 2: Stacked/Sequential + Progressive** — Full-width row that expands to show details
> - **Lens 3: Modular/Grid + Color-Forward** — Color-coded card with status-driven background tiers

## Step 5: Creating Concepts

### Ground Rules

Every concept MUST:
- Use **only** tokens, colors, fonts, and spacing from the existing design system
- Reference actual CSS variable names, Tailwind classes, or token names in annotations
- Work with the project's component library primitives (if shadcn, use shadcn; if custom, extend custom)
- Handle all required states (not just the happy path)
- Meet baseline accessibility (4.5:1 contrast, focus states, semantic HTML)
- Show responsive behavior (or note how it adapts)

### What Differentiates the 3 Concepts

Since the aesthetic is fixed by the design system, concepts differ through:

| Dimension | How It Varies |
|-----------|---------------|
| **Layout** | Grid vs. stack vs. asymmetric vs. table |
| **Information density** | Everything visible vs. progressive disclosure vs. summary-only |
| **Token emphasis** | Which colors are foregrounded, which spacing scale is used |
| **Interaction model** | Static vs. hover-reveals vs. click-to-expand vs. animated transitions |
| **Content priority** | What's biggest/first — title? image? status? action? |
| **State handling** | How empty/loading/error states are communicated |

### Concept Format

Concepts are HTML files that use the project's design tokens. Embed the token values directly so the HTML is self-contained and viewable in a browser.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Component] - Concept [N]: [Lens Name]</title>
  <!-- Load the project's actual fonts -->
  <style>
    /*
     * Design System Tokens (from project's globals.css / tailwind.config)
     * Using actual variable names for traceability
     */
    :root {
      /* Paste relevant tokens here */
    }

    /* Component styles using only system tokens */
  </style>
</head>
<body>
  <!-- Component with realistic content, not Lorem Ipsum -->

  <!--
    ANNOTATIONS:
    Explain key composition decisions and which tokens are used where.
    Connect decisions back to the component's purpose.
  -->

  <!-- Show multiple states: default, hover, active, empty, etc. -->
</body>
</html>
```

### Per-Concept Requirements

Each concept MUST include:
- **Lens name** stated explicitly
- **Composition rationale**: Why this layout/interaction/emphasis for this component
- **Token mapping**: Which system tokens are used and where (e.g., "uses --color-brand-orange for status border, spacing-card-md for internal padding")
- **State showcase**: All required states rendered on the same page
- **Responsive notes**: How it adapts (or annotations if the HTML doesn't demonstrate it)

### Concept Refinement

After the user picks a direction:
- Refine the chosen concept based on feedback
- Increase fidelity — nail all states, interactions, edge cases
- Prepare for handoff to other skills (design-production, or direct implementation)
- The refined concept HTML should be close enough to the final intent that a developer could implement from it

## Step 6: Presentation

### File Organization

```
docs/design/{component-name}-components-{MMDDYY}/
├── {component-name}-concept-1-{lens-name}.html
├── {component-name}-concept-2-{lens-name}.html
├── {component-name}-concept-3-{lens-name}.html
└── {component-name}-overview.md
```

**Component Name Guidelines:**
- Use kebab-case (lowercase with hyphens)
- Be specific: `care-task-card`, `service-hero-section`, `settings-panel`, `activity-dashboard`
- Ask the user for the name if not obvious from context

### Overview Document

**File**: `{component-name}-overview.md`

```markdown
# [Component Name] — Design Concepts

## Component Purpose
[What this component does, where it lives, who uses it]

## Design System Context
- **Project**: [project name]
- **Token source**: [globals.css, tailwind.config, etc.]
- **Key tokens used**: [list the most relevant colors, spacing, typography tokens]
- **Existing patterns referenced**: [similar components in the codebase]

## Concept 1: [Name] — [Lens Combination]
**Composition**: [Layout + Interaction + Emphasis lens]
**Approach**: [How this arranges content and why]
**Strengths**: [What this does well for the component's purpose]
**Tradeoffs**: [What this sacrifices — density vs. clarity, simplicity vs. power]
**Tokens highlighted**: [Which system tokens are most prominent]

## Concept 2: [Name] — [Lens Combination]
...

## Concept 3: [Name] — [Lens Combination]
...

## Recommendation
[Which concept best serves the component's purpose and why]

## Next Steps
- [ ] Gather feedback on the 3 directions
- [ ] Refine chosen concept with [specific details]
- [ ] Hand off to implementation or design-production
```

## Quality Criteria

### Excellent Component Concepts:
- **System-native**: Could not exist outside this specific design system — tokens are visible in the design
- **Compositionally distinct**: Each concept arranges information and interaction differently, not just color-swapped
- **State-complete**: Shows all required states, not just the happy path
- **Realistic content**: Uses actual or realistic data, not "Title Here" / "Description text"
- **Annotated**: Key composition decisions are explained with WHY, tied to component purpose
- **Accessible**: Color contrast meets 4.5:1, focus states exist, semantic HTML structure
- **Responsive-aware**: Either demonstrates responsive behavior or clearly annotates how it adapts
- **Traceable**: Annotations reference actual token names from the system audit

### Red Flags:
- Concepts that introduce colors, fonts, or spacing not in the design system
- Three concepts that only differ in border-radius or shadow
- Missing states (especially empty and error)
- Placeholder content hiding layout problems
- No reference to actual system tokens

## Common Pitfalls

### Escaping the System
**Problem**: "This would look better with a different font" — introducing off-system values
**Instead**: Find variety within the system. If the system only has one font, vary weight, size, case, and spacing. Constraints breed creativity.

### Surface-Level Variation
**Problem**: Three concepts that are the same layout with different colored headers
**Instead**: Change the layout structure, the interaction model, or the information hierarchy. A card and a list row are fundamentally different even if they show the same data.

### Happy-Path-Only Design
**Problem**: Concepts only show the component with perfect data
**Instead**: Design the empty state, the loading state, the error state, the overflow state. These reveal whether the composition actually works.

### Ignoring What Already Exists
**Problem**: Designing a card without looking at the project's existing cards
**Instead**: Read existing components first. Extend patterns rather than inventing new ones. If the project uses shadows on cards, don't switch to borders without reason.

### Over-Annotating the Obvious
**Problem**: "This uses padding because padding creates space"
**Instead**: Annotate the non-obvious — why this token over another, why this layout over the simpler option, why this state treatment connects to the component's purpose.

## Integration Points

### Inputs
- **Design System**: globals.css, tailwind.config, existing components (REQUIRED)
- **Design Research**: Personas, user needs, interaction preferences (if available)
- **Design Concepts**: If a visual direction was already chosen, component design extends that direction
- **Product Requirements**: What the component needs to do, what data it handles

### Outputs
- **Implementation**: HTML concepts close enough to code from directly
- **Design Production**: Detailed specs if a production handoff is needed
- **Design QA**: Concepts serve as reference for QA review after implementation

### Related Skills
- **design-system-init**: Use first if no design system exists yet
- **design-concepts**: Use instead if you need a new visual direction, not a new component
- **design-production**: Use after component direction is chosen, for full production specs
- **design-qa**: Use after implementation, to review against the concept

## Validation Checklist

Before delivering component concepts, verify:
- [ ] Read the project's design system files (globals.css, tailwind.config, component library)
- [ ] Cataloged available tokens (colors, typography, spacing, animation, components)
- [ ] Gathered component brief (purpose, context, content, states, responsive needs)
- [ ] Researched accessibility requirements for this component type
- [ ] Selected 3 composition lenses appropriate to the component's purpose
- [ ] Each concept uses ONLY tokens from the existing design system
- [ ] Each concept differs in layout, interaction, or information hierarchy (not just color)
- [ ] Each concept shows all required states (empty, loading, error, populated, hover)
- [ ] Used realistic content, not placeholders
- [ ] Verified color contrast meets 4.5:1 minimum
- [ ] Annotated key decisions with token references and rationale
- [ ] Created overview document comparing concepts with recommendation
