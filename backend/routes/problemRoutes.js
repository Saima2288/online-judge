import express from 'express';
import {
  getAllProblems,
  getProblemByNumber,
  createProblem,
  updateProblemByNumber,
  deleteProblemByNumber
} from '../controllers/problemController.js';

import authenticate from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// routes/problemRoutes.js
router.get('/', getAllProblems); // ✅ http://127.0.0.1:8080/api/problems
router.get('/:problemNumber', getProblemByNumber); // ✅ http://127.0.0.1:8080/api/problems/1

// Admin-only (with auth middleware)
router.post('/', authenticate, isAdmin, createProblem);
router.put('/:problemNumber', authenticate, isAdmin, updateProblemByNumber);
router.delete('/:problemNumber', authenticate, isAdmin, deleteProblemByNumber);

export default router;
