import { Location } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Output() movie_id: string = "557"; //634649
  @Output() selectedUserName: string = "";
  @Output() selectedUserId: string = "";
  @Input() loggedInUser: any = {};
  @Input() isAdmin: Boolean = false;
  reviews: any[] = [];
  ratings: any[] = [];
  averageRating: any = '';
  @Output() openModal: boolean = false;
  @Output() openDeleteModal: boolean = false;
  stateData: any = history.state;
  info: any =  localStorage.getItem('movieDetails');
  data: any = JSON.parse(this.info);
  user: any = {};

  constructor(private router: Router, private location: Location, private apollo: Apollo) { }

  toggleModal(): void {
    this.openModal = !this.openModal;
  }
  setModal(value: boolean): void {
    this.openModal = value;
  }

  setDeleteModal(value: boolean): void {
    this.openDeleteModal = value;
  }

  openDeleteAccountModal(id: string, name: string): void {
    if(this.loggedInUser.is_admin) {
      this.selectedUserId = id;
      this.selectedUserName = name;
      this.openDeleteModal = true;
    }
  }
  previousPage() {
    this.location.back();
  }

  updatePage() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
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
  }

  removeReview(review_id: String): void {
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
      });
  }

  getAverageReview() {
    let total = 0;

    for (let i = 0; i < this.ratings.length; i++) {
      total += this.ratings[i].rating;
    }

    let average = Math.round(total / this.ratings.length);

    // if (isNaN(average)) {
    //   this.averageRating = 'N/A';
    // }

    this.averageRating = average;
  }

  

  ngOnInit(): void {
    if (localStorage.getItem('movieDetails') === null) {
      localStorage.setItem('movieDetails', JSON.stringify(this.stateData));
      this.updatePage();
    }

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
        // console.log("Review", result?.data?.getReviews);
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
        // console.log("Ratings", result?.data?.getRatings);
        this.getAverageReview();
      });

  }
}
