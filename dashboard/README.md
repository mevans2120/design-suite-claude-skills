# Design Dashboard - Next.js

A centralized dashboard for tracking design projects through research, concepts, production, and QA phases.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **ESLint 9**

## Migration Status

**Phase 1: Foundation Setup** - COMPLETE

This is the Next.js migration of the original Vite + Lit dashboard, implementing:

- Modern Next.js 14+ App Router architecture
- Full TypeScript type safety
- Design tokens migrated to Tailwind configuration
- Server Components for optimal performance
- Static export capability for simple deployment

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This creates a static export in the `out/` directory.

### Preview Production Build

```bash
npm run start
# or use any static file server
npx serve@latest out
```

## Project Structure

```
dashboard/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout with Inter font
│   ├── page.tsx               # Projects list (/)
│   ├── loading.tsx            # Loading state
│   ├── error.tsx              # Error boundary
│   └── project/[id]/          # Dynamic project routes
│       ├── page.tsx           # Project detail page
│       └── not-found.tsx      # 404 page
├── components/                 # React components
│   └── ui/                    # UI component library (future)
├── lib/                       # Utilities and data
│   ├── data/
│   │   └── projects.ts        # Data loading functions
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
│   ├── data/
│   │   └── projects.json      # Project data
│   └── deliverables/          # Design files
│       ├── research/
│       ├── concepts/
│       ├── production/
│       └── qa/
├── types/                     # TypeScript definitions
│   └── project.ts             # Project type interfaces
├── tailwind.config.ts         # Tailwind + design tokens
├── next.config.js             # Next.js configuration
└── tsconfig.json              # TypeScript configuration
```

## Design Tokens

Design tokens from the original dashboard have been migrated to the Tailwind configuration:

- **Colors**: Background, text, brand, status, and border colors
- **Typography**: Inter font family with proper font features
- **Spacing**: 8px-based spacing system (standard Tailwind)
- **Shadows**: Dark-mode optimized shadow system
- **Border Radius**: Consistent rounding values

All tokens maintain the dark-mode-first aesthetic of the original design.

## Data Management

### Current Implementation (Phase 1)

Projects are stored in `/public/data/projects.json` and loaded server-side via utility functions in `/lib/data/projects.ts`.

### Adding Projects

Edit `/public/data/projects.json` to add or update projects. Schema:

```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'research' | 'concepts' | 'production' | 'qa' | 'complete';
  createdDate: string;
  lastUpdated: string;
  pmDashboardUrl?: string;
  designGoals: string[];
  designPrinciples: DesignPrinciple[];
  deliverables: Deliverable[];
  keyInsights: string[];
}
```

### Adding Deliverables

1. Place files in `/public/deliverables/[phase]/` directory
2. Update the project entry in `projects.json`
3. Add deliverable metadata (title, summary, file path, etc.)

File paths should use the format: `/deliverables/research/filename.md`

## Deployment

This app can be deployed as a static site to:

- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=out`
- **GitHub Pages**: See `.github/workflows/deploy.yml` (future)
- **Any static hosting**: Upload the `out/` directory

## Development Notes

### TypeScript

- Strict mode enabled
- All components and utilities fully typed
- No `any` types in codebase
- JSON imports properly typed

### Next.js Configuration

- Static export enabled (`output: 'export'`)
- Image optimization disabled (not needed for static export)
- Trailing slashes enabled for consistent URLs

### Styling

- Tailwind CSS 4 with dark mode enabled
- Custom design tokens in `tailwind.config.ts`
- Global styles in `app/globals.css`
- Reduced motion support for accessibility

## Phase 1 Accomplishments

- ✅ Next.js project initialized with TypeScript and Tailwind
- ✅ Design tokens migrated from CSS custom properties
- ✅ File structure established following Next.js best practices
- ✅ Design deliverables moved to `/public/deliverables/`
- ✅ TypeScript types defined for all data structures
- ✅ Data loading utilities created with server-side fetching
- ✅ Root layout configured with Inter font
- ✅ Basic routing structure in place (projects list + detail)
- ✅ Loading and error states implemented
- ✅ Dev server running successfully

## Next Steps (Future Phases)

### Phase 2: Component Migration
- Migrate Lit components to React
- Install shadcn/ui component library
- Implement ProjectCard, DeliverableCard, ContextSection components
- Add sidebar navigation
- Match visual design from original dashboard

### Phase 3: Views and Routing
- Enhanced projects list view
- Full project detail view with tabs
- File viewer modal for deliverables
- Client/server component optimization

### Phase 4: File Management & Polish
- Markdown rendering for deliverables
- Mobile responsive design
- Accessibility improvements
- Performance optimization

### Phase 5: Testing & Deployment
- Comprehensive testing
- Production deployment
- Documentation
- Migration cutover from Vite version

## License

ISC
