import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService = inject( AuthService );
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    tap( isAuthenticated => {
      if ( !isAuthenticated ) {
        router.navigate(['./auth/login'])
      }
    }),
  );
}

export const authGuardCanMatch: CanMatchFn = (route, segments) => checkAuthStatus();

export const authGuardCanActivate: CanActivateFn = (route, state) => checkAuthStatus();

