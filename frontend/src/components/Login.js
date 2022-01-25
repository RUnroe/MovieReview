import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/Login.scss';

const Login = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let { register, handleSubmit } = useForm();

    let navigate = useNavigate();

    const loginUser = async () => {
        await fetch(`http://localhost:3005/api/auth`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then((res) => {
            if (res.ok) {
                navigate('/');
                return res.json();
            }
            throw new Error('Failed to create account');
        })
    }

    return (
        <form onSubmit={handleSubmit(loginUser)} className='login-wrapper'>
            <div className='login-header'>Sign in</div>
            <input
                className='login-input'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input
                className=
                'login-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
            />
            <div className='login-btn' onClick={() => { loginUser() }}>Sign in</div>
            <Link to='/register' className='login-btn'>Register</Link>
            <Link to='/forgotpassword' className='forgot-div'>Forgot Password?</Link>
        </form >
    )
}

export default Login;