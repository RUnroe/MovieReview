import React, { useState } from 'react';
import Search from '../components/Search';
import MovieDetails from '../components/MovieDetails';

const MovieLanding = () => {
    let [movies, setMovies] = useState([]);
    let [pages, setPages] = useState(1);

    const getMovies = async (pagecount) => {
        let res = await fetch(`/api/getMovies/?pagenum=${pagecount}`);
        let body = await res.json();

        //If the request status has not succeeded then throw an error
        if (res.status !== 200) {
            throw new Error('Something went wrong', body);
        }

        return body;
    }

    const changePage = (page) => {
        setMovies([])

        getMovies(page).then(res => {
            setMovies(res.response.results)
            setPages(res.response.page)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='movie-landing-wrapper'>
            <div>
                <div className='movie-landing-header-text'>Movies</div>
                <div>Page {pages}</div>
            </div>
            <div>
                {movies.map((movie => {
                    return <MovieDetails key={movie.id} changePage={changePage} />
                }))}
            </div>
            <div className='page-switch-btn btn-prev'>
                prev
            </div>
            <div className='page-switch-btn btn-next'>
                next
            </div>
        </div>
    )
}

export default MovieLanding;