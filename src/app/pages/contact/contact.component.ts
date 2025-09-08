import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.formData);
      // Handle form submission
      alert('Thank you for your message! We will contact you soon.');
      this.resetForm();
    }
  }

  private isFormValid(): boolean {
    return !!(this.formData.name && this.formData.email && 
             this.formData.phone && this.formData.service);
  }

  private resetForm() {
    this.formData = {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    };
  }
}