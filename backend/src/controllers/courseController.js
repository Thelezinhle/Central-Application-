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

// Get courses by country
export const getCoursesByCountry = async (req, res) => {
    try {
        const { country } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const universities = await University.find(
            { isActive: true, country: new RegExp(country, 'i') }
        )
            .skip(skip)
            .limit(limit);

        const total = await University.countDocuments({
            isActive: true,
            country: new RegExp(country, 'i')
        });

        const coursesWithUni = [];
        universities.forEach(uni => {
            if (uni.courses && uni.courses.length > 0) {
                uni.courses.forEach(course => {
                    coursesWithUni.push({
                        ...course.toObject(),
                        universityId: uni._id,
                        universityName: uni.name,
                        universityCode: uni.code,
                        country: uni.country
                    });
                });
            }
        });

        res.json({
            success: true,
            country,
            courses: coursesWithUni,
            universities: universities.length,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get courses by region
export const getCoursesByRegion = async (req, res) => {
    try {
        const { region } = req.params;
        const regions = {
            'south-africa': ['South Africa'],
            'sub-saharan-africa': ['Nigeria', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Senegal', 'Ethiopia'],
            'europe': ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Belgium', 'Spain', 'Italy', 'Sweden', 'Denmark', 'Portugal', 'Ireland', 'Norway', 'Switzerland'],
            'west-africa': ['Nigeria', 'Ghana', 'Senegal', 'Ivory Coast'],
            'east-africa': ['Kenya', 'Uganda', 'Tanzania', 'Rwanda']
        };

        const countries = regions[region.toLowerCase()];
        if (!countries) {
            return res.status(400).json({
                success: false,
                message: `Invalid region. Available regions: ${Object.keys(regions).join(', ')}`
            });
        }

        const universities = await University.find({
            isActive: true,
            country: { $in: countries }
        });

        const coursesWithUni = [];
        universities.forEach(uni => {
            if (uni.courses && uni.courses.length > 0) {
                uni.courses.forEach(course => {
                    coursesWithUni.push({
                        ...course.toObject(),
                        universityId: uni._id,
                        universityName: uni.name,
                        universityCode: uni.code,
                        country: uni.country,
                        region: region
                    });
                });
            }
        });

        // Group by country
        const grouped = {};
        coursesWithUni.forEach(course => {
            if (!grouped[course.country]) {
                grouped[course.country] = [];
            }
            grouped[course.country].push(course);
        });

        res.json({
            success: true,
            region,
            countries: Object.keys(grouped),
            courses: coursesWithUni,
            groupedByCountry: grouped,
            totalCourses: coursesWithUni.length,
            totalUniversities: universities.length
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get available regions
export const getAvailableRegions = async (req, res) => {
    try {
        const regions = {
            'south-africa': 'South Africa',
            'sub-saharan-africa': 'Sub-Saharan Africa',
            'europe': 'Europe',
            'west-africa': 'West Africa',
            'east-africa': 'East Africa'
        };

        const regionDetails = {};
        for (const [key, name] of Object.entries(regions)) {
            const regionsMap = {
                'south-africa': ['South Africa'],
                'sub-saharan-africa': ['Nigeria', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'Rwanda', 'Senegal'],
                'europe': ['United Kingdom', 'Germany', 'France', 'Netherlands', 'Belgium', 'Spain', 'Italy', 'Sweden', 'Denmark', 'Portugal', 'Ireland', 'Norway', 'Switzerland'],
                'west-africa': ['Nigeria', 'Ghana', 'Senegal'],
                'east-africa': ['Kenya', 'Uganda', 'Tanzania', 'Rwanda']
            };

            const universities = await University.countDocuments({
                isActive: true,
                country: { $in: regionsMap[key] }
            });

            regionDetails[key] = {
                name,
                countries: regionsMap[key],
                universities
            };
        }

        res.json({
            success: true,
            regions: regionDetails
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Calculate APS Score
export const calculateAPS = async (req, res) => {
    try {
        const { subjects } = req.body;

        if (!subjects || !Array.isArray(subjects)) {
            return res.status(400).json({
                success: false,
                error: 'Please provide subjects array with name, percentage, and level'
            });
        }

        const pointsTable = {
            'HL': { 90: 8, 80: 7, 70: 6, 60: 5, 50: 4, 40: 3, 30: 2, 0: 1 },
            'SL': { 90: 7, 80: 6, 70: 5, 60: 4, 50: 3, 40: 2, 30: 1, 0: 0 },
            'other': { 90: 8, 80: 7, 70: 6, 60: 5, 50: 4, 40: 3, 30: 2, 0: 1 }
        };

        let totalAPS = 0;
        const subjectDetails = subjects.map(subject => {
            const percentage = Math.max(0, Math.min(100, subject.percentage));
            const level = subject.level || 'other';

            let points = 0;
            if (percentage >= 90) points = pointsTable[level][90];
            else if (percentage >= 80) points = pointsTable[level][80];
            else if (percentage >= 70) points = pointsTable[level][70];
            else if (percentage >= 60) points = pointsTable[level][60];
            else if (percentage >= 50) points = pointsTable[level][50];
            else if (percentage >= 40) points = pointsTable[level][40];
            else if (percentage >= 30) points = pointsTable[level][30];
            else points = pointsTable[level][0];

            totalAPS += points;

            return {
                subject: subject.name,
                percentage,
                level,
                points
            };
        });

        const interpretation = 
            totalAPS >= 42 ? "Excellent! You qualify for Medicine, Engineering and other competitive courses." :
            totalAPS >= 38 ? "Very Good! You qualify for most Bachelor's degree programmes." :
            totalAPS >= 34 ? "Good! You qualify for many degree programmes." :
            totalAPS >= 28 ? "Fair. You qualify for some degrees and most diploma programmes." :
            "Consider diploma programmes or improving your marks.";

        res.json({
            success: true,
            totalAPS,
            subjectDetails,
            interpretation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get sample courses (static data for top universities)
export const getSampleCourses = async (req, res) => {
    try {
        const SAMPLE_COURSES = {
            "uct": [
                { name: "Bachelor of Commerce", minAPS: 38, duration: "3 years", university: "University of Cape Town" },
                { name: "Bachelor of Science in Computer Science", minAPS: 42, duration: "3 years", university: "University of Cape Town" }
            ],
            "wits": [
                { name: "Bachelor of Science in Engineering", minAPS: 40, duration: "4 years", university: "University of the Witwatersrand" },
                { name: "Bachelor of Medical Science", minAPS: 38, duration: "3 years", university: "University of the Witwatersrand" }
            ],
            "up": [
                { name: "Bachelor of Medicine (MBChB)", minAPS: 45, duration: "6 years", university: "University of Pretoria" },
                { name: "Bachelor of Science in Engineering", minAPS: 39, duration: "4 years", university: "University of Pretoria" }
            ],
            "sun": [
                { name: "Bachelor of Laws", minAPS: 38, duration: "4 years", university: "Stellenbosch University" },
                { name: "Bachelor of Science in Agriculture", minAPS: 35, duration: "4 years", university: "Stellenbosch University" }
            ]
        };

        const universityId = req.query.university;
        let courses = [];

        if (universityId && SAMPLE_COURSES[universityId]) {
            courses = SAMPLE_COURSES[universityId];
        } else {
            Object.values(SAMPLE_COURSES).forEach(uniCourses => {
                courses = courses.concat(uniCourses);
            });
        }

        res.json({
            success: true,
            count: courses.length,
            courses
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
// Enhanced APS Calculator with course matching
export const calculateAPSDetailed = async (req, res) => {
    try {
        const { subjects, intendedField } = req.body;
        
        if (!subjects || !Array.isArray(subjects)) {
            return res.status(400).json({ error: 'Subjects array required' });
        }

        const { REAL_COURSES } = await import('../data/realCoursesData.js');
        const { REAL_UNIVERSITIES } = await import('../data/universitiesData.js');
        const { 
            calculateAPSPoints, 
            getAPSInterpretation, 
            getAdvice, 
            getConfidenceLevel,
            APS_GUIDELINES 
        } = await import('../utils/enhancedApsCalculator.js');

        let totalAPS = 0;
        const subjectDetails = [];
        let missingSubjects = [];

        // Calculate points for each subject
        subjects.forEach(subject => {
            const points = calculateAPSPoints(subject.percentage, subject.level);
            totalAPS += points;

            subjectDetails.push({
                subject: subject.name,
                percentage: Math.max(0, Math.min(100, parseInt(subject.percentage) || 0)),
                level: subject.level || 'other',
                points,
                meetsMinimum: parseInt(subject.percentage) >= 40
            });
        });

        // Check for recommended subjects
        if (intendedField && APS_GUIDELINES.recommendedSubjects[intendedField]) {
            const recommended = APS_GUIDELINES.recommendedSubjects[intendedField];
            const userSubjects = subjects.map(s => s.name.toLowerCase());
            
            missingSubjects = recommended.filter(subject => 
                !userSubjects.some(s => s.includes(subject.toLowerCase()))
            );
        }

        // Find matching courses
        const possibleCourses = [];
        const confidenceOrder = { "excellent": 1, "good": 2, "borderline": 3, "low": 4 };

        for (const [uniId, courses] of Object.entries(REAL_COURSES)) {
            const university = Object.values(REAL_UNIVERSITIES).find(u => u.id === uniId);
            
            courses.forEach(course => {
                if (totalAPS >= course.minAPS) {
                    const difference = totalAPS - course.minAPS;
                    const confidence = getConfidenceLevel(totalAPS, course.minAPS);

                    possibleCourses.push({
                        name: course.name,
                        university: university?.name || uniId,
                        universityType: university?.type,
                        minAPS: course.minAPS,
                        yourAPS: totalAPS,
                        margin: `+${difference}`,
                        confidence,
                        careerPaths: course.careerPaths,
                        duration: course.duration,
                        fees: course.fees
                    });
                }
            });
        }

        // Sort by confidence and margin
        possibleCourses.sort((a, b) => {
            if (a.confidence !== b.confidence) {
                return confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
            }
            return parseInt(b.margin) - parseInt(a.margin);
        });

        res.json({
            success: true,
            totalAPS,
            subjectDetails,
            interpretation: getAPSInterpretation(totalAPS),
            missingSubjects,
            possibleCourses: possibleCourses.slice(0, 20),
            advice: getAdvice(totalAPS, intendedField, missingSubjects),
            summary: {
                totalSubjects: subjects.length,
                averagePercentage: (subjects.reduce((sum, s) => sum + parseInt(s.percentage), 0) / subjects.length).toFixed(1),
                matchingCourses: possibleCourses.length
            }
        });
    } catch (error) {
        console.error('APS calculation error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Search courses across all universities with filters
export const searchCoursesAdvanced = async (req, res) => {
    try {
        const { q, minAps, maxAps, duration, university } = req.query;
        const { REAL_COURSES } = await import('../data/realCoursesData.js');
        const { REAL_UNIVERSITIES } = await import('../data/universitiesData.js');

        let results = [];

        for (const [uniId, courses] of Object.entries(REAL_COURSES)) {
            const uni = Object.values(REAL_UNIVERSITIES).find(u => u.id === uniId);

            // Filter by university if specified
            if (university && uniId !== university) continue;

            courses.forEach(course => {
                // Apply APS filters
                if (minAps && course.minAPS < parseInt(minAps)) return;
                if (maxAps && course.minAPS > parseInt(maxAps)) return;

                // Apply duration filter
                if (duration && course.durationYears !== parseInt(duration)) return;

                // Search query
                const searchQuery = q?.toLowerCase() || '';
                const matchesQuery = !searchQuery ||
                    course.name.toLowerCase().includes(searchQuery) ||
                    course.faculty.toLowerCase().includes(searchQuery) ||
                    (course.careerPaths && course.careerPaths.some(path => 
                        path.toLowerCase().includes(searchQuery)
                    ));

                if (matchesQuery) {
                    results.push({
                        id: course.id,
                        name: course.name,
                        code: course.code,
                        university: uni?.name || uniId,
                        universityId: uniId,
                        minAPS: course.minAPS,
                        duration: course.duration,
                        durationYears: course.durationYears,
                        faculty: course.faculty,
                        careerPaths: course.careerPaths,
                        requirements: course.requirements,
                        fees: course.fees,
                        notes: course.notes
                    });
                }
            });
        }

        // Sort by APS requirement (lowest first)
        results.sort((a, b) => a.minAPS - b.minAPS);

        res.json({
            success: true,
            count: results.length,
            results,
            filters: {
                query: q || 'none',
                minAps: minAps || 'any',
                maxAps: maxAps || 'any',
                duration: duration || 'any'
            }
        });
    } catch (error) {
        console.error('Course search error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get university details with all courses
export const getUniversityDetails = async (req, res) => {
    try {
        const { universityId } = req.params;
        const { REAL_COURSES } = await import('../data/realCoursesData.js');
        const { REAL_UNIVERSITIES } = await import('../data/universitiesData.js');

        const university = Object.values(REAL_UNIVERSITIES).find(u => u.id === universityId);
        
        if (!university) {
            return res.status(404).json({ error: 'University not found' });
        }

        const courses = REAL_COURSES[universityId] || [];

        const apsRange = courses.length > 0 ? {
            min: Math.min(...courses.map(c => c.minAPS)),
            max: Math.max(...courses.map(c => c.minAPS)),
            average: (courses.reduce((sum, c) => sum + c.minAPS, 0) / courses.length).toFixed(1)
        } : null;

        res.json({
            success: true,
            university: {
                ...university,
                coursesCount: courses.length,
                courses,
                faculties: [...new Set(courses.map(c => c.faculty))],
                apsRange
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};