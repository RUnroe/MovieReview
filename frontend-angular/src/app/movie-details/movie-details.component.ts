import { Component, OnInit, Output } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Output() movie_id: string = "557"; //634649
  loggedInUser: any = {};
  isAdmin: Boolean = false;
  // reviews: any[] = [];
  ratings: any[] = [];
  averageRating: any = 'N/A';
  @Output() openModal: boolean = false;
  data: any = history.state;

  reviews: any[] = [{
    review: 'this is test review',
    user: 'Billy'
  }, {
    review: 'ayooooo',
    user: 'Bob'
  }];


  constructor(private apollo: Apollo) { }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }
  setModal(value: boolean): void {
    this.openModal = value;
  }

  getAverageReview() {
    let total = 0;

    for (let i = 0; i < this.ratings.length; i++) {
        total += this.ratings[i].rating;
    }

    let average = Math.round(total / this.ratings.length);

    // if (isNaN(average)) {
    //     average = 'N/A';
    // }
    this.averageRating = average;
}

  ngOnInit(): void {
    // localStorage.setItem('movieDetails', JSON.stringify(this.data));
    // localStorage.getItem('movieDetails');
    
    this.apollo
      .watchQuery({
        query: gql`
        {
          getReviews(movie_id: "${this.data.id}") {
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
        console.log("Review", result?.data?.getReviews);
      });
    // console.log(this.reviews);
    // console.log(this.data.actors)

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
                createRating(movie_id: ${this.movie_id}, rating: ${rating})
            }
          `,
        })
        .valueChanges.subscribe((result: any) => {
          //Console.log if the review was removed
          console.log(`Rating for movie (${movie_id}) created: `, result?.data?.createRating);
        });
    }
  }
}
