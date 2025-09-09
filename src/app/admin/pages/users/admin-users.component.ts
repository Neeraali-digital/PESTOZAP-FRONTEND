import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent {
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  modalMode = 'create';
  selectedUser: any = {};
  
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Customer', joinDate: '2024-01-15', phone: '+1234567890' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', status: 'active', role: 'Premium Customer', joinDate: '2024-02-20', phone: '+1234567891' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', role: 'Customer', joinDate: '2024-03-10', phone: '+1234567892' }
  ];

  get filteredUsers() {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.statusFilter === '' || user.status === this.statusFilter)
    );
  }

  get activeUsersCount() {
    return this.users.filter(u => u.status === 'active').length;
  }

  get inactiveUsersCount() {
    return this.users.filter(u => u.status === 'inactive').length;
  }

  get totalUsersCount() {
    return this.users.length;
  }

  openModal(mode: string, user?: any) {
    this.modalMode = mode;
    this.selectedUser = mode === 'create' ? { status: 'active', role: 'Customer' } : { ...user };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedUser = {};
  }

  saveUser() {
    if (this.modalMode === 'create') {
      this.selectedUser.id = Date.now();
      this.selectedUser.joinDate = new Date().toISOString().split('T')[0];
      this.users.push(this.selectedUser);
    } else {
      const index = this.users.findIndex(u => u.id === this.selectedUser.id);
      if (index !== -1) this.users[index] = this.selectedUser;
    }
    this.closeModal();
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }
}