import React, { useEffect, useState } from 'react';
import MovieImage from './MovieImage';
import '../styles/Landing.scss';
import Search from './Search';

const MovieLanding = () => {
    let [movies, setMovies] = useState([]);
    let [moviePage, setMoviePage] = useState(parseInt(localStorage.getItem('moviePage')));

    useEffect(() => {
        if (isNaN(moviePage)) {
            setMoviePage(1);
        }
        localStorage.setItem('moviePage', moviePage);
        getMovies();
    }, [moviePage]);

    const changePageUp = () => {
        setMoviePage(moviePage + 1);
    }

    const changePageDown = () => {
        setMoviePage(moviePage - 1);
    }

    const changeToFirstPage = () => {
        setMoviePage((moviePage * 0) + 1)
    }

    const changeMovies = (results) => {
        setMovies(results);
    }

    const getMovies = async () => {
        await fetch(`http://localhost:3005/api/movies?page=${moviePage}&count=16`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            setMovies(data);
        })
    }

    return (
        <div className='movie-landing-wrapper'>
            <Search onSearch={changeMovies} />
            <div className='movie-landing-header-wrapper'>
                <div className='movie-landing-header'>
                    Movies
                    <div className='movie-landing-page'>Page {moviePage}</div>
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
                    {moviePage === 1 ? null : (
                        <>
                            <div className='page-switch-btn btn-prev' onClick={() => { changePageDown() }}>
                                Previous
                            </div>
                            <div className='btn-first' onClick={() => { changeToFirstPage() }}>
                                First Page
                            </div>
                        </>
                    )}
                    <div className='bottom-page-number'>Page {moviePage}</div>
                    <div className='page-switch-btn btn-next' onClick={() => { changePageUp() }}>
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieLanding;