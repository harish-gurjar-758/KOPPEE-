import express from 'express';
import {
    addFoodCategory,
    getAllFoodCategory,
    getOneFoodCategoryById,
    updateFoodCategoryById,
    deleteFoodCategoryById
} from '../controllers/FoodCategory.controllers.js';

const router = express.Router();

// Add a new food category item
router.post('/', addFoodCategory);

// Get all food category items
router.get('/', getAllFoodCategory);

// Get a single food category item by ID
router.get('/:id', getOneFoodCategoryById);

// Update a food category item by ID
router.put('/:id', updateFoodCategoryById);

// Delete a food category item by ID
router.delete('/:id', deleteFoodCategoryById);

export default router;