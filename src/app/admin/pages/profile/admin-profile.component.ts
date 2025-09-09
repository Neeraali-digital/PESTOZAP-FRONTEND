import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent {
  activeTab = 'profile';
  showPasswordModal = false;
  
  adminProfile = {
    id: 1,
    name: 'John Admin',
    email: 'admin@pestozap.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Administrator',
    avatar: 'https://via.placeholder.com/150',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20 10:30 AM',
    department: 'Operations',
    location: 'New York, NY',
    bio: 'Experienced administrator with 5+ years in pest control management.',
    permissions: ['users', 'blog', 'offers', 'reviews', 'enquiries', 'settings']
  };

  passwordForm = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  notifications = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    systemAlerts: true
  };

  activityLog = [
    { action: 'Updated user profile', timestamp: '2024-01-20 10:30 AM', type: 'profile' },
    { action: 'Created new blog post', timestamp: '2024-01-20 09:15 AM', type: 'content' },
    { action: 'Approved customer review', timestamp: '2024-01-19 04:45 PM', type: 'review' },
    { action: 'Updated offer settings', timestamp: '2024-01-19 02:20 PM', type: 'offer' },
    { action: 'Responded to enquiry', timestamp: '2024-01-19 11:30 AM', type: 'enquiry' }
  ];

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  openPasswordModal() {
    this.showPasswordModal = true;
    this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  closePasswordModal() {
    this.showPasswordModal = false;
  }

  updateProfile() {
    console.log('Profile updated:', this.adminProfile);
    // Add success message logic here
  }

  changePassword() {
    if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    console.log('Password changed');
    this.closePasswordModal();
  }

  updateNotifications() {
    console.log('Notifications updated:', this.notifications);
  }

  getActivityIcon(type: string): string {
    const icons: any = {
      profile: 'fas fa-user',
      content: 'fas fa-edit',
      review: 'fas fa-star',
      offer: 'fas fa-tags',
      enquiry: 'fas fa-envelope'
    };
    return icons[type] || 'fas fa-circle';
  }
}