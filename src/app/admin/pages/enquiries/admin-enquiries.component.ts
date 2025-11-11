import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminApiService } from '../../services/admin-api.service';
import { Enquiry } from '../../models/admin.models';

@Component({
  selector: 'app-admin-enquiries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="enquiries-page">
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <p>Loading enquiries...</p>
        </div>
      </div>

      <!-- Error State -->
      <div *ngIf="error && !isLoading" class="error-container">
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>{{ error }}</h3>
          <button class="btn-retry" (click)="loadEnquiries()">
            <i class="fas fa-redo"></i>
            Retry
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div *ngIf="!isLoading && !error">
        <!-- Header -->
        <div class="page-header">
          <div class="header-content">
            <h1>Enquiry Management</h1>
            <p>Manage customer service requests and enquiries</p>
          </div>
          <div class="header-actions">
            <button class="btn-export">
              <i class="fas fa-download"></i>
              Export
            </button>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon new"><i class="fas fa-envelope"></i></div>
            <div class="stat-info">
              <div class="stat-number">{{newEnquiriesCount}}</div>
              <div class="stat-label">New Enquiries</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon progress"><i class="fas fa-clock"></i></div>
            <div class="stat-info">
              <div class="stat-number">{{inProgressCount}}</div>
              <div class="stat-label">In Progress</div>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon resolved"><i class="fas fa-check-circle"></i></div>
            <div class="stat-info">
              <div class="stat-number">{{resolvedCount}}</div>
              <div class="stat-label">Resolved</div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="filters-section">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Search enquiries..." [(ngModel)]="searchTerm" (input)="onSearchChange()">
          </div>
          <select class="filter-select" [(ngModel)]="statusFilter" (change)="onFilterChange()">
            <option value="">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoted">Quoted</option>
            <option value="converted">Converted</option>
            <option value="closed">Closed</option>
          </select>
          <select class="filter-select" [(ngModel)]="serviceFilter" (change)="onFilterChange()">
            <option value="">All Services</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="termite">Termite</option>
            <option value="inspection">Inspection</option>
          </select>
        </div>

        <!-- Enquiries List -->
        <div class="enquiries-list">
          <div class="enquiry-card" *ngFor="let enquiry of filteredEnquiries" [class]="'priority-' + enquiry.priority">
            <div class="enquiry-header">
              <div class="enquiry-info">
                <h3>{{enquiry.name}} - {{enquiry.service_type}}</h3>
                <div class="enquiry-meta">
                  <span class="customer-name">
                    <i class="fas fa-user"></i>
                    {{enquiry.name}}
                  </span>
                  <span class="service-type">
                    <i class="fas fa-cog"></i>
                    {{enquiry.service_type}}
                  </span>
                  <span class="enquiry-date">
                    <i class="fas fa-calendar"></i>
                    {{enquiry.created_at | date:'short'}}
                  </span>
                </div>
              </div>
              <div class="enquiry-badges">
                <span class="status-badge" [class]="'status-' + enquiry.status">{{enquiry.status}}</span>
                <span class="priority-badge" [class]="'priority-' + enquiry.priority">{{enquiry.priority}}</span>
              </div>
            </div>
            <div class="enquiry-content">
              <p>{{enquiry.message}}</p>
              <div class="contact-info">
                <span class="email">
                  <i class="fas fa-envelope"></i>
                  {{enquiry.email}}
                </span>
                <span class="phone">
                  <i class="fas fa-phone"></i>
                  {{enquiry.phone || 'N/A'}}
                </span>
              </div>
            </div>
            <div class="enquiry-actions">
              <button class="action-btn reply" (click)="replyEnquiry(enquiry.id)">
                <i class="fas fa-reply"></i>
                Reply
              </button>
              <button class="action-btn progress" (click)="updateStatus(enquiry.id, 'contacted')" *ngIf="enquiry.status === 'new'">
                <i class="fas fa-play"></i>
                Start
              </button>
              <button class="action-btn resolve" (click)="updateStatus(enquiry.id, 'closed')" *ngIf="enquiry.status === 'contacted'">
                <i class="fas fa-check"></i>
                Close
              </button>
              <button class="action-btn delete" (click)="deleteEnquiry(enquiry.id)">
                <i class="fas fa-trash"></i>
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="pagination" *ngIf="totalPages > 1">
          <button class="page-btn" (click)="onPageChange(currentPage - 1)" [disabled]="currentPage === 1">
            <i class="fas fa-chevron-left"></i>
          </button>
          <span class="page-info">
            Page {{currentPage}} of {{totalPages}}
          </span>
          <button class="page-btn" (click)="onPageChange(currentPage + 1)" [disabled]="currentPage === totalPages">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .enquiries-page{padding:0}
    .loading-container,.error-container{display:flex;justify-content:center;align-items:center;min-height:200px}
    .loading-spinner{text-align:center;color:#666}
    .error-message{text-align:center;padding:2rem;background:#fff3cd;border:1px solid #ffeaa7;border-radius:8px;margin:2rem 0}
    .btn-retry{background:#007bff;color:white;border:none;padding:0.5rem 1rem;border-radius:4px;cursor:pointer;margin-top:1rem}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;padding:2rem;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header-content h1{margin:0 0 0.5rem;color:#333;font-size:1.8rem;font-weight:700}
    .header-content p{margin:0;color:#666}
    .btn-export{background:linear-gradient(135deg,#4CAF50,#45a049);color:white;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.5rem}
    .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:2rem}
    .stat-card{background:white;padding:1.5rem;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);display:flex;align-items:center;gap:1rem}
    .stat-icon{width:50px;height:50px;border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-size:1.2rem}
    .stat-icon.new{background:linear-gradient(135deg,#2196F3,#1976D2)}
    .stat-icon.progress{background:linear-gradient(135deg,#FF9800,#F57C00)}
    .stat-icon.resolved{background:linear-gradient(135deg,#4CAF50,#45a049)}
    .stat-number{font-size:1.5rem;font-weight:700;color:#333}
    .stat-label{color:#666;font-size:0.9rem}
    .filters-section{display:flex;gap:1rem;margin-bottom:1.5rem}
    .search-box{position:relative;flex:1}
    .search-box i{position:absolute;left:1rem;top:50%;transform:translateY(-50%);color:#666}
    .search-box input{width:100%;padding:0.75rem 1rem 0.75rem 2.5rem;border:1px solid #e0e0e0;border-radius:8px;font-size:1rem}
    .filter-select{padding:0.75rem 1rem;border:1px solid #e0e0e0;border-radius:8px;min-width:150px}
    .enquiries-list{display:flex;flex-direction:column;gap:1.5rem}
    .enquiry-card{background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);padding:1.5rem;transition:transform 0.3s ease;border-left:4px solid #e0e0e0}
    .enquiry-card:hover{transform:translateY(-2px)}
    .enquiry-card.priority-high{border-left-color:#f44336}
    .enquiry-card.priority-medium{border-left-color:#FF9800}
    .enquiry-card.priority-low{border-left-color:#4CAF50}
    .enquiry-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem}
    .enquiry-info h3{margin:0 0 0.5rem;color:#333;font-size:1.2rem;font-weight:600}
    .enquiry-meta{display:flex;flex-wrap:wrap;gap:1rem;font-size:0.85rem;color:#666}
    .enquiry-meta span{display:flex;align-items:center;gap:0.25rem}
    .enquiry-badges{display:flex;gap:0.5rem}
    .status-badge,.priority-badge{padding:0.25rem 0.75rem;border-radius:20px;font-size:0.8rem;font-weight:500}
    .status-new{background:#e3f2fd;color:#1976D2}
    .status-in-progress{background:#fff3e0;color:#F57C00}
    .status-resolved{background:#e8f5e8;color:#4CAF50}
    .priority-high{background:#ffebee;color:#f44336}
    .priority-medium{background:#fff3e0;color:#FF9800}
    .priority-low{background:#e8f5e8;color:#4CAF50}
    .enquiry-content p{margin:0 0 1rem;color:#555;line-height:1.6}
    .contact-info{display:flex;gap:2rem;font-size:0.9rem;color:#666;margin-bottom:1rem}
    .contact-info span{display:flex;align-items:center;gap:0.5rem}
    .enquiry-actions{display:flex;gap:0.75rem}
    .action-btn{display:flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;border:none;border-radius:6px;font-size:0.85rem;font-weight:500;cursor:pointer;transition:all 0.3s ease}
    .action-btn.reply{background:#e3f2fd;color:#2196F3}
    .action-btn.progress{background:#fff3e0;color:#FF9800}
    .action-btn.resolve{background:#e8f5e8;color:#4CAF50}
    .action-btn.delete{background:#ffebee;color:#f44336}
    .action-btn:hover{transform:translateY(-1px)}
    .pagination{display:flex;justify-content:center;align-items:center;gap:1rem;margin-top:2rem;padding:1rem}
    .page-btn{background:#f8f9fa;border:1px solid #dee2e6;padding:0.5rem 1rem;border-radius:4px;cursor:pointer}
    .page-btn:disabled{background:#e9ecef;cursor:not-allowed}
    .page-info{color:#666}
    @media (max-width:768px){.stats-row{grid-template-columns:1fr}.filters-section{flex-direction:column}.enquiry-header{flex-direction:column;gap:1rem}.enquiry-meta{flex-direction:column;gap:0.5rem}.contact-info{flex-direction:column;gap:0.5rem}.enquiry-actions{flex-wrap:wrap}}
  `]
})
export class AdminEnquiriesComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  serviceFilter = '';

  enquiries: Enquiry[] = [];
  filteredEnquiries: Enquiry[] = [];
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;

  constructor(private adminApiService: AdminApiService) {}

  ngOnInit() {
    this.loadEnquiries();
  }

  loadEnquiries(page = 1) {
    this.isLoading = true;
    this.error = null;

    const params: any = { page };
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.statusFilter) params.status = this.statusFilter;
    if (this.serviceFilter) params.service_type = this.serviceFilter;

    this.adminApiService.getEnquiries(params).subscribe({
      next: (response) => {
        this.enquiries = response.results;
        this.filteredEnquiries = this.enquiries;
        this.totalCount = response.count;
        this.totalPages = Math.ceil(response.count / 20);
        this.currentPage = page;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading enquiries:', error);
        this.error = 'Failed to load enquiries';
        this.isLoading = false;
      }
    });
  }

  onSearchChange() {
    this.loadEnquiries(1);
  }

  onFilterChange() {
    this.loadEnquiries(1);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadEnquiries(page);
    }
  }

  get newEnquiriesCount() {
    return this.enquiries.filter(e => e.status === 'new').length;
  }

  get inProgressCount() {
    return this.enquiries.filter(e => e.status === 'contacted').length;
  }

  get resolvedCount() {
    return this.enquiries.filter(e => e.status === 'closed').length;
  }

  updateStatus(id: number, status: string) {
    this.adminApiService.updateEnquiry(id, { status: status as any }).subscribe({
      next: () => {
        this.loadEnquiries(this.currentPage);
      },
      error: (error: any) => {
        console.error('Error updating enquiry status:', error);
        alert('Failed to update enquiry status');
      }
    });
  }

  replyEnquiry(id: number) {
    // TODO: Implement reply functionality
    console.log('Reply to enquiry:', id);
  }

  deleteEnquiry(id: number) {
    if (confirm('Are you sure you want to delete this enquiry?')) {
      this.adminApiService.deleteEnquiry(id).subscribe({
        next: () => {
          this.loadEnquiries(this.currentPage);
        },
        error: (error) => {
          console.error('Error deleting enquiry:', error);
          alert('Failed to delete enquiry');
        }
      });
    }
  }
}
