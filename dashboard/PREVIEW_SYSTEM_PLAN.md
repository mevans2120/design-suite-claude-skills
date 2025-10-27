# Enhanced Preview System - Implementation Plan

**Project**: Design Dashboard Enhanced Previews
**Date**: October 26, 2025
**Author**: Design Planning Specialist
**Status**: Planning Phase

---

## Executive Summary

This document outlines a comprehensive plan to enhance the Design Dashboard's deliverable card preview system. Currently, the system shows basic text previews for markdown files, color palettes inline, and placeholders for HTML/visual content. The enhanced system will provide:

1. **Rich Markdown Previews** - Formatted markdown with intelligent section extraction (Description, Introduction, Hypothesis, Summary)
2. **Visual Design Deliverables** - Actual visual previews for HTML wireframes, mood boards, and concept images
3. **Improved User Experience** - Scannable, informative card previews that reduce the need to open full files

### Strategic Approach

**Phased Implementation**: We'll roll out enhancements in 3 phases to manage complexity and validate approach:
- **Phase 1**: Enhanced markdown preview with section extraction (2-3 days)
- **Phase 2**: Image thumbnails and optimization (1-2 days)
- **Phase 3**: HTML preview generation and polish (2-3 days)

**Total Effort Estimate**: 5-8 days of development work

**Key Technical Decisions**:
- Use `react-markdown` with `remark-gfm` for markdown rendering
- Client-side rendering for performance and simplicity
- Static preview images for HTML content (pre-generated)
- Extend existing `VisualAssets` type rather than major schema changes
- Leverage Next.js Image component for optimization

---

## 1. Content Analysis Strategy

### 1.1 File Type Detection

**Current Implementation**:
```typescript
// In deliverable-card.tsx (line 37-38)
if (!filePath.match(/\.(md|txt)$/i)) {
  return;
}
```

**Enhanced Detection**:
```typescript
type FileType = 'markdown' | 'html' | 'image' | 'text' | 'unknown';

function detectFileType(filePath: string): FileType {
  const extension = filePath.split('.').pop()?.toLowerCase();

  if (extension === 'md') return 'markdown';
  if (extension === 'html') return 'html';
  if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension || '')) return 'image';
  if (extension === 'txt') return 'text';

  return 'unknown';
}
```

### 1.2 Markdown Section Extraction

**Goal**: Extract 200-300 characters from the most relevant section (Description, Introduction, Hypothesis, Summary).

**Section Priority**:
1. `## Summary` or `## Executive Summary` (highest priority - distilled insights)
2. `## Description` or `## Overview` (second priority - what it is)
3. `## Introduction` (third priority - context)
4. `## Hypothesis` (for research deliverables)
5. First paragraph after title (fallback)

**Algorithm**:
```typescript
interface ExtractedSection {
  heading: string;
  content: string;
  characterCount: number;
}

function extractKeySection(markdownContent: string): ExtractedSection | null {
  // Remove YAML frontmatter
  const cleanContent = markdownContent.replace(/^---[\s\S]*?---\n?/gm, '');

  // Split by h2 headers (## Heading)
  const sections = cleanContent.split(/^## /gm).filter(s => s.trim());

  // Priority list for section matching
  const prioritySections = [
    /^(Summary|Executive Summary)/i,
    /^(Description|Overview)/i,
    /^Introduction/i,
    /^Hypothesis/i,
  ];

  // Try to find priority section
  for (const pattern of prioritySections) {
    const section = sections.find(s => pattern.test(s));
    if (section) {
      const [heading, ...contentLines] = section.split('\n');
      const content = contentLines.join('\n').trim();

      return {
        heading: heading.trim(),
        content: extractCleanText(content, 300),
        characterCount: content.length
      };
    }
  }

  // Fallback: extract first meaningful paragraph
  const firstParagraph = extractFirstParagraph(cleanContent);
  return {
    heading: 'Preview',
    content: extractCleanText(firstParagraph, 300),
    characterCount: firstParagraph.length
  };
}
```

### 1.3 Content Extraction Rules

**Markdown Stripping Rules** (for card previews only):
- Remove headers (`# `, `## `, etc.) but keep content
- Remove bold/italic markers (`**text**` → `text`)
- Remove links (`[text](url)` → `text`)
- Remove code blocks and inline code
- Remove list markers but preserve content
- Preserve paragraph structure
- Collapse multiple newlines to single newline

**Character Limit Strategy**:
- Target: 250 characters (roughly 2-3 sentences)
- Never cut mid-word
- Add ellipsis (`...`) if truncated
- Preserve sentence boundaries when possible

```typescript
function extractCleanText(markdown: string, maxChars: number): string {
  // Apply markdown stripping rules (already implemented in deliverable-card.tsx lines 53-78)
  const cleaned = stripMarkdownFormatting(markdown);

  // Smart truncation
  if (cleaned.length <= maxChars) {
    return cleaned;
  }

  // Find last complete sentence within limit
  const truncated = cleaned.substring(0, maxChars);
  const lastSentence = truncated.lastIndexOf('. ');

  if (lastSentence > maxChars * 0.7) {
    // Found a sentence boundary in the last 30% - use it
    return truncated.substring(0, lastSentence + 1);
  }

  // Find last word boundary
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace) + '...';
}
```

### 1.4 Fallback Strategies

**Priority Waterfall**:
1. **Priority section found** → Extract and display with heading context
2. **No priority section, but has content** → Extract first paragraph
3. **Very short content (< 100 chars)** → Show full content
4. **Loading error** → Show "Text Document" placeholder
5. **Empty file** → Show "Empty Document" with metadata

---

## 2. Visual Preview Generation

### 2.1 HTML Deliverables Strategy

**Context**: HTML files (wireframes, mood boards) are currently showing "Text Document" placeholder. We need visual previews.

**Recommended Approach: Option C - Pre-generated Static Screenshots**

**Rationale**:
- **Option A (Server-side generation)**: Requires headless browser (Puppeteer), complex server setup, slow generation time
- **Option B (Client iframe)**: Security concerns, inconsistent rendering, performance issues with multiple cards
- **Option C (Static thumbnails)**: Fast, reliable, controlled quality, works with static hosting

**Implementation**:

```typescript
// Visual asset storage structure
/dashboard/public/deliverables/
  /concepts/
    wireframe-file-viewer.html          # Original HTML
    wireframe-file-viewer.preview.png   # 800x600 preview screenshot
    wireframe-file-viewer.thumb.png     # 400x300 thumbnail (optional)
```

**Preview Generation Workflow**:
1. Designer creates HTML deliverable
2. Run screenshot generation script: `npm run generate-previews`
3. Script uses Puppeteer to capture 800x600 screenshots
4. Saves as `.preview.png` alongside HTML
5. Updates `projects.json` with preview path

