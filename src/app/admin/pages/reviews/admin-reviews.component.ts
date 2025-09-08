import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule],
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
              <div class="reviewer-avatar">{{review.name.charAt(0)}}</div>
              <div class="reviewer-details">
                <div class="reviewer-name">{{review.name}}</div>
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
            <p>{{review.comment}}</p>
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
export class AdminReviewsComponent {
  reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! The team was professional and thorough. Highly recommend for pest control needs.',
      date: '2 days ago'
    },
    {
      name: 'Mike Davis',
      rating: 4,
      comment: 'Good service overall. Arrived on time and solved our ant problem effectively.',
      date: '1 week ago'
    },
    {
      name: 'Emily Chen',
      rating: 5,
      comment: 'Outstanding work! They eliminated our termite issue completely. Very satisfied with the results.',
      date: '2 weeks ago'
    }
  ];

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }
}