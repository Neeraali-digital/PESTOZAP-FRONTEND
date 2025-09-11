import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Advertisement {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private advertisementsSubject = new BehaviorSubject<Advertisement[]>([
    {
      id: 1,
      title: 'Professional Pest Control',
      description: 'Get 50% off on your first service',
      imageUrl: 'assets/ad1.jpg',
      isActive: true,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Eco-Friendly Solutions',
      description: 'Safe for family and pets',
      imageUrl: 'assets/ad2.jpg',
      isActive: true,
      createdAt: new Date()
    },
    {
      id: 3,
      title: '24/7 Emergency Service',
      description: 'Call us anytime for urgent pest issues',
      imageUrl: 'assets/ad3.jpg',
      isActive: true,
      createdAt: new Date()
    }
  ]);

  constructor() {}

  getAdvertisements(): Observable<Advertisement[]> {
    return this.advertisementsSubject.asObservable();
  }

  getActiveAdvertisements(): Observable<Advertisement[]> {
    return new Observable(observer => {
      this.advertisementsSubject.subscribe(ads => {
        observer.next(ads.filter(ad => ad.isActive));
      });
    });
  }

  addAdvertisement(ad: Omit<Advertisement, 'id' | 'createdAt'>): void {
    const currentAds = this.advertisementsSubject.value;
    const newAd: Advertisement = {
      ...ad,
      id: Date.now(),
      createdAt: new Date()
    };
    this.advertisementsSubject.next([...currentAds, newAd]);
  }

  updateAdvertisement(id: number, ad: Partial<Advertisement>): void {
    const currentAds = this.advertisementsSubject.value;
    const index = currentAds.findIndex(a => a.id === id);
    if (index !== -1) {
      currentAds[index] = { ...currentAds[index], ...ad };
      this.advertisementsSubject.next([...currentAds]);
    }
  }

  deleteAdvertisement(id: number): void {
    const currentAds = this.advertisementsSubject.value;
    this.advertisementsSubject.next(currentAds.filter(ad => ad.id !== id));
  }

  toggleAdvertisementStatus(id: number): void {
    const currentAds = this.advertisementsSubject.value;
    const index = currentAds.findIndex(a => a.id === id);
    if (index !== -1) {
      currentAds[index].isActive = !currentAds[index].isActive;
      this.advertisementsSubject.next([...currentAds]);
    }
  }
}