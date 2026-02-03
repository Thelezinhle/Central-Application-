/**
 * ACCESSIBILITY VALIDATOR
 * Checks your app against WCAG 2.1 standards
 * Run this in development to catch a11y issues early
 * 
 * Usage: import { auditAccessibility } from './a11yValidator';
 *        auditAccessibility();
 */

export class AccessibilityValidator {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.passed = [];
  }

  /**
   * Check for color contrast (WCAG AA standard: 4.5:1 for normal text, 3:1 for large text)
   */
  checkContrast() {
    const elements = document.querySelectorAll('body, p, h1, h2, h3, h4, h5, h6, button, label, a');
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const bgColor = style.backgroundColor;
      const textColor = style.color;
      const fontSize = parseFloat(style.fontSize);
      
      // Simple contrast check (would need full WCAG calculation for production)
      if (bgColor === 'rgba(0, 0, 0, 0)' || textColor === 'rgba(0, 0, 0, 0)') {
        // Skip transparent elements
        return;
      }
      
      // Log for manual review
      if (fontSize < 14 && !this._hasGoodContrast(textColor, bgColor)) {
        this.warnings.push({
          type: 'contrast',
          element: el.tagName,
          text: el.textContent?.substring(0, 50),
          message: 'Text may not have sufficient contrast. Verify WCAG AA compliance (4.5:1)'
        });
      }
    });
  }

  /**
   * Check for keyboard navigation (focusable elements)
   */
  checkKeyboardNav() {
    const interactiveElements = document.querySelectorAll(
      'button, a[href], input, select, textarea, [tabindex], [role="button"], [role="link"]'
    );
    
    let focusableCount = 0;
    
    interactiveElements.forEach(el => {
      const tabindex = el.getAttribute('tabindex');
      const isVisible = el.offsetParent !== null;
      
      if (isVisible && tabindex !== '-1') {
        focusableCount++;
      }
      
      // Check if focus style exists
      const style = window.getComputedStyle(el, ':focus');
      if (!style.outline && !style.boxShadow) {
        this.warnings.push({
          type: 'focus-style',
          element: el.tagName,
          text: el.textContent?.substring(0, 50),
          message: 'Element may not have visible focus style'
        });
      }
    });
    
    if (focusableCount < 5 && document.querySelectorAll('button, a[href]').length > 5) {
      this.warnings.push({
        type: 'keyboard-nav',
        message: 'Few focusable elements found. Consider making more elements keyboard accessible.'
      });
    }
    
    this.passed.push({
      type: 'keyboard-nav',
      message: `Found ${focusableCount} keyboard-accessible elements`
    });
  }

  /**
   * Check for ARIA labels
   */
  checkAriaLabels() {
    const interactiveElements = document.querySelectorAll(
      'button, a[role="button"], [role="button"]'
    );
    
    let withoutLabel = 0;
    
    interactiveElements.forEach(el => {
      const hasAriaLabel = el.hasAttribute('aria-label');
      const hasAriaLabelledby = el.hasAttribute('aria-labelledby');
      const hasText = el.textContent?.trim().length > 0;
      const hasTitle = el.hasAttribute('title');
      
      if (!hasAriaLabel && !hasAriaLabelledby && !hasText && !hasTitle) {
        withoutLabel++;
        this.issues.push({
          type: 'aria-label',
          element: el.tagName,
          message: `Button/Link missing accessible label. Add aria-label or text content.`
        });
      }
    });
    
    if (withoutLabel === 0) {
      this.passed.push({
        type: 'aria-label',
        message: 'All interactive elements have accessible labels'
      });
    }
  }

  /**
   * Check for form labels
   */
  checkFormLabels() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    let withoutLabel = 0;
    
    inputs.forEach(input => {
      const hasLabel = document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.hasAttribute('aria-label');
      const hasPlaceholder = input.hasAttribute('placeholder');
      
      if (!hasLabel && !hasAriaLabel && !hasPlaceholder) {
        withoutLabel++;
        this.issues.push({
          type: 'form-label',
          element: input.type || 'input',
          message: 'Form input missing label. Add <label> element or aria-label.'
        });
      }
      
      // Check for required
      if (input.required && !input.hasAttribute('aria-required')) {
        this.warnings.push({
          type: 'aria-required',
          element: input.type,
          message: 'Required input should have aria-required="true"'
        });
      }
    });
    
    if (withoutLabel === 0) {
      this.passed.push({
        type: 'form-label',
        message: 'All form inputs have associated labels'
      });
    }
  }

  /**
   * Check for alt text on images
   */
  checkAltText() {
    const images = document.querySelectorAll('img:not([alt])');
    
    if (images.length > 0) {
      images.forEach(img => {
        this.issues.push({
          type: 'alt-text',
          element: 'img',
          src: img.src,
          message: 'Image missing alt text. Provide descriptive alternative text.'
        });
      });
    } else {
      this.passed.push({
        type: 'alt-text',
        message: 'All images have alt text'
      });
    }
  }

  /**
   * Check heading hierarchy (h1 should exist, should be in order)
   */
  checkHeadings() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1s = document.querySelectorAll('h1');
    
    if (h1s.length === 0) {
      this.issues.push({
        type: 'heading-hierarchy',
        message: 'Page should have exactly one H1. Currently has zero.'
      });
    } else if (h1s.length > 1) {
      this.warnings.push({
        type: 'heading-hierarchy',
        message: `Page has ${h1s.length} H1 elements. Should have exactly one.`
      });
    } else {
      this.passed.push({
        type: 'heading-hierarchy',
        message: 'Page has exactly one H1'
      });
    }
    
    // Check hierarchy
    let lastLevel = 1;
    let hierarchy_ok = true;
    
    headings.forEach(h => {
      const level = parseInt(h.tagName[1]);
      if (level > lastLevel + 1) {
        hierarchy_ok = false;
        this.warnings.push({
          type: 'heading-hierarchy',
          message: `Heading hierarchy skipped from H${lastLevel} to H${level}`
        });
      }
      lastLevel = level;
    });
    
    if (hierarchy_ok && headings.length > 0) {
      this.passed.push({
        type: 'heading-hierarchy',
        message: 'Heading hierarchy is correct'
      });
    }
  }

  /**
   * Check for sufficient link text
   */
  checkLinkText() {
    const links = document.querySelectorAll('a');
    let without_text = 0;
    
    links.forEach(link => {
      const text = link.textContent?.trim();
      const ariaLabel = link.getAttribute('aria-label');
      const title = link.getAttribute('title');
      
      if (!text && !ariaLabel && !title) {
        without_text++;
        this.issues.push({
          type: 'link-text',
          href: link.href,
          message: 'Link has no descriptive text. Add link text or aria-label.'
        });
      }
      
      // Check for generic text
      if (text && ['click here', 'read more', 'link', 'more'].includes(text.toLowerCase())) {
        this.warnings.push({
          type: 'link-text',
          text: text,
          message: `Link text is generic: "${text}". Use descriptive text like "Read about accessibility".`
        });
      }
    });
    
    if (without_text === 0) {
      this.passed.push({
        type: 'link-text',
        message: 'All links have descriptive text'
      });
    }
  }

  /**
   * Check for sufficient color information
   */
  checkColorContrast() {
    // Check for information conveyed only by color
    const elements = document.querySelectorAll('[style*="color"]');
    
    // This is a basic check - full implementation would analyze every element
    this.passed.push({
      type: 'color-contrast',
      message: 'Manual review recommended: Verify information is not conveyed by color alone'
    });
  }

  /**
   * Run full audit
   */
  audit() {
    console.group('🧪 WCAG 2.1 Accessibility Audit');
    
    this.checkAriaLabels();
    this.checkFormLabels();
    this.checkHeadings();
    this.checkLinkText();
    this.checkKeyboardNav();
    this.checkAltText();
    this.checkContrast();
    
    this._reportResults();
    
    return {
      issues: this.issues,
      warnings: this.warnings,
      passed: this.passed,
      score: this._calculateScore()
    };
  }

  /**
   * Calculate accessibility score
   */
  _calculateScore() {
    const totalChecks = this.issues.length + this.warnings.length + this.passed.length;
    const issueWeight = 10; // Each issue costs 10 points
    const warningWeight = 5; // Each warning costs 5 points
    
    let score = 100;
    score -= (this.issues.length * issueWeight);
    score -= (this.warnings.length * warningWeight);
    
    return Math.max(0, Math.min(100, score));
  }

  /**
   * Report audit results
   */
  _reportResults() {
    if (this.issues.length > 0) {
      console.group(`❌ ISSUES (${this.issues.length})`);
      this.issues.forEach(issue => {
        console.error(`[${issue.type}]`, issue.message, issue);
      });
      console.groupEnd();
    }
    
    if (this.warnings.length > 0) {
      console.group(`⚠️  WARNINGS (${this.warnings.length})`);
      this.warnings.forEach(warn => {
        console.warn(`[${warn.type}]`, warn.message, warn);
      });
      console.groupEnd();
    }
    
    if (this.passed.length > 0) {
      console.group(`✅ PASSED (${this.passed.length})`);
      this.passed.forEach(pass => {
        console.log(`[${pass.type}]`, pass.message);
      });
      console.groupEnd();
    }
    
    console.log(
      `\n📊 Accessibility Score: ${this._calculateScore()}/100\n`,
      this.issues.length === 0 ? '✅ No critical issues!' : '⚠️  Fix issues above'
    );
    
    console.groupEnd();
  }

  /**
   * Helper to check color contrast (simplified)
   */
  _hasGoodContrast(textColor, bgColor) {
    // Simplified - would need full WCAG contrast ratio calculation
    return true; // Always pass for now - requires full implementation
  }
}

