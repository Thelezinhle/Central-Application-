/**
 * DESIGN SYSTEM - Central source of truth for styling
 * This ensures consistency across the entire application
 * 
 * Usage: import { colors, spacing, typography } from './designSystem';
 */

export const colors = {
  // Primary Brand Colors
  primary: '#228B22',      // CAO Green
  primaryDark: '#1a6b1a',  // Darker shade for hover
  primaryLight: '#3aa83a', // Lighter shade for backgrounds
  
  // Semantic Colors
  success: '#10b981',      // Green for success
  warning: '#f59e0b',      // Amber for warnings
  danger: '#ef4444',       // Red for errors
  info: '#3b82f6',         // Blue for info
  
  // Neutral Colors (High Contrast - WCAG AA)
  text: {
    primary: '#1a1a1a',      // Nearly black - max contrast
    secondary: '#4b5563',    // Medium gray
    tertiary: '#9ca3af',     // Light gray
    inverse: '#ffffff',      // White for dark backgrounds
  },
  
  background: {
    primary: '#ffffff',      // White
    secondary: '#f9fafb',    // Off-white
    tertiary: '#f3f4f6',     // Light gray
    dark: '#1f2937',         // Dark gray
  },
  
  // Feedback Colors
  focus: '#0066cc',         // Focus ring color
  focusRing: '3px solid #0066cc',
  
  // Borders
  border: {
    light: '#e5e7eb',       // Light gray border
    medium: '#d1d5db',      // Medium gray border
    dark: '#9ca3af',        // Dark gray border
  }
};

export const spacing = {
  // Base unit: 4px
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
  
  // Common patterns
  padding: {
    container: '2rem',      // Page container padding
    card: '1.5rem',         // Card internal padding
    button: '0.75rem 1rem', // Button padding (vertical horizontal)
    input: '0.625rem 0.75rem', // Input field padding
  },
  
  margin: {
    section: '3rem',        // Between major sections
    component: '1.5rem',    // Between components
    element: '0.5rem',      // Between small elements
  }
};

export const typography = {
  // Font Family (accessible, readable)
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
    mono: '"SF Mono", "Monaco", "Inconsolata", "Fira Code", monospace',
  },
  
  // Font Sizes (scalable, accessible)
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px - base size
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Font Weights
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line Heights (accessibility - 1.5+ for readability)
  lineHeight: {
    tight: '1.25',    // Headings
    normal: '1.5',    // Body text
    relaxed: '1.75',  // Long-form content
  },
  
  // Text Styles (predefined combinations)
  styles: {
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: '1.25',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: '1.25',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: '1.35',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: '1.4',
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.5',
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.5',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: '1.25',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
  }
};

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  base: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  full: '9999px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1010,
  fixed: 1020,
  offcanvas: 1030,
  modal: 1040,
  tooltip: 1070,
};

export const breakpoints = {
  mobile: '640px',    // sm
  tablet: '768px',    // md
  desktop: '1024px',  // lg
  wide: '1280px',     // xl
  ultraWide: '1536px' // 2xl
};

export const transitions = {
  fast: '150ms ease-in-out',
  base: '300ms ease-in-out',
  slow: '500ms ease-in-out',
};

/**
 * WCAG 2.1 Compliance Helpers
 */
export const a11y = {
  // Focus styles (must be visible - never removed)
  focusStyle: {
    outline: `3px solid ${colors.focus}`,
    outlineOffset: '2px',
  },
  
  // Skip to main content link
  skipLink: {
    position: 'absolute',
    top: '-40px',
    left: '0',
    backgroundColor: colors.primary,
    color: colors.text.inverse,
    padding: spacing.md,
    textDecoration: 'none',
    zIndex: zIndex.modal,
    
    '&:focus': {
      top: '0',
    }
  },
  
  // Visually hidden but screen-reader accessible
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  }
};

/**
 * Component Defaults
 */
export const components = {
  button: {
    primary: {
      backgroundColor: colors.primary,
      color: colors.text.inverse,
      padding: spacing.padding.button,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      border: `2px solid ${colors.primary}`,
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      transition: transitions.base,
      
      '&:hover': {
        backgroundColor: colors.primaryDark,
        borderColor: colors.primaryDark,
      },
      
      '&:focus': {
        outline: colors.focusRing,
        outlineOffset: '2px',
      },
      
      '&:active': {
        transform: 'scale(0.98)',
      },
      
      '&:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      }
    },
    
    secondary: {
      backgroundColor: colors.background.secondary,
      color: colors.text.primary,
      padding: spacing.padding.button,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      border: `2px solid ${colors.border.medium}`,
      borderRadius: borderRadius.md,
      cursor: 'pointer',
      transition: transitions.base,
      
      '&:hover': {
        backgroundColor: colors.background.tertiary,
        borderColor: colors.primary,
      },
      
      '&:focus': {
        outline: colors.focusRing,
        outlineOffset: '2px',
      }
    }
  },
  
  input: {
    padding: spacing.padding.input,
    fontSize: typography.fontSize.base,
    border: `2px solid ${colors.border.light}`,
    borderRadius: borderRadius.md,
    fontFamily: typography.fontFamily.base,
    transition: transitions.base,
    
    '&:focus': {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px ${colors.primaryLight}`,
    },
    
    '&:disabled': {
      backgroundColor: colors.background.tertiary,
      cursor: 'not-allowed',
      opacity: '0.6',
    }
  },
  
  card: {
    padding: spacing.padding.card,
    backgroundColor: colors.background.primary,
    border: `1px solid ${colors.border.light}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.base,
  }
};

export default {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  zIndex,
  breakpoints,
  transitions,
  a11y,
  components,
};
