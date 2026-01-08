import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook, FaCheckCircle, FaRobot, FaClipboardList, FaArrowLeft } from 'react-icons/fa';
import { useVoiceNarration } from '../hooks/useVoiceNarration';

function HomePage() {
    const navigate = useNavigate();
    const { speak, voiceEnabled } = useVoiceNarration();

    // Announce page on load
    useEffect(() => {
        if (voiceEnabled) {
            speak('Welcome to International Central Application. Simplified university admissions with clear entry requirements and course listings. Browse courses, get recommendations, track your application status.');
        }
    }, [voiceEnabled, speak]);
    return (
        <div className="bg-gradient-to-br from-[#228B22] to-[#1a6b1a] text-white py-20" role="main" aria-label="Home page">
            <div className="container">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded transition"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
                <div className="max-w-3xl">
                    <h1 className="text-5xl font-bold mb-4">International Central Application (ICA)</h1>
                    <p className="text-xl mb-8">
                        Simplified university admissions with clear entry requirements, course listings, and real-time updates.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/courses" className="btn-primary" aria-label="Browse all available courses">Browse Courses</Link>
                        <Link to="/recommendations" className="btn-secondary" aria-label="Get AI-powered course recommendations">Get Recommendations</Link>
                    </div>
                </div>
            </div>

            <div className="container mt-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <Link to="/courses" className="card text-gray-900 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                        <FaBook className="text-3xl mb-4 text-[#228B22]" />
                        <h3 className="text-lg font-bold mb-2">Browse Courses</h3>
                        <p className="text-sm">View all available courses with clear entry requirements and APS scores</p>
                    </Link>
                    <Link to="/courses" className="card text-gray-900 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                        <FaCheckCircle className="text-3xl mb-4 text-[#228B22]" />
                        <h3 className="text-lg font-bold mb-2">Multiple Selections</h3>
                        <p className="text-sm">Apply to up to 10 universities and programmes in one application</p>
                    </Link>
                    <Link to="/recommendations" className="card text-gray-900 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                        <FaRobot className="text-3xl mb-4 text-[#228B22]" />
                        <h3 className="text-lg font-bold mb-2">Smart Recommendations</h3>
                        <p className="text-sm">Get AI-powered programme recommendations based on your qualifications</p>
                    </Link>
                    <Link to="/track-status" className="card text-gray-900 hover:shadow-lg hover:-translate-y-1 transition cursor-pointer">
                        <FaClipboardList className="text-3xl mb-4 text-[#228B22]" />
                        <h3 className="text-lg font-bold mb-2">Track Status</h3>
                        <p className="text-sm">Real-time updates on your applications and admission decisions</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
