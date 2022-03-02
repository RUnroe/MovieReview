import { Component, OnInit, Input } from '@angular/core';
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
    // this.apollo
    //   .watchQuery({
    //     query: gql`
    //       {
    //         getMovieById(movie_id: "${this.movie_id}") {
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
    //     // console.log(this.movie);
    //   });
      // console.log(this.movie.poster_path)
  }
}
