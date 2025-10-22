# Design Dashboard - Product Brief

**Version**: 1.1
**Date**: October 22, 2025
**Status**: Research - Iterating on Visual Review Capability  

---

## Executive Summary

A dedicated design dashboard that serves as both a portfolio showcase and **central design review hub** for active design projects. The dashboard automatically collects design deliverables from Claude design skills, **displays visual content inline** (mood boards, wireframes, mockups), and provides visibility into design goals, principles, and decisions across the organization.

**Key Differentiator**: While the PM dashboard handles project execution (tasks, sprints, timelines), the Design Dashboard is a **visual design review platform** - making design work visible, reviewable, and accessible without opening external files.

---

## Problem Statement

**Current State**: Design deliverables (personas, concepts, specs, QA reports) are created by design skills but scattered across outputs folder with no unified view or context.

**Pain Points**:
- Stakeholders can't easily see current design direction or decisions
- Developers hunt for relevant specs during implementation
- Designers lose track of research insights across projects
- No single place to understand "why" behind design choices
- Design work invisible until explicitly shared

**Desired State**: A centralized dashboard where all design work is visible, organized, and accessible with appropriate context for different audiences.

---

## User Personas & Jobs-to-be-Done

### Persona 1: Sarah - Lead Designer
**Job**: Maintain oversight of design work across multiple projects
- **Functional**: Review design work, track decisions, ensure consistency
- **Emotional**: Feel confident all design work meets quality bar
- **Social**: Demonstrate design value to leadership

**Dashboard Job**: "Show me all active design work and key decisions at a glance"

### Persona 2: Marcus - Product Manager
**Job**: Understand design direction to align product roadmap and communicate to stakeholders
- **Functional**: Access design rationale, share with stakeholders, validate against requirements
- **Emotional**: Feel informed and able to answer stakeholder questions
- **Social**: Demonstrate progress to executives

**Dashboard Job**: "Give me the context I need to explain our design direction"

### Persona 3: Jen - Software Engineer
**Job**: Implement designs accurately during development sprints
- **Functional**: Find relevant specs, understand edge cases, check design decisions
- **Emotional**: Feel confident implementation matches intent
- **Social**: Avoid back-and-forth with designers

**Dashboard Job**: "Show me what I need to build and where to find details"

### Persona 4: Alex - Executive Stakeholder
**Job**: Understand design investment and validate strategic direction
- **Functional**: See design progress, understand key decisions, assess quality
- **Emotional**: Feel confident in design direction
- **Social**: Make informed decisions in leadership meetings

**Dashboard Job**: "Give me the executive summary of our design efforts"

---

## Scope Definition

### Phase 1 (MVP) - IN SCOPE

#### Core Features
1. **Project Overview**
   - Project name, description, status (Research/Concepts/Production/QA/Complete)
   - Design goals and objectives
   - Design principles for this project
   - Link to related PM dashboard project

2. **Deliverable Collection & Visual Display**
   - Auto-populated from design skills outputs
   - Organized by skill/phase (Research → Concepts → Production → QA)
   - **Visual content displayed inline** (mood boards, wireframes, mockups, screenshots)
   - Text summaries with "View Full Document" for detailed docs
   - **Image/asset preview** in summary cards
   - Configurable visibility per project (show/hide specific deliverables)

3. **Design Principles Display**
   - Prominent display of project design principles
   - Rationale from research insights
   - Examples of how principles inform decisions

4. **Design Goals & Context**
   - Clear statement of what design is solving
   - Key user insights that inform direction
   - Success criteria for design

5. **Skill Integration**
   - Design skills automatically add deliverables to dashboard
   - Skills can update dashboard entries
   - Dashboard reflects latest outputs from skills

6. **Navigation & Organization**
   - List of all projects
   - Filter by status (Active/Complete/Archived)
   - Quick access to latest deliverables
   - Search within current project

7. **Visual Review Capabilities** ⭐ NEW
   - **Inline mood board display** with color palettes, typography, visual references
   - **Embedded wireframes/mockups** viewable without external tools
   - **Side-by-side concept comparison** for design direction selection
   - **Image galleries** for visual deliverables
   - **Responsive preview** for different viewports (desktop, tablet, mobile)

