import React, { useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccessibility } from '../context/AccessibilityContext';

/**
 * ScreenReader Component
 * Automatically reads page content for blind users
 * Provides voice navigation and content narration
 */
export function ScreenReader() {
    const location = useLocation();
    const { screenReaderMode, speak, stopSpeaking, directSpeak } = useAccessibility();
    const lastPathRef = useRef('');
    const hasAnnouncedRef = useRef(false);

    // Page descriptions for navigation
    const pageDescriptions = {
        '/': 'Home page. Welcome to CAO South Africa. Your path to university success. Use tab to navigate through the menu. Press buttons to explore universities, colleges, calculate APS, or find bursaries.',
        '/universities': 'Universities page. Browse all 26 South African universities. Use the dropdown to filter by province. Each university can be clicked to visit their website.',
        '/colleges': 'Colleges page. Browse South African TVET colleges. Use the province dropdown to filter. Click any college to see details.',
        '/cao-programmes': 'CAO Programmes page. View university codes and available courses.',
        '/bursaries': 'Bursaries page. Find funding opportunities for your studies.',
        '/recommendations': 'Smart Recommendations page. Enter your APS scores to get personalized course suggestions.',
        '/aps-calculator': 'APS Calculator page. Calculate your Admission Point Score.',
        '/track-status': 'Track Status page. Check your application status.',
        '/login': 'Login page. Enter your email and password.',
        '/register': 'Registration page. Create a new account.',
        '/dashboard': 'Dashboard page. View your applications.',
        '/application': 'Application form page.',
        '/admin': 'Admin Dashboard.',
    };

    // Announce page change - always works for accessibility
    const announcePageChange = useCallback((path, forceSpeak = false) => {
        // Get page description
        let description = pageDescriptions[path];
        
        // Handle dynamic routes
        if (!description) {
            if (path.includes('/university/')) {
                description = 'University details page. View information about this university.';
            } else if (path.includes('/college/')) {
                description = 'College details page. View information about this college.';
            } else if (path.includes('/course/')) {
                description = 'Course details page. View requirements and information.';
            } else {
                description = 'Page loaded. Use tab to navigate.';
            }
        }

        // Speak the page description - use directSpeak if forcing or screenReaderMode
        setTimeout(() => {
            if (forceSpeak && directSpeak) {
                directSpeak(description);
            } else if (screenReaderMode) {
                speak(description, 'high');
            }
        }, 500);
    }, [screenReaderMode, speak, directSpeak]);

    // Monitor route changes
    useEffect(() => {
        if (location.pathname !== lastPathRef.current) {
            lastPathRef.current = location.pathname;
            hasAnnouncedRef.current = false;
            
            // Announce page change when screenReaderMode is active
            if (screenReaderMode) {
                announcePageChange(location.pathname);
                hasAnnouncedRef.current = true;
            }
        }
    }, [location.pathname, announcePageChange, screenReaderMode]);

    // Add keyboard shortcuts for screen reader - always available
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Alt + S: Stop speaking
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                stopSpeaking();
                if (directSpeak) directSpeak('Speech stopped');
            }
            // Alt + R: Repeat current page description
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                announcePageChange(location.pathname, true);
            }
            // Alt + H: Announce help
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                const helpMessage = 'Screen reader shortcuts. Alt S stops speaking. Alt R repeats page. Alt H for help. Tab navigates buttons and links.';
                if (directSpeak) {
                    directSpeak(helpMessage);
                } else {
                    speak(helpMessage, 'high');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [stopSpeaking, speak, directSpeak, announcePageChange, location.pathname]);

    // Add focus listener to announce focused elements
    useEffect(() => {
        if (!screenReaderMode) return;

        const handleFocus = (e) => {
            const element = e.target;
            let announcement = '';

            // Get element type and label
            if (element.tagName === 'BUTTON') {
                const text = element.textContent?.trim() || element.getAttribute('aria-label') || 'button';
                announcement = `Button: ${text}`;
            } else if (element.tagName === 'A') {
                const text = element.textContent?.trim() || element.getAttribute('aria-label') || 'link';
                announcement = `Link: ${text}`;
            } else if (element.tagName === 'INPUT') {
                const label = element.getAttribute('aria-label') || element.placeholder || element.name || 'input';
                const type = element.type || 'text';
                if (type === 'checkbox') {
                    announcement = `Checkbox: ${label}. ${element.checked ? 'Checked' : 'Not checked'}`;
                } else if (type === 'radio') {
                    announcement = `Radio button: ${label}. ${element.checked ? 'Selected' : 'Not selected'}`;
                } else {
                    announcement = `${type} input: ${label}`;
                }
            } else if (element.tagName === 'SELECT') {
                const label = element.getAttribute('aria-label') || 'dropdown';
                announcement = `Dropdown: ${label}. Value: ${element.options[element.selectedIndex]?.text || 'none'}`;
            } else if (element.getAttribute('role') === 'button') {
                const text = element.textContent?.trim() || element.getAttribute('aria-label') || 'button';
                announcement = `Button: ${text}`;
            } else if (element.getAttribute('role') === 'option') {
                const text = element.textContent?.trim() || 'option';
                announcement = text;
            }

            if (announcement) {
                speak(announcement);
            }
        };

        document.addEventListener('focusin', handleFocus);
        return () => document.removeEventListener('focusin', handleFocus);
    }, [screenReaderMode, speak]);

    // Welcome message when screen reader is enabled
    useEffect(() => {
        if (screenReaderMode && !hasAnnouncedRef.current) {
            hasAnnouncedRef.current = true;
            setTimeout(() => {
                const welcomeMsg = 'Welcome to CAO South Africa. Screen reader active. Press Alt H for keyboard shortcuts.';
                if (directSpeak) {
                    directSpeak(welcomeMsg);
                } else {
                    speak(welcomeMsg, 'high');
                }
                // Also announce current page after welcome
                setTimeout(() => {
                    announcePageChange(location.pathname, true);
                }, 2000);
            }, 500);
        }
    }, [screenReaderMode, speak, directSpeak, announcePageChange, location.pathname]);

    // This component doesn't render anything visible
    return null;
}

export default ScreenReader;
