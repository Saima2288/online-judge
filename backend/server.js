import app from './app.js';
import connectDB from './database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
  console.log(`Server running or ${PORT}`)
})

connectDB();