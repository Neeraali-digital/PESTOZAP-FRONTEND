import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AdminAuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent {
  @Input() isOpen = true;

  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin/dashboard',
      active: true
    },
    {
      label: 'Users',
      icon: 'people',
      route: '/admin/users'
    },
    {
      label: 'Blog Posts',
      icon: 'article',
      route: '/admin/blog'
    },
    {
      label: 'Reviews',
      icon: 'star',
      route: '/admin/reviews'
    },
    {
      label: 'Enquiries',
      icon: 'contact_mail',
      route: '/admin/enquiries'
    },
    {
      label: 'Careers',
      icon: 'work',
      route: '/admin/careers'
    },
    {
      label: 'Offers',
      icon: 'local_offer',
      route: '/admin/offers'
    },
    {
      label: 'Advertisements',
      icon: 'campaign',
      route: '/admin/advertisements'
    },
    {
      label: 'Profile',
      icon: 'account_circle',
      route: '/admin/profile'
    }
  ];

  constructor(
    private authService: AdminAuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}