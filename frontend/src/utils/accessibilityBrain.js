/**
 * ACCESSIBILITY BRAIN - Core AI Assistance System
 * 
 * This is the heart of the screen-reader-level accessibility system.
 * It manages:
 * - Permission/opt-in system
 * - Screen awareness and context
 * - Guidance mode
 * - Command processing
 * - Voice quality settings
 */

// ============================================
// 1. STORAGE KEYS & DEFAULTS
// ============================================

const STORAGE_KEYS = {
  VOICE_ENABLED: 'ica_voice_assistance_enabled',
  INTRO_SHOWN: 'ica_accessibility_intro_shown',
  GUIDANCE_MODE: 'ica_guidance_mode_enabled',
  USER_PREFERENCE: 'ica_accessibility_preference',
  VISITED_PAGES: 'ica_visited_pages'
};

const DEFAULT_VOICE_CONFIG = {
  rate: 0.9, // Slower for clarity
  pitch: 0,
  volume: 1,
  voiceSelection: 'default', // 'default', 'azure-neural', 'google'
  language: 'en-US'
};

// ============================================
// 2. PERMISSION LAYER - Ask First!
// ============================================

/**
 * Show initial welcome message to new users
 * Only shows once per browser/device
 */
export const showWelcomePrompt = (speakFunction) => {
  const hasShownIntro = localStorage.getItem(STORAGE_KEYS.INTRO_SHOWN);

  if (!hasShownIntro) {
    const message =
      "Welcome to the Central Applications Office portal. " +
      "If you need voice assistance to navigate, say 'Enable voice help'. " +
      "If not, you can continue normally. " +
      "You can change this setting anytime.";

    speakFunction(message);
    return true; // Intro was shown
  }
  return false; // Intro already shown
};

/**
 * Enable voice assistance system
 */
export const enableVoiceAssistance = () => {
  localStorage.setItem(STORAGE_KEYS.VOICE_ENABLED, 'true');
  localStorage.setItem(STORAGE_KEYS.INTRO_SHOWN, 'true');
  return 'Voice assistance enabled. I will help guide you through the application.';
};

/**
 * Disable voice assistance system
 */
export const disableVoiceAssistance = () => {
  localStorage.setItem(STORAGE_KEYS.VOICE_ENABLED, 'false');
  return 'Voice assistance disabled. You can enable it again anytime.';
};

/**
 * Check if voice assistance is enabled
 */
export const isVoiceAssistanceEnabled = () => {
  return localStorage.getItem(STORAGE_KEYS.VOICE_ENABLED) === 'true';
};

/**
 * Check if this is a returning user
 */
export const isReturningUser = () => {
  return localStorage.getItem(STORAGE_KEYS.INTRO_SHOWN) === 'true';
};

// ============================================
// 3. GUIDANCE MODE - Step-by-Step Help
// ============================================

/**
 * Enable guidance mode (step-by-step instruction)
 */
export const enableGuidanceMode = () => {
  localStorage.setItem(STORAGE_KEYS.GUIDANCE_MODE, 'true');
  return 'Guidance mode enabled. I will provide step-by-step assistance.';
};

/**
 * Disable guidance mode
 */
export const disableGuidanceMode = () => {
  localStorage.setItem(STORAGE_KEYS.GUIDANCE_MODE, 'false');
  return 'Guidance mode disabled. I will only help when you ask.';
};

/**
 * Check if guidance mode is active
 */
export const isGuidanceModeEnabled = () => {
  return localStorage.getItem(STORAGE_KEYS.GUIDANCE_MODE) === 'true';
};

// ============================================
// 4. SCREEN DESCRIPTION ENGINE
// ============================================

/**
 * Get current page information
 */
