import React, { useState, useEffect } from 'react';

const MovieDetails = () => {
    let [movieInfo, setMovieInfo] = useState('');

    useEffect(() => {
    }, [])

    const Loading = () => {
        return (
            <div className='movie-page-wrapper'>
                <span>Loading Info...</span>
            </div>
        )
    }

    return (
        <div className='movie-page-wrapper'>
            <div className='movie-page-header'>
                back
                <div className='movie-page-details'>
                    <div>
                        <div>
                            Image
                        </div>
                        <div className='movie-page-title'>
                            Title
                        </div>
                    </div>
                    <div>
                        <div>
                            Release Year | Rating
                        </div>
                    </div>
                    <div>
                        <div className='movie-page-description'>
                            Movie Description
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;