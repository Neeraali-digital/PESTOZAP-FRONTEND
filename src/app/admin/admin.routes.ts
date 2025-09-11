import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/users/admin-users.component').then(m => m.AdminUsersComponent)
      },
      {
        path: 'blog',
        loadChildren: () => import('./pages/blog/blog-admin.routes').then(m => m.blogAdminRoutes)
      },
      {
        path: 'reviews',
        loadComponent: () => import('./pages/reviews/admin-reviews.component').then(m => m.AdminReviewsComponent)
      },
      {
        path: 'enquiries',
        loadComponent: () => import('./pages/enquiries/admin-enquiries.component').then(m => m.AdminEnquiriesComponent)
      },
      {
        path: 'offers',
        loadChildren: () => import('./pages/offers/offers-admin.routes').then(m => m.offersAdminRoutes)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/admin-profile.component').then(m => m.AdminProfileComponent)
      },
      {
        path: 'advertisements',
        loadComponent: () => import('./pages/advertisements/admin-advertisements.component').then(m => m.AdminAdvertisementsComponent)
      }
    ]
  }
];