import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';


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

  data: any = history.state;

  constructor(private apollo: Apollo) {  }
  toggleModal(): void {
    console.log("toggle");
  }

  ngOnInit(): void {
    // if (this.data) {
    //   sessionStorage.setItem('movie_details', JSON.stringify(this.data));
    // } else {
    //   this.data = JSON.parse(sessionStorage.getItem('movie_details'));
    // }

    const MovieDetails = () => {
      // let banner = `http://image.tmdb.org/t/p/original${location.state.banner}`;
      // let poster = `http://image.tmdb.org/t/p/w500${location.state.poster}`;

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
