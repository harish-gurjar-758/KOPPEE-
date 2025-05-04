import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // ✅ extension added

dotenv.config();
const app = express();

// MongoDB Connection
connectDB();

// Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
