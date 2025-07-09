import express from 'express';
import { createSubmission, getUserSubmissions, getSubmissionById } from '../controllers/submissionController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// All submission routes require authentication
router.use(auth);

// Create a new submission
router.post('/', createSubmission);

// Get user's submissions
router.get('/', getUserSubmissions);

// Get a specific submission
router.get('/:submissionId', getSubmissionById);

export default router; 