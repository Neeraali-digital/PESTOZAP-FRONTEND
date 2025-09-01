import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Hero Section -->
    <section class="gradient-bg text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Get Your Free Quote</h1>
          <p class="text-xl text-gray-100 max-w-3xl mx-auto animate-slide-up">
            Tell us about your pest control needs and get a customized solution
          </p>
        </div>
      </div>
    </section>

    <!-- Enquiry Form Section -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card p-8 md:p-12 animate-fade-in">
          <div class="text-center mb-8">
            <span class="material-icons text-5xl text-brand mb-4">request_quote</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Request Your Free Quote</h2>
            <p class="text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>
          
          <form [formGroup]="enquiryForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input 
                  type="text" 
                  formControlName="name"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                  placeholder="Enter your full name">
                <div *ngIf="enquiryForm.get('name')?.invalid && enquiryForm.get('name')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Name is required
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  formControlName="phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                  placeholder="Enter your phone number">
                <div *ngIf="enquiryForm.get('phone')?.invalid && enquiryForm.get('phone')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Phone number is required
                </div>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input 
                type="email" 
                formControlName="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                placeholder="Enter your email address">
              <div *ngIf="enquiryForm.get('email')?.invalid && enquiryForm.get('email')?.touched" 
                   class="text-red-500 text-sm mt-1">
                Please enter a valid email address
              </div>
            </div>
            
            <!-- Service Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                <select 
                  formControlName="serviceType"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors">
                  <option value="">Select service type</option>
                  <option value="home">Home Pest Control</option>
                  <option value="commercial">Commercial Pest Control</option>
                  <option value="emergency">Emergency Service</option>
                  <option value="consultation">Consultation Only</option>
                </select>
                <div *ngIf="enquiryForm.get('serviceType')?.invalid && enquiryForm.get('serviceType')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Please select a service type
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select 
                  formControlName="propertyType"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors">
                  <option value="">Select property type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="office">Office</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="retail">Retail Store</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <!-- Pest Information -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Pest Problem (Check all that apply)</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" formControlName="cockroaches" class="text-brand focus:ring-brand">
                  <span class="text-sm">Cockroaches</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" formControlName="rodents" class="text-brand focus:ring-brand">
                  <span class="text-sm">Rodents</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" formControlName="termites" class="text-brand focus:ring-brand">
                  <span class="text-sm">Termites</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" formControlName="ants" class="text-brand focus:ring-brand">
                  <span class="text-sm">Ants</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" formControlName="mosquitoes" class="text-brand focus:ring-brand">
                  <span class="text-sm">Mosquitoes</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" formControlName="bedbugs" class="text-brand focus:ring-brand">
                  <span class="text-sm">Bed Bugs</span>
                </label>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Property Address</label>
              <textarea 
                formControlName="address"
                rows="2"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors resize-none"
                placeholder="Enter your property address"></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
              <textarea 
                formControlName="message"
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors resize-none"
                placeholder="Tell us more about your pest problem, preferred timing, or any specific concerns..."></textarea>
            </div>
            
            <!-- Preferred Contact -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Contact Method</label>
              <div class="flex space-x-6">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" formControlName="contactMethod" value="phone" class="text-brand focus:ring-brand">
                  <span class="text-sm">Phone Call</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" formControlName="contactMethod" value="email" class="text-brand focus:ring-brand">
                  <span class="text-sm">Email</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" formControlName="contactMethod" value="text" class="text-brand focus:ring-brand">
                  <span class="text-sm">Text Message</span>
                </label>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-start space-x-2">
                <span class="material-icons text-brand mt-1">info</span>
                <div class="text-sm text-gray-600">
                  <p class="font-medium mb-1">What happens next?</p>
                  <ul class="space-y-1">
                    <li>• We'll review your enquiry within 24 hours</li>
                    <li>• Our expert will contact you to discuss your needs</li>
                    <li>• We'll schedule a free inspection at your convenience</li>
                    <li>• You'll receive a detailed quote with no obligations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <button 
              type="submit" 
              [disabled]="enquiryForm.invalid"
              class="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="flex items-center justify-center space-x-2">
                <span class="material-icons">send</span>
                <span>Submit Enquiry</span>
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Need Immediate Help?</h2>
          <p class="text-gray-600">Contact us directly for urgent pest control needs</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-2xl text-brand">phone</span>
            </div>
            <h3 class="font-bold mb-2">Call Us</h3>
            <p class="text-gray-600">+91-9851495495</p>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-2xl text-brand">email</span>
            </div>
            <h3 class="font-bold mb-2">Email Us</h3>
            <p class="text-gray-600">solutions&#64;pestozap.com</p>
          </div>
          
          <div class="text-center">
            <div class="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-2xl text-brand">schedule</span>
            </div>
            <h3 class="font-bold mb-2">Emergency</h3>
            <p class="text-gray-600">24/7 Available</p>
          </div>
        </div>
      </div>
    </section>
  `
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
      // Handle form submission here
      alert('Thank you for your enquiry! We will contact you within 24 hours with your free quote.');
      this.enquiryForm.reset();
      this.enquiryForm.patchValue({ contactMethod: 'phone' });
    }
  }
}