import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-admin-offers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AdminApiService],
  templateUrl: './admin-offers.component.html',
  styleUrls: ['./admin-offers.component.css']
})
export class AdminOffersComponent {
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  modalMode = 'create';
  selectedOffer: any = {};
  
  offers = [
    {
      id: 1,
      title: 'Summer Special - 30% Off',
      description: 'Get 30% off on all residential pest control services this summer.',
      discount: 30,
      discountType: 'percentage',
      code: 'SUMMER30',
      validFrom: '2024-06-01',
      validTo: '2024-08-31',
      status: 'active',
      usageLimit: 100,
      usedCount: 25,
      services: ['residential', 'termite'],
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'New Customer Discount',
      description: 'First-time customers get $50 off their initial service.',
      discount: 50,
      discountType: 'fixed',
      code: 'NEWCUST50',
      validFrom: '2024-01-01',
      validTo: '2024-12-31',
      status: 'active',
      usageLimit: 200,
      usedCount: 78,
      services: ['residential', 'commercial'],
      image: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'Winter Maintenance Deal',
      description: 'Special winter rates for ongoing pest maintenance.',
      discount: 25,
      discountType: 'percentage',
      code: 'WINTER25',
      validFrom: '2023-12-01',
      validTo: '2024-02-29',
      status: 'expired',
      usageLimit: 50,
      usedCount: 45,
      services: ['maintenance'],
      image: 'https://via.placeholder.com/300x200'
    }
  ];

  serviceTypes = ['residential', 'commercial', 'termite', 'rodent', 'inspection', 'maintenance'];

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
    return this.offers.reduce((sum, o) => sum + o.usedCount, 0);
  }

  openModal(mode: string, offer?: any) {
    this.modalMode = mode;
    this.selectedOffer = mode === 'create' ? { 
      status: 'active', 
      discountType: 'percentage',
      services: [],
      usedCount: 0
    } : { ...offer };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedOffer = {};
  }

  saveOffer() {
    if (this.modalMode === 'create') {
      this.selectedOffer.id = Date.now();
      this.offers.push(this.selectedOffer);
    } else {
      const index = this.offers.findIndex(o => o.id === this.selectedOffer.id);
      if (index !== -1) this.offers[index] = this.selectedOffer;
    }
    this.closeModal();
  }

  deleteOffer(id: number) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offers = this.offers.filter(o => o.id !== id);
    }
  }

  toggleOfferStatus(id: number) {
    const offer = this.offers.find(o => o.id === id);
    if (offer) {
      offer.status = offer.status === 'active' ? 'inactive' : 'active';
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
}