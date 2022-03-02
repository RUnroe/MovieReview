import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  loggedInUser: any = {};
  isAdmin: Boolean = false;
  reviews: any[] = [];
  ratings: any[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {

    const MovieDetails = () => {
  
      // let movie_id = location.state.movie_id;
      // let title = location.state.title;
      // let banner = `http://image.tmdb.org/t/p/original${location.state.banner}`;
      // let poster = `http://image.tmdb.org/t/p/w500${location.state.poster}`;
      // let genre = location.state.genre;
      // let cast = location.state.cast;
      // let overview = location.state.overview;
  
      //useEffect will check everytime that userRating is changed and will call addRating()
  
      // const toggleModal = () => {
      //     setModal(!modal);
      // }
  
      // const toggleText = (id) => {
      //     setReadMore(!readMore);
      //     setClickedReview(id);
      // }
  
      // const handleChange = (score) => {
      //     setUserRating(score);
      // }
  
      const getLoggedInUser = async () => {
        this.apollo
        .watchQuery({
          query: gql`
            {
              getCredentials {
                fname
                lname
                is_admin
                api_key
                user_id
              }
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          this.loggedInUser = (result?.data?.getCredentials);
          this.isAdmin = result?.data?.getCredentials?.is_admin;
          console.log(this.loggedInUser);
        });
        //   await fetch(`http://localhost:3005/api/auth`, {
        //       method: 'GET',
        //       credentials: 'include',
        //       headers: { 'Content-Type': 'application/json' },
        //   }).then((res) => {
        //       if (res.ok) {
        //           return res.json();
        //       } else {
        //           return Promise.reject(res);
        //       }
        //   }).then((data) => {
              // console.log(data);
              // if (data.is_admin === false) {
              //     setAdmin(false);
              // } else if (data.is_admin === true) {
              //     setAdmin(true);
              // }
              // setLoggedInUser(data.user_id);
        //   })
      }
  
      const getReviews = async () => {
        //TODO: Use this variable
        let movie_id: String = "";
        this.apollo
        .watchQuery({
          query: gql`
            {
              getReviews(movie_id: "${movie_id}") {
                review
                user_id
                review_id
                movie_id
                user
              }
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          this.reviews = (result?.data?.getReviews);
          console.log(this.reviews);
        });
          // await fetch(`http://localhost:3005/api/review/${movie_id}`, {
          //     method: 'GET',
          //     headers: { 'Content-Type': 'application/json' },
          // }).then((res) => {
          //     if (res.ok) {
          //         return res.json();
          //     } else {
          //         return Promise.reject(res);
          //     }
          // }).then((data) => {
          //     setReviews(data);
          // })
      }
  
      const removeReview = async () => {
        //TODO: Use this variable
        let review_id: String = "";
        this.apollo
        .watchQuery({
          query: gql`
            {
              deleteReview(review_id: "${review_id}")
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          //Console.log if the review was removed
          console.log(`Review (${review_id}) removed: `, result?.data?.deleteReview);
        });
          //await fetch(`http://localhost:3005/api/review/${review_id}`, {
          //     method: 'DELETE',
          //     credentials: 'include',
          //     headers: { 'Content-Type': 'application/json' }
          // }).then(res => {
          //     return res.json();
          // })
      }
  
      const getRating = async () => {
        //TODO: Use this variable
        let movie_id: String = "";
        this.apollo
        .watchQuery({
          query: gql`
            {
              getRatings(movie_id: "${movie_id}") {
                movie_id
                user_id
                rating
              }
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          this.ratings = (result?.data?.getRatings);
          console.log(this.ratings);
        });
          // await fetch(`http://localhost:3005/api/rating/${movie_id}`, {
          //     method: 'GET',
          //     headers: { 'Content-Type': 'application/json' }
          // }).then(res => {
          //     if (res.ok) {
          //         return res.json();
          //     } else {
          //         return Promise.reject(res);
          //     }
          // }).then((data) => {
          //     setRatings(data);
          //     //TODO: Set Value of looged in user to the rating.
          //     // setLoggedInUserRating();
          // })
      }
  
      const addRating = async () => {
        //TODO: Use these variable
        let movie_id: String = "";
        let rating: number = 1;
        this.apollo
        .watchQuery({
          query: gql`
            {
                createRating(movie_id: ${movie_id}, rating: ${rating})
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          //Console.log if the review was removed
          console.log(`Rating for movie (${movie_id}) created: `, result?.data?.createRating);
        });
          // await fetch(`http://localhost:3005/api/rating/${movie_id}`, {
          //     method: 'POST',
          //     credentials: 'include',
          //     headers: { 'Content-Type': 'application/json' },
          //     body: JSON.stringify({
          //         rating: userRating
          //     })
          // }).then(res => {
          //     return res.json();
          // }).then((data) => {
          //     console.log(data);
          // })
      }
  
      const DisplayAverageReview = () => {
          let total = 0;
  
          // for (let i = 0; i < ratings.length; i++) {
          //     total += ratings[i].rating;
          // }
          // let average = Math.round(total / ratings.length);
  
          // if (isNaN(average)) {
          //     //average = 'N/A';
          // }
      }
  
      const DisplayActors = () => {
          let actors = [];
  
          // for (let i = 0; i < cast.length; i++) {
          //     actors.push(cast[i]);
          // }
      }
    }
  }
}
