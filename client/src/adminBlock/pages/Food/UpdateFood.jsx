import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getOneFoodById, updateFoodById } from '../../../Apis/Apis';
import { MdDeleteForever } from 'react-icons/md';

export default function UpdateFood() {
    const [formData, setFormData] = useState({
        foodName: '',
        foodType: '',
        foodPrice: '',
        foodImageUrl: '',
        foodDescount: '',
        foodDescription: '',
    });

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get("id");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const wordCount = formData.foodDescription.trim().split(/\s+/).filter(Boolean).length;
    const isOverLimit = wordCount > 15;

    const handleSubmit = async () => {
        try {
            if (!formData.foodName || !formData.foodPrice || !formData.foodType || !formData.foodImageUrl) {
                alert("Please fill in all required fields.");
                return;
            }
            await updateFoodById(id, formData);
            navigate('/coffee-shop/admin-block/?section=food');
        } catch (error) {
            console.error("Food submission failed!", error);
            alert("Failed to submit Food. Try again.");
        }
    };

    useEffect(() => {
        const getFoodForUpdate = async () => {
            try {
                const response = await getOneFoodById(id);
                setFormData(response);
            } catch (error) {
                console.error("Error fetching Food Item By Id", error);
            }
        };

        if (id) {
            getFoodForUpdate();
        }
    }, [id]);

    return (
        <div className='section'>
            <div className="admin-header">
                <h2>Update Food</h2>
                <div
                    className="btn btn-discard"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=food')}
                >
                    Discard <MdDeleteForever />
                </div>
            </div>

            <div className="section-container">
                <div className="section-box">
                    <div className="form">
                        <div className="input-group">
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Food Name *'
                                    name='foodName'
                                    value={formData.foodName}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="number"
                                    placeholder='Food Price *'
                                    name='foodPrice'
                                    value={formData.foodPrice}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-box">
                                <select
                                    name='foodType'
                                    value={formData.foodType}
                                    onChange={handleChange}
                                >
                                    <option value=''>Select Food Type *</option>
                                    <option value="starter">Starter</option>
                                    <option value="main">Main</option>
                                    <option value="dessert">Dessert</option>
                                    <option value="beverage">Beverage</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            <div className="input-box">
                                <input
                                    type="number"
                                    placeholder='Food Discount'
                                    name='foodDescount'
                                    value={formData.foodDescount}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Description (max 15 words)'
                                    name='foodDescription'
                                    value={formData.foodDescription}
                                    onChange={handleChange}
                                />
                                <p style={{ color: isOverLimit ? 'red' : 'white' }}>
                                    {isOverLimit
                                        ? 'You have exceeded the 15-word limit!'
                                        : 'Write your description in 15 words only'}
                                </p>
                            </div>

                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Paste Image URL *'
                                    name='foodImageUrl'
                                    value={formData.foodImageUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="btn-group">
                            <div className="btn btn-add" onClick={handleSubmit}>
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
