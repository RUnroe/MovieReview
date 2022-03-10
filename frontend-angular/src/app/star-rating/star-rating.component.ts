import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnInit {

  @Output() ratingEvent = new EventEmitter<number>();

  selectedRating = 0;
  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray star-hover star'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray star-hover star'
    }

  ];

  constructor() {}

  ngOnInit(): void {}

  selectStar(value: any): void {
      this.stars.filter((star) => {
        if (star.id <= value) {
          star.class = 'star-gold star';
        } else {
          star.class = 'star-gray star';
        }
        return star;
      });
    this.selectedRating = value;
    this.ratingEvent.emit(value);
  }
}