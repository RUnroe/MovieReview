import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Header.scss';
import Search from './Search';

const Header = (props) => {
    let navigate = useNavigate();

    console.log(navigate)

    return (
        <header>
            <div className='header-wrapper'>
                <div>
                    Full Stack Boys - Group 2
                    <div className='header-links-wrapper'>
                        <NavLink to='/login' className={(navData) => navData.isActive ? 'active-header-link' : 'header-link'}>Login</NavLink>
                        <NavLink exact={'true'} to='/' className={(navData) => navData.isActive ? 'active-header-link' : 'header-link'}>Home</NavLink>
                        <Search />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;