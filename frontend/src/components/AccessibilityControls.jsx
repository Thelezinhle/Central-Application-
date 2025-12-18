import React, { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * AccessibilityControls Component
 * Provides UI controls for accessibility settings
 * Can be placed in a fixed position, header, or settings page
 */
export function AccessibilityControls({ className = 'fixed bottom-4 left-4' }) {
    const {
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        setReducedMotion,
        isLoading
    } = useAccessibility();

    const [isVisible, setIsVisible] = useState(true);
    const hideTimeoutRef = useRef(null);

    // Auto-hide after 10 seconds of inactivity
    useEffect(() => {
        const resetHideTimer = () => {
            // Show controls if hidden
            if (!isVisible) {
                setIsVisible(true);
            }

            // Clear previous timeout
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }

            // Set new timeout to hide after 10 seconds
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 10000);
        };

        // Reset timer on user interaction
        const container = document.querySelector('[data-a11y-controls]');
        if (container) {
            container.addEventListener('mouseenter', resetHideTimer);
            container.addEventListener('click', resetHideTimer);
            container.addEventListener('focus', resetHideTimer, true);
        }

        // Initial hide timer
        resetHideTimer();

        return () => {
            if (container) {
                container.removeEventListener('mouseenter', resetHideTimer);
                container.removeEventListener('click', resetHideTimer);
                container.removeEventListener('focus', resetHideTimer, true);
            }
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, [isVisible]);

    if (isLoading) {
        return null;
    }

    return (
        <>
            <div
                data-a11y-controls
                role="toolbar"
                aria-label="Accessibility controls"
                className={`${className} bg-white p-4 rounded-lg shadow-lg z-50 border-2 border-[#228B22] transition-all duration-300 ${!isVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                <div className="space-y-3">
                    {/* High Contrast Toggle */}
                    <button
                        onClick={() => setHighContrast(!highContrast)}
                        aria-pressed={highContrast}
                        className={`
            w-full px-4 py-2 rounded-lg font-medium transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#228B22] focus:ring-offset-2
            ${highContrast
                                ? 'bg-white text-[#228B22] border-2 border-[#228B22]'
                                : 'bg-gray-100 text-gray-800 border-2 border-gray-300 hover:bg-gray-200'
                            }
          `}
                        title={highContrast ? 'Disable high contrast mode' : 'Enable high contrast mode'}
                    >
                        High Contrast {highContrast ? 'Off' : 'On'}
                    </button>

                    {/* Font Size Selector */}
                    <div>
                        <label
                            htmlFor="font-size-select"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Text Size:
                        </label>
                        <select
                            id="font-size-select"
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            aria-label="Choose text size"
                            className={`
              w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]
              ${highContrast
                                    ? 'bg-black text-white border-white'
                                    : 'bg-white border-gray-300'
                                }
            `}
                        >
                            <option value="small">Small (14px)</option>
                            <option value="medium">Medium (16px)</option>
                            <option value="large">Large (18px)</option>
                            <option value="x-large">Extra Large (20px)</option>
                        </select>
                    </div>

                    {/* Reduce Motion Toggle */}
                    <button
                        onClick={() => setReducedMotion(!reducedMotion)}
                        aria-pressed={reducedMotion}
                        className={`
            w-full px-4 py-2 rounded-lg font-medium transition-colors
            focus:outline-none focus:ring-2 focus:ring-[#228B22] focus:ring-offset-2
            ${reducedMotion
                                ? 'bg-[#228B22] text-white border-2 border-[#1a6b1a]'
                                : 'bg-gray-200 text-gray-800 border-2 border-gray-300 hover:bg-gray-300'
                            }
          `}
                        title={reducedMotion ? 'Enable animations' : 'Disable animations for reduced motion'}
                    >
                        Reduce Motion {reducedMotion ? 'Off' : 'On'}
                    </button>

                    {/* Info Text */}
                    <p className="text-xs text-gray-600 text-center mt-2">
                        Settings saved automatically
                    </p>
                </div>
            </div>

            {/* Show button when hidden */}
            {!isVisible && (
                <button
                    onClick={() => {
                        setIsVisible(true);
                        if (hideTimeoutRef.current) {
                            clearTimeout(hideTimeoutRef.current);
                        }
                        hideTimeoutRef.current = setTimeout(() => {
                            setIsVisible(false);
                        }, 10000);
                    }}
                    className={`${className} bg-green-700 text-white p-2 rounded-lg shadow-lg z-50 border-2 border-green-600 hover:bg-green-800 font-bold transition-all duration-300`}
                    aria-label="Show accessibility controls"
                    title="Show accessibility settings (will auto-hide after 10 seconds)"
                >
                    A11y
                </button>
            )}
        </>
    );
}

/**
 * AccessibilityMenu Component
 * Alternative menu-style presentation for accessibility controls
 * Useful for header/navigation integration
 */
export function AccessibilityMenu() {
    const {
        highContrast,
        setHighContrast,
        fontSize,
        setFontSize,
        reducedMotion,
        setReducedMotion
    } = useAccessibility();

    const fontSizeOptions = [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' },
        { value: 'x-large', label: 'Extra Large' }
    ];

    return (
        <div
            role="group"
            aria-labelledby="a11y-menu-heading"
            className="bg-white p-6 rounded-lg shadow-md"
        >
            <h2 id="a11y-menu-heading" className="text-lg font-bold mb-4">
                Accessibility Settings
            </h2>

            <div className="space-y-4">
                {/* High Contrast */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="high-contrast"
                        checked={highContrast}
                        onChange={(e) => setHighContrast(e.target.checked)}
                        className="w-4 h-4 text-green-700 rounded focus:ring-2 focus:ring-green-600"
                    />
                    <label htmlFor="high-contrast" className="ml-3 text-sm font-medium cursor-pointer">
                        High Contrast Mode
                    </label>
                </div>

                {/* Reduced Motion */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="reduced-motion"
                        checked={reducedMotion}
                        onChange={(e) => setReducedMotion(e.target.checked)}
                        className="w-4 h-4 text-green-700 rounded focus:ring-2 focus:ring-green-600"
                    />
                    <label htmlFor="reduced-motion" className="ml-3 text-sm font-medium cursor-pointer">
                        Reduce Motion / Animations
                    </label>
                </div>

                {/* Font Size */}
                <div>
                    <label htmlFor="font-size-select" className="block text-sm font-medium mb-2">
                        Text Size
                    </label>
                    <select
                        id="font-size-select"
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600"
                    >
                        {fontSizeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default AccessibilityControls;
