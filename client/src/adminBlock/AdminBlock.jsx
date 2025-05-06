import React, { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Reservation from './pages/Reservation/Reservation';
import Order from './pages/Order/Order';
import { useLocation } from 'react-router-dom';
import AddNewReservation from './pages/Reservation/AddNewReservation';

export default function AdminBlock() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const section = query.get("section") || "dashboard";

    return (
        <div className='AdminBlock'>
            {/* Dashbord Section */}
            {section === "dashboard" && <Dashboard />}

            {/* Reservation Section */}
            {section === "reservation" && <Reservation />}
            {section === "add-new-reservation" && <AddNewReservation />}

            {/* Order Section */}
            {section === "order" && <Order />}
        </div>
    );
}
