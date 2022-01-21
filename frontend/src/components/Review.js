import React, { useState, useEffect } from 'react';
import '../styles/Login.scss';

const Review = () => {

    // useEffect(() => {
    //     getReviews();
    // }, [])

    // const getReviews = async () => {
    //     await fetch(`http://localhost:3005/api/${movie_id}/review`, {
    //         method: 'GET',
    //         headers: { 'Content-Type': 'application/json' },
    //     }).then((res) => {
    //         return res.json();
    //     }).then((data) => {
    //         console.log(data)
    //     })
    // }

    const createReview = async (movie_id) => {
        // let headers = new Headers();
        await fetch(`http://localhost:3005/api/${movie_id}/review`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            })
        }).then()
    }

    const deleteReview = async (review_id) => {
        await fetch(`http://localhost:3005/api/review/${review_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

            })
        }).then()
    }

    return (
        <div className='review-wrapper'>
            This is review
        </div >
    )
}

export default Review;