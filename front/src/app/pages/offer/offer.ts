import { Component, inject } from '@angular/core';
import { Offer as OfferService } from '../../core/services/offer/offer';
import { OfferCard } from '../../components/offer-card/offer-card';
import { OfferType } from '../../core/shared/types/offer';
@Component({
  selector: 'app-offer',
  imports: [OfferCard],
  templateUrl: './offer.html',
})
export class Offer {
  private readonly offerService = inject(OfferService);
  offers$ = this.offerService.getOffers();
  offers: OfferType[] = [];

  ngOnInit() {
    this.offers$.subscribe((offers) => {
      this.offers = offers;
    });
  }
}
