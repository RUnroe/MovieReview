import { Location } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, Input, OnInit, Output } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailsComponent implements OnInit {
  @Output() movie_id: string = "557"; //634649
  @Input() loggedInUser: any = {};
  @Input() isAdmin: Boolean = false;
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

  constructor(private location: Location, private apollo: Apollo) { }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }
  setModal(value: boolean): void {
    this.openModal = value;
  }

  previousPage() {
    this.location.back();
  }

  addRating(value: any): void {
    let input = { movie_id: `${this.data.id}`, rating: value, api_key: this.user.api_key }
    console.log("input", input);
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

  removeReview(review_id: String): void {
    // fetch(`http://localhost:3005/api/review/${review_id}`, {
    //       method: 'DELETE',
    //       credentials: 'include',
    //       headers: { 'Content-Type': 'application/json' }
    //   }).then(res => {
    //       return res.json();
    //   })
    let input = {
      api_key: this.loggedInUser.api_key,
      review_id
    }
    this.apollo.mutate({
      mutation: gql`
      mutation Mutation($input: DeleteReviewInput) {
        deleteReview(input: $input)
      }
      `,
      variables: {
        input
      }
    })
    .subscribe((result: any) => {
      //Console.log if the review was removed
      console.log(`Review for movie (${this.movie_id}) created: `, result?.data?.createReview);
    });
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
      // console.log(data);
      this.loggedInUser = (data);
      this.isAdmin = data.is_admin;
          // console.log(this.loggedInUser, this.isAdmin);
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

    this.apollo
      .watchQuery({
        query: gql`
        {
          getRatings(movie_id: "${this.data.id}") {
            rating
          }
        }
      `,
      })
      .valueChanges.subscribe((result: any) => {
        this.ratings = (result?.data?.getRatings);
        console.log("Ratings", result?.data?.getRatings);
        this.getAverageReview();
      });

  }
}
