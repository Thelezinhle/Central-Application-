import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { speak as directSpeak } from '../utils/accessibility';
import VoiceRecognitionManager from '../utils/voiceRecognition';

/**
 * BlindUserOnboarding Component
 * First-time setup for blind users
 * Asks if they are blind and enables voice mode
 */
export function BlindUserOnboarding({ onComplete }) {
    const { setScreenReaderMode } = useAccessibility();
    const [started, setStarted] = useState(false);
    const [isBlind, setIsBlind] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [message, setMessage] = useState('');
    const voiceRecRef = useRef(null);

    useEffect(() => {
        // Auto-play the welcome message
        if (!started) {
            setTimeout(() => {
                const welcomeMessage = 'Welcome to StudyLink SA. Can I help you? I can navigate this application using voice commands. Say yes if you would like voice help, or no if you prefer to navigate on your own.';
                directSpeak(welcomeMessage);
                setStarted(true);
            }, 500);
        }
    }, [started]);

    const handleVoiceInput = () => {
        if (!voiceRecRef.current) {
            const manager = new VoiceRecognitionManager(
                (result) => {
                    const answer = result.transcript.toLowerCase();
                    setTranscript(answer);

                    // Check for yes/no responses
                    if (answer.includes('yes') || answer.includes('yeah') || answer.includes('yep')) {
                        handleBlindUserYes();
                    } else if (answer.includes('no') || answer.includes('nope')) {
                        handleBlindUserNo();
                    } else {
                        setMessage('I did not understand. Please say yes or no.');
                        directSpeak('I did not understand. Please say yes or no.');
                        setIsListening(false);
                    }
                },
                (error) => {
                    setMessage(`Error: ${error.message}`);
                    directSpeak(`Error: ${error.message}`);
                    setIsListening(false);
                }
            );
            voiceRecRef.current = manager;
        }

        setIsListening(true);
        setTranscript('');
        voiceRecRef.current.start();
    };

    const handleBlindUserYes = () => {
        const confirmMessage = 'Great! I will enable screen reader mode for you. This application can now speak everything to you and listen to your voice commands.';
        directSpeak(confirmMessage);
        setMessage('Screen reader mode enabled for blind users');

        // Store preference and enable screen reader mode
        localStorage.setItem('blindUserMode', 'true');
        localStorage.setItem('voiceEnabled', 'true');
        setScreenReaderMode(true);

        setTimeout(() => {
            onComplete(true);
        }, 3000);
    };

    const handleBlindUserNo = () => {
        const message = 'Understood. You can still use keyboard navigation and accessibility features. Have a great experience!';
        directSpeak(message);
        setMessage('Standard accessibility mode enabled');

        localStorage.setItem('blindUserMode', 'false');

        setTimeout(() => {
            onComplete(false);
        }, 2000);
    };

    const handleSkip = () => {
        directSpeak('Skipping blind user setup. You can enable screen reader mode anytime in accessibility settings.');
        localStorage.setItem('blindUserSetupSkipped', 'true');
        onComplete(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-lg w-full mx-4 border-t-4 border-[#228B22]">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-6 text-[#228B22]">Welcome</h1>

                    <div className="mb-6">
                        <p className="text-lg text-gray-700 mb-4">
                            Can I help you?
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                            I can listen to your voice commands and guide you through this application. Say "yes" to enable voice assistance, or "no" to use standard navigation.
                        </p>
                    </div>

                    {message && (
                        <div className="mb-4 p-4 bg-white border-l-4 border-[#228B22] text-[#228B22]">
                            <p>{message}</p>
                        </div>
                    )}

                    {transcript && (
                        <div className="mb-4 p-3 bg-gray-100 rounded text-gray-900 text-sm border border-gray-300">
                            <strong>You said:</strong> {transcript}
                        </div>
                    )}

                    <div className="space-y-3">
                        <button
                            onClick={handleVoiceInput}
                            disabled={isListening}
                            className={`w-full py-3 px-4 rounded-lg font-bold text-white text-lg transition-all ${isListening
                                ? 'bg-red-700 hover:bg-red-800'
                                : 'bg-green-700 hover:bg-green-800'
                                }`}
                            aria-label="Use voice to answer"
                        >
                            {isListening ? 'Listening...' : 'Use Voice'}
                        </button>

                        <div className="flex gap-3">
                            <button
                                onClick={handleBlindUserYes}
                                className="flex-1 py-2 px-4 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold transition-all"
                                aria-label="Yes, please help me"
                            >
                                Yes
                            </button>
                            <button
                                onClick={handleBlindUserNo}
                                className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-all"
                                aria-label="No, I don't need help"
                            >
                                No
                            </button>
                        </div>

                        <button
                            onClick={handleSkip}
                            className="w-full py-2 px-4 text-gray-700 hover:text-black font-medium transition-all"
                            aria-label="Skip this setup"
                        >
                            Skip for now
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                        Tip: Make sure your microphone is enabled for voice features to work.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BlindUserOnboarding;
