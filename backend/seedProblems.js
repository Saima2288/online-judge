// seedProblems.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Problem from './models/problem.js';  // Adjust path as needed

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MongoDB connection URI
const mongoURI = process.env.MONGO_URI ;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

const seedProblems = async () => {
  try {
    // Read problems.json from the same folder
    const data = fs.readFileSync(path.join(__dirname, 'problems.json'), 'utf-8');
    const problems = JSON.parse(data);

    // Clear existing problems collection if needed
    await Problem.deleteMany({});

    // Insert problems into DB
    await Problem.insertMany(problems);
    console.log('✅ Problems seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding problems:', error);
    process.exit(1);
  }
};

const run = async () => {
  await connectDB();
  await seedProblems();
};

run();
