import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/MovieDetails.scss';
import Review from './Review';

const MovieDetails = () => {
    let location = useLocation();

    let title = location.state.title;
    let banner = `http://image.tmdb.org/t/p/w500${location.state.banner}`
    let genre = location.state.genre;
    let rating = location.state.rating;
    let overview = location.state.overview;
    let review = location.state.review;
    let reviewer = location.state.reviewer;

    let dummyarray = ['larry', 'jerry', 'harry', 'ben', 'melinda', 'joe', 'carrie', 'velma'];


    const addReview = async (movie_id) => {
        await fetch(`http://localhost:3005/api/${movie_id}/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            })
        }).then()
    }

    return (
        <div className='movie-details-wrapper'>
            <div className='movie-details-header'>
                <div className='back'>&#8592;</div>
                <div className='movie-details-container'>
                    <div>
                        <img src={banner} className='movie-details-banner' />
                    </div>
                    <div className='movie-details-bar'>
                        <span className='movie-details-title'>{title}</span>
                        <div className='movie-details-genre-and-rating'>{genre} | {rating}Rating</div>
                    </div>
                    <div className='movie-details-actors-wrapper'>
                        <div className='movie-details-actors-header'>Actors</div>
                        <div className='movie-details-actors-container'>
                            {dummyarray.map((actor => {
                                return (
                                    <div className='movie-details-actor'>{actor}</div>
                                )
                            }))}
                        </div>
                        <div className='movie-details-actors-header'>Overview</div>
                        <div className='movie-details-description'>
                            {overview}
                        </div>
                        <div className='add-review-btn' onClick={() => { addReview() }}>Add Review &#x2B;</div>
                        <div className='reviews-wrapper'>
                            <div className='reviews-container'>
                                <div className='review-description'>{review}</div>
                                <div className='reviewer-name'>-{reviewer}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;