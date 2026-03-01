---
name: design-concepts
description: Creates conceptual designs that illustrate design strategy and approach. Use when user says "mockup", "wireframe", "concept", "mood board", "visual direction", "design options", "explore designs", "UI design", "prototype", "design this", "show me designs", "create a design", "look and feel", or "design variations". Leverages research insights and design briefs to develop UI concepts, mood boards, and interactive prototypes. Do NOT use when user needs to understand users first (use design-research), is reviewing an implemented product (use design-qa), or is writing code.
---

# Design - Concepts

This skill guides Claude through creating conceptual designs that bridge research insights and production-ready code. Concepts communicate design direction, explore visual possibilities, and validate approaches before implementation.

## Core Methodology

### Purpose of Concept Design
Concept design is NOT final design - it's exploration and communication:
- **Explore possibilities**: Test multiple visual directions quickly
- **Communicate intent**: Show stakeholders what "good" could look like
- **Validate approach**: Get feedback before investing in implementation
- **Build alignment**: Create shared understanding of design direction

### Concept Design Process — Two Phases

The concept design process is split into two sequential phases. Phase 1 establishes the shared design foundation. Phase 2 uses that foundation to generate concepts in parallel.

**Phase 1 — Foundation (sequential, main agent):**
1. **Brief Review**: Understand goals, constraints, research insights
2. **Design Intent Interview**: Uncover emotional and experiential goals
3. **Inspiration & Research**: Gather visual references from diverse sources
4. **Mood Board**: Create the visual foundation that all concepts build from
5. **Lens Selection**: Choose 3 conceptual lenses that fit the project context

**Phase 2 — Parallel Concept Generation (via subagents):**
6. **Create Concepts**: Launch 3 subagents in parallel, one per lens, each producing one concept
7. **Presentation**: Collect results and create artifacts that tell the story and invite feedback
8. **Refinement** (if needed): Iterate on the chosen direction

### Why Multiple Concepts?
Creating 3 concept variations is standard design practice **when initially exploring**:
- **Divergent exploration**: Shows different strategic approaches, not just visual variations
- **Better decisions**: Stakeholders choose between meaningful alternatives
- **Reduced bias**: Multiple options prevent "approve this" vs. "which solves the problem best?"

**When to create 3 concepts vs. 1:**
- 3 concepts: First time designing a product/feature, exploring strategic direction, major redesigns
- 1 concept: Refining a chosen direction, iterating based on feedback, minor updates

**What makes concepts "different"?**
- Different information architecture
- Different interaction models
- Different navigation patterns
- Different content priorities
- Different emotional registers / aesthetic languages

### Why Parallel Subagents?
Generating concepts in parallel via subagents provides three key benefits:
- **Speed**: 3 concepts generate simultaneously instead of sequentially
- **Divergence**: Each subagent works in its own context window, reducing the tendency for concepts to converge or echo each other
- **Shared foundation**: The mood board ensures all concepts share a cohesive design language while expressing it differently through their assigned lens

---

## Phase 1: Foundation

### Step 1: Brief Review & Context Gathering

**Gather Context:**
```
Questions to ask user:
1. What research/insights should inform this concept?
2. What's the design challenge or goal?
3. Who's the audience for these concepts?
4. Any brand guidelines or design constraints?
5. What fidelity level? (wireframes/mockups/high-fi)
6. Is this initial exploration or refining an existing concept?
```

Use `view` to read:
- Research artifacts (personas, design principles)
- Existing brand guidelines
- Competitive analysis
- Design briefs or requirements

### Step 2: Design Intent Interview

**CRITICAL: Do this before any visual work.** These questions give Claude strong creative constraints that produce varied, contextually appropriate concepts.

Ask the user:

