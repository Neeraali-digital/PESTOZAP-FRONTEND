import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Review {
  name: string;
  email: string;
  location?: string;
  image?: string;
  rating: number;
  comment: string;
  created_at?: string;
}

@Component({
  selector: 'app-our-community',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './our-community.component.html',
  styleUrl: './our-community.component.css'
})
export class OurCommunityComponent implements OnInit, OnDestroy {
  reviews: Review[] = [];

  // Logo rotation properties
  allLogos: string[] = [
    'assets/logo/36 web logos pestozap-01.png',
    'assets/logo/36 web logos pestozap-02.png',
    'assets/logo/36 web logos pestozap-03.png',
    'assets/logo/36 web logos pestozap-04.png',
    'assets/logo/36 web logos pestozap-05.png',
    'assets/logo/36 web logos pestozap-06.png',
    'assets/logo/36 web logos pestozap-07.png',
    'assets/logo/36 web logos pestozap-08.png',
    'assets/logo/36 web logos pestozap-09.png',
    'assets/logo/36 web logos pestozap-10.png',
    'assets/logo/36 web logos pestozap-11.png',
    'assets/logo/36 web logos pestozap-12.png',
    'assets/logo/36 web logos pestozap-13.png',
    'assets/logo/36 web logos pestozap-14.png',
    'assets/logo/36 web logos pestozap-15.png',
    'assets/logo/36 web logos pestozap-16.png',
    'assets/logo/36 web logos pestozap-17.png',
    'assets/logo/36 web logos pestozap-18.png',
    'assets/logo/36 web logos pestozap-19.png',
    'assets/logo/36 web logos pestozap-20.png',
    'assets/logo/36 web logos pestozap-21.png',
    'assets/logo/36 web logos pestozap-22.png',
    'assets/logo/36 web logos pestozap-23.png',
    'assets/logo/36 web logos pestozap-24.png',
    'assets/logo/36 web logos pestozap-26.png',
    'assets/logo/36 web logos pestozap-27.png',
    'assets/logo/36 web logos pestozap-28.png',
    'assets/logo/36 web logos pestozap-29.png',
    'assets/logo/36 web logos pestozap-30.png',
    'assets/logo/36 web logos pestozap-31.png',
    'assets/logo/36 web logos pestozap-32.png',
    'assets/logo/36 web logos pestozap-33.png',
    'assets/logo/36 web logos pestozap-35.png',
    'assets/logo/36 web logos pestozap-37.png',
  ];
  displayedLogos: string[] = [];
  currentIndex = 0;
  private logoInterval: any;
  private readonly LOGOS_PER_VIEW = 6;
  private readonly ROTATION_INTERVAL_MS = 3000;


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadReviews();
    this.updateDisplayedLogos();
    this.startLogoRotation();
  }

  ngOnDestroy() {
    if (this.logoInterval) {
      clearInterval(this.logoInterval);
    }
  }

  updateDisplayedLogos() {
    this.displayedLogos = [];
    for (let i = 0; i < this.LOGOS_PER_VIEW; i++) {
      const logoIndex = (this.currentIndex + i) % this.allLogos.length;
      this.displayedLogos.push(this.allLogos[logoIndex]);
    }
  }

  startLogoRotation() {
    this.logoInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.allLogos.length;
      this.updateDisplayedLogos();
    }, this.ROTATION_INTERVAL_MS);
  }

  loadReviews() {
    this.http.get<any>(`${environment.apiUrl}/reviews/?is_approved=true&display_location=community`).subscribe({
      next: (response) => {
        this.reviews = response.results || response;
      },
      error: (error) => console.error('Error loading reviews:', error)
    });
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 60) return '1 month ago';
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  getImageUrl(review: Review): string {
    if (review.image) {
      return review.image.startsWith('http') ? review.image : `${environment.baseUrl}${review.image}`;
    }
    return '';
  }

  getLogoName(logoPath: string): string {
    const fileName = logoPath.split('/').pop();
    if (!fileName) return 'Unknown Logo';

    const match = fileName.match(/pestozap-(\d+)\.png$/);
    if (match && match[1]) {
      return `Logo ${parseInt(match[1], 10)}`;
    }
    return 'Brand Logo'; // Fallback
  }
}
