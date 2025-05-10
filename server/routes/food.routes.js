import express from 'express';
import {
    addFood,
    getAllFood,
    getOneFoodById,
    updateFoodById,
    deleteFoodById,
    getDiscountedFoods,
    getRelativeFoods,
    addRatingToFood,
    getFoodRatings
} from '../controllers/Food.controller.js';

const router = express.Router();

// Add a new food item
router.post('/', addFood);

// Get all food items
router.get('/', getAllFood);

// Get a single food item by ID
router.get('/:id', getOneFoodById);

// Update a food item by ID
router.put('/:id', updateFoodById);

// Delete a food item by ID
router.delete('/:id', deleteFoodById);

// Get all food items with a discount
router.get('/discounted/list', getDiscountedFoods);

// Get relative food items (same type)
router.get('/relative/:id', getRelativeFoods);

// Add a rating to a food item
router.post('/:id/ratings', addRatingToFood);

// Get total and average rating of a food item
router.get('/:id/ratings', getFoodRatings);

export default router;
