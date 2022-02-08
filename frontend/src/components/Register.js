import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../styles/Register.scss';

const Register = () => {
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [streetAddress, setStreetAddress] = useState('');
    let [city, setCity] = useState('');
    let [state, setState] = useState('');
    let [zip, setZip] = useState('');
    let [email, setEmail] = useState('');
    let [phone, setPhone] = useState('');
    let [password, setPassword] = useState('');
    //Very Ugly, Cleaner way to do this
    let [validationMsgFirst, setValidationMsgFirst] = useState('');
    let [validationMsgLast, setValidationMsgLast] = useState('');
    let [validationMsgStreet, setValidationMsgStreet] = useState('');
    let [validationMsgCity, setValidationMsgCity] = useState('');
    let [validationMsgState, setValidationMsgState] = useState('');
    let [validationMsgZip, setValidationMsgZip] = useState('');
    let [validationMsgEmail, setValidationMsgEmail] = useState('');
    let [validationMsgPhone, setValidationMsgPhone] = useState('');
    let [validationMsgPassword, setValidationMsgPassword] = useState('');

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
        });
    }

    const handleValidate = () => { 
        if (/./.test(firstName) === false) {
            setValidationMsgFirst('First name must have at least one character');
        } else if (/./.test(firstName) === true) {
            setValidationMsgFirst('');
        }
        if (/./.test(lastName) === false) {
            setValidationMsgLast('Last name must have at least one character');
        } else if (/./.test(lastName) === true) {
            setValidationMsgLast('');
        }
        if (/../.test(streetAddress) === false) {
            setValidationMsgStreet('Street address must have at least two characters');
        } else if (/../.test(streetAddress) === true) {
            setValidationMsgStreet('');
        }
        if (/../.test(city) === false) {
            setValidationMsgCity('City must have at least two characters');
        } else if (/../.test(city) === true) {
            setValidationMsgCity('');
        }
        if (/^[a-z, A-Z]{2}$/.test(state) === false) {
            setValidationMsgState('State can only be two letters');
        } else if (/^[a-z, A-Z]{2}$/.test(state) === true) {
            setValidationMsgState('');
        }
        if (/^[0-9]{5}(-[0-9]{4})?$/m.test(zip) === false) {
            setValidationMsgZip('Zip can only 4-5 digits long of numbers');
        } else if (/^[0-9]{5}(-[0-9]{4})?$/m.test(zip) === true) {
            setValidationMsgZip('');
        }
        if (/\w+@\w+\.\w+/.test(email) === false) {
            setValidationMsgEmail('Email has an invalid format please include @ and ending domain');
        } else if (/\w+@\w+\.\w+/.test(email) === true) {
            setValidationMsgEmail('');
        }
        if (/^(1?\([0-9]{3}\)( |)|(1-|1)?[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/m.test(phone) === false) {
            setValidationMsgPhone('Phone number invlid format');
        } else if (/^(1?\([0-9]{3}\)( |)|(1-|1)?[0-9]{3}-?)[0-9]{3}-?[0-9]{4}$/m.test(phone) === true) {
            setValidationMsgPhone('');
        }
        if (/^.{6,}$/.test(password) === false) {
            setValidationMsgPassword('Password must be at least 6 characters long');
        } else if (/^.{6,}$/.test(password) === true) {
            setValidationMsgPassword('');
        }
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
            <input
                className='register-input'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                autoComplete='new-password'
            />
            <span className='error-message-register'>{validationMsgFirst}</span>
            <span className='error-message-register'>{validationMsgLast}</span>
            <span className='error-message-register'>{validationMsgStreet}</span>
            <span className='error-message-register'>{validationMsgCity}</span>
            <span className='error-message-register'>{validationMsgState}</span>
            <span className='error-message-register'>{validationMsgZip}</span>
            <span className='error-message-register'>{validationMsgEmail}</span>
            <span className='error-message-register'>{validationMsgPhone}</span>
            <span className='error-message-register'>{validationMsgPassword}</span>
            <button type='submit' onClick={handleValidate} className='register-btn'>Create Account</button>
        </form>
    )
}

export default Register;