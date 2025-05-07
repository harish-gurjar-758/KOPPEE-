import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../../Apis/Apis';
import { useNavigate } from 'react-router-dom';
import { PiEyesBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";

// Format date to DD/MM/YYYY
function formatDateToDMY(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
}

export default function Reservation() {
    const navigate = useNavigate();
    const [reserveTable, setReserveTable] = useState([]);

    useEffect(() => {
        const reservedTable = async () => {
            try {
                const data = await getAllReservations();
                setReserveTable(data);
            } catch (error) {
                console.error("Error fetching Reserved Tables:", error);
            }
        };

        reservedTable();
    }, []);

    return (
        <div>
            {/* Header */}
            <div className='admin-header'>
                <h2>Reservation</h2>
                <div
                    className="btn orange-btn"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=add-new-reservation')}
                >
                    Add New Reservation
                </div>
            </div>

            {/* Reservation Table */}
            <div className="admin-list">
                <table style={{ width: "90%" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Person</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveTable.map((item) => (
                            <tr key={item._id || item.id}>
                                <td>{item.name}</td>
                                <td>{item.person}</td>
                                <td>{formatDateToDMY(item.date)}</td>
                                <td>{item.time}</td>
                                <td>Pending</td>
                                <td className='action-box'>
                                    <div>
                                        <PiEyesBold />
                                    </div>
                                    <div>
                                        <MdDeleteForever />
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
