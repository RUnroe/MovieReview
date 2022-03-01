import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-movie-image',
  templateUrl: './movie-image.component.html',
  styleUrls: ['./movie-image.component.css']
})
export class MovieImageComponent implements OnInit {

  constructor() { }

  // @Input() movies: any[] = [
  //   { name: 'one', phone: 'phone-one' },
  //   { name: 'two', phone: 'phone-two' },
  //   { name: 'three', phone: 'phone-three' }
  // ];

  @Input() movies: any[] = [];

  ngOnInit(): void {}
}
