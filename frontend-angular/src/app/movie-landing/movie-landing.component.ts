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

  constructor(private router: Router, private apollo: Apollo) { }

  //transfer data over but in image not details
  redirectDetails(i: any) {
    // console.log(this.movies[i]);
    this.apollo
      .watchQuery({
        query: gql`
          {
            getMovieById(movie_id: "${this.movies[i].id}") {
              backdrop_path
              overview
              original_title
              poster_path
              crew {
                id
                name
                profile_path
              }
              genres {
                name
              }
              id
              title
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        let data = result?.data?.getMovieById;
        this.router.navigateByUrl('/details', {
          state: {
            id: data.id,
            title: data.title,
            overview: data.overview,
            actors: data.crew,
            genres: data.genres,
            poster: data.poster_path,
            backdrop: data.backdrop_path
          }
        })
        console.log(data)
      });
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
