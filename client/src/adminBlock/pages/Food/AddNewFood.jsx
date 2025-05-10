import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'

export default function AddNewFood() {
    const [formData, setFormData] = useState({
        foodName:'',
        foodType:'',
        foodPrice:'',
        foodImageUrl:'',
        foodDescount:'',
        foodDescription:'',
        foodRatings:[],
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
    return (
        <div>
            <div className="admin-header">
                <h2>Add New Food</h2>
                <div className="btn btn-discard">
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
                                    placeholder='Food Name'
                                    name='foodName'
                                    value={formData.foodName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Food Price */}
                            <div className="input-box">
                                <input
                                    type="number"
                                    placeholder='Food Price'
                                    name='foodPrice'
                                    value={formData.foodPrice}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* food Type */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
