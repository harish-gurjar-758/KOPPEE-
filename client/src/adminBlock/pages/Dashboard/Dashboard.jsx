import React, { useEffect, useState } from 'react'
import { FcOk } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
import { getAllReservations } from '../../../Apis/Apis';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [reserveTable, setReserveTable] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const reservedTable = async () => {
            try {
                const data = await getAllReservations();
                setReserveTable(data)
            } catch (error) {
                console.error("Error fetching Reserved Tables : ", error);
            }
        };

        reservedTable();
    }, [])
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
                        <p
                            onClick={() => navigate('/coffee-shop/admin-block/?section=reservation')}
                        >
                            view all
                        </p>
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
                            {reserveTable.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.time}</td>
                                    <td>{item.date}</td>
                                    <td>Confirmed</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="dashboard-right">
                <div className="btn-group">
                    <div className="btn btn-add" onClick={()=>navigate('/coffee-shop/admin-block/?section=add-new-employee')}>Add A New Employee</div>
                </div>
            </div>
        </div>
    )
}
