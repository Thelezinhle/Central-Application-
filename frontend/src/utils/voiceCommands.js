import { buildUniversitiesUrl, fetchWithErrorHandling } from '../config/api.js';

/**
 * VOICE CONTEXT - The "Brain" of the Accessibility Assistant
 * Tracks conversation state so blind users get natural, contextual responses
 * 
 * WCAG 2.1 AA: State persistence enables continuity for users with cognitive disabilities
 */
let voiceContext = {
    muted: false,
    paused: false,
    guidanceMode: false,
    awaitingConfirmation: false,
    lastPrompt: null,
    awaitingConfirmationForAction: null,
    currentPage: '/',
    conversationHistory: []
};

// Load context from localStorage if available
const loadVoiceContext = () => {
    try {
        const saved = localStorage.getItem('voiceContext');
        if (saved) {
            voiceContext = { ...voiceContext, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.error('Failed to load voice context:', e);
    }
};

// Initialize on load
loadVoiceContext();

export const getVoiceContext = () => voiceContext;
export const setVoiceContext = (updates) => {
    voiceContext = { ...voiceContext, ...updates };
    localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
};

/**
 * 🔊 SINGLE SPEECH FUNCTION - ONLY one speaks in the entire app
 * WCAG 2.1 AA: Respects mute/pause state, adds to history, safe speech handling
 * 
 * ⚠️ IMPORTANT: Call ONLY from command actions, NOT from NLP or executeVoiceCommand
 */
export const speakSafe = (message, speaker = 'assistant') => {
    // Add to conversation history
    voiceContext.conversationHistory.push({
        timestamp: new Date().toISOString(),
        speaker,
        message
    });

    // Keep only last 50 messages to avoid memory issues
    if (voiceContext.conversationHistory.length > 50) {
        voiceContext.conversationHistory.shift();
    }

    // Persist to storage
    localStorage.setItem('voiceContext', JSON.stringify(voiceContext));

    // Respect mute and pause states
    if (voiceContext.muted || voiceContext.paused) return;

    // Cancel any existing speech
    speechSynthesis.cancel();

    // Create and speak utterance
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.rate = 0.9;      // Slightly slower for clarity
    utterance.pitch = 1.0;     // Normal pitch
    utterance.volume = 1.0;    // Full volume
    utterance.lang = 'en-US';

    speechSynthesis.speak(utterance);
};

export const ICA_VOICE_COMMANDS = [
    // NAVIGATION COMMANDS
    {
        command: 'go to home',
        description: 'Navigate to home page',
        action: async () => {
            const message = 'Taking you to the home page';
            speakSafe(message);
            voiceContext.currentPage = '/';
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/';
            // ✅ SAFETY CHECK: Only auto-describe if not muted/paused
            if (voiceContext.guidanceMode && !voiceContext.muted && !voiceContext.paused) {
                setTimeout(describeCurrentPage, 1200);
            }
            return message;
        }
    },
    {
        command: 'go to dashboard',
        description: 'Navigate to dashboard',
        action: async () => {
            const message = 'Taking you to your dashboard';
            speakSafe(message);
            voiceContext.currentPage = '/dashboard';
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/dashboard';
            // ✅ SAFETY CHECK: Only auto-describe if not muted/paused
            if (voiceContext.guidanceMode && !voiceContext.muted && !voiceContext.paused) {
                setTimeout(describeCurrentPage, 1200);
            }
            return message;
        }
    },
    {
        command: 'go to courses',
        description: 'Navigate to courses page',
        action: async () => {
            const message = 'Taking you to courses';
            speakSafe(message);
            voiceContext.currentPage = '/courses';
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/courses';
            // ✅ SAFETY CHECK: Only auto-describe if not muted/paused
            if (voiceContext.guidanceMode && !voiceContext.muted && !voiceContext.paused) {
                setTimeout(describeCurrentPage, 1200);
            }
            return message;
        }
    },
    {
        command: 'go to universities',
        description: 'Navigate to universities page',
        action: async () => {
            const message = 'Taking you to universities';
            speakSafe(message);
            voiceContext.currentPage = '/universities';
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/universities';
            // ✅ SAFETY CHECK: Only auto-describe if not muted/paused
            if (voiceContext.guidanceMode && !voiceContext.muted && !voiceContext.paused) {
                setTimeout(describeCurrentPage, 1200);
            }
            return message;
        }
    },
    {
        command: 'go to recommendations',
        description: 'Navigate to recommendations page',
        action: async () => {
            const message = 'Taking you to recommendations';
            speakSafe(message);
            voiceContext.currentPage = '/recommendations';
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/recommendations';
            // ✅ SAFETY CHECK: Only auto-describe if not muted/paused
            if (voiceContext.guidanceMode && !voiceContext.muted && !voiceContext.paused) {
                setTimeout(describeCurrentPage, 1200);
            }
            return message;
        }
    },
    {
        command: 'go to login',
        description: 'Navigate to login page',
        action: async () => {
            const message = 'Taking you to login';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/login';
            return message;
        }
    },
    {
        command: 'go to register',
        description: 'Navigate to register page',
        action: async () => {
            const message = 'Taking you to register';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/register';
            return message;
        }
    },
    {
        command: 'go to track status',
        description: 'Navigate to track status page',
        action: async () => {
            const message = 'Taking you to track status';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/track-status';
            return message;
        }
    },
    {
        command: 'go to admin',
        description: 'Navigate to admin dashboard',
        action: async () => {
            const message = 'Taking you to admin dashboard';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/admin';
            return message;
        }
    },
    {
        command: 'go back',
        description: 'Go back to previous page',
        action: () => {
            const message = 'Going back';
            speakSafe(message);
            window.history.back();
            return message;
        }
    },

    // APPLICATION COMMANDS
    {
        command: 'apply for * course',
        description: 'Apply for a specific course',
        action: (courseName) => {
            const message = `Applying for ${courseName} course`;
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'check my application status',
        description: 'Check application status',
        action: async () => {
            const message = 'Checking your applications';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/dashboard';
            return message;
        }
    },
    {
        command: 'track my application',
        description: 'Track application status',
        action: async () => {
            const message = 'Tracking your applications';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/track-status';
            return message;
        }
    },
    {
        command: 'submit application',
        description: 'Submit application with confirmation',
        action: () => {
            const message = 'I am about to submit your application. Say confirm to proceed.';
            speakSafe(message);
            voiceContext.awaitingConfirmationForAction = 'submit_form';
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            return message;
        }
    },
    // UNIVERSITY COMMANDS
    {
        command: 'show all universities',
        description: 'Display all universities',
        action: async () => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();
                const universityList = data.universities.map(u => u.name).join(', ');
                const message = `Here are all universities: ${universityList}`;
                speakSafe(message);
                return message;
            } catch (error) {
                const message = 'Could not fetch universities. Please try again.';
                speakSafe(message);
                return message;
            }
        }
    },
    {
        command: 'list universities',
        description: 'List all universities',
        action: async () => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();
                const universityList = data.universities.map(u => u.name).join(', ');
                const message = `Available universities: ${universityList}`;
                speakSafe(message);
                return message;
            } catch (error) {
                const message = 'Could not fetch universities. Please try again.';
                speakSafe(message);
                return message;
            }
        }
    },
    {
        command: 'apply to *',
        description: 'Apply to a specific university',
        action: async (universityName) => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    const message = `Applying to ${university.name}. Opening application form.`;
                    speakSafe(message);
                    await new Promise(r => setTimeout(r, 800));
                    window.location.href = `/application?university=${university._id}&name=${encodeURIComponent(university.name)}`;
                    return message;
                } else {
                    const message = `Could not find ${universityName}. Say "show all universities" to see available options.`;
                    speakSafe(message);
                    return message;
                }
            } catch (error) {
                const message = `Error applying to ${universityName}. Please try again.`;
                speakSafe(message);
                return message;
            }
        }
    },
    {
        command: 'apply to * university',
        description: 'Apply to a university',
        action: async (universityName) => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    const message = `Applying to ${university.name}. Opening application form.`;
                    speakSafe(message);
                    await new Promise(r => setTimeout(r, 800));
                    window.location.href = `/application?university=${university._id}&name=${encodeURIComponent(university.name)}`;
                    return message;
                } else {
                    const message = `Could not find ${universityName}. Say "show all universities" to see available options.`;
                    speakSafe(message);
                    return message;
                }
            } catch (error) {
                const message = `Error applying to ${universityName}. Please try again.`;
                speakSafe(message);
                return message;
            }
        }
    },
    {
        command: 'tell me about *',
        description: 'Get information about a university',
        action: async (universityName) => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();
                const university = data.universities.find(u => u.name.toLowerCase().includes(universityName.toLowerCase()));

                if (university) {
                    let info = `${university.name}. `;
                    if (university.description) info += `${university.description}. `;
                    if (university.address && university.address.city) info += `Located in ${university.address.city}. `;
                    if (university.contact && university.contact.email) info += `Email: ${university.contact.email}. `;
                    if (university.contact && university.contact.phone) info += `Phone: ${university.contact.phone}.`;
                    speakSafe(info);
                    return info;
                } else {
                    const message = `Could not find information about ${universityName}.`;
                    speakSafe(message);
                    return message;
                }
            } catch (error) {
                const message = `Error fetching information about ${universityName}.`;
                speakSafe(message);
                return message;
            }
        }
    },
    {
        command: 'universities in *',
        description: 'Find universities in a specific location',
        action: async (location) => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();
                const foundUniversities = data.universities.filter(u =>
                    u.address && u.address.city && u.address.city.toLowerCase().includes(location.toLowerCase()) ||
                    u.country && u.country.toLowerCase().includes(location.toLowerCase())
                );

                if (foundUniversities.length > 0) {
                    const list = foundUniversities.map(u => u.name).join(', ');
                    const message = `Universities in ${location}: ${list}`;
                    speakSafe(message);
                    return message;
                } else {
                    const message = `No universities found in ${location}.`;
                    speakSafe(message);
                    return message;
                }
            } catch (error) {
                const message = `Error searching for universities in ${location}.`;
                speakSafe(message);
                return message;
            }
        }
    },
    {
        command: 'compare universities * and *',
        description: 'Compare two universities',
        action: async (uni1Name, uni2Name) => {
            try {
                const response = await fetch(buildUniversitiesUrl({ limit: 100 }));
                const data = await response.json();

                const uni1 = data.universities.find(u => u.name.toLowerCase().includes(uni1Name.toLowerCase()));
                const uni2 = data.universities.find(u => u.name.toLowerCase().includes(uni2Name.toLowerCase()));

                if (uni1 && uni2) {
                    let comparison = `Comparing ${uni1.name} and ${uni2.name}. `;
                    comparison += `${uni1.name} is in ${uni1.country || 'unknown country'}. `;
                    comparison += `${uni2.name} is in ${uni2.country || 'unknown country'}. `;
                    if (uni1.address && uni1.address.city) comparison += `${uni1.name} city: ${uni1.address.city}. `;
                    if (uni2.address && uni2.address.city) comparison += `${uni2.name} city: ${uni2.address.city}. `;
                    speakSafe(comparison);
                    return comparison;
                } else {
                    const message = `Could not find one or both universities.`;
                    speakSafe(message);
                    return message;
                }
            } catch (error) {
                const message = `Error comparing universities.`;
                speakSafe(message);
                return message;
            }
        }
    },
    // SEARCH AND FILTER COMMANDS
    {
        command: 'show * universities',
        description: 'Filter universities by location or type',
        action: (filter) => {
            const message = `Showing ${filter} universities`;
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'search for *',
        description: 'Search for courses or universities',
        action: (query) => {
            const message = `Searching for ${query}`;
            speakSafe(message);
            const searchInput = document.querySelector('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"]');
            if (searchInput) {
                searchInput.value = query;
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            return message;
        }
    },
    {
        command: 'filter by *',
        description: 'Apply filters',
        action: (filterType) => {
            const message = `Filtering by ${filterType}`;
            speakSafe(message);
            return message;
        }
    },

    // INFORMATION COMMANDS
    {
        command: 'what are the requirements for *',
        description: 'Check course requirements',
        action: (course) => {
            const message = `The requirements for ${course} are: Leaving Certificate with H5 in Math`;
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'when is the deadline',
        description: 'Check application deadlines',
        action: () => {
            const message = 'The application deadline is February 1st for standard applications';
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'calculate my points',
        description: 'Calculate application points',
        action: async () => {
            const message = 'Opening recommendations page to calculate your points';
            speakSafe(message);
            await new Promise(r => setTimeout(r, 500));
            window.location.href = '/recommendations';
            return message;
        }
    },
    {
        command: 'compare * and *',
        description: 'Compare two courses',
        action: (course1, course2) => {
            const message = `Comparing ${course1} and ${course2}`;
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'save * to my list',
        description: 'Save course to favorites',
        action: (course) => {
            const message = `Saved ${course} to your list`;
            speakSafe(message);
            const saveBtn = findElementByText('button, a', 'save');
            if (saveBtn) saveBtn.click();
            return message;
        }
    },

    // FORM COMMANDS
    {
        command: 'fill * with *',
        description: 'Fill a form field',
        action: (fieldName, value) => {
            const message = `Filled ${fieldName} with ${value}`;
            fillFormField(fieldName, value);
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'type * in *',
        description: 'Type value into a field',
        action: (value, fieldName) => {
            const message = `Typed ${value} in ${fieldName}`;
            fillFormField(fieldName, value);
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'click *',
        description: 'Click a button or element',
        action: (elementName) => {
            const message = `Clicked on ${elementName}`;
            clickElement(elementName);
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'submit form',
        description: 'Submit a form',
        action: () => {
            const message = 'Submitting form';
            speakSafe(message);
            const form = document.querySelector('form');
            if (form) form.submit();
            return message;
        }
    },

    // SCROLLING COMMANDS
    {
        command: 'scroll down',
        description: 'Scroll down the page',
        action: () => {
            const message = 'Scrolling down';
            speakSafe(message);
            window.scrollBy(0, 300);
            return message;
        }
    },
    {
        command: 'scroll up',
        description: 'Scroll up the page',
        action: () => {
            const message = 'Scrolling up';
            speakSafe(message);
            window.scrollBy(0, -300);
            return message;
        }
    },
    {
        command: 'scroll to top',
        description: 'Scroll to top of page',
        action: () => {
            const message = 'Scrolling to top';
            speakSafe(message);
            window.scrollTo(0, 0);
            return message;
        }
    },
    {
        command: 'scroll to bottom',
        description: 'Scroll to bottom of page',
        action: () => {
            const message = 'Scrolling to bottom';
            speakSafe(message);
            window.scrollTo(0, document.body.scrollHeight);
            return message;
        }
    },

    // READING COMMANDS
    {
        command: 'read page',
        description: 'Read the page content (limited to first 50 lines)',
        action: () => {
            // WCAG 2.1 AA: Limit reading to prevent overwhelming users
            const text = document.body.innerText
                .split('\n')
                .slice(0, 50)
                .join('. ');
            
            const message = `Reading page content. Say "stop reading" to stop. ${text}`;
            speakSafe(message);
            return 'Reading page content (limited). Say "stop reading" to stop.';
        }
    },
    {
        command: 'stop reading',
        description: 'Stop reading page content',
        action: () => {
            speechSynthesis.cancel();
            voiceContext.paused = true;
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            // ⚠️ IMPORTANT: Do NOT speak when stopping - user expects silence
            return 'Stopped reading';
        }
    },
    {
        command: 'pause',
        description: 'Pause speech (no voice feedback)',
        action: () => {
            voiceContext.paused = true;
            speechSynthesis.cancel();
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            // ⚠️ IMPORTANT: Do NOT speak when pausing - that defeats the purpose
            return 'Paused';
        }
    },
    {
        command: 'resume',
        description: 'Resume speech',
        action: () => {
            voiceContext.paused = false;
            voiceContext.muted = false;
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            const message = 'Resumed. What would you like to do?';
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'read heading',
        description: 'Read all headings on page',
        action: () => {
            const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText).join('. ');
            const message = `Headings: ${headings}`;
            speakSafe(message);
            return message;
        }
    },

    // CONTROL COMMANDS - MUTE/UNMUTE
    {
        command: 'mute',
        description: 'Silence the assistant',
        action: () => {
            voiceContext.muted = true;
            // ⚠️ DO NOT reset paused - allow mute to work independently
            speechSynthesis.cancel();
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            return 'Muted';
        }
    },
    {
        command: 'mute assistant',
        description: 'Silence the assistant',
        action: () => {
            voiceContext.muted = true;
            // ✅ IMPORTANT: Do NOT reset paused - allow mute to work independently
            speechSynthesis.cancel();
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            return 'Muted';
        }
    },
    {
        command: 'unmute',
        description: 'Reactivate the assistant',
        action: () => {
            voiceContext.muted = false;
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            const message = 'Assistant reactivated. How can I help you?';
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'stop talking',
        description: 'Stop and mute the assistant',
        action: () => {
            voiceContext.muted = true;
            voiceContext.paused = true;  // ✅ HARD SILENCE: Set both to guarantee no speech
            speechSynthesis.cancel();
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            return 'Stopped';
        }
    },
    {
        command: 'confirm',
        description: 'Confirm a pending action',
        action: () => {
            if (voiceContext.awaitingConfirmationForAction) {
                const action = voiceContext.awaitingConfirmationForAction;
                voiceContext.awaitingConfirmationForAction = null;
                localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
                
                let message = '';
                switch (action) {
                    case 'submit_form':
                        const form = document.querySelector('form');
                        if (form) {
                            form.submit();
                            message = 'Form submitted successfully.';
                        }
                        break;
                    case 'delete':
                        message = 'Deletion confirmed.';
                        break;
                    default:
                        message = `${action} confirmed.`;
                }
                speakSafe(message);
                return message;
            }
            
            const message = 'No action to confirm.';
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'cancel',
        description: 'Cancel a pending action',
        action: () => {
            voiceContext.awaitingConfirmationForAction = null;
            localStorage.setItem('voiceContext', JSON.stringify(voiceContext));
            const message = 'Action cancelled.';
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'where am i',
        description: 'Describe current page',
        action: () => {
            describeCurrentPage();
            return 'Describing current page';
        }
    },

    // HELP COMMANDS
    {
        command: 'help',
        description: 'Get help with voice commands',
        action: () => {
            const message = 'You can navigate using voice: "go to courses", "apply to a university", "search for engineering", "fill email with myemail@example.com", "click submit", or ask me about universities and deadlines. Say "where am I" anytime to hear the current page description. Say "show all commands" for the complete list. You can also say "mute" to silence me, or "confirm" to confirm actions.';
            speakSafe(message);
            return message;
        }
    },
    {
        command: 'show all commands',
        description: 'Show all available commands',
        action: () => {
            const message = 'Navigation: go to home, go to courses, go to universities, go to dashboard, go to recommendations. Universities: show all universities, apply to a university, tell me about a university, universities in a location, compare two universities. Forms: fill field with value, click button, submit form. Control: mute, unmute, where am I, help. Other: search for something, scroll down, scroll up, read page, confirm, cancel.';
            speakSafe(message);
            return message;
        }
    }
];

/**
 * Describe the current page for blind users
 * WCAG 2.1 AA: Essential for blind user orientation
 */
export const describeCurrentPage = () => {
    const title = document.title || 'this page';
    
    // Get main headings
    const headings = Array.from(
        document.querySelectorAll('h1, h2')
    ).map(h => h.innerText.trim()).filter(Boolean).slice(0, 3);
    
    // Get visible buttons
    const buttons = Array.from(
        document.querySelectorAll('button, [role="button"]')
    ).map(b => b.innerText || b.getAttribute('aria-label')).filter(Boolean).slice(0, 5);
    
    let message = `You are on the ${title}. `;
    
    if (headings.length) {
        message += `Main sections: ${headings.join(', ')}. `;
    }
    
    if (buttons.length) {
        message += `Available actions: ${buttons.join(', ')}. `;
    }
    
    message += 'What would you like to do? You can say "help" for a list of commands.';
    
    // WCAG 2.1 AA: Always add to history and respect mute mode
    speakSafe(message);
    return message;
};

/**
 * Natural language processing helper
 * ⚠️ IMPORTANT: This function does NOT speak - let command actions handle speech
 * NLP is for extracting intent, NOT for voice output
 */
export const processVoiceCommand = (transcript) => {
    const lowerTranscript = transcript.toLowerCase();

    // Check for greeting
    if (/(hello|hi|hey|good morning|good afternoon|hey there|what's up)/.test(lowerTranscript)) {
        return {
            type: 'greeting',
            response: 'Hello! How can I help you with your application today?'
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
            query,
            response: `Searching for ${query} courses...`
        };
    }

    // Check for navigation to specific pages
    if (/(go to|take me to|open|navigate to|show me|view).*(page|section|courses|universities|applications|dashboard|home|recommendations)/.test(lowerTranscript)) {
        const match = lowerTranscript.match(/(go to|take me to|open|navigate to|show me|view)\s+(.+?)(page|section)?/);
        const page = match ? match[2].trim() : 'home';
        return {
            type: 'navigation',
            page,
            response: `Taking you to the ${page}`
        };
    }

    // Check for deadline
    if (/(deadline|when is|application closes|closing date)/.test(lowerTranscript)) {
        return {
            type: 'deadline',
            response: 'The application deadline is February 1st for standard applications, and February 15th for payment.'
        };
    }

    // Check for help
    if (/(help|how can you help|what can you do|capabilities)/.test(lowerTranscript)) {
        return {
            type: 'help',
            response: "I can help you: View courses and universities, check application deadlines, search for programs, navigate pages, and more. Would you like me to guide you step by step? Say yes or no."
        };
    }

    // Check for "where am i"
    if (/(where am i|what page|current page|what's on this page)/.test(lowerTranscript)) {
        return {
            type: 'description',
            response: 'Describing current page'
        };
    }

    // Check for affirmation (YES)
    if (/(yes|yeah|yep|okay|ok|alright|sure|definitely)/.test(lowerTranscript)) {
        
        if (voiceContext.awaitingConfirmation) {
            
            if (voiceContext.lastPrompt === 'enable_guidance') {
                voiceContext.guidanceMode = true;
                voiceContext.awaitingConfirmation = false;
                voiceContext.lastPrompt = null;
                
                return { 
                    type: 'guidance_enabled', 
                    response: 'Guidance mode enabled. I will explain each page and guide you through the application. Say "where am I" at any time to hear the current page description. What would you like to do first?'
                };
            }
        }
        
        return { type: 'affirmation', response: 'Great! What would you like to do?' };
    }

    // Check for negation (NO)
    if (/(no|nope|not really|nah|don't|stop|pause|never)/.test(lowerTranscript)) {
        voiceContext.awaitingConfirmation = false;
        voiceContext.lastPrompt = null;
        return {
            type: 'negation',
            response: 'Okay, no problem. You can still say "help" at any time. What would you like to do?'
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

/**
 * Find element by text content - FIXES :contains() bug
 * WCAG 2.1 AA: Reliable element selection improves accessibility automation
 * 
 * @param {string} selector - CSS selector (e.g., 'button', 'a')
 * @param {string} text - Text to search for
 * @returns {Element|null}
 */
export const findElementByText = (selector, text) => {
    return Array.from(document.querySelectorAll(selector))
        .find(el => el.textContent.toLowerCase().includes(text.toLowerCase()));
};

/**
 * Find element by aria-label
 * WCAG 2.1 AA: ARIA labels are the accessible way to identify elements
 */
export const findElementByAriaLabel = (text) => {
    return document.querySelector(`[aria-label*="${text}"]`) ||
           Array.from(document.querySelectorAll('[aria-label]'))
               .find(el => el.getAttribute('aria-label').toLowerCase().includes(text.toLowerCase()));
};

// Fill form field with value
export const fillFormField = (fieldName, value) => {
    const fieldNameLower = fieldName.toLowerCase();

    // Try to find input by various attributes
    let input = document.querySelector(`input[name="${fieldNameLower}"]`) ||
        document.querySelector(`input[placeholder*="${fieldName}"]`) ||
        document.querySelector(`input[aria-label*="${fieldName}"]`) ||
        document.querySelector(`[data-field="${fieldNameLower}"]`) ||
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

// Click element by name/text - FIXED: Uses findElementByText instead of :contains()
export const clickElement = (elementName) => {
    const elementNameLower = elementName.toLowerCase();

    // Try to find button or clickable element by text
    let element = findElementByText('button, a, [role="button"]', elementName) ||
                  findElementByAriaLabel(elementName) ||
                  document.querySelector(`[data-testid="${elementNameLower}"]`);

    if (element) {
        element.click();
        return true;
    }

    return false;
};

/**
 * Execute voice command from transcript
 * ⚠️ STRICT RULE: This function does NOT speak - command actions handle ALL speech
 * This ONLY routes commands, matches patterns, and returns results
 * The caller (VoiceAssistant component) decides whether to speak the result
 */
export const executeVoiceCommand = (transcript, onSuccess, onError) => {
    const lowerTranscript = transcript.toLowerCase().trim();

    // Match against known commands
    for (const cmd of ICA_VOICE_COMMANDS) {
        // FIXED: Remove ^ and $ anchors - allows flexible matching
        // "go to the courses page" should match "go to courses"
        const pattern = cmd.command
            .replace(/\*/g, '(.+?)');  // Capture groups for parameters
        
        const regex = new RegExp(pattern, 'i');  // Case-insensitive, no anchors
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

    // CRITICAL: Do NOT speak here
    // Return the intent so VoiceAssistant can decide what to do
    if (onSuccess) onSuccess(commandResponse.response);
    return { success: true, message: commandResponse.response, type: commandResponse.type };
};

