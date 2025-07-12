import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '../../shared/types/user';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthState } from '../../shared/types/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly http = inject(HttpClient);
  public authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  getAuthState(): Observable<User | null> {
    return this.http.get<User>(`${environment.apiUrl}/api/me`).pipe(
      tap((user) => {
        this.authState$.next({
          isAuthenticated: true,
          user: user,
          isLoading: false,
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.authState$.next({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
        return of(null);
      })
    );
  }
  setAuthenticated(): void {
    this.authState$.next({
      isAuthenticated: true,
      user: null,
      isLoading: false,
    });
  }
}
