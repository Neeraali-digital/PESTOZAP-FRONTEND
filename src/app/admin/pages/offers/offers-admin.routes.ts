import { Routes } from '@angular/router';

export const offersAdminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-offers.component').then(m => m.AdminOffersComponent)
  }
];