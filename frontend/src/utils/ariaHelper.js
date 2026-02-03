/**
 * ARIA LABELS HELPER
 * 
 * This tool ensures ALL interactive elements have proper ARIA labels
 * Required for screen readers and voice assistants to understand the UI
 * 
 * This is CRITICAL for accessibility - matches your voice system!
 */

// ============================================
// ARIA VALIDATION & HELPERS
// ============================================

/**
 * Check if an element needs an ARIA label
 */
const needsAriaLabel = (element) => {
  const roles = ['button', 'link', 'menuitem', 'tab', 'checkbox', 'radio'];
  const role = element.getAttribute('role');
  const isInteractive = ['button', 'a', 'input', 'select', 'textarea'].includes(element.tagName.toLowerCase());

  return isInteractive || (role && roles.includes(role));
};

/**
 * Check if element already has accessible text
 */
const hasAccessibleText = (element) => {
  // Check ARIA labels first
  if (element.getAttribute('aria-label')) return true;
  if (element.getAttribute('aria-labelledby')) return true;

  // Check visible text
  if (element.innerText?.trim()) return true;

  // Check for title attribute
  if (element.getAttribute('title')) return true;

  // Check associated label for form inputs
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label && label.innerText?.trim()) return true;
  }

  // Check placeholder
  if (element.placeholder?.trim()) return true;

  // Check image alt text
  if (element.tagName === 'IMG' && element.getAttribute('alt')) return true;

  return false;
};

/**
 * Get best accessible text for an element
 */
const getAccessibleText = (element) => {
  if (element.getAttribute('aria-label')) {
    return element.getAttribute('aria-label');
  }
  if (element.innerText?.trim()) {
    return element.innerText.trim().substring(0, 100); // Limit length
  }
  if (element.getAttribute('title')) {
    return element.getAttribute('title');
  }
  if (element.placeholder?.trim()) {
    return element.placeholder.trim();
  }
  if (element.getAttribute('alt')) {
    return element.getAttribute('alt');
  }
  return null;
};

// ============================================
// ACCESSIBILITY AUDIT
// ============================================

/**
 * Scan page for accessibility issues
 * Returns detailed report
 */
export const auditPageAccessibility = () => {
  const report = {
    timestamp: new Date().toISOString(),
    page: window.location.pathname,
    issues: [],
    summary: {
      total: 0,
      critical: 0,
      warnings: 0,
      tips: 0
    },
    elements: {
      buttonsWithoutLabels: [],
      linksWithoutLabels: [],
      imagesWithoutAlt: [],
      formFieldsWithoutLabels: [],
      missingLandmarks: []
    }
  };

  // Check buttons
  const buttons = document.querySelectorAll('button, [role="button"]');
  buttons.forEach((btn, idx) => {
    if (!hasAccessibleText(btn)) {
      report.elements.buttonsWithoutLabels.push({
        index: idx,
        html: btn.outerHTML.substring(0, 100),
        suggestion: `Add aria-label="${btn.textContent.trim() || 'button-action'}"`
      });
      report.issues.push({
        level: 'critical',
        type: 'Button without accessible label',
        element: `button[${idx}]`,
        fix: `Add aria-label or text content to button`
      });
    }
  });

  // Check links
  const links = document.querySelectorAll('a');
  links.forEach((link, idx) => {
    if (!hasAccessibleText(link)) {
      report.elements.linksWithoutLabels.push({
        index: idx,
        html: link.outerHTML.substring(0, 100)
      });
      report.issues.push({
        level: 'critical',
        type: 'Link without accessible label',
        element: `a[${idx}]`,
        fix: `Add aria-label or meaningful link text`
      });
    }
  });

  // Check images
  const images = document.querySelectorAll('img');
  images.forEach((img, idx) => {
    if (!img.getAttribute('alt') && !img.getAttribute('aria-label')) {
      report.elements.imagesWithoutAlt.push({
        index: idx,
        src: img.src
      });
      report.issues.push({
        level: 'warning',
        type: 'Image without alt text',
        element: `img[${idx}]`,
        fix: `Add alt="${img.src.split('/').pop()}"`
      });
    }
  });

  // Check form fields
  const formFields = document.querySelectorAll('input[type="text"], input[type="email"], textarea, select');
  formFields.forEach((field, idx) => {
    if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
      if (!field.id || !document.querySelector(`label[for="${field.id}"]`)) {
        report.elements.formFieldsWithoutLabels.push({
          index: idx,
          type: field.type || 'input',
          name: field.name
        });
        report.issues.push({
          level: 'warning',
          type: 'Form field without label',
          element: `input[${idx}]`,
          fix: `Add <label for="${field.id}"> or aria-label="${field.name}"`
        });
      }
    }
  });

  // Check for main landmark
  if (!document.querySelector('main')) {
    report.issues.push({
      level: 'tip',
      type: 'Missing main landmark',
      fix: 'Wrap main content in <main> tag'
    });
  }

  // Check for nav landmark
  if (!document.querySelector('nav') && !document.querySelector('[role="navigation"]')) {
    report.issues.push({
      level: 'tip',
      type: 'Missing navigation landmark',
      fix: 'Wrap navigation in <nav> tag'
    });
  }

  // Summary counts
  report.summary.critical = report.issues.filter(i => i.level === 'critical').length;
  report.summary.warnings = report.issues.filter(i => i.level === 'warning').length;
  report.summary.tips = report.issues.filter(i => i.level === 'tip').length;
  report.summary.total = report.issues.length;

  return report;
};

