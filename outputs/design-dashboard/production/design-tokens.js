/**
 * Design Tokens for Design Dashboard
 * Generated from approved mood board and wireframes
 *
 * Usage: Import these tokens into your Lit components
 * Use CSS custom properties for runtime theming
 */

export const tokens = {
  /**
   * Color Palette
   * Dark mode first with neutral grays and blue accent
   */
  colors: {
    // Background layers
    background: {
      primary: '#0a0a0a',      // App background
      secondary: '#1a1a1a',    // Cards, sidebar
      tertiary: '#2a2a2a',     // Hover states, borders
      elevated: '#3a3a3a',     // Active states, emphasized elements
    },

    // Text colors
    text: {
      primary: '#f3f4f6',      // High-emphasis text
      secondary: '#9ca3af',    // Medium-emphasis text, descriptions
      tertiary: '#6b7280',     // Low-emphasis text, metadata
      disabled: '#4a5568',     // Disabled state text
    },

    // Brand & interactive
    brand: {
      primary: '#2563eb',      // Primary blue accent
      primaryHover: '#1d4ed8', // Hover state
      primaryActive: '#1e40af', // Active/pressed state
      primarySubtle: '#2563eb20', // Transparent blue for backgrounds
    },

    // Status colors
    status: {
      // Research phase
      research: '#a78bfa',
      researchBg: '#7c3aed20',

      // Concepts phase
      concepts: '#60a5fa',
      conceptsBg: '#2563eb20',

      // Production phase
      production: '#fbbf24',
      productionBg: '#f59e0b20',

      // QA phase
      qa: '#34d399',
      qaBg: '#10b98120',

      // Semantic colors
      success: '#10b981',
      successBg: '#10b98120',
      error: '#ef4444',
      errorBg: '#ef444420',
      warning: '#f59e0b',
      warningBg: '#f59e0b20',
      info: '#3b82f6',
      infoBg: '#3b82f620',
    },

    // Borders
    border: {
      default: '#2a2a2a',
      hover: '#3a3a3a',
      focus: '#2563eb',
    },
  },

  /**
   * Typography
   * Inter font family with clear type scale
   */
  typography: {
    fontFamily: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'Monaco, "SF Mono", Menlo, monospace',
    },

    // Type scale (px → rem)
    fontSize: {
      tiny: '0.75rem',      // 12px - Tiny labels, metadata
      small: '0.8125rem',   // 13px - Small UI text
      body: '0.875rem',     // 14px - Body text
      base: '1rem',         // 16px - Base size
      medium: '1.125rem',   // 18px - Large body, subtitles
      large: '1.25rem',     // 20px - Section titles
      xlarge: '1.5rem',     // 24px - Page titles
      display: '2rem',      // 32px - Display text
      hero: '2.5rem',       // 40px - Hero text
      massive: '3rem',      // 48px - Massive display
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.25,      // Headings
      normal: 1.5,      // Body text
      relaxed: 1.6,     // Comfortable reading
      loose: 1.75,      // Very relaxed
    },

    letterSpacing: {
      tight: '-0.01em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',    // ALL CAPS labels
    },
  },

  /**
   * Spacing
   * 8px base unit system
   */
  spacing: {
    0: '0',
    1: '0.25rem',    // 4px
    2: '0.5rem',     // 8px - Base unit
    3: '0.75rem',    // 12px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    8: '2rem',       // 32px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  /**
   * Layout
   */
  layout: {
    sidebar: {
      width: '240px',
      widthCollapsed: '64px',
    },
    content: {
      maxWidth: '1400px',
      padding: '40px',
      paddingMobile: '20px',
    },
    gutter: '24px',
  },

  /**
   * Border Radius
   */
  borderRadius: {
    none: '0',
    sm: '0.25rem',     // 4px
    base: '0.375rem',  // 6px
    md: '0.5rem',      // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    full: '9999px',    // Fully rounded
  },

  /**
   * Shadows
   * Subtle shadows for dark mode
   */
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    base: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.4)',
    xl: '0 12px 24px rgba(0, 0, 0, 0.5)',
  },

  /**
   * Transitions
   */
  transitions: {
    duration: {
      fast: '100ms',
      normal: '150ms',
      slow: '200ms',
      slower: '300ms',
    },

    easing: {
      default: 'cubic-bezier(0.4, 0.0, 0.2, 1)',     // Ease in-out
      in: 'cubic-bezier(0.4, 0.0, 1, 1)',            // Ease in
      out: 'cubic-bezier(0.0, 0.0, 0.2, 1)',         // Ease out
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Spring
    },
  },

  /**
   * Z-index layers
   */
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  /**
   * Breakpoints
   * Mobile-first approach
   */
  breakpoints: {
    mobile: '320px',
    mobileLarge: '414px',
    tablet: '768px',
    desktop: '1024px',
    desktopLarge: '1280px',
    desktopXL: '1440px',
    desktopMax: '1920px',
  },
};