**Generation Script** (one-time setup):
```typescript
// scripts/generate-html-previews.ts
import puppeteer from 'puppeteer';
import { glob } from 'glob';
import path from 'path';

async function generatePreview(htmlPath: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 800, height: 600 });
  await page.goto(`file://${htmlPath}`);

  // Wait for content to load
  await page.waitForTimeout(1000);

  const previewPath = htmlPath.replace('.html', '.preview.png');
  await page.screenshot({ path: previewPath, type: 'png' });

  await browser.close();
  console.log(`Generated preview: ${previewPath}`);
}

// Find all HTML deliverables
const htmlFiles = glob.sync('public/deliverables/**/*.html');
for (const file of htmlFiles) {
  await generatePreview(path.resolve(file));
}
```

**Data Model**:
```typescript
// No schema change needed - use existing visualAssets.preview field
{
  "id": "deliv-006",
  "filePath": "/deliverables/concepts/wireframe-projects-list.html",
  "visualAssets": {
    "preview": "/deliverables/concepts/wireframe-projects-list.preview.png"
  }
}
```

### 2.2 Image Deliverables

**Current Support**: File viewer modal handles images well (lines 103-112 in file-viewer-modal.tsx)

**Card Preview Enhancement**:
- Already supported via `visualAssets.preview` field
- Use Next.js `<Image>` component for optimization
- Add lazy loading for performance
- Maintain aspect ratio with object-fit

**Implementation**:
```typescript
// In deliverable-card.tsx renderVisual()
if (visualAssets?.preview && isImagePath(visualAssets.preview)) {
  return (
    <Image
      src={visualAssets.preview}
      alt={deliverable.title}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"
      loading="lazy"
    />
  );
}
```

### 2.3 Color Palettes

**Current Implementation**: Excellent (lines 98-109 in deliverable-card.tsx)

**No Changes Needed** - Current implementation is clean, performant, and effective.

### 2.4 Preview Quality Considerations

**Resolution Standards**:
- **Card preview**: 800x600px (aspect ratio 4:3)
- **File format**: PNG for HTML screenshots (sharp UI), WebP for photos (smaller size)
- **Compression**: 80% quality for balance
- **File size target**: < 200KB per preview

**Responsive Behavior**:
```css
/* Current card has fixed 240px height (line 159) */
.preview-container {
  width: 100%;
  height: 240px;
  object-fit: cover; /* Crop to fill */
}

/* For design artifacts where full view matters */
.preview-container.contain {
  object-fit: contain; /* Show full image, letterbox if needed */
}
```

**Accessibility**:
- All images require `alt` text (use deliverable.title)
- Decorative images: `alt=""` with `role="presentation"`
- Ensure sufficient contrast on overlay text
- Keyboard navigation for viewing full size

---

## 3. Markdown Rendering

### 3.1 Library Selection

**Recommendation: `react-markdown` + `remark-gfm`**

**Comparison**:

| Library | Pros | Cons | Verdict |
|---------|------|------|---------|
| **react-markdown** | React-first, extensible, well-maintained, 12k+ stars | Slightly larger bundle (~25KB) | **RECOMMENDED** |
| marked + DOMPurify | Lightweight (~10KB), fast | Manual React integration, security concerns | Alternative |
| remark-react | Full remark ecosystem | More complex setup | Overkill |

**Installation**:
```bash
npm install react-markdown remark-gfm
```

**Why react-markdown?**:
- Built for React (hooks, components)
- Security by default (no XSS risk)
- Plugin ecosystem (remark-gfm for GitHub Flavored Markdown)
- Customizable component rendering
- Active maintenance (last update: recent)

### 3.2 Component Implementation

**New Component**: `MarkdownPreview.tsx`

```typescript
// dashboard/components/markdown-preview.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownPreviewProps {
  content: string;
  variant?: 'card' | 'full'; // card = stripped preview, full = rich formatting
  maxLength?: number;
}

export function MarkdownPreview({
  content,
  variant = 'card',
  maxLength = 250
}: MarkdownPreviewProps) {

  if (variant === 'card') {
    // For card previews: extract key section and strip formatting
    const extracted = extractKeySection(content);
    return (
      <div className="markdown-preview-card">
        {extracted && (
          <>
            <div className="section-hint text-xs text-[var(--color-text-disabled)] mb-2">
              {extracted.heading}
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {extracted.content}
            </div>
          </>
        )}
      </div>
    );
  }

  // Full rendering with react-markdown
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({node, ...props}) => (
          <h1 className="text-3xl font-bold mt-8 mb-4 pb-4 border-b border-[var(--color-border)]" {...props} />
        ),
        h2: ({node, ...props}) => (
          <h2 className="text-2xl font-semibold mt-6 mb-3 text-[var(--color-brand)]" {...props} />
        ),
        h3: ({node, ...props}) => (
          <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />
        ),
        p: ({node, ...props}) => (
          <p className="my-3 text-[var(--color-text-primary)] leading-relaxed" {...props} />
        ),
        ul: ({node, ...props}) => (
          <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
        ),
        ol: ({node, ...props}) => (
          <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
        ),
        li: ({node, ...props}) => (
          <li className="text-[var(--color-text-secondary)]" {...props} />
        ),
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-[var(--color-brand)] pl-4 my-4 italic text-[var(--color-text-tertiary)]" {...props} />
        ),
        code: ({node, inline, ...props}) => (
          inline
            ? <code className="px-1.5 py-0.5 bg-[var(--color-background-tertiary)] rounded text-sm font-mono" {...props} />
            : <code className="block p-4 bg-[var(--color-background-tertiary)] rounded-lg text-sm font-mono overflow-x-auto" {...props} />
        ),
        a: ({node, ...props}) => (
          <a className="text-[var(--color-brand)] hover:underline" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
```

### 3.3 Styling Approach

**Tailwind + Custom CSS Variables**

```typescript
// Uses existing design tokens from globals.css
// Variables: --color-text-primary, --color-text-secondary, --color-border, --color-brand, etc.

// Card preview styling (compact, scannable)
.markdown-preview-card {
  @apply p-5 text-[13px] leading-relaxed overflow-hidden h-full;
}

.section-hint {
  @apply uppercase tracking-wide font-medium;
}

// Full document styling (file viewer modal)
.markdown-full {
  @apply prose prose-invert max-w-none;
}
```

**Responsive Considerations**:
- Card preview: Fixed height (240px), overflow hidden, no scroll
- Full view: Scrollable, readable line length (max-w-4xl)
- Mobile: Reduce font sizes, tighter spacing

### 3.4 Security Considerations

**react-markdown Security**:
- No `dangerouslySetInnerHTML` - safe by default
- Sanitizes HTML tags automatically
- Links: Add `target="_blank" rel="noopener noreferrer"` for external links
- Images: Only allow relative paths or trusted domains

**Additional Sanitization**:
```typescript
// Custom link renderer with security
a: ({node, href, ...props}) => {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      className="text-[var(--color-brand)] hover:underline"
      {...(isExternal && {
        target: "_blank",
        rel: "noopener noreferrer"
      })}
      {...props}
    />
  );
}
```

### 3.5 Performance Optimization

**Lazy Loading**:
```typescript
// Only load react-markdown when needed
const MarkdownPreview = dynamic(() => import('./markdown-preview'), {
  loading: () => <div className="animate-pulse">Loading preview...</div>,
  ssr: true // Enable SSR for initial render
});
```

**Caching Strategy**:
```typescript
// Cache extracted sections in component state
const [sectionCache, setSectionCache] = useState<Map<string, ExtractedSection>>(new Map());

