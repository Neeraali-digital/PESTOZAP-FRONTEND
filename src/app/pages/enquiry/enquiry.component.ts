import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './enquiry.component.html'
})
export class EnquiryComponent implements OnInit {
  private apiUrl = `${environment.apiUrl}/enquiries/`;

  formData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    area: null as string | null, // Changed to string to support ranges
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
    additionalInfo: '',
    packageName: '',
    quotedPrice: ''
  };

  isSubmitting = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['service_type']) {
        this.formData.serviceType = params['service_type'];
      }
      if (params['package']) {
        this.formData.packageName = params['package'];
        // Append package info to additional info for visibility
        this.formData.additionalInfo = `Selected Package: ${params['package']}\n`;
      }
      if (params['price']) {
        this.formData.quotedPrice = params['price'];
        this.formData.additionalInfo += `Estimated Price: ${params['price']}\n`;
      }
      if (params['property_details']) {
        this.formData.propertyType = params['property_details'];
      }
      if (params['pest_type']) {
        // Try to check the relevant pest box
        const pest = params['pest_type'].toLowerCase();
        if (pest.includes('cockroach')) this.formData.pests.cockroach = true;
        else if (pest.includes('termite')) this.formData.pests.termite = true;
        else if (pest.includes('rodent') || pest.includes('rat')) this.formData.pests.rodent = true;
        else if (pest.includes('bed')) this.formData.pests.bedbug = true;
        else if (pest.includes('mosquito')) this.formData.pests.mosquito = true;
        else if (pest.includes('ant') || pest.includes('general')) this.formData.pests.ant = true;
      }
    });
  }

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
        package_name: this.formData.packageName,
        quoted_price: this.formData.quotedPrice,
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
      this.formData.serviceType);
    // Made propertyType optional as it might be auto-filled or less critical
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
      additionalInfo: '',
      packageName: '',
      quotedPrice: ''
    };
  }
}
