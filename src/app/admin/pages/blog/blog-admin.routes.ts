import { Routes } from '@angular/router';

export const blogAdminRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-blog.component').then(m => m.AdminBlogComponent)
  }
];