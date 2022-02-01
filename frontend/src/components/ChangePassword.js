import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/ChangePassword.scss';

const ChangePassword = () => {
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
        <form onSubmit={handleSubmit(changePassword)} className='change-pass-wrapper'>
            <div className='change-pass-header'>Change Password</div>
            <input
                className=
                'change-pass-input'
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder='New Password'
            />
            <div className='change-pass-btn' onClick={() => { changePassword() }}>Update</div>
        </form >
    )
}

export default ChangePassword;