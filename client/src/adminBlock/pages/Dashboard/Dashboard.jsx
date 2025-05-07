import React from 'react'
import { FcOk } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";

export default function Dashboard() {
    return (
        <div className='Dashboard'>
            <div className='dashboard-left'>
                <div className="card-group">
                    <div className="card">
                        <FcOk className='icon' />
                        <div className='details'>
                            <h2>Confirmed</h2>
                            <h2>07</h2>
                        </div>
                    </div>
                    <div className="card">
                        <FcMediumPriority className='icon' />
                        <div className='details'>
                            <h2>Pedding</h2>
                            <h2>04</h2>
                        </div>
                    </div>
                    <div className="card">
                        <FcHighPriority className='icon' />
                        <div className='details'>
                            <h2>Canceled</h2>
                            <h2>03</h2>
                        </div>
                    </div>
                </div>
                <div className="today-reservations">
                    <div className="header">
                        <h2>Reservation</h2>
                        <p>view all</p>
                    </div>
                    <table border='0'>
                        <thead>
                            <tr>
                                <th>Num.</th>
                                <th>Customer</th>
                                <th>Time</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>John Doe</td>
                                <td>10:00 AM</td>
                                <td>07/05/2025</td>
                                <td>Confirmed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
