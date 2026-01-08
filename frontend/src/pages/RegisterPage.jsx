import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';

function RegisterPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const password = watch('password');

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    idNumber: data.idNumber,
                    password: data.password,
                    confirmPassword: data.confirmPassword
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Registration failed');
            }

            localStorage.setItem('token', result.token);
            toast.success('Registration successful');
            navigate('/dashboard');
        } catch (error) {
            console.error('Registration error:', error);
            toast.error(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#228B22] py-20 flex items-center justify-center" role="main" aria-label="User registration page">
            <div className="w-full max-w-md px-4">
                <button
                    onClick={() => navigate(-1)}  
                    className="flex items-center gap-2 mb-4 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
                <div className="card">
                    <h1 className="text-3xl font-bold mb-6">Register for ICA</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input
                                    {...register('firstName', { required: 'First name is required' })}
                                    className="input"
                                />
                                {errors.firstName && <span className="text-red-600 text-sm">{errors.firstName.message}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input
                                    {...register('lastName', { required: 'Last name is required' })}
                                    className="input"
                                />
                                {errors.lastName && <span className="text-red-600 text-sm">{errors.lastName.message}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                {...register('email', { required: 'Email is required' })}
                                type="email"
                                className="input"
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Phone</label>
                            <input
                                {...register('phone', { required: 'Phone is required' })}
                                className="input"
                            />
                            {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">ID Number</label>
                            <input
                                {...register('idNumber', { required: 'ID number is required' })}
                                className="input"
                            />
                            {errors.idNumber && <span className="text-red-600">{errors.idNumber.message}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                                type="password"
                                className="input"
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                {...register('confirmPassword', { validate: (value) => value === password || 'Passwords do not match' })}
                                type="password"
                                className="input"
                            />
                            {errors.confirmPassword && <span className="text-red-600">{errors.confirmPassword.message}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full"
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>
                    <p className="mt-4 text-center text-gray-600">Already have an account? <Link to="/login" className="text-green-700 font-bold hover:underline">Login here</Link></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
