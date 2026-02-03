/**
 * VOICE COMMAND PROCESSOR - Main Engine
 * 
 * This is the BRAIN that coordinates:
 * - Accessibility system (accessibilityBrain.js)
 * - Command modules (voiceCommandsModular.js)
 * - ARIA validation (ariaHelper.js)
 * 
 * It processes voice input intelligently and delegates to appropriate system
 */

import {
  isVoiceAssistanceEnabled,
  enableVoiceAssistance,
  disableVoiceAssistance,
  describeCurrentScreen,
  getContextualHelp,
  isGuidanceModeEnabled,
  enableGuidanceMode,
  disableGuidanceMode,
  recordPageVisit
} from './accessibilityBrain';

import {
  ALL_VOICE_COMMANDS,
  searchCommands,
  getCommandsByCategory,
  fillFormField,
  clickElement
} from './voiceCommandsModular';

import {
  auditPageAccessibility,
  getClickableElements,
  getFormFields
} from './ariaHelper';

// ============================================
// VOICE PROCESSOR CORE
// ============================================

/**
 * Main voice command processor
 * Returns: { success, message, action }
 */
export const processVoiceInput = async (transcript, speakCallback) => {
  const lowerTranscript = transcript.toLowerCase().trim();

  // Check if voice assistance is enabled
  if (!isVoiceAssistanceEnabled()) {
    return {
      success: false,
      message: 'Voice assistance is not enabled. Say "enable voice help" to activate.',
      shouldNotProcess: true
    };
  }

  // Record page visit for analytics
  recordPageVisit();

  // Try exact command match first
  const commandResult = await tryExactCommandMatch(lowerTranscript);
  if (commandResult.matched) {
    return commandResult;
  }

  // Try natural language processing
  const nlpResult = processNaturalLanguage(lowerTranscript);
  if (nlpResult.success) {
    return nlpResult;
  }

  // Provide helpful suggestions
  return {
    success: false,
    message: `I didn't understand that command. ${getContextualHelp()} Say "help" for more options.`,
    suggestHelp: true
  };
};

/**
 * Try to match exact command patterns
 */
const tryExactCommandMatch = async (transcript) => {
  for (const cmd of ALL_VOICE_COMMANDS) {
    // Try exact match first
    if (transcript === cmd.command) {
      const result = await executeCommand(cmd, []);
      return { matched: true, ...result };
    }

    // Try aliases
    if (cmd.aliases) {
      for (const alias of cmd.aliases) {
        if (transcript === alias) {
          const result = await executeCommand(cmd, []);
          return { matched: true, ...result };
        }
      }
    }

    // Try pattern matching for wildcard commands
    if (cmd.command.includes('*')) {
      const pattern = cmd.command.replace(/\*/g, '(.+?)');
      const regex = new RegExp(`^${pattern}$`);
      const match = transcript.match(regex);

      if (match) {
        const args = match.slice(1).filter(x => x);
        const result = await executeCommand(cmd, args);
        return { matched: true, ...result };
      }
    }
  }

  return { matched: false };
};

/**
 * Execute a command safely
 */
const executeCommand = async (command, args) => {
  try {
    let result = command.action(...args);

    // Handle async actions
    if (result instanceof Promise) {
      result = await result;
    }

    return {
      success: true,
      message: typeof result === 'string' ? result : 'Command executed',
      command: command.command
    };
  } catch (error) {
    console.error('Command execution error:', error);
    return {
      success: false,
      message: `Error executing command: ${error.message}`,
      error: error
    };
  }
};

// ============================================
// NATURAL LANGUAGE PROCESSING
// ============================================

/**
 * Process natural language input
 * Handles requests that don't match exact patterns
 */
