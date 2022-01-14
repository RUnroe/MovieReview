import React, { useEffect, useState } from 'react';
import MovieImage from './MovieImage';
import '../styles/Landing.scss';

const MovieLanding = () => {
    let [moviess, setMovies] = useState([]);
    //dummy array
    let movies = ['one', 'two', 'three', 'four', 'five']
    let [pages, setPages] = useState(1);

    useEffect(() => {
        getMovies('1').then((res) => {
            console.log(res);
        });
    }, [])

    const getMovies = async (pagecount) => {
        let res = await fetch(`/api/getMovies/?pagenum=${pagecount}`);
        let body = await res.json();

        //If the request status has not succeeded then throw an error
        if (res.status !== 200) {
            throw new Error('Something went wrong', body);
        }

        return body;
    }

    const changePage = (page) => {
        //Resets Movies array to be empty which then fills the array with the getMovies function
        setMovies([]);

        getMovies(page).then((res) => {
            setMovies(res.response.results);
            setPages(res.response.page);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className='movie-landing-wrapper'>
            <div className='movie-landing-header-wrapper'>
                <div className='movie-landing-header'>
                    Movies
                    <div className='movie-landing-page'>Page {pages}</div>
                </div>
            </div>
            <div className='movie-landing-clickable-wrapper'>
                {movies.map((movie => {
                    return (
                        //Grabs movie ID then gives it to MovieImage to change page
                        <MovieImage key={movie.id} id={movie.id} changePage={changePage} />
                    )
                }))}
            </div>
            <div className='page-switch-btn-wrapper'>
                <div>
                    { pages === 1 ? null : (
                        <div className='page-switch-btn btn-prev'>
                            Previous
                        </div>
                    )}
                    <div className='page-switch-btn btn-next' onClick={() => { getMovies() }}>
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieLanding;