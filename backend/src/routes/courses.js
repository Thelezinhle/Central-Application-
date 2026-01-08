import express from 'express';
import {
    getCourses,
    getCourseById,
    getCoursesByUniversity,
    searchCourses,
    getCoursesByLevel,
    getProgrammeRecommendations,
    getCoursesByCountry,
    getCoursesByRegion,
    getAvailableRegions,
    calculateAPS,
    getSampleCourses,
    calculateAPSDetailed,
    searchCoursesAdvanced,
    getUniversityDetails
} from '../controllers/courseController.js';

const router = express.Router();

// APS Calculator - must be before generic routes
router.post('/aps/calculate', calculateAPS);

// Enhanced APS Calculator with detailed course matching
router.post('/aps/calculate-detailed', calculateAPSDetailed);

// Sample courses endpoint
router.get('/sample', getSampleCourses);

// Advanced course search
router.get('/search-advanced', searchCoursesAdvanced);

// University details with courses
router.get('/universities/:universityId/details', getUniversityDetails);

// Get all courses
router.get('/', getCourses);

// Get available regions (must be before :region to avoid route conflicts)
router.get('/regions/list', getAvailableRegions);

// Get courses by region
router.get('/region/:region', getCoursesByRegion);

// Get courses by country
router.get('/country/:country', getCoursesByCountry);

// Get courses by level
router.get('/level/:level', getCoursesByLevel);

// Search courses
router.get('/search', searchCourses);

// Get all courses for a specific university
router.get('/university/:universityId', getCoursesByUniversity);

// Get specific course from university
router.get('/university/:universityId/course/:courseId', getCourseById);

// Get programme recommendations based on APS
router.post('/recommendations', getProgrammeRecommendations);

export default router;