const processNaturalLanguage = (transcript) => {
  // ACCESSIBILITY COMMANDS
  if (/(enable|turn on|activate).*(voice|help|assistance)/.test(transcript)) {
    enableVoiceAssistance();
    return {
      success: true,
      message: 'Voice assistance enabled. I will guide you through the application.',
      category: 'accessibility'
    };
  }

  if (/(disable|turn off|deactivate).*(voice|help|assistance)/.test(transcript)) {
    disableVoiceAssistance();
    return {
      success: true,
      message: 'Voice assistance disabled.',
      category: 'accessibility'
    };
  }

  // GUIDANCE MODE
  if (/(enable|turn on|activate).*(guide|step by step)/.test(transcript)) {
    enableGuidanceMode();
    return {
      success: true,
      message: 'Guidance mode enabled. I will provide step-by-step assistance.',
      category: 'accessibility'
    };
  }

  if (/(disable|turn off).*(guide|step by step)/.test(transcript)) {
    disableGuidanceMode();
    return {
      success: true,
      message: 'Guidance mode disabled.',
      category: 'accessibility'
    };
  }

  // SCREEN DESCRIPTION
  if (/(where am i|describe|current page|what page|describe screen)/.test(transcript)) {
    const description = describeCurrentScreen();
    return {
      success: true,
      message: description,
      category: 'screen-description'
    };
  }

  // CONTEXTUAL HELP
  if (/(help|what can i do|how can you help|what commands)/.test(transcript)) {
    return {
      success: true,
      message: getContextualHelp(),
      category: 'help'
    };
  }

  // SEARCH COMMANDS
  if (/(search for|find|look for|show me).+(?:course|university|program)/.test(transcript)) {
    const match = transcript.match(/(search for|find|look for|show me)\s+(.+?)(?:course|university|program)/);
    const query = match ? match[2].trim() : 'items';

    // Try to fill search field
    const searchInput = document.querySelector(
      'input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]'
    );

    if (searchInput) {
      searchInput.value = query;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      return {
        success: true,
        message: `Searching for ${query}. Results will appear below.`,
        category: 'search'
      };
    }

    return {
      success: true,
      message: `I can help you search for ${query}. Please navigate to the courses or universities page first.`,
      category: 'search'
    };
  }

  // GREETINGS
  if (/(hello|hi|hey|good morning|good afternoon)/.test(transcript)) {
    return {
      success: true,
      message: 'Hello! How can I help you with your application today?',
      category: 'greeting'
    };
  }

  // THANKS
  if (/(thank you|thanks|appreciate)/.test(transcript)) {
    return {
      success: true,
      message: 'You\'re welcome! Is there anything else I can help you with?',
      category: 'gratitude'
    };
  }

  // AFFIRMATION
  if (/(yes|yeah|yep|okay|ok|alright|sure|definitely)/.test(transcript)) {
    return {
      success: true,
      message: 'Great! What would you like to do next?',
      category: 'affirmation'
    };
  }

  // NEGATION
  if (/(no|nope|not really|nah|don't|stop|pause)/.test(transcript)) {
    return {
      success: true,
      message: 'No problem. Let me know if you need anything!',
      category: 'negation'
    };
  }

  return { success: false };
};

// ============================================
// COMMAND DISCOVERY & HELP
// ============================================

/**
 * Search for commands by keyword
 */
export const findCommandsByKeyword = (keyword) => {
  return searchCommands(keyword);
};

/**
 * Get all commands organized by category
 */
export const getAllCommandsByCategory = () => {
  return getCommandsByCategory();
};

/**
 * Get quick help for current page
 */
export const getPageSpecificHelp = () => {
  return getContextualHelp();
};

/**
 * Get description of current page
 */
export const getPageDescription = () => {
  return describeCurrentScreen();
};

// ============================================
// VOICE COMMAND DEBUGGING
// ============================================

/**
 * Debug mode: Show what the voice system is detecting
 */
export const enableVoiceDebugMode = () => {
  window.VOICE_DEBUG = true;
  console.log('🎤 Voice Debug Mode ENABLED');
  console.log('All voice commands will be logged to console');
};

/**
 * Disable debug mode
 */
export const disableVoiceDebugMode = () => {
  window.VOICE_DEBUG = false;
  console.log('🎤 Voice Debug Mode DISABLED');
};

/**
 * Log voice command for debugging
 */
export const logVoiceCommand = (transcript, result) => {
  if (window.VOICE_DEBUG) {
    console.log(`🎤 Voice Input: "${transcript}"`);
    console.log(`📊 Result:`, result);
  }
};

// ============================================
// ACCESSIBILITY AUDIT INTEGRATION
// ============================================

/**
 * Run accessibility check and report issues
 * Called periodically or on demand
 */
export const performAccessibilityCheck = () => {
  const report = auditPageAccessibility();

  if (report.summary.critical > 0) {
    console.warn(`⚠️  ${report.summary.critical} critical accessibility issues found`);
  }

  if (window.VOICE_DEBUG) {
    console.log('📋 Accessibility Audit:', report);
  }

  return report;
};

/**
 * Get interactive elements that voice can control
 */
export const getVoiceControllableElements = () => {
  const buttons = getClickableElements();
  const formFields = getFormFields();

  return {
    buttons: buttons,
    formFields: formFields,
    totalInteractive: buttons.length + formFields.length
  };
};

// ============================================
// GUIDANCE MODE HELPERS
// ============================================

/**
 * Get step-by-step guidance for current page
 */
export const getPageGuidance = () => {
  const pageGuidance = {
    '/': {
      steps: [
        'Welcome to the Central Applications Office portal',
        'You can search for courses or universities using voice commands',
        'Say "go to courses" to browse available programs',
        'Or say "go to universities" to view member institutions'
      ]
    },
    '/courses': {
      steps: [
        'You are on the courses page',
        'You can search for courses by name using "search for [course name]"',
        'Or filter by category using "show [category] courses"',
        'Click on a course to see full details and entry requirements'
      ]
    },
    '/universities': {
      steps: [
        'You are on the universities page',
        'You can view all member universities',
        'Say "tell me about [university name]" for more information',
        'Or say "apply to [university name]" to start an application'
      ]
    },
    '/dashboard': {
      steps: [
        'You are on your applications dashboard',
        'Here you can see all your submitted applications',
        'Click on an application to view or edit details',
        'Track your application status in real-time'
      ]
    },
    '/recommendations': {
      steps: [
        'You are on the smart recommendations page',
        'Enter your APS score to get personalized course recommendations',
        'Say "fill APS with [score]" to enter your score',
        'Then click "Get Recommendations" to see matches'
      ]
    }
  };

  const guidance = pageGuidance[window.location.pathname] || {
    steps: [
      'You are on a page in the Central Applications Office portal',
      'Say "help" to learn what you can do on this page',
      'Or say "where am I" to hear a description of the current page'
    ]
  };

  return guidance;
};

/**
 * Speak next guidance step
 */
export const getNextGuidanceStep = () => {
  if (!isGuidanceModeEnabled()) {
    return null;
  }

  const guidance = getPageGuidance();
  // Store current step in session
  const currentStep = parseInt(sessionStorage.getItem('guidance_step') || '0');
  const nextStep = currentStep + 1;

  if (nextStep < guidance.steps.length) {
    sessionStorage.setItem('guidance_step', nextStep.toString());
    return guidance.steps[nextStep];
  }

  return null;
};

// ============================================
// EXPORT
// ============================================

export default {
  // Main processor
  processVoiceInput,

  // Command discovery
  findCommandsByKeyword,
  getAllCommandsByCategory,
  getPageSpecificHelp,
  getPageDescription,

  // Debugging
  enableVoiceDebugMode,
  disableVoiceDebugMode,
  logVoiceCommand,

  // Accessibility
  performAccessibilityCheck,
  getVoiceControllableElements,

  // Guidance
  getPageGuidance,
  getNextGuidanceStep
};
