import React, { useState } from 'react';
import createReservation from '../../../Apis/Apis.js'

export default function AddNewReservation() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        person: '',
        date: '',
        time: '',
        message: '',
    })

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async () => {
        try {
            // Basic Validation
            if (!formData.name || !formData.email || !formData.date || !formData.time) {
                alert("Please fill in all required fields.");
                return;
            }

            await createReservation(formData);
            alert("Reservation Successfully!");
            setFormData({
                name: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                message: ''
            });
        } catch (error) {
            console.error("Reservation submission failed", error);
            alert("Failed to submit reservation. Try again.")
        }
    }
    return (
        <div className='AddNewReservation'>
            {/* Reservation */}
            <div className='offer-you home-sub-section'>
                <div>
                    <h2>Book a Table</h2>
                    <p>Call us 01700-00000 or Complete the Form Below</p>
                </div>
                <div className='form'>
                    <div>
                        <div className="input-box">
                            <input
                                type="text"
                                name="name"
                                id=""
                                placeholder='Name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input-box">
                            <input type="email" name="" id="" placeholder='Email' />
                        </div>
                        <div className="input-box">
                            <input type="phone" name="" id="" placeholder='Phone' />
                        </div>
                    </div>
                    <div>
                        <div className="input-box">
                            <select name="" id="">
                                <option value="Person">Person</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <input type="date" name="" id="" placeholder='Date' />
                        </div>
                        <div className="input-box">
                            <select name="" id="">
                                <option value="Time">Time</option>
                                <option value="09:00">09:00</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <textarea name="" id=""></textarea>
                    </div>
                    <div className="btn orange-btn" onClick={handleSubmit}>Reserve A Table</div>
                </div>
            </div>
        </div>
    )
}
