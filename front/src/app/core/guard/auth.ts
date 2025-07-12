import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthStateService } from '../services/auth/auth-state';

export const authGuard: CanActivateFn = (): Observable<boolean> | boolean => {
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  return authStateService.getAuthState().pipe(
    map((user) => {
      if (user) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};
