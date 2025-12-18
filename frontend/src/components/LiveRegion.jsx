import React, { useEffect, useRef } from 'react';

/**
 * LiveRegion Component
 * Announces dynamic content changes to screen readers
 * Used for status updates, form submissions, filtering results, etc.
 */
export function LiveRegion({ message, politeness = 'polite' }) {
    const regionRef = useRef(null);

    useEffect(() => {
        if (message && regionRef.current) {
            // Clear previous content first
            regionRef.current.textContent = '';
            // Add new content (forces screen reader to re-announce)
            setTimeout(() => {
                regionRef.current.textContent = message;
            }, 100);
        }
    }, [message]);

    return (
        <div
            ref={regionRef}
            role="status"
            aria-live={politeness}
            aria-atomic="true"
            className="sr-only"
        />
    );
}

/**
 * AssertiveRegion Component
 * For urgent announcements that interrupt current speech
 */
export function AssertiveRegion({ message }) {
    return <LiveRegion message={message} politeness="assertive" />;
}

export default LiveRegion;
