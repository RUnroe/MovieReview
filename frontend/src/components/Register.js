import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/Register.scss';

const Register = () => {
    // let [userName, setUserName] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [streetAddress, setStreetAddress] = useState('');
    let [city, setCity] = useState('');
    let [state, setState] = useState('');
    let [zip, setZip] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    let [err, setErr] = useState(null);

    let { register, handleSubmit } = useForm();

    let navigate = useNavigate();

    const createUser = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fname: firstName,
                lname: lastName,
                password: password,
                email: email,
                phone: phone,
                state: state,
                city: city,
                street: streetAddress,
                zip_code: zip
            })
        }).then((res) => {
            if (res.ok) {
                navigate('/login');
                return res.json()
            }
            throw new Error('Failed to create account');
        }).catch((err) => {
            //Grabs all errors even in render. TODO: CHANGE IT LATER SO THAT DOES NOT HAPPEN, MORE SPECIFIC ERRORS
            setErr(err.message);
        })
    }

    return (
        <form onSubmit={handleSubmit(createUser)} className='register-wrapper'>
            <div className='register-header'>Register</div>
            <div className='register-header-text'>Please fill in this form to create an account</div>
            <div className='input-name-wrapper'>
                <input
                    className='register-input'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='First Name'
                />
                <input
                    className='register-input'
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last Name'
                />
            </div>
            <input
                className='register-input'
                type='text'
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder='Street Address'
            />
            <input
                className='register-input'
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
            />
            <input
                className='register-input'
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder='State'
            />
            <input
                className='register-input'
                type='text'
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder='Zip'
            />
            <input
                className='register-input'
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
            />
            <input
                className='register-input'
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone'
            />
            {/* <input
                className='register-input'
                type='text'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Username'
                autoComplete='off'
            /> */}
            <input
                className='register-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                autoComplete='new-password'
            />
            <span className='error'>{err}</span>
            <div onClick={() => { createUser() }} className='register-btn'>Create Account</div>
        </form>
    )
}

export default Register;