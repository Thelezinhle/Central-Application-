import express from 'express';
import {
    createApplication,
    getApplications,
    getApplicationById,
    updateApplication,
    submitApplication,
    changeOfMind,
    getApplicationStatus,
    withdrawApplication
} from '../controllers/applicationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, createApplication);
router.get('/', authenticate, getApplications);
router.get('/:id', authenticate, getApplicationById);
router.put('/:id', authenticate, updateApplication);
router.post('/:id/submit', authenticate, submitApplication);
router.post('/:id/change-of-mind', authenticate, changeOfMind);
router.get('/:id/status', authenticate, getApplicationStatus);
router.post('/:id/withdraw', authenticate, withdrawApplication);

export default router;
