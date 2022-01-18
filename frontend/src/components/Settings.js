import React from 'react';

const Settings = () => {
    let [password, setPassword] = useState('');

    const updatePassword = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: password
            })
        }).then(res => {
            res.json();
        })
    }

    const deleteAccount = async () => {
        await fetch(`http://localhost:3005/api/user`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            })
        }).then()
    }

    return (
        <div>

        </div>
    )
}

export default Settings;