/**
 * VOICE COMMANDS - Organized by Category
 * 
 * Each module handles a specific domain:
 * - Navigation
 * - University Management
 * - Course Management
 * - Form Handling
 * - Information & Help
 * 
 * This makes it MUCH easier to:
 * - Add commands
 * - Debug issues
 * - Maintain code
 * - Extend functionality
 */

import { API_BASE_URL } from '../config/api';

const API_UNIVERSITIES = `${API_BASE_URL}/api/universities`;

// ============================================
// NAVIGATION COMMANDS
// ============================================

export const NAVIGATION_COMMANDS = [
  {
    command: 'go to home',
    description: 'Navigate to home page',
    aliases: ['go home', 'home page'],
    action: () => {
      window.location.href = '/';
      return 'Taking you to the home page';
    }
  },
  {
    command: 'go to courses',
    description: 'Navigate to courses page',
    aliases: ['view courses', 'show courses', 'browse courses'],
    action: () => {
      window.location.href = '/courses';
      return 'Taking you to courses. You can search by course name or field of study.';
    }
  },
  {
    command: 'go to universities',
    description: 'Navigate to universities page',
    aliases: ['view universities', 'show universities', 'browse universities'],
    action: () => {
      window.location.href = '/universities';
      return 'Taking you to universities. You can view details and apply directly.';
    }
  },
  {
    command: 'go to dashboard',
    description: 'Navigate to applications dashboard',
    aliases: ['my applications', 'dashboard', 'my apps'],
    action: () => {
      window.location.href = '/dashboard';
      return 'Taking you to your applications dashboard where you can see all your submitted applications.';
    }
  },
  {
    command: 'go to recommendations',
    description: 'Navigate to smart recommendations page',
    aliases: ['recommendations', 'get recommendations', 'my recommendations'],
    action: () => {
      window.location.href = '/recommendations';
      return 'Taking you to recommendations. You can enter your APS score and get personalized course recommendations.';
    }
  },
  {
    command: 'go to track status',
    description: 'Navigate to application status tracking',
    aliases: ['track status', 'application status', 'track applications'],
    action: () => {
      window.location.href = '/track-status';
      return 'Taking you to application status. You can track the progress of your submitted applications.';
    }
  },
  {
    command: 'go to login',
    description: 'Navigate to login page',
    aliases: ['login', 'sign in'],
    action: () => {
      window.location.href = '/login';
      return 'Taking you to login. Please enter your email and password.';
    }
  },
  {
    command: 'go to register',
    description: 'Navigate to registration page',
    aliases: ['register', 'sign up', 'create account'],
    action: () => {
      window.location.href = '/register';
      return 'Taking you to registration. You can create a new account to apply.';
    }
  },
  {
    command: 'go back',
    description: 'Go back to previous page',
    aliases: ['back', 'previous', 'last page'],
    action: () => {
      window.history.back();
      return 'Going back to previous page';
    }
  }
];

// ============================================
// UNIVERSITY COMMANDS
// ============================================

