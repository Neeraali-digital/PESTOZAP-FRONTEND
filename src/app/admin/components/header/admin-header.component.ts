import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/auth.service';
import { AdminUser } from '../../models/admin.models';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-header.component.html'
})
export class AdminHeaderComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  currentUser: AdminUser | null = null;
  showUserMenu = false;

  constructor(private authService: AdminAuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    this.authService.logout();
  }
}