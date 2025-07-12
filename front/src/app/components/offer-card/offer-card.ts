import { Component, Input } from '@angular/core';
import { OfferType } from '../../core/shared/types/offer';

@Component({
  selector: 'app-offer-card',
  imports: [],
  templateUrl: './offer-card.html',
})
export class OfferCard {
  @Input() offer!: OfferType;
}