export const UNIVERSITY_COMMANDS = [
  {
    command: 'show all universities',
    description: 'Display list of all universities',
    aliases: ['list universities', 'all universities'],
    action: async () => {
      try {
        const response = await fetch(`${API_UNIVERSITIES}?limit=100`);
        const data = await response.json();
        if (data.universities && data.universities.length > 0) {
          const universityList = data.universities.map(u => u.name).join(', ');
          return `Here are all universities: ${universityList}. Say 'Tell me about' followed by a university name for more information.`;
        }
        return 'No universities found.';
      } catch (error) {
        return 'Could not fetch universities. Please try again.';
      }
    }
  },
  {
    command: 'tell me about *',
    description: 'Get detailed information about a specific university',
    aliases: ['info about *', 'university info *', 'about *'],
    action: async (universityName) => {
      try {
        const response = await fetch(`${API_UNIVERSITIES}?limit=100`);
        const data = await response.json();
        const university = data.universities?.find(u =>
          u.name.toLowerCase().includes(universityName.toLowerCase())
        );

        if (university) {
          let info = `${university.name}. `;
          if (university.description) info += `${university.description}. `;
          if (university.address?.city) info += `Located in ${university.address.city}. `;
          if (university.contact?.email) info += `Email: ${university.contact.email}. `;
          if (university.web_pages?.[0]) info += `Website: ${university.web_pages[0]}. `;
          return info;
        } else {
          return `Could not find ${universityName}. Say "show all universities" to see available options.`;
        }
      } catch (error) {
        return `Error fetching information. Please try again.`;
      }
    }
  },
  {
    command: 'apply to *',
    description: 'Start application process for a specific university',
    aliases: ['apply to * university', 'apply * university'],
    action: async (universityName) => {
      try {
        const response = await fetch(`${API_UNIVERSITIES}?limit=100`);
        const data = await response.json();
        const university = data.universities?.find(u =>
          u.name.toLowerCase().includes(universityName.toLowerCase())
        );

        if (university) {
          window.location.href = `/application?university=${university._id}&name=${encodeURIComponent(university.name)}`;
          return `Opening application form for ${university.name}. You will see form fields to complete.`;
        } else {
          return `Could not find ${universityName}. Say "show all universities" to see available options.`;
        }
      } catch (error) {
        return `Error starting application. Please try again.`;
      }
    }
  },
  {
    command: 'universities in *',
    description: 'Find universities in a specific location',
    aliases: ['find universities in *', 'universities in *'],
    action: async (location) => {
      try {
        const response = await fetch(`${API_UNIVERSITIES}?limit=100`);
        const data = await response.json();
        const foundUniversities = data.universities?.filter(u =>
          (u.address?.city?.toLowerCase().includes(location.toLowerCase())) ||
          (u.country?.toLowerCase().includes(location.toLowerCase()))
        );

        if (foundUniversities && foundUniversities.length > 0) {
          const list = foundUniversities.map(u => u.name).join(', ');
          return `Universities in ${location}: ${list}.`;
        } else {
          return `No universities found in ${location}.`;
        }
      } catch (error) {
        return `Error searching for universities. Please try again.`;
      }
    }
  },
  {
    command: 'compare * and *',
    description: 'Compare two universities side by side',
    aliases: ['compare * with *', 'compare universities * and *'],
    action: async (uni1Name, uni2Name) => {
      try {
        const response = await fetch(`${API_UNIVERSITIES}?limit=100`);
        const data = await response.json();

        const uni1 = data.universities?.find(u =>
          u.name.toLowerCase().includes(uni1Name.toLowerCase())
        );
        const uni2 = data.universities?.find(u =>
          u.name.toLowerCase().includes(uni2Name.toLowerCase())
        );

        if (uni1 && uni2) {
          let comparison = `Comparing ${uni1.name} and ${uni2.name}. `;
          comparison += `${uni1.name} is in ${uni1.country || 'unknown'}. `;
          comparison += `${uni2.name} is in ${uni2.country || 'unknown'}. `;
          if (uni1.address?.city) comparison += `${uni1.name} city: ${uni1.address.city}. `;
          if (uni2.address?.city) comparison += `${uni2.name} city: ${uni2.address.city}. `;
          return comparison;
        } else {
          return `Could not find one or both universities.`;
        }
      } catch (error) {
        return `Error comparing universities.`;
      }
    }
  }
];

// ============================================
// COURSE COMMANDS
// ============================================

export const COURSE_COMMANDS = [
  {
    command: 'search for *',
    description: 'Search for a specific course',
    aliases: ['find *', 'look for *', 'show me *'],
    action: (query) => {
      const searchInput = document.querySelector(
        'input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]'
      );
      if (searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        return `Searching for ${query}. Results will appear below.`;
      }
      return `Could not find search field. Try navigating to courses page first.`;
    }
  },
  {
    command: 'show * courses',
    description: 'Filter courses by category',
    aliases: ['filter by *', 'show * programs'],
    action: (category) => {
      const filterButtons = document.querySelectorAll('button, [role="button"]');
      for (let btn of filterButtons) {
        if (btn.innerText.toLowerCase().includes(category.toLowerCase())) {
          btn.click();
          return `Filtering courses by ${category}.`;
        }
      }
      return `Could not find filter for ${category}. Available filters may vary by page.`;
    }
  },
  {
    command: 'what are the requirements for *',
    description: 'Get entry requirements for a course',
    aliases: ['requirements for *', 'entry requirements *'],
    action: (courseName) => {
      return `To find requirements for ${courseName}, please navigate to the course details page or say "search for ${courseName}".`;
    }
  }
];

// ============================================
// APPLICATION COMMANDS
// ============================================

