import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    getDashboardStats,
    getApplicationsAnalytics,
    getUniversitiesAnalytics,
    getUsersAnalytics,
    generateReport,
    getSystemHealth
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard', authenticate, authorize('admin'), getDashboardStats);
router.get('/analytics/applications', authenticate, authorize('admin'), getApplicationsAnalytics);
router.get('/analytics/universities', authenticate, authorize('admin'), getUniversitiesAnalytics);
router.get('/analytics/users', authenticate, authorize('admin'), getUsersAnalytics);
router.get('/reports/:reportType', authenticate, authorize('admin'), generateReport);
router.get('/health', authenticate, authorize('admin'), getSystemHealth);

export default router;
