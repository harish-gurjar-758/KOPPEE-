import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../../Apis/Apis';
import { useNavigate } from 'react-router-dom';
import { PiEyesBold } from "react-icons/pi";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BiSolidStopwatch } from "react-icons/bi";
import ReactLoading from 'react-loading';

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

                <div className="btn-group">
                    <div
                        className="btn orange-btn"
                        onClick={() => navigate('/coffee-shop/admin-block/?section=add-new-reservation')}
                    >
                        Add New Reservation
                    </div>

                    <div
                        className="btn btn-add"
                        onClick={()=> navigate('/coffee-shop/admin-block/?section=add-new-table')}
                    >
                        Add a new Table
                    </div>
                </div>
            </div>

            {/* Reservation Table */}
            <div className="admin-list">
                <table style={{ width: "90%" }}>
                    <thead>
                        <tr>
                            <th>Num</th>
                            <th>Name</th>
                            <th>Person</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reserveTable.map((item, index) => (
                            <tr key={item._id || item.id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.person}</td>
                                <td className='status-box'>
                                    {item.status === 'confirmed' && (
                                        <div className='status-reserved'>
                                            Confirm
                                            <IoCheckmarkDoneSharp />
                                        </div>
                                    )}
                                    {item.status === 'waiting' && (
                                        <div className='status-wating'>
                                            Waiting
                                            <BiSolidStopwatch />
                                        </div>
                                    )}
                                    {item.status === 'pending' && (
                                        <div className='status-padding'>
                                            Pending
                                            . . .
                                        </div>
                                    )}
                                </td>

                                <td>{formatDateToDMY(item.date)}</td>
                                <td>{item.time}</td>
                                <td className='action-box'>
                                    <div className='btn'>
                                        <PiEyesBold />
                                    </div>
                                    <div className='btn btn-discard'>
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
