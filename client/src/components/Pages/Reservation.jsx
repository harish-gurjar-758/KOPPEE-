import React from 'react'

export default function Reservation() {
    return (
        <div className='Reservation'>
            <div className="reservation-hero">
                <div className='reservation-hero-box'>
                    <h1>Reserve You Table On Your Date & Time</h1>
                </div>
            </div>
            <div className='reservation-container'>
                <div className="reservation-box">
                    <div className='form'>
                        <div className='input-group'>
                            <div className="input-box">
                                <input type="text" name="" id="" placeholder='Name' />
                            </div>
                            <div className="input-box">
                                <input type="email" name="" id="" placeholder='Email' />
                            </div>
                            <div className="input-box">
                                <input type="phone" name="" id="" placeholder='Phone' />
                            </div>
                        </div>
                        <div className='input-group'>
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
                        <div className='message-box'>
                            <textarea name="" id=""></textarea>
                        </div>
                        <div className="btn orange-btn">Reserve A Table</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
