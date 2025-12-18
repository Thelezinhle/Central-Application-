/**
 * Extended Accessibility Utilities
 * Advanced helpers for keyboard navigation, focus management, and ARIA patterns
 */

/**
 * Manage focus trap (for modals, dialogs)
 * Prevents focus from leaving a specific container
 */
export function useFocusTrap(containerRef) {
    const getFocusableElements = () => {
        if (!containerRef.current) return [];
        return Array.from(
            containerRef.current.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        );
    };

    const handleKeyDown = (e) => {
        if (e.key !== 'Tab') return;

        const focusableElements = getFocusableElements();
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    };

    return { handleKeyDown, getFocusableElements };
}

/**
 * Restore focus to previous element
 * Useful when closing modals or overlays
 */
let previousFocusElement = null;

export function saveFocus() {
    previousFocusElement = document.activeElement;
}

export function restoreFocus() {
    if (previousFocusElement && previousFocusElement.focus) {
        previousFocusElement.focus();
    }
}

/**
 * Announce to screen reader with delay
 * Ensures message is registered by screen reader
 */
export function announceWithDelay(message, delay = 100) {
    setTimeout(() => {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 2000);
    }, delay);
}

/**
 * Check if element is visible and focusable
 */
export function isElementAccessible(element) {
    if (!element) return false;

    const style = window.getComputedStyle(element);
    const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
    const isDisabled = element.hasAttribute('disabled');

    return isVisible && !isDisabled;
}

/**
 * Set focus on element with announcement
 */
export function focusElement(element, announcement = null) {
    if (element && isElementAccessible(element)) {
        element.focus();

        if (announcement) {
            announceWithDelay(announcement);
        }
    }
}

/**
 * Create accessible table headers
 * Useful for data tables
 */
export function createTableHeaders(columns) {
    return columns.map((col, idx) => (
        <th
            key={idx}
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
            {col.label}
        </th>
    ));
}

/**
 * Check color contrast ratio (WCAG AAA: 7:1, AA: 4.5:1)
 */
export function getContrastRatio(rgb1, rgb2) {
    const getLuminance = (rgb) => {
        const [r, g, b] = rgb.match(/\d+/g).map(Number);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.03928
            ? Math.pow((luminance + 0.05) / 1.05, 2)
            : luminance / 12.92;
    };

    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
        ratio: ratio.toFixed(2),
        isWCAGAA: ratio >= 4.5,
        isWCAGAAA: ratio >= 7
    };
}

/**
 * Keyboard event handlers
 */
export const keyHandlers = {
    isEnter: (key) => key === 'Enter',
    isSpace: (key) => key === ' ',
    isEscape: (key) => key === 'Escape',
    isArrowUp: (key) => key === 'ArrowUp',
    isArrowDown: (key) => key === 'ArrowDown',
    isArrowLeft: (key) => key === 'ArrowLeft',
    isArrowRight: (key) => key === 'ArrowRight',
    isTab: (key) => key === 'Tab',
    isHome: (key) => key === 'Home',
    isEnd: (key) => key === 'End'
};

/**
 * ARIA label builder
 * Creates semantic ARIA labels for complex elements
 */
export const ariaLabels = {
    button: (action, target) => `${action} ${target}`,
    closeButton: () => 'Close dialog',
    menuButton: (isOpen) => `${isOpen ? 'Close' : 'Open'} menu`,
    toggleButton: (isOn) => `${isOn ? 'Disable' : 'Enable'}`,
    sortButton: (column, direction) => `Sort by ${column}, ${direction}`,
    pagination: (page, total) => `Page ${page} of ${total}`,
    search: () => 'Search',
    filter: (filterType) => `Filter by ${filterType}`,
    loadMore: () => 'Load more results'
};

/**
 * Get computed accessible name
 * Returns the actual name announced by screen readers
 */
export function getAccessibleName(element) {
    if (!element) return '';

    // Check aria-labelledby
    const labelledBy = element.getAttribute('aria-labelledby');
    if (labelledBy) {
        return Array.from(labelledBy.split(' '))
            .map(id => document.getElementById(id)?.textContent)
            .join(' ');
    }

    // Check aria-label
    const ariaLabel = element.getAttribute('aria-label');
    if (ariaLabel) return ariaLabel;

    // Check associated label
    if (element.id) {
        const label = document.querySelector(`label[for="${element.id}"]`);
        if (label) return label.textContent;
    }

    // Check title
    return element.getAttribute('title') || element.textContent || '';
}

/**
 * Test element keyboard accessibility
 */
export function testKeyboardAccess(element) {
    const issues = [];

    // Check if focusable
    const isFocusable = /^(a|button|input|select|textarea|[tabindex])$/.test(element.tagName.toLowerCase()) ||
        element.hasAttribute('tabindex');

    if (!isFocusable) {
        issues.push('Element is not keyboard focusable');
    }

    // Check if has accessible name
    const name = getAccessibleName(element);
    if (!name) {
        issues.push('Element lacks accessible name');
    }

    // Check focus indicators
    const style = window.getComputedStyle(element, ':focus');
    if (style.outline === 'none' || style.outline === 'rgb(0, 0, 0) none 0px') {
        issues.push('No visible focus indicator');
    }

    return {
        isFocusable,
        hasAccessibleName: !!name,
        accessibleName: name,
        issues,
        isAccessible: issues.length === 0
    };
}

export default {
    useFocusTrap,
    saveFocus,
    restoreFocus,
    announceWithDelay,
    isElementAccessible,
    focusElement,
    createTableHeaders,
    getContrastRatio,
    keyHandlers,
    ariaLabels,
    getAccessibleName,
    testKeyboardAccess
};
