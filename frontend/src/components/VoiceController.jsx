import React, { useEffect, useRef, useState } from 'react';
import { speak } from '../utils/accessibility';
import VoiceRecognitionManager from '../utils/voiceRecognition';

/**
 * VoiceController Component
 * Manages voice commands for blind users
 * Listens for voice input and responds accordingly
 */
export function VoiceController() {
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const voiceRecRef = useRef(null);
    const listeningTimeoutRef = useRef(null);

    // Initialize voice recognition when component mounts
    useEffect(() => {
        if (voiceEnabled) {
            startListening();
            // Announce that voice mode is active
            speak('Voice mode is active. Say help for available commands, or navigate using voice.');
        }

        return () => {
            stopListening();
        };
    }, []);

    const startListening = () => {
        if (isListening) return;

        if (!voiceRecRef.current) {
            try {
                const manager = new VoiceRecognitionManager(
                    handleVoiceResult,
                    handleVoiceError
                );
                voiceRecRef.current = manager;
            } catch (error) {
                setFeedback('Voice recognition not available');
                speak('Voice recognition is not available in your browser');
                return;
            }
        }

        setIsListening(true);
        setTranscript('');
        setFeedback('Listening...');
        voiceRecRef.current.start();

        // Clear previous timeout
        if (listeningTimeoutRef.current) {
            clearTimeout(listeningTimeoutRef.current);
        }

        // Auto-stop after 10 seconds if no input
        listeningTimeoutRef.current = setTimeout(() => {
            if (isListening) {
                stopListening();
                startListening(); // Auto-restart
            }
        }, 10000);
    };

    const stopListening = () => {
        if (voiceRecRef.current) {
            voiceRecRef.current.stop();
        }
        setIsListening(false);

        if (listeningTimeoutRef.current) {
            clearTimeout(listeningTimeoutRef.current);
        }
    };

    const handleVoiceResult = (result) => {
        const input = result.transcript.toLowerCase().trim();
        setTranscript(input);
        setFeedback('Processing...');

        processVoiceCommand(input);

        // Resume listening
        setTimeout(() => {
            if (voiceEnabled) {
                startListening();
            }
        }, 500);
    };

    const handleVoiceError = (error) => {
        setFeedback(`Error: ${error.message}`);
        speak(`Error: ${error.message}`);

        // Restart listening after error
        setTimeout(() => {
            if (voiceEnabled) {
                startListening();
            }
        }, 1000);
    };

    const processVoiceCommand = (input) => {
        // Navigation commands
        if (input.includes('home') || input.includes('go home')) {
            window.location.href = '/';
            speak('Going to home page');
            return;
        }

        if (input.includes('courses') || input.includes('browse courses')) {
            window.location.href = '/courses';
            speak('Going to courses page');
            return;
        }

        if (input.includes('universities') || input.includes('browse universities')) {
            window.location.href = '/universities';
            speak('Going to universities page');
            return;
        }

        if (input.includes('recommendations') || input.includes('get recommendations')) {
            window.location.href = '/recommendations';
            speak('Going to recommendations page');
            return;
        }

        if (input.includes('dashboard') || input.includes('my dashboard')) {
            window.location.href = '/dashboard';
            speak('Going to dashboard');
            return;
        }

        if (input.includes('track') || input.includes('track status')) {
            window.location.href = '/track-status';
            speak('Going to track status page');
            return;
        }

        if (input.includes('login') || input.includes('sign in')) {
            window.location.href = '/login';
            speak('Going to login page');
            return;
        }

        if (input.includes('register') || input.includes('sign up')) {
            window.location.href = '/register';
            speak('Going to register page');
            return;
        }

        // Help command
        if (input.includes('help') || input.includes('what can i do')) {
            const helpText = `Available commands: Say home, courses, universities, recommendations, dashboard, track status, login, register. Say help to hear this again.`;
            speak(helpText);
            setFeedback(helpText);
            return;
        }

        // Page reading commands
        if (input.includes('read') || input.includes('read page')) {
            const mainContent = document.querySelector('main');
            if (mainContent) {
                const heading = mainContent.querySelector('h1')?.textContent || 'Current page';
                const text = mainContent.textContent.substring(0, 200);
                speak(`${heading}. ${text}`);
                setFeedback('Reading page content');
            }
            return;
        }

        // Voice mode toggle
        if (input.includes('stop') || input.includes('disable voice')) {
            disableVoiceMode();
            return;
        }

        // Repeat command
        if (input.includes('repeat') || input.includes('say that again')) {
            speak('Please say another command. Or say help for available commands.');
            setFeedback('Waiting for command');
            return;
        }

        // Unknown command
        speak('Command not recognized. Say help for available commands.');
        setFeedback('Command not recognized');
    };

    const disableVoiceMode = () => {
        setVoiceEnabled(false);
        stopListening();
        speak('Voice mode disabled');
        setFeedback('Voice mode disabled');

        setTimeout(() => {
            localStorage.setItem('blindUserMode', 'false');
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="fixed bottom-20 left-4 bg-white rounded-lg shadow-lg z-40 border-2 border-[#228B22] p-4 max-w-sm">
            <div className="space-y-2">
                {/* Status indicator */}
                <div className="flex items-center gap-2">
                    <div
                        className={`w-3 h-3 rounded-full ${isListening ? 'bg-red-600 animate-pulse' : 'bg-[#228B22]'
                            }`}
                        aria-hidden="true"
                    ></div>
                    <span className="text-sm font-medium text-[#228B22]">
                        {isListening ? 'Listening...' : 'Ready'}
                    </span>
                </div>

                {/* Feedback */}
                {feedback && (
                    <div className="bg-white p-2 rounded text-sm text-[#228B22] border-l-2 border-[#228B22]">
                        {feedback}
                    </div>
                )}

                {/* Transcript */}
                {transcript && (
                    <div className="bg-white p-2 rounded text-sm text-gray-900 border border-[#228B22]">
                        <strong>You said:</strong> {transcript}
                    </div>
                )}

                {/* Quick help */}
                <div className="text-xs text-gray-700 bg-white p-2 rounded border border-[#228B22]">
                    <p className="font-medium mb-1">Say any of these:</p>
                    <ul className="space-y-1">
                        <li>- help: for all commands</li>
                        <li>- home, courses, universities</li>
                        <li>- recommendations, dashboard</li>
                        <li>- read page: to read current page</li>
                        <li>- stop: to disable voice</li>
                    </ul>
                </div>

                {/* Control buttons */}
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            if (isListening) {
                                stopListening();
                            } else {
                                startListening();
                            }
                        }}
                        className={`flex-1 py-2 px-3 rounded text-sm font-bold text-white transition-colors ${isListening
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-[#228B22] hover:bg-[#1a6b1a]'
                            }`}
                        aria-label={isListening ? 'Stop listening' : 'Start listening'}
                    >
                        {isListening ? 'Stop' : 'Listen'}
                    </button>

                    <button
                        onClick={disableVoiceMode}
                        className="flex-1 py-2 px-3 bg-[#228B22] hover:bg-[#1a6b1a] text-white rounded text-sm font-bold transition-colors"
                        aria-label="Disable voice mode"
                    >
                        Off
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VoiceController;
