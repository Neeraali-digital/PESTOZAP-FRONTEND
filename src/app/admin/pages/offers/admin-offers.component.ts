import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminApiService } from '../../services/admin-api.service';
import { Offer } from '../../models/admin.models';

@Component({
  selector: 'app-admin-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AdminApiService],
  templateUrl: './admin-offers.component.html',
  styleUrls: ['./admin-offers.component.css']
})
export class AdminOffersComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  modalMode = 'create';
  selectedOffer: Partial<Offer> = {};
  offers: Offer[] = [];
  loading = false;
  submitting = false;
  formErrors: any = {};

  serviceTypes = ['residential', 'commercial', 'termite', 'rodent', 'inspection', 'maintenance'];

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.loading = true;
    this.adminApiService.getOffers().subscribe({
      next: (response) => {
        this.offers = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading offers:', error);
        this.loading = false;
      }
    });
  }

  get filteredOffers() {
    return this.offers.filter(offer =>
      offer.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.statusFilter === '' || offer.status === this.statusFilter)
    );
  }

  get activeOffersCount() {
    return this.offers.filter(o => o.status === 'active').length;
  }

  get expiredOffersCount() {
    return this.offers.filter(o => o.status === 'expired').length;
  }

  get totalUsage() {
    return this.offers.reduce((sum, o) => sum + o.used_count, 0);
  }

  openModal(mode: string, offer?: Offer) {
    this.modalMode = mode;
    this.formErrors = {};
    this.selectedOffer = mode === 'create' ? {
      status: 'active',
      discount_type: 'percentage',
      services: [],
      used_count: 0,
      description: ''
    } : { ...offer };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedOffer = {};
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.selectedOffer.title) {
      this.formErrors.title = 'Title is required.';
      isValid = false;
    }
    if (!this.selectedOffer.discount) {
      this.formErrors.discount = 'Discount is required.';
      isValid = false;
    }
    if (!this.selectedOffer.code) {
      this.formErrors.code = 'Code is required.';
      isValid = false;
    }
    if (!this.selectedOffer.valid_from) {
      this.formErrors.valid_from = 'Valid from date is required.';
      isValid = false;
    }
    if (!this.selectedOffer.valid_to) {
      this.formErrors.valid_to = 'Valid to date is required.';
      isValid = false;
    }
    if (!this.selectedOffer.description) {
      this.formErrors.description = 'Description is required.';
      isValid = false;
    }

    return isValid;
  }

  saveOffer() {
    if (!this.validateForm()) {
      return;
    }

    this.submitting = true;
    if (this.modalMode === 'create') {
      this.adminApiService.createOffer(this.selectedOffer as Partial<Offer>).subscribe({
        next: (response) => {
          this.loadOffers();
          this.closeModal();
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error creating offer:', error);
          this.submitting = false;
        }
      });
    } else {
      this.adminApiService.partialUpdateOffer(this.selectedOffer.id!, this.selectedOffer).subscribe({
        next: (response) => {
          this.loadOffers();
          this.closeModal();
          this.submitting = false;
        },
        error: (error) => {
          console.error('Error updating offer:', error);
          this.submitting = false;
        }
      });
    }
  }

  deleteOffer(id: number) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.adminApiService.deleteOffer(id).subscribe({
        next: (response) => {
          this.loadOffers();
        },
        error: (error) => {
          console.error('Error deleting offer:', error);
        }
      });
    }
  }

  toggleOfferStatus(id: number) {
    const offer = this.offers.find(o => o.id === id);
    if (offer) {
      const newStatus = offer.status === 'active' ? 'inactive' : 'active';
      this.adminApiService.partialUpdateOffer(id, { status: newStatus }).subscribe({
        next: (response) => {
          this.loadOffers();
        },
        error: (error) => {
          console.error('Error updating offer status:', error);
        }
      });
    }
  }

  isServiceSelected(service: string): boolean {
    return this.selectedOffer.services?.includes(service) || false;
  }

  toggleService(service: string) {
    if (!this.selectedOffer.services) this.selectedOffer.services = [];
    const index = this.selectedOffer.services.indexOf(service);
    if (index > -1) {
      this.selectedOffer.services.splice(index, 1);
    } else {
      this.selectedOffer.services.push(service);
    }
  }

  constructor(private adminApiService: AdminApiService) {}
}
