import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminApiService } from '../../services/admin-api.service';
import { Review } from '../../models/admin.models';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AdminApiService],
  template: `
    <div class="reviews-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Customer Reviews</h1>
          <p>Monitor and respond to customer feedback</p>
        </div>
        <div class="rating-summary">
          <div class="overall-rating">
            <div class="rating-number">4.8</div>
            <div class="rating-stars">
              <i class="fas fa-star" *ngFor="let star of [1,2,3,4,5]"></i>
            </div>
            <div class="rating-count">Based on 156 reviews</div>
          </div>
        </div>
      </div>

      <div class="reviews-list">
        <div class="review-card" *ngFor="let review of reviews">
          <div class="review-header">
            <div class="reviewer-info">
              <div class="reviewer-avatar">{{(review.customer_name || review.user.full_name || 'U').charAt(0)}}</div>
              <div class="reviewer-details">
                <div class="reviewer-name">{{review.customer_name || review.user.full_name || 'Anonymous'}}</div>
                <div class="review-date">{{review.date}}</div>
              </div>
            </div>
            <div class="review-rating">
              <div class="stars">
                <i class="fas fa-star" *ngFor="let star of getStars(review.rating)"></i>
                <i class="far fa-star" *ngFor="let star of getEmptyStars(review.rating)"></i>
              </div>
              <span class="rating-text">{{review.rating}}/5</span>
            </div>
          </div>
          <div class="review-content">
            <p>{{review.comment || review.content}}</p>
          </div>
          <div class="review-actions">
            <button class="action-btn reply">
              <i class="fas fa-reply"></i>
              Reply
            </button>
            <button class="action-btn moderate">
              <i class="fas fa-flag"></i>
              Moderate
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reviews-page{padding:0}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;padding:2rem;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header-content h1{margin:0 0 0.5rem;color:#333;font-size:1.8rem;font-weight:700}
    .header-content p{margin:0;color:#666}
    .rating-summary{text-align:center}
    .rating-number{font-size:3rem;font-weight:700;color:#667eea;margin-bottom:0.5rem}
    .rating-stars{color:#ffc107;font-size:1.2rem;margin-bottom:0.5rem}
    .rating-count{color:#666;font-size:0.9rem}
    .reviews-list{display:flex;flex-direction:column;gap:1.5rem}
    .review-card{background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);padding:1.5rem;transition:transform 0.3s ease}
    .review-card:hover{transform:translateY(-2px)}
    .review-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem}
    .reviewer-info{display:flex;align-items:center;gap:0.75rem}
    .reviewer-avatar{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);color:white;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:1.2rem}
    .reviewer-name{font-weight:600;color:#333;margin-bottom:0.25rem}
    .review-date{color:#666;font-size:0.85rem}
    .review-rating{text-align:right}
    .stars{color:#ffc107;margin-bottom:0.25rem}
    .rating-text{color:#666;font-size:0.85rem}
    .review-content p{margin:0 0 1rem;color:#555;line-height:1.6}
    .review-actions{display:flex;gap:0.75rem}
    .action-btn{display:flex;align-items:center;gap:0.5rem;padding:0.5rem 1rem;border:none;border-radius:6px;font-size:0.85rem;font-weight:500;cursor:pointer;transition:all 0.3s ease}
    .action-btn.reply{background:#e3f2fd;color:#2196F3}
    .action-btn.moderate{background:#fff3e0;color:#ff9800}
    .action-btn:hover{transform:translateY(-1px)}
  `]
})
export class AdminReviewsComponent implements OnInit {
  reviews: Review[] = [];
  loading = false;
  error = '';
  searchTerm = '';
  statusFilter = '';
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;

  constructor(private adminApiService: AdminApiService) {}

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.error = '';
    
    const params = {
      page: this.currentPage,
      page_size: this.pageSize,
      search: this.searchTerm,
      status: this.statusFilter
    };

    this.adminApiService.getReviews(params).subscribe({
      next: (response) => {
        this.reviews = response.results;
        this.totalCount = response.count;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load reviews';
        this.loading = false;
        console.error('Error loading reviews:', error);
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadReviews();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadReviews();
  }

  updateReviewStatus(id: number, status: string) {
    const validStatus = status as 'pending' | 'approved' | 'rejected';
    this.adminApiService.updateReview(id, { status: validStatus }).subscribe({
      next: () => {
        this.loadReviews();
      },
      error: (error) => {
        console.error('Error updating review:', error);
      }
    });
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.adminApiService.deleteReview(id).subscribe({
        next: () => {
          this.loadReviews();
        },
        error: (error) => {
          console.error('Error deleting review:', error);
        }
      });
    }
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  get averageRating(): number {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round((sum / this.reviews.length) * 10) / 10;
  }
}