import React from 'react'
import logo from '../assets/web-logo.png';
import { SlHandbag } from "react-icons/sl";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div>
            {/* Logo */}
            <img className='logo' src={logo} alt="" />
            {/* Links */}
            
            <Link>
            </Link>
            Home
            About
            Menu
            Order
            Offer
            Shops
            Contact

            {/* Reservation Button */}
            Reservation

            {/* Shoping card Logo */}
            <SlHandbag />
        </div>
    )
}
