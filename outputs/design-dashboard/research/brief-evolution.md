# Brief Evolution - Design Dashboard

**Date**: October 22, 2025
**Version**: 1.0 → 1.1
**Phase**: Research Iteration

---

## What Changed

During the initial research phase, we discovered a critical insight that changed the product direction:

**Original Vision**: Dashboard as a **file organization system** with links to design documents

**Evolved Vision**: Dashboard as a **visual design review hub** with inline display of design work

---

## Why This Matters

### The Discovery

While planning the design-concepts phase, we realized:
1. **Design is inherently visual** - text summaries alone don't communicate design work effectively
2. **Review friction kills momentum** - opening external files for every review creates barriers
3. **Context requires visuals** - stakeholders need to SEE the work, not just read about it
4. **Central review hub** - all visual design work should be reviewable in one place

### Research Insight That Drove This

From our personas research:
- **Sarah (Designer)** needs to quickly scan design work across projects
- **Marcus (PM)** needs to share visual progress with stakeholders
- **Alex (Executive)** needs to see design quality and direction at a glance
- **Jen (Engineer)** needs visual specs alongside technical documentation

All four personas benefit more from **inline visual content** than from links to files.

---

## What's New in Version 1.1

### Added: Visual Review Capabilities

**Core Feature #7**: Visual Review Capabilities
- Inline mood board display with colors, typography, references
- Embedded wireframes/mockups viewable without external tools
- Side-by-side concept comparison
- Image galleries for visual deliverables
- Responsive preview for different viewports

### Updated: Deliverable Collection

**Before**: Summary/excerpt view with "View Full Document" links

**After**:
- Visual content displayed inline (mood boards, wireframes, mockups, screenshots)
- Text summaries with "View Full Document" for detailed docs
- Image/asset preview in summary cards

### Updated: Data Model

Added `visualAssets` to deliverables:
```json
{
  "visualAssets": {
    "colorPalette": ["#hex", "#hex"],
    "images": ["/path/to/image.png"],
    "preview": "/path/to/preview.png",
    "type": "mood-board" | "wireframe" | "mockup" | "screenshot"
  }
}
```

### Updated: Integration Points

**Before**: Links to full design artifacts (markdown, HTML, React files)

**After**:
- **Embeds** visual content inline (HTML wireframes, React components, images)
- Links to full design artifacts for detailed documentation
- Image/asset storage in outputs directory, referenced by URL

---

## Design Principles Implications

This change reinforces our existing principles:

**✅ Context Before Details**: Visuals provide instant context
- Mood boards show visual direction immediately
- Wireframes communicate layout without reading specs
- Concept thumbnails show all directions at once

**✅ Summaries with Easy Depth**: Visual previews are the ultimate summary
- One image conveys what paragraphs of text cannot
- Click through for full details only when needed
- Progressive disclosure: thumbnail → preview → full document

**✅ Status Transparency**: Visuals make progress instantly visible
- Stakeholders can SEE progress, not just read about it
- Quality is evident from visuals
- Gaps are obvious when visuals are missing

**✅ Design-Focused with Context Awareness**: Stays true to design focus
- Dashboard becomes THE place for design review
- Doesn't duplicate PM features - enhances design-specific workflows
- Acknowledges engineering needs (specs) while prioritizing visual review

**✅ Design Work is Storytelling**: Visuals tell the story better
- Research insights → Concept visuals → Production specs → QA screenshots
- The journey is clear through visual progression
- Design rationale is evident in visual evolution

---

## Technical Implications

### Assets to Support

1. **Images**: PNG, JPG, WebP for mockups, screenshots, references
2. **Color Palettes**: Hex codes for inline color swatch display
3. **HTML/CSS**: Embedded wireframes and prototypes
4. **React Components**: Interactive concept demonstrations
5. **Markdown**: Enhanced with inline images

### Storage Pattern

```
outputs/
└── [project-id]/
    ├── research/
    │   └── assets/  (if needed for diagrams)
    ├── concepts/
    │   └── assets/
    │       ├── mood-board-preview.png
    │       ├── ref-linear.png
    │       ├── wireframe-v1.png
    │       └── concept-direction-a.png
    ├── production/
    │   └── assets/
    │       ├── component-specs/
    │       └── screen-designs/
    └── qa/
        └── assets/
            ├── before-screenshots/
            └── after-screenshots/
```

### Dashboard Implementation Changes

- Image loading and optimization
- Lightbox/modal for full-size image viewing
- Gallery components for multi-image deliverables
- Color palette display component
- Responsive image sizing
- Progressive loading (thumbnails first)

---

## Next Steps

With this evolved vision, the research phase deliverables now include:

1. **✅ User Personas** - Validated that all personas benefit from visual content
2. **✅ Design Principles** - Reinforced by visual review capability
3. **✅ Key Insights** - Add insight about visual review importance
4. **⏭️ Update Dashboard Data Model** - Add visualAssets support
5. **⏭️ Proceed to Concepts** - Create actual visual deliverables with this new capability

---

## Validation Questions

Before proceeding to concepts phase:

- [ ] Does the updated brief accurately reflect the visual review direction?
- [ ] Are there any technical constraints we need to consider for visual content?
- [ ] Should we add any specific visual content types beyond what's listed?
- [ ] Do we need to update success criteria to include visual content quality metrics?

---

**This evolution is a perfect example of research informing design**: we discovered user needs that shaped the product direction, making the dashboard more valuable and aligned with how design work actually happens.
