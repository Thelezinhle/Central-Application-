import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function AdminDashboard() {
    const navigate = useNavigate();
    return (
        <div className="container py-12" role="main" aria-label="Admin dashboard page">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
                aria-label="Go to previous page"
            >
                <FaArrowLeft aria-hidden="true" /> Back
            </button>
            <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Applications</h3>
                    <p className="text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Universities</h3>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Revenue</h3>
                    <p className="text-3xl font-bold text-orange-600">R0</p>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
