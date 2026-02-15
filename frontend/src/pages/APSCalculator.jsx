import React, { useState } from 'react';
import { FaCalculator, FaPlus, FaTrash } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

function APSCalculator() {
    const [subjects, setSubjects] = useState([
        { name: 'Mathematics', percentage: '', level: 'HL' },
        { name: 'English', percentage: '', level: 'HL' },
        { name: '', percentage: '', level: 'other' }
    ]);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const addSubject = () => {
        setSubjects([...subjects, { name: '', percentage: '', level: 'other' }]);
    };

    const removeSubject = (index) => {
        setSubjects(subjects.filter((_, i) => i !== index));
    };

    const updateSubject = (index, field, value) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = value;
        setSubjects(newSubjects);
    };

    const calculateAPS = async () => {
        try {
            setLoading(true);
            const validSubjects = subjects.filter(s => s.name && s.percentage);

            if (validSubjects.length === 0) {
                alert('Please add at least one subject with a percentage');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/courses/aps/calculate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ subjects: validSubjects })
            });

            const data = await response.json();
            if (data.success) {
                setResult(data);
            } else {
                alert('Error calculating APS: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error calculating APS');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#228B22] py-8">
            <div className="max-w-3xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <FaCalculator className="text-3xl text-white" />
                        <h1 className="text-4xl font-bold text-white">APS Calculator</h1>
                    </div>
                    <p className="text-white">
                        Calculate your Admission Points Score (APS) based on your matric subjects and percentages.
                    </p>
                </div>

                {/* Calculator Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="space-y-4 mb-6">
                        {subjects.map((subject, index) => (
                            <div key={index} className="flex gap-3 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Mathematics, English"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22]"
                                        value={subject.name}
                                        onChange={(e) => updateSubject(index, 'name', e.target.value)}
                                    />
                                </div>
                                <div className="w-24">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Percentage
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="%"
                                        min="0"
                                        max="100"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22]"
                                        value={subject.percentage}
                                        onChange={(e) => updateSubject(index, 'percentage', e.target.value)}
                                    />
                                </div>
                                <div className="w-28">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Level
                                    </label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#228B22]"
                                        value={subject.level}
                                        onChange={(e) => updateSubject(index, 'level', e.target.value)}
                                    >
                                        <option value="HL">Home Language</option>
                                        <option value="SL">1st Additional</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <button
                                    onClick={() => removeSubject(index)}
                                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Remove subject"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={addSubject}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                        >
                            <FaPlus /> Add Subject
                        </button>
                        <button
                            onClick={calculateAPS}
                            disabled={loading}
                            className="flex-1 px-6 py-2 bg-[#228B22] text-white rounded-lg hover:bg-[#1a6b1a] transition disabled:bg-gray-400 font-semibold"
                        >
                            {loading ? 'Calculating...' : 'Calculate APS'}
                        </button>
                    </div>
                </div>

                {/* Results */}
                {result && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8">
                        {/* APS Score */}
                        <div className="mb-8 text-center">
                            <h2 className="text-xl text-green-700 font-semibold mb-2">Your APS Score</h2>
                            <div className="text-6xl font-bold text-[#228B22]">{result.totalAPS}</div>
                            <p className="text-green-700 mt-4 text-lg font-semibold">{result.interpretation}</p>
                        </div>

                        {/* Subject Breakdown */}
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Subject Breakdown</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {result.subjectDetails.map((subject, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg border border-green-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-gray-900">{subject.subject}</p>
                                                <p className="text-sm text-gray-600">
                                                    {subject.percentage}% ({subject.level})
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-[#228B22]">{subject.points}</p>
                                                <p className="text-xs text-gray-500">points</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Possible Courses */}
                        {result.possibleCourses && result.possibleCourses.length > 0 && (
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    Courses You Can Apply For ({result.possibleCourses.length})
                                </h3>
                                <div className="space-y-3">
                                    {result.possibleCourses.map((course, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg border border-green-100">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-semibold text-gray-900">{course.name}</p>
                                                    <p className="text-sm text-gray-600">{course.university}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-[#228B22]">
                                                        Min APS: {course.minAPS}
                                                    </p>
                                                    <p className="text-xs text-green-600">{course.matchLevel}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default APSCalculator;
