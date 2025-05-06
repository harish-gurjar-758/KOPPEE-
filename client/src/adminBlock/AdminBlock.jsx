import React, { useState } from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Reservation from './pages/Reservation/Reservation';
import Order from './pages/Order/Order';
import { useLocation } from 'react-router-dom';

export default function AdminBlock() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const section = query.get("section") || "dashboard";

    return (
        <div className='AdminBlock'>
            {section === "dashboard" && <Dashboard />}
            {section === "reservation" && <Reservation />}
            {section === "order" && <Order />}
        </div>
    );
}
