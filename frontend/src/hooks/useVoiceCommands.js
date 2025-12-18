import React, { useState, useRef, useCallback } from 'react';
import { speak } from '../utils/accessibility';
import VoiceRecognitionManager from '../utils/voiceRecognition';

/**
 * VoiceCommandHandler Hook
 * Processes voice commands and performs actions
 */
export function useVoiceCommands(commands = {}) {
    const [isListening, setIsListening] = useState(false);
    const [lastCommand, setLastCommand] = useState('');
    const [feedback, setFeedback] = useState('');
    const voiceRecRef = useRef(null);

    const defaultCommands = {
        'go to home': () => window.location.href = '/',
        'go to courses': () => window.location.href = '/courses',
        'go to universities': () => window.location.href = '/universities',
        'go to applications': () => window.location.href = '/dashboard',
        'go to recommendations': () => window.location.href = '/recommendations',
        'go to login': () => window.location.href = '/login',
        'go to register': () => window.location.href = '/register',
        'go back': () => window.history.back(),
        'scroll down': () => window.scrollBy(0, 300),
        'scroll up': () => window.scrollBy(0, -300),
        'scroll to top': () => window.scrollTo(0, 0),
        'scroll to bottom': () => window.scrollTo(0, document.body.scrollHeight),
        'read page': () => {
            const text = document.body.innerText;
            speak(text);
        },
        'help': () => {
            const helpText = 'Available commands: go to home, go to courses, go to universities, go to applications, scroll down, scroll up, help. Say stop listening to stop voice mode.';
            speak(helpText);
        },
        ...commands
    };

    const processCommand = useCallback((transcript) => {
        const command = transcript.toLowerCase().trim();
        setLastCommand(command);

        // Try to find matching command
        for (const [key, action] of Object.entries(defaultCommands)) {
            if (command.includes(key) || key.includes(command)) {
                setFeedback(`Executing: ${key}`);
                speak(`Executing: ${key}`);

                // Execute the command after a short delay
                setTimeout(() => {
                    if (typeof action === 'function') {
                        action();
                    }
                }, 500);

                return true;
            }
        }

        // No command found
        setFeedback('Command not recognized. Say help for available commands.');
        speak('Command not recognized. Say help for available commands.');
        return false;
    }, [defaultCommands]);

    const startListening = useCallback(() => {
        if (!voiceRecRef.current) {
            const manager = new VoiceRecognitionManager(
                (result) => {
                    if (result.isFinal) {
                        processCommand(result.transcript);
                    }
                },
                (error) => {
                    setFeedback(`Error: ${error.message}`);
                    speak(`Error: ${error.message}`);
                    setIsListening(false);
                }
            );
            voiceRecRef.current = manager;
        }

        setIsListening(true);
        setFeedback('Listening for commands...');
        speak('Listening for commands. Say help for available commands.');
        voiceRecRef.current.start();
    }, [processCommand]);

    const stopListening = useCallback(() => {
        if (voiceRecRef.current) {
            voiceRecRef.current.stop();
        }
        setIsListening(false);
        setFeedback('Voice mode stopped.');
        speak('Voice mode stopped.');
    }, []);

    const toggleListening = useCallback(() => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    }, [isListening, startListening, stopListening]);

    return {
        isListening,
        lastCommand,
        feedback,
        startListening,
        stopListening,
        toggleListening
    };
}

/**
 * VoiceCommandBar Component
 * Visual indicator and control for voice mode
 */
export function VoiceCommandBar({ isListening, feedback, onToggle }) {
    return (
        <div className={`fixed bottom-20 left-4 right-4 p-4 rounded-lg shadow-lg ${isListening ? 'bg-red-100 border-2 border-red-500' : 'bg-blue-100 border-2 border-blue-500'
            }`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className={`font-bold text-lg ${isListening ? 'text-red-700' : 'text-blue-700'}`}>
                        {isListening ? '🎤 Listening...' : '🎤 Voice Mode'}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">{feedback}</p>
                </div>
                <button
                    onClick={onToggle}
                    className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${isListening
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isListening ? 'Stop' : 'Start'}
                </button>
            </div>
        </div>
    );
}

export default useVoiceCommands;