#### Technical Requirements
- **Framework**: Vite + Lit web components
- **Deployment**: Runs locally (dev server)
- **Data Storage**: JSON file-based (simple, no database)
- **Design**: Desktop-first (1440px+ primary target)
- **Responsive**: May work on mobile, but not optimized

#### Integration Points
- Links to PM dashboard (footer/nav, not prominent)
- **Embeds visual content inline** (HTML wireframes, React components, images)
- Links to full design artifacts for detailed documentation
- Skills write to dashboard data store when creating deliverables
- **Image/asset storage** in outputs directory, referenced by URL

### Phase 1 - OUT OF SCOPE

❌ Version history / change tracking
❌ Comments / annotations
❌ Export functionality (PDF, presentations)
❌ User authentication / permissions
❌ Real-time collaboration
❌ Mobile-optimized experience
❌ Search across all projects (only within project)
❌ Analytics / metrics dashboard
❌ Integration with design tools (Figma, Sketch)
❌ Approval workflows
❌ Notifications

### Phase 2 Candidates

**🔮 Version History**
- Track evolution of concepts, specs
- Compare versions side-by-side
- Roll back to previous versions

**🔮 Enhanced Search**
- Search across all projects
- Filter by deliverable type, date, status
- Full-text search within documents

**🔮 Collaboration Features**
- Comments on deliverables
- @mentions and notifications
- Feedback collection

**🔮 Export & Sharing**
- Generate PDF reports
- Create stakeholder presentations
- Share public links

**🔮 Mobile Optimization**
- Responsive design for tablet/mobile
- Touch-optimized interactions
- Offline viewing

---

## Technical Architecture

### Stack
- **Framework**: Vite + Lit (lightweight, standards-based web components)
- **Language**: JavaScript/TypeScript
- **Styling**: CSS (or Tailwind if preferred)
- **Data**: JSON files for persistence
- **Build**: Vite dev server for local development

### File Structure
```
design-dashboard/
├── src/
│   ├── components/
│   │   ├── project-card.js
│   │   ├── deliverable-summary.js
│   │   ├── design-principles.js
│   │   ├── project-header.js
│   │   └── navigation.js
│   ├── pages/
│   │   ├── projects-list.js
│   │   └── project-detail.js
│   ├── data/
│   │   ├── projects.json
│   │   └── deliverables.json
│   ├── styles/
│   │   └── main.css
│   └── app.js
├── public/
│   └── assets/
├── index.html
├── vite.config.js
└── package.json
```

### Data Model

**projects.json**
```json
{
  "projects": [
    {
      "id": "proj-001",
      "name": "E-commerce Checkout Redesign",
      "description": "Streamline checkout flow to reduce cart abandonment",
      "status": "production", // research | concepts | production | qa | complete
      "createdDate": "2025-10-15",
      "lastUpdated": "2025-10-22",
      "pmDashboardUrl": "https://pm.example.com/projects/checkout-redesign",
      "designGoals": [
        "Reduce checkout steps from 5 to 3",
        "Improve mobile conversion by 20%",
        "Maintain trust and security perception"
      ],
      "designPrinciples": [
        {
          "title": "Progressive Disclosure Over Feature Parity",
          "description": "Show what users need now, not everything we can do",
          "rationale": "73% of users abandoned setup due to overwhelming options"
        }
      ],
      "deliverables": [
        {
          "id": "deliv-001",
          "type": "personas",
          "skill": "design-research",
          "title": "User Personas",
          "summary": "Three primary personas identified: Efficiency Seeker (40%), Price Conscious (35%), Security Focused (25%)",
          "filePath": "/mnt/user-data/outputs/personas.md",
          "createdDate": "2025-10-16",
          "visible": true
        },
        {
          "id": "deliv-002",
          "type": "mood-board",
          "skill": "design-concepts",
          "title": "Visual Direction Mood Board",
          "summary": "Clean, modern aesthetic with muted color palette and clear hierarchy",
          "filePath": "/outputs/concepts/mood-board.md",
          "visualAssets": {
            "colorPalette": ["#1a1a1a", "#4a4a4a", "#2563eb", "#f3f4f6"],
            "images": [
              "/outputs/concepts/assets/ref-linear.png",
              "/outputs/concepts/assets/ref-notion.png"
            ],
            "preview": "/outputs/concepts/assets/mood-board-preview.png"
          },
          "createdDate": "2025-10-18",
          "visible": true
        }
      ],
      "keyInsights": [
        "Mobile users abandon 2x more often than desktop",
        "Trust signals reduce anxiety at payment step",
        "Guest checkout preferred by 65% of first-time users"
      ]
    }
  ]
}
```

