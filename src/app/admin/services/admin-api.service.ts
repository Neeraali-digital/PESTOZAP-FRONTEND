import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  DashboardStats,
  BlogPost,
  Category,
  Tag,
  Review,
  Enquiry,
  Offer,
  User,
  Job,
  JobApplication
} from '../models/admin.models';

@Injectable()
export class AdminApiService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

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
    return this.http.get<{ results: Review[], count: number }>(`${this.API_URL}/reviews/`, { params: httpParams });
  }

  getReview(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.API_URL}/reviews/${id}/`);
  }

  createReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(`${this.API_URL}/reviews/`, review);
  }

  updateReview(id: number, review: Partial<Review>): Observable<Review> {
    return this.http.put<Review>(`${this.API_URL}/reviews/${id}/`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/reviews/${id}/`);
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
    return this.http.get<{ results: Offer[], count: number }>(`${this.API_URL}/offers/`, { params: httpParams });
  }

  getOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(`${this.API_URL}/offers/${id}/`);
  }

  createOffer(offer: Partial<Offer>): Observable<Offer> {
    return this.http.post<Offer>(`${this.API_URL}/offers/`, offer);
  }

  updateOffer(id: number, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(`${this.API_URL}/offers/${id}/`, offer);
  }

  partialUpdateOffer(id: number, offer: Partial<Offer>): Observable<Offer> {
    return this.http.patch<Offer>(`${this.API_URL}/offers/${id}/`, offer);
  }

  deleteOffer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/offers/${id}/`);
  }

  // File Upload
  uploadFile(file: File, type: string): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return this.http.post<{ url: string }>(`${this.API_URL}/admin/upload/`, formData);
  }

  // Career Management
  getJobs(params?: any): Observable<{ results: Job[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: Job[], count: number }>(`${this.API_URL}/careers/jobs/`, { params: httpParams });
  }

  getJob(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.API_URL}/careers/jobs/${id}/`);
  }

  createJob(job: Partial<Job>): Observable<Job> {
    return this.http.post<Job>(`${this.API_URL}/careers/jobs/`, job);
  }

  updateJob(id: number, job: Partial<Job>): Observable<Job> {
    return this.http.put<Job>(`${this.API_URL}/careers/jobs/${id}/`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/careers/jobs/${id}/`);
  }

  getJobApplications(params?: any): Observable<{ results: JobApplication[], count: number }> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key]) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return this.http.get<{ results: JobApplication[], count: number }>(`${this.API_URL}/careers/applications/`, { params: httpParams });
  }
}