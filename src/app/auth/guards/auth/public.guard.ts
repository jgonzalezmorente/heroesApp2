import { Observable, map, tap } from 'rxjs';
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

const checkNotAuthStatus = (): Observable<boolean> => {
  const authService = inject( AuthService );
  const router = inject(Router);
  return authService.checkAuthentication().pipe(
    map( isAuthenticated => !isAuthenticated ),
    tap( notAuthenticated => {
      if ( !notAuthenticated ) {
        router.navigate(['./'])
      }
    }),
  );
}

export const publicGuardCanMatch: CanMatchFn = (route, state) => checkNotAuthStatus();

export const publicGuardCanActivate: CanActivateFn = (route, state) => checkNotAuthStatus();
