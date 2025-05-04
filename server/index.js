import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));