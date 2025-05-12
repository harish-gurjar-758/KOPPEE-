import React, { useEffect, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { getAllFoodCategory } from '../../../Apis/Apis';
import { PiEyesBold } from 'react-icons/pi';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

export default function FoodCategoryList() {
    const [foodCategory, setFoodCategory] = useState([]);
    const navigate = useNavigate();
        useEffect(() => {
            const foodCategory = async () => {
                try {
                    const response = await getAllFoodCategory();
                    setFoodCategory(response);
                } catch (error) {
                    console.error("Error fetching Food Category List: ", error);
                }
            }
    
            foodCategory();
        }, []);
    return (
        <div className='section'>
            <div className="admin-header">
                <h2>Food Category List</h2>
                <div
                    className="btn btn-add"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=add-food-category')}
                >
                    Add Food Category
                    <IoAddCircle />
                </div>
            </div>

            <div className="admin-list">
                <table>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foodCategory.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.categoryName}</td>
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
    )
}
