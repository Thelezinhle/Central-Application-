import express from 'express';
import {
    getCourses,
    getCourseById,
    getCoursesByUniversity,
    searchCourses,
    getCoursesByLevel,
    getProgrammeRecommendations
} from '../controllers/courseController.js';

const router = express.Router();

// Get all courses
router.get('/', getCourses);

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
