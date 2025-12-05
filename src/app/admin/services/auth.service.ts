import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AdminUser } from '../models/admin.models';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly API_URL = 'http://localhost:8000/api/v1';
  private currentUserSubject = new BehaviorSubject<AdminUser | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredUser();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/auth/jwt/create/`, credentials)
      .pipe(
        tap((response: any) => {
          if (response.access) {
            localStorage.setItem('admin_access_token', response.access);
            localStorage.setItem('admin_refresh_token', response.refresh);
          }
        }),
        switchMap((response: any) => {
          if (response.access) {
            return this.getCurrentUser();
          }
          throw new Error('No access token received');
        })
      );
  }

  getCurrentUser(): Observable<AdminUser> {
    return this.http.get<AdminUser>(`${this.API_URL}/auth/users/me/`)
      .pipe(
        tap(user => {
          if (user.is_staff || user.is_superuser) {
            this.currentUserSubject.next(user);
            localStorage.setItem('admin_user', JSON.stringify(user));
          } else {
            this.logout();
            throw new Error('Access denied. Admin privileges required.');
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    localStorage.removeItem('admin_user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/admin/login']);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('admin_refresh_token');
    return this.http.post(`${this.API_URL}/auth/jwt/refresh/`, {
      refresh: refreshToken
    }).pipe(
      tap((response: any) => {
        if (response.access) {
          localStorage.setItem('admin_access_token', response.access);
        }
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('admin_access_token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.currentUserSubject.value;
    return !!(token && user && (user.is_staff || user.is_superuser));
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('admin_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.is_staff || user.is_superuser) {
        this.currentUserSubject.next(user);
      }
    }
  }
}