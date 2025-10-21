import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdvertisementService, Advertisement } from '../../services/advertisement.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  slideInterval: any;
  
  selectedServiceType = 'pest-control';
  selectedPestType = '';
  selectedPropertyType = '';
  selectedServicePackage = '';

  advertisements: Advertisement[] = [];

  constructor(
    private advertisementService: AdvertisementService,
    private router: Router
  ) {}

  ngOnInit() {
    this.advertisementService.getActiveAdvertisements().subscribe(ads => {
      this.advertisements = ads;
      if (ads.length > 0) {
        this.startSlideShow();
      }
    });
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.advertisements.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  selectServiceType(type: string) {
    this.selectedServiceType = type;
  }

  navigateToBirdNetting() {
    console.log('hai');
    
    this.router.navigate(['bird-netting']);
  }
}