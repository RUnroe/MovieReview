import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.scss';

const Register = () => {
    return (
        <div className='register-wrapper'>
            <div className='register-header'>Register</div>
            <div className='register-header-text'>Please fill in this form to create an account</div>
            <div className='input-name-wrapper'>
                <input className='register-input' type='text' placeholder='First Name' />
                <input className='register-input' type='text' placeholder='Last Name' />
            </div>
            <input className='register-input' type='text' placeholder='Street Address' />
            <input className='register-input' type='text' placeholder='City' />
            <input className='register-input' type='text' placeholder='State' />
            <input className='register-input' type='text' placeholder='Zip' />
            <input className='register-input' type='text' placeholder='Email' />
            <input className='register-input' type='text' placeholder='Phone' />
            <input className='register-input' type='text' placeholder='Username' autoComplete='off' />
            <input className='register-input' type='password' placeholder='Password' autoComplete='new-password'/>
            <Link to='/' className='register-btn'>Create Account</Link>
        </div >
    )
}

export default Register;