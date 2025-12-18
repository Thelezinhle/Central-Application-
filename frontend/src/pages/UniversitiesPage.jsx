import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGlobe, FaEnvelope, FaPhone, FaChevronDown, FaChevronUp, FaSearch, FaBook, FaClock, FaGraduationCap, FaCashRegister, FaArrowLeft } from 'react-icons/fa';
import useAuthStore from '../context/authStore';

function UniversitiesPage() {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedUni, setExpandedUni] = useState(null);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUniversities, setFilteredUniversities] = useState([]);

    const apiBase = 'http://localhost:5000/api/global-universities';
    const coursesApiBase = 'http://localhost:5000/api/courses';

    useEffect(() => {
        fetchCountries();
        fetchUniversities();
    }, []);

    useEffect(() => {
        filterUniversities();
    }, [selectedCountry, searchQuery, universities]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get(`${apiBase}/countries`);
            if (response.data.success) {
                setCountries(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchUniversities = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiBase}?page=1&limit=200`);
            if (response.data.success) {
                setUniversities(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching universities:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async (universityId) => {
        try {
            const response = await axios.get(`${coursesApiBase}/university/${universityId}`);
            if (response.data.success) {
                return response.data.courses || [];
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            return [];
        }
    };

    const filterUniversities = () => {
        let filtered = universities;

        if (selectedCountry) {
            filtered = filtered.filter(uni =>
                uni.country && uni.country.toLowerCase() === selectedCountry.toLowerCase()
            );
        }

        if (searchQuery) {
            filtered = filtered.filter(uni =>
                uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (uni.country && uni.country.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredUniversities(filtered);
    };

    const toggleExpand = async (uniId) => {
        if (expandedUni === uniId) {
            setExpandedUni(null);
            setExpandedCourse(null);
        } else {
            setExpandedUni(uniId);
            setExpandedCourse(null);
        }
    };

    const toggleCoursExpand = (courseId) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    const formatFee = (fee) => {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            minimumFractionDigits: 0
        }).format(fee);
    };

    const handleApply = (course, university) => {
        if (!user) {
            alert('Please login to apply');
            navigate('/login');
            return;
        }
        // Create application object with course and university info
        const application = {
            ...course,
            universityId: university._id,
            universityName: university.name,
            universityCountry: university.country
        };
        localStorage.setItem('selectedCourse', JSON.stringify(application));
        alert(`Applied for ${course.name} at ${university.name}!`);
        navigate('/application/single');
    };

    return (
        <div className="container py-12" role="main" aria-label="Browse universities page">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 mb-4 bg-green-700 hover:bg-green-800 text-white px-3 py-2 rounded transition"
                aria-label="Go to previous page"
            >
                <FaArrowLeft aria-hidden="true" /> Back
            </button>
            <h1 className="text-4xl font-bold mb-2">{t('pages.browseUniversities.title')}</h1>
            <p className="text-gray-600 mb-8">{t('pages.browseUniversities.subtitle')}</p>

            {/* Search and Filter Controls */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaSearch className="inline mr-2" />
                            {t('common.search')}
                        </label>
                        <input
                            type="text"
                            placeholder={t('pages.browseUniversities.searchPlaceholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input"
                        />
                    </div>

                    {/* Country Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t('pages.browseUniversities.filterByCountry')}
                        </label>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="input"
                        >
                            <option value="">{t('common.selectCountry')}</option>
                            {countries.map((country, idx) => (
                                <option key={idx} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">{t('common.loading')}</p>
                </div>
            )}

            {/* Universities List */}
            {!loading && filteredUniversities.length > 0 && (
                <div className="space-y-4">
                    {filteredUniversities.map((uni) => (
                        <div key={uni._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {/* University Header - Clickable */}
                            <div
                                onClick={() => toggleExpand(uni._id)}
                                className="cursor-pointer p-6 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-grow">
                                        <h2 className="text-2xl font-bold text-green-700 mb-2">{uni.name}</h2>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                            {uni.country && (
                                                <span>{uni.country}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-3xl text-gray-400">
                                        {expandedUni === uni._id ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>
                            </div>

                            {/* University Details - Expandable */}
                            {expandedUni === uni._id && (
                                <div className="border-t px-6 py-6 bg-gray-50">
                                    {/* Basic Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                        {uni.description && (
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                                                <p className="text-gray-700">{uni.description}</p>
                                            </div>
                                        )}

                                        {uni.contact && (
                                            <div>
                                                <h3 className="font-bold text-gray-800 mb-2">Contact</h3>
                                                {uni.contact.email && (
                                                    <p className="flex items-center text-gray-700 mb-2">
                                                        <FaEnvelope className="mr-2" /> {uni.contact.email}
                                                    </p>
                                                )}
                                                {uni.contact.phone && (
                                                    <p className="flex items-center text-gray-700">
                                                        <FaPhone className="mr-2" /> {uni.contact.phone}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Websites */}
                                    {uni.web_pages && uni.web_pages.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                                                <FaGlobe className="mr-2" /> Websites
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {uni.web_pages.map((page, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={page}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-green-100 text-green-700 rounded hover:bg-green-200"
                                                    >
                                                        Visit Website
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Courses Section */}
                                    <div className="mt-8 pt-8 border-t">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                            <FaBook className="mr-2" /> Available Courses ({uni.courses?.length || 0})
                                        </h3>

                                        {uni.courses && uni.courses.length > 0 ? (
                                            <div className="space-y-3">
                                                {uni.courses.map((course) => (
                                                    <div key={course._id} className="bg-white rounded-lg border border-gray-200">
                                                        {/* Course Header */}
                                                        <div
                                                            onClick={() => toggleCoursExpand(course._id)}
                                                            className="cursor-pointer p-4 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-grow">
                                                                    <div className="font-bold text-gray-800">{course.name}</div>
                                                                    <div className="text-sm text-gray-600 flex flex-wrap gap-3 mt-2">
                                                                        <span className="flex items-center">
                                                                            <FaGraduationCap className="mr-1" />
                                                                            {course.level}
                                                                        </span>
                                                                        <span className="flex items-center">
                                                                            <FaClock className="mr-1" />
                                                                            {course.duration?.value} {course.duration?.unit || 'years'}
                                                                        </span>
                                                                        <span className="bg-green-100 px-2 py-1 rounded text-xs">
                                                                            {course.studyMode}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="text-xl text-gray-400">
                                                                    {expandedCourse === course._id ? <FaChevronUp /> : <FaChevronDown />}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Course Details - Expandable */}
                                                        {expandedCourse === course._id && (
                                                            <div className="border-t px-4 py-4 bg-gray-50 text-sm">
                                                                {course.description && (
                                                                    <div className="mb-4">
                                                                        <span className="font-bold text-gray-800">Description:</span>
                                                                        <p className="text-gray-700 mt-1">{course.description}</p>
                                                                    </div>
                                                                )}

                                                                {course.faculty && (
                                                                    <div className="mb-3">
                                                                        <span className="font-bold text-gray-800">Faculty:</span>
                                                                        <p className="text-gray-700">{course.faculty}</p>
                                                                    </div>
                                                                )}

                                                                {course.entryRequirements && (
                                                                    <div className="mb-4">
                                                                        <span className="font-bold text-gray-800">Entry Requirements:</span>
                                                                        <ul className="list-disc list-inside text-gray-700 mt-2">
                                                                            {course.entryRequirements.minimumMatricScore && (
                                                                                <li>Minimum Matric Score: {course.entryRequirements.minimumMatricScore}%</li>
                                                                            )}
                                                                            {course.entryRequirements.requiredSubjects?.length > 0 && (
                                                                                <li>Required Subjects: {course.entryRequirements.requiredSubjects.join(', ')}</li>
                                                                            )}
                                                                            {course.entryRequirements.englishProficiency && (
                                                                                <li>English: {course.entryRequirements.englishProficiency}</li>
                                                                            )}
                                                                        </ul>
                                                                    </div>
                                                                )}

                                                                {course.aps && (
                                                                    <div className="mb-4">
                                                                        <span className="font-bold text-gray-800">APS Range:</span>
                                                                        <p className="text-gray-700">{course.aps.minimumAPS} - {course.aps.maximumAPS}</p>
                                                                    </div>
                                                                )}

                                                                {course.tuitionFee && (
                                                                    <div className="mb-4">
                                                                        <span className="font-bold text-gray-800 flex items-center">
                                                                            <FaCashRegister className="mr-2" /> Tuition Fees
                                                                        </span>
                                                                        <p className="text-gray-700">
                                                                            Local: {formatFee(course.tuitionFee.local)}
                                                                        </p>
                                                                        <p className="text-gray-700">
                                                                            International: {formatFee(course.tuitionFee.international)}
                                                                        </p>
                                                                    </div>
                                                                )}

                                                                {course.application && (
                                                                    <div className="mb-4">
                                                                        <span className="font-bold text-gray-800">Application Info:</span>
                                                                        {course.application.deadline && (
                                                                            <p className="text-gray-700">
                                                                                Deadline: {new Date(course.application.deadline).toLocaleDateString()}
                                                                            </p>
                                                                        )}
                                                                        {course.application.selectionProcess && (
                                                                            <p className="text-gray-700">
                                                                                Selection: {course.application.selectionProcess}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {course.outcomes && (
                                                                    <div className="mb-4">
                                                                        <span className="font-bold text-gray-800">Post-Graduation Outcomes:</span>
                                                                        {course.outcomes.employmentRate && (
                                                                            <p className="text-gray-700">
                                                                                Employment Rate: {course.outcomes.employmentRate}%
                                                                            </p>
                                                                        )}
                                                                        {course.outcomes.salaryRange && (
                                                                            <p className="text-gray-700">
                                                                                Salary Range: {formatFee(course.outcomes.salaryRange.min)} - {formatFee(course.outcomes.salaryRange.max)}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                <div className="border-t pt-4 mt-4">
                                                                    <button
                                                                        onClick={() => handleApply(course, uni)}
                                                                        className="w-full btn-primary py-2 font-bold"
                                                                    >
                                                                        Apply for This Course
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-600">No courses available at this time.</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredUniversities.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-lg text-gray-600">{t('common.noResults')}</p>
                </div>
            )}
        </div>
    );
}

export default UniversitiesPage;
