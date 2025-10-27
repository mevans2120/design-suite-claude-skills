/**
 * Markdown Section Extraction Utilities
 *
 * Extracts priority sections from markdown files for preview display.
 * Priority order: Summary > Description/Overview > Introduction > Hypothesis
 */

export interface ExtractedSection {
  content: string;
  sectionName: string;
  truncated: boolean;
}

const PRIORITY_SECTIONS = [
  /^##?\s*(Summary|Executive Summary)/im,
  /^##?\s*(Description|Overview)/im,
  /^##?\s*Introduction/im,
  /^##?\s*Hypothesis/im,
];

const MAX_PREVIEW_LENGTH = 300;

/**
 * Extract the first priority section from markdown content
 */
export function extractPrioritySection(markdown: string): ExtractedSection | null {
  // Remove YAML frontmatter if present
  let withoutFrontmatter = markdown.replace(/^---[\s\S]*?---\n/, '');

  // Remove code blocks (``` fenced code) to avoid extracting code as content
  withoutFrontmatter = withoutFrontmatter.replace(/```[\s\S]*?```/g, '');

  for (const sectionRegex of PRIORITY_SECTIONS) {
    const match = withoutFrontmatter.match(sectionRegex);
    if (!match) continue;

    const sectionName = match[1];
    const sectionStart = match.index! + match[0].length;

    // Find the next section header or end of document
    const nextSectionMatch = withoutFrontmatter
      .slice(sectionStart)
      .match(/\n##?\s+/);

    const sectionEnd = nextSectionMatch
      ? sectionStart + nextSectionMatch.index!
      : withoutFrontmatter.length;

    let content = withoutFrontmatter
      .slice(sectionStart, sectionEnd)
      .trim();

    // If content is too long, truncate intelligently
    const truncated = content.length > MAX_PREVIEW_LENGTH;
    if (truncated) {
      // Try to truncate at sentence boundary
      const truncatedContent = content.slice(0, MAX_PREVIEW_LENGTH);
      const lastPeriod = truncatedContent.lastIndexOf('. ');
      const lastNewline = truncatedContent.lastIndexOf('\n');
      const cutPoint = Math.max(lastPeriod, lastNewline);

      content = cutPoint > 150
        ? truncatedContent.slice(0, cutPoint + 1)
        : truncatedContent;

      // Add ellipsis if we cut mid-sentence
      if (!content.endsWith('.') && !content.endsWith('\n')) {
        content += '...';
      }
    }

    return {
      content,
      sectionName,
      truncated,
    };
  }

  // No priority section found, find the paragraph with the most content
  const allParagraphs = withoutFrontmatter
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  if (allParagraphs.length === 0) {
    // Absolute fallback: just take the first 300 chars of the whole document
    const content = withoutFrontmatter.trim();
    if (content.length === 0) return null;

    const truncated = content.length > MAX_PREVIEW_LENGTH;
    return {
      content: truncated
        ? content.slice(0, MAX_PREVIEW_LENGTH) + '...'
        : content,
      sectionName: 'Content',
      truncated,
    };
  }

  // First try: paragraphs that aren't just headers
  let substantialParagraphs = allParagraphs.filter(p => {
    if (p.startsWith('#') && p.split('\n').length === 1) return false; // Skip single-line headers
    if (p.length < 30) return false;
    return true;
  });

  // Fallback: if no substantial paragraphs, use all paragraphs
  if (substantialParagraphs.length === 0) {
    substantialParagraphs = allParagraphs;
  }

  // Sort by length and take the longest paragraph
  const longestParagraph = substantialParagraphs.sort((a, b) => b.length - a.length)[0];
  const truncated = longestParagraph.length > MAX_PREVIEW_LENGTH;

  return {
    content: truncated
      ? longestParagraph.slice(0, MAX_PREVIEW_LENGTH) + '...'
      : longestParagraph,
    sectionName: 'Content',
    truncated,
  };
}

/**
 * Clean markdown for plain text preview (fallback)
 */
export function cleanMarkdownForPreview(markdown: string, maxLength: number = 400): string {
  return markdown
    .replace(/^---[\s\S]*?---\n/, '')  // YAML frontmatter
    .replace(/\*\*(.*?)\*\*/g, '$1')   // Bold
    .replace(/\*(.*?)\*/g, '$1')       // Italic
    .replace(/^#+\s+/gm, '')           // Headers
    .replace(/^[-*]\s+/gm, '')         // List markers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/`([^`]+)`/g, '$1')       // Inline code
    .replace(/\n{3,}/g, '\n\n')        // Multiple newlines
    .trim()
    .slice(0, maxLength);
}
