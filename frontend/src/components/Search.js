import React, { useState } from 'react';
import '../styles/Search.scss';

const Search = () => {
    let [searchParams, setSearchParams] = useState();
    let [searchResults, setSearchResults] = useState();

    //Grabs the search parameters and fetch's the api
    const getMovies = async (search) => {
        let res = await fetch(`/api/getMovies/?search=${search}`);
        let body = await res.json();

        //If the request status has not succeeded then throw an error
        if (res.status !== 200) {
            throw new Error('Something went wrong', body);
        }

        return body;
    }

    const handleInput = (e) => {
        setSearchParams(e.target.value);

        //Puts Search Paramaters into 'getMovies' and sets the results state
        getMovies(searchParams).then(res => {
            setSearchResults(res.response.results)
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='search-wrapper'>
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchParams}
                    onChange={handleInput}
                    className='search-input input-small'
                />
            </div>
        </div>
    )
}

export default Search;