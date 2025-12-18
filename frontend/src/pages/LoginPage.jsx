import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import useAuthStore from '../context/authStore';
import { useVoiceNarration } from '../hooks/useVoiceNarration';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { speak, voiceEnabled } = useVoiceNarration();

    // Announce page on load
    useEffect(() => {
        if (voiceEnabled) {
            speak('Login page. Enter your email and password to access the application.');
        }
    }, [voiceEnabled, speak]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login(data.email, data.password);
            toast.success('Login successful');
            if (voiceEnabled) {
                speak('Login successful. Redirecting to dashboard.');
            }
            navigate('/dashboard');
        } catch (error) {
            const errorMsg = error.message || 'Login failed';
            toast.error(errorMsg);
            if (voiceEnabled) {
                speak(`Login failed. ${errorMsg}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container py-20" role="main" aria-label="Login page">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded transition"
                aria-label="Go to previous page"
            >
                <FaArrowLeft aria-hidden="true" /> Back
            </button>
            <div className="max-w-md mx-auto card">
                <h1 className="text-3xl font-bold mb-6">Login to CAO</h1>
                <form onSubmit={handleSubmit(onSubmit)} aria-label="Login form">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            type="email"
                            className="input"
                            aria-required="true"
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && <span className="text-red-600" role="alert">{errors.email.message}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            className="input"
                            aria-required="true"
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />
                        {errors.password && <span className="text-red-600" role="alert">{errors.password.message}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">Don't have an account? <Link to="/register" className="text-green-700 font-bold hover:underline">Register here</Link></p>
            </div>
        </div>
    );
}

export default LoginPage;
