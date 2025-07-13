import {
  HttpClient,
  HttpResourceRef,
  HttpRequest,
  httpResource,
} from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  getOfferById(id: string) {
    console.log(`id in the service : ${id}`);
    const offer = httpResource<OfferType>(
      () => `${environment.apiUrl}/api/offers/${id}`
    );
    return offer;
  }
}
