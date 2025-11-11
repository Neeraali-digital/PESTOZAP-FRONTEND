import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../services/admin-api.service';
import { User } from '../../models/admin.models';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  modalMode = 'create';
  selectedUser: any = {};

  users: User[] = [];
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(page = 1) {
    this.isLoading = true;
    this.error = null;

    const params: any = { page };
    if (this.searchTerm) params.search = this.searchTerm;

    this.adminApiService.getUsers(params).subscribe({
      next: (response) => {
        this.users = response.results;
        this.totalCount = response.count;
        this.totalPages = Math.ceil(response.count / 20);
        this.currentPage = page;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.error = 'Failed to load users';
        this.isLoading = false;
      }
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get activeUsersCount() {
    return this.users.filter(u => u.is_active).length;
  }

  get inactiveUsersCount() {
    return this.users.filter(u => !u.is_active).length;
  }

  get totalUsersCount() {
    return this.totalCount;
  }

  onSearchChange() {
    this.loadUsers(1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadUsers(page);
    }
  }

  openModal(mode: string, user?: any) {
    this.modalMode = mode;
    this.selectedUser = mode === 'create' ? {
      is_active: true,
      is_verified: false
    } : { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = {};
  }

  saveUser() {
    if (this.modalMode === 'create') {
      // Create new user
      this.adminApiService.createUser(this.selectedUser).subscribe({
        next: () => {
          this.closeModal();
          this.loadUsers(this.currentPage);
        },
        error: (error: any) => {
          console.error('Error creating user:', error);
          alert('Failed to create user');
        }
      });
    } else {
      // Update existing user
      this.adminApiService.updateUser(this.selectedUser.id, this.selectedUser).subscribe({
        next: () => {
          this.closeModal();
          this.loadUsers(this.currentPage);
        },
        error: (error: any) => {
          console.error('Error updating user:', error);
          alert('Failed to update user');
        }
      });
    }
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.adminApiService.deleteUser(id).subscribe({
        next: () => {
          this.loadUsers(this.currentPage);
        },
        error: (error: any) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user');
        }
      });
    }
  }

  constructor(private adminApiService: AdminApiService) {}
}
