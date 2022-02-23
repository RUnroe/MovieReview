import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-movie-landing',
  templateUrl: './movie-landing.component.html',
  styleUrls: ['./movie-landing.component.css']
})
export class MovieLandingComponent implements OnInit {

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getMovies {
             original_title
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        console.log(result);
      });
    const MovieLanding = () => {
      // let [movies, setMovies] = useState([]);
      // let [moviePage, setMoviePage] = useState(parseInt(localStorage.getItem('moviePage')));
  
      // const changePageUp = () => {
      //     setMoviePage(moviePage + 1);
      // }
  
      // const changePageDown = () => {
      //     setMoviePage(moviePage - 1);
      // }
  
      // const changeToFirstPage = () => {
      //     setMoviePage((moviePage * 0) + 1)
      // }
  
      // const changeMovies = (results) => {
      //     setMovies(results);
      // }
  
      // const getMovies = async () => {
      //     await fetch(`http://localhost:3005/api/movies?page=${moviePage}&count=16`, {
      //         method: 'GET',
      //         headers: { 'Content-Type': 'application/json' }
      //     }).then((res) => {
      //         return res.json();
      //     }).then((data) => {
      //         setMovies(data);
      //     })
      // }
    }
  }
}
