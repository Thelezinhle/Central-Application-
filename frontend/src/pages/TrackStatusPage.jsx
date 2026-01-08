import React, { useEffect, useState } from 'react';
import { mockUniversities, mockCourses } from '../data/mockData';
import { FaCheckCircle, FaClock, FaTimesCircle, FaDownload, FaArrowRight, FaLightbulb, FaArrowLeft } from 'react-icons/fa';
import useAuthStore from '../context/authStore';
import { useNavigate } from 'react-router-dom';

function TrackStatusPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        // Load mock applications
        setTimeout(() => {
            const mockApplications = [
                {
                    _id: '1',
                    courseId: '101',
                    universitId: '1',
                    status: 'accepted',
                    appliedDate: '2025-12-01',
                    responseDate: '2025-12-10',
                    statusReason: 'Congratulations! Your application has been accepted.'
                },
                {
                    _id: '2',
                    courseId: '102',
                    universityId: '1',
                    status: 'pending',
                    appliedDate: '2025-12-05',
                    responseDate: null,
                    statusReason: 'Your application is under review.'
                },
                {
                    _id: '3',
                    courseId: '103',
                    universityId: '2',
                    status: 'rejected',
                    appliedDate: '2025-12-02',
                    responseDate: '2025-12-08',
                    statusReason: 'Unfortunately, your application did not meet the requirements.'
                },
                {
                    _id: '4',
                    courseId: '104',
                    universityId: '2',
                    status: 'pending',
                    appliedDate: '2025-12-06',
                    responseDate: null,
                    statusReason: 'Your application is under review.'
                },
                {
                    _id: '5',
                    courseId: '105',
                    universityId: '3',
                    status: 'accepted',
                    appliedDate: '2025-12-03',
                    responseDate: '2025-12-11',
                    statusReason: 'Your application has been accepted.'
                }
            ];
            setApplications(mockApplications);
            setLoading(false);
        }, 500);
    }, []);

    const getStatusConfig = (status) => {
        const configs = {
            accepted: {
                icon: FaCheckCircle,
                color: 'text-green-600',
                bgColor: 'bg-green-50',
                borderColor: 'border-green-300',
                badge: 'Accepted ✓',
                badgeBg: 'bg-green-100',
                badgeText: 'text-green-800'
            },
            pending: {
                icon: FaClock,
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                borderColor: 'border-yellow-300',
                badge: 'Pending',
                badgeBg: 'bg-yellow-100',
                badgeText: 'text-yellow-800'
            },
            rejected: {
                icon: FaTimesCircle,
                color: 'text-red-600',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-300',
                badge: 'Rejected ✗',
                badgeBg: 'bg-red-100',
                badgeText: 'text-red-800'
            }
        };
        return configs[status] || configs.pending;
    };

    const ApplicationCard = ({ app }) => {
        const course = mockCourses.find(c => c._id === app.courseId);
        const university = mockUniversities.find(u => u._id === app.universityId);
        const config = getStatusConfig(app.status);
        const StatusIcon = config.icon;

        return (
            <div className={`${config.bgColor} border-2 ${config.borderColor} p-6 rounded-lg mb-4`}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <StatusIcon className={config.color} size={28} />
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{course?.name}</h3>
                            <p className="text-sm text-gray-600">{university?.name}</p>
                        </div>
                    </div>
                    <span className={`${config.badgeBg} ${config.badgeText} px-3 py-1 rounded-full font-bold text-sm`}>
                        {config.badge}
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                        <p className="text-gray-600"><strong>Course Code:</strong> {course?.code}</p>
                        <p className="text-gray-600"><strong>Level:</strong> {course?.level}</p>
                    </div>
                    <div>
                        <p className="text-gray-600"><strong>Applied:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
                        {app.responseDate && (
                            <p className="text-gray-600"><strong>Response:</strong> {new Date(app.responseDate).toLocaleDateString()}</p>
                        )}
                    </div>
                    <div>
                        <p className="text-gray-600"><strong>Duration:</strong> {course?.duration}</p>
                        <p className="text-gray-600"><strong>Fee:</strong> R{course?.tuitionFee?.toLocaleString()}/year</p>
                    </div>
                </div>

                <div className={`${config.color} p-3 rounded text-sm font-semibold`}>
                    {app.statusReason}
                </div>

                {app.status === 'accepted' && (
                    <div className="mt-4 p-3 bg-white rounded border-2 border-green-200">
                        <p className="text-sm text-gray-700 mb-3">🎉 <strong>Next Steps:</strong></p>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Confirm your acceptance by the deadline</li>
                            <li>Submit required documents (ID, matric certificate)</li>
                            <li>Complete online registration</li>
                            <li>Pay registration fees</li>
                        </ul>
                    </div>
                )}

                {app.status === 'rejected' && (
                    <div className="mt-4 p-3 bg-white rounded border-2 border-red-200">
                        <p className="text-sm text-gray-700 mb-2">📝 <strong>What you can do:</strong></p>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Explore alternative courses or universities</li>
                            <li>Contact the university's admissions office to ask for feedback</li>
                            <li>Consider improving your qualifications and reapplying next year</li>
                        </ul>
                    </div>
                )}

                {app.status === 'pending' && (
                    <div className="mt-4 p-3 bg-white rounded border-2 border-yellow-200">
                        <p className="text-sm text-gray-700">⏳ <strong>Expected response time:</strong> 2-3 weeks</p>
                    </div>
                )}
            </div>
        );
    };

    if (!user) {
        return (
            <div className="container py-12 text-center">
                <h1 className="text-4xl font-bold mb-4">📊 Track Application Status</h1>
                <p className="text-gray-600 mb-6">Please login to view your application status</p>
                <a href="/login" className="btn-primary">Go to Login</a>
            </div>
        );
    }

    const filteredApps = filterStatus === 'all' ? applications : applications.filter(a => a.status === filterStatus);

    return (
        <div className="min-h-screen bg-[#228B22] py-12" role="main" aria-label="Track application status page">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
                <h1 className="text-4xl font-bold mb-2 text-white">Track Application Status</h1>
                <p className="text-white mb-8">Monitor the status of all your course applications in real-time</p>

            {loading ? (
                <p className="text-center text-gray-600">Loading applications...</p>
            ) : applications.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-gray-600 mb-4">You haven't submitted any applications yet.</p>
                    <p className="text-sm text-gray-500 mb-6">Start by browsing courses or getting smart recommendations based on your APS scores.</p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href="/courses" className="btn-primary">Browse Courses</a>
                        <a href="/recommendations" className="btn-secondary">Get Recommendations</a>
                    </div>
                </div>
            ) : (
                <div>
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="card text-center bg-green-100 border-2 border-green-700">
                            <p className="text-3xl font-bold text-green-900">{applications.length}</p>
                            <p className="text-gray-600">Total Applications</p>
                        </div>
                        <div className="card text-center bg-green-50 border-2 border-green-700">
                            <p className="text-3xl font-bold text-green-700">{applications.filter(a => a.status === 'accepted').length}</p>
                            <p className="text-gray-600">Accepted</p>
                        </div>
                        <div className="card text-center bg-yellow-50 border-2 border-yellow-300">
                            <p className="text-3xl font-bold text-yellow-700">{applications.filter(a => a.status === 'pending').length}</p>
                            <p className="text-gray-600">Pending</p>
                        </div>
                        <div className="card text-center bg-red-50 border-2 border-red-300">
                            <p className="text-3xl font-bold text-red-700">{applications.filter(a => a.status === 'rejected').length}</p>
                            <p className="text-gray-600">Rejected</p>
                        </div>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2 mb-8 flex-wrap">
                        <button
                            onClick={() => setFilterStatus('all')}
                            className={`px-4 py-2 rounded font-bold transition-all ${filterStatus === 'all' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            All ({applications.length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('accepted')}
                            className={`px-4 py-2 rounded font-bold transition-all ${filterStatus === 'accepted' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Accepted ({applications.filter(a => a.status === 'accepted').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('pending')}
                            className={`px-4 py-2 rounded font-bold transition-all ${filterStatus === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Pending ({applications.filter(a => a.status === 'pending').length})
                        </button>
                        <button
                            onClick={() => setFilterStatus('rejected')}
                            className={`px-4 py-2 rounded font-bold transition-all ${filterStatus === 'rejected' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Rejected ({applications.filter(a => a.status === 'rejected').length})
                        </button>
                    </div>

                    {/* Application List */}
                    {filteredApps.length === 0 ? (
                        <div className="card text-center py-8">
                            <p className="text-gray-600">No {filterStatus} applications found</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredApps.map(app => (
                                <ApplicationCard key={app._id} app={app} />
                            ))}
                        </div>
                    )}

                    {/* Recommendations if rejected */}
                    {applications.some(a => a.status === 'rejected') && (
                        <div className="card mt-8 bg-gradient-to-r from-white to-green-50 border-2 border-green-700">
                            <div className="flex items-start gap-4">
                                <FaLightbulb className="text-green-700 text-2xl mt-1" />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-green-900 mb-2">Get Smart Recommendations</h3>
                                    <p className="text-gray-700 mb-4">
                                        Some applications didn't go as planned. Get AI-powered recommendations for courses that better match your APS scores and qualifications.
                                    </p>
                                    <button
                                        onClick={() => navigate('/recommendations')}
                                        className="btn-primary flex items-center gap-2"
                                    >
                                        Get Recommendations <FaArrowRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Apply to More Courses */}
                    {applications.length > 0 && (
                        <div className="card mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-purple-900 mb-2">📚 Apply to More Courses</h3>
                                    <p className="text-gray-700">You can apply to up to 10 programs. You currently have {applications.length} application(s).</p>
                                </div>
                                <button
                                    onClick={() => navigate('/courses')}
                                    className="btn-primary flex items-center gap-2 whitespace-nowrap"
                                >
                                    Browse Courses <FaArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
            </div>
        </div>
    );
}

export default TrackStatusPage;
