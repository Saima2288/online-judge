// controllers/problemController.js
import * as problemService from '../services/problemService.js';
import Problem from '../models/problem.js';

// Create a new problem
export const createProblem = async (req, res) => {
  try {
    const problem = await problemService.createProblem(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all problems


export const getAllProblems = async (req, res) => {
  try {
    const problems = await problemService.getAllProblems();
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
};



// Get a single problem by problemNumber
export const getProblemByNumber = async (req, res) => {
  try {
    const problem = await problemService.getProblemByNumber(req.params.problemNumber);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a problem by problemNumber
export const updateProblemByNumber = async (req, res) => {
  try {
    const updated = await problemService.updateProblemByNumber(req.params.problemNumber, req.body);
    if (!updated) return res.status(404).json({ error: 'Problem not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a problem by problemNumber
export const deleteProblemByNumber = async (req, res) => {
  try {
    const deleted = await problemService.deleteProblemByNumber(req.params.problemNumber);
    if (!deleted) return res.status(404).json({ error: 'Problem not found' });
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
