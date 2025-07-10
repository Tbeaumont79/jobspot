import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../shared/types/user';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Login {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<User>(
      `${environment.apiUrl}/auth`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/ld+json',
        },
      }
    );
  }
}
