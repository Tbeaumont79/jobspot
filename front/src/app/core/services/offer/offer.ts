import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Offer {
  private readonly http = inject(HttpClient);

  getOffers(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/api/offers`)
      .pipe(tap((offers: any) => offers));
  }
}
