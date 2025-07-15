import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Company as CompanyType } from '../../shared/types/company';

@Injectable({
  providedIn: 'root',
})
export class Company {
  getCompany(id: string) {
    return httpResource<CompanyType>(
      () => `${environment.apiUrl}/api/companies/${id}`
    );
  }
}
