import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  private readonly router = inject(Router);

  logout(): void {
    this.router.navigate(['/login']);
  }
}
