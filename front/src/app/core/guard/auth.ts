import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthStateService } from '../services/auth/auth-state';

export const authGuard: CanActivateFn = (): Observable<boolean> | boolean => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  return authStateService.getAuthState().pipe(
    map((state) => {
      if (state.isAuthenticated) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
