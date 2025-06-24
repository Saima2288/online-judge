// services/problemService.js
import Problem from '../models/problem.js';

// Create a new problem
export const createProblem = async (data) => {
  const problem = new Problem(data);
  return await problem.save();
};

// Get all problems, sorted by problemNumber instead of difficulty
export const getAllProblems = async () => {
  return await Problem.find().sort({ problemNumber: 1 }); // changed sorting
};

// Get a single problem by problemNumber
export const getProblemByNumber = async (problemNumber) => {
  return await Problem.findOne({ problemNumber }); // changed from findById
};

// Update a problem by problemNumber
export const updateProblemByNumber = async (problemNumber, data) => {
  return await Problem.findOneAndUpdate({ problemNumber }, data, { new: true }); // changed from findByIdAndUpdate
};

// Delete a problem by problemNumber
export const deleteProblemByNumber = async (problemNumber) => {
  return await Problem.findOneAndDelete({ problemNumber }); // changed from findByIdAndDelete
};
