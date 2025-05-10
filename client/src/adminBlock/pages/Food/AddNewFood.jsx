import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { addFood } from '../../../Apis/Apis';

export default function AddNewFood() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        foodName: '',
        foodType: '',
        foodPrice: '',
        foodImageUrl: '',
        foodDescount: '',
        foodDescription: '',
    });

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
            };
            await addFood(formData);
            navigate('/coffee-shop/admin-block/?section=food');

            setFormData({
                foodName: '',
                foodType: '',
                foodPrice: '',
                foodImageUrl: '',
                foodDescount: '',
                foodDescription: '',
            });
        } catch (error) {
            console.error("Food submission failed!", error);
            alert("Failed to submit Food. Try again.");
        }
    }

    return (
        <div className='section'>
            <div className="admin-header">
                <h2>Add New Food</h2>
                <div
                    className="btn btn-discard"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=food')}
                >
                    Discard
                    <MdDeleteForever />
                </div>
            </div>
            <div className="section-container">
                <div className="section-box">
                    <div className="form">
                        <div className="input-group">
                            {/* Food Name */}
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Food Name *'
                                    name='foodName'
                                    value={formData.foodName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Food Price */}
                            <div className="input-box">
                                <input
                                    type="number"
                                    placeholder='Food Price *'
                                    name='foodPrice'
                                    value={formData.foodPrice}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* food Type */}
                            <div className="input-box">
                                <select
                                    name='foodType'
                                    value={formData.foodType}
                                    onChange={handleChange}
                                >
                                    <option value='null'>Food Type *</option>
                                    <option value="test">Test</option>
                                </select>
                            </div>
                        </div>

                        <div className="input-group">
                            {/* Food Descount */}
                            <div className="input-box">
                                <input
                                    type="number"
                                    placeholder='Food Descount'
                                    name='foodDescount'
                                    value={formData.foodDescount}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* food description */}
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Description'
                                    name='foodDescription'
                                    value={formData.foodDescription}
                                    onChange={handleChange}
                                />
                                <p style={{
                                    color: isOverLimit ? 'red' : 'white'
                                }}>
                                    {isOverLimit
                                        ? 'Yor have exceeded the 15 word limit!'
                                        : 'Write Your Description in 15 words only'
                                    }
                                </p>
                            </div>

                            {/* food image url */}
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Past Image Url *'
                                    name='foodImageUrl'
                                    value={formData.foodImageUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="btn-group">
                            <div
                                className="btn btn-add"
                                onClick={handleSubmit}
                            >
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
