export const ICA_VOICE_COMMANDS = [
    // NAVIGATION COMMANDS
    {
        command: 'go to home',
        description: 'Navigate to home page',
        action: () => {
            window.location.href = '/';
            return 'Taking you to the home page';
        }
    },
    {
        command: 'go to dashboard',
        description: 'Navigate to dashboard',
        action: () => {
            window.location.href = '/dashboard';
            return 'Taking you to your dashboard';
        }
    },
    {
        command: 'go to courses',
        description: 'Navigate to courses page',
        action: () => {
            window.location.href = '/courses';
            return 'Taking you to courses';
        }
    },
    {
        command: 'go to universities',
        description: 'Navigate to universities page',
        action: () => {
            window.location.href = '/universities';
            return 'Taking you to universities';
        }
    },
    {
        command: 'go to recommendations',
        description: 'Navigate to recommendations page',
        action: () => {
            window.location.href = '/recommendations';
            return 'Taking you to recommendations';
        }
    },
    {
        command: 'go to login',
        description: 'Navigate to login page',
        action: () => {
            window.location.href = '/login';
            return 'Taking you to login';
        }
    },
    {
        command: 'go to register',
        description: 'Navigate to register page',
        action: () => {
            window.location.href = '/register';
            return 'Taking you to register';
        }
    },
    {
        command: 'go to track status',
        description: 'Navigate to track status page',
        action: () => {
            window.location.href = '/track-status';
            return 'Taking you to track status';
        }
    },
    {
        command: 'go to admin',
        description: 'Navigate to admin dashboard',
        action: () => {
            window.location.href = '/admin';
            return 'Taking you to admin dashboard';
        }
    },
    {
        command: 'go back',
        description: 'Go back to previous page',
        action: () => {
            window.history.back();
            return 'Going back';
        }
    },

    // APPLICATION COMMANDS
    {
        command: 'apply for * course',
        description: 'Apply for a specific course',
        action: (courseName) => {
            return `Applying for ${courseName} course`;
        }
    },
    {
        command: 'check my application status',
        description: 'Check application status',
        action: () => {
            window.location.href = '/dashboard';
            return 'Checking your applications';
        }
    },
    {
        command: 'track my application',
        description: 'Track application status',
        action: () => {
            window.location.href = '/track-status';
            return 'Tracking your applications';
        }
    },
    {
        command: 'submit application',
        description: 'Submit application',
        action: () => {
            const submitBtn = document.querySelector('[data-testid="submit-btn"], button:contains("Submit"), button[type="submit"]');
            if (submitBtn) submitBtn.click();
            return 'Submitting your application';
        }
    },
    // UNIVERSITY COMMANDS
    {
        command: 'show all universities',
        description: 'Display all universities',
        action: async () => {
            try {
                const response = await fetch('http://localhost:5000/api/universities?limit=100');
                const data = await response.json();
                const universityList = data.universities.map(u => u.name).join(', ');
                return `Here are all universities: ${universityList}`;
            } catch (error) {
                return 'Could not fetch universities. Please try again.';
            }
        }
    },
    {
        command: 'list universities',
        description: 'List all universities',
        action: async () => {
            try {
                const response = await fetch('http://localhost:5000/api/universities?limit=100');
                const data = await response.json();
                const universityList = data.universities.map(u => u.name).join(', ');
                return `Available universities: ${universityList}`;
            } catch (error) {
                return 'Could not fetch universities. Please try again.';
            }
        }
    },
    {
        command: 'apply to *',
        description: 'Apply to a specific university',
        action: async (universityName) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    // Navigate to application form with university info
                    window.location.href = `/application?university=${university._id}&name=${encodeURIComponent(university.name)}`;
                    return `Applying to ${university.name}. Opening application form.`;
                } else {
                    return `Could not find ${universityName}. Say "show all universities" to see available options.`;
                }
            } catch (error) {
                return `Error applying to ${universityName}. Please try again.`;
            }
        }
    },
    {
        command: 'apply to * university',
        description: 'Apply to a university',
        action: async (universityName) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    window.location.href = `/application?university=${university._id}&name=${encodeURIComponent(university.name)}`;
                    return `Applying to ${university.name}. Opening application form.`;
                } else {
                    return `Could not find ${universityName}. Say "show all universities" to see available options.`;
                }
            } catch (error) {
                return `Error applying to ${universityName}. Please try again.`;
            }
        }
    },
    {
        command: 'tell me about *',
        description: 'Get information about a university',
        action: async (universityName) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    let info = `${university.name}. `;
                    if (university.description) info += `${university.description}. `;
                    if (university.address && university.address.city) info += `Located in ${university.address.city}. `;
                    if (university.contact && university.contact.email) info += `Email: ${university.contact.email}. `;
                    if (university.contact && university.contact.phone) info += `Phone: ${university.contact.phone}.`;
                    return info;
                } else {
                    return `Could not find information about ${universityName}.`;
                }
            } catch (error) {
                return `Error fetching information about ${universityName}.`;
            }
        }
    },
    {
        command: 'universities in *',
        description: 'Find universities in a specific location',
        action: async (location) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();
                const foundUniversities = data.universities.filter(u =>
                    u.address && u.address.city && u.address.city.toLowerCase().includes(location.toLowerCase()) ||
                    u.country && u.country.toLowerCase().includes(location.toLowerCase())
                );

                if (foundUniversities.length > 0) {
                    const list = foundUniversities.map(u => u.name).join(', ');
                    return `Universities in ${location}: ${list}`;
                } else {
                    return `No universities found in ${location}.`;
                }
            } catch (error) {
                return `Error searching for universities in ${location}.`;
            }
        }
    },
    {
        command: 'update university * with *',
        description: 'Update university information (admin)',
        action: async (universityName, updates) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (!university) {
                    return `University ${universityName} not found.`;
                }

                // Parse updates (e.g., "email test@example.com phone 0891234567")
                const updateResponse = await fetch(`http://localhost:5000/api/universities/${university._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ description: updates })
                });

                if (updateResponse.ok) {
                    return `Updated ${universityName} successfully.`;
                } else {
                    return `Failed to update ${universityName}. Check permissions.`;
                }
            } catch (error) {
                return `Error updating university: ${error.message}`;
            }
        }
    },
    {
        command: 'add university *',
        description: 'Add a new university (admin)',
        action: async (universityName) => {
            try {
                const response = await fetch('http://localhost:5000/api/universities', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ name: universityName })
                });

                if (response.ok) {
                    return `Added ${universityName} successfully.`;
                } else {
                    return `Failed to add ${universityName}. Check permissions.`;
                }
            } catch (error) {
                return `Error adding university: ${error.message}`;
            }
        }
    },
    {
        command: 'show university details for *',
        description: 'Show detailed information about a university',
        action: async (universityName) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    let details = `${university.name}. `;
                    details += `Country: ${university.country || 'Not specified'}. `;
                    if (university.address && university.address.city) details += `City: ${university.address.city}. `;
                    if (university.web_pages && university.web_pages.length > 0) details += `Website: ${university.web_pages[0]}. `;
                    if (university.contact && university.contact.email) details += `Contact: ${university.contact.email}. `;
                    if (university.description) details += `About: ${university.description}. `;
                    return details;
                } else {
                    return `University ${universityName} not found.`;
                }
            } catch (error) {
                return `Error fetching university details.`;
            }
        }
    },
    {
        command: 'compare universities * and *',
        description: 'Compare two universities',
        action: async (uni1Name, uni2Name) => {
            try {
                const response = await fetch(`http://localhost:5000/api/universities?limit=100`);
                const data = await response.json();

                const uni1 = data.universities.find(u => u.name.toLowerCase().includes(uni1Name.toLowerCase()));
                const uni2 = data.universities.find(u => u.name.toLowerCase().includes(uni2Name.toLowerCase()));

                if (uni1 && uni2) {
                    let comparison = `Comparing ${uni1.name} and ${uni2.name}. `;
                    comparison += `${uni1.name} is in ${uni1.country || 'unknown country'}. `;
                    comparison += `${uni2.name} is in ${uni2.country || 'unknown country'}. `;
                    if (uni1.address && uni1.address.city) comparison += `${uni1.name} city: ${uni1.address.city}. `;
                    if (uni2.address && uni2.address.city) comparison += `${uni2.name} city: ${uni2.address.city}. `;
                    return comparison;
                } else {
                    return `Could not find one or both universities.`;
                }
            } catch (error) {
                return `Error comparing universities.`;
            }
        }
    },
    // SEARCH AND FILTER COMMANDS
    {
        command: 'show * universities',
        description: 'Filter universities by location or type',
        action: (filter) => {
            return `Showing ${filter} universities`;
        }
    },
    {
        command: 'search for *',
        description: 'Search for courses or universities',
        action: (query) => {
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
            if (searchInput) {
                searchInput.value = query;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            return `Searching for ${query}`;
        }
    },
    {
        command: 'filter by *',
        description: 'Apply filters',
        action: (filterType) => {
            return `Filtering by ${filterType}`;
        }
    },

    // INFORMATION COMMANDS
    {
        command: 'what are the requirements for *',
        description: 'Check course requirements',
        action: (course) => {
            return `The requirements for ${course} are: Leaving Certificate with H5 in Math`;
        }
    },
    {
        command: 'when is the deadline',
        description: 'Check application deadlines',
        action: () => {
            return 'The ICA application deadline is February 1st for standard applications';
        }
    },
    {
        command: 'calculate my points',
        description: 'Calculate ICA points',
        action: () => {
            window.location.href = '/recommendations';
            return 'Opening recommendations page to calculate your points';
        }
    },
    {
        command: 'compare * and *',
        description: 'Compare two courses',
        action: (course1, course2) => {
            return `Comparing ${course1} and ${course2}`;
        }
    },
    {
        command: 'save * to my list',
        description: 'Save course to favorites',
        action: (course) => {
            const saveBtn = document.querySelector('[data-testid="save-btn"], button:contains("Save")');
            if (saveBtn) saveBtn.click();
            return `Saved ${course} to your list`;
        }
    },

    // FORM COMMANDS
    {
        command: 'fill * with *',
        description: 'Fill a form field',
        action: (fieldName, value) => {
            fillFormField(fieldName, value);
            return `Filled ${fieldName} with ${value}`;
        }
    },
    {
        command: 'type * in *',
        description: 'Type value into a field',
        action: (value, fieldName) => {
            fillFormField(fieldName, value);
            return `Typed ${value} in ${fieldName}`;
        }
    },
    {
        command: 'click *',
        description: 'Click a button or element',
        action: (elementName) => {
            clickElement(elementName);
            return `Clicked on ${elementName}`;
        }
    },
    {
        command: 'submit form',
        description: 'Submit a form',
        action: () => {
            const form = document.querySelector('form');
            if (form) form.submit();
            return 'Submitting form';
        }
    },

    // SCROLLING COMMANDS
    {
        command: 'scroll down',
        description: 'Scroll down the page',
        action: () => {
            window.scrollBy(0, 300);
            return 'Scrolling down';
        }
    },
    {
        command: 'scroll up',
        description: 'Scroll up the page',
        action: () => {
            window.scrollBy(0, -300);
            return 'Scrolling up';
        }
    },
    {
        command: 'scroll to top',
        description: 'Scroll to top of page',
        action: () => {
            window.scrollTo(0, 0);
            return 'Scrolling to top';
        }
    },
    {
        command: 'scroll to bottom',
        description: 'Scroll to bottom of page',
        action: () => {
            window.scrollTo(0, document.body.scrollHeight);
            return 'Scrolling to bottom';
        }
    },

    // READING COMMANDS
    {
        command: 'read page',
        description: 'Read the entire page content',
        action: () => {
            const { speak } = require('./accessibility');
            const text = document.body.innerText;
            speak(text);
            return 'Reading page content';
        }
    },
    {
        command: 'read heading',
        description: 'Read all headings on page',
        action: () => {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText).join('. ');
            return `Headings: ${headings}`;
        }
    },

    // HELP COMMANDS
    {
        command: 'help',
        description: 'Get help with voice commands',
        action: () => {
            return 'You can navigate using voice: "go to courses", "apply to Trinity", "search for engineering", "fill email with myemail@example.com", "click submit", or ask me about universities and deadlines. Say "show all commands" for complete list.';
        }
    },
    {
        command: 'show all commands',
        description: 'Show all available commands',
        action: () => {
            return 'Navigation: go to [page], go back. Universities: show all universities, apply to [university], tell me about [university], universities in [location], compare [uni1] and [uni2]. Forms: fill [field] with [value], click [button], submit form. Other: search for [term], scroll [direction], read page, help.';
        }
    }
];

