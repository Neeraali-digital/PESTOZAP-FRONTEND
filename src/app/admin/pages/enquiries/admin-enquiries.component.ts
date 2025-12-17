
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminApiService } from '../../services/admin-api.service';
import { Enquiry } from '../../models/admin.models';

@Component({
  selector: 'app-admin-enquiries',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AdminApiService],
  templateUrl: './admin-enquiries.component.html',
  styleUrls: ['./admin-enquiries.component.css']
})
export class AdminEnquiriesComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  serviceFilter = '';
  typeFilter = 'enquiry'; // Default to enquiries

  enquiries: Enquiry[] = [];
  filteredEnquiries: Enquiry[] = [];
  isLoading = true;
  error: string | null = null;
  currentPage = 1;
  totalPages = 1;
  totalCount = 0;
  expandedEnquiryId: number | null = null;
  showModal = false;
  selectedEnquiry: Enquiry | null = null;

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
    if (this.typeFilter) params.type = this.typeFilter;
    params.type = this.typeFilter;

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

  setTypeFilter(type: 'enquiry' | 'contact') {
    this.typeFilter = type;
    this.loadEnquiries(1);
  }

  onTypeChange(type: string) {
    this.typeFilter = type;
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

  openModal(enquiry: Enquiry) {
    this.selectedEnquiry = enquiry;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedEnquiry = null;
  }

  toggleExpanded(id: number) {
    this.expandedEnquiryId = this.expandedEnquiryId === id ? null : id;
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
