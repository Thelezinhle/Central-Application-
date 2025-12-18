import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function ApplicationPage() {
    const navigate = useNavigate();
    return (
        <div className="container py-12" role="main" aria-label="Application submission page">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
                aria-label="Go to previous page"
            >
                <FaArrowLeft aria-hidden="true" /> Back
            </button>
            <h1 className="text-4xl font-bold mb-8">My Application</h1>
            <div className="card">
                <p>Application details coming soon...</p>
            </div>
        </div>
    );
}

export default ApplicationPage;
