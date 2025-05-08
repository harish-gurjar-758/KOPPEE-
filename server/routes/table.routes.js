import express from 'express';
import { addTable } from '../controllers/Table.controllers.js';

const router = express.Router();

router.post('/', addTable);

export default router;
