import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Offer } from '../admin/models/admin.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private apiUrl = `${environment.apiUrl}/offers/`;

  constructor(private http: HttpClient) { }

  getOffers(): Observable<Offer[]> {
    return this.http.get<{results: Offer[]}>(this.apiUrl).pipe(
      map(response => response.results)
    );
  }
}