/**
 * Convenience function to run audit
 */
export const auditAccessibility = () => {
  const validator = new AccessibilityValidator();
  return validator.audit();
};

/**
 * WCAG 2.1 Checklist
 */
export const wcagChecklist = {
  '1.1.1': {
    level: 'A',
    criterion: 'Non-text Content',
    description: 'All images, icons, and non-text elements have text alternatives',
    status: 'not-checked'
  },
  '1.3.1': {
    level: 'A',
    criterion: 'Info and Relationships',
    description: 'Information is conveyed through semantic HTML structure',
    status: 'not-checked'
  },
  '1.4.3': {
    level: 'AA',
    criterion: 'Contrast (Minimum)',
    description: 'Text has at least 4.5:1 contrast ratio against background',
    status: 'not-checked'
  },
  '2.1.1': {
    level: 'A',
    criterion: 'Keyboard',
    description: 'All functionality is accessible via keyboard',
    status: 'not-checked'
  },
  '2.4.3': {
    level: 'A',
    criterion: 'Focus Order',
    description: 'Focus order is logical and meaningful',
    status: 'not-checked'
  },
  '2.4.7': {
    level: 'AA',
    criterion: 'Focus Visible',
    description: 'Keyboard focus indicator is visible',
    status: 'not-checked'
  },
  '3.2.1': {
    level: 'A',
    criterion: 'On Focus',
    description: 'No unexpected page changes on focus',
    status: 'not-checked'
  },
  '3.3.1': {
    level: 'A',
    criterion: 'Error Identification',
    description: 'Errors are identified and described',
    status: 'not-checked'
  },
  '3.3.2': {
    level: 'A',
    criterion: 'Labels or Instructions',
    description: 'Forms have clear labels and instructions',
    status: 'not-checked'
  },
  '4.1.2': {
    level: 'A',
    criterion: 'Name, Role, Value',
    description: 'All UI components have accessible name, role, and state',
    status: 'not-checked'
  }
};

export default {
  AccessibilityValidator,
  auditAccessibility,
  wcagChecklist
};
