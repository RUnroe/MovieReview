import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RegisterComponent } from './register/register.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { HeaderComponent } from './header/header.component';
import { MovieImageComponent } from './movie-image/movie-image.component';
import { MovieLandingComponent } from './movie-landing/movie-landing.component';
import { ReviewModalComponent } from './review-modal/review-modal.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'details', component: MovieDetailsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'delete-account', component: DeleteAccountComponent},
  { path: 'header', component: HeaderComponent},
  { path: 'movie-image', component: MovieImageComponent},
  { path: 'movie-landing', component: MovieLandingComponent},
  { path: 'review-modal', component: ReviewModalComponent},
  { path: 'search', component: SearchComponent},
  { path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  MovieDetailsComponent,
  LoginComponent,
  RegisterComponent,
  DeleteAccountComponent,
  HeaderComponent,
  MovieImageComponent,
  MovieLandingComponent,
  ReviewModalComponent,
  SearchComponent,
  ChangePasswordComponent
]