useEffect(() => {
  const cacheKey = deliverable.filePath;
  if (sectionCache.has(cacheKey)) {
    setExtractedSection(sectionCache.get(cacheKey));
    return;
  }

  // Load and cache
  loadTextPreview().then(section => {
    setSectionCache(prev => new Map(prev).set(cacheKey, section));
    setExtractedSection(section);
  });
}, [deliverable.filePath]);
```

**Bundle Size Impact**:
- react-markdown: ~25KB gzipped
- remark-gfm: ~8KB gzipped
- Total: ~33KB (acceptable for functionality gained)

---

## 4. Section Extraction Logic

### 4.1 Markdown Parsing Implementation

**Heading Detection Patterns**:

```typescript
// Regex patterns for section detection
const SECTION_PATTERNS = {
  summary: /^## (Summary|Executive Summary|Overview|TL;?DR)/i,
  description: /^## (Description|About|What|Introduction)/i,
  hypothesis: /^## (Hypothesis|Research Question|Problem Statement)/i,
  findings: /^## (Findings|Results|Key Insights|Discoveries)/i,
  conclusion: /^## (Conclusion|Takeaways|Next Steps)/i,
};

// Priority order for different deliverable types
const SECTION_PRIORITY_BY_TYPE = {
  'personas': ['summary', 'description'],
  'insights': ['summary', 'findings'],
  'research': ['hypothesis', 'findings', 'summary'],
  'qa': ['summary', 'findings'],
  'wireframe': ['description', 'summary'],
  'default': ['summary', 'description', 'findings'],
};
```

### 4.2 Content Extraction Rules

**Smart Extraction Algorithm**:

```typescript
function extractSectionContent(
  markdownContent: string,
  sectionHeading: string
): string {
  const lines = markdownContent.split('\n');
  let inSection = false;
  let sectionContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Found our section
    if (line.match(new RegExp(`^## ${sectionHeading}`, 'i'))) {
      inSection = true;
      continue;
    }

    // Hit another h2 section - stop
    if (inSection && line.startsWith('## ')) {
      break;
    }

    // Collect section content
    if (inSection) {
      sectionContent.push(line);
    }
  }

  return sectionContent.join('\n').trim();
}
```

**Edge Cases**:
1. **Multiple sections with same name**: Take first occurrence
2. **No matching section**: Fall back to first paragraph after main heading
3. **Section with only list items**: Extract list as bullet points
4. **Section with code blocks**: Skip code blocks in preview
5. **Empty section**: Continue to next priority section

### 4.3 Formatting Preservation vs Simplification

**Card Preview (Simplified)**:
- Strip all markdown formatting
- Plain text only
- Preserve paragraph breaks
- Remove lists, code, blockquotes

**Full View (Preserved)**:
- Full markdown rendering with react-markdown
- All formatting preserved
- Syntax highlighting for code (optional enhancement)
- Interactive elements (checkboxes for task lists)

**Example Transformation**:

```markdown
## Summary

This research reveals **three critical insights** about user behavior:

1. Users prefer visual content
2. Context is more valuable than details
3. Self-service reduces interruptions

> "Design work is invisible" - All personas
```

**Card Preview Output**:
```
Summary

This research reveals three critical insights about user behavior: Users prefer visual content, Context is more valuable than details, Self-service reduces interruptions. "Design work is invisible" - All personas
```

### 4.4 Type-Specific Extraction

**Personas Deliverable**:
- Priority: Summary → Description
- Extract: Persona count + characteristics
- Format: "Four primary personas identified: [names]. [Key insight]"

**Insights Deliverable**:
- Priority: Executive Summary → Findings
- Extract: High-level synthesis
- Format: "Research reveals [X] insights: [top insight]"

**Wireframe Deliverable**:
- Priority: Description → Summary
- Extract: What is being shown + why
- Format: "Low-fidelity wireframe showing [what] with [key features]"

**QA Report**:
- Priority: Summary → Findings
- Extract: Issue count + severity
- Format: "Testing identified [X] issues: [breakdown by severity]"

---

## 5. Component Architecture

### 5.1 Component Refactoring Plan

**Current Structure**:
```
deliverable-card.tsx (195 lines)
├── State: textPreview, isLoading
├── useEffect: loadTextPreview (fetch + strip markdown)
└── renderVisual() (renders preview area)
```

**Enhanced Structure**:
```
deliverable-card.tsx (main component)
├── State: preview, isLoading, error
├── useEffect: loadPreview (delegates to preview loader)
├── renderVisual() → delegates to PreviewRenderer
└── <DeliverableCardContent> (metadata, summary, footer)

components/previews/
├── PreviewRenderer.tsx (orchestrates preview types)
├── MarkdownPreview.tsx (markdown card preview)
├── ImagePreview.tsx (image with lazy loading)
├── HtmlPreview.tsx (screenshot preview)
└── ColorPalettePreview.tsx (existing inline palette)

lib/
├── preview-loader.ts (loading logic)
└── markdown-extractor.ts (section extraction)
```

### 5.2 New Components

**PreviewRenderer Component**:

```typescript
// components/previews/PreviewRenderer.tsx
import { Deliverable } from '@/types/project';

interface PreviewRendererProps {
  deliverable: Deliverable;
  preview?: PreviewData;
  isLoading: boolean;
}

type PreviewData =
  | { type: 'markdown'; section: ExtractedSection }
  | { type: 'image'; url: string }
  | { type: 'html'; screenshotUrl: string }
  | { type: 'palette'; colors: string[] }
  | { type: 'placeholder'; message: string };

export function PreviewRenderer({ deliverable, preview, isLoading }: PreviewRendererProps) {
  if (isLoading) {
    return <LoadingPreview />;
  }

  if (!preview) {
    return <PlaceholderPreview message="No preview available" />;
  }

  switch (preview.type) {
    case 'markdown':
      return <MarkdownPreview section={preview.section} />;
    case 'image':
      return <ImagePreview url={preview.url} alt={deliverable.title} />;
    case 'html':
      return <ImagePreview url={preview.screenshotUrl} alt={deliverable.title} />;
    case 'palette':
      return <ColorPalettePreview colors={preview.colors} />;
    case 'placeholder':
      return <PlaceholderPreview message={preview.message} />;
  }
}
```

**MarkdownPreview Component** (see section 3.2)

**ImagePreview Component**:

```typescript
// components/previews/ImagePreview.tsx
import Image from 'next/image';

