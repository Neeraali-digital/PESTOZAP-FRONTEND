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
  image?: string;
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

  logos: string[] = [
    '../../../assets/logo/36 web logos pestozap-01.png',
    '../../../assets/logo/36 web logos pestozap-02.png',
    '../../../assets/logo/36 web logos pestozap-03.png',
    '../../../assets/logo/36 web logos pestozap-04.png',
    '../../../assets/logo/36 web logos pestozap-05.png',
    '../../../assets/logo/36 web logos pestozap-06.png',
    '../../../assets/logo/36 web logos pestozap-07.png',
    '../../../assets/logo/36 web logos pestozap-08.png',
    '../../../assets/logo/36 web logos pestozap-09.png',
    '../../../assets/logo/36 web logos pestozap-10.png',
    '../../../assets/logo/36 web logos pestozap-11.png',
    '../../../assets/logo/36 web logos pestozap-12.png',
    '../../../assets/logo/36 web logos pestozap-13.png',
    '../../../assets/logo/36 web logos pestozap-14.png',
    '../../../assets/logo/36 web logos pestozap-15.png',
    '../../../assets/logo/36 web logos pestozap-16.png',
    '../../../assets/logo/36 web logos pestozap-17.png',
    '../../../assets/logo/36 web logos pestozap-18.png',
    '../../../assets/logo/36 web logos pestozap-19.png',
    '../../../assets/logo/36 web logos pestozap-20.png',
    '../../../assets/logo/36 web logos pestozap-21.png',
    '../../../assets/logo/36 web logos pestozap-22.png',
    '../../../assets/logo/36 web logos pestozap-23.png',
    '../../../assets/logo/36 web logos pestozap-24.png',
    '../../../assets/logo/36 web logos pestozap-26.png',
    '../../../assets/logo/36 web logos pestozap-27.png',
    '../../../assets/logo/36 web logos pestozap-28.png',
    '../../../assets/logo/36 web logos pestozap-29.png',
    '../../../assets/logo/36 web logos pestozap-30.png',
    '../../../assets/logo/36 web logos pestozap-31.png',
    '../../../assets/logo/36 web logos pestozap-32.png',
    '../../../assets/logo/36 web logos pestozap-33.png',
    '../../../assets/logo/36 web logos pestozap-35.png',
    '../../../assets/logo/36 web logos pestozap-37.png'
  ];
  currentLogoIndex = 0;
  logoInterval: any;


  advertisements: Advertisement[] = [];

  images = [
    '../../../assets/ad1.png',
    '../../../assets/ad2.png',
    '../../../assets/ad3.png',
  ]

  reviews: Review[] = [];

  residentialOneTimeRates = [
    { treatment: 'Cockroach Control (Gel + Residual Spray)', '2bhk': '₹900', '3bhk': '₹1,300', '4bhk': '₹1,600', villa: '₹2,000', warranty: '3 Months' },
    { treatment: 'Termite Treatment (Local + Deep)', '2bhk': '₹4,200', '3bhk': '₹6,000', '4bhk': '₹7,500', villa: '₹10,000', warranty: '3 Years' },
    { treatment: 'General Pest Control (Cockroach + Ants + Spiders)', '2bhk': '₹1,000', '3bhk': '₹1,400', '4bhk': '₹1,800', villa: '₹2,200', warranty: '3 Months' },
    { treatment: 'Rat / Rodent Control (Traps + Baits)', '2bhk': '₹1,100', '3bhk': '₹1,500', '4bhk': '₹1,800', villa: '₹2,200', warranty: 'No Warranty' },
    { treatment: 'Flies / Flying Insects Treatment', '2bhk': '₹850', '3bhk': '₹1,200', '4bhk': '₹1,500', villa: '₹1,800', warranty: '3 Months' },
    { treatment: 'Mosquito ICON Spray (Outdoor Residual)', '2bhk': '₹1,300', '3bhk': '₹1,700', '4bhk': '₹2,000', villa: '₹2,500', warranty: '2 Months' },
    { treatment: 'Mosquito Fogging / ULV (Indoor)', '2bhk': '₹1,000', '3bhk': '₹1,300', '4bhk': '₹1,600', villa: '₹2,000', warranty: 'NA' }
  ];

  residentialAmcRates = [
    {
      name: 'SILVER',
      frequency: 'Quarterly (4 visits/yr)',
      prices: { '2bhk': '₹3,200 / yr', '3bhk': '₹4,400 / yr', '4bhk': '₹5,400 / yr', villa: '₹6,500 / yr' },
      includes: 'General pest control, cockroach treatment. Re-service within 30 days.',
      color: 'from-gray-300 to-gray-400',
      icon: 'verified'
    },
    {
      name: 'GOLD',
      frequency: 'Bi-Monthly (6 visits/yr)',
      prices: { '2bhk': '₹4,800 / yr', '3bhk': '₹6,600 / yr', '4bhk': '₹8,000 / yr', villa: '₹10,000 / yr' },
      includes: 'Silver + rodent monitoring + 2 ICON mosquito sprays. Re-service within 45 days.',
      color: 'from-yellow-300 to-yellow-500',
      icon: 'workspace_premium',
      recommended: true
    },
    {
      name: 'PLATINUM',
      frequency: 'Monthly (12 visits/yr)',
      prices: { '2bhk': '₹8,000 / yr', '3bhk': '₹10,800 / yr', '4bhk': '₹13,500 / yr', villa: '₹18,000 / yr' },
      includes: 'Priority response (24–48 hrs), termite annual inspection, unlimited re-service for covered pests.',
      color: 'from-slate-700 to-slate-900 text-white',
      icon: 'diamond'
    }
  ];

  termiteAmcAddOn = {
    '2bhk': '₹10,000', '3bhk': '₹15,000', '4bhk': '₹18,000', villa: '₹25,000'
  };

  commercialRates = [
    { area: 'Up to 1,000 sq.ft', oneTime: '₹2,500', amc: '₹10,000 / yr' },
    { area: '1,001 – 3,000 sq.ft', oneTime: '₹4,500', amc: '₹18,000 / yr' },
    { area: '3,001 – 10,000 sq.ft', oneTime: '₹7,500', amc: '₹30,000 / yr' },
    { area: '10,000+ sq.ft', oneTime: 'Site Survey', amc: 'Site Survey' }
  ];

  constructor(
    private advertisementService: AdvertisementService,
    private router: Router,
    private http: HttpClient
  ) { }

  // Selection States
  selectedCategory: 'residential' | 'commercial' = 'residential';
  selectedServiceType: 'one-time' | 'amc' = 'amc'; 
  selectedPropertySize: '2bhk' | '3bhk' | '4bhk' | 'villa' = '2bhk';
  selectedPestType: string = ''; 
  selectedCommercialArea: string = 'Up to 1,000 sq.ft';

  displayCards: PricingCard[] = [];

  // Dropdown Options
  pestTypes = [
    'Cockroach Control (Gel + Residual Spray)',
    'Termite Treatment (Local + Deep)',
    'General Pest Control (Cockroach + Ants + Spiders)',
    'Rat / Rodent Control (Traps + Baits)',
    'Flies / Flying Insects Treatment',
    'Mosquito ICON Spray (Outdoor Residual)',
    'Mosquito Fogging / ULV (Indoor)'
  ];

  commercialAreas = [
    'Up to 1,000 sq.ft',
    '1,001 – 3,000 sq.ft',
    '3,001 – 10,000 sq.ft',
    '10,000+ sq.ft'
  ];

  ngOnInit() {
    this.advertisementService.getActiveAdvertisements().subscribe(ads => {
      this.advertisements = ads;
      if (ads.length > 0) {
        this.startSlideShow();
      }
    });
    this.loadReviews();
    this.startReviewAutoSlide();
    this.startLogoCycle();
    this.updateCards(); // Initial load
  }

  loadReviews() {
    this.http.get<any>('http://localhost:8000/api/v1/reviews/?is_approved=true&display_location=home').subscribe({
      next: (response) => {
        const apiReviews = (response.results || response).map((r: any) => ({
          name: r.name,
          location: r.location || 'Verified Customer',
          image: r.image,
          rating: r.rating,
          review: r.comment
        }));
        this.reviews = apiReviews.length > 0 ? apiReviews : [];
      },
      error: (error) => console.error('Error loading reviews:', error)
    });
  }

  getImageUrl(review: Review): string {
    if (review.image) {
      return review.image.startsWith('http') ? review.image : `http://localhost:8000${review.image}`;
    }
    return '';
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
    }
    if (this.logoInterval) {
      clearInterval(this.logoInterval);
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

  startLogoCycle() {
    this.logoInterval = setInterval(() => {
      this.currentLogoIndex = (this.currentLogoIndex + 1) % this.logos.length;
    }, 4000);
  }

  getCurrentLogos(): string[] {
    const currentLogos: string[] = [];
    for (let i = 0; i < 18; i++) {
      const index = (this.currentLogoIndex + i) % this.logos.length;
      currentLogos.push(this.logos[index]);
    }
    return currentLogos;
  }

  getBorderRadius(index: number): string {
    const radii = [
      '60% 40% 30% 70% / 60% 30% 70% 40%',
      '40% 60% 70% 30% / 40% 70% 30% 60%',
      '70% 30% 60% 40% / 30% 60% 40% 70%',
      '30% 70% 40% 60% / 70% 40% 60% 30%',
      '50% 50% 30% 70% / 50% 50% 70% 30%',
      '65% 35% 45% 55% / 35% 65% 55% 45%',
      '45% 55% 65% 35% / 55% 45% 35% 65%',
      '35% 65% 55% 45% / 65% 35% 45% 55%',
      '55% 45% 35% 65% / 45% 55% 65% 35%',
      '40% 60% 50% 50% / 60% 40% 50% 50%',
      '70% 30% 50% 50% / 30% 70% 50% 50%',
      '50% 50% 40% 60% / 50% 50% 60% 40%',
      '60% 40% 70% 30% / 40% 60% 30% 70%',
      '40% 60% 30% 70% / 60% 40% 70% 30%',
      '70% 30% 40% 60% / 30% 70% 60% 40%',
      '30% 70% 60% 40% / 70% 30% 40% 60%',
      '50% 50% 70% 30% / 50% 50% 30% 70%',
      '65% 35% 55% 45% / 35% 65% 45% 55%'
    ];
    return radii[index] || '50%';
  }

  onCategoryChange(val: any) {
    this.selectedCategory = val;
    this.selectedServiceType = 'one-time'; // reset
    this.updateCards();
  }

  onServiceTypeChange(val: any) {
    this.selectedServiceType = val;
    this.updateCards();
  }

  onPropertySizeChange(val: any) {
    this.selectedPropertySize = val;
    this.updateCards();
  }

  onPestTypeChange(val: any) {
    this.selectedPestType = val;
    this.updateCards();
  }

  onCommercialAreaChange(val: any) {
    this.selectedCommercialArea = val;
    this.updateCards();
  }

  updateCards() {
    this.displayCards = [];

    if (this.selectedCategory === 'residential') {
      if (this.selectedServiceType === 'one-time') {
        // Show specific pest cards or all if none selected
        let ratesToShow = this.residentialOneTimeRates;
        if (this.selectedPestType) {
          ratesToShow = ratesToShow.filter(r => r.treatment === this.selectedPestType);
        }

        // enhance: if no specific pest selected, maybe show top 2 popular ones?
        // simple: just show first 2 or filtered list
        if (!this.selectedPestType && ratesToShow.length > 2) {
          ratesToShow = ratesToShow.slice(0, 2); // Show top 2 by default to fit UI
        }

        this.displayCards = ratesToShow.map(rate => ({
          title: rate.treatment,
          features: [
            `Warranty: ${rate.warranty}`,
            'Professional Treatment',
            'Safe Chemicals'
          ],
          price: (rate as any)[this.selectedPropertySize] || 'N/A',
          package: 'One-Time Service',
          isRecommended: rate.treatment.includes('General Pest') || rate.treatment.includes('Cockroach'),
          lastBooking: 'Booked 2 hours ago'
        }));

      } else {
        // AMC - Show Silver, Gold, Platinum
        this.displayCards = this.residentialAmcRates.map(plan => ({
          title: `${plan.name} PLAN`,
          features: [
            plan.frequency,
            plan.includes,
            // Add termite add-on info if relevant or generic
            'Optional Termite Add-on Available'
          ],
          price: (plan.prices as any)[this.selectedPropertySize] || 'N/A',
          package: 'Annual Contract',
          isRecommended: plan.name === 'GOLD',
          lastBooking: 'Popular Choice'
        }));
      }
    } else {
      // Commercial
      // Map based on area
      const rate = this.commercialRates.find(r => r.area === this.selectedCommercialArea);
      if (rate) {
        this.displayCards.push({
          title: 'One-Time Service',
          features: ['General Pest Control', 'Compliance Documentation', 'Night Service Available'],
          price: rate.oneTime,
          package: 'Single Service',
          isRecommended: false,
          lastBooking: 'Available Today'
        });
        this.displayCards.push({
          title: 'Annual Maintenance',
          features: ['6 Visits / Year', 'Priority Support', 'Audit Support', 'Trend Analysis'],
          price: rate.amc,
          package: '1 Year AMC',
          isRecommended: true,
          lastBooking: 'Business Favorite'
        });
      }
    }
  }

  bookNow(card: PricingCard) {
    const queryParams: any = {
      service_type: this.selectedCategory === 'residential' ?
        (this.selectedServiceType === 'one-time' ? 'Residential One-Time' : 'Residential AMC') :
        'Commercial',
      package: card.title, // e.g., "Silver Plan" or "Cockroach Control"
      price: card.price,
    };

    if (this.selectedCategory === 'residential') {
      queryParams.property_details = this.selectedPropertySize.toUpperCase();
      if (this.selectedServiceType === 'one-time' && this.selectedPestType) {
        queryParams.pest_type = this.selectedPestType;
      }
    } else {
      queryParams.property_details = this.selectedCommercialArea;
    }

    this.router.navigate(['/enquiry'], { queryParams });
  }

  getCurrentPricingCards(): PricingCard[] {
    return this.displayCards;
  }
}
