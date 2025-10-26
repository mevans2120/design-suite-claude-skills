# Design Dashboard - Quick Start Guide

Get the Design Dashboard running in under 2 minutes.

---

## Prerequisites

- Node.js 18+ installed
- Terminal access

---

## Installation

```bash
# Navigate to dashboard directory
cd /Users/michaelevans/design-suite-claude-skills/dashboard

# Install dependencies (first time only)
npm install
```

---

## Running the Dashboard

### Development Mode
```bash
npm run dev
```

The dashboard will start at **http://localhost:3000**

### Production Build
```bash
# Build optimized production files
npm run build

# Preview production build
npm run preview
```

---

## Using the Dashboard

### Projects List View
- **URL**: http://localhost:3000/
- **Features**:
  - View all design projects in a grid
  - See project status, deliverable count, and last updated date
  - Click any project card to view details

### Project Detail View
- **URL**: http://localhost:3000/project/design-dashboard
- **Features**:
  - View design goals, principles, and key insights
  - Browse all deliverables with visual previews
  - Click "View File →" to view deliverable details
  - Click "← Back to Projects" to return to list

### Keyboard Navigation
- **Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons and links
- **Shift+Tab**: Navigate backward

---

## Adding Projects

Edit `/src/data/projects.json` to add or modify projects:

```json
{
  "projects": [
    {
      "id": "your-project-id",
      "name": "Your Project Name",
      "description": "Brief description",
      "status": "concepts",
      "createdDate": "2025-10-25",
      "lastUpdated": "2025-10-25",
      "designGoals": ["Goal 1", "Goal 2"],
      "designPrinciples": [
        {
          "title": "Principle Title",
          "description": "Description",
          "rationale": "Why this matters"
        }
      ],
      "deliverables": [],
      "keyInsights": ["Insight 1", "Insight 2"]
    }
  ]
}
```

Refresh the browser to see changes.

---

## Project Status Options

- `research` - Purple badge
- `concepts` - Blue badge
- `production` - Yellow badge
- `qa` - Green badge

---

## Troubleshooting

### Port 3000 already in use?
Kill the existing process:
```bash
pkill -9 -f "vite"
npm run dev
```

### Changes not appearing?
Hard refresh the browser:
- **Mac**: Cmd + Shift + R
- **Windows**: Ctrl + Shift + R

### Build errors?
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## File Structure Quick Reference

```
dashboard/
├── src/
│   ├── components/       # Reusable UI components
│   ├── views/           # Page-level views
│   ├── data/            # Project data (edit this!)
│   └── styles/          # Global styles and tokens
├── dist/                # Production build output
└── index.html           # Entry point
```

---

## Development Tips

1. **Hot Reload**: Vite automatically reloads on file changes
2. **Component Inspector**: Open browser DevTools to inspect Lit components
3. **CSS Variables**: All design tokens are CSS custom properties in `global.css`
4. **Data Format**: Validate JSON before adding projects (use JSONLint)

---

## Next Steps

1. **Add your projects** to `/src/data/projects.json`
2. **Customize colors** in `/src/styles/global.css` (optional)
3. **Test navigation** between list and detail views
4. **Provide feedback** for Phase 2 enhancements

---

## Support

- **Documentation**: See `IMPLEMENTATION_REPORT.md` for full details
- **Specifications**: See `/outputs/design-dashboard/production/` for design specs
- **Component Guide**: See `component-implementation-guide.md`

---

**Quick Start Version**: 1.0
**Last Updated**: October 25, 2025
