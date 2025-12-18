import { useState, useEffect, useCallback } from 'react';
import SpeechRecognition from 'react-speech-recognition';

export const useVoiceControl = (options = {}) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    const startListening = useCallback(() => {
        if (!SpeechRecognition.browserSupportsSpeechRecognition) {
            console.warn('Browser does not support speech recognition');
            return;
        }

        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-US'
        });
        setIsListening(true);
    }, []);

    const stopListening = useCallback(() => {
        SpeechRecognition.stopListening();
        setIsListening(false);
    }, []);

    // Handle keyboard shortcut (Ctrl+K or Cmd+K)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (isListening) {
                    stopListening();
                } else {
                    startListening();
                }
            }

            // Escape to stop listening
            if (e.key === 'Escape' && isListening) {
                stopListening();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isListening, startListening, stopListening]);

    return {
        isListening,
        transcript,
        startListening,
        stopListening
    };
};

export default useVoiceControl;
