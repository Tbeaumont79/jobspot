import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Offer as OfferService } from '../../core/services/offer/offer';
import { OfferCard } from '../../components/offer-card/offer-card';

@Component({
  selector: 'app-offer',
  imports: [OfferCard, AsyncPipe],
  templateUrl: './offer.html',
})
export class Offer {
  private readonly offerService = inject(OfferService);
  offers$ = this.offerService.getOffers();
}
