import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import '../styles/MovieDetails.scss';
import ReviewModal from './ReviewModal';

const MovieDetails = () => {
    let [clickedReview, setClickedReview] = useState(null);
    let [reviews, setReviews] = useState([]);
    let [readMore, setReadMore] = useState(false);
    let [userRating, setUserRating] = useState('');
    let [ratings, setRatings] = useState([]);
    let [modal, setModal] = useState(false);
    let [admin, setAdmin] = useState(null);

    let location = useLocation();
    let navigate = useNavigate();

    let movie_id = location.state.movie_id;
    let title = location.state.title;
    let banner = `http://image.tmdb.org/t/p/original${location.state.banner}`;
    let poster = `http://image.tmdb.org/t/p/w500${location.state.poster}`;
    let genre = location.state.genre;
    let cast = location.state.cast;
    let overview = location.state.overview;

    useEffect(() => {
        getReviews();
        getRating();
    }, []);

    //useEffect will check everytime that userRating is changed and will call addRating()
    useEffect(() => {
        if (userRating !== '') {
            addRating();
        };
    }, [userRating])

    const toggleModal = () => {
        setModal(!modal);
    }

    const toggleText = (id) => {
        setReadMore(!readMore);
        setClickedReview(id);
    }

    const handleChange = (score) => {
        // let userRatingToString = String(score);
        setUserRating(score);
    }

    const getReviews = async () => {
        await fetch(`http://localhost:3005/api/review/${movie_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            setReviews(data);
        })
    }

    const getRating = async () => {
        await fetch(`http://localhost:3005/api/rating/${movie_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        }).then((data) => {
            setRatings(data);
        })
    }

    const DisplayAverageReview = () => {
        let total = 0;

        for (let i = 0; i < ratings.length; i++) {
            total += ratings[i].rating;
        }
        let average = Math.round(total / ratings.length);

        if (isNaN(average)) {
            average = 'N/A';
        }

        return (
            <span>
                Total User Rating: {average}
            </span>
        )
    }

    const addRating = async () => {
        await fetch(`http://localhost:3005/api/rating/${movie_id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rating: userRating
            })
        }).then(res => {
            return res.json();
        }).then((data) => {
            console.log(data);
        })
    }

    // const removeReview = async () => {
    //     await fetch(`http://localhost:3005/api/review/${review_id}`, {
    //         method: 'DELETE',
    //         credentials: 'include',
    //         headers: { 'Content-Type': 'application/json' }
    //     }).then(res => {
    //         return res.json();
    //     })
    // }

    const DisplayActors = () => {
        let actors = [];

        for (let i = 0; i < cast.length; i++) {
            actors.push(cast[i]);
        }

        return (
            <div>
                {actors && actors.map((actor, i) => {
                    return (
                        <div key={i} className='actor'>
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
                {reviews.map((review, i) => {
                    let char = review.review.length;
                    let reviewToString = String(review.review);
                    return (
                        <div key={i} className='reviews-container'>
                            {char <= 50 ? (
                                //Looks at each character limit in reviews and if it's more than 250 then it will display extended div
                                <div>
                                    <div className='review-description'>{review.review}</div>
                                    <div className='reviewer-name'>-{review.user}</div>
                                </div>
                            ) : (
                                <div>
                                    {readMore === true && clickedReview === review.review_id ? (
                                        <>
                                            <div className='review-description'>{review.review}</div>
                                            <div className='reviewer-name'>-{review.user}</div>
                                            <div className='read-more-link' onClick={toggleText}>Read Less</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='review-description'>
                                                {`${reviewToString.substring(0, 50)}...`}
                                            </div>
                                            <div className='reviewer-name'>-{review.user}</div>
                                            <div className='read-more-link' onClick={() => toggleText(review.review_id)}>Read More</div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='movie-details-wrapper'>
            <div className='movie-details-header'>
                <div className='back' onClick={() => navigate(-1)}>&#8592;</div>
                <div className='movie-details-container'>
                    <div className='movie-details-banner-container'>
                        <img src={banner} className='movie-details-banner' />
                    </div>
                    <div className='movie-details-bar'>
                        <span className='movie-details-title'>{title}</span>
                        <div className='movie-details-genre-and-rating'>
                            {genre} | <DisplayAverageReview />
                            <ReactStars
                                count={5}
                                size={19}
                                // isHalf={true}
                                activeColor='#FFFFFF'
                                onChange={(e) => { handleChange(e) }}
                            />
                        </div>
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
                                <img src={poster} className='movie-details-overview-poster' />
                            </div>
                        </div>
                        <div className='add-review-btn' onClick={toggleModal}>Add Review &#x2B;</div>
                        {modal ? <ReviewModal toggle={toggleModal} movieId={movie_id} /> : null}
                        <DisplayReviews />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails;