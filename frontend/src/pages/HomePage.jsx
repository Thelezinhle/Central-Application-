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
        <div className="min-h-screen bg-white" role="main" aria-label="Home page">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                Your Path to <span className="text-[#228B22]">University Success</span>
                            </h2>
                            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                                International Central Application simplifies university admissions. Get smart recommendations, apply to multiple programmes, and track your progress in real-time.
                            </p>
                            <div className="flex gap-4 flex-wrap">
                                <Link 
                                    to="/universities" 
                                    className="bg-[#228B22] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#1a6b1a] transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                                    aria-label="Browse all universities"
                                >
                                    Browse Universities <FaArrowLeft className="rotate-180" />
                                </Link>
                                <Link 
                                    to="/colleges" 
                                    className="border-2 border-[#228B22] text-[#228B22] px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#228B22] hover:text-white transition inline-flex items-center gap-2"
                                    aria-label="Browse colleges"
                                >
                                    Colleges
                                </Link>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="order-1 lg:order-2">
                            <div className="rounded-2xl shadow-2xl overflow-hidden h-[500px]">
                                <img 
                                    src="/images/backgrounds/joshua-bg.jpg" 
                                    alt="Students with graduation caps"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextElementSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="bg-white h-[500px] flex items-center justify-center" style={{display: 'none'}}>
                                    <div className="text-center p-8">
                                        <div className="text-6xl mb-4">🎓</div>
                                        <p className="text-2xl font-bold text-gray-800">Image Loading...</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Why Choose ICA?</h2>
                        <p className="text-xl text-gray-700 max-w-2xl mx-auto">Everything you need for a smooth and successful university application journey</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-xl bg-gradient-to-br from-green-50 to-white border-2 border-green-200 hover:shadow-xl transition">
                            <div className="bg-[#228B22] text-white p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                                <FaRobot className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Recommendations</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Get AI-powered programme recommendations based on your qualifications and academic performance. Find the perfect course match instantly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <Link to="/track-status" className="p-8 rounded-xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:shadow-xl transition block cursor-pointer">
                            <div className="bg-[#228B22] text-white p-4 rounded-lg w-16 h-16 flex items-center justify-center mb-6">
                                <FaClipboardList className="text-3xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Track Your Progress</h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Real-time updates on your applications and admission decisions. Stay informed every step of the way and manage all your applications in one place.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* CTA Section with Image */}
            <div className="bg-[#228B22] text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Ready to Start Your University Journey?</h2>
                            <p className="text-xl mb-8 leading-relaxed">Apply to multiple programmes, get smart recommendations, and track your applications - all in one place.</p>
                            <Link 
                                to="/courses" 
                                className="bg-white text-[#228B22] px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                            >
                                Get Started Now <FaArrowLeft className="rotate-180" />
                            </Link>
                        </div>

                        {/* Right Image */}
                        <div>
                            <div className="rounded-2xl shadow-2xl overflow-hidden h-[400px]">
                                <img 
                                    src="/images/backgrounds/pang-yuhao-_kd5cxwZOK4-unsplash.jpg" 
                                    alt="Graduates celebrating"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
