import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getOneFoodById, getRelativeFoods } from '../../Apis/Apis';
import { FcLeft } from 'react-icons/fc';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// ⭐ Helper to generate star icons
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <>
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="orange" />)}
            {halfStar && <FaStarHalfAlt key="half" color="orange" />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="orange" />)}
        </>
    );
};

export default function FoodDetailed() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const { id } = useParams();

    const [foodDetailedData, setFoodDetailedData] = useState(null);
    const [relativeFoodData, setRelativeFoodData] = useState([]);

    useEffect(() => {
        const fetchFoodDetails = async () => {
            try {
                const response = await getOneFoodById(id);
                setFoodDetailedData(response);
            } catch (error) {
                console.error("Error fetching Food Detailed Data:", error);
            }
        };

        const fetchRelativeFoods = async () => {
            try {
                const response = await getRelativeFoods(id);
                console.log("Relative foods API response:", response); // <-- Add this
                if (response?.items && Array.isArray(response.items)) {
                    setRelativeFoodData(response.items);
                } else {
                    setRelativeFoodData([]);
                }
            } catch (error) {
                console.error("Error fetching Relative Food Data:", error);
                setRelativeFoodData([]);
            }
        };

        if (id) {
            fetchFoodDetails();
            fetchRelativeFoods();
        }
    }, [id]);

    if (!foodDetailedData) return <p>Loading...</p>;

    return (
        <div className='FoodDetailed'>
            {/* Header */}
            <div className='header'>
                <h2>This is Food Detailed Box</h2>
                <h5>
                    <FcLeft />
                    <p onClick={() => navigate('/menu')} style={{ cursor: 'pointer' }}>/ Menu</p>
                    <span>{currentPath}</span>
                </h5>
            </div>

            {/* Food Details Section */}
            <div className="food-details">
                <div>
                    <img src={foodDetailedData.foodImageUrl} alt={foodDetailedData.foodName} />
                </div>
                <div>
                    <p><strong>Name:</strong> {foodDetailedData.foodName}</p>
                    <p><strong>Description:</strong> {foodDetailedData.foodDescription}</p>
                    <p><strong>Price:</strong> ₹{foodDetailedData.foodPrice}</p>
                    <p><strong>Size:</strong> | S | M | L |</p>
                    <p><strong>Type:</strong> {foodDetailedData.foodType}</p>
                    <div>
                        <strong>Ratings:</strong>
                        <div>
                            {renderStars(foodDetailedData.foodRatings)}
                            <span>{foodDetailedData.foodRatings}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Placeholder */}
            <div>
                <h2>Feedback:</h2>
                <div>
                    <p>Customer feedback coming soon...</p>
                </div>
            </div>

            {/* Relative Food Cards */}
            <div className="card-group">
                {relativeFoodData.length > 0 ? (
                    relativeFoodData.map((item) => (
                        <div key={item._id} className='card'>
                            <div className="image">
                                <img src={item.foodImageUrl} alt={item.foodName} />
                            </div>
                            <div>
                                <h4>{item.foodName}</h4>
                                <h5>₹{item.foodPrice}</h5>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No related food items found.</p>
                )}
            </div>
        </div>
    );
}
