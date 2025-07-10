import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TokenService } from '../token/token';
import { AuthResponse, LoginCredentials } from '../../shared/types/auth';
import { User } from '../../shared/types/user';
import { AuthStateService } from './auth-state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);
  private readonly authStateService = inject(AuthStateService);

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth`, credentials, {
        headers: { 'Content-Type': 'application/ld+json' },
        withCredentials: true,
      })
      .pipe(
        tap((response) => {
          this.authStateService.setAuthenticated(response.user);
        })
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${environment.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.tokenService.clearToken();
          this.authStateService.clearAuthentication();
        })
      );
  }

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User | null>(`${environment.apiUrl}/me`, {
      withCredentials: true,
    });
  }
}
