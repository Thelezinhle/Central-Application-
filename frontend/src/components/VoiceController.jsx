import React, { useEffect, useRef, useState } from 'react';
import { speak } from '../utils/accessibility';
import VoiceRecognitionManager from '../utils/voiceRecognition';
import { executeVoiceCommand, ICA_VOICE_COMMANDS } from '../utils/voiceCommands';

/**
 * VoiceController Component
 * Enhanced voice command system for full app control
 * Listens for voice input and executes commands or navigates the app
 */
export function VoiceController() {
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const voiceRecRef = useRef(null);
    const listeningTimeoutRef = useRef(null);
    const [commandHistory, setCommandHistory] = useState([]);

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
        setFeedback('Processing command...');

        // Execute the enhanced voice command system
        executeVoiceCommand(
            input,
            (message) => {
                setFeedback(message);
                speak(message);
                setCommandHistory([...commandHistory, { command: input, result: message, timestamp: new Date() }]);
            },
            (error) => {
                setFeedback(`Error: ${error.message}`);
                speak(`Error: ${error.message}`);
            }
        );

        // Resume listening after a delay
        setTimeout(() => {
            if (voiceEnabled) {
                startListening();
            }
        }, 1000);
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
                    <p className="font-medium mb-1">Try saying:</p>
                    <ul className="space-y-1">
                        <li>Go to [page]: navigate to any page</li>
                        <li>Search for [term]: find courses</li>
                        <li>Fill [field] with [value]: fill forms</li>
                        <li>Click [button]: click buttons</li>
                        <li>Scroll [direction]: scroll page</li>
                        <li>Help: see all commands</li>
                        <li>✓ Read page: hear page content</li>
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
