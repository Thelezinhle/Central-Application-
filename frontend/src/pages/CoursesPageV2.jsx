import React, { useEffect, useState } from 'react';
import { cachedGet } from '../utils/apiClient';
import { FaCheckCircle, FaStar, FaArrowLeft, FaGraduationCap, FaMoneyBillWave, FaBook, FaClock } from 'react-icons/fa';
import useAuthStore from '../context/authStore';
import { useNavigate } from 'react-router-dom';
import { announceToScreenReader, announceCourseInfo, announceAction } from '../utils/accessibility';
import { API_BASE_URL } from '../config/api';

function CoursesPageV2() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [filterOptions, setFilterOptions] = useState({
        faculties: [],
        universities: [],
        durations: [],
        studyModes: []
    });
    const [loading, setLoading] = useState(true);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [expandedCourse, setExpandedCourse] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    
    // Filter state
    const [filters, setFilters] = useState({
        search: '',
        faculty: '',
        university: '',
        minAPS: '',
        maxAPS: '',
        duration: '',
        sortBy: 'name'
    });

    const apiBase = `${API_BASE_URL}/api/browse-courses`;

    useEffect(() => {
        fetchFilterOptions();
        fetchCourses();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, courses]);

    const fetchFilterOptions = async () => {
        try {
            const data = await cachedGet(`${apiBase}/filters`);
            if (data.success) {
                setFilterOptions(data.filters);
            }
        } catch (error) {
            console.error('Failed to fetch filter options:', error);
            announceToScreenReader('Failed to load filter options. Using default filters.', 'assertive');
        }
    };

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const data = await cachedGet(apiBase);
            if (data.success) {
                setCourses(data.data || []);
                announceToScreenReader(`Loaded ${data.count} courses from South African universities`, 'polite');
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
            announceToScreenReader('Failed to load courses. Please try again.', 'assertive');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...courses];

        // Search filter
        if (filters.search) {
            const query = filters.search.toLowerCase();
            filtered = filtered.filter(c =>
                c.name.toLowerCase().includes(query) ||
                c.code.toLowerCase().includes(query) ||
                c.faculty.toLowerCase().includes(query) ||
                c.careerPaths?.some(cp => cp.toLowerCase().includes(query))
            );
        }

        // Faculty filter
        if (filters.faculty) {
            filtered = filtered.filter(c => c.faculty === filters.faculty);
        }

        // University filter
        if (filters.university) {
            filtered = filtered.filter(c => c.universityId === filters.university);
        }

        // APS filter
        if (filters.minAPS) {
            filtered = filtered.filter(c => c.minAPS >= parseInt(filters.minAPS));
        }

        if (filters.maxAPS) {
            filtered = filtered.filter(c => c.minAPS <= parseInt(filters.maxAPS));
        }

        // Duration filter
        if (filters.duration) {
            filtered = filtered.filter(c => c.durationYears === parseInt(filters.duration));
        }

        // Sorting
        switch (filters.sortBy) {
            case 'minAPS':
                filtered.sort((a, b) => a.minAPS - b.minAPS);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'duration':
                filtered.sort((a, b) => a.durationYears - b.durationYears);
                break;
            default:
                break;
        }

        setFilteredCourses(filtered);
    };

    const toggleCourseSelection = (courseId) => {
        if (selectedCourses.includes(courseId)) {
            setSelectedCourses(selectedCourses.filter(id => id !== courseId));
            announceAction('Removed from selection', 'course');
        } else if (selectedCourses.length < 10) {
            setSelectedCourses([...selectedCourses, courseId]);
            announceAction('Added to selection', 'course', `Now ${selectedCourses.length + 1} of 10 courses selected`);
        } else {
            announceToScreenReader('Maximum 10 courses can be selected. Remove a course to add another.', 'assertive');
        }
    };

    const handleApplySingle = (course) => {
        if (!user) {
            announceToScreenReader('You must log in to apply for courses. Redirecting to login page.', 'assertive');
            navigate('/login');
            return;
        }
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        navigate('/application/single');
    };

    const handleApplyMultiple = () => {
        if (selectedCourses.length === 0) {
            announceToScreenReader('Please select at least one course before applying.', 'assertive');
            return;
        }
        if (!user) {
            announceToScreenReader('You must log in to apply for courses. Redirecting to login page.', 'assertive');
            navigate('/login');
            return;
        }
        const selected = filteredCourses.filter(c => selectedCourses.includes(c.id + c.universityId));
        localStorage.setItem('selectedCourses', JSON.stringify(selected));
        navigate('/application/multi');
    };

    const handleFilterChange = (filterName, value) => {
        setFilters({ ...filters, [filterName]: value });
        announceAction('Filter updated', filterName, value || 'cleared');
    };

    const getUniversityName = (universityId) => {
        const uni = filterOptions.universities.find(u => u.id === universityId);
        return uni ? uni.id.toUpperCase() : universityId;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#228B22] flex items-center justify-center">
                <div className="text-white text-xl">Loading courses...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#228B22] py-12">
            <div className="container mx-auto px-4" id="main-content" role="main" aria-label="Browse and apply for university courses from South African institutions">
                
                {/* Header */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-6 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Browse Courses</h1>
                    <p className="text-gray-100 text-lg">Discover programs from South Africa's leading universities</p>
                </div>

                {/* Filters */}
                <div id="filter-section" className="bg-white rounded-lg shadow-lg p-6 mb-8" role="region" aria-label="Course filters">
                    <h2 className="text-2xl font-bold text-[#228B22] mb-4">Filter Courses</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Course name, code, faculty..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                                aria-label="Search courses by name, code, or faculty"
                            />
                        </div>

                        {/* University */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                University
                            </label>
                            <select
                                value={filters.university}
                                onChange={(e) => handleFilterChange('university', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22] bg-white text-black"
                                aria-label="Filter by university"
                            >
                                <option value="" className="bg-white text-black">All Universities</option>
                                {filterOptions.universities.map(uni => (
                                    <option key={uni.id} value={uni.id} className="bg-white text-black">
                                        {getUniversityName(uni.id)} ({uni.courseCount})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Faculty */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Faculty/Field
                            </label>
                            <select
                                value={filters.faculty}
                                onChange={(e) => handleFilterChange('faculty', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22] bg-white text-black"
                                aria-label="Filter by faculty or field of study"
                            >
                                <option value="" className="bg-white text-black">All Faculties</option>
                                {filterOptions.faculties.map(faculty => (
                                    <option key={faculty} value={faculty} className="bg-white text-black">
                                        {faculty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Min APS */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Min APS Score
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="50"
                                value={filters.minAPS}
                                onChange={(e) => handleFilterChange('minAPS', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                                aria-label="Minimum APS score required"
                            />
                        </div>

                        {/* Max APS */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Max APS Score
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="50"
                                value={filters.maxAPS}
                                onChange={(e) => handleFilterChange('maxAPS', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                                aria-label="Maximum APS score required"
                            />
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Duration (years)
                            </label>
                            <select
                                value={filters.duration}
                                onChange={(e) => handleFilterChange('duration', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                                aria-label="Filter by course duration"
                            >
                                <option value="">All Durations</option>
                                {filterOptions.durations.map(duration => (
                                    <option key={duration} value={duration}>
                                        {duration} year{duration !== 1 ? 's' : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={filters.sortBy}
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#228B22]"
                                aria-label="Sort courses"
                            >
                                <option value="name">Course Name (A-Z)</option>
                                <option value="minAPS">APS Score (Low to High)</option>
                                <option value="duration">Duration (Short to Long)</option>
                            </select>
                        </div>
                        
                        <button
                            onClick={() => setFilters({
                                search: '',
                                faculty: '',
                                university: '',
                                minAPS: '',
                                maxAPS: '',
                                duration: '',
                                sortBy: 'name'
                            })}
                            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-semibold"
                            aria-label="Clear all filters"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Selected Courses Summary */}
                {selectedCourses.length > 0 && (
                    <div className="bg-white rounded-lg shadow-lg p-4 mb-8 border-l-4 border-[#228B22]" role="region" aria-live="polite" aria-label="Selected courses summary">
                        <h3 className="font-bold text-[#228B22] mb-2">
                            {selectedCourses.length} of 10 courses selected
                        </h3>
                        <button
                            onClick={handleApplyMultiple}
                            className="w-full px-4 py-3 bg-[#228B22] text-white rounded-lg hover:bg-[#1a6b1a] transition font-bold text-lg"
                            aria-label="Apply to selected courses"
                        >
                            Apply to {selectedCourses.length} Course{selectedCourses.length !== 1 ? 's' : ''}
                        </button>
                    </div>
                )}

                {/* Courses Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        {filteredCourses.length} Courses Found
                    </h2>

                    {filteredCourses.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <FaGraduationCap className="text-4xl text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600 text-lg">No courses match your filters. Try adjusting your search criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map((course) => {
                                const courseKey = course.id + course.universityId;
                                const isSelected = selectedCourses.includes(courseKey);

                                return (
                                    <div
                                        key={courseKey}
                                        className={`bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:shadow-xl hover:scale-105 ${
                                            isSelected ? 'ring-2 ring-[#228B22]' : ''
                                        }`}
                                        role="article"
                                        aria-label={`${course.name} at ${getUniversityName(course.universityId)}`}
                                    >
                                        {/* Course Header */}
                                        <div className="bg-gradient-to-r from-[#228B22] to-[#1a6b1a] text-white p-4">
                                            <h3 className="text-lg font-bold mb-1">{course.name}</h3>
                                            <p className="text-sm opacity-90">{getUniversityName(course.universityId)}</p>
                                            <p className="text-xs opacity-75 mt-1">Code: {course.code}</p>
                                        </div>

                                        {/* Course Body */}
                                        <div className="p-4">
                                            {/* Quick Info */}
                                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FaGraduationCap className="text-[#228B22]" />
                                                    <span>{course.faculty}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FaClock className="text-[#228B22]" />
                                                    <span>{course.durationYears} years</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FaStar className="text-[#228B22]" />
                                                    <span>Min APS: {course.minAPS}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <FaMoneyBillWave className="text-[#228B22]" />
                                                    <span>R{course.estimatedFees?.toLocaleString()}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                                            {/* Expandable Details */}
                                            {expandedCourse === courseKey && (
                                                <div className="bg-gray-50 p-3 rounded mb-4 border-l-4 border-[#228B22]">
                                                    <h4 className="font-bold text-gray-700 mb-2 text-sm">Requirements:</h4>
                                                    <ul className="text-xs text-gray-600 mb-3">
                                                        {course.requirements?.map((req, i) => (
                                                            <li key={i} className="mb-1">• {req}</li>
                                                        ))}
                                                    </ul>

                                                    <h4 className="font-bold text-gray-700 mb-2 text-sm">Career Paths:</h4>
                                                    <ul className="text-xs text-gray-600">
                                                        {course.careerPaths?.map((path, i) => (
                                                            <li key={i} className="mb-1">• {path}</li>
                                                        ))}
                                                    </ul>

                                                    <p className="text-xs text-gray-600 mt-3">
                                                        <strong>Deadline:</strong> {course.applicationDeadline}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setExpandedCourse(expandedCourse === courseKey ? null : courseKey)}
                                                    className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-semibold text-sm"
                                                    aria-label={expandedCourse === courseKey ? 'Hide details' : 'Show details'}
                                                >
                                                    {expandedCourse === courseKey ? 'Hide' : 'Details'}
                                                </button>
                                                <button
                                                    onClick={() => toggleCourseSelection(courseKey)}
                                                    className={`flex-1 px-3 py-2 rounded transition font-semibold text-sm ${
                                                        isSelected
                                                            ? 'bg-[#228B22] text-white'
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                    aria-label={isSelected ? 'Remove from selection' : 'Add to selection'}
                                                    aria-pressed={isSelected}
                                                >
                                                    {isSelected ? 'Selected' : 'Select'}
                                                </button>
                                                <button
                                                    onClick={() => handleApplySingle(course)}
                                                    className="flex-1 px-3 py-2 bg-[#228B22] text-white rounded hover:bg-[#1a6b1a] transition font-semibold text-sm"
                                                    aria-label="Apply to this course"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="bg-white bg-opacity-10 rounded-lg p-6 text-white text-center">
                    <p className="text-sm">
                        Can't find what you're looking for?{' '}
                        <button
                            onClick={() => navigate('/contact')}
                            className="underline hover:text-opacity-70 font-bold"
                        >
                            Contact us for more information
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CoursesPageV2;
