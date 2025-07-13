import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Offer as OfferService } from '../../core/services/offer/offer';

@Component({
  selector: 'app-offer-details',
  imports: [CommonModule],
  templateUrl: './offer-details.html',
  standalone: true,
})
export class OfferDetails {
  private readonly offerService = inject(OfferService);
  private readonly route = inject(ActivatedRoute);
  offer = this.offerService.getOfferById(this.route.snapshot.params['id']);
  
}
