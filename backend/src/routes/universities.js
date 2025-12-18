import express from 'express';
import {
    getUniversities,
    getUniversityById,
    createUniversity,
    updateUniversity,
    deleteUniversity
} from '../controllers/universityController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUniversities);
router.get('/:id', getUniversityById);
router.post('/', createUniversity); // Allow unauthenticated POST for seeding
router.put('/:id', authenticate, authorize('admin'), updateUniversity);
router.delete('/:id', authenticate, authorize('admin'), deleteUniversity);

export default router;
