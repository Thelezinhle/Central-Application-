import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    initializePayment,
    verifyPayment,
    getPaymentHistory,
    downloadReceipt
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/initialize', authenticate, initializePayment);
router.post('/verify', authenticate, verifyPayment);
router.get('/history', authenticate, getPaymentHistory);
router.get('/receipt/:transactionId', authenticate, downloadReceipt);

export default router;
