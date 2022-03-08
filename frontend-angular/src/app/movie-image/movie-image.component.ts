import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-movie-image',
  templateUrl: './movie-image.component.html',
  styleUrls: ['./movie-image.component.css']
})

export class MovieImageComponent implements OnInit {
  @Input() movie: any = {};

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
  }
}
