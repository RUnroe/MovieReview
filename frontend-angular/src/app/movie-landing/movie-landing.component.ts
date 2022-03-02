import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-movie-landing',
  templateUrl: './movie-landing.component.html',
  styleUrls: ['./movie-landing.component.css']
})

export class MovieLandingComponent implements OnInit {
  movies: any[] = [];
  pageNum: number = 0;

  constructor(private router: Router, private apollo: Apollo) {}

  //transfer data over
  redirectDetails(i: any) {
    console.log(this.movies[i]);
    this.router.navigateByUrl('/details', {
      state: {
        id: '',
        name: '',
      }
    })
  }

  changePageUp() {
    this.pageNum += 1;
    localStorage.setItem('moviePage', JSON.stringify(this.pageNum));
  }

  changePageDown() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
    }
    localStorage.setItem('moviePage', JSON.stringify(this.pageNum));
  }

  changeToFirstPage() {
    this.pageNum = ((this.pageNum * 0) + 1);
    localStorage.setItem('moviePage', JSON.stringify(this.pageNum));
  }

  ngOnInit(): void {
    this.pageNum = JSON.parse(localStorage.getItem('moviePage') || '1');
    this.apollo
      .watchQuery({
        query: gql`
          {
            getMovies {
              id
              original_title
              title
              poster_path
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.movies = (result?.data?.getMovies);
      });
  }
}
