import {inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');
  const router = inject(Router);

  if (!token) {
    router.navigate(['/signin']);
    return false;
  }
  return true;
};
