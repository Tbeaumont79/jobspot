import { Component, inject } from '@angular/core';
import { Offer as OfferService } from '../../core/services/offer/offer';

@Component({
  selector: 'app-offer',
  imports: [],
  templateUrl: './offer.html',
})
export class Offer {
  private readonly offerService = inject(OfferService);

  ngOnInit() {
    this.offerService.getOffers().subscribe((offers : any) => {
      console.log(offers);
    });
  }
}