/**
 * Generate audit report as readable text
 */
export const auditReportAsText = (report) => {
  let text = `📊 Accessibility Audit Report\n`;
  text += `Page: ${report.page}\n`;
  text += `Time: ${report.timestamp}\n\n`;

  text += `Summary:\n`;
  text += `✋ Critical Issues: ${report.summary.critical}\n`;
  text += `⚠️  Warnings: ${report.summary.warnings}\n`;
  text += `💡 Tips: ${report.summary.tips}\n\n`;

  if (report.elements.buttonsWithoutLabels.length > 0) {
    text += `Buttons without labels (${report.elements.buttonsWithoutLabels.length}):\n`;
    report.elements.buttonsWithoutLabels.forEach(btn => {
      text += `  - Button ${btn.index}: ${btn.suggestion}\n`;
    });
    text += '\n';
  }

  if (report.elements.linksWithoutLabels.length > 0) {
    text += `Links without labels (${report.elements.linksWithoutLabels.length}):\n`;
    text += `  Add aria-label to each link\n\n`;
  }

  if (report.elements.imagesWithoutAlt.length > 0) {
    text += `Images without alt text (${report.elements.imagesWithoutAlt.length}):\n`;
    text += `  Add alt="" to each image\n\n`;
  }

  if (report.elements.formFieldsWithoutLabels.length > 0) {
    text += `Form fields without labels (${report.elements.formFieldsWithoutLabels.length}):\n`;
    text += `  Associate labels or add aria-label\n\n`;
  }

  return text;
};

// ============================================
// AUTO-FIX SUGGESTIONS
// ============================================

/**
 * Suggest ARIA fixes for common patterns
 */
export const suggestAriaFixes = () => {
  const fixes = [];

  // Icon buttons
  const iconButtons = document.querySelectorAll('button:has(svg), button:has(i)');
  iconButtons.forEach((btn, idx) => {
    if (!hasAccessibleText(btn)) {
      const icon = btn.querySelector('svg, i')?.className || 'icon';
      fixes.push({
        type: 'icon-button',
        element: btn,
        suggestion: `<button aria-label="action-name">\n  <svg>...</svg>\n</button>`,
        example: `aria-label="Delete course" or aria-label="Edit application"`
      });
    }
  });

  // Links without text
  const emptyLinks = document.querySelectorAll('a:empty, a:has(img:only-child)');
  emptyLinks.forEach((link) => {
    fixes.push({
      type: 'empty-link',
      element: link,
      suggestion: 'Add aria-label="link description"',
      example: 'aria-label="View course details"'
    });
  });

  // Close buttons (X)
  const closeButtons = document.querySelectorAll('button:contains("×"), button:contains("✕"), [aria-label*="close"]');
  closeButtons.forEach((btn) => {
    if (!btn.getAttribute('aria-label') || !btn.getAttribute('aria-label').includes('close')) {
      fixes.push({
        type: 'close-button',
        element: btn,
        suggestion: 'aria-label="Close dialog" or aria-label="Close modal"'
      });
    }
  });

  return fixes;
};

// ============================================
// ARIA LABEL TEMPLATES
// ============================================

