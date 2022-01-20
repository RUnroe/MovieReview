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
            let genres = data.genres;
            let reviews = data.reviews;
            let genreArr = [];
            let reviewArr = [];
            let reviewerArr = [];

            for (var i = 0; i < genres.length; i++) {
                genreArr.push(genres[i].name);
            }

            for (var i = 0; i < reviews.length; i++) {
                reviewArr.push(reviews[i].review);
                reviewerArr.push(reviews[i].user);
            }

            navigate('/details', {
                state: {
                    title: data.title,
                    banner: data.backdrop_path,
                    genre: genreArr.join(', '),
                    overview: data.overview,
                    review: reviewArr,
                    reviewer: reviewerArr
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