interface ImagePreviewProps {
  url: string;
  alt: string;
}

export function ImagePreview({ url, alt }: ImagePreviewProps) {
  return (
    <div className="relative w-full h-full bg-[var(--color-background-primary)]">
      <Image
        src={url}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
}
```

### 5.3 Data Flow

**Preview Loading Flow**:

```
DeliverableCard
  ↓ (on mount)
useEffect → determinePreviewType()
  ↓
Switch on file type + visualAssets
  ├→ Has visualAssets.preview → Load image preview
  ├→ Has visualAssets.colorPalette → Show palette
  ├→ .md file → Load and extract markdown
  ├→ .html file → Check for .preview.png screenshot
  └→ Other → Show placeholder
  ↓
setPreview(previewData)
  ↓
PreviewRenderer renders appropriate component
```

**State Management**:

```typescript
// In deliverable-card.tsx
const [preview, setPreview] = useState<PreviewData | null>(null);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function loadPreview() {
    setIsLoading(true);
    setError(null);

    try {
      const previewData = await PreviewLoader.load(deliverable);
      setPreview(previewData);
    } catch (err) {
      setError(err.message);
      setPreview({ type: 'placeholder', message: 'Failed to load preview' });
    } finally {
      setIsLoading(false);
    }
  }

  loadPreview();
}, [deliverable.filePath]);
```

### 5.4 Loading and Error States

**Loading State**:
```typescript
function LoadingPreview() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-sm text-[var(--color-text-disabled)] animate-pulse">
        Loading preview...
      </div>
    </div>
  );
}
```

**Error State**:
```typescript
function ErrorPreview({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-2 p-4">
      <div className="text-2xl">📄</div>
      <p className="text-sm text-[var(--color-text-tertiary)] text-center">
        Preview unavailable
      </p>
      {message && (
        <p className="text-xs text-[var(--color-text-disabled)]">{message}</p>
      )}
    </div>
  );
}
```

**Placeholder State**:
```typescript
function PlaceholderPreview({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-sm text-[var(--color-text-disabled)]">{message}</span>
    </div>
  );
}
```

---

## 6. Data Model Updates

### 6.1 Minimal Schema Changes

**Current `VisualAssets` Type** (from types/project.ts):
```typescript
export interface VisualAssets {
  colorPalette?: string[];
  images?: string[];
  preview?: string;
}
```

**Enhanced `VisualAssets` Type**:
```typescript
export interface VisualAssets {
  colorPalette?: string[];
  images?: string[]; // Array of image URLs
  preview?: string; // Preview image URL or description
  previewType?: 'image' | 'screenshot' | 'interactive'; // NEW: Hint for preview rendering
  thumbnailUrl?: string; // NEW: Optional smaller thumbnail for performance
}
```

**Why Minimal Changes?**:
- Existing `preview` field already stores preview URLs
- `previewType` helps renderer make decisions
- `thumbnailUrl` is optional optimization
- Backward compatible (all fields optional)

### 6.2 Example Data Updates

**HTML Wireframe with Screenshot**:
```json
{
  "id": "deliv-006",
  "type": "wireframe",
  "filePath": "/deliverables/concepts/wireframe-projects-list.html",
  "visualAssets": {
    "preview": "/deliverables/concepts/wireframe-projects-list.preview.png",
    "previewType": "screenshot"
  }
}
```

**Mood Board with Color Palette**:
```json
{
  "id": "deliv-005",
  "type": "mood-board",
  "filePath": "/deliverables/concepts/mood-board.html",
  "visualAssets": {
    "colorPalette": ["#0a0a0a", "#1a1a1a", "#2a2a2a", "#4a4a4a", "#2563eb", "#f3f4f6"],
    "preview": "/deliverables/concepts/mood-board.preview.png",
    "previewType": "screenshot"
  }
}
```

**Personas (Markdown with Section Extraction)**:
```json
{
  "id": "deliv-001",
  "type": "personas",
  "filePath": "/deliverables/research/personas.md",
  "summary": "Four primary personas identified: Sarah (Lead Designer), Marcus (Product Manager), Jen (Software Engineer), Alex (Executive)."
  // No visualAssets - will extract from markdown
}
```

**Concept Image**:
```json
{
  "id": "deliv-012",
  "type": "concept",
  "filePath": "/deliverables/concepts/dashboard-concept-v2.png",
  "visualAssets": {
    "preview": "/deliverables/concepts/dashboard-concept-v2.png",
    "thumbnailUrl": "/deliverables/concepts/dashboard-concept-v2.thumb.png",
    "previewType": "image"
  }
}
```

### 6.3 Migration Strategy

**Phase 1: Backward Compatible**
- New fields are optional
- Existing deliverables work without changes
- Add preview URLs incrementally

**Phase 2: Batch Update**
- Run script to generate HTML screenshots
- Update projects.json with preview URLs
- Test all deliverables

**Phase 3: Optimization**
- Generate thumbnails for large images
- Add previewType hints
- Validate all previews loading correctly

**Migration Script**:
```typescript
// scripts/migrate-preview-data.ts
import projectsData from '../public/data/projects.json';
import fs from 'fs';
import path from 'path';

async function migratePreviewData() {
  const updated = { ...projectsData };

  for (const project of updated.projects) {
    for (const deliverable of project.deliverables) {
      // HTML files: check for .preview.png
      if (deliverable.filePath.endsWith('.html')) {
        const previewPath = deliverable.filePath.replace('.html', '.preview.png');
        if (fs.existsSync(path.join('public', previewPath))) {
          deliverable.visualAssets = {
            ...deliverable.visualAssets,
            preview: previewPath,
            previewType: 'screenshot'
          };
        }
      }

      // Image files: use self as preview
      if (deliverable.filePath.match(/\.(png|jpg|jpeg|webp)$/)) {
        deliverable.visualAssets = {
          ...deliverable.visualAssets,
          preview: deliverable.filePath,
          previewType: 'image'
        };
      }
    }
  }

  fs.writeFileSync(
    'public/data/projects.json',
    JSON.stringify(updated, null, 2)
  );

  console.log('Migration complete!');
}
```

### 6.4 Validation Rules

**Data Integrity Checks**:
```typescript
function validateVisualAssets(deliverable: Deliverable): boolean {
  const { visualAssets, filePath } = deliverable;

  if (!visualAssets) return true; // Optional field

  // If preview URL specified, file must exist
  if (visualAssets.preview && !fileExists(visualAssets.preview)) {
    console.warn(`Preview not found: ${visualAssets.preview}`);
    return false;
  }

  // Color palette must have at least 2 colors
  if (visualAssets.colorPalette && visualAssets.colorPalette.length < 2) {
    console.warn(`Insufficient colors in palette: ${deliverable.id}`);
    return false;
  }

  // PreviewType must match actual preview content
  if (visualAssets.previewType === 'image' &&
      visualAssets.preview &&
      !visualAssets.preview.match(/\.(png|jpg|jpeg|webp)$/)) {
    console.warn(`PreviewType mismatch: ${deliverable.id}`);
    return false;
  }

  return true;
}
```

---

## 7. Preview Quality Considerations

### 7.1 Resolution and Sizing

**Card Preview Dimensions**:
- **Container**: 100% width × 240px height (fixed)
- **Preview image**: 800×600px (4:3 aspect ratio)
- **Display**: object-fit: cover (fills container, crops as needed)

**Responsive Breakpoints**:
```typescript
// Card grid adapts to screen size
// Mobile: 1 column (100% width)
// Tablet: 2 columns (50% width)
// Desktop: 3 columns (33% width)
// Wide: 4 columns (25% width)

