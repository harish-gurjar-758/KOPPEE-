import express from 'express';
import { createReservation, deleteReservations, getAllReservations } from '../controllers/reservation.controllers.js';

const router = express.Router();

// router to Reserve a new table
router.post('/', createReservation);

// router for get all reserve tables
router.get('/',getAllReservations);

// router for delete an table reservation by ID
router.delete('/:id',deleteReservations);

export default router;