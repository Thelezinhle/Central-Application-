import University from '../models/University.js';
import Course from '../models/Course.js';
import User from '../models/User.js';

// Get all courses from all universities
export const getCourses = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const hasCAO = req.query.hasCAO === 'true';

        // Simple filter
        let courseFilter = {};
        
        if (hasCAO) {
            // Get universities with CAO
            const caoUniversities = await University.find({ applicationSystem: 'CAO' }).select('_id').lean();
            const caoIds = caoUniversities.map(u => u._id.toString());
            courseFilter.university = { $in: caoIds };
        }

        // Get courses with pagination
        const courses = await Course.find(courseFilter)
            .populate('university', 'name code')
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Course.countDocuments(courseFilter);

        // Format response
        const data = courses.map(c => ({
            _id: c._id,
            code: c.code,
            name: c.name,
            university: c.university,
            cao: c.cao
        }));

        res.json({
            success: true,
            data,
            pagination: { page, limit, total, pages: Math.ceil(total / limit) }
        });
    } catch (error) {
        console.error('GetCourses Error:', error.message);
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

// Debug: Seed CAO data
export const seedCAOData = async (req, res) => {
    try {
        // Clear existing universities
        await University.deleteMany({});

        const CAO_INSTITUTIONS = [
            {
                name: 'University of KwaZulu-Natal',
                code: 'UKZN',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Durban', province: 'KwaZulu-Natal' },
                contact: { email: 'admissions@ukzn.ac.za' },
                isActive: true,
                courses: [
                    { code: 'BAS', name: 'Bachelor of Accounting Sciences', level: 'Bachelor', faculty: 'Commerce', department: 'Accounting', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 24 }, isActive: true },
                    { code: 'BCM', name: 'Bachelor of Commerce', level: 'Bachelor', faculty: 'Commerce', department: 'Business Administration', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 20 }, isActive: true },
                    { code: 'BSC', name: 'Bachelor of Science', level: 'Bachelor', faculty: 'Science', department: 'Physics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 26 }, isActive: true },
                    { code: 'ENG', name: 'Bachelor of Engineering: Civil', level: 'Bachelor', faculty: 'Engineering', department: 'Civil Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 28 }, isActive: true },
                    { code: 'LAW', name: 'Bachelor of Laws', level: 'Bachelor', faculty: 'Law', department: 'Law', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 30 }, isActive: true },
                    { code: 'MED', name: 'Bachelor of Medicine', level: 'Bachelor', faculty: 'Health Sciences', department: 'Medicine', studyMode: 'Full-time', duration: { value: 6, unit: 'years' }, aps: { minimumAPS: 32 }, isActive: true },
                ]
            },
            {
                name: 'Durban University of Technology',
                code: 'DUT',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Durban', province: 'KwaZulu-Natal' },
                contact: { email: 'admissions@dut.ac.za' },
                isActive: true,
                courses: [
                    { code: 'ENG', name: 'Bachelor of Engineering: Electrical', level: 'Bachelor', faculty: 'Engineering', department: 'Electrical Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 29 }, isActive: true },
                    { code: 'BIT', name: 'Bachelor of Information Technology', level: 'Bachelor', faculty: 'IT', department: 'Software Development', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 24 }, isActive: true },
                    { code: 'ENG2', name: 'Bachelor of Engineering: Mechanical', level: 'Bachelor', faculty: 'Engineering', department: 'Mechanical Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 28 }, isActive: true },
                    { code: 'BUS', name: 'Bachelor of Business Administration', level: 'Bachelor', faculty: 'Business', department: 'Business Administration', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 22 }, isActive: true },
                ]
            },
            {
                name: 'University of Johannesburg',
                code: 'UJ',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Johannesburg', province: 'Gauteng' },
                contact: { email: 'admissions@uj.ac.za' },
                isActive: true,
                courses: [
                    { code: 'LAW', name: 'Bachelor of Laws', level: 'Bachelor', faculty: 'Law', department: 'Law', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 31 }, isActive: true },
                    { code: 'ARC', name: 'Bachelor of Architecture', level: 'Bachelor', faculty: 'Built Environment', department: 'Architecture', studyMode: 'Full-time', duration: { value: 5, unit: 'years' }, aps: { minimumAPS: 26 }, isActive: true },
                    { code: 'ENG', name: 'Bachelor of Engineering: Electronic', level: 'Bachelor', faculty: 'Engineering', department: 'Electronic Engineering', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 30 }, isActive: true },
                ]
            },
            {
                name: 'University of Cape Town',
                code: 'UCT',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Cape Town', province: 'Western Cape' },
                contact: { email: 'admissions@uct.ac.za' },
                isActive: true,
                courses: [
                    { code: 'COM', name: 'Bachelor of Commerce', level: 'Bachelor', faculty: 'Commerce', department: 'Economics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 23 }, isActive: true },
                    { code: 'SCI', name: 'Bachelor of Science', level: 'Bachelor', faculty: 'Science', department: 'Biochemistry', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 27 }, isActive: true },
                ]
            },
            {
                name: 'Stellenbosch University',
                code: 'SUN',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Stellenbosch', province: 'Western Cape' },
                contact: { email: 'admissions@sun.ac.za' },
                isActive: true,
                courses: [
                    { code: 'AGR', name: 'Bachelor of Agricultural Sciences', level: 'Bachelor', faculty: 'Agriculture', department: 'Agronomy', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 23 }, isActive: true },
                    { code: 'VET', name: 'Bachelor of Veterinary Science', level: 'Bachelor', faculty: 'Agriculture', department: 'Veterinary Science', studyMode: 'Full-time', duration: { value: 5, unit: 'years' }, aps: { minimumAPS: 32 }, isActive: true },
                ]
            },
            {
                name: 'University of Pretoria',
                code: 'UP',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Pretoria', province: 'Gauteng' },
                contact: { email: 'admissions@up.ac.za' },
                isActive: true,
                courses: [
                    { code: 'PSY', name: 'Bachelor of Psychology', level: 'Bachelor', faculty: 'Humanities', department: 'Psychology', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 20 }, isActive: true },
                    { code: 'EDU', name: 'Bachelor of Education', level: 'Bachelor', faculty: 'Education', department: 'Teacher Education', studyMode: 'Full-time', duration: { value: 4, unit: 'years' }, aps: { minimumAPS: 18 }, isActive: true },
                ]
            },
            {
                name: 'Wits University',
                code: 'WITS',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Johannesburg', province: 'Gauteng' },
                contact: { email: 'admissions@wits.ac.za' },
                isActive: true,
                courses: [
                    { code: 'MUS', name: 'Bachelor of Music', level: 'Bachelor', faculty: 'Humanities', department: 'Music', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 19 }, isActive: true },
                    { code: 'ART', name: 'Bachelor of Fine Arts', level: 'Bachelor', faculty: 'Humanities', department: 'Visual Arts', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 18 }, isActive: true },
                ]
            },
            {
                name: 'Rhodes University',
                code: 'RU',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Grahamstown', province: 'Eastern Cape' },
                contact: { email: 'admissions@ru.ac.za' },
                isActive: true,
                courses: [
                    { code: 'ENG', name: 'Bachelor of English', level: 'Bachelor', faculty: 'Humanities', department: 'English', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 17 }, isActive: true },
                    { code: 'HST', name: 'Bachelor of History', level: 'Bachelor', faculty: 'Humanities', department: 'History', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 16 }, isActive: true },
                ]
            },
            {
                name: 'University of the Free State',
                code: 'UFS',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Bloemfontein', province: 'Free State' },
                contact: { email: 'admissions@ufs.ac.za' },
                isActive: true,
                courses: [
                    { code: 'BIO', name: 'Bachelor of Biological Sciences', level: 'Bachelor', faculty: 'Science', department: 'Biology', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 25 }, isActive: true },
                    { code: 'GEO', name: 'Bachelor of Geology', level: 'Bachelor', faculty: 'Science', department: 'Geology', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 26 }, isActive: true },
                ]
            },
            {
                name: 'North-West University',
                code: 'NWU',
                country: 'South Africa',
                type: 'public_university',
                applicationSystem: 'CAO',
                address: { city: 'Potchefstroom', province: 'North West' },
                contact: { email: 'admissions@nwu.ac.za' },
                isActive: true,
                courses: [
                    { code: 'MAT', name: 'Bachelor of Mathematics', level: 'Bachelor', faculty: 'Science', department: 'Mathematics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 28 }, isActive: true },
                    { code: 'STA', name: 'Bachelor of Statistics', level: 'Bachelor', faculty: 'Science', department: 'Statistics', studyMode: 'Full-time', duration: { value: 3, unit: 'years' }, aps: { minimumAPS: 27 }, isActive: true },
                ]
            },
        ];

        const result = await University.insertMany(CAO_INSTITUTIONS);

        res.json({
            success: true,
            message: `Seeded ${result.length} CAO institutions successfully`,
            data: result
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Debug: Check database status
export const checkDatabaseStatus = async (req, res) => {
    try {
        const totalUniversities = await University.countDocuments({});
        const caoUniversities = await University.countDocuments({ applicationSystem: 'CAO' });
        const totalCourses = await University.aggregate([
            { $unwind: '$courses' },
            { $count: 'total' }
        ]);

        res.json({
            success: true,
            database: {
                totalUniversities,
                caoUniversities,
                totalCourses: totalCourses[0]?.total || 0,
                status: caoUniversities > 0 ? 'Data Present' : 'Database Empty - Needs Seeding'
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};