sizes="(max-width: 640px) 100vw,
       (max-width: 1024px) 50vw,
       (max-width: 1440px) 33vw,
       25vw"
```

**Full View (Modal)**:
- Max width: 90vw
- Max height: 70vh
- object-fit: contain (show full image, no crop)

### 7.2 Image Optimization

**Next.js Image Component Benefits**:
- Automatic WebP/AVIF conversion
- Responsive image sizes (srcset)
- Lazy loading built-in
- Blur placeholder while loading
- No CLS (Cumulative Layout Shift)

**Configuration**:
```typescript
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
}
```

**Manual Optimization for Screenshots**:
```bash
# Use sharp for PNG optimization
npm install sharp --save-dev

# Optimize script
node scripts/optimize-previews.js
```

```typescript
// scripts/optimize-previews.js
import sharp from 'sharp';
import { glob } from 'glob';

const previews = glob.sync('public/deliverables/**/*.preview.png');

for (const file of previews) {
  await sharp(file)
    .resize(800, 600, { fit: 'cover' })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(file.replace('.png', '.optimized.png'));

  // Replace original
  fs.renameSync(file.replace('.png', '.optimized.png'), file);
}
```

### 7.3 Accessibility

**Image Alt Text Strategy**:
```typescript
// Semantic alt text based on deliverable type
function getAltText(deliverable: Deliverable): string {
  const { type, title } = deliverable;

  switch (type) {
    case 'wireframe':
      return `Wireframe preview: ${title}`;
    case 'mood-board':
      return `Mood board showing ${title}`;
    case 'personas':
      return `User personas document: ${title}`;
    case 'screenshot':
      return `Screenshot of ${title}`;
    default:
      return title;
  }
}
```

**Keyboard Navigation**:
- Tab to card: Focus ring visible
- Enter/Space: Open file viewer modal
- Arrow keys: Navigate between cards (enhancement)

**Screen Reader Support**:
```typescript
<div
  role="article"
  aria-label={`Deliverable: ${deliverable.title}`}
>
  <div className="preview-area" aria-label={getAltText(deliverable)}>
    {/* Preview content */}
  </div>
  <p className="summary" aria-describedby={`summary-${deliverable.id}`}>
    {deliverable.summary}
  </p>
</div>
```

**Color Contrast**:
- Text overlays: Ensure 4.5:1 contrast ratio (WCAG AA)
- Use semi-transparent black/white backgrounds
- Test with contrast checker tools

### 7.4 Performance

**Loading Strategy**:
1. **Above the fold**: Load immediately (first 3-6 cards)
2. **Below the fold**: Lazy load with Intersection Observer
3. **Skeleton loaders**: Show content structure while loading
4. **Progressive enhancement**: Show text first, then images

**Lazy Loading Implementation**:
```typescript
// Already built into Next.js Image component
<Image
  src={preview}
  alt={alt}
  loading="lazy" // or "eager" for above-fold
  placeholder="blur"
  blurDataURL="data:image/png;base64,..." // Low-res placeholder
