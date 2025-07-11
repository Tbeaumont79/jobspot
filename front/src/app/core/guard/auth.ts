import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { TokenService } from '../services/token/token';
import { AuthStateService } from '../services/auth/auth-state';

export const authGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const authStateService = inject(AuthStateService);
  const router = inject(Router);

  if (!tokenService.hasValidToken()) {
    router.navigate(['/login']);
    return false;
  }

  return authStateService.getAuthState().pipe(
    map((state) => state.isAuthenticated),
    tap((isAuthenticated) => {
      if (!isAuthenticated && !tokenService.hasValidToken()) {
        router.navigate(['/login']);
      }
    })
  );
};
