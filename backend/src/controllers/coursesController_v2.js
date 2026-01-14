/**
 * Courses Controller - Enhanced
 * Handles course browsing with comprehensive filtering
 * Data source: South African universities
 */

import { 
  getCoursesByUniversity, 
  searchAllCourses,
  filterCourses,
  COMPREHENSIVE_COURSES_DATA
} from '../data/southAfricanCourses.js';

// University name mapping
const UNIVERSITY_NAMES = {
  'uct': 'University of Cape Town',
  'wits': 'University of the Witwatersrand',
  'up': 'University of Pretoria',
  'uj': 'University of Johannesburg',
  'su': 'Stellenbosch University',
  'ukzn': 'University of KwaZulu-Natal',
  'unisa': 'UNISA',
  'vut': 'Vaal University of Technology',
  'nmmu': 'Nelson Mandela University',
  'cput': 'Cape Peninsula University of Technology',
  'tut': 'Tshwane University of Technology'
};

/**
 * Get all courses across all universities
 * Supports filtering by: faculty, minAPS, maxAPS, search, duration, studyMode
 */
export const getAllCourses = async (req, res) => {
  try {
    const {
      search = '',
      faculty = '',
      minAPS = 0,
      maxAPS = 50,
      duration = '',
      studyMode = '',
      university = '',
      sortBy = 'name'
    } = req.query;

    let courses = [];

    // Get all courses
    if (search) {
      courses = searchAllCourses(search);
    } else {
      Object.entries(COMPREHENSIVE_COURSES_DATA).forEach(([uniId, uniCourses]) => {
        uniCourses.forEach(course => {
          courses.push({
            ...course,
            universityId: uniId
          });
        });
      });
    }

    // Apply filters
    if (minAPS || maxAPS) {
      const min = parseInt(minAPS);
      const max = parseInt(maxAPS);
      courses = courses.filter(c => c.minAPS >= min && c.minAPS <= max);
    }

    if (faculty) {
      courses = courses.filter(c => 
        c.faculty.toLowerCase().includes(faculty.toLowerCase())
      );
    }

    if (duration) {
      courses = courses.filter(c => c.durationYears === parseInt(duration));
    }

    if (studyMode) {
      courses = courses.filter(c => 
        c.studyMode.toLowerCase() === studyMode.toLowerCase()
      );
    }

    if (university) {
      courses = courses.filter(c => c.universityId === university);
    }

    // Sort results
    if (sortBy === 'minAPS') {
      courses.sort((a, b) => a.minAPS - b.minAPS);
    } else if (sortBy === 'name') {
      courses.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'duration') {
      courses.sort((a, b) => a.durationYears - b.durationYears);
    }

    // Count by university and add university names
    const coursesByUniversity = {};
    const coursesWithUniversityNames = courses.map(course => ({
      ...course,
      universityName: UNIVERSITY_NAMES[course.universityId] || course.universityId
    }));

    coursesWithUniversityNames.forEach(course => {
      if (!coursesByUniversity[course.universityId]) {
        coursesByUniversity[course.universityId] = {
          name: course.universityName,
          count: 0
        };
      }
      coursesByUniversity[course.universityId].count++;
    });

    res.json({
      success: true,
      count: coursesWithUniversityNames.length,
      coursesByUniversity,
      universities: Object.entries(UNIVERSITY_NAMES).map(([id, name]) => ({
        id,
        name
      })),
      filters: {
        search,
        faculty,
        minAPS,
        maxAPS,
        duration,
        studyMode,
        university
      },
      data: coursesWithUniversityNames
    });

  } catch (error) {
    console.error('Error in getAllCourses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses',
      message: error.message
    });
  }
};

/**
 * Get courses for a specific university
 */
export const getCoursesByUni = async (req, res) => {
  try {
    const { universityId } = req.params;
    const { faculty, minAPS, maxAPS } = req.query;

    let courses = getCoursesByUniversity(universityId);

    if (!courses || courses.length === 0) {
      return res.status(404).json({
        success: false,
        error: `No courses found for university: ${universityId}`
      });
    }

    // Apply filters
    if (faculty) {
      courses = courses.filter(c => 
        c.faculty.toLowerCase().includes(faculty.toLowerCase())
      );
    }

    if (minAPS) {
      courses = courses.filter(c => c.minAPS >= parseInt(minAPS));
    }

    if (maxAPS) {
      courses = courses.filter(c => c.minAPS <= parseInt(maxAPS));
    }

    const coursesWithUniversityName = courses.map(course => ({
      ...course,
      universityName: UNIVERSITY_NAMES[universityId] || universityId
    }));

    res.json({
      success: true,
      universityId,
      universityName: UNIVERSITY_NAMES[universityId] || universityId,
      count: coursesWithUniversityName.length,
      data: coursesWithUniversityName
    });

  } catch (error) {
    console.error('Error in getCoursesByUni:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch courses'
    });
  }
};

/**
 * Search courses across all universities
 */
export const searchCourses = async (req, res) => {
  try {
    const { q = '' } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Search query required'
      });
    }

    const results = searchAllCourses(q);
    const resultsWithNames = results.map(course => ({
      ...course,
      universityName: UNIVERSITY_NAMES[course.universityId] || course.universityId
    }));

    res.json({
      success: true,
      query: q,
      count: resultsWithNames.length,
      data: resultsWithNames
    });

  } catch (error) {
    console.error('Error in searchCourses:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
};

/**
 * Get available filters (faculties, universities, etc.)
 */
export const getFilterOptions = async (req, res) => {
  try {
    const faculties = new Set();
    const universities = {};
    const durations = new Set();

    Object.entries(COMPREHENSIVE_COURSES_DATA).forEach(([uniId, courses]) => {
      universities[uniId] = {
        id: uniId,
        name: UNIVERSITY_NAMES[uniId] || uniId,
        courseCount: courses.length
      };

      courses.forEach(course => {
        faculties.add(course.faculty);
        durations.add(course.durationYears);
      });
    });

    res.json({
      success: true,
      filters: {
        faculties: Array.from(faculties).sort(),
        universities: Object.values(universities).sort((a, b) => a.name.localeCompare(b.name)),
        durations: Array.from(durations).sort((a, b) => a - b),
        apsRange: { min: 30, max: 50 },
        studyModes: ["Full-time"]
      }
    });

  } catch (error) {
    console.error('Error in getFilterOptions:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch filter options'
    });
  }
};

/**
 * Get course details by ID
 */
export const getCourseDetails = async (req, res) => {
  try {
    const { universityId, courseId } = req.params;

    const courses = getCoursesByUniversity(universityId);
    const course = courses.find(c => c.id === courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: {
        ...course,
        universityId,
        universityName: UNIVERSITY_NAMES[universityId] || universityId
      }
    });

  } catch (error) {
    console.error('Error in getCourseDetails:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course details'
    });
  }
};
