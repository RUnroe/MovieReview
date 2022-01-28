import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import '../styles/Header.scss';

const Header = () => {
    let [loggedInUser, setLoggedInUser] = useState('Not Logged In');

    let navigate = useNavigate();

    //Add logout dropdown
    let options = [
        {
            value: 'one', label: `${loggedInUser}`
        },
        {
            value: 'two', label: 'Change Password'
        },
        {
            value: 'three', label: 'Delete Account'
        }
    ]

    let defaultOption = options[0];

    useEffect(() => {
        getLoggedInUser();
    }, []);

    let navigateSettings = (option) => {
        if (option.value === 'two') {
            navigate('/changepassword');
        } else if (option.value === 'three') {
            navigate('/deleteaccount')
        }
    }

    const getLoggedInUser = async () => {
        await fetch(`http://localhost:3005/api/auth`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            setLoggedInUser(data.fname + ' ' + data.lname);
        })
    }

    return (
        <header>
            <div className='header-wrapper'>
                <div>
                    Full Stack Boys - Group 2
                    <div className='header-links-wrapper'>
                        <NavLink to='/login' className={(navData) => navData.isActive ? 'active-header-link' : 'header-link'}>Login</NavLink>
                        <NavLink exact={'true'} to='/' className={(navData) => navData.isActive ? 'active-header-link' : 'header-link'}>Home</NavLink>
                    </div>
                    <Dropdown
                        options={options}
                        value={defaultOption}
                        onChange={(e) => {navigateSettings(e)}}
                        menuClassName='dropdown-menu-navigate'
                        controlClassName='dropdown-control-navigate'
                    />
                </div>
            </div>
        </header>
    )
}

export default Header;