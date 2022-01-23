import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../styles/ReviewModal.scss';

const ReviewModal = (props) => {
    let [writtenReview, setWrittenReview] = useState('');

    let { register, handleSubmit } = useForm();

    const handleClick = () => {
        props.toggle();
    }

    const addReview = async () => {
        await fetch(`http://localhost:3005/api/review/${props.movieId}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                review: writtenReview
            })
        }).then(res => {
            return res.json();
        }).then(() => {
            handleClick();
        })
    }

    return (
        <form onSubmit={handleSubmit(addReview)} className='modal-wrapper'>
            <div className='modal-container'>
                <span className='close' onClick={handleClick}>&times;</span>
                <div className='modal-header'>Write Review Below</div>
                <div>
                    <textarea
                        value={writtenReview}
                        onChange={(e) => { setWrittenReview(e.target.value) }}
                        maxLength='250'
                        className='modal-input'
                    />
                </div>
                <div onClick={() => { addReview() }} className='modal-btn'>Critique</div>
            </div>
        </form>
    )
}

export default ReviewModal;