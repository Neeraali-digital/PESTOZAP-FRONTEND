import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Review {
  id?: number;
  name: string;
  email: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at?: string;
}

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="reviews-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Reviews Management</h1>
          <p>Manage customer reviews and ratings</p>
        </div>
        <button class="btn-primary" (click)="openModal()">
          <i class="fas fa-plus"></i> Add Review
        </button>
      </div>

      <div class="reviews-grid">
        <div *ngFor="let review of reviews" class="review-card">
          <div class="review-header">
            <div>
              <h3>{{ review.name }}</h3>
              <p class="email">{{ review.email }}</p>
            </div>
            <div class="rating">
              <i *ngFor="let star of [1,2,3,4,5]" 
                 [class]="star <= review.rating ? 'fas fa-star' : 'far fa-star'"></i>
            </div>
          </div>
          <p class="comment">{{ review.comment }}</p>
          <div class="review-footer">
            <span class="status-badge" [class.approved]="review.is_approved">
              {{ review.is_approved ? 'Approved' : 'Pending' }}
            </span>
            <div class="actions">
              <button class="btn-edit" (click)="editReview(review)"><i class="fas fa-edit"></i></button>
              <button class="btn-toggle" (click)="toggleApproval(review)">
                <i [class]="review.is_approved ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
              <button class="btn-delete" (click)="deleteReview(review.id!)"><i class="fas fa-trash"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingReview ? 'Edit Review' : 'Add Review' }}</h2>
            <button class="close-btn" (click)="closeModal()">×</button>
          </div>
          <form [formGroup]="reviewForm" (ngSubmit)="saveReview()">
            <div class="form-group">
              <label>Name *</label>
              <input type="text" formControlName="name" class="form-control">
            </div>
            <div class="form-group">
              <label>Email *</label>
              <input type="email" formControlName="email" class="form-control">
            </div>
            <div class="form-group">
              <label>Rating *</label>
              <select formControlName="rating" class="form-control">
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div class="form-group">
              <label>Comment *</label>
              <textarea formControlName="comment" class="form-control" rows="4"></textarea>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="is_approved">
                <span>Approved</span>
              </label>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-save" [disabled]="!reviewForm.valid">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reviews-page{padding:2rem}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;background:white;padding:2rem;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header-content h1{margin:0 0 0.5rem;font-size:1.8rem;font-weight:700}
    .header-content p{margin:0;color:#666}
    .btn-primary{background:linear-gradient(135deg,#4CAF50,#45a049);color:white;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.5rem}
    .reviews-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:1.5rem}
    .review-card{background:white;border-radius:16px;padding:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .review-header{display:flex;justify-content:space-between;margin-bottom:1rem}
    .review-header h3{margin:0;font-size:1.1rem;font-weight:600}
    .email{margin:0.25rem 0 0;color:#666;font-size:0.9rem}
    .rating{color:#ffc107}
    .comment{color:#555;line-height:1.6;margin-bottom:1rem}
    .review-footer{display:flex;justify-content:space-between;align-items:center}
    .status-badge{padding:0.25rem 0.75rem;border-radius:20px;font-size:0.8rem;background:#e0e0e0;color:#666}
    .status-badge.approved{background:#e8f5e8;color:#4CAF50}
    .actions{display:flex;gap:0.5rem}
    .btn-edit,.btn-toggle,.btn-delete{width:36px;height:36px;border:none;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center}
    .btn-edit{background:#e3f2fd;color:#2196F3}
    .btn-toggle{background:#fff3e0;color:#FF9800}
    .btn-delete{background:#ffebee;color:#f44336}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000}
    .modal-content{background:white;border-radius:16px;width:90%;max-width:500px;padding:2rem}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
    .modal-header h2{margin:0;font-size:1.5rem}
    .close-btn{background:none;border:none;font-size:2rem;cursor:pointer;color:#666}
    .form-group{margin-bottom:1rem}
    .form-group label{display:block;margin-bottom:0.5rem;font-weight:600;color:#333}
    .form-control{width:100%;padding:0.75rem;border:1px solid #e0e0e0;border-radius:8px;font-size:1rem}
    .checkbox-label{display:flex;align-items:center;gap:0.5rem;cursor:pointer}
    .checkbox-label input{width:auto}
    .modal-actions{display:flex;gap:1rem;margin-top:1.5rem}
    .btn-cancel,.btn-save{flex:1;padding:0.75rem;border:none;border-radius:8px;font-weight:600;cursor:pointer}
    .btn-cancel{background:#f5f5f5;color:#666}
    .btn-save{background:#4CAF50;color:white}
    .btn-save:disabled{background:#ccc;cursor:not-allowed}
  `]
})
export class AdminReviewsComponent implements OnInit {
  private apiUrl = 'http://localhost:8000/api/v1/reviews/';
  
  reviews: Review[] = [];
  showModal = false;
  editingReview: Review | null = null;
  reviewForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rating: [5, Validators.required],
      comment: ['', Validators.required],
      is_approved: [true]
    });
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.reviews = response.results || response;
      },
      error: (error) => console.error('Error loading reviews:', error)
    });
  }

  openModal() {
    this.showModal = true;
    this.editingReview = null;
    this.reviewForm.reset({ rating: 5, is_approved: true });
  }

  closeModal() {
    this.showModal = false;
    this.editingReview = null;
  }

  editReview(review: Review) {
    this.editingReview = review;
    this.showModal = true;
    this.reviewForm.patchValue(review);
  }

  saveReview() {
    if (this.reviewForm.valid) {
      const request = this.editingReview
        ? this.http.put(`${this.apiUrl}${this.editingReview.id}/`, this.reviewForm.value)
        : this.http.post(this.apiUrl, this.reviewForm.value);

      request.subscribe({
        next: () => {
          this.loadReviews();
          this.closeModal();
        },
        error: (error) => console.error('Error saving review:', error)
      });
    }
  }

  toggleApproval(review: Review) {
    this.http.patch(`${this.apiUrl}${review.id}/`, { is_approved: !review.is_approved }).subscribe({
      next: () => this.loadReviews(),
      error: (error) => console.error('Error toggling approval:', error)
    });
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review?')) {
      this.http.delete(`${this.apiUrl}${id}/`).subscribe({
        next: () => this.loadReviews(),
        error: (error) => console.error('Error deleting review:', error)
      });
    }
  }
}
