---
name: design-concepts
description: Creates conceptual designs that illustrate design strategy and approach. Leverages research insights and design briefs to develop UI concepts, mood boards, and interactive prototypes. Translates strategic direction into visual design explorations that communicate intent and gather feedback.
---

# Design - Concepts

This skill guides Claude through creating conceptual designs that bridge research insights and production-ready designs. Concepts communicate design direction, explore visual possibilities, and validate approaches before detailed production work begins.

## Core Methodology

### Purpose of Concept Design
Concept design is NOT final design - it's exploration and communication:
- **Explore possibilities**: Test multiple visual directions quickly
- **Communicate intent**: Show stakeholders what "good" could look like
- **Validate approach**: Get feedback before investing in detailed production
- **Build alignment**: Create shared understanding of design direction

### Concept Design Process
1. **Brief Review**: Understand goals, constraints, research insights
2. **Inspiration & Research**: Gather visual references, identify trends
3. **Ideation**: Sketch multiple directions (divergent thinking)
4. **Refinement**: Develop 2-3 strong concepts (convergent thinking)
5. **Presentation**: Create artifacts that tell the story and invite feedback

### Fidelity Levels
Match fidelity to the question being answered:
- **Low-fi wireframes**: Test layout, hierarchy, flow
- **Mid-fi mockups**: Test visual direction, branding, key interactions
- **High-fi prototypes**: Test detailed interactions, polish, feasibility

## Tool Usage Patterns

### Initial Setup & Brief Review

**Step 1: Gather Context**
```
Questions to ask user:
1. What research/insights should inform this concept?
2. What's the design challenge or goal?
3. Who's the audience for these concepts?
4. Any brand guidelines or design constraints?
5. What fidelity level? (wireframes/mockups/high-fi)
6. Timeline and how many concepts to explore?

Use `view` to read:
- Research artifacts (personas, design principles)
- Existing brand guidelines
- Competitive analysis
- Design briefs or requirements
```

**Step 2: Inspiration Research**
Use web tools to gather current design patterns:
```
web_search: "best [industry] app ui design 2025"
web_search: "[design pattern] examples mobile"
web_fetch: Dribbble, Behance, Awwwards for visual inspiration

Create mood board markdown documenting:
- Visual directions that align with brand/goals
- Interaction patterns that solve similar problems
- Color palettes, typography trends
- What works and why (tied to research insights)
```

### Creating Concepts

**For Wireframes/Low-Fi Concepts:**
Create HTML prototypes with minimal styling:
```html
<!-- Focus on layout, hierarchy, content structure -->
<div style="max-width: 400px; margin: 0 auto; font-family: system-ui;">
  <!-- Use grayscale, simple shapes -->
  <!-- Annotate key decisions -->
</div>
```

**For Visual Mockups/Mid-Hi Fi:**
Create React artifacts with Tailwind CSS:
```jsx
// Use Tailwind's utility classes for rapid styling
// Import design tokens if design system exists
// Focus on key screens, not complete flows
// Include annotations explaining design decisions
```

**For Interactive Prototypes:**
```jsx
// Use React hooks for state management
// Create realistic interactions for key flows
// Use Tailwind for styling
// Add transition/animation for important interactions
// Keep data in memory (no localStorage)
```

### Mood Board Creation

Mood boards should include:
1. **Visual Direction**: Screenshots, color palettes, typography examples
2. **Interaction Patterns**: GIFs or descriptions of key interactions
3. **Design Rationale**: Why these choices support user jobs and brand
4. **Options**: Usually 2-3 different directions

**Format**: HTML artifact with images and annotations
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
  <title>Design Concept Mood Board</title>
</head>
<body class="bg-gray-50">
  <div class="max-w-6xl mx-auto p-8">
    <h1 class="text-4xl font-bold mb-8">Design Concept: [Name]</h1>
    
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Direction 1: [Descriptive Name]</h2>
      <p class="mb-4">[Why this direction supports user jobs]</p>
      <!-- Visual examples, color swatches, typography -->
    </section>
  </div>
