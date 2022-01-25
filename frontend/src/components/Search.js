import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/Search.scss';

const Search = ({ onSearch }) => {
    let [searchParams, setSearchParams] = useState('');

    let { register, handleSubmit } = useForm();

    const getMoviesBySearch = async () => {
        await fetch(`http://localhost:3005/api/search?search=${searchParams}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            onSearch(data.results);
            setSearchParams('');
        })
    }

    return (
        <form onSubmit={handleSubmit(getMoviesBySearch)} className='search-wrapper'>
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchParams}
                    onChange={(e) => { setSearchParams(e.target.value) }}
                    className='search-input input-small'
                />
            </div>
        </form>
    )
}

export default Search;