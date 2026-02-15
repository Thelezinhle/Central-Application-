import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

/**
 * AccessibilityContext
 * Manages accessibility preferences like high contrast, font size, reduced motion,
 * and screen reader mode for blind users
 * Persists settings to localStorage
 */
const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState('medium');
    const [reducedMotion, setReducedMotion] = useState(false);
    const [screenReaderMode, setScreenReaderMode] = useState(false);
    const [voiceSpeed, setVoiceSpeed] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    // Load preferences from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('a11y-preferences');
            if (saved) {
                const prefs = JSON.parse(saved);
                setHighContrast(prefs.highContrast || false);
                setFontSize(prefs.fontSize || 'medium');
                setReducedMotion(prefs.reducedMotion || false);
                setScreenReaderMode(prefs.screenReaderMode || false);
                setVoiceSpeed(prefs.voiceSpeed || 1);
            }
            
            // Also check blindUserMode from localStorage
            const blindMode = localStorage.getItem('blindUserMode') === 'true';
            const voiceEnabled = localStorage.getItem('voiceEnabled') === 'true';
            if (blindMode || voiceEnabled) {
                setScreenReaderMode(true);
            }
        } catch (error) {
            console.error('Failed to load accessibility preferences:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save preferences to localStorage whenever they change
    useEffect(() => {
        if (!isLoading) {
            try {
                localStorage.setItem('a11y-preferences', JSON.stringify({
                    highContrast,
                    fontSize,
                    reducedMotion,
                    screenReaderMode,
                    voiceSpeed
                }));
                // Also sync with blindUserMode for compatibility
                localStorage.setItem('voiceEnabled', screenReaderMode ? 'true' : 'false');
            } catch (error) {
                console.error('Failed to save accessibility preferences:', error);
            }
        }
    }, [highContrast, fontSize, reducedMotion, screenReaderMode, voiceSpeed, isLoading]);

    // Check for system preference for reduced motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (e) => {
            setReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Text-to-speech function for screen reader mode
    const speak = useCallback((text, priority = 'normal') => {
        if (!text) return;
        
        // Allow speaking even if screenReaderMode is off for direct calls
        if ('speechSynthesis' in window) {
            // Cancel previous speech if high priority
            if (priority === 'high') {
                window.speechSynthesis.cancel();
            }
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = voiceSpeed;
            utterance.pitch = 1;
            utterance.volume = 1;
            utterance.lang = 'en-ZA'; // South African English
            
            // Use a good voice if available
            const voices = window.speechSynthesis.getVoices();
            const englishVoice = voices.find(v => v.lang.includes('en')) || voices[0];
            if (englishVoice) {
                utterance.voice = englishVoice;
            }
            
            window.speechSynthesis.speak(utterance);
        }
    }, [voiceSpeed]);
    
    // Direct speak function that works regardless of screenReaderMode
    const directSpeak = useCallback((text) => {
        if (!text || !('speechSynthesis' in window)) return;
        
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = voiceSpeed;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = 'en-ZA';
        
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en')) || voices[0];
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    }, [voiceSpeed]);

    // Stop speaking
    const stopSpeaking = useCallback(() => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }, []);

    const value = {
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        setReducedMotion,
        screenReaderMode,
        setScreenReaderMode,
        voiceSpeed,
        setVoiceSpeed,
        speak,
        directSpeak,
        stopSpeaking,
        isLoading
    };

    return (
        <AccessibilityContext.Provider value={value}>
            <div
                className={`
          ${highContrast ? 'high-contrast' : ''} 
          ${reducedMotion ? 'reduced-motion' : ''}
          text-size-${fontSize === 'small' ? 'small' : fontSize === 'medium' ? 'medium' : fontSize === 'large' ? 'large' : 'x-large'}
        `}
                style={{
                    fontSize: fontSize === 'small' ? '14px'
                        : fontSize === 'medium' ? '16px'
                            : fontSize === 'large' ? '18px'
                                : '20px'
                }}
            >
                {children}
            </div>
        </AccessibilityContext.Provider>
    );
}

/**
 * Hook to use accessibility settings
 * Usage: const { highContrast, fontSize, reducedMotion } = useAccessibility();
 */
export const useAccessibility = () => {
    const context = useContext(AccessibilityContext);

    if (!context) {
        throw new Error('useAccessibility must be used within AccessibilityProvider');
    }

    return context;
};

export default AccessibilityProvider;
