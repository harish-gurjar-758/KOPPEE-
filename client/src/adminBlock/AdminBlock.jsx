import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import Reservation from './pages/Reservation/Reservation';
import Order from './pages/Order/Order';
import { useLocation } from 'react-router-dom';
import AddNewReservation from './pages/Reservation/AddNewReservation';
import AddNewTable from './pages/Table/AddNewTable';
import AddNewEmployee from './pages/Employee/AddNewEmployee';

export default function AdminBlock() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const section = query.get("section") || "dashboard";

    return (
        <div className='AdminBlock'>
            {/* Dashbord Section */}
            {section === "dashboard" && <Dashboard />}

            {/* Employee Section */}
            {section === "add-new-employee" && <AddNewEmployee />}

            {/* Table */}
            {section === "add-new-table" && <AddNewTable />}

            {/* Reservation Section */}
            {section === "reservation" && <Reservation />}
            {section === "add-new-reservation" && <AddNewReservation />}

            {/* Order Section */}
            {section === "order" && <Order />}
        </div>
    );
}