/>
```

**Performance Budget**:
- Initial page load: < 3s (3G network)
- Card preview load: < 500ms
- Full image load: < 1s
- Total preview images: < 2MB per page

**Monitoring**:
```typescript
// Add performance marks
performance.mark('preview-load-start');
await loadPreview();
performance.mark('preview-load-end');
performance.measure('preview-load', 'preview-load-start', 'preview-load-end');
```

---

## 8. Implementation Phases

### Phase 1: Enhanced Markdown Preview (Priority: HIGH)

**Duration**: 2-3 days
**Goal**: Show formatted markdown previews with intelligent section extraction

**Tasks**:
1. ✅ **Install dependencies** (30 min)
   - `npm install react-markdown remark-gfm`

2. ✅ **Create markdown extraction utility** (3-4 hours)
   - File: `lib/markdown-extractor.ts`
   - Functions: `extractKeySection()`, `extractCleanText()`, `stripMarkdownFormatting()`
   - Unit tests for edge cases

3. ✅ **Create MarkdownPreview component** (2-3 hours)
   - File: `components/previews/MarkdownPreview.tsx`
   - Card variant (stripped text with section hint)
   - Full variant (rich formatting for modal)
   - Styling with existing design tokens

4. ✅ **Refactor DeliverableCard** (2-3 hours)
   - Replace current text preview logic with section extraction
   - Integrate MarkdownPreview component
   - Add section hint display ("Summary", "Description", etc.)
   - Maintain loading/error states

5. ✅ **Update FileViewerModal** (1-2 hours)
   - Replace basic markdown renderer with MarkdownPreview (full variant)
   - Remove custom line-by-line parsing (lines 134-193)
   - Use react-markdown for consistency

6. ✅ **Testing and refinement** (2-3 hours)
   - Test with all existing markdown deliverables
   - Verify section extraction works for different document structures
   - Ensure fallbacks work (no matching sections, empty files, etc.)
   - Visual QA on card previews

**Success Criteria**:
- [ ] Markdown cards show 200-300 char preview from relevant section
- [ ] Section hint displayed (e.g., "Summary", "Description")
- [ ] Formatting is clean and scannable
- [ ] Full markdown rendering in modal uses react-markdown
- [ ] No regression on existing functionality

**Deliverables**:
- `lib/markdown-extractor.ts`
- `components/previews/MarkdownPreview.tsx`
- Updated `deliverable-card.tsx`
- Updated `file-viewer-modal.tsx`

---

### Phase 2: Image Thumbnails and Optimization (Priority: MEDIUM)

**Duration**: 1-2 days
**Goal**: Display image previews with proper optimization and lazy loading

**Tasks**:
1. ✅ **Create ImagePreview component** (1-2 hours)
   - File: `components/previews/ImagePreview.tsx`
   - Use Next.js Image component
   - Implement lazy loading
   - Add blur placeholder
   - Handle loading/error states

2. ✅ **Add image support to PreviewRenderer** (1 hour)
   - Detect image deliverables
   - Route to ImagePreview component
   - Configure sizing and aspect ratio

3. ✅ **Optimize existing images** (2-3 hours)
   - Audit current images in `/deliverables/`
   - Generate thumbnails if needed
   - Compress with sharp
   - Update Next.js config for optimization

4. ✅ **Update projects.json** (1-2 hours)
   - Add `visualAssets.preview` for image deliverables
   - Add `previewType: 'image'` hints
   - Validate all paths are correct

5. ✅ **Testing** (1-2 hours)
   - Test with various image formats (PNG, JPG, WebP)
   - Verify lazy loading works
   - Check responsive behavior
   - Validate accessibility (alt text, focus states)

**Success Criteria**:
- [ ] Image deliverables show thumbnail in card
- [ ] Lazy loading reduces initial page weight
- [ ] Images are optimized (< 200KB per preview)
- [ ] Proper alt text for accessibility
- [ ] No layout shift during loading (CLS = 0)

**Deliverables**:
- `components/previews/ImagePreview.tsx`
- Updated `PreviewRenderer.tsx`
- Optimized image assets
- Updated `projects.json`

---

### Phase 3: HTML Preview Generation and Polish (Priority: MEDIUM)

**Duration**: 2-3 days
**Goal**: Show visual previews of HTML deliverables (wireframes, mood boards)

**Tasks**:
1. ✅ **Setup Puppeteer for screenshot generation** (1-2 hours)
   - `npm install puppeteer --save-dev`
   - Create `scripts/generate-html-previews.ts`
   - Configure viewport and rendering settings

2. ✅ **Generate screenshots for existing HTML** (2-3 hours)
   - Run script on `/deliverables/**/*.html`
   - Save as `.preview.png` alongside HTML
   - Optimize with sharp (80% quality, 800×600px)
   - Commit preview images to repo

3. ✅ **Update projects.json with screenshot paths** (1 hour)
   - Add `visualAssets.preview` for HTML deliverables
   - Add `previewType: 'screenshot'`
   - Run validation script

4. ✅ **Test HTML preview rendering** (1-2 hours)
   - Verify screenshots load in cards
   - Check quality and legibility
   - Ensure fallback to "Interactive HTML" if no screenshot

5. ✅ **Create preview generation workflow** (2-3 hours)
   - Add npm script: `npm run generate-previews`
   - Document workflow for designers
   - Optional: Git pre-commit hook to auto-generate

6. ✅ **Polish and optimization** (2-3 hours)
   - Add loading skeletons
   - Implement error boundaries
   - Performance audit (Lighthouse)
   - Accessibility audit (axe DevTools)
   - Visual refinements

**Success Criteria**:
- [ ] All HTML deliverables have screenshot previews
- [ ] Screenshots are legible and high-quality
- [ ] Easy workflow for generating new previews
- [ ] No performance degradation (< 3s initial load)
- [ ] Passes accessibility audit (WCAG AA)

**Deliverables**:
- `scripts/generate-html-previews.ts`
- Screenshot images (`.preview.png` files)
- Updated `projects.json`
- Documentation: `docs/preview-generation-guide.md`
- npm scripts for automation

---

## 9. Technical Decisions Summary

### 9.1 Client-side vs Server-side

**Decision: Client-side rendering**

**Rationale**:
- Next.js supports both, but client-side is simpler for this use case
- Preview data is static (fetched from public files)
- No server-side processing needed
- Faster development iteration
- Easier to cache and optimize

**Trade-offs**:
- Initial bundle size slightly larger (+33KB for react-markdown)
- SEO impact minimal (preview content not indexed separately)
- Acceptable for internal dashboard tool

### 9.2 Static vs Dynamic Preview Updates

**Decision: Static preview images for HTML, dynamic for markdown**

**Rationale**:
- **HTML screenshots**: Generated once, served statically (fast, reliable)
- **Markdown previews**: Extracted dynamically (content changes frequently)
- **Image previews**: Static files, optimized by Next.js

**Update Workflow**:
1. Designer updates HTML deliverable
2. Runs `npm run generate-previews`
3. Commits preview images with HTML
4. Dashboard shows updated preview immediately

### 9.3 Caching Strategy

**Decision: Multi-layer caching**

**Implementation**:
```typescript
// Layer 1: React state cache (component-level)
const [previewCache] = useState<Map<string, PreviewData>>(new Map());

// Layer 2: Browser cache (HTTP headers)
// next.config.js
headers: {
  '/_next/image': [
    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }
  ],
  '/deliverables/**/*.preview.png': [
    { key: 'Cache-Control', value: 'public, max-age=604800' } // 1 week
  ]
}

