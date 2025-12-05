import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './components/layout/admin-layout.component';
import { AdminDashboardComponent } from './pages/dashboard/admin-dashboard.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminAuthGuard],
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
        path: 'careers',
        loadComponent: () => import('./pages/careers/admin-careers.component').then(m => m.AdminCareersComponent)
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