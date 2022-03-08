import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
// import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/.material-kJTStIAi/toolbar';
import { MatSidenavModule } from '@angular/.material-kJTStIAi/sidenav';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { MatTreeModule } from '@angular/.material-kJTStIAi/tree';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StarRatingModule } from './star-rating/star-rating.module';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from './star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ReviewModalComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule, ApolloModule, HttpClientModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTreeModule,
    BrowserAnimationsModule,
    StarRatingModule,
    CommonModule
  ],
  providers: [   
    {
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'http://localhost:3005/graphql',
        }),
      };
    },
    deps: [HttpLink],
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
