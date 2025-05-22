import { Routes } from '@angular/router';

import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import {EditorComponent} from './article/editor/editor.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {AdminGuard} from './shared/guard/admin.guard';
//import { HomeComponent } from './home/home.component';

export const routes: Routes = [
//  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'signin', component: SigninComponent, title: 'Sign In' },
  { path: 'signup', component: SignupComponent, title: 'Sign Up' },
  { path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'articles',
    canActivate: [AuthGuard],
    loadComponent: () => import('./article/list/list.component').then(m => m.ListComponent) },
  { path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () => import('./auth/role/role.component').then(m => m.RoleComponent) },
  {
    path: 'editor',
    component: EditorComponent,
    title: 'Editor'
  },
  {
    path: 'editor/:slug',
    component: EditorComponent,
    title: 'Editor'
  }
];
