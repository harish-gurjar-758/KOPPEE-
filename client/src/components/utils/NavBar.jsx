import React, { useEffect, useState } from 'react';
import logo from '../assets/web-logo-1.png';
import { SlHandbag } from "react-icons/sl";
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { LuLayoutDashboard } from "react-icons/lu";
import { PiArmchairFill, PiBowlFoodBold } from "react-icons/pi";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Get current path


    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    const handleLinkClick = () => setMenuOpen(false);

    const handleReservation = () => {
        navigate('/reservation');
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isAdminBlock = location.pathname === '/coffee-shop/admin-block/';

    return (
        <div className='Menu'>
            <nav className={`NavBar ${scrolled ? 'scrolled' : ''}`}>
                <Link className="link" to='/' onClick={handleLinkClick}>
                    <img className='logo' src={logo} alt="logo" />
                </Link>
                <div className='links-container'>
                    <Link to='/' className='link'><h4>Home</h4></Link>
                    <Link to='/menu' className="link"><h4>Menu</h4></Link>
                    <Link className="link"><h4>Order</h4></Link>
                    <Link to='/offers' className="link"><h4>Offers</h4></Link>
                    <Link to='/shops-location' className="link"><h4>Shops</h4></Link>
                    <Link to='/contacts' className="link"><h4>Contact</h4></Link>
                </div>

                <div className='more-options'>
                    <button className="btn orange-btn" onClick={handleReservation}>Reservation</button>
                    <div className='shoping-btn'>
                        <SlHandbag className='shoping-icon' />
                        <div className='count'><span>0</span></div>
                    </div>
                    <div className="menu-btn" onClick={toggleMenu}>
                        {menuOpen ? <RxCross2 size={24} /> : <HiOutlineMenuAlt3 size={24} />}
                    </div>
                </div>
            </nav>

            {/* Responsive Menu Link Containers */}
            {menuOpen && (
                <div className="responsive-link-container">
                    <Link to='/' className='link'
                        onClick={handleLinkClick}
                    >
                        <h4>Home</h4></Link>
                    <Link className="link"
                        onClick={handleLinkClick}
                        to='/menu'
                    >
                        <h4>Menu</h4></Link>
                    <Link className="link"
                        onClick={handleLinkClick}
                    >
                        <h4>Order</h4></Link>
                    <Link className="link"
                        onClick={handleLinkClick}
                        to='/offers'
                    >
                        <h4>Offers</h4></Link>
                    <Link className="link"
                        onClick={handleLinkClick}
                    >
                        <h4>Shops</h4></Link>
                    <Link className='link' to='/reservation'
                        onClick={handleLinkClick}
                    >
                        Reservation</Link>
                    <Link className="link"
                        onClick={handleLinkClick}
                    >
                        <h4>Contact</h4></Link>
                </div>
            )}

            {/* Show Layout only for /coffee-shop/admin-block/ */}
            {isAdminBlock && (
                <div className='Layout'>
                    <div className="layout-link-btn" onClick={() => navigate('/coffee-shop/admin-block/?section=dashboard')}>
                        <LuLayoutDashboard />
                        <h5> Dashboard</h5>
                    </div>
                    <div className="layout-link-btn" onClick={() => navigate('/coffee-shop/admin-block/?section=reservation')}>
                        <PiArmchairFill />
                        <h5> Reservation</h5>
                    </div>
                    <div
                        className="layout-link-btn"
                        onClick={() => navigate('/coffee-shop/admin-block/?section=order')}
                    >
                        <SlHandbag />
                        <h5> Orders</h5>
                    </div>
                    <div
                        className="layout-link-btn"
                        onClick={() => navigate('/coffee-shop/admin-block/?section=food')}
                    >
                        <PiBowlFoodBold />
                        <h5>Food</h5>
                    </div>
                    <div
                        className="layout-link-btn"
                        onClick={() => navigate('coffee-shop/admin-block/?section=food-category')}
                    >
                        <h5>Food Category</h5>
                    </div>
                </div>
            )}
        </div>
    );
}
