import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdvertisementService, Advertisement } from '../../services/advertisement.service';

interface PricingCard {
  title: string;
  features: string[];
  price: string;
  originalPrice?: string;
  package: string;
  isRecommended?: boolean;
  lastBooking?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slideInterval: any;

  selectedServiceType = 'residential-control';
  selectedPestType = '';
  selectedPropertyType = '';
  selectedServicePackage = '';

  advertisements: Advertisement[] = [];

  images = [
    '../../../assets/ad1.png',
    '../../../assets/ad2.png',
    '../../../assets/ad3.png',
  ]

  pricingData: { [key: string]: PricingCard[] } = {
    'residential-control': [
      {
        title: '4D Cockroach Control and Ant Control',
        features: [
          'Advanced gel treatment for long-lasting results',
          'Complete elimination of cockroaches and ants',
          'Safe for children and pets',
          'Free follow-up service included',
          '100% satisfaction guarantee'
        ],
        price: '₹2,499',
        originalPrice: '₹3,999',
        package: '3 Services 1 Year',
        isRecommended: true,
        lastBooking: 'Last Booking on 15th Dec 2023'
      },
      {
        title: 'Standard Cockroach Control',
        features: [
          'Effective spray treatment',
          'Quick results within 24 hours',
          'Professional service guarantee'
        ],
        price: '₹1,499',
        package: 'Single Service',
        lastBooking: 'Available Today'
      }
    ],
    'commercial-control': [
      {
        title: 'Complete Commercial Protection Package',
        features: [
          'Cockroach, Ant & Termite Control',
          'Rodent and Bed Bug Treatment',
          'Eco-friendly solutions',
          'Business-safe treatments',
          '6-month protection guarantee'
        ],
        price: '₹4,999',
        originalPrice: '₹6,999',
        package: '6 Services 2 Years',
        isRecommended: true,
        lastBooking: 'Last Booking on 20th Dec 2023'
      },
      {
        title: 'Essential Commercial Control',
        features: [
          'Basic pest elimination',
          'Cockroach and ant control',
          'Safe for commercial areas',
          'Professional service'
        ],
        price: '₹3,299',
        package: '3 Services 1 Year',
        lastBooking: 'Available Today'
      }
    ],
    'amc': [
      {
        title: 'Premium AMC Package',
        features: [
          'Monthly pest monitoring',
          'Emergency pest control',
          'Priority booking',
          'Dedicated account manager',
          'Comprehensive coverage'
        ],
        price: '₹8,999',
        originalPrice: '₹12,999',
        package: 'Annual Contract',
        isRecommended: true,
        lastBooking: 'Last Booking on 10th Dec 2023'
      },
      {
        title: 'Standard AMC Package',
        features: [
          'Quarterly pest control',
          'Regular inspections',
          'Emergency response',
          'Cost-effective solution'
        ],
        price: '₹4,999',
        package: 'Annual Contract',
        lastBooking: 'Available Today'
      }
    ]
  };

  constructor(
    private advertisementService: AdvertisementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.advertisementService.getActiveAdvertisements().subscribe(ads => {
      this.advertisements = ads;
      if (ads.length > 0) {
        this.startSlideShow();
      }
    });
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.advertisements.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  selectServiceType(type: string) {
    this.selectedServiceType = type;
  }

  getCurrentPricingCards(): PricingCard[] {
    return this.pricingData[this.selectedServiceType] || [];
  }

}
