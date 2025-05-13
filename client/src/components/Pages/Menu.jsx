import React, { useEffect, useState } from 'react';
import { getAllFood, getAllFoodCategory } from '../../Apis/Apis';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

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

// Main Component
export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;
    const [foodList, setFoodList] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchFoodCategory = async () => {
            try {
                const response = await getAllFoodCategory();
                setFoodCategory(response);
            } catch (error) {
                console.error("Error Fetching Food Category List:", error);
            }
        };

        const fetchFoodList = async () => {
            try {
                const response = await getAllFood();
                setFoodList(response);
            } catch (error) {
                console.error("Error fetching Food List:", error);
            }
        };

        fetchFoodList();
        fetchFoodCategory();
    }, []);

    const handleCategoryClick = (categoryName) => {
        setSelectedCategory(categoryName);
    };

    // Corrected filtering logic
    const filteredFoodList = selectedCategory
        ? foodList.filter(item => item.foodType === selectedCategory)
        : foodList;

    return (
        <div className='MainContainer menu-page'>
            <div className="menu-page-hero">
                <div className='menu-page-hero-box'>
                    <h1>Food Menu</h1>
                    <h5>Coffee{currentPath}</h5>
                </div>
            </div>

            {/* Food Categories */}
            <div className='menu-food-type-group'>
                {/* All Category */}
                <div
                    className={`card ${selectedCategory === null ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(null)}
                    style={{ cursor: 'pointer' }}
                >
                    <h2>All</h2>
                </div>

                {/* Individual Categories */}
                {foodCategory.map((item, index) => (
                    <div
                        className={`card ${selectedCategory === item.categoryName ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleCategoryClick(item.categoryName)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img src={item.categoryImageUrl} alt={item.categoryName} />
                        <h3>{item.categoryName}</h3>
                    </div>
                ))}
            </div>

            {/* 🍽 Food Items */}
            <div className='card-group'>
                {filteredFoodList.map((item, index) => (
                    <div
                        key={index}
                        className='card'
                        onClick={() => navigate(`/food-detailed-section/${item._id}`)}
                    >
                        <div className='card-top-box'>
                            <div className='image'>
                                <img src={item.foodImageUrl} alt={item.foodName} />
                            </div>
                            <div className='card-details-box'>
                                <h3>{item.foodName}</h3>
                                {/* <p>{item.foodDescription}</p> */}
                                {
                                    item.foodDescount > 0 ? (
                                        <div>
                                            <h4>
                                                <span style={{ fontWeight: 'bold', color: 'green' }}>
                                                    ₹{Math.round(item.foodPrice * (1 - item.foodDescount / 100))}
                                                </span>{' '}
                                                <span style={{ textDecoration: 'line-through', color: 'gray', marginLeft: '8px' }}>
                                                    ₹{item.foodPrice}
                                                </span>
                                            </h4>
                                            <h4 style={{ color: 'red' }}>{item.foodDescount}% OFF</h4>
                                        </div>
                                    ) : (
                                        <h4>₹{item.foodPrice}</h4>
                                    )
                                }
                            </div>
                        </div>
                        <div className='card-bottom-box'>
                            <div>
                                <div>{renderStars(item.foodRatings)}</div>
                                <p>{item.foodRatings}</p>
                            </div>
                            <div className="card-btn-group">
                                <div className="btn">Add Card</div>
                                <div className="btn">Order</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
