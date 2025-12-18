// src/utils/accessibility.js
// Utilities for accessibility features (screen reader announcements, keyboard navigation, etc.)

/**
 * Text-to-Speech Utility (using Web Speech API)
 * Direct function to speak text aloud
 */
export const speak = (text) => {
    if ('speechSynthesis' in window) {
        // Cancel any existing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
    }
};

/**
 * Hook version for React components
 */
export const useTextToSpeech = () => {
    const cancel = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };

    const readText = (text, lang = 'en-US') => {
        // Cancel any ongoing speech
        cancel();

        // Speak the text
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1;
        utterance.pitch = 1;
        utterance.volume = 1;
        utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        cancel();
    };

    return {
        readText,
        stopSpeaking,
        isSpeaking: false, // Web Speech API doesn't expose speaking state directly
    };
};

/**
 * Announce messages to screen readers
 * Used for dynamic content updates
 */
export const announceToScreenReader = (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority); // 'polite' for normal updates, 'assertive' for urgent
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only'; // CSS class to hide visually but keep for screen readers
    announcement.textContent = message;

    document.body.appendChild(announcement);

    // Remove after announcement is read (typically 2-3 seconds)
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 3000);
};

/**
 * Handle keyboard navigation
 * Allows navigation without mouse
 */
export const handleKeyboardNavigation = (event, callbacks) => {
    const { onEnter, onEscape, onArrowUp, onArrowDown, onTab } = callbacks;

    switch (event.key) {
        case 'Enter':
            event.preventDefault();
            if (onEnter) onEnter();
            break;
        case 'Escape':
            event.preventDefault();
            if (onEscape) onEscape();
            break;
        case 'ArrowUp':
            event.preventDefault();
            if (onArrowUp) onArrowUp();
            break;
        case 'ArrowDown':
            event.preventDefault();
            if (onArrowDown) onArrowDown();
            break;
        case 'Tab':
            if (onTab) onTab();
            break;
        default:
            break;
    }
};

/**
 * Set focus to an element and announce the change
 */
export const setFocusWithAnnouncement = (element, message) => {
    if (element) {
        element.focus();
        if (message) {
            announceToScreenReader(message);
        }
    }
};

/**
 * Check if high contrast mode is enabled
 */
export const isHighContrastEnabled = () => {
    return window.matchMedia('(prefers-contrast: more)').matches;
};

/**
 * Check if reduced motion is preferred (for animations)
 */
export const isReducedMotionEnabled = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Create ARIA labels for dynamic content
 */
export const getAriaLabel = (element, action) => {
    switch (action) {
        case 'select':
            return `Select ${element}`;
        case 'delete':
            return `Delete ${element}`;
        case 'edit':
            return `Edit ${element}`;
        case 'view':
            return `View ${element}`;
        default:
            return element;
    }
};

/**
 * Validate color contrast (WCAG AA standard: 4.5:1)
 */
export const checkColorContrast = (foreground, background) => {
    // Simple contrast checker
    const getLuminance = (color) => {
        const rgb = parseInt(color.slice(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;

        const luminance =
            (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
        contrast: contrast.toFixed(2),
        isWCAGAA: contrast >= 4.5,
        isWCAGAAA: contrast >= 7,
    };
};

/**
 * Enhanced screen reader announcements with context
 * Provides detailed information for blind users
 */
export const announceAction = (action, element, details = '') => {
    const message = `${action} on ${element}${details ? '. ' + details : ''}`;
    announceToScreenReader(message, 'polite');
};

/**
 * Announce course information to screen readers
 */
export const announceCourseInfo = (course) => {
    const info = [
        `Course: ${course.name}`,
        `Code: ${course.code}`,
        `Level: ${course.level}`,
        `Study Mode: ${course.studyMode}`,
        `Duration: ${course.duration?.value} ${course.duration?.unit || 'years'}`,
        course.aps ? `APS Range: ${course.aps.minimumAPS} to ${course.aps.maximumAPS}` : '',
        course.tuitionFee ? `Fees: Local R${course.tuitionFee.local?.toLocaleString() || 0}, International R${course.tuitionFee.international?.toLocaleString() || 0}` : ''
    ].filter(Boolean).join('. ');

    announceToScreenReader(info, 'polite');
};

/**
 * Create comprehensive ARIA descriptions
 */
export const createAriaDescription = (element, type) => {
    const descriptions = {
        courseCard: `Course card. Click to view details or use Tab to navigate through fields. Space or Enter to select.`,
        filterInput: `Search filter. Type to search courses by name or university.`,
        levelFilter: `Filter by qualification level. Options include Diploma, Bachelor, Honors, Masters, and PhD.`,
        studyModeFilter: `Filter by study mode. Options include Full-time, Part-time, Distance, and Hybrid.`,
        expandButton: `Expand or collapse university section. Press Enter to toggle.`,
        applyButton: `Apply for this course. Press Enter to proceed to application.`,
        selectCheckbox: `Select this course for batch application. Up to 10 courses can be selected.`,
        selectedCounter: `Number of selected courses. Currently has focus for announcement.`
    };

    return descriptions[type] || '';
};

/**
 * Announce form submission status
 */
export const announceFormStatus = (success, courseCount) => {
    if (success) {
        announceToScreenReader(
            `Successfully proceeding with application for ${courseCount} course${courseCount !== 1 ? 's' : ''}. You will be redirected to the application form.`,
            'assertive'
        );
    } else {
        announceToScreenReader(
            'Error: Please ensure you are logged in and have selected at least one course.',
            'assertive'
        );
    }
};

/**
 * Provide skip navigation links for blind users
 */
export const createSkipLinks = () => {
    const skipContainer = document.createElement('div');
    skipContainer.className = 'sr-only focus:not-sr-only';
    skipContainer.innerHTML = `
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <a href="#filter-section" className="skip-link">Skip to filters</a>
    `;
    return skipContainer;
};

export default {
    useTextToSpeech,
    announceToScreenReader,
    handleKeyboardNavigation,
    setFocusWithAnnouncement,
    isHighContrastEnabled,
    isReducedMotionEnabled,
    getAriaLabel,
    checkColorContrast,
    announceAction,
    announceCourseInfo,
    createAriaDescription,
    announceFormStatus,
    createSkipLinks,
};
