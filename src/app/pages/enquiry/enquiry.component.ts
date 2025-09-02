import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './enquiry.component.html'
})
export class EnquiryComponent {
  enquiryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.enquiryForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceType: ['', Validators.required],
      propertyType: [''],
      cockroaches: [false],
      rodents: [false],
      termites: [false],
      ants: [false],
      mosquitoes: [false],
      bedbugs: [false],
      address: [''],
      message: [''],
      contactMethod: ['phone']
    });
  }

  onSubmit() {
    if (this.enquiryForm.valid) {
      console.log('Enquiry form submitted:', this.enquiryForm.value);
      alert('Thank you for your enquiry! We will contact you within 24 hours with your free quote.');
      this.enquiryForm.reset();
      this.enquiryForm.patchValue({ contactMethod: 'phone' });
    }
  }
}