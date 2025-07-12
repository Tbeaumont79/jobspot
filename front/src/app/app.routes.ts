import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { authGuard } from './core/guard/auth';
import { Offer } from './pages/offer/offer';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: Home,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'offer',
    canActivate: [authGuard],
    component: Offer,
  },
];
