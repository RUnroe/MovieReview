import { Component, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-movie-image',
  templateUrl: './movie-image.component.html',
  styleUrls: ['./movie-image.component.css']
})
export class MovieImageComponent implements OnInit {
  movie_id: string = "557";
  movie: any = {};
  
  constructor(private apollo: Apollo) { }
  
  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getMovieById(movie_id: "${this.movie_id}") {
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
        this.movie = (result?.data?.getMovieById);
        console.log(this.movie);
      });
    const MovieImage = () => {
      // let movieImage = movie.image === null ? '' : `http://image.tmdb.org/t/p/w500${movie.image}`;
      // let name = movie.name;
  
      // let navigate = useNavigate();
  
      const getMovieDetails = async () => {
  //         await fetch(`http://localhost:3005/api/movie/${movie.id}`, {
  //             method: 'GET',
  //             headers: { 'Content-Type': 'application/json' }
  //         }).then((res) => {
  //             if (res.ok) {
  //                 return res.json();
  //             }
  //         }).then((data) => {
  //             let genres = data.genres;
  //             let cast = data.cast;
  //             let genreArr = [];
  //             let castArr = [];
  
  //             for (var i = 0; i < genres.length; i++) {
  //                 genreArr.push(genres[i].name);
  //             }
  
  //             for (var i = 0; i < cast.length; i++) {
  //                 castArr.push({ id: cast[i].id, name: cast[i].name, pic: cast[i].profile_path });
  //             }
  
  //             // /${data.id} 
  //             navigate(`/movie/${data.id}`, {
  //                 state: {
  //                     movie_id: data.id,
  //                     title: data.title,
  //                     banner: data.backdrop_path,
  //                     poster: data.poster_path,
  //                     genre: genreArr.join(', '),
  //                     cast: castArr,
  //                     overview: data.overview
  //                 }
  //             });
  //         })
  //     }
  // }
      }}}
}