export const APPLICATION_COMMANDS = [
  {
    command: 'check my application status',
    description: 'Check status of submitted applications',
    aliases: ['my applications', 'application status', 'check status'],
    action: () => {
      window.location.href = '/dashboard';
      return 'Taking you to your applications. You will see all your submitted applications and their current status.';
    }
  },
  {
    command: 'track my application',
    description: 'Track the progress of applications',
    aliases: ['track applications', 'track status'],
    action: () => {
      window.location.href = '/track-status';
      return 'Taking you to application tracking. You can see real-time updates on your applications.';
    }
  },
  {
    command: 'submit application',
    description: 'Submit current application form',
    aliases: ['submit', 'submit form', 'apply now'],
    action: () => {
      const submitBtn = document.querySelector(
        '[data-testid="submit-btn"], button:contains("Submit"), button[type="submit"]'
      );
      if (submitBtn) {
        submitBtn.click();
        return 'Submitting your application. Please wait.';
      }
      return 'Could not find submit button. Please check the form.';
    }
  }
];

// ============================================
// FORM COMMANDS
// ============================================

export const FORM_COMMANDS = [
  {
    command: 'fill * with *',
    description: 'Fill a form field with a value',
    aliases: ['enter * in *', 'type * in *'],
    action: (fieldName, value) => {
      const success = fillFormField(fieldName, value);
      if (success) {
        return `Filled ${fieldName} with ${value}.`;
      }
      return `Could not find field for ${fieldName}. Please check the field name.`;
    }
  },
  {
    command: 'click *',
    description: 'Click a button or element',
    aliases: ['press *', 'click on *'],
    action: (elementName) => {
      const success = clickElement(elementName);
      if (success) {
        return `Clicked on ${elementName}.`;
      }
      return `Could not find ${elementName}. Check the button name and try again.`;
    }
  },
  {
    command: 'submit form',
    description: 'Submit the current form',
    aliases: ['submit', 'send form'],
    action: () => {
      const form = document.querySelector('form');
      if (form) {
        form.submit();
        return 'Submitting form. Please wait.';
      }
      return 'No form found on this page.';
    }
  }
];

// ============================================
// INFORMATION & HELP COMMANDS
// ============================================

export const HELP_COMMANDS = [
  {
    command: 'when is the deadline',
    description: 'Get application deadline information',
    aliases: ['deadline', 'closing date', 'application closes when'],
    action: () => {
      return 'The Central Applications Office deadline is typically in February. Check the website for exact dates for your application cycle.';
    }
  },
  {
    command: 'help',
    description: 'Get help and list common commands',
    aliases: ['what can you do', 'how can you help me'],
    action: () => {
      return 'I can help you navigate this application portal. You can say things like: "go to courses", "apply to a university", "search for engineering", "fill email with your email", or "check my application status". Say "show all commands" for a complete list.';
    }
  },
  {
    command: 'show all commands',
    description: 'Display all available voice commands',
    aliases: ['all commands', 'list commands', 'what commands'],
    action: () => {
      return 'Navigation: go to home, courses, universities, dashboard, recommendations. Universities: show all universities, tell me about a university, apply to a university. Courses: search for a course, show category courses. Forms: fill field with value, click button. Applications: check my status, track my application. Info: deadline, help, where am I. Say any of these commands!';
    }
  },
  {
    command: 'calculate my points',
    description: 'Go to APS calculator for recommendations',
    aliases: ['get recommendations', 'my recommendations', 'calculate points'],
    action: () => {
      window.location.href = '/recommendations';
      return 'Taking you to the smart recommendations page. You can enter your APS score and I will recommend suitable courses.';
    }
  },
  {
    command: 'where am i',
    description: 'Get description of current page',
    aliases: ['what page', 'current page', 'describe page'],
    action: () => {
      // Will be handled by accessibilityBrain
      return 'Use the screen description feature to hear about the current page.';
    }
  }
];

// ============================================
// ACCESSIBILITY COMMANDS
// ============================================

export const ACCESSIBILITY_COMMANDS = [
  {
    command: 'enable voice help',
    description: 'Enable voice assistance system',
    aliases: ['enable voice', 'enable assistance', 'help me'],
    action: () => {
      // Handled by accessibilityBrain
      return 'Voice assistance enabled. I will help guide you.';
    }
  },
  {
    command: 'disable voice help',
    description: 'Disable voice assistance system',
    aliases: ['disable voice', 'disable assistance', 'silent mode'],
    action: () => {
      // Handled by accessibilityBrain
      return 'Voice assistance disabled.';
    }
  },
  {
    command: 'guide me',
    description: 'Enable step-by-step guidance mode',
    aliases: ['step by step', 'guide mode', 'guide me step by step'],
    action: () => {
      return 'Guidance mode enabled. I will provide detailed instructions for each page.';
    }
  },
  {
    command: 'skip guidance',
    description: 'Disable step-by-step guidance',
    aliases: ['no guide', 'skip guide', 'normal mode'],
    action: () => {
      return 'Guidance mode disabled. I will only help when you ask.';
    }
  }
];

