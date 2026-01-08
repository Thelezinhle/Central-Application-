import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ApplicationPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#228B22] py-12" role="main" aria-label="Application submission page">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
                <h1 className="text-4xl font-bold mb-8 text-white">My Application</h1>
            <div className="card">
                <p>Application details coming soon...</p>
            </div>
            </div>
        </div>
    );
}

export default ApplicationPage;
