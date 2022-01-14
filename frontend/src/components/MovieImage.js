import React from 'react';
import '../styles/MovieImage.scss';

const MovieImage = (props) => {
    let movieImage = props.posterPath === null;
    let rating = null;

    let { name } = props;

    return (
        <div>
            <div className='movie-image-container' onClick={() => { props.changePage('/movie/' + props.id) }}>
                <img src={movieImage} className='movie-image' />
            </div>
            <div className='movie-name'>{name}Movie Title</div>
        </div>
    )
}

export default MovieImage;