### Skill Integration Pattern

**How Skills Update Dashboard**:
```javascript
// When design-research creates personas.md
// It also calls:
updateDashboard({
  projectId: "proj-001",
  deliverable: {
    type: "personas",
    skill: "design-research",
    title: "User Personas",
    summary: "Three primary personas identified...",
    filePath: "/mnt/user-data/outputs/personas.md",
    visible: true
  }
});
```

**Skills write to**:
- `data/projects.json` (add/update project metadata)
- `data/deliverables.json` (add new deliverables)

**Implementation**:
Design skills include a helper function or call a simple API/script that:
1. Reads current `projects.json`
2. Adds/updates project and deliverable
3. Writes back to `projects.json`
4. Dashboard auto-refreshes on file change

---

## Core Features & User Flows

### Feature 1: Projects List View

**Layout**:
```
┌─────────────────────────────────────────────────┐
│  DESIGN DASHBOARD                    [Filter ▼] │
├─────────────────────────────────────────────────┤
│                                                  │
│  🟢 Active Projects (3)                         │
│  ┌────────────────────────────────────────┐    │
│  │ E-commerce Checkout Redesign           │    │
│  │ Status: Production | Updated: 2d ago   │    │
│  │ 12 deliverables | View in PM Dashboard →│   │
│  └────────────────────────────────────────┘    │
│                                                  │
│  ⚪ Complete Projects (8)                       │
│  [Show/Hide]                                    │
│                                                  │
└─────────────────────────────────────────────────┘
```

**User Flow**:
1. User lands on dashboard
2. Sees all projects grouped by status
3. Can filter by status (Active/Complete/Archived)
4. Clicks project card to view details

**Key Elements**:
- Project cards show: Name, Status, Last updated, Deliverable count, PM link
- Active projects expanded by default
- Visual status indicators (color-coded)
- Quick actions: View project, View in PM Dashboard

### Feature 2: Project Detail View

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Projects                                          │
├─────────────────────────────────────────────────────────────┤
│  E-commerce Checkout Redesign                    [Edit] [⚙] │
│  Status: Production | Updated: 2 days ago                    │
│  View in PM Dashboard →                                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📋 Design Goals                                             │
│  • Reduce checkout steps from 5 to 3                        │
│  • Improve mobile conversion by 20%                          │
│  • Maintain trust and security perception                    │
│                                                               │
│  ✨ Design Principles                                        │
│  ┌───────────────────────────────────────────────┐          │
│  │ Progressive Disclosure Over Feature Parity     │          │
│  │ Show what users need now, not everything...   │          │
│  │ Rationale: 73% of users abandoned setup...    │          │
│  └───────────────────────────────────────────────┘          │
│                                                               │
│  🔍 Key Insights                                             │
│  • Mobile users abandon 2x more often than desktop          │
│  • Trust signals reduce anxiety at payment step             │
│                                                               │
├─────────────────────────────────────────────────────────────┤
│  📁 Deliverables                                             │
│                                                               │
│  Research Phase                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │ 👥 User Personas                Oct 16, 2025│            │
│  │ Three primary personas identified: Efficiency│           │
│  │ Seeker (40%), Price Conscious (35%)...      │            │
│  │                         [View Full Document] │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
│  ┌─────────────────────────────────────────────┐            │
│  │ 🎯 Design Principles         Oct 16, 2025   │            │
│  │ Five core principles established from user...│            │
│  │                         [View Full Document] │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
│  Concepts Phase                                              │
│  ┌─────────────────────────────────────────────┐            │
│  │ 🎨 Visual Concepts           Oct 18, 2025   │            │
│  │ Three visual directions explored: Minimal...│             │
│  │                         [View Full Document] │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**User Flow**:
1. User clicks project from list
2. Sees project overview (goals, principles, insights)
3. Scrolls to deliverables organized by phase
4. Reads summary, clicks "View Full Document" for details
5. Can edit project metadata or configure deliverable visibility

