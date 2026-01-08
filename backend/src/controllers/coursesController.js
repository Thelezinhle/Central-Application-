import { 
    getCoursesByUniversity, 
    searchCourses, 
    getUniversityName,
    getAllUniversitiesWithCourses 
} from '../data/coursesData.js';
import { calculateAPSScore } from '../utils/apsCalculator.js';

// Get courses for a specific university
export const getCourses = async (req, res) => {
    try {
        const { universityId } = req.params;
        const { faculty, minAps, maxAps } = req.query;

        let courses = getCoursesByUniversity(universityId);

        // Apply filters
        if (faculty) {
            courses = courses.filter(c => c.faculty === faculty);
        }

        if (minAps) {
            courses = courses.filter(c => c.minAPS >= parseInt(minAps));
        }

        if (maxAps) {
            courses = courses.filter(c => c.minAPS <= parseInt(maxAps));
        }

        res.json({
            success: true,
            university: getUniversityName(universityId),
            universityId,
            count: courses.length,
            courses: courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Search all courses
export const searchAllCourses = async (req, res) => {
    try {
        const { q, faculty, minAps, maxAps } = req.query;

        const results = searchCourses(q, {
            faculty: faculty,
            minAPS: minAps ? parseInt(minAps) : null,
            maxAPS: maxAps ? parseInt(maxAps) : null
        });

        res.json({
            success: true,
            count: results.length,
            results: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Calculate APS score
export const calculateAPS = async (req, res) => {
    try {
        const { subjects } = req.body;

        if (!subjects || !Array.isArray(subjects)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide subjects array with name, percentage, and level'
            });
        }

        const result = calculateAPSScore(subjects);
        res.json({
            success: true,
            ...result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get single course by ID
export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;
        const courses = getAllUniversitiesWithCourses();

        for (const university of courses) {
            const course = university.courses.find(c => c.id === courseId);
            if (course) {
                return res.json({
                    success: true,
                    course: {
                        ...course,
                        university: university.name,
                        universityId: university.id
                    }
                });
            }
        }

        res.status(404).json({
            success: false,
            error: 'Course not found'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all universities with course counts
export const getAllUniversities = async (req, res) => {
    try {
        const universities = getAllUniversitiesWithCourses();

        res.json({
            success: true,
            count: universities.length,
            universities: universities.map(uni => ({
                id: uni.id,
                name: uni.name,
                courseCount: uni.courseCount
            }))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get top courses by APS requirement
export const getTopCourses = async (req, res) => {
    try {
        const { limit = 20 } = req.query;

        const courses = searchCourses('');
        const sorted = courses
            .sort((a, b) => b.minAPS - a.minAPS)
            .slice(0, parseInt(limit));

        res.json({
            success: true,
            count: sorted.length,
            courses: sorted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