</body>
</html>
```

## Quality Criteria

### Excellent Concepts:
- **Tied to research**: Design decisions directly address user jobs/pain points
- **Strategically different**: Multiple concepts explore meaningfully different approaches
- **Appropriate fidelity**: Level of detail matches the questions being answered
- **Annotated**: Key decisions are explained, not just shown
- **Realistic**: Use real or realistic content, not Lorem Ipsum
- **Accessible baseline**: Even concepts consider color contrast, text size
- **Responsive-aware**: Show how designs adapt to different screens (if relevant)

### Excellent Mood Boards:
- **Cohesive**: Each direction feels unified and intentional
- **Distinctive**: Different directions are clearly different, not just color swaps
- **Contextual**: Visual choices connect to brand and user needs
- **Inspiring**: High-quality examples that elevate the conversation
- **Annotated**: Explain WHY these visuals, not just WHAT they are

### Excellent Prototypes:
- **Interactive key flows**: Focus on most important user journeys
- **Realistic interactions**: Buttons click, forms validate, states change
- **Performance**: Fast load, smooth transitions
- **Feedback mechanisms**: Show loading states, errors, success messages
- **Easy to understand**: Clear labels, obvious next steps

## Deliverable Formats

### UI Design Concepts
**File**: `/mnt/user-data/outputs/concept-[name].jsx` or `.html`
**Format**: React artifact or HTML with Tailwind
**Include**: 
- 2-3 key screens showing the concept
- Annotations explaining design decisions
- Responsive behavior (if applicable)

### Mood Boards
**File**: `/mnt/user-data/outputs/moodboard-[name].html`
**Format**: HTML artifact with images and descriptions
**Include**:
- 2-3 visual directions
- Color palettes, typography, visual style examples
- Rationale tied to research/brand
- References/inspiration sources

### Prototypes
**File**: `/mnt/user-data/outputs/prototype-[name].jsx`
**Format**: React artifact with interactivity
**Include**:
- Interactive key flows (3-7 screens)
- Realistic content and data
- State management for interactions
- Annotations for non-obvious interactions

### Design Concept Document
**File**: `/mnt/user-data/outputs/concept-overview.md`
**Format**: Markdown summary document
**Include**:
- Links to all concept files
- Comparison of different directions
- Pros/cons of each approach
- Recommendation (if asked)
- Next steps and open questions

## Examples

### Good Concept Progression

**Initial Brief**: "Design a faster checkout flow for e-commerce"

**Concept 1: Single-Page Express**
- All checkout fields on one scrolling page
- Smart defaults from user history
- Rationale: Reduces clicks, addresses "too many steps" pain point
- Tradeoff: More scrolling, potentially overwhelming

**Concept 2: Progressive Sections**
- 3 clear steps: Shipping → Payment → Review
- Each section expands when ready
- Rationale: Maintains progress sense, reduces cognitive load
- Tradeoff: More clicks, but clearer mental model

**Concept 3: Inline Cart Checkout**
- Checkout overlays cart, doesn't navigate away
- Real-time shipping calculation
- Rationale: Maintains context, feels faster
- Tradeoff: Limited screen space, complex responsive behavior

### Good Annotation Example
```jsx
// ✅ Good: Explains WHY
<button className="bg-green-600 text-white px-8 py-4 text-lg">
  {/* Large, high-contrast CTA - Research showed 40% of users 
      abandoned on mobile due to small, hard-to-tap buttons */}
  Complete Purchase
</button>

// ❌ Poor: Just describes WHAT
<button className="bg-green-600 text-white px-8 py-4 text-lg">
  {/* Green button */}
  Complete Purchase
