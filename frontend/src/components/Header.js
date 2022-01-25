import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => {
    return (
        <header>
            <div className='header-wrapper'>
                <div>
                    Full Stack Boys - Group 2
                    <div className='header-links-wrapper'>
                        <NavLink to='/login' className={(navData) => navData.isActive ? 'active-header-link' : 'header-link'}>Login</NavLink>
                        <NavLink exact={'true'} to='/' className={(navData) => navData.isActive ? 'active-header-link' : 'header-link'}>Home</NavLink>
                    </div>
                    <span className='settings'>Settings</span>
                </div>
            </div>
        </header>
    )
}

export default Header;