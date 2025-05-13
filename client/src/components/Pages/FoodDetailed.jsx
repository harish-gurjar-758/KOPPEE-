import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addRatingToFood, getFoodRatings, getOneFoodById, getRelativeFoods } from '../../Apis/Apis';
import { FcLeft } from 'react-icons/fc';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// ⭐ Helper to generate star icons
const renderStars = (rating) => {
    const numericRating = Number(rating);

    if (isNaN(numericRating) || numericRating < 0 || numericRating > 5) {
        return <p style={{ color: "gray" }}>No Rating</p>;
    }

    const fullStars = Math.floor(numericRating);
    const halfStar = numericRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <>
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="orange" />)}
            {halfStar && <FaStarHalfAlt key="half" color="orange" />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="orange" />)}
        </>
    );
};

// 🔢 Helper to calculate average from foodRatings array
const getAverageRating = (ratings) => {
    if (!Array.isArray(ratings) || ratings.length === 0) return 0;

    const total = ratings.reduce((sum, item) => {
        const value = typeof item === 'number' ? item : item?.rating;
        return sum + (typeof value === 'number' ? value : 0);
    }, 0);

    return total / ratings.length;
};

export default function FoodDetailed() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const { id } = useParams();

    const [foodDetailedData, setFoodDetailedData] = useState(null);
    const [relativeFoodData, setRelativeFoodData] = useState([]);
    const [ratingFormData, setRatingFormData] = useState({
        userFullName: '',
        rating: '',
        message: ''
    });
    const [foodRatingData, setFoodRatingData] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRatingFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            if (!ratingFormData.userFullName || !ratingFormData.rating || !ratingFormData.message) {
                alert("Please fill in all required fields.");
                return;
            }

            await addRatingToFood(id, ratingFormData)
            alert("Submitted your ratings and feedback! Thank you.");
            setRatingFormData({
                userFullName: '',
                rating: '',
                message: ''
            });
        } catch (error) {
            console.error('Rating and Feedback submission failed!', error);
            alert("Failed to submit. Try again.");
        }
    }

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

        // Get food ratings 
        const fetchFoodRatingsFeedback = async () => {
            try {
                const response = await getFoodRatings(id);
                setFoodRatingData(response);
                console.log(response)
            } catch (error) {
                console.error("Error fetching Food Rating Data:", error);
            }
        };


        if (id) {
            fetchFoodDetails();
            fetchRelativeFoods();
            fetchFoodRatingsFeedback();
        }
    }, [id]);

    if (!foodDetailedData) return <p>Loading...</p>;

    const avgRating = getAverageRating(foodDetailedData.foodRatings);

    return (
        <div className='FoodDetailed'>
            <div className='header'>
                <h2>This is Food Detailed Box</h2>
                <h5>
                    <FcLeft />
                    <p onClick={() => navigate('/menu')} style={{ cursor: 'pointer', textDecoration: 'underline' }}>/ Menu</p>
                    <span>{currentPath}</span>
                </h5>
            </div>

            <div className="food-details">
                <div className='food-details-left'>
                    <div className='image'>
                        <img className='large-image' src={foodDetailedData.foodImageUrl} alt={foodDetailedData.foodName} />
                        <img className='small-image' src={foodDetailedData.foodImageUrl} alt={foodDetailedData.foodName} />
                    </div>
                    <div>
                        <h3>Customize your foodType here</h3>
                        <div>
                            <h5>Size</h5>
                            <div>
                                <h5>Small</h5>
                                <h5>Medim</h5>
                                <h5>Large</h5>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Quantity</h3>
                        <div>
                            <div>-</div>
                            <p>1</p>
                            <div>+</div>
                        </div>
                    </div>

                    <div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder='Your Full Name'
                                name='userFullName'
                                value={ratingFormData.userFullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="number"
                                placeholder='Food Rating (1-5)'
                                name='rating'
                                value={ratingFormData.rating}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder='Write your Feedback'
                                name='message'
                                value={ratingFormData.message}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="btn btn-add" onClick={handleSubmit}>
                            Submit
                        </div>
                    </div>
                </div>

                <div className='food-details-right'>
                    <div>
                        <h1>{foodDetailedData.foodName}</h1>
                        <p>{foodDetailedData.foodType}</p>
                    </div>
                    <div>
                        <div>
                            {renderStars(avgRating)}
                            <span>{avgRating.toFixed(1)}</span>
                        </div>
                    </div>
                    {
                        foodDetailedData.foodDescount > 0 ? (
                            <div>
                                <p>
                                    <span style={{ fontWeight: 'bold', color: 'green' }}>
                                        ₹{Math.round(foodDetailedData.foodPrice * (1 - foodDetailedData.foodDescount / 100))}
                                    </span>{' '}
                                    <span style={{ textDecoration: 'line-through', color: 'gray', marginLeft: '8px' }}>
                                        ₹{foodDetailedData.foodPrice}
                                    </span>
                                </p>
                                <p style={{ color: 'red' }}>{foodDetailedData.foodDescount}% OFF</p>
                            </div>
                        ) : (
                            <p>₹{foodDetailedData.foodPrice}</p>
                        )
                    }
                    <div>
                        <h3>Product description</h3>
                        <p>{foodDetailedData.foodDescription}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2>Feedback:</h2>
                <div>
                    {foodRatingData.length > 0 ?
                        (
                            foodRatingData.map((item, index) => (
                                <div key={index}>
                                    <div>
                                        <img src='https://th.bing.com/th/id/OIP.7O4_GREtLbxqPdJCTmfatQHaHa?rs=1&pid=ImgDetMain'alt={item.userFullName}/>
                                        <h5>{item.userFullName}</h5>
                                        <div>
                                            {/* show the stars in this div and how the rating number form 5  */}
                                        </div>
                                    </div>
                                    <p>{item.message}</p>
                                </div>
                            ))
                        ) : (
                            <p>Customer feedback coming soon...</p>
                        )
                    }
                </div>
            </div>

            <div className="relative-card-group">
                {relativeFoodData.length > 0 ? (
                    relativeFoodData.map((item) => (
                        <div key={item._id} className='relative-card'>
                            <div className="image">
                                <img src={item.foodImageUrl} alt={item.foodName} />
                            </div>
                            <div className='details'>
                                <h4>{item.foodName}</h4>
                                {
                                    item.foodDescount > 0 ? (
                                        <div>
                                            <p>
                                                <span style={{ fontWeight: 'bold', color: 'green' }}>
                                                    ₹{Math.round(item.foodPrice * (1 - item.foodDescount / 100))}
                                                </span>{' '}
                                                <span style={{ textDecoration: 'line-through', color: 'gray', marginLeft: '8px' }}>
                                                    ₹{item.foodPrice}
                                                </span>
                                            </p>
                                            <p style={{ color: 'red' }}>{item.foodDescount}% OFF</p>
                                        </div>
                                    ) : (
                                        <p>₹{item.foodPrice}</p>
                                    )
                                }
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No related food items found.</p>
                )}
            </div>
        </div >
    );
}
