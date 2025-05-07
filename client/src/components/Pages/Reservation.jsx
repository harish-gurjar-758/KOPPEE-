import React, { useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { createReservation } from '../../Apis/Apis';

export default function Reservation() {
    const textareaRef = useRef(null);
    const location = useLocation();
    const currentPath = location.pathname;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        person: '',
        date: '',
        time: '',
        message: '',
    });

    const handleChange = (e) => {
        // Auto-resize the textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; //reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });

    }

    // Count words
    const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;
    const isOverLimit = wordCount > 50;

    // Subit Button 
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
        <div className='Reservation'>
            <div className="reservation-hero">
                <div className='reservation-hero-box'>
                    <h1>Reserve You Table On Your Date & Time</h1>
                    <h5>Coffee{currentPath}</h5>
                </div>
            </div>
            <div className='reservation-container'>
                <div className="reservation-box">
                    <div className='form'>
                        <div className='input-group'>
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
                                <input
                                    type="email"
                                    name="email" id=""
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="phone"
                                    name="phone" id=""
                                    placeholder='Phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='input-group'>
                            <div className="input-box">
                                <select name="person" id=""
                                    value={formData.person}
                                    onChange={handleChange}
                                >
                                    <option value="Person">Person</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <input
                                    type="date"
                                    name="date" id=""
                                    placeholder='Date'
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-box">
                                <select
                                    name="time" id=""
                                    value={formData.time}
                                    onChange={handleChange}
                                >
                                    <option value="Time">Time</option>
                                    <option value="09:00">09:00</option>
                                </select>
                            </div>
                        </div>
                        {/*  Message  */}
                        <div className='message-container'>
                            <div className='message-box'>
                                <textarea
                                    ref={textareaRef}
                                    name="message"
                                    id=""
                                    placeholder='Message'
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <p style={{ color: isOverLimit ? 'red' : 'white' }}>
                                {isOverLimit
                                    ? 'You have exceeded the 50 word limit!'
                                    : 'Write Your Message in 50 words only. . . '}
                            </p>
                        </div>
                        <div
                            className="btn orange-btn"
                            onClick={handleSubmit}
                        >
                            Reserve A Table
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
