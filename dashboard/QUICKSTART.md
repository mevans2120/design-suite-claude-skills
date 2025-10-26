# Quick Start Guide - Design Dashboard Next.js

This guide will get you up and running with the new Next.js Design Dashboard in under 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

```bash
cd /Users/michaelevans/design-suite-claude-skills/dashboard-next
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open your browser to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
dashboard-next/
├── app/               # Pages and layouts
│   ├── page.tsx      # Home page (projects list)
│   └── project/[id]/ # Project detail page
├── components/        # React components (Phase 2)
├── lib/              # Utilities and data loading
├── public/           # Static assets
│   ├── data/         # Project data (JSON)
│   └── deliverables/ # Design files
└── types/            # TypeScript definitions
```

## Key Features

- Server Components for optimal performance
- TypeScript for type safety
- Tailwind CSS for styling
- Static export for simple deployment
- Design tokens from original dashboard

## Adding a Project

Edit `/public/data/projects.json`:

```json
{
  "projects": [
    {
      "id": "my-project",
      "name": "My Project",
      "description": "Project description",
      "status": "research",
      "createdDate": "2025-10-25",
      "lastUpdated": "2025-10-25",
      "designGoals": [],
      "designPrinciples": [],
      "deliverables": [],
      "keyInsights": []
    }
  ]
}
```

## Adding a Deliverable

1. Place file in `/public/deliverables/[phase]/filename.md`
2. Add entry to project in `projects.json`:

```json
{
  "id": "deliv-001",
  "type": "personas",
  "skill": "design-research",
  "title": "User Personas",
  "summary": "Description of deliverable",
  "filePath": "/deliverables/research/personas.md",
  "createdDate": "2025-10-25",
  "visible": true
}
```

## Building for Production

```bash
npm run build
```

Output will be in `/out/` directory as static HTML files.

## Deploying

The `/out/` directory can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static file hosting

## Common Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check
```

## Troubleshooting

### Port 3000 already in use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### Build fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript errors
```bash
# Check for type errors
npx tsc --noEmit
```

## Next Steps

See `/PHASE1-REPORT.md` for complete implementation details.
See `/README.md` for full documentation.

## Questions?

Refer to the migration plan: `/docs/architecture/NEXTJS-MIGRATION-PLAN.md`
