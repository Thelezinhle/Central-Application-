import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * AccessibilityContext
 * Manages accessibility preferences like high contrast, font size, and reduced motion
 * Persists settings to localStorage
 */
const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
    const [highContrast, setHighContrast] = useState(false);
    const [fontSize, setFontSize] = useState('medium');
    const [reducedMotion, setReducedMotion] = useState(false);
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
                    reducedMotion
                }));
            } catch (error) {
                console.error('Failed to save accessibility preferences:', error);
            }
        }
    }, [highContrast, fontSize, reducedMotion, isLoading]);

    // Check for system preference for reduced motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const handleChange = (e) => {
            setReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const value = {
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        setReducedMotion,
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
