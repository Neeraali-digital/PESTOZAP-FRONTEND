import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AdminAuthService } from './auth.service';

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  constructor(private authService: AdminAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && token) {
          // Try to refresh token
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const newToken = this.authService.getToken();
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(newReq);
            }),
            catchError(() => {
              this.authService.logout();
              return throwError(() => error);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}