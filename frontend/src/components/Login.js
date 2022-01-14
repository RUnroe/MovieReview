import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.scss';

const Login = () => {
    return (
        <div className='login-wrapper'>
            <div className='login-header'>Sign in</div>
            <input className='login-input' type='text' placeholder='Username' />
            <input className='login-input' type='password' placeholder='Password' />
            <Link to='/' className='login-btn'>Sign in</Link>
            <Link to='/register' className='login-btn'>Register</Link>
            <Link to='/forgotpassword' className='forgot-link'>Forgot Password?</Link>
        </div >
    )
}

export default Login;