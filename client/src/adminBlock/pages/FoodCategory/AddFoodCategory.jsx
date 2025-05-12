import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { addFoodCategory } from '../../../Apis/Apis';

export default function AddFoodCategory() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        categoryName: '',
        categoryImageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (!formData.categoryName || !formData.categoryImageUrl) {
                alert("Please fill in all required fields.");
                return;
            };
            await addFoodCategory(formData);
            navigate('/coffee-shop/admin-block/?section=food-category');

            setFormData({
                categoryName: '',
                categoryImageUrl: '',
            });
        } catch (error) {
            console.error("Food submission failed!", error);
            alert("Failed to submit Food. Try again.");
        }
    }
    return (
        <div className='section'>
            <div className="admin-header">
                <h2>Add New Food Category</h2>
                <div
                    className="btn btn-discard"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=food-category')}
                >
                    Discard
                    <MdDeleteForever />
                </div>
            </div>
            <div className="section-container">
                <div className="section-box">
                    <div className="form">
                        <div className="input-group">
                            {/* Food category Name */}
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Category Name *'
                                    name='categoryName'
                                    value={formData.categoryName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Food category Image Url */}
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder='Category Image Url *'
                                    name='categoryImageUrl'
                                    value={formData.categoryImageUrl}
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
