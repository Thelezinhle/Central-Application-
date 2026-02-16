import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { speak } from '../utils/accessibility';
import { processVoiceCommand, ICA_VOICE_COMMANDS } from '../utils/voiceCommands';
import { useAccessibility } from '../context/AccessibilityContext';

const VoiceAssistant = () => {
    const { screenReaderMode, directSpeak } = useAccessibility();
    const [isActive, setIsActive] = useState(false);
    const [conversation, setConversation] = useState([]);
    const [listeningTimeout, setListeningTimeout] = useState(null);
    const conversationEndRef = useRef(null);
    const [lastCommand, setLastCommand] = useState('');
    const hasGreetedRef = useRef(false);

    const commands = [
        {
            command: 'open * page',
            callback: (page) => navigateToPage(page.toLowerCase())
        },
        {
            command: 'show * courses',
            callback: (category) => filterCourses(category)
        },
        {
            command: 'search for *',
            callback: (query) => searchCourses(query)
        },
        {
            command: 'help',
            callback: () => showHelp()
        },
        {
            command: 'stop',
            callback: () => handleStopCommand()
        },
        {
            command: 'yes',
            callback: () => handleYesResponse()
        },
        {
            command: 'no',
            callback: () => handleNoResponse()
        },
        {
            command: 'go home',
            callback: () => navigateToPage('home')
        },
        {
            command: 'check deadline',
            callback: () => speakDeadline()
        },
        {
            command: 'calculate points',
            callback: () => navigateToPage('calculator')
        }
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    // Auto-scroll to bottom of conversation
    useEffect(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    // Initial greeting on mount (only in screen reader mode)
    useEffect(() => {
        if (!screenReaderMode || hasGreetedRef.current) return;
        
        hasGreetedRef.current = true;
        setTimeout(() => {
            const greeting = "Hello! I'm your CAO voice assistant. Say 'help' for commands, or say what you want to do.";
            speak(greeting);
            setConversation([{
                speaker: 'assistant',
                text: greeting,
                time: new Date().toLocaleTimeString()
            }]);
            setIsActive(true);
            startListening();
        }, 2000);
    }, [screenReaderMode]);
    
    // Restart listening when it stops (for continuous listening)
    useEffect(() => {
        if (isActive && !listening && screenReaderMode) {
            const restartTimer = setTimeout(() => {
                startListening();
            }, 500);
            return () => clearTimeout(restartTimer);
        }
    }, [listening, isActive, screenReaderMode]);

    // Handle transcript changes - process when we have a final result
    useEffect(() => {
        if (transcript && lastCommand !== transcript) {
            setLastCommand(transcript);
            addUserMessage(transcript);
            // Process immediately when we get transcript
            processCommand(transcript);
        }
    }, [transcript]);

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        resetTranscript();
    };

    const addUserMessage = (text) => {
        setConversation(prev => [...prev, {
            speaker: 'user',
            text: text,
            time: new Date().toLocaleTimeString()
        }]);
    };

    const addAssistantMessage = (text) => {
        setConversation(prev => [...prev, {
            speaker: 'assistant',
            text: text,
            time: new Date().toLocaleTimeString()
        }]);
        speak(text);
    };

    const processCommand = (input) => {
        const lowerInput = input.toLowerCase().trim();

        // Handle yes/no directly
        if (lowerInput.includes('yes')) {
            handleYesResponse();
            return;
        }
        if (lowerInput.includes('no')) {
            handleNoResponse();
            return;
        }

        // Handle go to / navigate to commands
        if (lowerInput.includes('go to') || lowerInput.includes('navigate to') || lowerInput.includes('take me to')) {
            const pages = ['universities', 'courses', 'colleges', 'home', 'dashboard', 'recommendations', 'bursaries', 'calculator', 'aps'];
            for (const page of pages) {
                if (lowerInput.includes(page)) {
                    navigateToPage(page);
                    return;
                }
            }
        }

        // Handle list/show universities
        if (lowerInput.includes('universities') || lowerInput.includes('university')) {
            navigateToPage('universities');
            return;
        }

        // Handle colleges
        if (lowerInput.includes('colleges') || lowerInput.includes('college')) {
            navigateToPage('colleges');
            return;
        }

        // Handle list/show courses
        if (lowerInput.includes('courses') || lowerInput.includes('course')) {
            navigateToPage('courses');
            return;
        }
        
        // Handle bursaries
        if (lowerInput.includes('bursaries') || lowerInput.includes('bursary') || lowerInput.includes('funding')) {
            navigateToPage('bursaries');
            return;
        }
        
        // Handle APS calculator
        if (lowerInput.includes('aps') || lowerInput.includes('calculator') || lowerInput.includes('calculate') || lowerInput.includes('points')) {
            navigateToPage('aps');
            return;
        }
        
        // Handle recommendations
        if (lowerInput.includes('recommend') || lowerInput.includes('suggestion')) {
            navigateToPage('recommendations');
            return;
        }
        
        // Handle dashboard/applications
        if (lowerInput.includes('dashboard') || lowerInput.includes('application') || lowerInput.includes('status')) {
            navigateToPage('dashboard');
            return;
        }
        
        // Handle home
        if (lowerInput.includes('home') || lowerInput.includes('main') || lowerInput.includes('start')) {
            navigateToPage('home');
            return;
        }

        // Handle open page commands
        if (lowerInput.includes('open')) {
            const pages = ['courses', 'universities', 'colleges', 'dashboard', 'home', 'recommendations', 'bursaries'];
            for (const page of pages) {
                if (lowerInput.includes(page)) {
                    navigateToPage(page);
                    return;
                }
            }
        }

        // Handle search commands
        if (lowerInput.includes('search')) {
            const searchTerms = lowerInput.replace('search', '').replace('for', '').trim();
            if (searchTerms) {
                addAssistantMessage(`Searching for ${searchTerms}...`);
            } else {
                addAssistantMessage('Going to courses page to search...');
            }
            setTimeout(() => navigateToPage('courses'), 500);
            return;
        }

        // Handle deadline
        if (lowerInput.includes('deadline') || lowerInput.includes('when')) {
            speakDeadline();
            return;
        }

        // Handle help
        if (lowerInput.includes('help')) {
            showHelp();
            return;
        }

        // Handle stop/pause
        if (lowerInput.includes('stop') || lowerInput.includes('pause')) {
            handleStopCommand();
            return;
        }

        // Default: use processVoiceCommand for NLP
        const result = processVoiceCommand(lowerInput);

        switch (result.type) {
            case 'greeting':
                addAssistantMessage(result.response);
                break;
            case 'thanks':
                addAssistantMessage(result.response);
                break;
            case 'search':
                addAssistantMessage(`Searching for ${result.query} courses...`);
                setTimeout(() => navigateToPage('courses'), 500);
                break;
            case 'navigation':
                addAssistantMessage(result.response);
                setTimeout(() => navigateToPage(result.page), 500);
                break;
            default:
                addAssistantMessage("I didn't quite understand that. Try: 'open courses', 'show universities', or 'help'");
        }

        // Resume listening
        setTimeout(() => {
            resetTranscript();
            startListening();
        }, 1500);
    };

    const handleYesResponse = () => {
        const response = "Great! I'm here to help. You can say things like: 'Show me computer courses', 'Open courses page', or 'Check the deadline'. What would you like to do?";
        addAssistantMessage(response);
        resetTranscript();
    };

    const handleNoResponse = () => {
        const response = "Okay, I'll move to the side. You can click the microphone icon anytime to reactivate me.";
        addAssistantMessage(response);
        stopListening();
        setTimeout(() => {
            setIsActive(false);
        }, 1000);
    };

    const handleStopCommand = () => {
        stopListening();
        addAssistantMessage("Voice assistant paused. Click the microphone to resume.");
    };

    const navigateToPage = (page) => {
        const pages = {
            'home': '/',
            'courses': '/courses',
            'applications': '/dashboard',
            'universities': '/universities',
            'colleges': '/colleges',
            'profile': '/dashboard',
            'dashboard': '/dashboard',
            'recommendations': '/recommendations',
            'calculator': '/aps-calculator',
            'aps': '/aps-calculator',
            'track': '/track-status',
            'bursaries': '/bursaries',
            'login': '/login',
            'register': '/register'
        };

        const route = pages[page.toLowerCase()] || null;
        if (route) {
            addAssistantMessage(`Taking you to ${page}...`);
            // Use setTimeout to allow speech to start before navigation
            setTimeout(() => {
                window.location.href = route;
            }, 800);
        } else {
            addAssistantMessage(`I don't know the ${page} page. Try saying: universities, courses, colleges, recommendations, or dashboard.`);
        }
    };

    const filterCourses = (category) => {
        addAssistantMessage(`Showing ${category} courses...`);
        navigateToPage('courses');
    };

    const searchCourses = (query) => {
        addAssistantMessage(`Searching for ${query}...`);
        navigateToPage('courses');
    };

    const speakDeadline = () => {
        addAssistantMessage("The standard ICA application deadline is February 1st for applications and February 15th for payment.");
    };

    const showHelp = () => {
        const helpText = "I can help you navigate! Say: universities, courses, colleges, bursaries, recommendations, dashboard, or APS calculator. Say 'go to' followed by the page name. Say 'stop' to pause, or 'help' to hear this again.";
        addAssistantMessage(helpText);
    };

    const toggleListening = () => {
        if (listening) {
            stopListening();
        } else {
            startListening();
            if (!isActive) {
                setIsActive(true);
                const message = "I'm back! How can I help you?";
                addAssistantMessage(message);
            }
        }
    };

    const clearConversation = () => {
        setConversation([]);
        resetTranscript();
    };

    const toggleActive = () => {
        if (isActive) {
            stopListening();
            setIsActive(false);
        } else {
            setIsActive(true);
            startListening();
            const message = "Hello! How can I help you?";
            addAssistantMessage(message);
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return (
            <div className="voice-assistant-error">
                <p>Your browser doesn't support speech recognition. Please use Chrome or Edge.</p>
            </div>
        );
    }

    return (
        <div className={`voice-assistant ${isActive ? 'active' : 'minimized'}`}>
            {/* Minimized State (Side Panel) */}
            {!isActive && (
                <button
                    onClick={toggleActive}
                    className="voice-assistant-toggle"
                    aria-label="Activate voice assistant"
                    title="Click to activate voice assistant (Alt+V)"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                </button>
            )}

            {/* Active State (Full Assistant) */}
            {isActive && (
                <div className="voice-assistant-panel">
                    <div className="voice-assistant-header">
                        <h3>StudyLink SA Voice Assistant</h3>
                        <div className="flex items-center space-x-2">
                            <div className={`listening-indicator ${listening ? 'listening' : ''}`}>
                                <span className="pulse"></span>
                                <span className="pulse"></span>
                                <span className="pulse"></span>
                            </div>
                            <span className="text-sm">
                                {listening ? 'Listening...' : 'Paused'}
                            </span>
                            <button
                                onClick={toggleListening}
                                className={`mic-button ${listening ? 'active' : ''}`}
                                aria-label={listening ? 'Stop listening' : 'Start listening'}
                            >
                                {listening ? (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l2.84 2.84C5.03 7.67 4.06 8 3 8v2c1.61 0 3.09-.55 4.27-1.46L8.7 9.97C7.14 11.24 5.16 12 3 12v2c2.71 0 5.19-.99 7.11-2.62l2.51 2.51C10.99 15.81 10 18.29 10 21h2c0-2.16.76-4.14 2.03-5.7l1.43 1.43C14.55 17.91 14 19.39 14 21h2c0-1.06.33-2.03.89-2.84L19.73 21 21 19.73 4.27 3z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                        <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={() => setIsActive(false)}
                                className="close-button"
                                aria-label="Minimize assistant"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Conversation Log */}
                    <div className="conversation-log">
                        {conversation.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.speaker === 'user' ? 'user-message' : 'assistant-message'}`}
                            >
                                <div className="message-header">
                                    <span className="message-sender">
                                        {msg.speaker === 'user' ? 'You' : 'Assistant'}
                                    </span>
                                    <span className="message-time">{msg.time}</span>
                                </div>
                                <div className="message-text">{msg.text}</div>
                            </div>
                        ))}
                        <div ref={conversationEndRef} />
                    </div>

                    {/* Current Transcript */}
                    {transcript && (
                        <div className="current-transcript">
                            <p className="text-sm text-gray-600 mb-1">You said:</p>
                            <p className="transcript-text">{transcript}</p>
                        </div>
                    )}

                    {/* Quick Commands */}
                    <div className="quick-commands">
                        <p className="text-sm font-medium mb-2">Try saying:</p>
                        <div className="flex flex-wrap gap-2">
                            {['Open courses', 'Show science courses', 'Check deadline', 'Help', 'Stop'].map((cmd) => (
                                <button
                                    key={cmd}
                                    onClick={() => {
                                        addUserMessage(cmd);
                                        processCommand(cmd.toLowerCase());
                                    }}
                                    className="command-chip"
                                >
                                    {cmd}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="voice-assistant-footer">
                        <button
                            onClick={clearConversation}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Clear conversation
                        </button>
                        <div className="text-xs text-gray-400">
                            Speech by Web Speech API
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceAssistant;
