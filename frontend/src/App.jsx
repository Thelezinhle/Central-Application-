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
import CoursesPageV2 from './pages/CoursesPageV2';
import APSCalculator from './pages/APSCalculator';
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
                        <Route path="/universities" element={<UniversitiesPage />} />
                        <Route path="/colleges" element={<CollegesPage />} />
                        <Route path="/courses" element={<CoursesPageV2 />} />
                        <Route path="/aps-calculator" element={<APSCalculator />} />
                        <Route path="/recommendations" element={<RecommendationsPage />} />
                        <Route path="/track-status" element={<TrackStatusPage />} />
                        <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
                    </Routes>
                </main>

                <AccessibilityControls />
                <ProductionVoiceWidget />
                {blindUserMode && <VoiceController />}
                <VoiceAssistant />
            </div>
        </AccessibilityProvider>
    );
}

export default App;
