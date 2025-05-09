import express from 'express';
import { addEmployee, blockEmployee, deleteEmployee } from '../controllers/Employee.controller.js';

const router = express.Router();

// Router to Add a new Employee
router.post('/', addEmployee);

// Router to Login a Employee


// Router to delete a Employee
router.delete('/:id', deleteEmployee);

// Router to blocked any employee
router.patch('/blocked/:id', blockEmployee)

export default router;