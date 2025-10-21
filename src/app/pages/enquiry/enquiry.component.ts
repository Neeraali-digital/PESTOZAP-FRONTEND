import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry.component.html'
})
export class EnquiryComponent {
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

  onSubmit() {
    console.log('Enquiry form submitted:', this.formData);
    alert('Thank you for your enquiry! We will contact you within 2 hours with your customized quote.');
    // Reset form
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