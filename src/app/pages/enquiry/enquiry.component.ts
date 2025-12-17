import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './enquiry.component.html'
})
export class EnquiryComponent {
  private apiUrl = 'http://localhost:8000/api/v1/enquiries/';

  formData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    area: null,
    buildingAge: '',
    pests: {
      cockroach: false,
      termite: false,
      rodent: false,
      bedbug: false,
      mosquito: false,
      ant: false
    },
    severity: '',
    urgency: '',
    serviceType: '',
    preferredTime: '',
    additionalInfo: ''
  };

  isSubmitting = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.isFormValid() && !this.isSubmitting) {
      this.isSubmitting = true;

      const selectedPests = Object.keys(this.formData.pests).filter(key => this.formData.pests[key as keyof typeof this.formData.pests]);

      const enquiryData = {
        type: 'enquiry',
        subject: `Service Enquiry from ${this.formData.fullName}`,
        customer_name: this.formData.fullName,
        email: this.formData.email,
        phone: this.formData.phone,
        service_type: this.formData.serviceType,
        message: this.formData.additionalInfo || 'No additional information provided',
        address: this.formData.address,
        property_type: this.formData.propertyType,
        area: this.formData.area,
        building_age: this.formData.buildingAge,
        pests: selectedPests,
        severity: this.formData.severity,
        urgency: this.formData.urgency,
        preferred_time: this.formData.preferredTime,
        additional_info: this.formData.additionalInfo,
        status: 'new',
        priority: 'medium'
      };

      this.http.post(this.apiUrl, enquiryData).subscribe({
        next: () => {
          alert('Thank you for your enquiry! We will contact you within 2 hours with your customized quote.');
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

  isFormValid(): boolean {
    return !!(this.formData.fullName && this.formData.email &&
             this.formData.phone && this.formData.address &&
             this.formData.propertyType && this.formData.serviceType &&
             this.formData.severity && this.formData.urgency);
  }

  private resetForm() {
    this.formData = {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      propertyType: '',
      area: null,
      buildingAge: '',
      pests: {
        cockroach: false,
        termite: false,
        rodent: false,
        bedbug: false,
        mosquito: false,
        ant: false
      },
      severity: '',
      urgency: '',
      serviceType: '',
      preferredTime: '',
      additionalInfo: ''
    };
  }
}
