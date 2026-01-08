import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function DashboardPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#228B22] py-12" role="main" aria-label="User dashboard page">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
                <h1 className="text-4xl font-bold mb-8 text-white">My Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Applications</h3>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Pending Review</h3>
                    <p className="text-3xl font-bold text-yellow-600">0</p>
                </div>
                <div className="card">
                    <h3 className="text-lg font-bold mb-2">Accepted</h3>
                    <p className="text-3xl font-bold text-green-600">0</p>
                </div>
            </div>
            </div>
        </div>
    );
}

export default DashboardPage;
