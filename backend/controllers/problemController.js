import * as problemService from '../services/problemService.js';

// Create a new problem
export const createProblem = async (req, res) => {
  try {
    const problem = await problemService.createProblemService(req.body);
    res.status(201).json(problem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all problems
export const getAllProblems = async (req, res) => {
  try {
    const problems = await problemService.getAllProblemsService();
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch problems' });
  }
};

// Get problem by problemNumber
export const getProblemByNumber = async (req, res) => {
  try {
    const problemNumber = parseInt(req.params.problemNumber);
    const problem = await problemService.getProblemByNumberService(problemNumber);
    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update problem by problemNumber
export const updateProblemByNumber = async (req, res) => {
  try {
    const problemNumber = parseInt(req.params.problemNumber);
    const updated = await problemService.updateProblemByNumberService(problemNumber, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete problem by problemNumber
export const deleteProblemByNumber = async (req, res) => {
  try {
    const problemNumber = parseInt(req.params.problemNumber);
    const deleted = await problemService.deleteProblemByNumberService(problemNumber);
    if (!deleted) {
      return res.status(404).json({ error: 'Problem not found' });
    }
    res.status(200).json({ message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get problems by difficulty
export const getProblemsByDifficulty = async (req, res) => {
  try {
    const difficulty = req.params.difficulty;
    const problems = await problemService.getProblemsByDifficultyService(difficulty);
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get problems by topic
export const getProblemsByTopic = async (req, res) => {
  try {
    const topic = req.params.topic;
    const problems = await problemService.getProblemsByTopicService(topic);
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get problems by company
export const getProblemsByCompany = async (req, res) => {
  try {
    const company = req.params.company;
    const problems = await problemService.getProblemsByCompanyService(company);
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search problems by title
export const searchProblemsByTitle = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await problemService.searchProblemsByTitleService(query || '');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get problems by category
export const getProblemsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const problems = await problemService.getProblemsByCategoryService(category);
    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
