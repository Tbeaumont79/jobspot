import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginCredentials } from '../../shared/types/auth';
import { User } from '../../shared/types/user';
import { AuthStateService } from './auth-state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly http = inject(HttpClient);
  private readonly authStateService = inject(AuthStateService);

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap(() => {
          this.authStateService.setAuthenticated();
        })
      );
  }

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User | null>(`${environment.apiUrl}/me`);
  }
}