**Key Elements**:
- Clear hierarchy: Goals → Principles → Insights → Deliverables
- Deliverables grouped by phase (Research, Concepts, Production, QA)
- Summary/excerpt view (2-3 sentences max)
- Link to full document (opens in new tab/viewer)
- Link to PM Dashboard prominent
- Scannable with clear visual sections

### Feature 3: Deliverable Summary Cards (with Visual Previews)

**Card Structure**:
```
┌──────────────────────────────────────────────┐
│ [Icon] Title                      Date       │
│ ─────────────────────────────────────────   │
│ [VISUAL PREVIEW - if applicable]             │
│ (Mood board colors, wireframe thumbnail,     │
│  mockup screenshot, concept image)           │
│                                              │
│ Summary text (2-3 sentences showing key      │
│ takeaways or highlights from deliverable)    │
│                                              │
│ Skill: design-research        [View Full]   │
└──────────────────────────────────────────────┘
```

**Visual Content Types**:
- **Mood Boards**: Color swatches, typography samples, visual references inline
- **Wireframes**: Embedded HTML or screenshot preview
- **Mockups**: High-fidelity design screenshots or embedded React components
- **Concepts**: Image gallery with multiple direction thumbnails
- **Specs**: Key screen thumbnails with annotations
- **QA Reports**: Before/after screenshots, issue screenshots

**Summary Generation**:
Skills provide summaries + visual assets when creating deliverables:
- Personas: Count + primary characteristics (text only)
- Design Principles: Count + first principle (text only)
- **Mood Boards: Color palette preview + 2-3 visual reference thumbnails**
- **Concepts: Thumbnail gallery of all directions explored**
- **Wireframes: Interactive preview or static screenshot**
- Specs: Scope (screens covered) + key screen thumbnails
- QA Reports: Issue count by severity + critical issue screenshots

**Interaction**:
- Hover: Slight elevation, cursor pointer
- Click visual preview: Expand to full-screen or open in viewer
- Click "View Full": Opens complete document with all details
- Visual content loads progressively (thumbnails first, full res on demand)

### Feature 4: Configuration & Visibility

**Project Settings** (accessed via ⚙ icon on project detail):
```
┌─────────────────────────────────────────────┐
│  Project Settings                           │
├─────────────────────────────────────────────┤
│                                              │
│  Project Information                        │
│  Name: [E-commerce Checkout Redesign]      │
│  Description: [text area]                   │
│  Status: [dropdown: research/concepts/etc.] │
│  PM Dashboard URL: [text input]             │
│                                              │
│  Design Goals (editable list)               │
│  • [Goal 1]                          [×]    │
│  • [Goal 2]                          [×]    │
│  [+ Add Goal]                               │
│                                              │
│  Deliverable Visibility                     │
│  ┌───────────────────────────────────┐     │
│  │ ☑ User Personas                   │     │
│  │ ☑ Design Principles               │     │
│  │ ☐ Internal Research Notes         │     │
│  │ ☑ Visual Concepts                 │     │
│  └───────────────────────────────────┘     │
│                                              │
│             [Cancel]  [Save Changes]        │
└─────────────────────────────────────────────┘
```

**Functionality**:
- Toggle deliverable visibility (some internal docs may not be for all audiences)
- Edit project metadata
- Reorder design principles
- Manage design goals

---

## Design Principles for the Dashboard Itself

(Meta: applying our own design thinking)

### 1. Context Before Details
Show goals, principles, and insights prominently before diving into deliverables. Users need "why" before "what."

### 2. Summaries with Easy Depth
Never force users to open full documents to understand content. Provide meaningful summaries, make full docs one click away.

### 3. Status Transparency
Always show project status and last updated. Users should never wonder "is this current?"

### 4. Respect the PM Dashboard
Don't duplicate project management functionality. Link out for tasks, timelines, team info.

### 5. Design Work is Storytelling
Organize deliverables chronologically by phase (Research → Concepts → Production → QA) to tell the design story.

---

## Success Criteria

### Phase 1 Success Metrics

**Adoption**:
- [ ] All active design projects added to dashboard
- [ ] Design skills successfully auto-populate deliverables
- [ ] All user personas use dashboard weekly

