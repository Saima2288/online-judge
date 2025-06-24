// app.js
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';

config(); 

const app = express();



app.use(cors({
  origin: 'http://localhost:5173',  // Use your actual frontend URL
  credentials: true
}));



// ✅ Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
import problemRoutes from './routes/problemRoutes.js'
import userRoutes from './routes/userRoutes.js';
app.use('/api/auth', userRoutes); // localhost:8080/api/auth/register

app.use('/api/problems', problemRoutes);




export default app;
