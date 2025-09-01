import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Hero Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">Contact Us</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Get in touch with our pest control experts
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Contact Form -->
          <div class="card p-8 animate-fade-in">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input 
                    type="text" 
                    formControlName="firstName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                    placeholder="Enter your first name">
                  <div *ngIf="contactForm.get('firstName')?.invalid && contactForm.get('firstName')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    First name is required
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input 
                    type="text" 
                    formControlName="lastName"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                    placeholder="Enter your last name">
                  <div *ngIf="contactForm.get('lastName')?.invalid && contactForm.get('lastName')?.touched" 
                       class="text-red-500 text-sm mt-1">
                    Last name is required
                  </div>
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input 
                  type="email" 
                  formControlName="email"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                  placeholder="Enter your email">
                <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Please enter a valid email address
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input 
                  type="tel" 
                  formControlName="phone"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                  placeholder="Enter your phone number">
                <div *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Phone number is required
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input 
                  type="text" 
                  formControlName="subject"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors"
                  placeholder="Enter message subject">
                <div *ngIf="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Subject is required
                </div>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea 
                  formControlName="message"
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your pest control needs..."></textarea>
                <div *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched" 
                     class="text-red-500 text-sm mt-1">
                  Message is required
                </div>
              </div>
              
              <button 
                type="submit" 
                [disabled]="contactForm.invalid"
                class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8 animate-slide-up">
            <div class="card p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <span class="material-icons text-brand text-2xl mt-1">location_on</span>
                  <div>
                    <h3 class="font-semibold text-gray-900">Address</h3>
                    <p class="text-gray-600">123 Pest Control Street<br>City, State 12345</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <span class="material-icons text-brand text-2xl mt-1">phone</span>
                  <div>
                    <h3 class="font-semibold text-gray-900">Phone</h3>
                    <p class="text-gray-600">+91-9851495495</p>
                    <p class="text-sm text-gray-500">24/7 Emergency Line</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <span class="material-icons text-brand text-2xl mt-1">email</span>
                  <div>
                    <h3 class="font-semibold text-gray-900">Email</h3>
                    <p class="text-gray-600">solutions&#64;pestozap.com</p>
                    <p class="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-4">
                  <span class="material-icons text-brand text-2xl mt-1">schedule</span>
                  <div>
                    <h3 class="font-semibold text-gray-900">Business Hours</h3>
                    <p class="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br>
                      Saturday: 9:00 AM - 4:00 PM<br>
                      Sunday: Emergency calls only
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card p-8 gradient-bg text-white">
              <h3 class="text-xl font-bold mb-4">Emergency Service</h3>
              <p class="mb-4">
                Need immediate pest control assistance? We offer 24/7 emergency services for urgent situations.
              </p>
              <div class="flex items-center space-x-2">
                <span class="material-icons">phone</span>
                <span class="font-semibold">Emergency: +91-9851495495</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Contact form submitted:', this.contactForm.value);
      // Handle form submission here
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm.reset();
    }
  }
}