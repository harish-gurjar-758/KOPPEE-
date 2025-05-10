import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../../../Apis/Apis';

export default function AddNewEmployee() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        employeeName: '', //*
        employeePost: '', //*
        employeePhone: '', //*
        employeeEmail: '', //*
        password: '', //*
        shopBranchId: '',
        employeeId: '',
        employeePhoto: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        try {
            if (!formData.employeeName || !formData.employeePost || !formData.employeePhone || !formData.employeeEmail || !formData.password) {
                alert("Plase fill in all required fields.");
                return;
            }

            await addEmployee(formData);
            setFormData({
                employeeName: '', //*
                employeePost: '', //*
                employeePhone: '', //*
                employeeEmail: '', //*
                password: '', //*
                shopBranchId: '',
                employeeId: '',
                employeePhoto: '',
            });
            alert("Employee Added Succefully !")
            navigate('/coffee-shop/admin-block/?section=dashboard')
        } catch (error) {
            console.error("Employee submission failed!", error);
            alert("Failed to submit Employee. Try again.");
        }
    };

    return (
        <div className='section'>
            <div className="admin-header">
                <h2>Add A New Employee</h2>
                <div
                    className="btn btn-discard"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=dashboard')}
                >
                    <MdDeleteForever /> Discard
                </div>
            </div>

            {/* Container */}
            <div className="form">
                <div className="input-group">
                    {/* Employee Name */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Employee Name'
                            name="employeeName"
                            value={formData.employeeName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Employee Phone Number */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Employee Phone Number'
                            name='employeePhone'
                            value={formData.employeePhone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Employee Email */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Employee Email'
                            name='employeeEmail'
                            value={formData.employeeEmail}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="input-group">
                    {/* Employee Post */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Employee Post'
                            name='employeePost'
                            value={formData.employeePost}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Confirm Password */}
                    <div className="input-box">
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name='confirmPassword'
                        />
                    </div>
                </div>
                <div className="input-group">
                    {/* Shop Branch Id */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Branch Id'
                            name='shopBranchId'
                            value={formData.shopBranchId}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Employee Id */}
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Employee Id'
                            name='employeeId'
                            value={formData.employeeId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-box">
                        <input
                            type="text"
                            placeholder='Employee Photo URL'
                            name='employeePhoto'
                            value={formData.employeePhoto}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="btn-group">
                    <div className="btn" onClick={handleSubmit}>Submit</div>
                </div>
            </div>
        </div>
    );
}
