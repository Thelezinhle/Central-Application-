import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';

/**
 * BeginnerGuide Component
 * Shows first-time users exactly what to do
 * Can be collapsed by returning users
 */
function BeginnerGuide() {
    const [isExpanded, setIsExpanded] = useState(true);

    if (!isExpanded) {
        return (
            <button
                onClick={() => setIsExpanded(true)}
                className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
                title="Show help"
                aria-label="Show beginner guide"
            >
                <FaQuestionCircle size={24} />
            </button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-2xl w-96 max-w-sm z-50 border-2 border-blue-500">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FaLightbulb size={20} />
                    <h3 className="font-bold text-lg">Need Help? 👇</h3>
                </div>
                <button
                    onClick={() => setIsExpanded(false)}
                    className="text-white hover:bg-blue-700 p-1 rounded transition"
                    aria-label="Close guide"
                >
                    <FaChevronDown size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                <div className="space-y-3">
                    {/* Step 1 */}
                    <div className="border-l-4 border-blue-600 pl-4 py-2 bg-blue-50 rounded-r">
                        <p className="font-bold text-gray-900">📍 Step 1: Search</p>
                        <p className="text-sm text-gray-700 mt-1">
                            Type the name of a school (example: UNIZULU, Wits, False Bay)
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="border-l-4 border-green-600 pl-4 py-2 bg-green-50 rounded-r">
                        <p className="font-bold text-gray-900">🎯 Step 2: Choose Type</p>
                        <p className="text-sm text-gray-700 mt-1">
                            Pick a school type or leave as "All Types"
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="border-l-4 border-purple-600 pl-4 py-2 bg-purple-50 rounded-r">
                        <p className="font-bold text-gray-900">✅ Step 3: Apply</p>
                        <p className="text-sm text-gray-700 mt-1">
                            Click the green "Apply Now" button
                        </p>
                    </div>

                    {/* FAQ */}
                    <div className="border-t-2 pt-4 mt-4">
                        <p className="font-bold text-gray-900 mb-3">❓ Common Questions</p>
                        
                        <details className="space-y-2 text-sm">
                            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600">
                                What's a TVET College?
                            </summary>
                            <p className="text-gray-700 ml-4 mt-2">
                                🔧 Training colleges that teach hands-on skills like plumbing, nursing, electrician work, etc.
                            </p>
                        </details>

                        <details className="space-y-2 text-sm mt-3">
                            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600">
                                What's CAO?
                            </summary>
                            <p className="text-gray-700 ml-4 mt-2">
                                🎓 One application that works for many schools. You pick your top choices.
                            </p>
                        </details>

                        <details className="space-y-2 text-sm mt-3">
                            <summary className="font-semibold text-gray-800 cursor-pointer hover:text-blue-600">
                                Can I apply to multiple schools?
                            </summary>
                            <p className="text-gray-700 ml-4 mt-2">
                                ✅ Yes! You can apply to many schools. Try different ones to find the best fit.
                            </p>
                        </details>
                    </div>

                    {/* Tips */}
                    <div className="border-t-2 pt-4 mt-4 bg-yellow-50 p-3 rounded">
                        <p className="font-bold text-gray-900 mb-2">💡 Pro Tips</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>✓ Start by searching for a school name</li>
                            <li>✓ Check if it's government approved (✓ CHE, DHET)</li>
                            <li>✓ Find the school nearest to you</li>
                            <li>✓ Click "Website" to learn more</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t text-sm text-gray-600">
                <p>💬 Still stuck? Ask a parent, teacher, or friend!</p>
            </div>
        </div>
    );
}

export default BeginnerGuide;
