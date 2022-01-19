import React, { useEffect, useState } from 'react';
import MovieImage from './MovieImage';
import '../styles/Landing.scss';

const MovieLanding = () => {
    let [movies, setMovies] = useState([]);
    let [movieCount, setMovieCount] = useState(24);
    let [moviePage, setMoviePage] = useState(1);
    let [pages, setPages] = useState(1);

    useEffect(() => {
        getMovies();
    }, []);

    const getMovies = async () => {
        await fetch(`http://localhost:3005/api/movies?page=${3}&count=${24}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            // console.log(data);
            setMovies(data);
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
                        <MovieImage
                            key={movie.id}
                            id={movie.id}
                            name={movie.title}
                            image={movie.poster_path}
                        />
                    )
                }))}
            </div>
            <div className='page-switch-btn-wrapper'>
                <div>
                    {pages === 1 ? null : (
                        <div className='page-switch-btn btn-prev'>
                            Previous
                        </div>
                    )}
                    <div className='page-switch-btn btn-next' onClick={() => { }}>
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieLanding;