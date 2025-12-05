import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

interface Review {
  name: string;
  location?: string;
  rating: number;
  review?: string;
  comment?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slideInterval: any;

  currentReviewIndex = 0;
  reviewInterval: any;
  isReviewPaused = false;

  selectedServiceType = 'residential-control';
  selectedPestType = '';
  selectedPropertyType = '';
  selectedServicePackage = '';
  squareFeet = '';

  advertisements: Advertisement[] = [];

  images = [
    '../../../assets/ad1.png',
    '../../../assets/ad2.png',
    '../../../assets/ad3.png',
  ]

  reviews: Review[] = [];

  pricingData: { [key: string]: PricingCard[] } = {
    'residential-control': [
      {
        title: 'Residential Service',
        features: [
          'Gel Baiting & Residual Sprays, Odorless & Human Safe Chemicals',
          'Larviciding, Residual Sprays, Fogging, Mosquito Repellent Diffuser',
          'Rodent Stations, Glue boards, Snap Traps, Cages, Rodent Boxes',
          'Drill-Fill-Seal, TERMATRACK',
          'Net and Spikes Solutions, Aesthetic & Transparent Net',
          'Microbial disinfection, Nano-Herbal Disinfection'
        ],
        price: 'Price/-',
        originalPrice: 'Price/-',
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
        price: 'Price/-',
        package: 'Single Service',
        lastBooking: 'Available Today'
      }
    ],
    'commercial-control': [
      {
        title: 'commercial Service',
        features: [
          'Gel Baiting & Residual Sprays, Odorless & Human Safe Chemicals',
          'Larviciding, Residual Sprays, Fogging, Mosquito Repellent Diffuser',
          'Rodent Stations, Glue boards, Snap Traps, Cages, Rodent Boxes',
          'Drill-Fill-Seal, TERMATRACK',
          'Net and Spikes Solutions, Aesthetic & Transparent Net',
          'Microbial disinfection, Nano-Herbal Disinfection'
        ],
        price: 'Price/-',
        originalPrice: 'Price/-',
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
        price: 'Price/-',
        package: '3 Services 1 Year',
        lastBooking: 'Available Today'
      }
    ],
    'offers': [
      {
        title: 'Commercial Offers',
        features: [
          '50% Off First Service for Offices',
          'Free Inspection for Commercial Properties',
          'Bulk Discount for Multiple Services',
          'Priority Scheduling for Businesses',
          'Eco-Friendly Treatments Included'
        ],
        price: 'Price/-',
        originalPrice: 'Price/-',
        package: 'Commercial Package',
        isRecommended: true,
        lastBooking: 'Last Booking on 15th Dec 2023'
      },
      {
        title: 'Residential Offers',
        features: [
          '30% Off Annual Maintenance Contract',
          'Free Home Inspection',
          'Family Discount for Multiple Services',
          'Safe Treatments for Homes with Kids',
          'Guaranteed Pest-Free Guarantee'
        ],
        price: 'Price/-',
        originalPrice: 'Price/-',
        package: 'Residential Package',
        lastBooking: 'Available Today'
      }
    ]
  };

  constructor(
    private advertisementService: AdvertisementService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.advertisementService.getActiveAdvertisements().subscribe(ads => {
      this.advertisements = ads;
      if (ads.length > 0) {
        this.startSlideShow();
      }
    });
    this.loadReviews();
    this.startReviewAutoSlide();
  }

  loadReviews() {
    this.http.get<any>('http://localhost:8000/api/v1/reviews/?is_approved=true').subscribe({
      next: (response) => {
        const apiReviews = (response.results || response).map((r: any) => ({
          name: r.name,
          location: 'Verified Customer',
          rating: r.rating,
          review: r.comment
        }));
        this.reviews = apiReviews.length > 0 ? apiReviews : [];
      },
      error: (error) => console.error('Error loading reviews:', error)
    });
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
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
    // Reset selections when service type changes
    this.selectedPestType = '';
    this.selectedPropertyType = '';
    this.selectedServicePackage = '';
    this.squareFeet = '';
  }

  onServiceChange(event: any) {
    this.selectedPestType = event.target.value;
    this.updatePricingCard();
  }

  onPropertyTypeChange(event: any) {
    this.selectedPropertyType = event.target.value;
    this.updatePricingCard();
  }

  onServicePackageChange(event: any) {
    this.selectedServicePackage = event.target.value;
    this.updatePricingCard();
  }

  updatePricingCard() {
    // Update the first card based on selections
    const cards = this.pricingData[this.selectedServiceType];
    if (cards && cards.length > 0) {
      const firstCard = cards[0];
      if (this.selectedPestType) {
        firstCard.features = this.getPestSpecificFeatures(this.selectedPestType);
      }
      if (this.selectedServiceType === 'residential-control' && this.selectedPropertyType) {
        firstCard.title = `Residential Service (${this.selectedPropertyType.toUpperCase()})`;
      } else if (this.selectedServiceType === 'commercial-control') {
        firstCard.title = 'Commercial Service';
      }
      if (this.selectedServicePackage) {
        firstCard.package = this.selectedServicePackage === 'single' ? 'Single Service' :
                           this.selectedServicePackage === '3-services' ? '3 Services (1 Year)' :
                           '6 Services (2 Years)';
      }
    }
  }

  getPestSpecificFeatures(pestType: string): string[] {
    const pestFeatures: { [key: string]: string[] } = {
      'cockroach': [
        'Treatment: Gel Baiting & Residual Sprays',
        'Chemicals: Odorless & Human Safe Chemicals',
        'Areas Covered: Work Stations, Meeting & Conference Rooms, Kitchen & Cafeteria, Vending Machines, Utilities, Restrooms, Drains'
      ],
      'mosquito': [
        'Treatment: Larviciding, Residual Sprays, Fogging',
        'Products: Mosquito Repellent Diffuser',
        'Areas Covered: Inside Office Spaces, Potted Plants, Utilities, Overhead Tanks, Common Passages, Entry/Exits'
      ],
      'rodent': [
        'Treatment: Rodent Stations, Glue boards, Snap Traps, Cages',
        'Products: Rodent Boxes',
        'Areas Covered: Stores, Food Handling Area, HVAC system, FAS (Fire Alarm System), Electric conduits, Plumbing ducts, Dropped Ceilings, Raised Flooring'
      ],
      'termite': [
        'Treatment: Drill-Fill-Seal',
        'Method: TERMATRACK',
        'Areas Covered: Electrical/Plumbing ducts, Wooden Furniture, Dropped Ceiling, Raised Flooring, Lift pits, Wall n floor junctions'
      ],
      'bird': [
        'Treatment: Net and Spikes Solutions',
        'Products: Aesthetic & Transparent Net',
        'Areas Covered: Ducts, Parapets & Ledges, AC exhausts, Vents, Window AC, External Facade'
      ],
      'disinfection': [
        'Treatment: Microbial disinfection, Nano-Herbal Disinfection',
        'Benefits: Kills 99.99% microbial organisms, SteriCare for Properties, Silver Nano for All common touch points'
      ]
    };
    return pestFeatures[pestType] || [];
  }

  getCurrentPricingCards(): PricingCard[] {
    return this.pricingData[this.selectedServiceType] || [];
  }

  startReviewAutoSlide() {
    this.reviewInterval = setInterval(() => {
      if (!this.isReviewPaused) {
        this.nextReview();
      }
    }, 5000);
  }

  nextReview() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
  }

  previousReview() {
    this.currentReviewIndex = this.currentReviewIndex === 0 ? this.reviews.length - 1 : this.currentReviewIndex - 1;
  }

  goToReview(index: number) {
    this.currentReviewIndex = index;
  }

  pauseReview() {
    this.isReviewPaused = true;
  }

  resumeReview() {
    this.isReviewPaused = false;
  }

}