// Natural language processing helper
export const processVoiceCommand = (transcript) => {
    const lowerTranscript = transcript.toLowerCase();

    // Check for greeting
    if (/(hello|hi|hey|good morning|good afternoon|hey there|what's up)/.test(lowerTranscript)) {
        return {
            type: 'greeting',
            response: 'Hello! How can I help you with your ICA application today?'
        };
    }

    // Check for thanks
    if (/(thank you|thanks|appreciate it|thank you very much)/.test(lowerTranscript)) {
        return {
            type: 'thanks',
            response: "You're welcome! Is there anything else I can help you with?"
        };
    }

    // Check for course search
    if (/(find|search|look for|show me|show).*(course|courses|program|programmes)/.test(lowerTranscript)) {
        const match = lowerTranscript.match(/(find|search|look for|show me|show)\s+(.+?)\s+(course|courses|program|programmes)/);
        const query = match ? match[2] : 'courses';
        return {
            type: 'search',
            query: query,
            response: `Searching for ${query} courses...`
        };
    }

    // Check for navigation to specific pages
    if (/(go to|take me to|open|navigate to|show me|view).*(page|section|courses|universities|applications|dashboard|home|recommendations)/.test(lowerTranscript)) {
        const match = lowerTranscript.match(/(go to|take me to|open|navigate to|show me|view)\s+(.+?)(page|section)?/);
        const page = match ? match[2].trim() : 'home';
        return {
            type: 'navigation',
            page: page,
            response: `Taking you to the ${page}`
        };
    }

    // Check for deadline
    if (/(deadline|when is|application closes|closing date)/.test(lowerTranscript)) {
        return {
            type: 'deadline',
            response: 'The ICA application deadline is February 1st for standard applications, and February 15th for payment.'
        };
    }

    // Check for help
    if (/(help|how can you help|what can you do|capabilities)/.test(lowerTranscript)) {
        return {
            type: 'help',
            response: "I can help you: View courses and universities, check application deadlines, search for programs, navigate pages, and more. Just tell me what you need!"
        };
    }

    // Check for affirmation
    if (/(yes|yeah|yep|okay|ok|alright|sure|definitely)/.test(lowerTranscript)) {
        return {
            type: 'affirmation',
            response: 'Great! What would you like to do?'
        };
    }

    // Check for negation
    if (/(no|nope|not really|nah|don't|stop|pause)/.test(lowerTranscript)) {
        return {
            type: 'negation',
            response: 'Okay, no problem. Let me know if you need anything!'
        };
    }

    // Default response
    return {
        type: 'unknown',
        response: "I'm not sure I understand. You can ask me things like: 'Find computer science courses', 'Check application deadline', or 'Show me universities'."
    };
};

// Helper function to extract search terms from voice input
export const extractSearchTerm = (transcript) => {
    const match = transcript.match(/(find|search|look for|show)?\s+(.+?)\s+(course|courses|program)/);
    return match ? match[2] : null;
};

// Helper to get ICA-specific information
export const getICAInfo = (infoType) => {
    const infoMap = {
        deadline: 'The ICA application deadline is February 1st for applications and February 15th for payment.',
        requirements: 'Most courses require a Leaving Certificate with specific grade requirements.',
        points: 'ICA points are calculated from your best 6 Leaving Certificate subjects.',
        universities: 'There are 38 member institutions of the ICA in Ireland.',
        courses: 'You can apply for up to 10 courses through ICA in any order.'
    };
    return infoMap[infoType] || 'I don\'t have that information available.';
};

/**
 * HELPER FUNCTIONS FOR VOICE COMMANDS
 */

// Fill form field with value
export const fillFormField = (fieldName, value) => {
    const fieldNameLower = fieldName.toLowerCase();

    // Try to find input by various attributes
    let input = document.querySelector(`input[name="${fieldNameLower}"]`) ||
        document.querySelector(`input[placeholder*="${fieldName}"]`) ||
        document.querySelector(`input[aria-label*="${fieldName}"]`) ||
        document.querySelector(`[data-field="${fieldNameLower}"]`) ||
        document.querySelector(`label:contains("${fieldName}") ~ input`) ||
        findInputByLabel(fieldName);

    if (!input) {
        // Fallback: try to find by partial match in any text input
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], textarea');
        for (let inp of inputs) {
            if (inp.placeholder && inp.placeholder.toLowerCase().includes(fieldNameLower)) {
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

// Find input field by associated label text
function findInputByLabel(labelText) {
    const labels = Array.from(document.querySelectorAll('label'));
    for (let label of labels) {
        if (label.textContent.toLowerCase().includes(labelText.toLowerCase())) {
            const htmlFor = label.getAttribute('for');
            if (htmlFor) {
                return document.getElementById(htmlFor);
            }
            // Try to find input in the same parent or next sibling
            return label.parentElement.querySelector('input, textarea, select');
        }
    }
    return null;
}

// Click element by name/text
export const clickElement = (elementName) => {
    const elementNameLower = elementName.toLowerCase();

    // Try to find button or clickable element by text
    let element = document.querySelector(`button:contains("${elementName}")`) ||
        document.querySelector(`a:contains("${elementName}")`) ||
        document.querySelector(`[data-testid="${elementNameLower}"]`) ||
        document.querySelector(`button[aria-label*="${elementName}"]`) ||
        document.querySelector(`[role="button"]:contains("${elementName}")`);

    // Fallback: search by text content
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

// Execute voice command from transcript
export const executeVoiceCommand = (transcript, onSuccess, onError) => {
    const lowerTranscript = transcript.toLowerCase().trim();

    // Match against known commands
    for (const cmd of ICA_VOICE_COMMANDS) {
        const pattern = cmd.command.replace(/\*/g, '([^"]*)');
        const regex = new RegExp(`^${pattern}$`);
        const match = lowerTranscript.match(regex);

        if (match) {
            try {
                const result = cmd.action(...match.slice(1).filter(x => x));
                if (onSuccess) onSuccess(result);
                return { success: true, message: result };
            } catch (error) {
                if (onError) onError(error);
                return { success: false, error: error.message };
            }
        }
    }

    // Process natural language if no command matches
    const commandResponse = processVoiceCommand(transcript);

    // Handle different response types
    switch (commandResponse.type) {
        case 'navigation':
            const pages = {
                'home': '/',
                'dashboard': '/dashboard',
                'courses': '/courses',
                'universities': '/universities',
                'recommendations': '/recommendations',
                'login': '/login',
                'register': '/register',
                'admin': '/admin',
                'status': '/track-status',
                'track': '/track-status'
            };

            const pageUrl = pages[commandResponse.page] || `/`;
            if (pageUrl) {
                window.location.href = pageUrl;
                if (onSuccess) onSuccess(`Taking you to ${commandResponse.page}`);
                return { success: true, message: `Taking you to ${commandResponse.page}` };
            }
            break;

        case 'search':
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
            if (searchInput) {
                searchInput.value = commandResponse.query;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                if (onSuccess) onSuccess(`Searching for ${commandResponse.query}`);
                return { success: true, message: `Searching for ${commandResponse.query}` };
            }
            break;
    }

    if (onSuccess) onSuccess(commandResponse.response);
    return { success: true, message: commandResponse.response };
};

