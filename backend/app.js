// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

config(); // Loads .env

const app = express();

// ✅ CORS setup - allow frontend access
app.use(cors({
  origin: 'http://localhost:5179',
  credentials: true,
}));


// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
import userRoutes from './routes/userRoutes.js';
app.use('/api/auth', userRoutes); // localhost:8080/api/auth/register

export default app;
