import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    uploadDocument,
    getDocuments,
    deleteDocument,
    downloadDocument
} from '../controllers/documentController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', authenticate, upload.single('document'), uploadDocument);
router.get('/:applicationId', authenticate, getDocuments);
router.delete('/:documentId', authenticate, deleteDocument);
router.get('/download/:documentId', authenticate, downloadDocument);

export default router;
