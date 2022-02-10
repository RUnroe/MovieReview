import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { HeaderComponent } from './header/header.component';
import { MovieImageComponent } from './movie-image/movie-image.component';
import { MovieLandingComponent } from './movie-landing/movie-landing.component';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DeleteAccountComponent,
    HeaderComponent,
    MovieImageComponent,
    MovieLandingComponent,
    ReviewModalComponent,
    SearchComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
