import { Component, OnDestroy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.css']
})
export class ReviewModalComponent implements OnInit {
  @Input() movie_id = "";
  userReview: String = "";
  @Input() isModalOpen: boolean = false;
  @Output() toggleModalEvent = new EventEmitter<boolean>();
  user: any = {};

  constructor(private router: Router, private apollo: Apollo) { }

  updatePage() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  addReview(): void {
    let input = { movie_id: `${this.movie_id}`, review: this.userReview, api_key: this.user.api_key }
    console.log(input);
    this.apollo.mutate({
      mutation: gql`
            mutation CreateReview($input: ReviewInput) {
                createReview(input: $input)
            }
          `,
      variables: {
        input
      }
    })
      .subscribe((result: any) => {
        this.closeModal();
        window.location.reload();
      });      
  }
  openModal(): void {
    console.log("open modal")
    this.toggleModalEvent.emit(true);
  }
  closeModal(): void {
    console.log("close modal")
    this.toggleModalEvent.emit(false);
  }
  ngOnInit(): void {


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
      this.user = (data);
    })
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
}
