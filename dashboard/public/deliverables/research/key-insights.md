# Key Insights - Design Dashboard Research

**Project**: Design Dashboard
**Date**: October 22, 2025
**Skill**: design-research

---

## Executive Summary

Research reveals a critical visibility gap in design workflow: design work is valuable but invisible. Four distinct user personas share a common pain point - they can't see what design work is happening, understand design rationale, or access artifacts without hunting or interrupting designers. The Design Dashboard must bridge this gap by making design work visible, contextual, and accessible to all stakeholders while respecting different information needs.

---

## Insight 1: The Visibility Paradox

**Finding**: Design work is valuable and impacts product success, yet it remains invisible to most stakeholders until explicitly shared.

**Evidence**:
- All four personas expressed frustration with design feeling like a "black box"
- Stakeholders can't see current design direction without asking
- Design work scattered across folders with no unified view
- Executives can't assess design progress or investment
- "Design work invisible until explicitly shared" cited as primary pain point

**Implication**: The dashboard's primary job is making design work visible by default. This isn't about sharing more files - it's about surfacing design work in a structured, discoverable way that respects different user needs.

**Design Impact**:
- Auto-populate dashboard from design skills
- Clear project status and phase indicators
- Active vs. Complete project filtering
- Real-time updates when deliverables are created

---

## Insight 2: Context is King, Files are Not

**Finding**: Users don't need more files - they need to understand "why" behind design decisions. Context (goals, principles, insights, rationale) is more valuable than artifacts alone.

**Evidence**:
- Marcus (PM): "I don't need to be a design expert, but I do need to understand why we're making these choices"
- Jen (Engineer): "Why did we make this choice?" is her most common question
- Sarah (Designer): "Design decisions get lost or forgotten over time"
- Alex (Executive): "Show me what problems we're solving, what our design strategy is"

**Implication**: Design artifacts without context are just files. Every deliverable needs accompanying rationale. Design principles and key insights deserve equal (or greater) prominence than deliverable links.

**Design Impact**:
- Context (goals, principles, insights) before deliverables in layout
- Rationale included with every design principle
- Summary cards explain "what" and "why"
- No naked file links - always with context

---

## Insight 3: One Dashboard, Four Jobs

**Finding**: The same dashboard serves four completely different jobs-to-be-done, requiring flexible information architecture that adapts to user needs.

**User Jobs**:
1. **Sarah (Designer)**: "Show me all active design work at a glance" - oversight
2. **Marcus (PM)**: "Give me context to explain design direction" - communication
3. **Jen (Engineer)**: "Show me what I need to build and where to find details" - implementation
4. **Alex (Executive)**: "Give me executive summary of design efforts" - strategic assessment

**Implication**: Dashboard can't optimize for just one persona. Must provide multiple entry points and levels of detail - summaries for executives/PMs, details for engineers/designers.

**Design Impact**:
- Progressive disclosure architecture (summaries → details)
- Multiple navigation paths (by project, by status, by phase)
- Flexible detail levels (executive summary vs. technical specs)
- Role-appropriate defaults with deep-dive options

---

## Insight 4: Self-Service is Respect

**Finding**: All personas want to find design information themselves without interrupting designers. Current workflow creates constant interruptions.

**Evidence**:
- Jen: "Avoid unnecessary back-and-forth with designers"
- Marcus: "Designers are busy, doesn't want to interrupt them constantly"
- Sarah: "Enable team to work autonomously"
- "Hunting for artifacts" mentioned by all personas as pain point

**Implication**: The dashboard succeeds when it reduces questions designers receive. Comprehensive, accessible information = fewer interruptions = more design time.

**Design Impact**:
- Search within projects
- Clear file organization by phase
- Comprehensive summaries
- "View Full Document" links always visible
- Design principles and rationale easily accessible

---

## Insight 5: Trust Requires Transparency

**Finding**: Users lose trust when they can't tell if information is current, accurate, or authoritative. Status ambiguity erodes confidence.

**Evidence**:
- "Which design file is the source of truth?" - Jen's common question
- "Can't assess design progress or quality" - Alex's frustration
- "Design decisions get lost or forgotten" - Sarah's concern
- "Unclear what design artifacts exist" - Marcus's pain point

**Implication**: Every piece of information needs status indicators: when created, when updated, what phase, who created it, is it final? Transparency builds trust.

**Design Impact**:
- Prominent status indicators (Research/Concepts/Production/QA/Complete)
- Last updated timestamps on everything
- Phase indicators on all deliverables
- Clear visual distinction between active and complete projects
- Creation dates on all deliverables

---

