import express from 'express';
import {
  getAllProblems,
  getProblemByNumber,
  getProblemsByDifficulty,
  getProblemsByCategory,
  getProblemsByCompany
} from '../controllers/problemController.js';

const router = express.Router();

router.get('/', getAllProblems);
router.get('/difficulty/:difficulty', getProblemsByDifficulty);
router.get('/category/:category', getProblemsByCategory);
router.get('/company/:company', getProblemsByCompany);
router.get('/:problemNumber', getProblemByNumber);

export default router;