// ============================================
// UTILITY COMMANDS (Don't navigate, just helpers)
// ============================================

export const UTILITY_COMMANDS = [
  {
    command: 'scroll down',
    description: 'Scroll down the page',
    aliases: ['scroll', 'page down'],
    action: () => {
      window.scrollBy(0, 300);
      return 'Scrolling down.';
    }
  },
  {
    command: 'scroll up',
    description: 'Scroll up the page',
    aliases: ['scroll up', 'page up'],
    action: () => {
      window.scrollBy(0, -300);
      return 'Scrolling up.';
    }
  },
  {
    command: 'scroll to top',
    description: 'Scroll to top of page',
    aliases: ['top', 'go to top'],
    action: () => {
      window.scrollTo(0, 0);
      return 'Scrolled to top of page.';
    }
  },
  {
    command: 'scroll to bottom',
    description: 'Scroll to bottom of page',
    aliases: ['bottom', 'go to bottom'],
    action: () => {
      window.scrollTo(0, document.body.scrollHeight);
      return 'Scrolled to bottom of page.';
    }
  }
];

// ============================================
// COMBINE ALL COMMANDS
// ============================================

export const ALL_VOICE_COMMANDS = [
  ...NAVIGATION_COMMANDS,
  ...UNIVERSITY_COMMANDS,
  ...COURSE_COMMANDS,
  ...APPLICATION_COMMANDS,
  ...FORM_COMMANDS,
  ...HELP_COMMANDS,
  ...ACCESSIBILITY_COMMANDS,
  ...UTILITY_COMMANDS
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Fill a form field intelligently
 */
export const fillFormField = (fieldName, value) => {
  const fieldNameLower = fieldName.toLowerCase();

  // Try exact matches first
  let input = document.querySelector(`input[name="${fieldNameLower}"]`) ||
    document.querySelector(`input[placeholder*="${fieldName}"]`) ||
    document.querySelector(`input[aria-label*="${fieldName}"]`) ||
    document.querySelector(`[data-field="${fieldNameLower}"]`);

  // Try label association
  if (!input) {
    const labels = document.querySelectorAll('label');
    for (let label of labels) {
      if (label.textContent.toLowerCase().includes(fieldNameLower)) {
        const htmlFor = label.getAttribute('for');
        if (htmlFor) {
          input = document.getElementById(htmlFor);
          break;
        }
      }
    }
  }

  // Last resort: search all inputs
  if (!input) {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
    for (let inp of inputs) {
      if (inp.placeholder?.toLowerCase().includes(fieldNameLower)) {
        input = inp;
        break;
      }
    }
  }

  if (input) {
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.focus();
    return true;
  }

  return false;
};

/**
 * Click an element by name or text content
 */
export const clickElement = (elementName) => {
  const elementNameLower = elementName.toLowerCase();

  // Try data-testid first
  let element = document.querySelector(`[data-testid="${elementNameLower}"]`) ||
    document.querySelector(`button[aria-label*="${elementName}"]`);

  // Search by text content
  if (!element) {
    const buttons = document.querySelectorAll('button, a, [role="button"]');
    for (let btn of buttons) {
      if (btn.textContent.toLowerCase().includes(elementNameLower)) {
        element = btn;
        break;
      }
    }
  }

  if (element) {
    element.click();
    return true;
  }

  return false;
};

/**
 * Export summary by category
 */
export const getCommandsByCategory = () => {
  return {
    Navigation: NAVIGATION_COMMANDS,
    Universities: UNIVERSITY_COMMANDS,
    Courses: COURSE_COMMANDS,
    Applications: APPLICATION_COMMANDS,
    Forms: FORM_COMMANDS,
    Help: HELP_COMMANDS,
    Accessibility: ACCESSIBILITY_COMMANDS,
    Utilities: UTILITY_COMMANDS
  };
};

/**
 * Search for commands by keyword
 */
export const searchCommands = (keyword) => {
  const lowerKeyword = keyword.toLowerCase();
  return ALL_VOICE_COMMANDS.filter(cmd =>
    cmd.command.includes(lowerKeyword) ||
    cmd.description.includes(lowerKeyword) ||
    cmd.aliases?.some(alias => alias.includes(lowerKeyword))
  );
};