// Layer 3: Service Worker (optional enhancement)
// Cache preview images offline
```

**Benefits**:
- Faster subsequent loads
- Reduced bandwidth usage
- Better offline experience
- Lower server costs (if deployed to cloud)

### 9.4 CDN for Preview Images

**Decision: Not initially, revisit if scaling**

**Rationale**:
- Current scale: < 50 deliverables, < 10MB total images
- Next.js serves static files efficiently
- Vercel (typical Next.js host) has built-in CDN
- Cost-benefit not justified yet

**Future consideration**:
- If > 500 deliverables or > 100MB images
- If global distribution needed
- Consider Cloudinary, Imgix, or AWS CloudFront

---

## 10. Testing Strategy

### 10.1 Test with Actual Deliverable Files

**Test Matrix**:

| File Type | Test File | Expected Preview | Priority |
|-----------|-----------|------------------|----------|
| Markdown - Personas | `personas.md` | Summary section (4 personas) | HIGH |
| Markdown - Insights | `key-insights.md` | Executive Summary | HIGH |
| Markdown - No sections | `brief-evolution.md` | First paragraph fallback | MEDIUM |
| HTML - Wireframe | `wireframe-file-viewer.html` | Screenshot preview | HIGH |
| HTML - Mood board | `mood-board.html` | Screenshot + color palette | HIGH |
| Image - Concept | (create example) | Image thumbnail | MEDIUM |
| Text file | (create example) | Plain text preview | LOW |
| Missing file | Invalid path | Error state | MEDIUM |

**Test Procedure**:
1. Load dashboard with all deliverables
2. Verify each preview renders correctly
3. Check loading states during slow network (throttle to 3G)
4. Test error states (delete preview file, test 404)
5. Verify modal view matches card preview type

### 10.2 Different File Types and Structures

**Markdown Structure Variations**:

1. **Standard structure** (h1 → h2 sections):
   ```markdown
   # Title
   ## Summary
   Content here...
   ## Details
   More content...
   ```
   ✅ Should extract "Summary" section

2. **No h2 sections** (only h3):
   ```markdown
   # Title
   ### Introduction
   Content here...
   ```
   ✅ Should fall back to first paragraph

3. **Multiple matching sections**:
   ```markdown
   # Title
   ## Summary
   First summary...
   ## Executive Summary
   Second summary...
   ```
   ✅ Should take first match (Summary)

4. **Empty sections**:
   ```markdown
   # Title
   ## Summary

   ## Description
   Actual content here...
   ```
   ✅ Should skip empty, use Description

5. **Lists only**:
   ```markdown
   # Title
   ## Summary
   - Point 1
   - Point 2
   - Point 3
   ```
   ✅ Should extract list items as text

### 10.3 Edge Cases

**Edge Case Test Suite**:

| Scenario | Expected Behavior | Status |
|----------|-------------------|--------|
| Very long title (> 100 chars) | Truncate with ellipsis | ⏳ Test |
| Empty markdown file | Show "Empty Document" | ⏳ Test |
| Markdown with only frontmatter | Extract first content after frontmatter | ⏳ Test |
| Invalid image path | Show error state | ⏳ Test |
| Corrupted image file | Show error state | ⏳ Test |
| HTML with no screenshot | Show "Interactive HTML" placeholder | ⏳ Test |
| Very large image (> 5MB) | Show loading state, then optimized version | ⏳ Test |
| Special characters in filename | URL encode correctly | ⏳ Test |
| Unicode content (emoji, Japanese) | Render correctly | ⏳ Test |
| Extremely short content (< 50 chars) | Show full content without truncation | ⏳ Test |

**Automated Test Cases**:

```typescript
// __tests__/markdown-extractor.test.ts
describe('extractKeySection', () => {
  it('extracts Summary section when present', () => {
    const markdown = `
# Title
## Summary
This is the summary content.
## Details
More details here.
    `;
    const result = extractKeySection(markdown);
    expect(result?.heading).toBe('Summary');
    expect(result?.content).toContain('summary content');
  });

  it('falls back to first paragraph when no sections', () => {
    const markdown = `
# Title
This is the first paragraph with important content.

Second paragraph.
    `;
    const result = extractKeySection(markdown);
    expect(result?.content).toContain('first paragraph');
  });

  it('handles empty file gracefully', () => {
    const result = extractKeySection('');
    expect(result).toBeNull();
  });
});
```

### 10.4 Performance Testing

**Metrics to Track**:

| Metric | Target | Measurement Tool |
|--------|--------|------------------|
| Initial page load | < 3s (3G) | Lighthouse |
| Time to Interactive (TTI) | < 4s | Lighthouse |
| First Contentful Paint (FCP) | < 1.5s | Web Vitals |
| Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Preview load time (individual) | < 500ms | Performance API |
| Total bundle size increase | < 50KB gzipped | webpack-bundle-analyzer |
| Memory usage | < 100MB | Chrome DevTools |

**Performance Test Procedure**:

1. **Lighthouse Audit** (Before/After):
   ```bash
   npm run build
   npm run start
   lighthouse http://localhost:3000 --view
   ```

2. **Bundle Size Analysis**:
   ```bash
   npm install @next/bundle-analyzer
   ANALYZE=true npm run build
   ```

3. **Network Throttling Test**:
   - Chrome DevTools → Network → Slow 3G
   - Load dashboard
   - Measure time to fully loaded
   - Check lazy loading kicks in

4. **Load Testing** (many deliverables):
   - Create test project with 50+ deliverables
   - Measure scroll performance
   - Check memory usage during scroll
   - Verify lazy loading prevents all images loading

5. **Real User Monitoring** (post-launch):
   ```typescript
   // Add web-vitals reporting
   import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

   function sendToAnalytics(metric) {
     console.log(metric);
     // Send to analytics service
   }

   getCLS(sendToAnalytics);
   getFID(sendToAnalytics);
   getFCP(sendToAnalytics);
   getLCP(sendToAnalytics);
   getTTFB(sendToAnalytics);
   ```

**Performance Budget**:
```json
// performance-budget.json
{
  "resourceSizes": [
    { "resourceType": "script", "budget": 300 },
    { "resourceType": "image", "budget": 2000 },
    { "resourceType": "total", "budget": 3000 }
  ],
  "resourceCounts": [
    { "resourceType": "script", "budget": 20 },
    { "resourceType": "image", "budget": 50 }
  ]
}
```

---

## 11. Risk Assessment

### 11.1 Technical Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Performance degradation with many previews** | MEDIUM | HIGH | Implement lazy loading, image optimization, virtual scrolling if needed |
| **Bundle size increase affects load time** | MEDIUM | MEDIUM | Code splitting, dynamic imports, monitor bundle size |
| **Markdown extraction fails for edge cases** | HIGH | LOW | Comprehensive testing, fallback to full text preview |
| **Screenshot generation inconsistent** | LOW | MEDIUM | Standardize viewport, test on CI/CD, manual QA |
| **Browser compatibility issues** | LOW | MEDIUM | Test on Chrome, Firefox, Safari; use polyfills |
| **Image loading errors** | MEDIUM | LOW | Implement error boundaries, fallback placeholders |

### 11.2 UX Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Previews don't match full content** | MEDIUM | HIGH | Clear visual hierarchy, "View Full File" prominent |
| **Section extraction misses important content** | MEDIUM | MEDIUM | Priority system, fallbacks, manual summary field |
| **Loading states feel slow** | MEDIUM | MEDIUM | Skeleton loaders, optimistic UI, preloading |
| **Previews too small to read** | LOW | MEDIUM | Minimum font size, click to zoom, high-res screenshots |
| **Color palette previews unclear** | LOW | LOW | Current implementation is good, no change needed |

### 11.3 Maintenance Risks

| Risk | Likelihood | Impact | Mitigation Strategy |
|------|------------|--------|---------------------|
| **Manual preview generation forgotten** | HIGH | MEDIUM | Add to documentation, consider automation, pre-commit hooks |
| **react-markdown version updates break styling** | LOW | MEDIUM | Pin version, thorough testing before upgrades |
| **Preview files not committed to repo** | MEDIUM | MEDIUM | Add to .gitignore exceptions, document workflow |
| **Stale screenshots after HTML updates** | MEDIUM | MEDIUM | Timestamp checks, automated regeneration, visual indicators |
| **Code complexity makes future changes hard** | LOW | HIGH | Clear component boundaries, documentation, TypeScript types |

### 11.4 Mitigation Strategies

**Performance Mitigation**:
```typescript
// Implement virtual scrolling if > 100 deliverables
import { FixedSizeGrid } from 'react-window';

// Code splitting for heavy components
const MarkdownPreview = dynamic(() => import('./MarkdownPreview'), {
  loading: () => <Skeleton />,
});

// Preload next/previous deliverables in modal
useEffect(() => {
  const nextDeliverable = getNextDeliverable();
  if (nextDeliverable?.filePath) {
    // Prefetch
    fetch(nextDeliverable.filePath);
  }
}, [currentDeliverable]);
```

**UX Mitigation**:
```typescript
// Section hint shows what content is displayed
<div className="preview-meta">
  <span className="section-hint">Summary</span>
  <span className="truncation-hint">~250 of 1,200 characters</span>
