import React from 'react';

/**
 * AccessibleFormField Component
 * Wrapper for form inputs with proper ARIA labels, error handling, and help text
 * Ensures compliance with WCAG accessibility standards
 */
export function AccessibleFormField({
    id,
    label,
    error,
    helpText,
    required = false,
    children,
    type = 'text'
}) {
    const errorId = error ? `${id}-error` : null;
    const helpId = helpText && !error ? `${id}-help` : null;
    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
                {required && (
                    <>
                        <span className="text-red-600 ml-1" aria-hidden="true">*</span>
                        <span className="sr-only">(required)</span>
                    </>
                )}
            </label>

            {React.cloneElement(children, {
                id,
                'aria-required': required ? 'true' : undefined,
                'aria-invalid': error ? 'true' : 'false',
                'aria-describedby': describedBy,
                className: `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'
                    } ${children.props.className || ''}`
            })}

            {helpText && !error && (
                <p id={helpId} className="mt-1 text-sm text-gray-500">
                    {helpText}
                </p>
            )}

            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-1 text-sm text-red-600 font-medium"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

/**
 * AccessibleSelect Component
 * Accessible dropdown/select input
 */
export function AccessibleSelect({
    id,
    label,
    options,
    value,
    onChange,
    error,
    helpText,
    required = false,
    ariaLabel
}) {
    const errorId = error ? `${id}-error` : null;
    const helpId = helpText && !error ? `${id}-help` : null;
    const describedBy = [errorId, helpId].filter(Boolean).join(' ') || undefined;

    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700 mb-1"
            >
                {label}
                {required && <span className="sr-only">(required)</span>}
            </label>

            <select
                id={id}
                value={value}
                onChange={onChange}
                aria-required={required}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={describedBy}
                aria-label={ariaLabel}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            >
                <option value="">Select an option</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {helpText && !error && (
                <p id={helpId} className="mt-1 text-sm text-gray-500">
                    {helpText}
                </p>
            )}

            {error && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-1 text-sm text-red-600 font-medium"
                >
                    {error}
                </p>
            )}
        </div>
    );
}

/**
 * AccessibleCheckbox Component
 * Accessible checkbox with proper labeling
 */
export function AccessibleCheckbox({
    id,
    label,
    checked,
    onChange,
    helpText,
    required = false,
    disabled = false
}) {
    const helpId = helpText ? `${id}-help` : null;

    return (
        <div className="mb-4">
            <div className="flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    aria-required={required}
                    aria-describedby={helpId}
                    className="w-4 h-4 text-green-700 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-green-600 cursor-pointer"
                />
                <label
                    htmlFor={id}
                    className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                >
                    {label}
                </label>
            </div>

            {helpText && (
                <p id={helpId} className="mt-1 text-sm text-gray-500 ml-6">
                    {helpText}
                </p>
            )}
        </div>
    );
}

export default AccessibleFormField;
