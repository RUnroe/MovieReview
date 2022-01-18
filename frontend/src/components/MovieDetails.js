import React, { useState, useEffect } from 'react';
import '../styles/MovieDetails.scss';
import Review from './Review';

const MovieDetails = () => {
    let [movieInfo, setMovieInfo] = useState('');

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
                        <div className='movie-details-banner'></div>
                    </div>
                    <div className='movie-details-bar'>
                        <span className='movie-details-title'>Title</span>
                        <div className='movie-details-genre-and-rating'>Genre | Rating</div>
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
                            Movie Description
                        </div>
                        <div className='add-review-btn' onClick={() => {addReview()}}>Add Review &#x2B;</div>
                        <div>
                            <Review />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;