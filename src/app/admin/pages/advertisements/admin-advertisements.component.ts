import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdvertisementService, Advertisement } from '../../../services/advertisement.service';

@Component({
  selector: 'app-admin-advertisements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-advertisements.component.html',
  styleUrls: ['./admin-advertisements.component.css']
})
export class AdminAdvertisementsComponent implements OnInit {
  advertisements: Advertisement[] = [];
  showAddForm = false;
  editingAd: Advertisement | null = null;
  
  newAd: Partial<Advertisement> = {
    title: '',
    description: '',
    imageUrl: '',
    isActive: true
  };

  get currentTitle(): string {
    return this.editingAd ? this.editingAd.title : this.newAd.title || '';
  }

  set currentTitle(value: string) {
    if (this.editingAd) {
      this.editingAd.title = value;
    } else {
      this.newAd.title = value;
    }
  }

  get currentDescription(): string {
    return this.editingAd ? this.editingAd.description : this.newAd.description || '';
  }

  set currentDescription(value: string) {
    if (this.editingAd) {
      this.editingAd.description = value;
    } else {
      this.newAd.description = value;
    }
  }

  get currentActive(): boolean {
    return this.editingAd ? this.editingAd.isActive : this.newAd.isActive || true;
  }

  set currentActive(value: boolean) {
    if (this.editingAd) {
      this.editingAd.isActive = value;
    } else {
      this.newAd.isActive = value;
    }
  }

  constructor(private advertisementService: AdvertisementService) {}

  ngOnInit() {
    this.loadAdvertisements();
  }

  loadAdvertisements() {
    this.advertisementService.getAdvertisements().subscribe((ads: Advertisement[]) => {
      this.advertisements = ads;
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.newAd = {
      title: '',
      description: '',
      imageUrl: '',
      isActive: true
    };
    this.editingAd = null;
  }

  saveAdvertisement() {
    if (this.editingAd) {
      this.advertisementService.updateAdvertisement(this.editingAd.id, this.editingAd);
    } else {
      this.advertisementService.addAdvertisement({
        title: this.newAd.title!,
        description: this.newAd.description!,
        imageUrl: this.newAd.imageUrl!,
        isActive: this.newAd.isActive!
      });
    }
    
    this.toggleAddForm();
  }

  editAdvertisement(ad: Advertisement) {
    this.editingAd = { ...ad };
    this.newAd = { ...ad };
    this.showAddForm = true;
  }

  deleteAdvertisement(id: number) {
    if (confirm('Are you sure you want to delete this advertisement?')) {
      this.advertisementService.deleteAdvertisement(id);
    }
  }

  toggleStatus(ad: Advertisement) {
    this.advertisementService.toggleAdvertisementStatus(ad.id);
  }

  getCurrentImageUrl(): string {
    return this.editingAd?.imageUrl || this.newAd.imageUrl || '';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.editingAd) {
          this.editingAd.imageUrl = e.target.result;
        } else {
          this.newAd.imageUrl = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }
}