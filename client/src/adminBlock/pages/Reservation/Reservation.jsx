import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../../Apis/Apis';
import { useNavigate } from 'react-router-dom';

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
            <div className='admin-header'>
                <h2>Reservation</h2>
                <div
                    className="btn btn-add"
                    onClick={() => navigate('/coffee-shop/admin-block/?section=add-new-reservation')}
                >
                    Add New Reservation
                </div>
            </div>

            {reserveTable.map((item) => (
                <div key={item._id || item.id}>
                    <p>Name: {item.name}</p>
                    <p>Table: {item.table}</p>
                </div>
            ))}
        </div>
    );
}