</div>

// Clear CTA to view full content
<button>View Full Document →</button>
```

**Maintenance Mitigation**:
```bash
# Pre-commit hook to generate previews
# .husky/pre-commit
#!/bin/sh
npm run generate-previews --if-needed
git add public/deliverables/**/*.preview.png
```

```typescript
// Automated staleness detection
function isPreviewStale(htmlPath: string, previewPath: string): boolean {
  const htmlMtime = fs.statSync(htmlPath).mtimeMs;
  const previewMtime = fs.statSync(previewPath).mtimeMs;
  return htmlMtime > previewMtime; // HTML newer than preview
}
```

---

## 12. Success Metrics

### 12.1 Technical Metrics

**Pre-Launch**:
- [ ] All existing deliverables have appropriate previews
- [ ] Lighthouse performance score > 90
- [ ] Bundle size increase < 50KB gzipped
- [ ] Zero console errors or warnings
- [ ] Passes accessibility audit (WCAG AA)

**Post-Launch**:
- [ ] Page load time < 3s (avg)
- [ ] Preview render time < 500ms (p95)
- [ ] Image optimization ratio > 70% (file size reduction)
- [ ] Zero critical bugs reported
- [ ] Browser compatibility > 95% (Chrome, Firefox, Safari)

### 12.2 User Experience Metrics

**Qualitative**:
- [ ] Previews are scannable and informative
- [ ] Users can identify deliverable content without opening
- [ ] Visual design deliverables show actual visuals
- [ ] Markdown content is readable and well-formatted
- [ ] Error states are clear and helpful

**Quantitative** (if analytics available):
- Reduce "View File" clicks by 30% (users find what they need from preview)
- Increase time on project detail page by 20% (more engaging previews)
- Reduce bounce rate by 15% (better first impression)

### 12.3 Maintenance Metrics

**Developer Experience**:
- [ ] Preview generation takes < 2 minutes for all HTML
- [ ] Documentation is clear and complete
- [ ] New deliverables can be added in < 5 minutes
- [ ] Code is understandable by other developers
- [ ] No regressions in existing functionality

---

## 13. Next Steps

### Immediate Actions (Week 1)

1. **Review and Approve Plan** (1 hour)
   - Stakeholder review of this document
   - Confirm priorities and timeline
   - Identify any missing requirements

2. **Setup Development Environment** (30 min)
   - Create feature branch: `feature/enhanced-previews`
   - Install dependencies
   - Setup test data

3. **Begin Phase 1** (2-3 days)
   - Implement markdown section extraction
   - Create MarkdownPreview component
   - Refactor DeliverableCard

### Short-term (Week 2)

4. **Complete Phase 1**
   - Testing and refinement
   - Code review and merge

5. **Begin Phase 2** (1-2 days)
   - Image optimization and preview

### Medium-term (Week 3)

6. **Complete Phase 2**
   - Testing and refinement

7. **Phase 3** (2-3 days)
   - HTML screenshot generation
   - Final polish and optimization

### Long-term Enhancements (Future)

8. **Optional Enhancements** (as needed):
   - Virtual scrolling for very large projects
   - Advanced caching with Service Worker
   - PDF preview support
   - Video thumbnail generation
   - Search highlighting in previews
   - Comparison view (side-by-side concepts)

---

## 14. Appendices

### Appendix A: File Structure

```
dashboard/
├── components/
│   ├── deliverable-card.tsx (updated)
│   ├── file-viewer-modal.tsx (updated)
│   └── previews/
│       ├── PreviewRenderer.tsx (new)
│       ├── MarkdownPreview.tsx (new)
│       ├── ImagePreview.tsx (new)
│       ├── ColorPalettePreview.tsx (extracted)
│       └── PlaceholderPreview.tsx (new)
├── lib/
│   ├── markdown-extractor.ts (new)
│   ├── preview-loader.ts (new)
│   └── preview-types.ts (new)
├── scripts/
│   ├── generate-html-previews.ts (new)
│   ├── optimize-previews.ts (new)
│   └── migrate-preview-data.ts (new)
├── __tests__/
│   ├── markdown-extractor.test.ts (new)
│   └── preview-renderer.test.tsx (new)
├── public/
│   └── deliverables/
│       ├── research/
│       │   ├── personas.md
│       │   └── key-insights.md
│       ├── concepts/
│       │   ├── wireframe-file-viewer.html
│       │   ├── wireframe-file-viewer.preview.png (new)
│       │   ├── mood-board.html
│       │   └── mood-board.preview.png (new)
│       └── production/
├── types/
│   └── project.ts (updated)
└── docs/
    └── preview-generation-guide.md (new)
```

### Appendix B: Dependencies

**New Dependencies**:
```json
{
  "dependencies": {
    "react-markdown": "^9.0.0",
    "remark-gfm": "^4.0.0"
  },
  "devDependencies": {
    "puppeteer": "^21.0.0",
    "sharp": "^0.33.0",
    "@next/bundle-analyzer": "^14.0.0",
    "web-vitals": "^3.5.0"
  }
}
```

**Bundle Size Impact**:
- react-markdown: ~25KB gzipped
- remark-gfm: ~8KB gzipped
- Total impact: ~33KB gzipped

### Appendix C: Configuration Changes

**next.config.js**:
```javascript
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // Optional: bundle analyzer
  webpack: (config, { isServer }) => {
    if (process.env.ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: true,
        })
      );
    }
    return config;
  },
};
```

**package.json scripts**:
```json
{
  "scripts": {
    "generate-previews": "tsx scripts/generate-html-previews.ts",
    "optimize-images": "tsx scripts/optimize-previews.ts",
    "migrate-data": "tsx scripts/migrate-preview-data.ts",
    "analyze": "ANALYZE=true next build"
  }
}
```

### Appendix D: Type Definitions

```typescript
// lib/preview-types.ts
export type FileType = 'markdown' | 'html' | 'image' | 'text' | 'unknown';

export type PreviewData =
  | { type: 'markdown'; section: ExtractedSection }
  | { type: 'image'; url: string }
  | { type: 'html'; screenshotUrl: string }
  | { type: 'palette'; colors: string[] }
  | { type: 'placeholder'; message: string };

export interface ExtractedSection {
  heading: string;
  content: string;
  characterCount: number;
}

export interface PreviewConfig {
  maxChars: number;
  sectionPriority: string[];
  fallbackToFirstParagraph: boolean;
}

export interface PreviewLoaderOptions {
  cache?: boolean;
  timeout?: number;
  fallbackMessage?: string;
}
```

---

## Document Control

**Version**: 1.0
**Status**: Planning Phase
**Next Review**: After Phase 1 completion
**Approval Required**: Technical Lead, Product Owner

**Change Log**:
- 2025-10-26: Initial draft created
- [Future changes will be logged here]

---

**End of Implementation Plan**
