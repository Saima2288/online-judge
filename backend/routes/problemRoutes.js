import express from 'express';
import {
  getAllProblems,
  getProblemByNumber,
  createProblem,
  updateProblemByNumber,
  deleteProblemByNumber,
  getProblemsByDifficulty,
  getProblemsByCategory,
  getProblemsByCompany
} from '../controllers/problemController.js';

import { auth } from '../middleware/auth.js';
import isAdmin from '../middleware/isAdmin.js';

const router = express.Router();

// Public routes - more specific first
router.get('/', getAllProblems);                                // GET all problems
router.get('/difficulty/:difficulty', getProblemsByDifficulty); // GET by difficulty (Easy/Medium/Hard)
router.get('/category/:category', getProblemsByCategory);       // GET by category (Array/String/etc)
router.get('/company/:company', getProblemsByCompany);          // GET by company

// Catch-all problemNumber route must come last to prevent conflicts
router.get('/:problemNumber', getProblemByNumber);              // GET by problem number

// Admin-only routes (with auth)
router.post('/', auth, isAdmin, createProblem);         // CREATE problem
router.put('/:problemNumber', auth, isAdmin, updateProblemByNumber); // UPDATE problem
router.delete('/:problemNumber', auth, isAdmin, deleteProblemByNumber); // DELETE problem

export default router;