/**
 * Generate CSS custom properties from tokens
 * Use this to inject tokens into <style> tags
 */
export function generateCSSVariables() {
  return `
    :root {
      /* Colors - Background */
      --color-bg-primary: ${tokens.colors.background.primary};
      --color-bg-secondary: ${tokens.colors.background.secondary};
      --color-bg-tertiary: ${tokens.colors.background.tertiary};
      --color-bg-elevated: ${tokens.colors.background.elevated};

      /* Colors - Text */
      --color-text-primary: ${tokens.colors.text.primary};
      --color-text-secondary: ${tokens.colors.text.secondary};
      --color-text-tertiary: ${tokens.colors.text.tertiary};
      --color-text-disabled: ${tokens.colors.text.disabled};

      /* Colors - Brand */
      --color-brand-primary: ${tokens.colors.brand.primary};
      --color-brand-primary-hover: ${tokens.colors.brand.primaryHover};
      --color-brand-primary-active: ${tokens.colors.brand.primaryActive};
      --color-brand-primary-subtle: ${tokens.colors.brand.primarySubtle};

      /* Colors - Status */
      --color-status-research: ${tokens.colors.status.research};
      --color-status-research-bg: ${tokens.colors.status.researchBg};
      --color-status-concepts: ${tokens.colors.status.concepts};
      --color-status-concepts-bg: ${tokens.colors.status.conceptsBg};
      --color-status-production: ${tokens.colors.status.production};
      --color-status-production-bg: ${tokens.colors.status.productionBg};
      --color-status-qa: ${tokens.colors.status.qa};
      --color-status-qa-bg: ${tokens.colors.status.qaBg};

      /* Colors - Border */
      --color-border: ${tokens.colors.border.default};
      --color-border-hover: ${tokens.colors.border.hover};
      --color-border-focus: ${tokens.colors.border.focus};

      /* Typography */
      --font-family-sans: ${tokens.typography.fontFamily.sans};
      --font-family-mono: ${tokens.typography.fontFamily.mono};

      /* Spacing */
      --spacing-1: ${tokens.spacing[1]};
      --spacing-2: ${tokens.spacing[2]};
      --spacing-3: ${tokens.spacing[3]};
      --spacing-4: ${tokens.spacing[4]};
      --spacing-6: ${tokens.spacing[6]};
      --spacing-8: ${tokens.spacing[8]};
      --spacing-12: ${tokens.spacing[12]};
      --spacing-16: ${tokens.spacing[16]};

      /* Layout */
      --sidebar-width: ${tokens.layout.sidebar.width};
      --content-max-width: ${tokens.layout.content.maxWidth};
      --content-padding: ${tokens.layout.content.padding};

      /* Border Radius */
      --radius-sm: ${tokens.borderRadius.sm};
      --radius-base: ${tokens.borderRadius.base};
      --radius-md: ${tokens.borderRadius.md};
      --radius-lg: ${tokens.borderRadius.lg};

      /* Shadows */
      --shadow-sm: ${tokens.shadows.sm};
      --shadow-base: ${tokens.shadows.base};
      --shadow-md: ${tokens.shadows.md};
      --shadow-lg: ${tokens.shadows.lg};

      /* Transitions */
      --transition-fast: ${tokens.transitions.duration.fast} ${tokens.transitions.easing.default};
      --transition-normal: ${tokens.transitions.duration.normal} ${tokens.transitions.easing.default};
      --transition-slow: ${tokens.transitions.duration.slow} ${tokens.transitions.easing.default};
    }
  `;
}

export default tokens;
