import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState } from '../../shared/types/auth';
import { User } from '../../shared/types/user';
import { TokenService } from '../token/token';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly tokenService = inject(TokenService);
  private readonly authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: undefined,
  });

  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  setAuthenticated(): void {
    this.authState$.next({
      isAuthenticated: true,
    });
  }

  clearAuthentication(): void {
    this.tokenService.clearToken();
    this.authState$.next({
      isAuthenticated: false,
      user: undefined,
    });
  }
}
