import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const DeleteAccount = () => {
    let [confirm, setConfirm] = useState(false);
    let [admin, setAdmin] = useState(false);

    let { register, handleSubmit } = useForm();

    const removeAccount = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Failed to delete account');
        })
    }

    return (
        <form onSubmit={handleSubmit(removeAccount)} className='login-wrapper'>
            <div className='login-header'>Confirm Delete</div>
            <input
                className='login-input'
                type='password'
                onChange={(e) => setConfirm(e.target.value)}
                placeholder='New Password'
            />
            <div className='login-btn'>Update</div>
        </form >
    )
}

export default DeleteAccount;