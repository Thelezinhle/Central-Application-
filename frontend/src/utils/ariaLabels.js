/**
 * ARIA LABEL UTILITIES - Make the app fully accessible
 * These utilities ensure all interactive elements are labeled for screen readers
 * 
 * Usage: import { getAriaLabel, ariaLabel } from './ariaLabels';
 */

/**
 * Navigation ARIA Labels
 */
export const navigationLabels = {
  home: {
    ariaLabel: 'Go to home page',
    role: 'navigation'
  },
  courses: {
    ariaLabel: 'Browse available courses',
    role: 'navigation'
  },
  universities: {
    ariaLabel: 'Browse universities',
    role: 'navigation'
  },
  dashboard: {
    ariaLabel: 'View your applications dashboard',
    role: 'navigation'
  },
  recommendations: {
    ariaLabel: 'Get course recommendations based on your scores',
    role: 'navigation'
  },
  trackStatus: {
    ariaLabel: 'Track the status of your applications',
    role: 'navigation'
  },
  login: {
    ariaLabel: 'Log in to your account',
    role: 'navigation'
  },
  register: {
    ariaLabel: 'Create a new account',
    role: 'navigation'
  }
};

/**
 * Form ARIA Labels
 */
export const formLabels = {
  email: {
    ariaLabel: 'Email address',
    ariaRequired: true,
    role: 'textbox',
    ariaInvalid: false,
    ariaDescribedby: 'email-error'
  },
  password: {
    ariaLabel: 'Password',
    ariaRequired: true,
    role: 'textbox',
    ariaInvalid: false,
    ariaDescribedby: 'password-error'
  },
  firstName: {
    ariaLabel: 'First name',
    ariaRequired: true
  },
  lastName: {
    ariaLabel: 'Last name',
    ariaRequired: true
  },
  phoneNumber: {
    ariaLabel: 'Phone number',
    ariaRequired: false
  },
  apsScore: {
    ariaLabel: 'Total APS score',
    ariaRequired: true,
    ariaDescribedby: 'aps-help'
  },
  englishAps: {
    ariaLabel: 'English APS score',
    ariaRequired: true
  },
  mathAps: {
    ariaLabel: 'Mathematics APS score',
    ariaRequired: true
  },
  preferredCourse: {
    ariaLabel: 'Preferred course',
    role: 'combobox',
    ariaRequired: true
  },
  agreeTerms: {
    ariaLabel: 'I agree to the terms and conditions',
    role: 'checkbox',
    ariaRequired: true
  }
};

/**
 * Button ARIA Labels
 */
export const buttonLabels = {
  submit: {
    ariaLabel: 'Submit form',
    role: 'button'
  },
  cancel: {
    ariaLabel: 'Cancel and close',
    role: 'button'
  },
  save: {
    ariaLabel: 'Save changes',
    role: 'button'
  },
  delete: {
    ariaLabel: 'Delete this item. Warning: This action cannot be undone.',
    role: 'button'
  },
  apply: {
    ariaLabel: 'Apply for this course',
    role: 'button'
  },
  search: {
    ariaLabel: 'Search',
    role: 'button'
  },
  filter: {
    ariaLabel: 'Open filter options',
    role: 'button'
  },
  sort: {
    ariaLabel: 'Sort results',
    role: 'button'
  },
  edit: {
    ariaLabel: 'Edit this item',
    role: 'button'
  },
  view: {
    ariaLabel: 'View more information',
    role: 'button'
  },
  voiceHelp: {
    ariaLabel: 'Activate voice assistance. Press to enable voice commands.',
    role: 'button'
  },
  voiceMute: {
    ariaLabel: 'Mute voice assistant',
    role: 'button'
  }
};

/**
 * Alert/Status ARIA Labels
 */
export const alertLabels = {
  success: {
    role: 'alert',
    ariaLive: 'polite',
    ariaLabel: 'Success message'
  },
  error: {
    role: 'alert',
    ariaLive: 'assertive',
    ariaLabel: 'Error message'
  },
  warning: {
    role: 'alert',
    ariaLive: 'polite',
    ariaLabel: 'Warning message'
  },
  info: {
    role: 'alert',
    ariaLive: 'polite',
    ariaLabel: 'Information message'
  }
};

