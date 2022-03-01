import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-landing',
  templateUrl: './movie-landing.component.html',
  styleUrls: ['./movie-landing.component.css']
})

export class MovieLandingComponent implements OnInit {
  moviesArray: any[] = [{id: 1, name: 'mOne', test: 'one'}, {id: 2, name: 'mTwo', test: 'two'}, {id: 3, name: 'mThree', test: 'three'}];
  pageNum: number = 0;

  constructor(private router: Router) { }
  //Create fetch to put into movies array

  sendData(i: any) {
    console.log(this.moviesArray[i]);
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
    console.log(this.pageNum)
  }

  changePageDown() {
    if (this.pageNum > 1) {
      this.pageNum -= 1;
    }
    localStorage.setItem('moviePage', JSON.stringify(this.pageNum));
    console.log(this.pageNum)
  }

  changeToFirstPage() {
    this.pageNum = ((this.pageNum * 0) + 1);
  }

  ngOnInit(): void {
    this.pageNum = JSON.parse(localStorage.getItem('moviePage') || '1');
    
    // changeMovies (results) {
    //     setMovies(results);
    // }
  }
}
