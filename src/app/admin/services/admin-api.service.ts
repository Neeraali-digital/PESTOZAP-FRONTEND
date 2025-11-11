import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  DashboardStats, 
  BlogPost, 
  Category, 
  Tag, 
  Review, 
  Enquiry, 
  Offer, 
  User 
} from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private readonly API_URL = 'http://localhost:8000/api/v1';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/dashboard/stats/`);
  }

  // Blog Management
  getBlogPosts(params?: any): Observable<{ results: BlogPost[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: BlogPost[], count: number }>(`${this.API_URL}/admin/blog/posts/`, { params: httpParams });
  }

  getBlogPost(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.API_URL}/admin/blog/posts/${id}/`);
  }

  createBlogPost(post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.API_URL}/admin/blog/posts/`, post);
  }

  updateBlogPost(id: number, post: Partial<BlogPost>): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${this.API_URL}/admin/blog/posts/${id}/`, post);
  }

  deleteBlogPost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/admin/blog/posts/${id}/`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/blog/categories/`);
  }

  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(`${this.API_URL}/admin/blog/categories/`, category);
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.API_URL}/blog/tags/`);
  }

  createTag(tag: Partial<Tag>): Observable<Tag> {
    return this.http.post<Tag>(`${this.API_URL}/admin/blog/tags/`, tag);
  }

  // User Management
  getUsers(params?: any): Observable<{ results: User[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: User[], count: number }>(`${this.API_URL}/admin/users/`, { params: httpParams });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/admin/users/${id}/`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/admin/users/`, user);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/admin/users/${id}/update/`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/admin/users/${id}/delete/`);
  }

  // Review Management
  getReviews(params?: any): Observable<{ results: Review[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: Review[], count: number }>(`${this.API_URL}/admin/reviews/`, { params: httpParams });
  }

  updateReview(id: number, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.API_URL}/admin/reviews/${id}/`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/admin/reviews/${id}/`);
  }

  // Enquiry Management
  getEnquiries(params?: any): Observable<{ results: Enquiry[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: Enquiry[], count: number }>(`${this.API_URL}/admin/enquiries/`, { params: httpParams });
  }

  updateEnquiry(id: number, enquiry: Partial<Enquiry>): Observable<Enquiry> {
    return this.http.put<Enquiry>(`${this.API_URL}/admin/enquiries/${id}/`, enquiry);
  }

  deleteEnquiry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/admin/enquiries/${id}/`);
  }

  // Offer Management
  getOffers(params?: any): Observable<{ results: Offer[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: Offer[], count: number }>(`${this.API_URL}/admin/offers/`, { params: httpParams });
  }

  getOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.API_URL}/admin/offers/${id}/`);
  }

  createOffer(offer: Partial<Offer>): Observable<Offer> {
    return this.http.post<Offer>(`${this.API_URL}/admin/offers/`, offer);
  }

  updateOffer(id: number, offer: Partial<Offer>): Observable<Offer> {
    return this.http.put<Offer>(`${this.API_URL}/admin/offers/${id}/`, offer);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/admin/offers/${id}/`);
  }

  // File Upload
  uploadFile(file: File, type: string): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post<{ url: string }>(`${this.API_URL}/admin/upload/`, formData);
  }
}