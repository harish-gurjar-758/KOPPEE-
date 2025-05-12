import FoodCategory from "../models/FoodCategory.modules.js";

// Add a Food Category
export const addFoodCategory = async (req, res) => {
    try {
        const { categoryName, categoryImageUrl } = req.body;

        const newFoodCategory = new FoodCategory({ categoryName, categoryImageUrl });

        await newFoodCategory.save();
        res.status(201).json({
            message: "Successfully added new Food Category!",
            foodCategory: newFoodCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Adding new Food Category",
            error: error.message
        });
    }
};

// Get all food Category list
export const getAllFoodCategory = async (req, res) => {
    try {
        const response = await FoodCategory.find();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Error Finfing the All Food Category",
            error: error.message
        });
    }
};

// get one food Category by id
export const getOneFoodCategoryById = async (req, res) => {
    try {
        const id = req.params;
        const response = await FoodCategory.findById(id);

        if (!response) {
            return res.status(400).json({ message: "Food Category not found" });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            message: "Error finding the food Category by ID",
            error: error.message
        });
    }
};

// Update food Category by id
export const updateFoodCategoryById = async (req, res) => {
    try {
        const id = req.params;
        const updates = res.body;

        const updatedFoodCategory = await FoodCategory.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedFoodCategory) {
            return res.status(404).json({
                message: "Food Category not found"
            });
        };

        res.status(200).json({
            message: "Updated the food category successfully!",
            foodCategory: updatedFoodCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Errorin Food Category Updating!",
            error: error.message
        });
    }
};

// Delete Food Category by Id
export const deleteFoodCategoryById = async (req, res) => {
    try {
        const id = req.params;
        const deletedFoodCategory = await FoodCategory.findByIdAndDelete(id);

        if (!deletedFoodCategory) {
            return res.status(404).json({
                message: "Food Category not found!"
            });
        }

        res.status(200).json({
            message: "Deleted the food category item successfully!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting food category",
            error: error.message
        });
    }
};