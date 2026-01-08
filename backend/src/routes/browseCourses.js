/**
 * Courses Routes - Browse & Search
 * Endpoints for browsing and searching courses
 */

import express from 'express';
import {
  getAllCourses,
  getCoursesByUni,
  searchCourses,
  getFilterOptions,
  getCourseDetails
} from '../controllers/coursesController_v2.js';

const router = express.Router();

/**
 * GET /api/browse-courses
 * Get all courses with optional filters
 * Query params: search, faculty, minAPS, maxAPS, duration, studyMode, university, sortBy
 */
router.get('/', getAllCourses);

/**
 * GET /api/browse-courses/filters
 * Get available filter options
 */
router.get('/filters', getFilterOptions);

/**
 * GET /api/browse-courses/search
 * Search courses by query
 * Query params: q (search term)
 */
router.get('/search', searchCourses);

/**
 * GET /api/browse-courses/:universityId
 * Get courses for a specific university
 * Query params: faculty, minAPS, maxAPS
 */
router.get('/:universityId', getCoursesByUni);

/**
 * GET /api/browse-courses/:universityId/:courseId
 * Get details for a specific course
 */
router.get('/:universityId/:courseId', getCourseDetails);

export default router;
