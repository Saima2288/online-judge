import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8080'; // Update to your backend URL if needed

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Login request
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || 'Login failed',
    };
  }
};

// Register request
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', userData);
    console.log('✅ register success', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ register error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      stack: error.stack
    });
    return {
      error: error.response?.data?.message || error.message || 'Registration failed',
      details: error.response?.data
    };
  }
};

// Fetch all problems
export const fetchProblems = async () => {
  try {
    const response = await axiosInstance.get('/api/problems');
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Failed to fetch problems' };
  }
};

// ✅ Fetch single problem by problemNumber instead of ID
export const fetchProblemByNumber = async (problemNumber) => {
  try {
    const response = await axiosInstance.get(`/api/problems/${problemNumber}`);
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.message || 'Failed to fetch problem' };
  }
};
