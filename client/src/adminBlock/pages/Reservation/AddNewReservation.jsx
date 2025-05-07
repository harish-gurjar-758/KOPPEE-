import React, { useRef, useState } from 'react';
import { createReservation } from '../../../Apis/Apis';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";

// Format time to AM/PM
function formatTimeToAMPM(timeStr) {
    if (!timeStr) return '';
    const [hourStr, minute] = timeStr.split(':');
    const hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
}

// Format date to DD/MM/YYYY
function formatDateToDMY(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

export default function AddNewReservation() {
    const textareaRef = useRef(null);
    const navigate = useNavigate();
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
        const { name, value } = e.target;

        if (name === 'message' && textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const wordCount = formData.message.trim().split(/\s+/).filter(Boolean).length;
    const isOverLimit = wordCount > 50;

    const handleSubmit = async () => {
        try {
            if (!formData.name || !formData.email || !formData.date || !formData.time) {
                alert("Please fill in all required fields.");
                return;
            }

            // Format date and time for submission
            const formattedData = {
                ...formData,
                date: formatDateToDMY(formData.date),
                time: formatTimeToAMPM(formData.time),
            };

            await createReservation(formattedData);

            alert("Reservation Successfully!");
            setFormData({
                name: '',
                email: '',
                phone: '',
                person: '',
                date: '',
                time: '',
                message: ''
            });

            navigate('/coffee-shop/admin-block/?section=reservation');
        } catch (error) {
            console.error("Reservation submission failed", error);
            alert("Failed to submit reservation. Try again.");
        }
    };

    return (
        <div className='AddNewReservation'>
            <div className='admin-header'>
                <h2>Reserve A new Table</h2>
                <div
                    className="btn btn-discard"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=reservation')}
                >
                    <MdDeleteForever /> Discard
                </div>
            </div>

            <div className="reservation-container">
                <div className="reservation-box">
                    <div className='form'>
                        <div className='input-group'>
                            <div className="input-box">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder='Name'
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder='Phone'
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='input-group'>
                            <div className="input-box">
                                <select
                                    name="person"
                                    value={formData.person}
                                    onChange={handleChange}
                                >
                                    <option value="">Person</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                            <div className="input-box">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="input-box">
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className='message-container'>
                            <div className='message-box'>
                                <textarea
                                    ref={textareaRef}
                                    name="message"
                                    placeholder='Message'
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <p style={{ color: isOverLimit ? 'red' : 'white' }}>
                                {isOverLimit
                                    ? 'You have exceeded the 50 word limit!'
                                    : 'Write Your Message in 50 words only...'}
                            </p>
                        </div>

                        <div className="formatted-values">
                            <p><strong>Selected Date:</strong> {formatDateToDMY(formData.date)}</p>
                            <p><strong>Selected Time:</strong> {formatTimeToAMPM(formData.time)}</p>
                        </div>

                        <div
                            className="btn btn-add"
                            onClick={handleSubmit}
                        >
                            Reserve A Table
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
