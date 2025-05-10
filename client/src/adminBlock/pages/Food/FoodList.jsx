import React from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export default function FoodList() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="admin-header">
                <h2>Food List</h2>
                <div
                    className="btn btn-add"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=add-new-food')}
                >
                    Add Food
                    <IoAddCircle />
                </div>
            </div>
        </div>
    )
}
