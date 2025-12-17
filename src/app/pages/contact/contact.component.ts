import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  private apiUrl = 'http://localhost:8000/api/v1/enquiries/';
  
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  isSubmitting = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isFormValid() && !this.isSubmitting) {
      this.isSubmitting = true;
      
      const enquiryData = {
        type: 'contact',
        customer_name: this.formData.name,
        email: this.formData.email,
        phone: this.formData.phone,
        service_type: this.formData.service,
        message: this.formData.message || 'No message provided',
        subject: `Contact Message from ${this.formData.name}`,
        status: 'new',
        priority: 'medium'
      };

      this.http.post(this.apiUrl, enquiryData).subscribe({
        next: () => {
          alert('Thank you for your message! We will contact you soon.');
          this.resetForm();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error submitting enquiry:', error);
          alert('Failed to submit enquiry. Please try again.');
          this.isSubmitting = false;
        }
      });
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