// src/routes/globalUniversities.js
// This file defines routes for accessing global university data

import express from 'express';
import {
    getAllUniversitiesController,
    getUniversitiesByCountryController,
    searchUniversitiesController,
    getCountriesController,
} from '../controllers/globalUniversitiesController.js';

const router = express.Router();

/**
 * Public routes (no authentication needed)
 * These are used by the frontend to search and browse universities
 */

// Get all universities with pagination
// GET /api/global-universities?page=1&limit=50
router.get('/', getAllUniversitiesController);

// Get universities by country
// GET /api/global-universities/by-country/south%20africa
router.get('/by-country/:country', getUniversitiesByCountryController);

// Search universities by name
// GET /api/global-universities/search?query=harvard
router.get('/search', searchUniversitiesController);

// Get all available countries
// GET /api/global-universities/countries
router.get('/countries', getCountriesController);

export default router;
