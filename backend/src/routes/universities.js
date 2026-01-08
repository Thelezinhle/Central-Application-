import express from 'express';
import {
    getUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity,
    searchUniversitiesAPI,
    seedFromAPI,
    searchEnriched,
    getFilteredUniversities,
    getAllSouthAfricanUniversities,
    getUniversitiesByProvince
} from '../controllers/universityController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// ✅ FILTERED UNIVERSITIES ONLY (NO AUTH NEEDED)
router.get('/filtered', getFilteredUniversities);

// ✅ GET ALL REAL SOUTH AFRICAN UNIVERSITIES
router.get('/south-africa/all', getAllSouthAfricanUniversities);

// ✅ GET UNIVERSITIES BY PROVINCE
router.get('/province/:province', getUniversitiesByProvince);

// Multi-source enriched search (NO AUTH needed)
router.get('/search/enriched', searchEnriched);

// Search from free API (no auth required)
router.get('/search/global', searchUniversitiesAPI);

// Standard CRUD
router.get('/', getUniversities);
router.get('/:id', getUniversityById);
router.post('/', createUniversity);
router.put('/:id', authenticate, authorize('admin'), updateUniversity);
router.delete('/:id', authenticate, authorize('admin'), deleteUniversity);

// Seed from API (admin only)
router.post('/seed/from-api', authenticate, authorize('admin'), seedFromAPI);

export default router;