const getCurrentPageInfo = () => {
  const currentUrl = window.location.pathname;
  const pageTitle = document.title;

  const pageDescriptions = {
    '/': {
      name: 'Home',
      description: 'Welcome page for the Central Applications Office portal'
    },
    '/courses': {
      name: 'Courses',
      description: 'Browse and search available university courses'
    },
    '/universities': {
      name: 'Universities',
      description: 'View information about member universities'
    },
    '/dashboard': {
      name: 'Applications Dashboard',
      description: 'View and manage your submitted applications'
    },
    '/recommendations': {
      name: 'Smart Recommendations',
      description: 'Get personalized course recommendations based on your APS score'
    },
    '/track-status': {
      name: 'Application Status',
      description: 'Track the status of your university applications'
    },
    '/login': {
      name: 'Login',
      description: 'Sign in to your account'
    },
    '/register': {
      name: 'Register',
      description: 'Create a new account'
    },
    '/admin': {
      name: 'Admin Dashboard',
      description: 'Administrative controls and analytics'
    }
  };

  return pageDescriptions[currentUrl] || {
    name: pageTitle,
    description: 'Current page'
  };
};

/**
 * Extract interactive elements from current page
 */
const extractPageElements = () => {
  const elements = {
    buttons: [],
    links: [],
    formFields: [],
    headings: [],
    mainContent: []
  };

  // Get buttons
  document.querySelectorAll('button').forEach((btn, idx) => {
    if (idx < 8 && btn.innerText.trim()) {
      elements.buttons.push(btn.innerText.trim());
    }
  });

  // Get navigation links
  document.querySelectorAll('nav a, [role="navigation"] a').forEach((link, idx) => {
    if (idx < 6 && link.innerText.trim()) {
      elements.links.push(link.innerText.trim());
    }
  });

  // Get form fields
  document.querySelectorAll('input[type="text"], input[type="email"], textarea').forEach((field) => {
    const label = field.previousElementSibling?.innerText || field.placeholder || field.name;
    if (label && elements.formFields.length < 5) {
      elements.formFields.push(label);
    }
  });

  // Get headings
  document.querySelectorAll('h1, h2').forEach((heading, idx) => {
    if (idx < 4 && heading.innerText.trim()) {
      elements.headings.push(heading.innerText.trim());
    }
  });

  return elements;
};

/**
 * Generate a natural description of the current screen
 * This is the STAR feature for blind users
 */
export const describeCurrentScreen = () => {
  const pageInfo = getCurrentPageInfo();
  const elements = extractPageElements();

  let description = `You are on the ${pageInfo.name} page. ${pageInfo.description}. `;

  if (elements.headings.length > 0) {
    description += `Main sections include: ${elements.headings.join(', ')}. `;
  }

  if (elements.buttons.length > 0) {
    description += `Available actions: ${elements.buttons.join(', ')}. `;
  }

  if (elements.formFields.length > 0) {
    description += `Form fields available: ${elements.formFields.join(', ')}. `;
  }

  if (elements.links.length > 0) {
    description += `You can navigate to: ${elements.links.join(', ')}. `;
  }

  description += `You can say 'help' for available commands or ask me a question.`;

  return description;
};

/**
 * Get context-aware help message
 */
export const getContextualHelp = () => {
  const pageInfo = getCurrentPageInfo();

  const helpMessages = {
    '/': 'Say "go to courses" to search courses, "go to universities" to view universities, or "go to dashboard" to see your applications.',
    '/courses': 'Say "search for [course name]", "show [category] courses", or "tell me about [course]".',
    '/universities': 'Say "show all universities", "tell me about [university]", "apply to [university]", or "universities in [location]".',
    '/recommendations': 'Say "fill email with [email]" or "fill APS with [score]" to get personalized recommendations.',
    '/dashboard': 'Say "show my applications", "check application status", or "track my application".',
    '/login': 'Say "fill email with [your-email]", "fill password with [password]", or "click login".',
  };

  return helpMessages[window.location.pathname] ||
    'You can navigate using voice commands. Say "help" to hear all available commands.';
};

// ============================================
// 5. PRE-LAUNCH ORIENTATION
// ============================================

/**
 * Complete orientation flow for first-time users
 */