## Insight 6: Summaries Enable Scanning, Details Enable Work

**Finding**: Users need both high-level summaries (for scanning/decision-making) and detailed documentation (for implementation/deep work). One without the other fails.

**Evidence**:
- Alex needs executive summaries, not technical details
- Jen needs precise technical specs for implementation
- Marcus needs summaries to communicate, details to validate
- Sarah needs summaries for oversight, details for quality review

**Implication**: Dashboard must provide meaningful summaries that enable quick understanding while ensuring full documentation is one click away. Summaries aren't just "short" - they're strategically crafted to answer key questions.

**Design Impact**:
- 2-3 sentence summaries that capture key takeaways
- Summary templates per deliverable type (personas: count + characteristics, QA: issue count by severity)
- "View Full Document" clearly visible on all cards
- Summary cards are scannable, not just truncated text

---

## Insight 7: Design Tells a Story (Research → Concepts → Production → QA)

**Finding**: Understanding design decisions requires understanding the progression from research insights → concept exploration → production specs → quality validation.

**Evidence**:
- Marcus needs to explain "how research informed decisions"
- Jen wants to "understand why designs evolved"
- Alex wants to see "strategic progression"
- Sarah wants to see "the thought process"

**Implication**: Chronological organization by phase isn't just filing - it's storytelling. Users need to trace the path from insight to decision to execution.

**Design Impact**:
- Deliverables grouped by phase (Research, Concepts, Production, QA)
- Phases displayed in order (tells the story)
- Visual progression indicators
- Easy navigation through the design journey

---

## Insight 8: Different Tools for Different Jobs

**Finding**: Design Dashboard and PM Dashboard serve complementary but distinct purposes. Users need both but for different reasons.

**Evidence**:
- Brief explicitly states: "While PM dashboard handles project execution, Design Dashboard focuses on design artifacts, rationale, and creative decisions"
- Marcus needs both but switches between them for different tasks
- Confusion happens when functionality overlaps

**Implication**: Dashboard must stay focused on design artifacts and rationale. Link to PM dashboard for execution details, never duplicate PM functionality.

**Design Impact**:
- Prominent PM Dashboard links
- No task lists, sprint planning, or team assignments in Design Dashboard
- Focus exclusively on design deliverables, principles, rationale, and quality
- Clear differentiation in positioning

---

## Research Recommendations

Based on these insights, Phase 1 priorities should be:

1. **Make Design Work Visible** - Auto-population from skills, clear status indicators
2. **Context Before Content** - Goals, principles, insights prominent
3. **Progressive Disclosure** - Summaries enable scanning, links enable depth
4. **Self-Service First** - Comprehensive information reduces designer interruptions
5. **Stay in Our Lane** - Focus on design, link to PM for execution

---

## Insight 9: Visual Content is Critical for Design Communication

**Finding**: Design work cannot be effectively communicated through text summaries alone. Visual content (mood boards, wireframes, mockups, screenshots) must be displayed inline for stakeholders to understand and review design work.

**Evidence**:
- During concepts planning, realized that asking stakeholders to open external files creates review friction
- All four personas need to SEE design work, not just read about it:
  - Sarah scans visually across projects
  - Marcus shares visual progress with stakeholders
  - Alex assesses design quality through visuals
  - Jen needs visual specs alongside technical docs
- **Design is inherently visual** - one wireframe communicates more than paragraphs of text

**Implication**: The dashboard must be a **visual design review hub**, not just a file organization system. This means:
- Inline mood board display with colors, typography, references
- Embedded wireframes/mockups viewable without external tools
- Side-by-side concept comparison for direction selection
- Image galleries for visual deliverables
- Responsive preview capabilities

**Design Impact**:
- Data model must support visual assets (images, colors, previews)
- Dashboard components for image galleries, color palettes, embedded content
- Progressive loading for performance (thumbnails → full res)
- Lightbox/modal for full-size viewing
- Asset storage in outputs directory structure

**Brief Evolution**: This insight led to updating the brief from v1.0 to v1.1, adding "Visual Review Capabilities" as core feature #7. See `brief-evolution.md` for details.

---

## Validation Needed

Before building, validate these assumptions:

1. Will skill auto-population actually reduce manual overhead?
2. Are 2-3 sentence summaries sufficient for scanning decisions (when paired with visual previews)?
3. Do users actually want chronological/phase organization or prefer other mental models?
4. Is desktop-first appropriate for all personas' workflows?
5. **What visual content formats are most important** (static images vs. interactive HTML)?
6. **What's the acceptable file size** for visual assets (balance quality vs. load time)?

Recommend lightweight prototype testing with one representative from each persona before full build.
