import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Offer } from '../../admin/models/admin.models';
import { OfferService } from '../../services/offers.service';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit {
  offers: Offer[] = [];
  featuredOffer: Offer | null = null;
  otherOffers: Offer[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private offerService: OfferService) {}

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.isLoading = true;
    this.error = null;

    this.offerService.getOffers().subscribe({
      next: (offers) => {
        // Filter active offers
        const activeOffers = offers.filter(offer => offer.status === 'active');

        // Set featured offer (first one or one with highest discount)
        if (activeOffers.length > 0) {
          this.featuredOffer = activeOffers.reduce((prev, current) =>
            (prev.discount > current.discount) ? prev : current
          );
        }

        // Set other offers (excluding featured)
        this.otherOffers = activeOffers.filter(offer =>
          !this.featuredOffer || offer.id !== this.featuredOffer.id
        );

        this.offers = activeOffers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading offers:', error);
        this.error = 'Failed to load offers';
        this.isLoading = false;
      }
    });
  }

  getDiscountDisplay(offer: Offer): string {
    if (offer.discount_type === 'percentage') {
      return `${offer.discount}% OFF`;
    } else {
      return `₹${offer.discount} OFF`;
    }
  }

  isOfferValid(offer: Offer): boolean {
    const now = new Date();
    const validTo = new Date(offer.valid_to);
    return now <= validTo;
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    // Show success message - you can implement a toast notification here
  }
}
