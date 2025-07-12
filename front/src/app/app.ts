import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStateService } from './core/services/auth/auth-state';
import { AsyncPipe } from '@angular/common';
import { Navbar } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, Navbar],
  templateUrl: './app.html',
})
export class App {
  private authStateService = inject(AuthStateService);

  authState = this.authStateService.authState$;
}
