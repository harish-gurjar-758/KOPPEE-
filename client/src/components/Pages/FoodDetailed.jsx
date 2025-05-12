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

// Main Components
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
                setRelativeFoodData(response);
            } catch (error) {
                console.error("Error fetching Relative Food Data:", error);
            }
        }

        // only fetch if id is available
        if (id) fetchFoodDetails();
        if (id) fetchRelativeFoods();
    }, [id]);

    // Loading state
    if (!foodDetailedData) return <p>Loading...</p>;

    return (
        <div className='FoodDetailed'>
            <div className='header'>
                <h2>This is Food Detailed Box</h2>
                <h5>
                    <FcLeft />
                    <p onClick={() => navigate('/menu')}>/ Menu</p>
                    {currentPath}
                </h5>
            </div>

            {/* Food Details */}
            <div>
                <div>
                    <div>
                        <img src={foodDetailedData.foodImageUrl} alt={foodDetailedData.foodName} style={{ width: '200px' }} />
                    </div>
                    <div>
                        <p>Name: {foodDetailedData.foodName}</p>
                        <p>Description: {foodDetailedData.foodDescription}</p>
                        <div>
                            <p>Price: ₹{foodDetailedData.foodPrice}</p>
                            {/* Size */}
                            <p>Size : | S | M | L | </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        {/* Food Type */}
                        <h5> Food Type : {foodDetailedData.foodType}</h5>

                        {/* Food Ratings */}
                        <div>
                            <div>{renderStars(foodDetailedData.foodRatings)}</div>
                            <h5>Ratings : {foodDetailedData.foodRatings && 0}</h5>
                        </div>
                    </div>
                    <h2>FeedBack :- </h2>
                    <div>

                    </div>
                </div>
            </div>

            {/* Relative Food Cards */}
            <div className="card-group">
                {relativeFoodData.map((index, item) => (
                    <div key={index} className='card'>
                        <div className="image">
                            <img src={item.foodImageUrl} alt={item.foodName} />
                        </div>
                        <div>
                            <h4>{item.foodName}</h4>
                            <h5>{item.foodPrice}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
