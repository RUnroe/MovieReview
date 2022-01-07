// import React, { useState } from 'react';

// const Search = () => {
//     let [search, setSearch] = useState();
//     let [searchResults, setSearchResults] = useState();

//     const getMovies = async (search) => {
//         let res = await fetch(`/api/getMovies/?query=${search}`);
//         let body = await res.json();

//         //If the request status has not succeeded then throw an error
//         if (res.status !== 200) {
//             throw new Error('Something went wrong', body.message);
//         }

//         return body;
//     }

//     const handleInput = (e) => {
//         setSearch(e.target.value), () => {
//             getMovies(search).then(res => {
//                 setSearchResults(res.response.results);
//             })
//         }
//     }

//     return (
//         <div className='search-wrapper'>
//             <div className='search-bar'>
//                 <input
//                     type='text'
//                     placeholder='Search...'
//                     value={search}
//                     onChange={handleInput}
//                     className='search-input'
//                 />
//             </div>
//             <div>

//             </div>
//         </div>
//     )
// }

// export default Search;