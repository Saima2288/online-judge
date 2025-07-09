import Submission from '../models/submission.js';
import Problem from '../models/problem.js';
import submitService from '../services/submitService.js';

export const createSubmission = async (req, res) => {
  try {
    const { problemNumber, code, language } = req.body;
    const userId = req.user._id;

    if (!problemNumber || !code || !language) {
      return res.status(400).json({ 
        success: false, 
        message: 'Problem number, code, and language are required' 
      });
    }

    // Get the problem
    const problem = await Problem.findOne({ problemNumber });
    if (!problem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Problem not found' 
      });
    }

    // Validate the submission
    const result = await submitService.validateSubmission(problemNumber, code, language);

    // Create submission record
    const submission = await Submission.create({
      user: userId,
      problem: problem._id,
      problemNumber,
      code,
      language,
      status: result.status,
      passedTests: result.passedTests,
      totalTests: result.totalTests,
      executionTime: result.executionTime,
      testResults: result.testResults,
      message: result.message
    });

    res.status(201).json({
      success: true,
      message: 'Submission created successfully',
      submission: {
        _id: submission._id,
        status: submission.status,
        passedTests: submission.passedTests,
        totalTests: submission.totalTests,
        executionTime: submission.executionTime,
        message: submission.message,
        createdAt: submission.createdAt
      }
    });

  } catch (error) {
    console.error('Submission creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create submission',
      error: error.message 
    });
  }
};

export const getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10, problemNumber } = req.query;

    const query = { user: userId };
    if (problemNumber) {
      query.problemNumber = parseInt(problemNumber);
    }

    const submissions = await Submission.find(query)
      .populate('problem', 'title difficulty')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await Submission.countDocuments(query);

    res.status(200).json({
      success: true,
      submissions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get submissions',
      error: error.message 
    });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const userId = req.user._id;

    const submission = await Submission.findOne({ _id: submissionId, user: userId })
      .populate('problem', 'title difficulty description');

    if (!submission) {
      return res.status(404).json({ 
        success: false, 
        message: 'Submission not found' 
      });
    }

    res.status(200).json({
      success: true,
      submission
    });

  } catch (error) {
    console.error('Get submission error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get submission',
      error: error.message 
    });
  }
}; 