import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OfferCollection, OfferType } from '../../shared/types/offer';

@Injectable({
  providedIn: 'root',
})
export class Offer {
  private readonly http = inject(HttpClient);

  getOffers(): Observable<OfferType[]> {
    return this.http
      .get<OfferCollection>(`${environment.apiUrl}/api/offers`)
      .pipe(map((collection) => collection.member));
  }
}
