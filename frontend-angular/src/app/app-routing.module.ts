import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { MovieLandingComponent } from './movie-landing/movie-landing.component';
import { SearchComponent } from './search/search.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieImageComponent } from './movie-image/movie-image.component';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  { path: 'landing', component: MovieLandingComponent},
  { path: 'details', component: MovieDetailsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'delete-account', component: DeleteAccountComponent},
  { path: 'change-password', component: ChangePasswordComponent}
];

const declares = [
  MovieImageComponent
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, declares],
  declarations: declares
})
export class AppRoutingModule { }
export const routingComponents = [
  MovieDetailsComponent,
  LoginComponent,
  RegisterComponent,
  DeleteAccountComponent,
  MovieLandingComponent,
  SearchComponent,
  ChangePasswordComponent
]
