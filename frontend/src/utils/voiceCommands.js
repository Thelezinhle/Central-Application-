export const CAO_VOICE_COMMANDS = [
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
            return 'Taking you to your applications';
        }
    },
    {
        command: 'show * universities',
        description: 'Filter universities by location or type',
        action: (filter) => {
            return `Showing ${filter} universities`;
        }
    },
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
            return 'The CAO application deadline is February 1st for standard applications';
        }
    },
    {
        command: 'calculate my points',
        description: 'Calculate CAO points',
        action: () => {
            window.location.href = '/recommendations';
            return 'Opening recommendations page';
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
            return `Saved ${course} to your list`;
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
            response: 'Hello! How can I help you with your CAO application today?'
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
            response: 'The CAO application deadline is February 1st for standard applications, and February 15th for payment.'
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

// Helper to get CAO-specific information
export const getCAOInfo = (infoType) => {
    const infoMap = {
        deadline: 'The CAO application deadline is February 1st for applications and February 15th for payment.',
        requirements: 'Most courses require a Leaving Certificate with specific grade requirements.',
        points: 'CAO points are calculated from your best 6 Leaving Certificate subjects.',
        universities: 'There are 38 member institutions of the CAO in Ireland.',
        courses: 'You can apply for up to 10 courses through CAO in any order.'
    };
    return infoMap[infoType] || 'I don\'t have that information available.';
};
