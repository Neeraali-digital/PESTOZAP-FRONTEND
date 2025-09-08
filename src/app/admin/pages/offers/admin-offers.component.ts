import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminApiService } from '../../services/admin-api.service';
import { Offer } from '../../models/admin.models';

@Component({
  selector: 'app-admin-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-offers.component.html'
})
export class AdminOffersComponent implements OnInit {
  offers: Offer[] = [];
  loading = true;
  totalCount = 0;

  constructor(private apiService: AdminApiService) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.apiService.getOffers().subscribe({
      next: (response) => {
        this.offers = response.results;
        this.totalCount = response.count;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading offers:', error);
        this.loading = false;
      }
    });
  }

  deleteOffer(id: number) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.apiService.deleteOffer(id).subscribe({
        next: () => {
          this.loadOffers();
        },
        error: (error) => {
          console.error('Error deleting offer:', error);
        }
      });
    }
  }
}