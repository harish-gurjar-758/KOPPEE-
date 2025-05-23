import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import reservationTable from './routes/reservation.routes.js'
import addTable from './routes/table.routes.js';
import employee from './routes/employee.routes.js'
import food from './routes/food.routes.js';
import foodCategory from './routes/foodCategory.routes.js'

dotenv.config();
const app = express();

// MongoDB Connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes 
app.use('/api/reservation', reservationTable);
app.use('/api/table', addTable);
app.use('/api/employee', employee);
app.use('/api/food', food);
app.use('/api/food-category', foodCategory);

// Start Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
