import Food from '../models/Food.modules.js';

// Add a Food
export const addFood = async (req, res) => {
    try {
        const {
            foodName,
            foodType,
            foodPrice,
            foodImageUrl,
            foodDescount,
            foodDescription,
        } = req.body;

        const newFood = new Food({
            foodName,
            foodType,
            foodPrice,
            foodImageUrl,
            foodDescount,
            foodDescription,
        });

        await newFood.save();
        res.status(201).json({
            message: "Successfully added new Food!",
            food: newFood
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Adding new Food",
            error: error.message
        });
    }
};

// Get all Food List
export const getAllFood = async (req, res) => {
    try {
        const response = await Food.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Error Finding the All Food",
            error: error.message
        });
    }
};

// Get one food by id
export const getOneFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Food.findById(id);
        if (!response) {
            return res.status(404).json({ message: "Food not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Error finding the food by ID",
            error: error.message
        });
    }
};

// Update Food by Id
export const updateFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedFood = await Food.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedFood) {
            return res.status(404).json({ message: "Food not found" });
        }

        res.status(200).json({
            message: "Updated the Food successfully!",
            food: updatedFood
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in Food Updating!",
            error: error.message
        });
    }
};

// Get all discounted food items
export const getDiscountedFoods = async (req, res) => {
    try {
        const discountedFoods = await Food.find({ foodDescount: { $gt: 0 } });
        if (discountedFoods.length === 0) {
            return res.status(404).json({ message: "No discounted food items found." });
        }
        res.status(200).json({
            message: "Discounted food items retrieved successfully.",
            items: discountedFoods
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving discounted foods.",
            error: error.message
        });
    }
};

// Get Relative Food items
export const getRelativeFoods = async (req, res) => {
    try {
        const { id } = req.params;

        //Find the current food item
        const currentFood = await Food.findById(id);

        if (!currentFood) {
            return res.status(404).json({ message: "Food item not found" });
        }

        //Ensure foodType exists and is valid
        const { foodType } = currentFood;
        if (!foodType || typeof foodType !== 'string') {
            return res.status(400).json({ message: "Invalid food type in current food item" });
        }

        // Find other foods with same foodType, excluding the current one
        const relativeFoods = await Food.find({
            _id: { $ne: currentFood._id }, // ensure proper ObjectId comparison
            foodType: { $regex: new RegExp(`^${foodType}$`, 'i') } // case-insensitive match
        }).limit(60);

        // Return result
        res.status(200).json({
            message: "Relative food items found",
            items: relativeFoods
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching relative foods",
            error: error.message
        });
    }
};

// Add a rating
export const addRatingToFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5" });
        }

        const food = await Food.findById(id);
        if (!food) return res.status(404).json({ message: "Food not found" });

        food.foodRatings.push(rating);
        await food.save();

        res.status(200).json({ message: "Rating added successfully", food });
    } catch (err) {
        res.status(500).json({ message: "Error adding rating", error: err.message });
    }
};

// Get ratings summary
export const getFoodRatings = async (req, res) => {
    try {
        const { id } = req.params;
        const food = await Food.findById(id);

        if (!food) return res.status(404).json({ message: "Food not found" });

        const totalRatings = food.foodRatings.length;
        const averageRating =
            totalRatings > 0
                ? food.foodRatings.reduce((sum, r) => sum + r, 0) / totalRatings
                : 0;

        res.status(200).json({
            foodName: food.foodName,
            totalRatings,
            averageRating: averageRating.toFixed(1),
        });
    } catch (err) {
        res.status(500).json({ message: "Error fetching food ratings", error: err.message });
    }
};

// Delete Food by Id
export const deleteFoodById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await Food.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(404).json({ message: "Food not found!" });
        }

        res.status(200).json({ message: "Deleted the food item successfully!" });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting food",
            error: error.message
        });
    }
};
