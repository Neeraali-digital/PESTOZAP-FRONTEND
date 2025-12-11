import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
export class OurCommunityComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.http.get<any>('http://localhost:8000/api/v1/reviews/?is_approved=true&display_location=community').subscribe({
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
      return review.image.startsWith('http') ? review.image : `http://localhost:8000${review.image}`;
    }
    return '';
  }
}
