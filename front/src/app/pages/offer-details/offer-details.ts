import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Offer as OfferService } from '../../core/services/offer/offer';

@Component({
  selector: 'app-offer-details',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './offer-details.html',
  standalone: true,
})
export class OfferDetails {
  private readonly offerService = inject(OfferService);
  private readonly route = inject(ActivatedRoute);

  private readonly id = this.route.snapshot.params['id'];

  offer = this.id ? this.offerService.getOfferById(this.id) : null;
  company$ = this.id ? this.offerService.getCompanyByOfferId(this.id) : null;
}
