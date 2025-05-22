import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    const isAdmin = this.authService.isAdmin();
    if (!isAdmin) {
      // Rediriger vers une page non autorisée ou la page d'accueil
      return this.router.createUrlTree(['/articles']);
    }
    return true;
  }
}
