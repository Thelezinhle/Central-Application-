import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

function CollegeComparisonModal({ colleges, isOpen, onClose }) {
    const [selectedColleges, setSelectedColleges] = useState(colleges.slice(0, 2));

    if (!isOpen) return null;

    // Get all unique features to compare
    const features = [
        { key: 'type', label: 'Institution Type' },
        { key: 'category', label: 'Category' },
        { key: 'location', label: 'Location' },
        { key: 'campuses', label: 'Number of Campuses' },
        { key: 'accreditation', label: 'Accreditation' },
        { key: 'website', label: 'Has Website' }
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Compare Colleges</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* College Selection */}
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Select colleges to compare (up to 3)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {colleges.map((college) => (
                                <button
                                    key={college.id}
                                    onClick={() => {
                                        if (selectedColleges.find(c => c.id === college.id)) {
                                            setSelectedColleges(selectedColleges.filter(c => c.id !== college.id));
                                        } else if (selectedColleges.length < 3) {
                                            setSelectedColleges([...selectedColleges, college]);
                                        }
                                    }}
                                    className={`p-4 rounded-lg border-2 transition text-left ${
                                        selectedColleges.find(c => c.id === college.id)
                                            ? 'border-purple-600 bg-purple-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                    } ${selectedColleges.length === 3 && !selectedColleges.find(c => c.id === college.id) ? 'opacity-50' : ''}`}
                                    disabled={selectedColleges.length === 3 && !selectedColleges.find(c => c.id === college.id)}
                                >
                                    <p className="font-bold text-gray-900">{college.name}</p>
                                    <p className="text-sm text-gray-600">{college.location}</p>
                                    {selectedColleges.find(c => c.id === college.id) && (
                                        <Check className="inline-block mt-2 text-purple-600" size={20} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Comparison Table */}
                    {selectedColleges.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-4 text-left font-bold text-gray-900 w-48">
                                            Features
                                        </th>
                                        {selectedColleges.map((college) => (
                                            <th
                                                key={college.id}
                                                className="border border-gray-300 p-4 text-center font-bold text-gray-900 min-w-40 bg-gradient-to-b from-purple-50 to-blue-50"
                                            >
                                                {college.name}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {features.map((feature) => (
                                        <tr key={feature.key} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 p-4 font-medium text-gray-900 bg-gray-50">
                                                {feature.label}
                                            </td>
                                            {selectedColleges.map((college) => (
                                                <td
                                                    key={`${college.id}-${feature.key}`}
                                                    className="border border-gray-300 p-4 text-center text-gray-600"
                                                >
                                                    {feature.key === 'campuses'
                                                        ? college.campuses?.length || 1
                                                        : feature.key === 'website'
                                                        ? college.website ? (
                                                            <a
                                                                href={college.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline"
                                                            >
                                                                Visit
                                                            </a>
                                                        ) : (
                                                            'No'
                                                        )
                                                        : college[feature.key] || 'N/A'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {selectedColleges.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">Select at least one college to compare</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CollegeComparisonModal;
