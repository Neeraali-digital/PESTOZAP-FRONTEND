import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="users-page">
      <div class="page-header">
        <div class="header-content">
          <h1>User Management</h1>
          <p>Manage and monitor all registered users</p>
        </div>
        <button class="btn-primary">
          <i class="fas fa-plus"></i>
          Add New User
        </button>
      </div>

      <div class="filters-section">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Search users..." [(ngModel)]="searchTerm">
        </div>
        <select class="filter-select" [(ngModel)]="statusFilter">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div class="users-table">
        <div class="table-header">
          <div class="header-cell">User</div>
          <div class="header-cell">Email</div>
          <div class="header-cell">Status</div>
          <div class="header-cell">Joined</div>
          <div class="header-cell">Actions</div>
        </div>
        <div class="table-row" *ngFor="let user of filteredUsers">
          <div class="cell user-cell">
            <div class="user-avatar">{{user.name.charAt(0)}}</div>
            <div class="user-info">
              <div class="user-name">{{user.name}}</div>
              <div class="user-role">{{user.role}}</div>
            </div>
          </div>
          <div class="cell">{{user.email}}</div>
          <div class="cell">
            <span class="status-badge" [class]="'status-' + user.status">{{user.status}}</span>
          </div>
          <div class="cell">{{user.joinDate}}</div>
          <div class="cell actions-cell">
            <button class="action-btn edit"><i class="fas fa-edit"></i></button>
            <button class="action-btn delete"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-page{padding:0}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;padding:2rem;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header-content h1{margin:0 0 0.5rem;color:#333;font-size:1.8rem;font-weight:700}
    .header-content p{margin:0;color:#666}
    .btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-weight:600;cursor:pointer}
    .filters-section{display:flex;gap:1rem;margin-bottom:1.5rem}
    .search-box{position:relative;flex:1}
    .search-box i{position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:#666}
    .search-box input{width:100%;padding:0.75rem 1rem 0.75rem 2.5rem;border:1px solid #e0e0e0;border-radius:8px;font-size:1rem}
    .filter-select{padding:0.75rem 1rem;border:1px solid #e0e0e0;border-radius:8px;min-width:150px}
    .users-table{background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);overflow:hidden}
    .table-header{display:grid;grid-template-columns:2fr 2fr 1fr 1fr 1fr;padding:1rem 1.5rem;background:#f8f9fa;border-bottom:1px solid #e0e0e0;font-weight:600;color:#333}
    .table-row{display:grid;grid-template-columns:2fr 2fr 1fr 1fr 1fr;padding:1rem 1.5rem;border-bottom:1px solid #f0f0f0;align-items:center}
    .table-row:hover{background:#f8f9fa}
    .user-cell{display:flex;align-items:center;gap:0.75rem}
    .user-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:600}
    .user-name{font-weight:600;color:#333}
    .user-role{font-size:0.85rem;color:#666}
    .status-badge{padding:0.25rem 0.75rem;border-radius:20px;font-size:0.85rem;font-weight:500}
    .status-active{background:#e8f5e8;color:#4CAF50}
    .status-inactive{background:#ffeaa7;color:#fdcb6e}
    .actions-cell{display:flex;gap:0.5rem}
    .action-btn{width:32px;height:32px;border:none;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center}
    .action-btn.edit{background:#e3f2fd;color:#2196F3}
    .action-btn.delete{background:#ffebee;color:#f44336}
  `]
})
export class AdminUsersComponent {
  searchTerm = '';
  statusFilter = '';
  
  users = [
    { name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Customer', joinDate: '2024-01-15' },
    { name: 'Sarah Smith', email: 'sarah@example.com', status: 'active', role: 'Premium Customer', joinDate: '2024-02-20' },
    { name: 'Mike Johnson', email: 'mike@example.com', status: 'inactive', role: 'Customer', joinDate: '2024-03-10' }
  ];

  get filteredUsers() {
    return this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.statusFilter === '' || user.status === this.statusFilter)
    );
  }
}