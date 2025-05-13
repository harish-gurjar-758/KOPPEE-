import React, { useEffect, useState } from 'react';
import { getAllDescountFood } from '../../Apis/Apis';

export default function Offers() {
    const [discountFood, setDiscountFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllDiscountFoods = async () => {
            try {
                const response = await getAllDescountFood();
                console.log("API Response:", JSON.stringify(response, null, 2));

                // Extract the food list based on known patterns
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
        <div>
            {discountFood.length > 0 ? (
                discountFood.map((item, index) => (
                    <div key={item._id || index}>
                        <strong>{item.foodName || 'No name available'}</strong>
                        <img src={item.foodImageUrl} alt="" width={100} />

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
                ))
            ) : (
                <p>No discounted food items found.</p>
            )}
        </div>
    );
}
