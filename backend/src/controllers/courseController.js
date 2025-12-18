import University from '../models/University.js';
import User from '../models/User.js';

// Get all courses from all universities
export const getCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Get universities with courses
        const universities = await University.find({ isActive: true })
            .select('name code courses')
            .skip(skip)
            .limit(limit);

        const total = await University.countDocuments({ isActive: true });

        // Flatten courses with university info
        const coursesWithUni = [];
        universities.forEach(uni => {
            if (uni.courses && uni.courses.length > 0) {
                uni.courses.forEach(course => {
                    coursesWithUni.push({
                        ...course.toObject(),
                        universityId: uni._id,
                        universityName: uni.name,
                        universityCode: uni.code
                    });
                });
            }
        });

        res.json({
            success: true,
            courses: coursesWithUni,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get courses by university ID
export const getCoursesByUniversity = async (req, res) => {
    try {
        const { universityId } = req.params;

        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }

        const courses = university.courses || [];

        res.json({
            success: true,
            university: {
                _id: university._id,
                name: university.name,
                code: university.code,
                country: university.country,
                description: university.description,
                logo: university.logo,
                web_pages: university.web_pages,
                contact: university.contact,
                campuses: university.campuses
            },
            courses: courses,
            courseCount: courses.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single course from a university
export const getCourseById = async (req, res) => {
    try {
        const { universityId, courseId } = req.params;

        const university = await University.findById(universityId);
        if (!university) {
            return res.status(404).json({ success: false, message: 'University not found' });
        }

        const course = university.courses.id(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        res.json({
            success: true,
            course: {
                ...course.toObject(),
                universityId: university._id,
                universityName: university.name
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search courses across all universities
export const searchCourses = async (req, res) => {
    try {
        const { keyword, level, studyMode } = req.query;

        const universities = await University.find({ isActive: true });
        const coursesWithUni = [];

        universities.forEach(uni => {
            if (uni.courses && uni.courses.length > 0) {
                uni.courses.forEach(course => {
                    let match = true;

                    if (keyword) {
                        const searchTerm = keyword.toLowerCase();
                        match = course.name.toLowerCase().includes(searchTerm) ||
                            course.code.toLowerCase().includes(searchTerm) ||
                            course.description?.toLowerCase().includes(searchTerm);
                    }

                    if (match && level) {
                        match = course.level === level;
                    }

                    if (match && studyMode) {
                        match = course.studyMode === studyMode;
                    }

                    if (match) {
                        coursesWithUni.push({
                            ...course.toObject(),
                            universityId: uni._id,
                            universityName: uni.name
                        });
                    }
                });
            }
        });

        res.json({
            success: true,
            courses: coursesWithUni,
            count: coursesWithUni.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get programmes by level
export const getCoursesByLevel = async (req, res) => {
    try {
        const { level } = req.params;

        const universities = await University.find({ isActive: true });
        const coursesWithUni = [];

        universities.forEach(uni => {
            if (uni.courses && uni.courses.length > 0) {
                uni.courses.forEach(course => {
                    if (course.level === level) {
                        coursesWithUni.push({
                            ...course.toObject(),
                            universityId: uni._id,
                            universityName: uni.name
                        });
                    }
                });
            }
        });

        res.json({
            success: true,
            level,
            courses: coursesWithUni,
            count: coursesWithUni.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get programme recommendations based on user's APS
export const getProgrammeRecommendations = async (req, res) => {
    try {
        const { apsScore } = req.body;

        if (!apsScore || apsScore < 0 || apsScore > 45) {
            return res.status(400).json({
                success: false,
                message: 'Invalid APS score. Must be between 0 and 45'
            });
        }

        const universities = await University.find({ isActive: true });
        const recommendations = [];

        universities.forEach(uni => {
            if (uni.courses && uni.courses.length > 0) {
                uni.courses.forEach(course => {
                    if (course.aps &&
                        course.aps.minimumAPS <= apsScore &&
                        course.aps.maximumAPS >= apsScore) {
                        recommendations.push({
                            ...course.toObject(),
                            universityId: uni._id,
                            universityName: uni.name,
                            matchPercentage: Math.round((apsScore / course.aps.maximumAPS) * 100)
                        });
                    }
                });
            }
        });

        // Sort by match percentage
        recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.json({
            success: true,
            apsScore,
            recommendations,
            count: recommendations.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
