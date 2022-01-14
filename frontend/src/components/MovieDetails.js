import React, { useState, useEffect } from 'react';
import '../styles/MovieDetails.scss';

const MovieDetails = () => {
    let [movieInfo, setMovieInfo] = useState('');

    let dummyarray = ['larry', 'jerry', 'harry', 'ben', 'melinda', 'joe', 'carrie', 'velma'];

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
                        <div className='movie-details-description'>
                            Movie Description
                        </div>
                        <div>
                            Reviews
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;