</button>
```

## Common Pitfalls to Avoid

### ❌ Designing in a Vacuum
**Problem**: Creating concepts without reviewing research or existing materials
**Instead**: Start every concept by reviewing personas, design principles, and competitive analysis

### ❌ Too Many Options
**Problem**: Presenting 5+ concepts that overwhelm stakeholders
**Instead**: Show 2-3 meaningfully different directions with clear tradeoffs

### ❌ Premature Pixel-Perfect Polish
**Problem**: Spending hours on shadows/gradients before validating the approach
**Instead**: Match fidelity to the question - use low-fi until direction is validated

### ❌ Lorem Ipsum Syndrome
**Problem**: Using placeholder text that hides content design problems
**Instead**: Use realistic content that exposes real layout and hierarchy challenges

### ❌ Concepts That Look Identical
**Problem**: Three concepts that only differ in color or button shape
**Instead**: Explore genuinely different approaches to the design problem

### ❌ Missing the "Why"
**Problem**: Beautiful designs with no explanation of decisions
**Instead**: Annotate key decisions with rationale tied to research insights

### ❌ Designing for Desktop Only
**Problem**: Concepts that don't consider mobile or tablet experiences
**Instead**: Design mobile-first or show responsive behavior for key breakpoints

### ❌ Ignoring Technical Feasibility
**Problem**: Concepts requiring tech that doesn't exist or can't be built in timeline
**Instead**: Check technical constraints early, design within feasible boundaries

### ❌ Copying Without Adapting
**Problem**: Directly copying competitor designs without adapting to your users' jobs
**Instead**: Learn from patterns but customize for your specific user needs and context

## Design Patterns Library

### Common UI Patterns to Consider

**Navigation Patterns**:
- Tab bars (mobile): Quick access to 3-5 main sections
- Hamburger menu: Space-saving for many options
- Bottom sheets: Contextual actions without leaving screen
- Breadcrumbs: Show hierarchy, enable quick navigation

**Form Patterns**:
- Inline validation: Show errors as user types
- Progressive disclosure: Show fields as needed
- Smart defaults: Pre-fill when possible
- Multi-step wizards: Break complex forms into steps

**Content Patterns**:
- Cards: Scannable, contained content blocks
- Lists: Efficient for repeating content
- Grids: Visual browsing, discovery
- Feed: Infinite scroll for continuous content

**Feedback Patterns**:
- Toast notifications: Brief, non-blocking alerts
- Modal dialogs: Important confirmations
- Skeleton screens: Show structure while loading
- Empty states: Guide users when no content exists

## Integration Points

### Inputs from Other Teams
- **Design Research**: Personas, design principles, user insights, competitive analysis
- **Product/PM**: Feature requirements, business goals, timeline constraints
- **Engineering**: Technical constraints, API capabilities, performance requirements
- **Brand/Marketing**: Brand guidelines, messaging, visual identity

### Outputs for Other Teams
- **Design Production**: Validated direction to develop into production-ready designs
- **Product/PM**: Visual artifacts to communicate product vision to stakeholders
- **Engineering**: Interactive prototypes to validate technical feasibility
- **Marketing**: Visual concepts for early marketing/PR materials

### Related Skills
- Use **design-research** artifacts (personas, principles) to inform concepts
- Concepts feed into **design-production** for detailed specification
- Share concepts with **PM** teams for alignment on features and priorities

## Tips for Best Results

1. **Start with research review** - Read personas and design principles before sketching
2. **Explore before converging** - Generate many rough ideas before refining favorites
3. **Design with real content** - Placeholder text hides problems
4. **Test on devices** - Check mobile responsiveness, don't just assume
5. **Show your thinking** - Annotate WHY, not just WHAT
6. **Compare options clearly** - Make tradeoffs visible for stakeholders
7. **Prototype the hard parts** - If an interaction is complex, make it work
8. **Stay within brand guardrails** - Push creativity within constraints
9. **Consider accessibility early** - Color contrast, text size, keyboard nav
10. **Timebox concept work** - Perfect is the enemy of "good enough to get feedback"

## Concept Presentation Template

When presenting concepts, structure like this:

```markdown
# [Project Name] Design Concepts

## Design Challenge
[What problem are we solving? Who for? Why now?]

## Key Research Insights
1. [Insight from research that informs these concepts]
2. [Another key insight]
3. [Another key insight]

## Concept 1: [Descriptive Name]
**Approach**: [High-level strategy]
**Strengths**: [What this does well]
**Tradeoffs**: [What this sacrifices]
[Link to prototype/mockup]

## Concept 2: [Descriptive Name]
**Approach**: [High-level strategy]
**Strengths**: [What this does well]
**Tradeoffs**: [What this sacrifices]
[Link to prototype/mockup]

## Recommendation
[If asked: Which concept to pursue and why]

## Next Steps
- [ ] Gather feedback from [stakeholders]
- [ ] Test [specific assumption] with users
- [ ] Refine chosen direction in production design
```

## Validation Checklist

Before delivering concept artifacts, verify:
- [ ] Reviewed research insights and design principles
- [ ] Created 2-3 meaningfully different concepts
- [ ] Used realistic content, not Lorem Ipsum
- [ ] Annotated key design decisions with rationale
- [ ] Checked responsive behavior for mobile/tablet
- [ ] Verified color contrast meets minimum standards (4.5:1 for text)
- [ ] Files are in `/mnt/user-data/outputs/` with descriptive names
- [ ] Created overview document comparing concepts
- [ ] Interactive prototypes work smoothly (no broken interactions)
- [ ] Clearly communicated next steps and decisions needed
