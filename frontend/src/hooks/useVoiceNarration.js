import { useCallback, useRef, useState } from 'react';

/**
 * useVoiceNarration Hook
 * Provides easy access to text-to-speech functionality
 * Usage: const { speak, stop, isSpeaking } = useVoiceNarration();
 */
export function useVoiceNarration() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(false);
    const synthRef = useRef(null);
    const [speechRate, setSpeechRate] = useState(1);

    // Initialize on first use
    const initializeSpeech = useCallback(() => {
        if (!synthRef.current && 'speechSynthesis' in window) {
            synthRef.current = window.speechSynthesis;
            const savedEnabled = localStorage.getItem('voiceEnabled') === 'true';
            setVoiceEnabled(savedEnabled);
        }
    }, []);

    const speak = useCallback((text) => {
        initializeSpeech();

        if (!synthRef.current || !text || !voiceEnabled) return;

        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechRate;
        utterance.pitch = 1;
        utterance.volume = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        synthRef.current.speak(utterance);
    }, [voiceEnabled, speechRate, initializeSpeech]);

    const stop = useCallback(() => {
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return {
        speak,
        stop,
        isSpeaking,
        voiceEnabled,
        setVoiceEnabled,
        speechRate,
        setSpeechRate
    };
}

export default useVoiceNarration;
