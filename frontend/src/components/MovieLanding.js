import React, { useEffect, useState } from 'react';
import MovieImage from './MovieImage';
import '../styles/Landing.scss';

const MovieLanding = () => {
    let [movies, setMovies] = useState([]);
    let [movieCount, setMovieCount] = useState(1)
    //dummy array
    // let movies = ['one', 'two', 'three', 'four', 'five']
    let [pages, setPages] = useState(1);

    const getMovies = async (count) => {
        let res = await fetch(`http://localhost:3005/api/movies`).then((res) => {
            res.json();
        }).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        });

        setMovieCount(res.response.count);
    }

    const changePage = (count) => {
        //Resets Movies array to be empty which then fills the array with the getMovies function
        setMovies([]);

        getMovies(count).then((res) => {
            setMovies(res.response.title);
            setPages(res.response.count);
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