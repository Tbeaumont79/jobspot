import { Component, Input } from '@angular/core';
import { OfferType } from '../../core/shared/types/offer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-offer-card',
  imports: [RouterLink],
  templateUrl: './offer-card.html',
})
export class OfferCard {
  @Input() offer!: OfferType;
}
