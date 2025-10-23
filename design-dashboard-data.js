// Design Dashboard Project Features
// Generated from: outputs/design-dashboard/
// Visual References: wireframes, mood boards, design specs

const designDashboardProject = {
  "project": {
    "name": "Design Dashboard",
    "code": "DD",
    "status": "planned",
    "phase": "Ready for Implementation",
    "description": "A centralized dashboard for tracking design projects through all phases (Research → Concepts → Production → QA) with inline visual review capabilities",
    "visualReferences": {
      "moodBoard": "outputs/design-dashboard/concepts/mood-board.html",
      "wireframes": [
        "outputs/design-dashboard/concepts/wireframe-projects-list.html",
        "outputs/design-dashboard/concepts/wireframe-project-detail.html",
        "outputs/design-dashboard/concepts/wireframe-file-viewer.html"
      ],
      "designSpec": "outputs/design-dashboard/production/design-specification.md",
      "componentGuide": "outputs/design-dashboard/production/component-implementation-guide.md",
      "roadmap": "roadmaps/design-dashboard-roadmap.md"
    }
  },
  "current": [],
  "features": {
    "shipped": [],
    "inProgress": [],
    "nextUp": [
      // Phase 1 - Foundation (Week 1)
      {
        "id": "dd-projects-list",
        "number": 1,
        "name": "Projects List View",
        "category": "Page",
        "priority": "P0",
        "dependencies": [],
        "value": "Fast project scanning - main entry point to the dashboard",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html",
        "notes": "Route: / or /projects - responsive grid with project cards",
        "phase": "Phase 1"
      },
      {
        "id": "dd-sidebar-nav",
        "number": 3,
        "name": "Sidebar Navigation",
        "category": "Navigation",
        "priority": "P0",
        "dependencies": [],
        "value": "Quick access navigation - fixed 240px sidebar with counts and filters",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html#sidebar",
        "notes": "Includes logo, project counts, phase filters",
        "phase": "Phase 1"
      },
      {
        "id": "dd-design-principles",
        "number": 9,
        "name": "Design Principles Display",
        "category": "Content",
        "priority": "P0",
        "dependencies": [],
        "value": "Context before details - grid of principle cards",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#principles",
        "notes": "Auto-grid layout 300px min-width, collapsible",
        "phase": "Phase 1"
      },
      {
        "id": "dd-key-insights",
        "number": 10,
        "name": "Key Insights Display",
        "category": "Content",
        "priority": "P0",
        "dependencies": [],
        "value": "Research visibility - numbered list of insights",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#insights",
        "notes": "Numbered badge indicators, collapsible section",
        "phase": "Phase 1"
      },
      {
        "id": "dd-project-detail",
        "number": 2,
        "name": "Project Detail View",
        "category": "Page",
        "priority": "P0",
        "dependencies": ["dd-projects-list", "dd-sidebar-nav"],
        "value": "Complete project context - deep view with all deliverables",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html",
        "notes": "Route: /project/:id - context sections + deliverables",
        "phase": "Phase 1"
      },
      {
        "id": "dd-phase-filters",
        "number": 13,
        "name": "Phase Filters",
        "category": "Action",
        "priority": "P1",
        "dependencies": ["dd-sidebar-nav"],
        "value": "Workflow-based filtering - filter projects by phase",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html#filters",
        "notes": "Sidebar navigation feature",
        "phase": "Phase 1"
      },
      {
        "id": "dd-back-nav",
        "number": 28,
        "name": "Back Navigation",
        "category": "Action",
        "priority": "P0",
        "dependencies": ["dd-sidebar-nav"],
        "value": "Easy navigation - return to projects list",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#navigation",
        "notes": "Sidebar back link",
        "phase": "Phase 1"
      },
      {
        "id": "dd-footer-links",
        "number": 30,
        "name": "Footer Links",
        "category": "Navigation",
        "priority": "P2",
        "dependencies": [],
        "value": "External context - PM/Eng dashboard links",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html#footer",
        "notes": "Footer only, not prominent",
        "phase": "Phase 1"
      }
    ],
    "backlog": [
      // Phase 2 - Components (Week 2)
      {
        "id": "dd-project-card",
        "number": 4,
        "name": "Project Card Component",
        "category": "UI Component",
        "priority": "P0",
        "dependencies": ["dd-projects-list"],
        "value": "Visual project overview - clickable card with status badge",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html#cards",
        "specRef": "outputs/design-dashboard/production/design-specification.md#project-card",
        "notes": "Shows title/description/metadata/status",
        "phase": "Phase 2"
      },
      {
        "id": "dd-deliverable-card",
        "number": 5,
        "name": "Deliverable Card Component",
        "category": "UI Component",
        "priority": "P0",
        "dependencies": ["dd-project-detail"],
        "value": "Visual-first deliverable display - card with inline preview",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#deliverables",
        "specRef": "outputs/design-dashboard/production/design-specification.md#deliverable-card",
        "notes": "Supports images/color palettes/placeholders, 240px preview height",
        "phase": "Phase 2"
      },
      {
        "id": "dd-context-section",
        "number": 6,
        "name": "Context Section Component",
        "category": "UI Component",
        "priority": "P0",
        "dependencies": ["dd-design-principles", "dd-key-insights"],
        "value": "Progressive disclosure of context - collapsible section",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#context",
        "specRef": "outputs/design-dashboard/production/design-specification.md#context-section",
        "notes": "Progressive disclosure pattern - show 3, expand all",
        "phase": "Phase 2"
      },
      {
        "id": "dd-button",
        "number": 7,
        "name": "Button Component",
        "category": "UI Component",
        "priority": "P0",
        "dependencies": [],
        "value": "Consistent interaction patterns - primary/secondary variants",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#button-component",
        "notes": "Includes all interaction states (hover/focus/active/disabled)",
        "phase": "Phase 2"
      },
      {
        "id": "dd-tab-nav",
        "number": 8,
        "name": "Tab Navigation",
        "category": "Navigation",
        "priority": "P0",
        "dependencies": ["dd-project-detail"],
        "value": "Content organization - Overview/Deliverables/Activity tabs",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#tabs",
        "specRef": "outputs/design-dashboard/production/design-specification.md#tab-navigation",
        "notes": "Horizontal tabs with active state",
        "phase": "Phase 2"
      },
      {
        "id": "dd-status-badges",
        "number": 11,
        "name": "Status Badges",
        "category": "UI Component",
        "priority": "P0",
        "dependencies": [],
        "value": "Status transparency - phase-based color-coded indicators",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html#status",
        "specRef": "outputs/design-dashboard/production/design-specification.md#status-badges",
        "notes": "4 phases: Research/Concepts/Production/QA",
        "phase": "Phase 2"
      },
      {
        "id": "dd-visual-preview",
        "number": 12,
        "name": "Visual Preview System",
        "category": "UI Component",
        "priority": "P0",
        "dependencies": ["dd-deliverable-card"],
        "value": "Visual content is critical - inline color/image previews",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#previews",
        "specRef": "outputs/design-dashboard/production/design-specification.md#visual-preview",
        "notes": "240px height, object-fit cover, supports palettes/images/placeholders",
        "phase": "Phase 2"
      },
      {
        "id": "dd-progressive-disclosure",
        "number": 14,
        "name": "Progressive Disclosure",
        "category": "Interaction",
        "priority": "P1",
        "dependencies": ["dd-context-section"],
        "value": "Summaries with easy depth - show 3, expand all pattern",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#disclosure",
        "notes": "Collapsible sections with Show All button",
        "phase": "Phase 2"
      },
      {
        "id": "dd-project-header",
        "number": 15,
        "name": "Project Header",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": ["dd-project-detail"],
        "value": "Clear project identification - header with status and description",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#header",
        "specRef": "outputs/design-dashboard/production/design-specification.md#project-header",
        "notes": "40px title, 18px description",
        "phase": "Phase 2"
      },
      {
        "id": "dd-metadata-display",
        "number": 16,
        "name": "Metadata Display",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": [],
        "value": "Timestamp tracking - deliverable count and last updated",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-projects-list.html#metadata",
        "notes": "Small text 13px color #6b7280",
        "phase": "Phase 2"
      },
      {
        "id": "dd-skill-badges",
        "number": 25,
        "name": "Skill Badges",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": ["dd-status-badges"],
        "value": "Skill tracking - which design skill created deliverable",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#skills",
        "notes": "Research/Concepts/Production/QA colors",
        "phase": "Phase 2"
      },
      {
        "id": "dd-view-file",
        "number": 26,
        "name": "View File Action",
        "category": "Action",
        "priority": "P0",
        "dependencies": ["dd-button"],
        "value": "File access - open deliverable file",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#actions",
        "notes": "Primary button 'View File →'",
        "phase": "Phase 2"
      },
      {
        "id": "dd-jump-to-phase",
        "number": 29,
        "name": "Jump to Phase Navigation",
        "category": "Navigation",
        "priority": "P1",
        "dependencies": ["dd-project-detail"],
        "value": "Quick phase access - jump links to deliverable phases",
        "visualRef": "outputs/design-dashboard/concepts/wireframe-project-detail.html#jump",
        "notes": "Shows deliverable count per phase",
        "phase": "Phase 2"
      },

      // Phase 3 - Responsive & States (Week 3)
      {
        "id": "dd-responsive-layout",
        "number": 17,
        "name": "Responsive Layout",
        "category": "Layout",
        "priority": "P0",
        "dependencies": [],
        "value": "Multi-device support - mobile/tablet/desktop breakpoints",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#responsive-behavior",
        "notes": "320px/768px/1024px breakpoints",
        "phase": "Phase 3"
      },
      {
        "id": "dd-mobile-sidebar",
        "number": 18,
        "name": "Mobile Sidebar",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": ["dd-sidebar-nav", "dd-responsive-layout"],
        "value": "Mobile navigation - overlay sidebar with hamburger menu",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#mobile",
        "specRef": "outputs/design-dashboard/production/mobile-sidebar-states.md",
        "notes": "Backdrop blur when open",
        "phase": "Phase 3"
      },
      {
        "id": "dd-loading-states",
        "number": 21,
        "name": "Loading States",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": [],
        "value": "Loading experience - skeleton placeholders with shimmer",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#loading-states",
        "notes": "Prevents layout shift",
        "phase": "Phase 3"
      },
      {
        "id": "dd-empty-states",
        "number": 22,
        "name": "Empty States",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": [],
        "value": "Graceful empty states - no projects/deliverables messaging",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#empty-states",
        "notes": "Centered with icon",
        "phase": "Phase 3"
      },
      {
        "id": "dd-error-states",
        "number": 23,
        "name": "Error States",
        "category": "UI Component",
        "priority": "P1",
        "dependencies": [],
        "value": "Error handling - failed data loads with retry",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#error-states",
        "notes": "With retry button",
        "phase": "Phase 3"
      },

      // Phase 4 - Polish & Accessibility (Week 4)
      {
        "id": "dd-hover-states",
        "number": 19,
        "name": "Hover States",
        "category": "Interaction",
        "priority": "P1",
        "dependencies": ["dd-project-card", "dd-deliverable-card"],
        "value": "Visual feedback - card lift and border color change",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#hover-states",
        "notes": "translateY(-2px) with shadow",
        "phase": "Phase 4"
      },
      {
        "id": "dd-focus-states",
        "number": 20,
        "name": "Focus States",
        "category": "Interaction",
        "priority": "P0",
        "dependencies": [],
        "value": "Accessibility compliance - keyboard focus indicators",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#focus-states",
        "notes": "2px blue outline, WCAG AA compliant",
        "phase": "Phase 4"
      },
      {
        "id": "dd-page-transitions",
        "number": 24,
        "name": "Page Transitions",
        "category": "Interaction",
        "priority": "P2",
        "dependencies": [],
        "value": "Smooth navigation - fade in for route changes",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#page-transitions",
        "notes": "300ms ease-out",
        "phase": "Phase 4"
      },
      {
        "id": "dd-expand-collapse-animation",
        "number": 27,
        "name": "Expand/Collapse Animation",
        "category": "Interaction",
        "priority": "P1",
        "dependencies": ["dd-progressive-disclosure"],
        "value": "Smooth interactions - height transition for collapsible sections",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#collapsible-sections",
        "notes": "300ms ease height transition",
        "phase": "Phase 4"
      },
      {
        "id": "dd-keyboard-nav",
        "number": 31,
        "name": "Keyboard Navigation",
        "category": "Interaction",
        "priority": "P0",
        "dependencies": ["dd-focus-states"],
        "value": "Accessibility compliance - full keyboard support with tab order",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#keyboard-navigation",
        "notes": "WCAG AA requirement, skip to content link",
        "phase": "Phase 4"
      },
      {
        "id": "dd-screen-reader",
        "number": 32,
        "name": "Screen Reader Support",
        "category": "Interaction",
        "priority": "P0",
        "dependencies": ["dd-focus-states"],
        "value": "Accessibility compliance - ARIA labels and semantic HTML",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#screen-reader-support",
        "notes": "WCAG AA requirement, aria-expanded, aria-controls",
        "phase": "Phase 4"
      },
      {
        "id": "dd-reduced-motion",
        "number": 33,
        "name": "Reduced Motion Support",
        "category": "Interaction",
        "priority": "P0",
        "dependencies": [],
        "value": "Accessibility compliance - respects prefers-reduced-motion",
        "visualRef": "outputs/design-dashboard/production/design-specification.md#motion-and-animation",
        "notes": "Accessibility requirement, 0.01ms transitions",
        "phase": "Phase 4"
      }
    ]
  }
};

// Auto-calculate stats
designDashboardProject.stats = {
  shipped: designDashboardProject.features.shipped.length,
  inProgress: designDashboardProject.features.inProgress.length,
  nextUp: designDashboardProject.features.nextUp.length,
  backlog: designDashboardProject.features.backlog.length,
  total: designDashboardProject.features.shipped.length +
         designDashboardProject.features.inProgress.length +
         designDashboardProject.features.nextUp.length +
         designDashboardProject.features.backlog.length
};

export { designDashboardProject };
