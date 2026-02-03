import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaStar, FaCheck, FaChevronDown, FaChevronUp, FaArrowLeft } from 'react-icons/fa';
import useAuthStore from '../context/authStore';
import { useNavigate } from 'react-router-dom';
import { announceToScreenReader, announceCourseInfo, announceAction, announceFormStatus, createAriaDescription } from '../utils/accessibility';

function CoursesPage() {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [filters, setFilters] = useState({ keyword: '', level: '', studyMode: '' });
    const [showSelectedOnly, setShowSelectedOnly] = useState(false);
    const [expandedUni, setExpandedUni] = useState(null);

    const apiBase = 'http://localhost:5000/api/global-universities';
    const coursesApiBase = 'http://localhost:5000/api/courses';

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        filterCourses();
    }, [filters, allCourses]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            // Fetch all universities with their embedded courses
            const response = await axios.get(`${apiBase}?page=1&limit=200`);
            if (response.data.success) {
                const unis = response.data.data || [];
                setUniversities(unis);

                // Flatten all courses with university info
                const flattened = [];
                unis.forEach(uni => {
                    if (uni.courses && uni.courses.length > 0) {
                        uni.courses.forEach(course => {
                            flattened.push({
                                ...course,
                                universityId: uni._id,
                                universityName: uni.name,
                                universityCountry: uni.country
                            });
                        });
                    }
                });
                setAllCourses(flattened);
            }
        } catch (error) {
            console.error('Failed to fetch courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterCourses = () => {
        let filtered = allCourses;

        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            filtered = filtered.filter(c =>
                c.name?.toLowerCase().includes(keyword) ||
                c.code?.toLowerCase().includes(keyword) ||
                c.universityName?.toLowerCase().includes(keyword)
            );
        }

        if (filters.level && filters.level !== '') {
            filtered = filtered.filter(c => c.level === filters.level);
        }

        if (filters.studyMode && filters.studyMode !== '') {
            filtered = filtered.filter(c => c.studyMode === filters.studyMode);
        }

        // Apply filtering to universities list too
        const uniWithFiltered = universities.map(uni => ({
            ...uni,
            filteredCourses: filtered.filter(c => c.universityId === uni._id)
        })).filter(uni => uni.filteredCourses.length > 0);

        // If no filters active, show all universities
        if (filters.keyword === '' && filters.level === '' && filters.studyMode === '') {
            setUniversities(universities);
        } else {
            setUniversities(uniWithFiltered);
        }
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
        // Store single course for application
        localStorage.setItem('selectedCourse', JSON.stringify(course));
        announceFormStatus(true, 1);
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
        // Store selected courses for application
        const selected = allCourses.filter(c => selectedCourses.includes(c._id || c.code));
        localStorage.setItem('selectedCourses', JSON.stringify(selected));
        announceFormStatus(true, selectedCourses.length);
        navigate('/application/multi');
    };

    return (
        <div className="min-h-screen bg-[#228B22] py-12">
            <div className="container mx-auto px-4" id="main-content" role="main" aria-label="Browse and apply for university courses from South African institutions">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 bg-white hover:bg-gray-100 text-[#228B22] px-3 py-2 rounded transition font-semibold"
                    aria-label="Go to previous page"
                >
                    <FaArrowLeft aria-hidden="true" /> Back
                </button>
            <h1 className="text-4xl font-bold mb-2">Browse Courses</h1>
            <p className="text-gray-600 mb-8">Browse courses from all South African universities and apply directly</p>

            <div id="filter-section" className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" role="region" aria-label="Course filters section">
                <input
                    type="text"
                    placeholder="Search courses or universities..."
                    className="input"
                    value={filters.keyword}
                    onChange={(e) => {
                        setFilters({ ...filters, keyword: e.target.value });
                        if (e.target.value) {
                            announceAction('Searching', 'courses', `for: ${e.target.value}`);
                        }
                    }}
                    aria-label="Search for courses by name, code, or university"
                    aria-describedby="search-help"
                />
                <div id="search-help" className="sr-only">Type to filter courses. Results update automatically as you type.</div>
                <select
                    className="input"
                    style={{backgroundColor: 'white', color: 'black'}}
                    value={filters.level}
                    onChange={(e) => {
                        setFilters({ ...filters, level: e.target.value });
                        announceAction('Filtered by level', e.target.value || 'all levels');
                    }}
                    aria-label="Filter courses by qualification level. Options: All Levels, Diploma, Bachelor, Honors, Masters, PhD"
                >
                    <option value="" style={{backgroundColor: 'white', color: 'black'}}>All Levels</option>
                    <option value="Diploma" style={{backgroundColor: 'white', color: 'black'}}>Diploma</option>
                    <option value="Bachelor" style={{backgroundColor: 'white', color: 'black'}}>Bachelor</option>
                    <option value="Honors" style={{backgroundColor: 'white', color: 'black'}}>Honors</option>
                    <option value="Masters" style={{backgroundColor: 'white', color: 'black'}}>Masters</option>
                    <option value="PhD" style={{backgroundColor: 'white', color: 'black'}}>PhD</option>
                </select>
                <select
                    className="input"
                    style={{backgroundColor: 'white', color: 'black'}}
                    value={filters.studyMode}
                    onChange={(e) => {
                        setFilters({ ...filters, studyMode: e.target.value });
                        announceAction('Filtered by study mode', e.target.value || 'all modes');
                    }}
                    aria-label="Filter courses by study mode. Options: All Study Modes, Full-time, Part-time, Distance, Hybrid"
                >
                    <option value="" style={{backgroundColor: 'white', color: 'black'}}>All Study Modes</option>
                    <option value="Full-time" style={{backgroundColor: 'white', color: 'black'}}>Full-time</option>
                    <option value="Part-time" style={{backgroundColor: 'white', color: 'black'}}>Part-time</option>
                    <option value="Distance" style={{backgroundColor: 'white', color: 'black'}}>Distance</option>
                    <option value="Hybrid" style={{backgroundColor: 'white', color: 'black'}}>Hybrid</option>
                </select>
            </div>

            {selectedCourses.length > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-white border-2 border-green-700 p-4 mb-8 rounded-lg shadow-md" role="region" aria-live="polite" aria-label="Selected courses summary">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-bold text-gray-900" id="selected-count">
                                Selected: {selectedCourses.length}/10 courses
                            </p>
                            <p className="text-xs text-gray-600 mt-1">Click "Apply Now" to apply for multiple courses at once</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setShowSelectedOnly(!showSelectedOnly);
                                    announceAction('Toggled filter', 'Show ' + (showSelectedOnly ? 'all courses' : 'selected courses only'));
                                }}
                                className="text-sm px-3 py-2 bg-white border border-green-700 text-green-700 rounded font-bold hover:bg-green-50"
                                aria-label={showSelectedOnly ? 'Show all courses' : 'Show selected courses only'}
                            >
                                {showSelectedOnly ? 'Show All' : 'Show Selected'}
                            </button>
                            <button
                                onClick={handleApplyMultiple}
                                className="btn-primary text-sm"
                                aria-label={`Apply for ${selectedCourses.length} selected course${selectedCourses.length !== 1 ? 's' : ''}`}
                            >
                                Apply Now →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="text-center py-12" role="status" aria-live="polite">
                    <p className="text-lg text-gray-600">Loading courses...</p>
                </div>
            ) : universities.length === 0 ? (
                <div className="card text-center py-12" role="status">
                    <p className="text-gray-600">No courses match your filters. Try adjusting your search or filter options.</p>
                </div>
            ) : (
                <div className="space-y-4" role="region" aria-label="Course listings">
                    {universities.map((uni) => (
                        <div key={uni._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            {/* University Header */}
                            <button
                                className="w-full p-6 bg-gradient-to-r from-green-700 to-green-800 text-white cursor-pointer hover:from-green-800 hover:to-green-900 transition text-left"
                                onClick={() => {
                                    setExpandedUni(expandedUni === uni._id ? null : uni._id);
                                    announceAction('Toggled', `${uni.name} university section`, expandedUni === uni._id ? 'now collapsed' : 'now expanded');
                                }}
                                aria-expanded={expandedUni === uni._id}
                                aria-label={`${uni.name} University. ${uni.courses?.length || 0} courses available. Click to ${expandedUni === uni._id ? 'collapse' : 'expand'}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold">{uni.name}</h2>
                                        <p className="text-green-100">{uni.country} • {uni.courses?.length || 0} courses</p>
                                    </div>
                                    <div className="text-3xl" aria-hidden="true">
                                        {expandedUni === uni._id ? <FaChevronUp /> : <FaChevronDown />}
                                    </div>
                                </div>
                            </button>

                            {/* Courses List - Expandable */}
                            {expandedUni === uni._id && uni.courses && uni.courses.length > 0 && (
                                <div className="p-6 space-y-4 border-t" role="region" aria-label={`${uni.name} courses list`}>
                                    {uni.courses.map((course) => {
                                        const courseId = course._id || course.code;
                                        const isSelected = selectedCourses.includes(courseId);
                                        return (
                                            <div key={courseId} className={`border-2 rounded-lg p-4 transition-all ${isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-blue-300'}`} role="article" aria-label={`${course.name} course`}>
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-gray-900">{course.name}</h3>
                                                        <p className="text-sm text-gray-600">{course.code}</p>
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => toggleCourseSelection(courseId)}
                                                        className="w-5 h-5 cursor-pointer"
                                                        aria-label={`Select ${course.name} for application`}
                                                        aria-describedby={`desc-${courseId}`}
                                                    />
                                                </div>
                                                <div id={`desc-${courseId}`} className="sr-only">
                                                    {course.level} level, {course.studyMode}, {course.duration?.value} {course.duration?.unit || 'years'} duration
                                                </div>

                                                <div className="flex gap-2 mb-4 flex-wrap">
                                                    <span className="badge bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">{course.level}</span>
                                                    <span className="badge bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-semibold">{course.duration?.value} {course.duration?.unit || 'years'}</span>
                                                    <span className="badge bg-gray-200 text-gray-900 px-2 py-1 rounded text-xs font-semibold">{course.studyMode}</span>
                                                </div>

                                                {course.description && (
                                                    <p className="text-sm text-gray-700 mb-4">{course.description}</p>
                                                )}

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm bg-gray-50 p-3 rounded">
                                                    {course.aps && (
                                                        <div>
                                                            <p className="font-bold text-gray-800">APS Range:</p>
                                                            <p className="text-gray-700">{course.aps.minimumAPS} - {course.aps.maximumAPS}</p>
                                                        </div>
                                                    )}
                                                    {course.tuitionFee && (
                                                        <div>
                                                            <p className="font-bold text-gray-800">Tuition Fees:</p>
                                                            <p className="text-gray-700">Local: R{course.tuitionFee.local?.toLocaleString() || 0}</p>
                                                            <p className="text-gray-700">International: R{course.tuitionFee.international?.toLocaleString() || 0}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleApplySingle(course)}
                                                        className="flex-1 btn-primary text-sm py-2"
                                                        aria-label={`Apply now for ${course.name} course`}
                                                    >
                                                        Apply Now
                                                    </button>
                                                    <button
                                                        onClick={() => toggleCourseSelection(courseId)}
                                                        className={`flex-1 font-bold py-2 px-4 rounded transition-all text-sm ${isSelected
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                                                            }`}
                                                        aria-label={isSelected ? `Remove ${course.name} from selection` : `Add ${course.name} to selection`}
                                                        aria-pressed={isSelected}
                                                    >
                                                        {isSelected ? 'Selected' : 'Add to List'}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            </div>
        </div>

    );
}

export default CoursesPage;
