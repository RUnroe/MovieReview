import { Component, OnInit } from "@angular/core";
import {Apollo, gql} from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies: any[] = [];
  movie: string = "";

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
    
  }
  searchMovie() {
    console.log(this.movie);
    this.apollo
        .watchQuery({
          query: gql`
            query GetMoviesBySearch($input: SearchInput) {
              getMoviesBySearch(input: $input) {
                id
                original_title
                title
                poster_path
              }
            }
          `,
          variables: {
            input: {search: this.movie}
          }
        })
        .valueChanges.subscribe((result: any) => {
          this.movies = (result?.data?.getMoviesBySearch);
          console.log(this.movies);
          //TODO: rerender screen here
        });
  }
}