export const runPreLaunchOrientation = async (speakFunction) => {
  if (isReturningUser() && isVoiceAssistanceEnabled()) {
    return; // Skip for returning users
  }

  // Step 1: Welcome
  const welcomeMsg =
    "Welcome to the Central Applications Office portal. " +
    "This application helps you search for university courses, " +
    "apply to multiple universities, and track your applications. ";

  speakFunction(welcomeMsg);
  await sleep(4000); // Give time to listen

  // Step 2: Feature summary
  const featuresMsg =
    "Key features include: Browse courses, view universities, " +
    "get personalized course recommendations based on your APS score, " +
    "and track application status. ";

  speakFunction(featuresMsg);
  await sleep(4000);

  // Step 3: Ask for help
  const helpMsg =
    "Would you like me to guide you step by step? " +
    "Say 'Yes guide me' for guidance mode, " +
    "or 'Skip' to continue on your own. ";

  speakFunction(helpMsg);
};

/**
 * Helper: Sleep function (for async delays)
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// 6. VOICE CONFIGURATION
// ============================================

/**
 * Get current voice configuration
 */
export const getVoiceConfig = () => {
  const saved = localStorage.getItem('ica_voice_config');
  return saved ? JSON.parse(saved) : DEFAULT_VOICE_CONFIG;
};

/**
 * Update voice configuration
 */
export const setVoiceConfig = (config) => {
  const current = getVoiceConfig();
  const updated = { ...current, ...config };
  localStorage.setItem('ica_voice_config', JSON.stringify(updated));
  return updated;
};

/**
 * Available neural voice options
 */
export const VOICE_OPTIONS = {
  default: {
    name: 'Browser Default',
    provider: 'Web Speech API'
  },
  'en-US-Neural2-D': {
    name: 'Google Neural (Friendly)',
    provider: 'Google Cloud TTS',
    rate: 0.85,
    pitch: 0
  },
  'en-US-Neural2-C': {
    name: 'Google Neural (Professional)',
    provider: 'Google Cloud TTS',
    rate: 0.9,
    pitch: 0
  },
  'azure-neural': {
    name: 'Azure Neural (Natural)',
    provider: 'Microsoft Azure TTS',
    rate: 0.9,
    pitch: 0
  }
};

// ============================================
// 7. SESSION TRACKING
// ============================================

/**
 * Track visited pages for contextual help
 */
export const recordPageVisit = () => {
  const visited = JSON.parse(localStorage.getItem(STORAGE_KEYS.VISITED_PAGES) || '[]');
  const currentPage = window.location.pathname;

  if (!visited.includes(currentPage)) {
    visited.push(currentPage);
    localStorage.setItem(STORAGE_KEYS.VISITED_PAGES, JSON.stringify(visited));
  }
};

/**
 * Get user's accessibility preference profile
 */
export const getAccessibilityProfile = () => {
  const profile = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCE);
  return profile ? JSON.parse(profile) : null;
};

/**
 * Set user's accessibility preference profile
 */
export const setAccessibilityProfile = (profile) => {
  localStorage.setItem(STORAGE_KEYS.USER_PREFERENCE, JSON.stringify(profile));
};

// ============================================
// 8. DIAGNOSTICS & DEBUGGING
// ============================================

/**
 * Get accessibility system status
 */
export const getAccessibilityStatus = () => {
  return {
    voiceEnabled: isVoiceAssistanceEnabled(),
    guidanceEnabled: isGuidanceModeEnabled(),
    isReturningUser: isReturningUser(),
    currentPage: window.location.pathname,
    voiceConfig: getVoiceConfig(),
    timestamp: new Date().toISOString()
  };
};

/**
 * Reset all accessibility settings (for testing)
 */
export const resetAccessibilitySettings = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  console.log('✅ Accessibility settings reset');
};

// ============================================
// EXPORT SUMMARY
// ============================================

export default {
  // Permission & Opt-in
  showWelcomePrompt,
  enableVoiceAssistance,
  disableVoiceAssistance,
  isVoiceAssistanceEnabled,
  isReturningUser,

  // Guidance Mode
  enableGuidanceMode,
  disableGuidanceMode,
  isGuidanceModeEnabled,

  // Screen Description
  describeCurrentScreen,
  getContextualHelp,

  // Orientation
  runPreLaunchOrientation,

  // Voice Config
  getVoiceConfig,
  setVoiceConfig,
  VOICE_OPTIONS,

  // Session & Profile
  recordPageVisit,
  getAccessibilityProfile,
  setAccessibilityProfile,

  // Diagnostics
  getAccessibilityStatus,
  resetAccessibilitySettings
};
