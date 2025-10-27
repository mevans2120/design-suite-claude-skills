# Design Dashboard User Guide

**Version**: 1.0
**Last Updated**: October 27, 2025

---

## Overview

The Design Dashboard is a centralized hub for tracking design projects through all phases of development—from Research to Concepts to Production to QA. It provides visibility into design work, rationale, and deliverables without requiring users to hunt through files or interrupt designers.

**Live Dashboard**: http://localhost:3001 (development)

---

## Key Features

### 1. Context Before Details
Design principles, goals, and insights are prominently displayed before deliverables, ensuring stakeholders understand the "why" before the "what."

### 2. Enhanced Previews
Deliverables show intelligent previews based on content type:
- **HTML Files**: Zoomed-out visual previews of wireframes and mood boards
- **Markdown Files**: Formatted content from priority sections (Summary, Description, Introduction)
- **Design Tokens**: Color palette visualization
- **Images**: Direct image previews

### 3. Single-Page Layout
All project information is accessible on one page:
- 5 Design Principles
- 9 Key Insights
- 11 Deliverables with inline previews

### 4. Inline File Viewing
Click "View File →" on any deliverable to open it in a modal overlay—no navigation away from the dashboard required.

---

## Navigation

### Sidebar
- **Workspace**: View all projects (currently showing "Design Dashboard")
- **Phase Filters**: Filter by Research, Concepts, Production, or QA
- **Project Counter**: Shows total deliverables for the active project

### Main Content Area
Scrollable content displaying:
1. Project header with name and description
2. Design Principles section (expandable)
3. Key Insights section (expandable)
4. All Deliverables grid

---

## Understanding Deliverables

Each deliverable card displays:

### Card Header
- **Title**: Name of the deliverable
- **Skill Badge**: Phase indicator (Research, Concepts, Production, QA)
  - Research: Purple
  - Concepts: Blue
  - Production: Orange/Yellow
  - QA: Green

### Preview Area
Visual or text preview based on content type:

**Visual Previews**:
- **HTML Wireframes**: Full-page preview scaled to fit (25% zoom)
- **Mood Boards**: Interactive HTML with color swatches and references
- **Design Tokens**: Color palette bars showing token colors

**Markdown Previews**:
- Formatted content from key sections
- Section label (e.g., "SUMMARY", "DESCRIPTION")
- ~200-300 characters of content
- Proper markdown formatting (bold, lists, headers)

**Placeholder**:
- "Text Document" for files without special preview logic

### Card Content
- **Summary**: Brief description of the deliverable (2-3 sentences)
- **Created Date**: "X days ago" format
- **View File Button**: Opens full content in modal

---

## Viewing Files

### Opening Files
Click the "View File →" button on any deliverable card.

### Modal Viewer
- **Full content display**: Markdown, HTML, images, or code
- **Close actions**:
  - Click "Close" button (top right)
  - Click outside modal (on overlay)
  - Press Escape key
- **Content types**:
  - Markdown: Rendered with GitHub Flavored Markdown
  - HTML: Interactive preview in iframe
  - Code: Syntax-highlighted JavaScript/TypeScript
  - Images: Full-size display

---

## Design Principles

The dashboard follows 5 core principles:

1. **Context Before Details**: Show goals and insights before deliverables
2. **Summaries with Easy Depth**: Never force users to open files to understand content
3. **Status Transparency**: Always show project status and last updated date
4. **Design-Focused with Context Awareness**: Stay focused on design artifacts
5. **Design Work is Storytelling**: Organize chronologically by phase

---

## Key Insights

9 critical insights inform the dashboard's design:

1. Design work is valuable but invisible to stakeholders
2. Context (why) is more valuable than artifacts (what) alone
3. One dashboard serves four distinct jobs-to-be-done
4. Self-service reduces designer interruptions
5. Trust requires status transparency
6. Summaries enable scanning, details enable work
7. Design tells a story from research to validation
8. Design Dashboard and PM Dashboard serve complementary purposes
9. Visual content is critical—design cannot be communicated through text alone

---

## Deliverable Types

### Research Phase
- **User Personas**: Target user profiles and pain points
- **Design Principles**: Core principles guiding design decisions
- **Key Insights**: Research findings and critical observations
- **Brief Evolution**: How the project brief evolved based on research

