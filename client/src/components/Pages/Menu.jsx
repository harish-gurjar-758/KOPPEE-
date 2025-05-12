import React, { useEffect, useState } from 'react'
import { getAllFood } from '../../Apis/Apis';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

// ⭐ Helper to generate star icons:
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <>
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="orange" />)}
            {halfStar && <FaStarHalfAlt color="orange" />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="orange" />)}
        </>
    );
};

// main Function
export default function Menu() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [foodList, setFoodList] = useState([]);
    useEffect(() => {
        const fetchFoodList = async () => {
            try {
                const response = await getAllFood();
                setFoodList(response);
            } catch (error) {
                console.error("Error fetching Food List : ", error);
            }
        }
        fetchFoodList();
    }, []);
    return (
        <div className='MainContainer menu-page'>
            <div className="menu-page-hero">
                <div className='menu-page-hero-box'>
                    <h1>Food Menu</h1>
                    <h5>Coffee{currentPath}</h5>
                </div>
            </div>
            <div className='menu-food-type-group'>
                <div>
                    <img src="" alt="" />
                    <h3>Food Type</h3>
                </div>
            </div>
            <div className='card-group'>
                {foodList.map((item, index) => (
                    <div key={index} className='card'>
                        <div className='card-top-box'>
                            <div className='image'>
                                <img src={item.foodImageUrl} alt={item.foodName} />
                            </div>
                            <div className='card-details-box'>
                                <h3>{item.foodName}</h3>
                                <p>{item.foodDescription}</p>
                                <div>
                                    <div>
                                        {renderStars(item.foodRatings)}
                                    </div>
                                    <p>{item.foodRatings}</p>
                                </div>
                            </div>
                        </div>
                        <div className='card-bottom-box'>
                            <h4>₹ : {item.foodPrice}/-</h4>
                            <div className="card-btn-group">
                                <div className="btn">Add Card</div>
                                <div className="btn">Order</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
