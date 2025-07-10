import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthState } from '../../shared/types/auth';
import { User } from '../../shared/types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  getAuthState(): Observable<AuthState> {
    return this.authState$.asObservable();
  }

  setAuthenticated(user: User): void {
    this.authState$.next({
      isAuthenticated: true,
      user,
    });
  }

  clearAuthentication(): void {
    this.authState$.next({
      isAuthenticated: false,
      user: null,
    });
  }
}