export const ARIA_TEMPLATES = {
  // Buttons
  button: {
    submit: 'aria-label="Submit form"',
    cancel: 'aria-label="Cancel action"',
    delete: 'aria-label="Delete item"',
    edit: 'aria-label="Edit item"',
    close: 'aria-label="Close dialog"',
    menu: 'aria-label="Open menu"',
    search: 'aria-label="Search courses"'
  },

  // Links
  link: {
    moreInfo: 'aria-label="Learn more about this course"',
    courseDetails: 'aria-label="View course details"',
    universityProfile: 'aria-label="View university profile"',
    apply: 'aria-label="Apply to this program"'
  },

  // Form fields
  form: {
    email: 'aria-label="Enter email address"',
    password: 'aria-label="Enter password"',
    search: 'aria-label="Search courses or universities"',
    apsScore: 'aria-label="Enter your total APS score"',
    courseName: 'aria-label="Select a course"'
  },

  // Navigation
  nav: {
    mainNav: 'aria-label="Main navigation"',
    breadcrumb: 'aria-label="Breadcrumb navigation"',
    pagination: 'aria-label="Pagination controls"'
  },

  // Regions
  region: {
    main: '<main aria-label="Main content">',
    sidebar: '<aside aria-label="Sidebar">',
    footer: '<footer aria-label="Site footer">',
    banner: '<header aria-label="Site header">'
  }
};

// ============================================
// AUTOMATED ARIA INJECTION
// ============================================

/**
 * Auto-add ARIA labels based on context
 * Use with caution - manually verify results
 */
export const autoAddAriaLabels = () => {
  let added = 0;

  // Buttons without labels - try to infer from context
  document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach((btn) => {
    if (!hasAccessibleText(btn)) {
      // Try to infer from nearby text or icon
      const icon = btn.querySelector('svg, i');
      if (icon && icon.className) {
        const className = icon.className.baseVal || icon.className;
        const labels = {
          'fa-trash': 'Delete',
          'fa-pencil': 'Edit',
          'fa-times': 'Close',
          'fa-search': 'Search',
          'fa-menu': 'Menu'
        };

        for (const [key, value] of Object.entries(labels)) {
          if (className.includes(key)) {
            btn.setAttribute('aria-label', value);
            added++;
            break;
          }
        }
      }
    }
  });

  return {
    ariaLabelsAdded: added,
    message: `Added ${added} ARIA labels automatically. Please review for accuracy.`
  };
};

// ============================================
// VOICE COMMAND SUPPORT
// ============================================

/**
 * Get all clickable elements with their ARIA labels
 * Used by voice commands to find elements
 */
export const getClickableElements = () => {
  const elements = [];

  document.querySelectorAll('button, a, [role="button"], [role="link"]').forEach((el) => {
    const label = getAccessibleText(el) || 'unlabeled-element';
    elements.push({
      element: el,
      label: label,
      type: el.tagName.toLowerCase(),
      ariaLabel: el.getAttribute('aria-label'),
      dataTestId: el.getAttribute('data-testid')
    });
  });

  return elements;
};

/**
 * Get all form fields with their labels
 * Used by "fill field" voice commands
 */
export const getFormFields = () => {
  const fields = [];

  document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea, select').forEach((field) => {
    const label = getAccessibleText(field) || field.name || 'field';
    fields.push({
      element: field,
      label: label,
      name: field.name,
      type: field.type || 'text',
      id: field.id,
      required: field.required,
      placeholder: field.placeholder
    });
  });

  return fields;
};

// ============================================
// TESTING & VALIDATION
// ============================================

/**
 * Simulate screen reader output
 * Helps verify voice assistant can understand the page
 */
export const getScreenReaderOutput = () => {
  let output = '';

  // Page title
  output += `Page: ${document.title}\n\n`;

  // Main headings
  const headings = document.querySelectorAll('h1, h2, h3');
  if (headings.length > 0) {
    output += 'Headings:\n';
    headings.forEach(h => {
      output += `- ${h.innerText}\n`;
    });
    output += '\n';
  }

  // Main content
  const main = document.querySelector('main');
  if (main) {
    output += `Main content: ${main.innerText?.substring(0, 200)}...\n\n`;
  }

  // Interactive elements
  output += 'Interactive elements:\n';
  getClickableElements().slice(0, 10).forEach(el => {
    output += `- [${el.type}] ${el.label}\n`;
  });

  return output;
};

/**
 * Export all validation functions
 */
export default {
  auditPageAccessibility,
  auditReportAsText,
  suggestAriaFixes,
  autoAddAriaLabels,
  getClickableElements,
  getFormFields,
  getScreenReaderOutput,
  ARIA_TEMPLATES,
  hasAccessibleText,
  getAccessibleText
};