**Usability**:
- [ ] Stakeholders can find design rationale without asking designers
- [ ] Developers use dashboard to find specs during implementation
- [ ] Designers spend <5 minutes adding a new project

**Quality**:
- [ ] 90%+ of deliverables have useful summaries
- [ ] Links to PM dashboard working and used
- [ ] Zero duplicate functionality with PM dashboard

**Technical**:
- [ ] Dashboard loads in <2 seconds
- [ ] Skills successfully write to data store
- [ ] Dashboard auto-refreshes when data changes

---

## Open Questions

1. **Summary Generation**: Should skills generate summaries, or should dashboard extract them from documents?
   - **Recommendation**: Skills provide summaries (they have context)

2. **Project Creation**: How are projects created?
   - Manual (user creates project in dashboard)?
   - Automatic (first skill run creates project)?
   - **Recommendation**: Hybrid - skills can create, users can create manually

3. **Authentication**: Phase 1 running locally, but Phase 2 may need auth
   - **Recommendation**: Design with auth in mind, implement in Phase 2

4. **Markdown Rendering**: How to display full markdown documents?
   - Open in system default viewer?
   - Render inline in dashboard?
   - **Recommendation**: Inline markdown viewer for best UX

5. **Real-time Updates**: Should dashboard auto-refresh when skills add deliverables?
   - **Recommendation**: Yes, watch data files for changes

---

## Implementation Approach

### Development Phases

**Phase 1A: Foundation (Week 1)**
- Set up Vite + Lit project structure
- Create data models (projects.json schema)
- Build basic navigation and project list view
- Implement project card component

**Phase 1B: Core Features (Week 2)**
- Build project detail view
- Implement deliverable summary cards
- Create design principles display
- Add project configuration/settings

**Phase 1C: Skill Integration (Week 3)**
- Create skill helper functions for updating dashboard
- Integrate with design-research skill
- Integrate with design-concepts skill
- Test auto-population workflow

**Phase 1D: Polish & Testing (Week 4)**
- Styling and visual design
- Cross-browser testing
- User testing with all personas
- Documentation and handoff

### Skill Integration Implementation

**Step 1**: Create dashboard helper module
```javascript
// design-dashboard/helpers/update-dashboard.js
export function addDeliverable(projectId, deliverable) {
  // Read projects.json
  // Add deliverable to project
  // Write back to projects.json
}

export function updateProject(projectId, updates) {
  // Update project metadata
}

export function createProject(projectData) {
  // Create new project entry
}
```

**Step 2**: Skills import and call helpers
```python
# In design-research/SKILL.md implementation
from dashboard_helpers import add_deliverable

# After creating personas.md
add_deliverable(
  project_id="proj-001",
  deliverable={
    "type": "personas",
    "title": "User Personas",
    "summary": "Three primary personas identified...",
    "filePath": "/mnt/user-data/outputs/personas.md"
  }
)
```

**Step 3**: Dashboard watches for changes
```javascript
// Dashboard auto-refreshes when data files change
const watcher = fs.watch('data/projects.json', () => {
  reloadProjects();
});
```

---

## Next Steps

1. **Review & Refine Brief**
   - Stakeholder review
   - Technical feasibility check
   - Prioritization validation

2. **Design Phase**
   - Create wireframes for key views
   - Design visual style (following design principles)
   - Create component library

3. **Development Setup**
   - Initialize Vite + Lit project
   - Set up development environment
   - Create data schemas

4. **Iterative Development**
   - Build and test in phases
   - Integrate with one skill first
   - Expand to remaining skills

5. **User Testing**
   - Test with each persona
   - Validate assumptions
   - Iterate based on feedback

---

## Appendix: Design Inspiration

**Similar Tools to Reference**:
- Notion (for flexible content organization)
- Linear (for clean, fast UI)
- Storybook (for component documentation)
- Figma (for design system presentation)

**Key UI Patterns to Consider**:
- Card-based layouts for scannability
- Collapsible sections for progressive disclosure
- Breadcrumb navigation for context
- Empty states that guide action
- Loading states that preserve layout

---

**Questions or feedback?** This brief is a living document - update as you learn and iterate.