### Concepts Phase
- **Mood Board**: Visual direction, color palette, typography
- **Wireframes**: Low-fidelity HTML wireframes showing layout and flow
- **File Viewer Wireframe**: Modal interaction patterns

### Production Phase
- **Design Tokens**: Code-ready design system (colors, spacing, typography)
- **Design Specification**: Comprehensive 60+ page spec with all components
- **Component Implementation Guide**: Working code for Lit web components

---

## Performance Tips

### Quick Scanning
- Use preview cards to scan deliverables without opening files
- Check section labels (SUMMARY, DESCRIPTION) for content type
- Visual previews show design direction at a glance

### Deep Dive
- Open files only when you need full details
- Use keyboard shortcuts in modal (Escape to close)
- Click outside modal to quickly return to dashboard

### Context First
- Read Design Principles before exploring deliverables
- Check Key Insights to understand research findings
- Follow chronological order: Research → Concepts → Production → QA

---

## Technical Details

### Stack
- **Framework**: Next.js 16 with App Router and Turbopack
- **UI**: React 19 + TypeScript 5
- **Styling**: Tailwind CSS 4 with design tokens
- **Markdown**: react-markdown with GitHub Flavored Markdown support

### Preview System
Intelligent content extraction:
- Priority sections: Summary > Description/Overview > Introduction > Hypothesis
- Code block filtering to avoid showing raw code
- Intelligent truncation at sentence boundaries (~300 chars)
- Fallback to longest paragraph if no priority sections found

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Dark mode optimized
- Responsive layout (desktop-first)

---

## Troubleshooting

### Preview Not Showing
- **Refresh the page**: Hot reload may not have updated
- **Check browser console**: Look for fetch errors or 404s
- **Verify file paths**: Ensure deliverables exist in `/public/deliverables/`

### HTML Wireframes Appear Blank
- **Check sandbox restrictions**: iframes use `allow-same-origin allow-scripts`
- **External resources**: Some HTML files load Google Fonts which may be blocked
- **Browser extensions**: Ad blockers may interfere with iframe content

### Markdown Not Formatting
- **Section headers**: Ensure markdown uses `## Section Name` format
- **Code blocks**: Use triple backticks for code fences
- **YAML frontmatter**: Will be automatically stripped from previews

---

## Getting Help

### For Developers
- **Source Code**: `/design-suite-claude-skills/dashboard`
- **Component Docs**: See `ENHANCED-PREVIEWS-REPORT.md`
- **Implementation Guide**: See `component-implementation-guide.md` in deliverables

### For Stakeholders
- **Questions about design decisions**: Check Design Principles and Key Insights
- **Understanding deliverables**: Read summaries before opening files
- **Project status**: Check sidebar for phase breakdown

---

## Future Enhancements

Planned improvements (not yet implemented):

1. **Static Screenshot Generation**: Generate PNG thumbnails for HTML files at build time
2. **Image Thumbnails**: Automatic thumbnail generation for large images
3. **Search & Filter**: Find deliverables by keyword or type
4. **Project Comparison**: Compare deliverables across projects
5. **Export Options**: PDF exports of specifications and principles
6. **Version History**: Track changes to deliverables over time

---

## Best Practices

### For Designers
- **Write clear summaries**: 2-3 sentences explaining deliverable purpose
- **Use priority sections**: Include Summary or Description sections in markdown
- **Visual deliverables**: Provide HTML previews when possible
- **Keep context updated**: Regularly update principles and insights

### For Product Managers
- **Start with context**: Read principles and insights before deliverables
- **Trust summaries**: Only open files when you need implementation details
- **Check dates**: Note "Created X days ago" to understand project timeline
- **Self-service**: Use dashboard instead of interrupting designers

### For Engineers
- **Read specs first**: Design Specification has all component details
- **Check tokens**: Design Tokens file exports as ES modules
- **Implementation guide**: Component code examples are in Production phase
- **Visual reference**: Use wireframes to understand intended layout

### For Executives
- **Quick overview**: Scan deliverable summaries for project status
- **Strategic context**: Key Insights show research findings and decisions
- **Visual confirmation**: HTML previews show actual design direction
- **Trust indicator**: "Last updated" dates show project momentum

---

**End of User Guide**

For technical documentation, see:
- `/dashboard/ENHANCED-PREVIEWS-REPORT.md` - Preview system implementation
- `/dashboard/MIGRATION-REPORT.md` - Next.js migration details
- `/dashboard/README.md` - Project setup and development
