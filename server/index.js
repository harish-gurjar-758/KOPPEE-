import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import reservationTable from './routes/reservation.routes.js'
import { createTable } from './controllers/Table.controllers.js';

dotenv.config();
const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes 
app.use('/api/reservation', reservationTable);
app.use('api/table/', createTable);

// Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
