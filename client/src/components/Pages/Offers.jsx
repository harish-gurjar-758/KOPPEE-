import React, { useEffect, useState, useRef } from 'react';
import { getAllDescountFood } from '../../Apis/Apis';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
            // Manual autoplay using setInterval
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
                                                <div className="big-discount">{item.foodDescount}%</div>
                                                <div className="off-text">OFF</div>
                                            </div>
                                            <div className="logo-circle">
                                                <span className="logo-letter">U</span>
                                            </div>
                                        </div>
                                        {/* <h4>
                                            {item.foodDescount > 0 ? (
                                                <>
                                                    <span style={{ textDecoration: 'line-through', color: 'gray', marginLeft: '8px' }}>
                                                        ₹{item.foodPrice}
                                                    </span>{' '}
                                                    <span style={{ fontWeight: 'bold', color: 'green' }}>
                                                        ₹{Math.round(item.foodPrice * (1 - item.foodDescount / 100))}
                                                    </span>
                                                </>
                                            ) : (
                                                <>₹{item.foodPrice}</>
                                            )}
                                        </h4> */}
                                        <p className="legend">{item.foodName || 'Legend'}</p>
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

                    {/* Food Details Below */}
                    {discountFood.map((item, index) => (
                        <div key={item._id || index}>
                            <strong>{item.foodName || 'No name available'}</strong>
                            <img src={item.foodImageUrl} alt={item.foodName || 'Image'} width={100} />
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
                        </div>
                    ))}
                </>
            ) : (
                <p>No discounted food available.</p>
            )}
        </div>
    );
}
