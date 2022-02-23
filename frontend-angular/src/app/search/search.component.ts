// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from "@angular/common/http";
// import { Component, OnInit } from "@angular/core";

// interface Movie {
//   name: string;
//   actor: string;
//   genre: string;
// }
// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css']
// })
// export class SearchComponent implements OnInit {
//   searchTerm!: string;
//   movies!: Movie[];
//   term!: string;

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//       this.http.get<Movie[]>('').subscribe((data: Movie[]) => {
//         this.movies = data;
//       })
//   }



//   constructor() { }

//   ngOnInit(): void {
//     const Search = ({  }) => {
  
//       const getMoviesBySearch = async () => {
//           // await fetch(`http://localhost:3005/api/search?search=${searchParams}`, {
//           //     method: 'GET',
//           //     headers: { 'Content-Type': 'application/json' }
//           // }).then(res => {
//           //     if (res.ok) {
//           //         return res.json();
//           //     } else {
//           //         return Promise.reject(res);
//           //     }
//           // }).then((data) => {
//           //     onSearch(data.results);
//           //     setSearchParams('');
//           // })
//       }
//     }
//   }
//}

import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  title!: string;
  genre!: string;
  actor!: string;
  movie: any = {};

  searchMovie() {
    console.log(this.movie);
  }
}

