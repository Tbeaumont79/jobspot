import { Component, inject } from '@angular/core';
import { Offer } from '../../core/services/offer/offer';
import { AuthStateService } from '../../core/services/auth/auth-state';
import { Company } from '../../core/services/company/company';

@Component({
  selector: 'app-company-dashboard',
  imports: [],
  templateUrl: './company-dashboard.html',
})
export class CompanyDashboard {
  private readonly offerService = inject(Offer);
  private readonly authStateService = inject(AuthStateService);
  private readonly authState$ = this.authStateService.authState$;
  private readonly companyService = inject(Company);
  private readonly companyId = this.authState$.value?.user?.company?.id ?? '';

  public offer = this.offerService.getOfferById(this.companyId);
  public company = this.companyService.getCompany(this.companyId);

}
