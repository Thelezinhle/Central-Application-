import React, { useState } from 'react';
import { mockCourses, mockUniversities } from '../data/mockData';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaDownload, FaCopy, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthStore from '../context/authStore';

function RecommendationsPage() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const [formData, setFormData] = useState({
        totalAPS: '',
        englishAPS: '',
        mathAPS: '',
        preferredFields: [],
        province: '',
        uploadedFile: null
    });
    const [recommendations, setRecommendations] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [selectedRecommendations, setSelectedRecommendations] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // In a real app, you'd send this to the backend for OCR processing
            setFormData({ ...formData, uploadedFile: file.name });
            alert('File uploaded! In a real app, AI would extract your APS scores from the matric results.');
        }
    };

    const toggleRecommendationSelection = (courseId) => {
        if (selectedRecommendations.includes(courseId)) {
            setSelectedRecommendations(selectedRecommendations.filter(id => id !== courseId));
        } else if (selectedRecommendations.length < 10) {
            setSelectedRecommendations([...selectedRecommendations, courseId]);
        }
    };

    const applyToRecommended = () => {
        if (selectedRecommendations.length === 0) {
            alert('Please select at least one course');
            return;
        }
        if (!user) {
            alert('Please login to apply');
            navigate('/login');
            return;
        }
        localStorage.setItem('selectedCourses', JSON.stringify(selectedRecommendations));
        navigate('/application/multi');
    };

    const getRecommendations = () => {
        const totalAPS = parseInt(formData.totalAPS) || 0;
        const englishAPS = parseInt(formData.englishAPS) || 0;
        const mathAPS = parseInt(formData.mathAPS) || 0;

        // Filter courses based on province first if selected
        let coursesToCheck = mockCourses;
        if (formData.province) {
            const universitiesInProvince = mockUniversities
                .filter(u => u.province === formData.province)
                .map(u => u._id);
            coursesToCheck = mockCourses.filter(course => 
                universitiesInProvince.includes(course.university)
            );
        }

        // Filter courses based on APS requirements
        const eligible = coursesToCheck.filter(course => {
            return (
                totalAPS >= (course.aps?.minimumAPS || 20) &&
                englishAPS >= (course.aps?.englishAPS || 2) &&
                mathAPS >= (course.aps?.mathAPS || 2)
            );
        });

        // Categorize courses
        const excellent = eligible.filter(c => totalAPS >= (c.aps?.minimumAPS || 20) + 5);
        const good = eligible.filter(c =>
            totalAPS >= (c.aps?.minimumAPS || 20) &&
            totalAPS < ((c.aps?.minimumAPS || 20) + 5)
        );
        const borderline = coursesToCheck.filter(c =>
            totalAPS >= ((c.aps?.minimumAPS || 20) - 3) &&
            totalAPS < (c.aps?.minimumAPS || 20)
        );

        setRecommendations({
            excellent,
            good,
            borderline,
            totalAPS,
            englishAPS,
            mathAPS,
            province: formData.province
        });
        setSubmitted(true);
    };

    const CourseRecommendation = ({ course, status }) => {
        const uni = mockUniversities.find(u => u._id === course.university);
        const isSelected = selectedRecommendations.includes(course._id);

        const statusConfig = {
            eligible: { icon: FaCheckCircle, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-300', label: 'ELIGIBLE' },
            caution: { icon: FaExclamationTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-300', label: 'BORDERLINE' },
            notEligible: { icon: FaTimesCircle, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-300', label: 'NOT ELIGIBLE' }
        };

        const config = statusConfig[status];

        return (
            <div className={`${config.bg} p-4 rounded-lg border-2 ${config.border} mb-4 transition-all ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}>
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <config.icon className={config.color} size={20} />
                            <h4 className="font-bold text-gray-900">{course.name}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded ${config.color} bg-white`}>
                                {config.label}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600"><strong>University:</strong> {uni?.name}</p>
                        <p className="text-sm text-gray-600"><strong>Code:</strong> {course.code} | <strong>Level:</strong> {course.level} | <strong>Duration:</strong> {course.duration}</p>

                        <div className="mt-3 p-3 bg-white rounded border-l-4 border-blue-600 text-sm space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-gray-700">Required APS:</p>
                                    <p><strong>Min:</strong> {course.aps?.minimumAPS} | <strong>Math:</strong> {course.aps?.mathAPS} | <strong>Eng:</strong> {course.aps?.englishAPS}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-700">Your APS:</p>
                                    <p><strong>Total:</strong> {recommendations.totalAPS} | <strong>Math:</strong> {recommendations.mathAPS} | <strong>Eng:</strong> {recommendations.englishAPS}</p>
                                </div>
                            </div>
                            <p className={`text-sm font-bold ${recommendations.totalAPS >= (course.aps?.minimumAPS || 20) ? 'text-green-700' : 'text-orange-700'}`}>
                                <strong>Gap:</strong> {
                                    recommendations.totalAPS >= (course.aps?.minimumAPS || 20)
                                        ? `${recommendations.totalAPS - (course.aps?.minimumAPS || 20)} points above requirement`
                                        : `${(course.aps?.minimumAPS || 20) - recommendations.totalAPS} points below requirement`
                                }
                            </p>
                        </div>

                        <p className="text-sm text-gray-600 mt-2"><strong>Fee:</strong> R{course.tuitionFee?.toLocaleString()}/year</p>
                    </div>
                    <div className="ml-4">
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleRecommendationSelection(course._id)}
                            className="w-6 h-6 cursor-pointer"
                        />
                    </div>
                </div>
                {status !== 'notEligible' && (
                    <button
                        onClick={() => toggleRecommendationSelection(course._id)}
                        className={`w-full mt-3 font-bold py-2 px-4 rounded transition-all ${isSelected
                            ? 'bg-green-700 text-white hover:bg-green-800'
                            : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                    >
                        {isSelected ? 'Selected' : 'Select Course'}
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#228B22] py-12" role="main" aria-label="Smart course recommendations page">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
                <h1 className="text-4xl font-bold mb-2 text-white">Smart Recommendations</h1>
                <p className="text-white mb-8">Upload your matric results or enter your APS scores to get AI-powered course recommendations</p>

            {!submitted ? (
                <div className="max-w-2xl mx-auto card">
                    <h2 className="text-2xl font-bold mb-6">Get Smart Recommendations</h2>
                    <p className="text-gray-600 mb-6">Enter your APS scores or upload your matric results certificate. We'll analyze your qualifications and recommend courses you're eligible for.</p>

                    <div className="space-y-4 mb-6">
                        {/* File Upload */}
                        <div className="border-2 border-dashed border-green-300 p-6 rounded bg-white">
                            <label className="form-label">Upload Matric Results (Optional)</label>
                            <div className="mt-2">
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleFileUpload}
                                    className="block w-full text-sm text-gray-600"
                                />
                                <p className="text-xs text-gray-500 mt-2">Supported: PDF, JPG, PNG (We'll use AI to extract your APS scores)</p>
                                {formData.uploadedFile && (
                                    <p className="text-xs text-green-600 mt-2">File uploaded: {formData.uploadedFile}</p>
                                )}
                            </div>
                        </div>

                        <div className="text-center text-gray-500 font-bold">OR</div>

                        {/* Manual Entry */}
                        <div>
                            <label className="form-label">Total APS Score</label>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="number"
                                    name="totalAPS"
                                    min="0"
                                    max="100"
                                    placeholder="e.g., 45"
                                    className="input"
                                    value={formData.totalAPS}
                                    onChange={handleInputChange}
                                />
                                <span className="text-sm text-gray-600 whitespace-nowrap">out of 100</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Combined APS from all subjects</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Mathematics APS</label>
                                <input
                                    type="number"
                                    name="mathAPS"
                                    min="0"
                                    max="7"
                                    placeholder="0-7"
                                    className="input"
                                    value={formData.mathAPS}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label className="form-label">English APS</label>
                                <input
                                    type="number"
                                    name="englishAPS"
                                    min="0"
                                    max="7"
                                    placeholder="0-7"
                                    className="input"
                                    value={formData.englishAPS}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Preferred Province (Optional)</label>
                            <select
                                name="province"
                                className="input"
                                style={{backgroundColor: 'white', color: 'black'}}
                                value={formData.province}
                                onChange={handleInputChange}
                            >
                                <option value="" style={{backgroundColor: 'white', color: 'black'}}>All Provinces</option>
                                <option value="Gauteng" style={{backgroundColor: 'white', color: 'black'}}>Gauteng</option>
                                <option value="Western Cape" style={{backgroundColor: 'white', color: 'black'}}>Western Cape</option>
                                <option value="KwaZulu-Natal" style={{backgroundColor: 'white', color: 'black'}}>KwaZulu-Natal</option>
                                <option value="Eastern Cape" style={{backgroundColor: 'white', color: 'black'}}>Eastern Cape</option>
                                <option value="Free State" style={{backgroundColor: 'white', color: 'black'}}>Free State</option>
                                <option value="Limpopo" style={{backgroundColor: 'white', color: 'black'}}>Limpopo</option>
                                <option value="Mpumalanga" style={{backgroundColor: 'white', color: 'black'}}>Mpumalanga</option>
                                <option value="North West" style={{backgroundColor: 'white', color: 'black'}}>North West</option>
                                <option value="Northern Cape" style={{backgroundColor: 'white', color: 'black'}}>Northern Cape</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={getRecommendations}
                        className="btn-primary w-full"
                        disabled={!formData.totalAPS || !formData.englishAPS || !formData.mathAPS}
                    >
                        Get Smart Recommendations
                    </button>
                </div>
            ) : (
                <>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-gradient-to-r from-white to-green-50 p-4 rounded-lg mb-6 border-2 border-green-700">
                            <p className="text-sm font-bold text-gray-900"><strong>Your APS Scores:</strong> Total <span className="text-green-700 text-lg">{recommendations.totalAPS}</span> | Math <span className="text-green-700">{recommendations.mathAPS}</span> | English <span className="text-green-700">{recommendations.englishAPS}</span></p>
                            {recommendations.province && (
                                <p className="text-sm font-bold text-blue-700 mt-1">
                                    📍 Showing courses from: <span className="text-blue-800">{recommendations.province}</span>
                                </p>
                            )}
                            <button
                                onClick={() => setSubmitted(false)}
                                className="text-green-700 hover:underline text-sm mt-2 font-bold"
                            >
                                Change scores
                            </button>
                        </div>

                        {selectedRecommendations.length > 0 && (
                            <div className="bg-green-50 border-2 border-green-500 p-4 rounded-lg mb-6">
                                <p className="text-sm font-bold text-gray-900">Selected: {selectedRecommendations.length}/10 courses</p>
                                <button
                                    onClick={applyToRecommended}
                                    className="btn-primary mt-2"
                                >
                                    Apply to Selected Recommendations →
                                </button>
                            </div>
                        )}

                        {/* Excellent Matches */}
                        {recommendations.excellent.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-green-700 mb-4">
                                    🎯 Excellent Matches ({recommendations.excellent.length})
                                </h2>
                                <p className="text-gray-600 mb-4">You significantly exceed the requirements for these courses. These are your safest bets!</p>
                                {recommendations.excellent.map(course => (
                                    <CourseRecommendation key={course._id} course={course} status="eligible" />
                                ))}
                            </div>
                        )}

                        {/* Good Matches */}
                        {recommendations.good.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-green-700 mb-4">
                                    Good Matches ({recommendations.good.length})
                                </h2>
                                <p className="text-gray-600 mb-4">You meet the exact requirements for these courses. Strong options!</p>
                                {recommendations.good.map(course => (
                                    <CourseRecommendation key={course._id} course={course} status="eligible" />
                                ))}
                            </div>
                        )}

                        {/* Borderline */}
                        {recommendations.borderline.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-yellow-700 mb-4">
                                    ⚠️ Borderline Options ({recommendations.borderline.length})
                                </h2>
                                <p className="text-gray-600 mb-4">You're slightly below the minimum but may still be considered. Contact the university for more information. ⚠️</p>
                                {recommendations.borderline.map(course => (
                                    <CourseRecommendation key={course._id} course={course} status="caution" />
                                ))}
                            </div>
                        )}

                        {recommendations.excellent.length === 0 && recommendations.good.length === 0 && recommendations.borderline.length === 0 && (
                            <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300 text-center">
                                <p className="text-red-700 font-bold mb-2">❌ No Matching Courses Found</p>
                                <p className="text-red-600 mb-4">Your APS scores don't currently meet the requirements for any available courses.</p>
                                <p className="text-gray-700 mb-4"><strong>What you can do:</strong></p>
                                <ul className="text-gray-600 text-left max-w-md mx-auto space-y-2 mb-4">
                                    <li>• Retake subjects to improve your APS scores</li>
                                    <li>• Consider alternative qualification programs</li>
                                    <li>• Contact universities about bridging programs</li>
                                </ul>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="btn-primary"
                                >
                                    Try Different Scores
                                </button>
                            </div>
                        )}

                        <div className="mt-8 flex gap-4 max-w-4xl mx-auto">
                            <button
                                onClick={() => setSubmitted(false)}
                                className="flex-1 btn-secondary"
                                aria-label="Go back to form"
                            >
                                ← Try Different Scores
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="flex-1 btn-primary"
                                aria-label="Go back to previous page"
                            >
                                Back to Home
                            </button>
                        </div>
                    </div>
                </>
            )}
            </div>
        </div>
    );
}

export default RecommendationsPage;
