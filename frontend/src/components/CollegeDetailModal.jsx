import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, X, Globe, MapPin, Users, Star, Book } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

function CollegeDetailModal({ college, isOpen, onClose, isFavorite, onToggleFavorite }) {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rating, setRating] = useState(4);
    const [reviews, setReviews] = useState(college?.reviews || []);
    const [reviewText, setReviewText] = useState('');

    useEffect(() => {
        if (isOpen && college) {
            fetchCourses();
        }
    }, [isOpen, college]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/api/colleges/${college.id}/courses`);
            setCourses(response.data.courses || []);
        } catch (err) {
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddReview = () => {
        if (reviewText.trim()) {
            const newReview = {
                id: Date.now(),
                text: reviewText,
                rating: rating,
                author: 'Anonymous Student',
                date: new Date().toLocaleDateString()
            };
            setReviews([newReview, ...reviews]);
            setReviewText('');
            setRating(4);
        }
    };

    if (!isOpen || !college) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full m-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 flex justify-between items-start rounded-t-lg">
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{college.name}</h2>
                        <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                                <MapPin size={16} />
                                <span>{college.location}</span>
                            </div>
                            {college.website && (
                                <a href={college.website} target="_blank" rel="noopener noreferrer" 
                                   className="flex items-center gap-1 hover:underline">
                                    <Globe size={16} />
                                    <span>Visit Website</span>
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onToggleFavorite(college)}
                            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition"
                        >
                            <Heart
                                size={24}
                                fill={isFavorite ? 'currentColor' : 'none'}
                                stroke="currentColor"
                            />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition">
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm font-medium">Type</p>
                            <p className="text-lg font-bold text-gray-900">{college.type}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm font-medium">Category</p>
                            <p className="text-lg font-bold text-gray-900">{college.category || 'N/A'}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm font-medium">Campuses</p>
                            <p className="text-lg font-bold text-gray-900">{college.campuses?.length || 1}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm font-medium">Accreditation</p>
                            <p className="text-lg font-bold text-gray-900">{college.accreditation || 'Yes'}</p>
                        </div>
                    </div>

                    {/* Description */}
                    {college.description && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">About</h3>
                            <p className="text-gray-600">{college.description}</p>
                        </div>
                    )}

                    {/* Campuses */}
                    {college.campuses && college.campuses.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                                <MapPin size={24} className="text-purple-600" />
                                Campuses
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {college.campuses.map((campus, idx) => (
                                    <div key={idx} className="bg-blue-50 p-3 rounded-lg">
                                        <p className="font-medium text-gray-900">{campus.name || campus}</p>
                                        {campus.address && <p className="text-sm text-gray-600">{campus.address}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Courses */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Book size={24} className="text-purple-600" />
                            Available Courses ({courses.length})
                        </h3>
                        {loading ? (
                            <p className="text-gray-500">Loading courses...</p>
                        ) : courses.length === 0 ? (
                            <p className="text-gray-500">No courses available.</p>
                        ) : (
                            <div className="space-y-3">
                                {courses.map((course, idx) => (
                                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-purple-400 hover:shadow-md transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-gray-900">{course.name}</h4>
                                            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">{course.code}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{course.duration}</p>
                                        {course.minAPS && (
                                            <p className="text-sm font-medium text-blue-600">Minimum APS: {course.minAPS}</p>
                                        )}
                                        {course.requirements && (
                                            <p className="text-xs text-gray-500 mt-1">Requirements: {course.requirements}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reviews & Ratings */}
                    <div className="border-t pt-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Star size={24} className="text-purple-600" />
                            Reviews & Ratings
                        </h3>

                        {/* Add Review */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                            <label className="block text-sm font-medium text-gray-900 mb-2">Rate this college</label>
                            <div className="flex gap-2 mb-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className={`text-2xl transition ${
                                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                placeholder="Share your experience..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                                rows="3"
                            />
                            <button
                                onClick={handleAddReview}
                                disabled={!reviewText.trim()}
                                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition font-medium"
                            >
                                Post Review
                            </button>
                        </div>

                        {/* Display Reviews */}
                        <div className="space-y-3">
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
                            ) : (
                                reviews.map((review) => (
                                    <div key={review.id} className="border border-gray-200 rounded-lg p-3 bg-white">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="font-medium text-gray-900">{review.author}</p>
                                            <span className="text-xs text-gray-500">{review.date}</span>
                                        </div>
                                        <div className="flex gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    className={star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-600">{review.text}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Application Link */}
                    {college.website && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <p className="text-gray-700 mb-3">Ready to apply?</p>
                            <a
                                href={college.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium"
                            >
                                Visit Application Page →
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CollegeDetailModal;
