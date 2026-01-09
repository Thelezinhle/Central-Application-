import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ApplicationPage from './pages/ApplicationPage';
import UniversitiesPage from './pages/UniversitiesPage';
import CollegesPage from './pages/CollegesPage';
import AllInstitutionsPage from './pages/AllInstitutionsPage';
import CoursesPageV2 from './pages/CoursesPageV2';
import CAOCoursesPage from './pages/CAOCoursesPage';
import APSCalculatorV2 from './pages/APSCalculatorV2';
import RecommendationsPage from './pages/RecommendationsPage';
import TrackStatusPage from './pages/TrackStatusPage';
import AdminDashboard from './pages/AdminDashboard';
import useAuthStore from './context/authStore';
import AccessibilityProvider from './context/AccessibilityContext';
import { AccessibilityControls } from './components/AccessibilityControls';
import { LiveRegion } from './components/LiveRegion';
import { VoiceController } from './components/VoiceController';
import { BlindUserOnboarding } from './components/BlindUserOnboarding';
import VoiceAssistant from './components/VoiceAssistant';
import ProductionVoiceWidget from './components/ProductionVoiceWidget';

function App() {
    const { user } = useAuthStore();
    const [liveMessage, setLiveMessage] = React.useState('');
    const [blindUserSetupComplete, setBlindUserSetupComplete] = React.useState(null);
    const [blindUserMode, setBlindUserMode] = React.useState(false);
    const [showAccessibilityControls, setShowAccessibilityControls] = React.useState(false);

    // Check if blind user setup has been completed
    React.useEffect(() => {
        const setupCompleted = localStorage.getItem('blindUserSetupCompleted');
        if (setupCompleted) {
            const blindMode = localStorage.getItem('blindUserMode') === 'true';
            setBlindUserSetupComplete(true);
            setBlindUserMode(blindMode);
        } else {
            // Show onboarding on first visit
            setBlindUserSetupComplete(false);
        }
    }, []);

    // Listen for keyboard shortcut to toggle accessibility controls
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // Alt + Shift + A to toggle accessibility controls
            if (e.altKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                setShowAccessibilityControls(!showAccessibilityControls);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showAccessibilityControls]);

    const handleBlindUserSetup = (isBlind) => {
        setBlindUserMode(isBlind);
        setBlindUserSetupComplete(true);
        localStorage.setItem('blindUserSetupCompleted', 'true');
        localStorage.setItem('blindUserMode', isBlind ? 'true' : 'false');
    };

    return (
        <AccessibilityProvider>
            {blindUserSetupComplete === null ? (
                <BlindUserOnboarding onComplete={handleBlindUserSetup} />
            ) : null}

            <LiveRegion message={liveMessage} />

            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main id="main-content" className="min-h-screen">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
                        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
                        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
                        <Route path="/application/:id" element={user ? <ApplicationPage /> : <Navigate to="/login" />} />
                        <Route path="/all-institutions" element={<AllInstitutionsPage />} />
                        <Route path="/universities" element={<UniversitiesPage />} />
                        <Route path="/colleges" element={<CollegesPage />} />
                        <Route path="/courses" element={<CoursesPageV2 />} />
                        <Route path="/cao-programmes" element={<CAOCoursesPage />} />
                        <Route path="/aps-calculator" element={<APSCalculatorV2 />} />
                        <Route path="/recommendations" element={<RecommendationsPage />} />
                        <Route path="/track-status" element={<TrackStatusPage />} />
                        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
                    </Routes>
                </main>

                {/* Accessibility Controls - Only show when toggled, hidden by default */}
                {showAccessibilityControls && <AccessibilityControls />}
                
                {/* Accessibility Toggle Button - Always visible for easy access */}
                <button
                    onClick={() => setShowAccessibilityControls(!showAccessibilityControls)}
                    className="fixed bottom-4 right-4 bg-[#228B22] text-white p-3 rounded-full shadow-lg hover:bg-[#1a6b1a] z-40 transition-all duration-200"
                    title="Toggle accessibility settings (Alt+Shift+A)"
                    aria-label="Toggle accessibility controls"
                >
                    ♿
                </button>

                <ProductionVoiceWidget />
                {blindUserMode && <VoiceController />}
                <VoiceAssistant />
            </div>
        </AccessibilityProvider>
    );
}

export default App;
