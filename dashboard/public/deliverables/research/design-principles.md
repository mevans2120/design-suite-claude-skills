# Design Principles - Design Dashboard

**Project**: Design Dashboard
**Date**: October 22, 2025
**Skill**: design-research

---

## Principle 1: Context Before Details

**Statement**: Show goals, principles, and insights prominently before diving into deliverables

**Description**: Users need to understand "why" before they can make sense of "what." The dashboard prioritizes design rationale, goals, and key insights at the top of every project view, with deliverables following after context is established.

**Rationale**: All four personas expressed frustration with "diving into details without understanding the big picture." Executives need strategic context, PMs need alignment rationale, engineers need intent understanding, and designers need decision history. Without context first, deliverables are just files.

**Examples**:
- ✅ **Do**: Display project goals, design principles, and key insights at the top of project detail page
- ✅ **Do**: Include rationale with every design principle
- ✅ **Do**: Show summary before full document links
- ❌ **Don't**: Jump straight to file lists without context
- ❌ **Don't**: Hide design rationale in buried documentation

---

## Principle 2: Summaries with Easy Depth

**Statement**: Never force users to open full documents to understand content

**Description**: Provide meaningful 2-3 sentence summaries for every deliverable that capture key takeaways. Make full documentation one click away for users who need depth, but ensure summaries are self-sufficient for quick understanding.

**Rationale**: Marcus (PM) and Alex (Executive) explicitly stated they don't have time to open every file. Jen (Engineer) needs quick validation before diving deep. Sarah (Designer) wants to scan quickly and only dig into issues. The dashboard respects users' time while providing depth on demand.

**Examples**:
- ✅ **Do**: Show persona count and key characteristics in summary
- ✅ **Do**: Preview first design principle on cards
- ✅ **Do**: Display QA issue count and severity in summary
- ✅ **Do**: "View Full Document" button clearly visible
- ❌ **Don't**: Show only file names without summaries
- ❌ **Don't**: Require opening files to understand content
- ❌ **Don't**: Use vague summaries like "Design principles document"

---

## Principle 3: Status Transparency

**Statement**: Always show project status and last updated date

**Description**: Users should never wonder "is this current?" or "is this the latest version?" Every project card and detail view displays current status (Research/Concepts/Production/QA/Complete) and last updated timestamp prominently.

**Rationale**: Trust erosion happens when users can't tell if information is current. All personas mentioned uncertainty about which files are "source of truth." Sarah worries about outdated work being referenced. Jen needs to know if specs are final. Transparency builds trust.

**Examples**:
- ✅ **Do**: Show "Status: Production | Updated: 2 days ago" on every project
- ✅ **Do**: Use color-coded status indicators (green = active, gray = complete)
- ✅ **Do**: Show deliverable creation dates
- ✅ **Do**: Display phase indicators (Research → Concepts → Production → QA)
- ❌ **Don't**: Show undated or unversioned content
- ❌ **Don't**: Hide project status in settings
- ❌ **Don't**: Use ambiguous status language

---

## Principle 4: Design-Focused with Context Awareness

**Statement**: Stay focused on design artifacts and decisions, while acknowledging the broader project ecosystem

**Description**: The Design Dashboard is laser-focused on design work - artifacts, rationale, principles, and creative decisions. It acknowledges that design work exists within a larger project context (PM, engineering, business), but doesn't try to be everything to everyone. Simple links to related tools (PM dashboard, code repos, etc.) provide context without diluting the design focus.

**Rationale**: The dashboard succeeds by doing one thing well: making design work visible and accessible. Sarah (Designer), Marcus (PM), Jen (Engineer), and Alex (Executive) all need design information, not project management features. When users need project execution details, a simple link to the appropriate tool is sufficient.

**Examples**:
- ✅ **Do**: Focus exclusively on design deliverables, principles, and rationale
- ✅ **Do**: Show design status and progression (Research → Concepts → Production → QA)
- ✅ **Do**: Include simple links to related tools (footer or nav: "View in PM Dashboard", "View Code")
- ✅ **Do**: Acknowledge engineering constraints in design specs
- ❌ **Don't**: Build task lists, sprint planning, or timeline features
- ❌ **Don't**: Track team assignments or project schedules
- ❌ **Don't**: Duplicate functionality that belongs in other tools

---

## Principle 5: Design Work is Storytelling

**Statement**: Organize deliverables chronologically by phase to tell the design story

**Description**: Design is a journey from Research → Concepts → Production → QA. The dashboard organizes deliverables in this narrative flow, helping users understand how insights led to concepts, concepts led to specs, and specs were validated through QA. The story creates understanding and builds confidence in design decisions.

**Rationale**: All personas benefit from understanding the design progression. Sarah wants to see the thought process. Marcus needs to explain how research informed decisions. Jen wants to understand why designs evolved. Alex wants to see strategic progression. Chronological storytelling makes the design process transparent and comprehensible.

**Examples**:
- ✅ **Do**: Group deliverables by phase (Research, Concepts, Production, QA)
- ✅ **Do**: Show phases in order on project detail page
- ✅ **Do**: Use visual indicators for design progression
- ✅ **Do**: Make the narrative flow clear and intuitive
- ❌ **Don't**: Mix deliverables from different phases randomly
- ❌ **Don't**: Sort only by date without phase context
- ❌ **Don't**: Hide the connection between research insights and final decisions

---

## How to Apply These Principles

When designing any feature or making layout decisions, ask:

1. **Context Before Details**: Does this show "why" before "what"?
2. **Summaries with Easy Depth**: Can users understand this without opening files?
3. **Status Transparency**: Is it crystal clear how current this is?
4. **Design-Focused**: Are we staying focused on design work without feature creep?
5. **Design Work is Storytelling**: Does this flow tell the design story?

If the answer to any question is "no," revisit the design.

## Principles Hierarchy

All five principles are equal priority for Phase 1. They work together to create a design dashboard that:
- Makes design work visible and accessible
- Respects users' time and intelligence
- Builds trust through transparency
- Stays focused on its core mission

These principles should guide all design and development decisions for the dashboard.
