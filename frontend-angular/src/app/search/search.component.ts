import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const Search = ({  }) => {
  
      const getMoviesBySearch = async () => {
          // await fetch(`http://localhost:3005/api/search?search=${searchParams}`, {
          //     method: 'GET',
          //     headers: { 'Content-Type': 'application/json' }
          // }).then(res => {
          //     if (res.ok) {
          //         return res.json();
          //     } else {
          //         return Promise.reject(res);
          //     }
          // }).then((data) => {
          //     onSearch(data.results);
          //     setSearchParams('');
          // })
      }
    }
  }
}