1. **Emotional target**: "What 3 adjectives describe how a user should *feel* when they use this?" (e.g., calm + confident + curious)
2. **Non-digital reference**: "Name a physical space, product, or experience (not a website) that captures the vibe you're going for." (e.g., "an Aesop store", "a Muji notebook", "a busy Tokyo train station")
3. **Anti-reference**: "What should this absolutely NOT feel like?" (e.g., "not clinical", "not playful/childish", "not enterprise-y")
4. **Design hero**: "Is there a specific brand, publication, or product whose aesthetic you admire *for this project*?" (doesn't need to be in the same industry)

These four inputs dramatically shape the design direction. If the user gives even partial answers, use them as strong constraints. If they can't answer, propose options based on the brief and research.

### Step 3: Inspiration & Research

Use web tools to gather current design patterns:
```
web_search: "best [industry] app ui design 2025"
web_search: "[design pattern] examples mobile"
web_fetch: Dribbble, Behance, Awwwards for visual inspiration
```

#### Diverse Inspiration Sources

**CRITICAL: Go beyond the usual Dribbble/Behance cycle.** These sources produce sameness. Deliberately seek inspiration from:

- **Architecture & interiors**: Spatial relationships, material palettes, lighting moods
- **Print & editorial design**: Magazine layouts, book covers, poster typography
- **Physical product design**: Packaging, industrial design, material textures
- **Film & cinematography**: Color grading, framing, mood, title sequences
- **Fashion**: Color stories, seasonal palettes, texture combinations
- **Data visualization**: Information density approaches, chart aesthetics
- **Vintage graphic design**: Mid-century modern, art nouveau, constructivism
- **Cultural & regional design**: Japanese minimalism, Scandinavian functional, Latin American vibrancy
- **Nature & science**: Organic forms, crystalline structures, topographic patterns

**Design Provocation Step:** Before creating concepts, find 2-3 unexpected visual references from *outside digital design* that connect to the project's emotional goals from the Design Intent Interview. Document why each reference connects to the user's stated feelings.

### Step 4: Mood Board Creation

**PHASE GATE: The mood board MUST be created and saved to disk before any concept work begins.** The mood board is the shared design foundation that all three concept subagents will reference.

**IMPORTANT: Mood boards MUST be visual HTML files, NOT markdown.**

Mood boards should include:
1. **Color Palette**: Actual color swatches with hex values and usage descriptions
2. **Typography Samples**: Real text at different sizes showing the font in use
3. **Spacing Scale**: Visual representation of spacing units
4. **Component Examples**: Interactive examples showing hover states, transitions
5. **Non-Digital References**: Screenshots/descriptions of the inspiration sources from outside digital design
6. **Design Rationale**: Why these choices support user jobs and the emotional targets from the Design Intent Interview

**Format**: Static HTML file (save as `.html`, NOT `.md`)

**DO NOT hardcode a specific theme into the template.** Let the project context, emotional targets, and references determine whether it's dark, light, warm, cool, etc.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mood Board - [Project Name]</title>
  <!-- Choose fonts based on project context, NOT defaults -->
  <style>
    /* Let the mood board's own aesthetic reflect the design direction */
    /* The mood board itself should FEEL like the concept */
  </style>
</head>
<body>
  <h1>Mood Board - [Project Name]</h1>

  <section>
    <h2>Emotional Targets</h2>
    <!-- The 3 adjectives from Design Intent Interview -->
    <!-- Non-digital reference and why it connects -->
  </section>

  <section>
    <h2>Color Palette</h2>
    <!-- Actual rendered swatches, not just hex codes -->
  </section>

  <section>
    <h2>Typography</h2>
    <!-- Real text rendered at size, not described -->
  </section>

  <section>
    <h2>Visual References</h2>
    <!-- Mix of digital and non-digital inspiration -->
    <!-- Explain WHY each reference connects to the emotional targets -->
  </section>

  <section>
    <h2>Component Examples</h2>
    <!-- Interactive examples with hover states -->
  </section>
</body>
</html>
```

**After saving the mood board file**, confirm the file path and proceed to lens selection. Do NOT skip ahead to concept creation.

### Step 5: Lens Selection

#### The Design Lens System

Instead of always producing "Safe / Bold / Experimental" archetypes, select conceptual lenses that are appropriate to the project. Each lens produces a fundamentally different design approach.

**Select 3 lenses from the categories below** based on the project context, emotional targets, and user inputs. Mix across categories for maximum variety.

#### Aesthetic Lenses
| Lens | Character | Good For |
|------|-----------|----------|
| **Swiss/International** | Grid-precise, rational, typographic hierarchy | Data-heavy tools, dashboards, professional SaaS |
| **Editorial** | Magazine-like, asymmetric, bold typography, white space | Content platforms, portfolios, storytelling |
| **Brutalist** | Raw, honest, unconventional layouts, monospace | Developer tools, creative agencies, statements |
| **Japanese Minimal** | Generous white space, restraint, subtle detail | Wellness, luxury, meditation, premium products |
| **Retro-Futurism** | Vintage-meets-modern, neon, CRT aesthetics | Gaming, creative tools, entertainment |
| **Organic/Natural** | Soft shapes, earth tones, flowing layouts | Health, sustainability, community platforms |
| **Neo-Deco** | Geometric patterns, gold accents, dramatic contrast | Finance, luxury, high-end e-commerce |
| **Glassmorphism** | Frosted glass, depth, layered translucency | Modern dashboards, music apps, creative tools |
| **Scandinavian Functional** | Warm neutrals, clean lines, accessible, cozy | E-commerce, home, lifestyle, productivity |

#### Interaction Model Lenses
| Lens | Character | Good For |
|------|-----------|----------|
| **Single-Page Flow** | Everything on one scroll, progressive reveal | Landing pages, onboarding, simple tools |
| **Card-Based** | Modular, scannable, rearrangeable | Dashboards, content feeds, project management |
| **Sidebar Navigation** | Persistent nav, workspace feel, power-user | Complex apps, admin panels, dev tools |
| **Bottom Sheet Mobile** | Thumb-friendly, layered sheets, gesture-driven | Mobile-first, consumer apps |
| **Command Palette** | Keyboard-driven, search-first, minimal chrome | Developer tools, power-user apps |
| **Conversational** | Chat-like, step-by-step, guided | Onboarding, support, AI interfaces |

#### Content Strategy Lenses
| Lens | Character | Good For |
|------|-----------|----------|
| **Data-Dense** | High information density, compact, scannable | Analytics, trading, monitoring |
| **Story-Driven** | Narrative scroll, chapters, visual storytelling | Marketing, case studies, annual reports |
| **Tool/Utility** | Minimal chrome, content is the interface | Editors, calculators, code tools |
| **Discovery** | Browse-first, visual grid, serendipity | Marketplaces, media, social platforms |

#### How to Select Lenses

1. Review the Design Intent Interview answers
2. Consider the product type and user context
3. Pick 3 lenses that are **meaningfully different from each other**
4. At least one should feel like a stretch — unexpected but defensible
5. Announce your lens selections to the user before building concepts

**Example:**
> For a healthcare appointment booking app where the user said "calm, trustworthy, effortless" and referenced "a well-organized pharmacy":
> - **Lens 1: Scandinavian Functional** — warm, accessible, clean
> - **Lens 2: Japanese Minimal** — serene, spacious, premium
> - **Lens 3: Conversational** — guided, step-by-step, approachable

Each lens produces a concept that feels like it was designed by a different designer with a different philosophy.

---

## Phase 2: Parallel Concept Generation

### Step 6: Creating Concepts via Subagents

**CRITICAL: Use the Agent tool to launch 3 subagents in parallel — one per lens.** All three Agent tool calls MUST be made in a single message so they run concurrently.

Before launching subagents, prepare the shared context that each one needs:
1. The **mood board file path** (from Step 4)
2. The **design intent** (emotional targets, non-digital reference, anti-reference, design hero)
3. Key **research insights** (personas, design principles, user jobs)
4. The **design challenge** (what problem, for whom, constraints)
5. The **fidelity level** (wireframes, mockups, or high-fi prototypes)
6. The **output file path** for each concept
7. The **concept number** (1, 2, or 3)

#### Subagent Prompt Template

Use this template for each of the 3 Agent tool calls. Fill in the bracketed values. Each subagent receives `subagent_type: "general-purpose"`.

```
You are a concept designer creating ONE design concept for a project. You must create a complete, standalone design artifact.

## Your Assignment
- **Concept number**: [1, 2, or 3]
- **Design lens**: [The specific lens name and category, e.g., "Scandinavian Functional (Aesthetic)"]
- **Lens character**: [Brief description of the lens character from the lens table]

## Design Foundation
Read the mood board file at: [absolute path to mood board HTML file]
This mood board establishes the shared design language. Your concept should build on this foundation while expressing it through your assigned lens.

## Design Context
- **Design challenge**: [What problem are we solving? For whom?]
- **Emotional targets**: [The 3 adjectives from the Design Intent Interview]
- **Non-digital reference**: [What they said]
- **Anti-reference**: [What to avoid]
- **Design hero**: [Aesthetic inspiration]
- **Key research insights**: [Summarize 2-3 key insights from personas/research]
- **Constraints**: [Brand guidelines, technical constraints, etc.]

## Fidelity & Format
- **Fidelity level**: [wireframes / mockups / high-fi prototypes]
- **Format**: [HTML file / JSX file — based on fidelity]

## Requirements
Your concept MUST:
- Name its design lens explicitly in annotations/comments within the file
- Explain the strategic rationale (not just aesthetic choices)
- Connect back to the emotional targets from the Design Intent Interview
- Use a DIFFERENT font family from overused defaults (no Inter, Roboto, Arial, Space Grotesk)
- Use a cohesive color approach that fits the lens
- Annotate key decisions with WHY, tied to research insights
- Use realistic content, NOT Lorem Ipsum
- Consider responsive behavior
- Verify color contrast meets minimum standards (4.5:1 for text)

## Typography — Choose distinctive fonts:
- Serif: Fraunces, Newsreader, Lora, Crimson Pro
- Display: Cabinet Grotesk, Clash Display, General Sans, Plus Jakarta Sans
- Monospace: JetBrains Mono, Fira Code, IBM Plex Mono
- Sans-serif: Satoshi, Syne, Manrope, DM Sans, Outfit

## Color & Theme — Commit to a cohesive aesthetic:
- Dominant + Accent: 80% one color family, 20% sharp contrast
- Monochrome + single hue: Grayscale with one bold color for CTAs
- Cultural aesthetics: Draw from the lens character
- AVOID: Purple gradients on white, generic blue + gray, pastel everything

## Motion — Focus on high-impact moments:
- Page load orchestration with staggered reveals
- Transition between major states
- Hover effects on key interactive elements

## Backgrounds — Create atmosphere:
- Gradient meshes, noise textures, geometric patterns
- Radial gradients, layered gradients, backdrop filters

## Output
Save the concept file to: [absolute path, e.g., docs/design/{feature-name}-concepts-{MMDDYY}/{feature-name}-concept-[N]-{lens-name}.html]

IMPORTANT: Write the COMPLETE file. Do not leave placeholder sections. This must be a fully realized concept that can be opened in a browser and evaluated.
```

#### Launching the Subagents

**All 3 Agent calls MUST appear in a single message.** This ensures they run in parallel. Example:

```
Use the Agent tool three times in one message:
  Agent 1: description="Concept 1: [lens-name]", subagent_type="general-purpose", prompt=[filled template for lens 1]
  Agent 2: description="Concept 2: [lens-name]", subagent_type="general-purpose", prompt=[filled template for lens 2]
  Agent 3: description="Concept 3: [lens-name]", subagent_type="general-purpose", prompt=[filled template for lens 3]
```

**After all 3 subagents complete**, read each concept file to verify they were created successfully, then proceed to Step 7.

#### Single Concept Mode

When creating only 1 concept (refinement, iteration, minor updates), skip the subagent approach and create the concept directly in the main agent context.

### Step 7: Presentation

#### File Organization

**Organize all deliverables by feature/assignment in dated folders:**

```
docs/design/{feature-name}-concepts-{MMDDYY}/
├── {feature-name}-mood-board.html
├── {feature-name}-concept-1-{lens-name}.html or .jsx
├── {feature-name}-concept-2-{lens-name}.html or .jsx
├── {feature-name}-concept-3-{lens-name}.html or .jsx
└── {feature-name}-overview.md
```

**Feature Name Guidelines:**
- Use kebab-case (lowercase with hyphens)
- Ask the user for the feature name if not provided

#### Design Concept Document

**File**: `{feature-name}-overview.md`

```markdown
# [Project Name] Design Concepts

## Design Challenge
[What problem are we solving? Who for? Why now?]

## Design Intent
- **Emotional targets**: [3 adjectives]
- **Non-digital reference**: [What they said and why it matters]
- **Anti-reference**: [What to avoid]
- **Design hero**: [Aesthetic inspiration]

## Key Research Insights
1. [Insight that informs these concepts]
2. [Another key insight]

## Concept 1: [Name] — [Lens Name]
**Lens**: [Which design lens and why it fits]
**Approach**: [High-level strategy]
**Strengths**: [What this does well]
**Tradeoffs**: [What this sacrifices]
[Link to prototype/mockup]

## Concept 2: [Name] — [Lens Name]
...

## Concept 3: [Name] — [Lens Name]
...

## Recommendation
[If asked: Which concept to pursue and why]

## Next Steps
- [ ] Gather feedback from [stakeholders]
- [ ] Test [specific assumption] with users
- [ ] Refine chosen direction into implementation
```

---

## Quality Criteria

### Excellent Concepts:
- **Three distinct directions** using different design lenses (for initial exploration)
- **Tied to research**: Design decisions directly address user jobs/pain points
- **Connected to emotional targets**: Each concept clearly maps to the Design Intent Interview
- **Strategically different**: Each explores a meaningfully different approach
- **Appropriate fidelity**: Level of detail matches the questions being answered
- **Annotated**: Key decisions are explained with WHY, not just shown
- **Realistic**: Use real or realistic content, not Lorem Ipsum
- **Accessible baseline**: Even concepts consider color contrast, text size
- **Responsive-aware**: Show how designs adapt to different screens (if relevant)

### Excellent Mood Boards:
- **Cohesive**: Each direction feels unified and intentional
- **Distinctive**: Different directions are clearly different
- **Cross-disciplinary**: Include non-digital inspiration sources
- **Emotionally grounded**: Tied to the Design Intent Interview adjectives
- **Annotated**: Explain WHY these visuals, not just WHAT they are

## Common Pitfalls to Avoid

### Designing in a Vacuum
**Problem**: Creating concepts without reviewing research or existing materials
**Instead**: Start every concept by reviewing personas, design principles, and competitive analysis

### Concepts That Look Identical
**Problem**: Three concepts that only differ in color or button shape
**Instead**: Use different design lenses — different information architecture, navigation models, interaction patterns, content priorities

### The Same 3 Archetypes Every Time
**Problem**: Always producing "Safe/Polished, Bold/Dark, Experimental/Brutalist"
**Instead**: Use the lens system. A healthcare app and a gaming platform should NOT get the same three archetypes. Let the project context drive lens selection.

### Mood Board Echo Chamber
**Problem**: Only pulling from Dribbble/Behance, which produces sameness
**Instead**: Include references from architecture, print, film, fashion, nature. The non-digital reference from the Design Intent Interview should appear in the mood board.

### Premature Pixel-Perfect Polish
**Problem**: Spending hours on shadows/gradients before validating the approach
**Instead**: Match fidelity to the question - use low-fi until direction is validated

### Lorem Ipsum Syndrome
**Problem**: Using placeholder text that hides content design problems
**Instead**: Use realistic content that exposes real layout and hierarchy challenges

### Missing the "Why"
**Problem**: Beautiful designs with no explanation of decisions
**Instead**: Annotate key decisions with rationale tied to research insights and emotional targets

### Ignoring Technical Feasibility
**Problem**: Concepts requiring tech that doesn't exist or can't be built in timeline
**Instead**: Check technical constraints early, design within feasible boundaries

### Skipping the Mood Board
**Problem**: Jumping straight to concept creation without establishing a shared foundation
**Instead**: Always complete the mood board first. It ensures all concepts share a cohesive design language and gives subagents the context they need to produce coherent work.

## Design Patterns Library

**Navigation Patterns**: Tab bars, hamburger menu, bottom sheets, breadcrumbs, command palette, sidebar
**Form Patterns**: Inline validation, progressive disclosure, smart defaults, multi-step wizards
**Content Patterns**: Cards, lists, grids, feeds, masonry, editorial columns
**Feedback Patterns**: Toast notifications, modal dialogs, skeleton screens, empty states

## Integration Points

### Inputs
- **Design Research**: Personas, design principles, user insights, competitive analysis
- **Product/PM**: Feature requirements, business goals, timeline constraints
- **Engineering**: Technical constraints, API capabilities, performance requirements
- **Brand/Marketing**: Brand guidelines, messaging, visual identity

### Outputs
- **Engineering**: Validated direction to implement directly
- **Product/PM**: Visual artifacts to communicate product vision
- **Marketing**: Visual concepts for early marketing/PR materials

### Related Skills
- Use **design-research** artifacts (personas, principles) to inform concepts
- Use **design-qa** to review implemented designs against concepts

## Validation Checklist

Before delivering concept artifacts, verify:
- [ ] Conducted Design Intent Interview (or used brief as proxy)
- [ ] Gathered inspiration from diverse sources (not just Dribbble)
- [ ] Created mood board HTML file and saved to disk BEFORE concept work
- [ ] Selected 3 design lenses appropriate to the project context
- [ ] **For initial exploration**: Launched 3 subagents in parallel, one per lens
- [ ] **For refinement**: Focused on iterating 1 chosen concept based on feedback
- [ ] Each concept uses a different font family and color approach
- [ ] Each concept is annotated with rationale tied to research and emotional targets
- [ ] Used realistic content, not Lorem Ipsum
- [ ] Checked responsive behavior for mobile/tablet
- [ ] Verified color contrast meets minimum standards (4.5:1 for text)
- [ ] Created overview document comparing concepts
- [ ] Clearly communicated next steps and decisions needed
