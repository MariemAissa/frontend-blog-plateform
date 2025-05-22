import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';

export const AUTH_ROUTES: Routes = [
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { path: 'signin', component: SigninComponent, title: 'Sign In' }
];
