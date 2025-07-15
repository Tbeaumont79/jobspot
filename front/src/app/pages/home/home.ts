import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../core/services/auth/auth-state';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home {
  private readonly authStateService = inject(AuthStateService);
  private readonly authState$ = this.authStateService.authState$;
  public user = this.authState$.value.user;
}
