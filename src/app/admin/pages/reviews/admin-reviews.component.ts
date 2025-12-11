import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Review {
  id?: number;
  name: string;
  email: string;
  location?: string;
  image?: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_featured: boolean;
  display_location: string;
  created_at?: string;
}

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin-reviews.component.html',
  styleUrls: ['./admin-reviews.component.css']
})
export class AdminReviewsComponent implements OnInit {
  private apiUrl = 'http://localhost:8000/api/v1/reviews/';
  
  reviews: Review[] = [];
  showModal = false;
  editingReview: Review | null = null;
  reviewForm: FormGroup;
  loading = false;
  saving = false;
  selectedFile: File | null = null;
  maxFileSize = 2 * 1024 * 1024; // 2MB

  searchTerm = '';
  statusFilter = '';
  locationFilter = '';

  totalReviews = 0;
  approvedCount = 0;
  homeCount = 0;
  communityCount = 0;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      location: [''],
      image: [''],
      rating: [5, Validators.required],
      comment: ['', Validators.required],
      is_approved: [true],
      is_featured: [false],
      display_location: ['both', Validators.required]
    });
  }

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    let url = this.apiUrl;
    const params: string[] = [];

    if (this.searchTerm) {
      params.push(`search=${encodeURIComponent(this.searchTerm)}`);
    }
    if (this.statusFilter) {
      params.push(`is_approved=${this.statusFilter}`);
    }
    if (this.locationFilter) {
      params.push(`display_location=${this.locationFilter}`);
    }

    if (params.length > 0) {
      url += '?' + params.join('&');
    }

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.reviews = response.results || response;
        this.updateStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading reviews:', error);
        this.loading = false;
      }
    });
  }

  updateStats() {
    this.totalReviews = this.reviews.length;
    this.approvedCount = this.reviews.filter(r => r.is_approved).length;
    this.homeCount = this.reviews.filter(r => r.display_location === 'home' || r.display_location === 'both').length;
    this.communityCount = this.reviews.filter(r => r.display_location === 'community' || r.display_location === 'both').length;
  }

  onSearch() {
    this.loadReviews();
  }

  onFilterChange() {
    this.loadReviews();
  }

  openModal() {
    this.showModal = true;
    this.editingReview = null;
    this.selectedFile = null;
    this.reviewForm.reset({
      name: '',
      email: '',
      location: '',
      image: '',
      rating: 5,
      comment: '',
      is_approved: true,
      is_featured: false,
      display_location: 'both'
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        alert('File size must be less than 2MB');
        event.target.value = '';
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        event.target.value = '';
        return;
      }
      this.selectedFile = file;
    }
  }

  getImageUrl(review: Review): string {
    if (review.image) {
      return review.image.startsWith('http') ? review.image : `http://localhost:8000${review.image}`;
    }
    return '';
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

  setRating(rating: number) {
    this.reviewForm.patchValue({ rating });
  }

  saveReview() {
    if (this.reviewForm.valid) {
      this.saving = true;

      // Create FormData to handle file upload
      const formData = new FormData();
      const reviewData = this.reviewForm.value;

      // Append all form fields to FormData
      Object.keys(reviewData).forEach(key => {
        if (key !== 'image' || !this.selectedFile) {
          formData.append(key, reviewData[key]);
        }
      });

      // Append the selected file if exists
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      const request = this.editingReview
        ? this.http.put(`${this.apiUrl}${this.editingReview.id}/`, formData)
        : this.http.post(this.apiUrl, formData);

      request.subscribe({
        next: () => {
          this.loadReviews();
          this.closeModal();
          this.saving = false;
        },
        error: (error) => {
          console.error('Error saving review:', error);
          this.saving = false;
        }
      });
    }
  }

  toggleApproval(review: Review) {
    this.http.patch(`${this.apiUrl}${review.id}/`, { is_approved: !review.is_approved }).subscribe({
      next: () => this.loadReviews(),
      error: (error) => console.error('Error toggling approval:', error)
    });
  }

  toggleFeatured(review: Review) {
    this.http.patch(`${this.apiUrl}${review.id}/`, { is_featured: !review.is_featured }).subscribe({
      next: () => this.loadReviews(),
      error: (error) => console.error('Error toggling featured:', error)
    });
  }

  deleteReview(id: number) {
    if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
      this.http.delete(`${this.apiUrl}${id}/`).subscribe({
        next: () => this.loadReviews(),
        error: (error) => console.error('Error deleting review:', error)
      });
    }
  }

  getLocationIcon(location: string): string {
    const icons: { [key: string]: string } = {
      'home': 'home',
      'community': 'groups',
      'both': 'public'
    };
    return icons[location] || 'public';
  }

  getLocationLabel(location: string): string {
    const labels: { [key: string]: string } = {
      'home': 'Home',
      'community': 'Community',
      'both': 'Both'
    };
    return labels[location] || 'Both';
  }
}
