import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const ChangePassword = () => {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [newPassword, setNewPassword] = useState('');

    let { register, handleSubmit } = useForm();

    const changePassword = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: newPassword
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to update password');
        })
    }

    return (
        <form onSubmit={handleSubmit(changePassword)} className='login-wrapper'>
            <div className='login-header'>Change Password</div>
            <input
                className=
                'login-input'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='New Password'
            />
            <div className='login-btn' onClick={() => { changePassword() }}>Update</div>
        </form >
    )
}

export default ChangePassword;