import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OfferCollection, OfferType } from '../../shared/types/offer';
import { Company } from '../../shared/types/company';

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
    const offer = httpResource<OfferType>(
      () => `${environment.apiUrl}/api/offers/${id}`
    );
    return offer;
  }

  getCompanyByOfferId(offerId: string) {
    const company = httpResource<Company>(
      () => `${environment.apiUrl}/api/companies/by-offer/${offerId}`
    );
    return company;
  }
}
