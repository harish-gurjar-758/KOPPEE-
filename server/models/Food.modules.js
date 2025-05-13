import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    foodType: {
        type: String,
        required: true,
    },
    foodPrice: {
        type: Number,
        required: true,
    },
    foodImageUrl: {
        type: String,
        required: true,
    },
    foodDescount: {
        type: Number,
    },
    foodDescription: {
        type: String,
    },
    foodRatings: [
        {
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            message: {
                type: String
            },
            userFullName: {
                type: String
            }
        }
    ]
});

const Food = mongoose.model('Food', foodSchema);
export default Food;