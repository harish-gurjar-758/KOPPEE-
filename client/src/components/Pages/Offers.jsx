import React, { useEffect, useState, useRef } from 'react';
import { getAllDescountFood } from '../../Apis/Apis';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FaAngleLeft, FaAngleRight, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// ⭐ Helper to generate star icons
const renderStars = (rating) => {
    const numericRating = Number(rating);

    // Validate the rating
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

// Main Function
export default function Offers() {
    const [discountFood, setDiscountFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const timerRef = useRef(null);

    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        slides: { perView: 1 },
        drag: true,
        renderMode: "performance",
        created: (s) => {
            clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                s.next();
            }, 3000);
        },
        destroyed: () => {
            clearInterval(timerRef.current);
        },
    });

    useEffect(() => {
        const fetchAllDiscountFoods = async () => {
            try {
                const response = await getAllDescountFood();
                const foodList = Array.isArray(response)
                    ? response
                    : Array.isArray(response?.data)
                        ? response.data
                        : Array.isArray(response?.items)
                            ? response.items
                            : [];
                setDiscountFood(foodList);
            } catch (err) {
                console.error("Error fetching the discount food", err);
                setError("Failed to fetch discount food.");
            } finally {
                setLoading(false);
            }
        };

        fetchAllDiscountFoods();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="Offers">
            {discountFood.length > 0 ? (
                <>
                    {/* Carousel */}
                    <div className="offers-carousel" style={{ position: 'relative' }}>
                        <div ref={sliderRef} className="keen-slider">
                            {discountFood.map((item, index) => (
                                <div className="keen-slider__slide" key={index}>
                                    <div>
                                        <div className="sale-badge">
                                            <div className="sale-text-vertical">SALE</div>
                                            <div className="discount-area">
                                                <div className="big-discount" style={{ color: "red" }}>
                                                    {item.foodDescount}%
                                                </div>
                                                <div className="off-text">OFF</div>
                                            </div>
                                            <div className="logo-circle">
                                                <span className="logo-letter">H</span>
                                            </div>
                                        </div>
                                        <h1 className="legend">{item.foodName || 'Legend'}</h1>
                                        <div>
                                            {(() => {
                                                const avgRating = getAverageRating(item.foodRatings);
                                                return (
                                                    <>
                                                        <div>{renderStars(avgRating)}</div>
                                                        {/* <p>{avgRating.toFixed(1)}</p> */}
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                    <div>
                                        <img
                                            src={item.foodImageUrl}
                                            alt={item.foodName}
                                            className="carousel-image"
                                            width={300}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation buttons */}
                        <div
                            className='carousel-btn carousel-btn-left'
                            onClick={() => slider.current?.prev()}
                        >
                            <FaAngleLeft />
                        </div>
                        <div
                            className='carousel-btn carousel-btn-right'
                            onClick={() => slider.current?.next()}
                        >
                            <FaAngleRight />
                        </div>
                    </div>
                    {/* ---- */}
                    <div className='heading'>
                        <h2>Offers on Foods</h2>
                    </div>
                    {/* ------ */}
                    <div className='offers-cards-container'>
                        <div className='offers-card-group'>
                            {discountFood.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className='offers-card'
                                >
                                    <div className='offers-card-detailes'>
                                        <strong>{item.foodName || 'No name available'}</strong>
                                        {item.foodDescount > 0 ? (
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
                                        )}
                                        <div className='offers-cards-ratings'>
                                            {(() => {
                                                const avgRating = getAverageRating(item.foodRatings);
                                                return (
                                                    <>
                                                        <div>{renderStars(avgRating)}</div>
                                                        <p>{avgRating.toFixed(1)} / 5</p>
                                                    </>
                                                );
                                            })()}
                                        </div>

                                    </div>
                                    <div className='offers-card-image'>
                                        <img src={item.foodImageUrl} alt={item.foodName || 'Image'} width={100} />
                                        <div className="offers-card-btn">ADD</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Food Details Below */}
                </>
            ) : (
                <p>No discounted food available.</p>
            )}
        </div>
    );
}
