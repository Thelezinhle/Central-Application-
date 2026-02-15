import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

/**
 * Custom dropdown component that always drops DOWN
 * Replaces native <select> for better control over positioning
 */
function CustomSelectDropdown({ 
    value, 
    onChange, 
    options, 
    placeholder = "Select...",
    className = "",
    disabled = false 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, []);

    const selectedOption = options.find(opt => opt.value === value);
    const selectedLabel = selectedOption?.label || placeholder;

    const handleSelect = (optionValue) => {
        onChange({ target: { value: optionValue } });
        setIsOpen(false);
    };

    return (
        <div 
            ref={containerRef}
            className={`relative w-full ${className}`}
            style={{ zIndex: isOpen ? 50 : 'auto' }}
        >
            {/* Button/Display */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={disabled}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black text-left flex items-center justify-between hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <span className="truncate">{selectedLabel}</span>
                <FaChevronDown 
                    className={`text-gray-600 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    size={12}
                />
            </button>

            {/* Dropdown Menu - Always drops DOWN */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
                    style={{
                        top: '100%',
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors text-black ${
                                value === option.value 
                                    ? 'bg-blue-100 font-semibold text-blue-700' 
                                    : ''
                            }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelectDropdown;
