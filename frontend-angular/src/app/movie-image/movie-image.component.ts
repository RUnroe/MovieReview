import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-movie-image',
  templateUrl: './movie-image.component.html',
  styleUrls: ['./movie-image.component.css']
})

export class MovieImageComponent implements OnInit {
  // movie_id: string = "557";
  @Input() movie: any = {};

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    // console.log(this.movie.id)
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         getMovieById(movie_id: "${this.movie.id}") {
    //           backdrop_path
    //           overview
    //           original_title
    //           poster_path
    //           crew {
    //             id
    //             name
    //             profile_path
    //           }
    //           genres {
    //             name
    //           }
    //           id
    //           title
    //         }
    //       }
    //     `,
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     this.movie = (result?.data?.getMovieById);
    //     // navigate to details page
    //     // console.log(this.movie);
    //   });
  }
}
