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
  user: any = {};

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

  addRating(value: any): void {
    let input = { movie_id: this.data.id, rating: value, api_key: this.user.api_key }

    this.apollo.mutate({
      mutation: gql`
        mutation CreateRating($input: RatingInput) {
            createRating(input: $input)
        }
      `,
      variables: {
        input
      }
    })
      .subscribe((result: any) => {
        console.log(`Review for movie (${this.data.id}) created: `, result?.data?.createRating);
      });
    console.log(value);
  }

  getAverageReview() {
    let total = 0;

    for (let i = 0; i < this.ratings.length; i++) {
      total += this.ratings[i].rating;
    }

    let average = Math.round(total / this.ratings.length);

    this.averageRating = average;
  }

  ngOnInit(): void {
    // localStorage.setItem('movieDetails', JSON.stringify(this.data));
    // localStorage.getItem('movieDetails');

    // this.apollo
    // .watchQuery({
    //   query: gql`
    //     {
    //       getRatings(movie_id: "${this.data.id}") {
    //         movie_id
    //         user_id
    //         rating
    //       }
    //     }
    //   `,
    // })
    // .valueChanges.subscribe((result: any) => {
    //   this.ratings = (result?.data?.getRatings);
    //   console.log(this.ratings);
    // });

    fetch(`http://localhost:3005/api/auth`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    }).then((data) => {
      console.log(data);
      this.user = (data);
    })


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
  }
}
