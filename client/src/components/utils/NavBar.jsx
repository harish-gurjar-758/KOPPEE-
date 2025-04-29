import React from 'react'
import logo from '../assets/web-logo-1.png';
import { SlHandbag } from "react-icons/sl";
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <div className='NavBar'>
            {/* Logo */}
            <Link className="link" to='/'>
                <img className='logo' src={logo} alt="" />
            </Link>
            {/* Links */}

            <div className='links-container'>
                <Link to='/' className='link'><h4>Home</h4></Link>
                <Link to='/about' className='link'><h4>About</h4></Link>
                <Link className="link"><h4>Menu</h4></Link>
                <Link className="link"><h4>Order</h4></Link>
                <Link className="link"><h4>Offer</h4></Link>
                <Link className="link"><h4>Shops</h4></Link>
                <Link className="link"><h4>Contact</h4></Link>
            </div>

            <div className='more-options'>
                {/* Reservation Button */}
                <button className="btn orange-btn">Reservation</button>
                {/* Shoping card Logo */}
                <div className='shoping-btn'>
                    <SlHandbag className='shoping-icon' />
                    <div className='count'>
                        <span>0</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
