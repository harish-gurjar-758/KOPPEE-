import React, { useEffect, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { getAllFood } from '../../../Apis/Apis';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { PiEyesBold } from 'react-icons/pi';

export default function FoodList() {
    const [food, setFood] = useState([]);
    const [filterType, setFilterType] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const foodList = async () => {
            try {
                const response = await getAllFood();
                setFood(response);
            } catch (error) {
                console.error("Error fetching Food List: ", error);
            }
        }

        foodList();
    }, []);

    // Extract unique food types for the filter dropdown
    const foodTypes = ['All', ...new Set(food.map(item => item.foodType))];

    // Apply filter
    const filteredFood = filterType === 'All'
        ? food
        : food.filter(item => item.foodType === filterType);

    return (
        <div className='section'>
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

            {/* Filter Dropdown */}
            <div className="filter-box" style={{ marginBottom: '1rem' }}>
                <label htmlFor="foodTypeFilter">Filter by Food Type: </label>
                <select
                    id="foodTypeFilter"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    {foodTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="admin-list">
                <table>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Food Name</th>
                            <th>Food Price</th>
                            <th>Food Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFood.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.foodName}</td>
                                <td>{item.foodPrice}</td>
                                <td>{item.foodType}</td>
                                <td className='action-box'>
                                    <div
                                        className="btn orange-btn">
                                        <PiEyesBold />
                                    </div>
                                    <div
                                        className="btn btn-add"
                                        onClick={() => navigate(`/coffee-shop/admin-block/?section=update-food&id=${item._id}`)}
                                    >
                                        <BiEdit />
                                    </div>
                                    <div className="btn btn-discard">
                                        <MdDelete />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
