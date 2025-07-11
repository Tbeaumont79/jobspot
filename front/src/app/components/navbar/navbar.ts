import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../core/services/auth/auth-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly authStateService = inject(AuthStateService);
  private readonly router = inject(Router);

  logout(): void {
    this.authStateService.clearAuthentication();
    this.router.navigate(['/login']);
  }
}
