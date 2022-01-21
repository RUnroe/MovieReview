import React, { useEffect, useState } from 'react';
import '../styles/MovieImage.scss';
import { useNavigate } from 'react-router-dom';

const MovieImage = (movie) => {
    let movieImage = movie.image === null ? '' : `http://image.tmdb.org/t/p/w500${movie.image}`;
    let name = movie.name;

    let navigate = useNavigate();

    const getMovieDetails = async () => {
        await fetch(`http://localhost:3005/api/movie/${movie.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            // console.log(data)
            let genres = data.genres;
            let cast = data.cast;
            let genreArr = [];
            let castArr = [];

            for (var i = 0; i < genres.length; i++) {
                genreArr.push(genres[i].name);
            }

            for (var i = 0; i < cast.length; i++) {
                castArr.push({ id: cast[i].id, name: cast[i].name, pic: cast[i].profile_path });
            }

            navigate('/details', {
                state: {
                    movie_id: data.id,
                    title: data.title,
                    banner: data.backdrop_path,
                    genre: genreArr.join(', '),
                    cast: castArr,
                    overview: data.overview,
                }
            });
        })
    }


    // console.log(movieTitle)
    // const

    return (
        <div>
            <div className='movie-image-container' onClick={() => { getMovieDetails() }}>
                <img src={movieImage} className='movie-image' />
            </div>
            <div className='movie-name'>{name}</div>
        </div>
    )
}

export default MovieImage;