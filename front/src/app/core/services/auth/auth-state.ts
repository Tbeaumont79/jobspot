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
  private authState$ = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  getAuthState(): Observable<User | null> {
    return this.http.get<User>(`${environment.apiUrl}/api/me`).pipe(
      tap((user) => {
        this.authState$.next({
          isAuthenticated: true,
          user: user,
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.authState$.next({
          isAuthenticated: false,
          user: null,
        });
        return of(null);
      })
    );
  }
  setAuthenticated(): void {
    this.authState$.next({
      isAuthenticated: true,
      user: null,
    });
  }
}