/**
 * List ARIA Labels
 */
export const listLabels = {
  courseList: {
    role: 'list',
    ariaLabel: 'Available courses',
    ariaDescribedby: 'course-list-description'
  },
  universityList: {
    role: 'list',
    ariaLabel: 'Available universities',
    ariaDescribedby: 'university-list-description'
  },
  applicationList: {
    role: 'list',
    ariaLabel: 'Your applications',
    ariaDescribedby: 'application-list-description'
  },
  recommendationList: {
    role: 'list',
    ariaLabel: 'Recommended courses based on your scores'
  }
};

/**
 * Modal/Dialog ARIA Labels
 */
export const modalLabels = {
  confirmDelete: {
    role: 'dialog',
    ariaModal: true,
    ariaLabelledby: 'modal-title',
    ariaDescribedby: 'modal-description'
  },
  applicationForm: {
    role: 'dialog',
    ariaModal: true,
    ariaLabelledby: 'form-title',
    ariaDescribedby: 'form-description'
  }
};

/**
 * Helper function to get ARIA attributes for a component
 */
export const getAriaLabel = (componentType, componentName) => {
  const labelMaps = {
    navigation: navigationLabels,
    form: formLabels,
    button: buttonLabels,
    alert: alertLabels,
    list: listLabels,
    modal: modalLabels
  };

  const map = labelMaps[componentType];
  return map?.[componentName] || {};
};

/**
 * Helper to apply ARIA attributes to JSX elements
 */
export const ariaLabel = (ariaAttrs) => {
  const attrs = {};
  
  if (ariaAttrs.ariaLabel) attrs['aria-label'] = ariaAttrs.ariaLabel;
  if (ariaAttrs.ariaRequired !== undefined) attrs['aria-required'] = ariaAttrs.ariaRequired;
  if (ariaAttrs.ariaInvalid !== undefined) attrs['aria-invalid'] = ariaAttrs.ariaInvalid;
  if (ariaAttrs.ariaDescribedby) attrs['aria-describedby'] = ariaAttrs.ariaDescribedby;
  if (ariaAttrs.ariaLabelledby) attrs['aria-labelledby'] = ariaAttrs.ariaLabelledby;
  if (ariaAttrs.ariaLive) attrs['aria-live'] = ariaAttrs.ariaLive;
  if (ariaAttrs.ariaModal !== undefined) attrs['aria-modal'] = ariaAttrs.ariaModal;
  if (ariaAttrs.role) attrs['role'] = ariaAttrs.role;
  
  return attrs;
};

/**
 * Validation messages with ARIA
 */
export const validationAria = {
  required: (fieldName) => ({
    ariaLabel: `${fieldName} is required`,
    ariaInvalid: true,
    role: 'alert'
  }),
  invalid: (fieldName, error) => ({
    ariaLabel: `${fieldName} is invalid: ${error}`,
    ariaInvalid: true,
    role: 'alert'
  }),
  valid: (fieldName) => ({
    ariaLabel: `${fieldName} is valid`,
    ariaInvalid: false
  })
};

/**
 * Common accessibility patterns
 */
export const a11yPatterns = {
  // Skip to main content link
  skipToMain: {
    ariaLabel: 'Skip to main content',
    href: '#main-content'
  },
  
  // Loading state
  loading: {
    ariaLive: 'polite',
    ariaLabel: 'Loading content...',
    role: 'status'
  },
  
  // Pagination
  pagination: {
    role: 'navigation',
    ariaLabel: 'Pagination'
  },
  
  // Search
  searchBox: {
    role: 'search',
    ariaLabel: 'Search for courses and universities'
  },
  
  // Main content area
  main: {
    role: 'main',
    id: 'main-content'
  }
};

export default {
  navigationLabels,
  formLabels,
  buttonLabels,
  alertLabels,
  listLabels,
  modalLabels,
  getAriaLabel,
  ariaLabel,
  validationAria,
  a11yPatterns
};
