import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/MovieDetails.scss';

const MovieDetails = () => {
    let [reviews, setReviews] = useState([]);
    // let [user_id, setUserID] = useState([]);
    let [reviewerName, setReviewerName] = useState('');

    let location = useLocation();

    let movie_id = location.state.movie_id;
    let title = location.state.title;
    let banner = `http://image.tmdb.org/t/p/w500${location.state.banner}`
    let genre = location.state.genre;
    let cast = location.state.cast;
    let rating = location.state.rating;
    let overview = location.state.overview;

    useEffect(() => {
        getReviews();
    }, [])

    //557 test movie
    const getReviews = async () => {
        let urls = [];

        await fetch(`http://localhost:3005/api/${movie_id}/review`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            for (let i = 0; i < data.length; i++) {
                let url = 'http://localhost:3005/api/user/'

                urls.push(url += data[i].user_id)
                // setUserID(user_id);
            }

            console.log(data);
            // if (data.length < reviews.length)

            console.log(urls);

            setReviews(data);
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            console.log(data);
        })
    }

    const addReview = async () => {
        await fetch(`http://localhost:3005/api/${movie_id}/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                
            })
        }).then(res => {
            return res.json();
        })
    }

    const DisplayActors = () => {
        let actors = [];

        for (let i = 0; i < cast.length; i++) {
            actors.push(cast[i]);
        }

        return (
            <div>
                {actors && actors.map((actor, i) => {
                    return (
                        <div key={i}>
                            <img
                                src={actor.pic === null ? '/images/placeholder.png' : `http://image.tmdb.org/t/p/w500${actor.pic}`}
                                alt={actor.name}
                                className='movie-details-actor'
                            />
                            <div className='movie-details-actor-name'>{`${actor.name}`}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const DisplayReviews = () => {
        return (
            <div className='reviews-wrapper'>
                {
                    reviews.map((review, i) => {
                        return (
                            <div key={i} className='reviews-container'>
                                <div className='review-description'>{review.review}</div>
                                <div className='reviewer-name'>-{reviewerName}</div>
                                {/* {console.log(reviews)} */}
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className='movie-details-wrapper'>
            <div className='movie-details-header'>
                <div className='back'>&#8592;</div>
                <div className='movie-details-container'>
                    <div className='movie-details-banner-container'>
                        <img src={banner} className='movie-details-banner' />
                    </div>
                    <div className='movie-details-bar'>
                        <span className='movie-details-title'>{title}</span>
                        <div className='movie-details-genre-and-rating'>{genre} | {rating}Rating</div>
                    </div>
                    <div className='movie-details-actors-wrapper'>
                        <div className='movie-details-actors-header'>Actors</div>
                        <div className='movie-details-actors-container'>
                            <DisplayActors />
                        </div>
                        <div className='movie-details-overview-wrapper'>
                            <div className='movie-details-overview-header'>Overview</div>
                            <div className='movie-details-overview-description'>
                                {overview}
                            </div>
                        </div>
                        <div className='add-review-btn' onClick={() => { addReview() }}>Add Review &#x2B;</div>
                        <DisplayReviews />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;