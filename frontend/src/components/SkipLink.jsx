import React from 'react';

/**
 * SkipLink Component
 * Allows keyboard users to skip directly to main content
 * Essential for accessibility - should be first element in document
 */
export function SkipLink({ href = '#main-content', label = 'Skip to main content' }) {
    const handleClick = (e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.focus();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            className="skip-nav-link"
        >
            {label}
        </a>
    );
}

/**
 * SkipLinks Component
 * Multiple skip links for different sections
 */
export function SkipLinks() {
    const links = [
        { href: '#main-content', label: 'Skip to main content' },
        { href: '#navigation', label: 'Skip to navigation' },
        { href: '#footer', label: 'Skip to footer' }
    ];

    return (
        <div className="relative">
            {links.map((link, index) => (
                <a
                    key={index}
                    href={link.href}
                    className={`
            absolute left-0 px-4 py-2 bg-blue-600 text-white font-bold rounded-b-lg z-50
            -translate-y-full focus:translate-y-0 transition-transform
            ${index > 0 ? `top-${index * 12}` : 'top-0'}
          `}
                    onClick={(e) => {
                        const target = document.querySelector(link.href);
                        if (target) {
                            target.focus();
                            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }}
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
}

export default SkipLink;
