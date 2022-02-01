import React, { useState } from 'react';
import '../styles/Delete.scss';

const DeleteAccount = () => {
    let [message, setMessage] = useState('');
    let [admin, setAdmin] = useState(false);

    const removeAccount = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.ok) {
                setMessage('Account Removed');
                return res.json();
            }
            throw new Error('Failed to delete account');
        })
    }

    return (
        <div className='delete-wrapper'>
            <div className='delete-header'>Confirm Delete</div>
            <div className='delete-btn' onClick={removeAccount}>Delete</div>
            <span className='delete-message'>{message}</span>
        </div >
    )
}

export default DeleteAccount;