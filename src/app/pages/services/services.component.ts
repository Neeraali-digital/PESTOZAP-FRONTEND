import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">Our Services</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Comprehensive pest control solutions for every need
          </p>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Home Pest Control -->
          <div class="card p-8 animate-fade-in">
            <div class="flex items-center mb-6">
              <span class="material-icons text-4xl text-brand mr-4">home</span>
              <h2 class="text-3xl font-bold text-gray-900">Home Pest Control</h2>
            </div>
            
            <p class="text-gray-600 mb-6 text-lg">
              Protect your family and home with our comprehensive residential pest control services. 
              We handle all common household pests with safe, effective treatments.
            </p>
            
            <div class="space-y-4 mb-6">
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Cockroach Control & Prevention</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Rodent Control (Rats & Mice)</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Termite Treatment & Protection</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Ant & Spider Control</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Mosquito Control</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Bed Bug Treatment</span>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 class="font-semibold text-gray-900 mb-2">What's Included:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Free inspection and assessment</li>
                <li>• Customized treatment plan</li>
                <li>• Safe, family-friendly products</li>
                <li>• Follow-up visits included</li>
                <li>• 30-day satisfaction guarantee</li>
              </ul>
            </div>
            
            <a routerLink="/enquiry" class="btn-primary w-full text-center">Get Home Service Quote</a>
          </div>

          <!-- Commercial Pest Control -->
          <div class="card p-8 animate-fade-in">
            <div class="flex items-center mb-6">
              <span class="material-icons text-4xl text-brand mr-4">business</span>
              <h2 class="text-3xl font-bold text-gray-900">Commercial Pest Control</h2>
            </div>
            
            <p class="text-gray-600 mb-6 text-lg">
              Keep your business running smoothly with our professional commercial pest management solutions. 
              Tailored for offices, restaurants, warehouses, and industrial facilities.
            </p>
            
            <div class="space-y-4 mb-6">
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Restaurant & Food Service</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Office Buildings & Retail</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Warehouses & Storage</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Healthcare Facilities</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Manufacturing Plants</span>
              </div>
              <div class="flex items-center">
                <span class="material-icons text-brand mr-3">check_circle</span>
                <span>Hotels & Hospitality</span>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 class="font-semibold text-gray-900 mb-2">Business Benefits:</h4>
              <ul class="text-sm text-gray-600 space-y-1">
                <li>• Compliance with health regulations</li>
                <li>• Scheduled maintenance programs</li>
                <li>• Minimal business disruption</li>
                <li>• Detailed reporting & documentation</li>
                <li>• 24/7 emergency response</li>
              </ul>
            </div>
            
            <a routerLink="/enquiry" class="btn-primary w-full text-center">Get Commercial Quote</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p class="text-xl text-gray-600">Simple, effective, and reliable</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center animate-fade-in">
            <div class="bg-brand text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
            <h3 class="text-xl font-bold mb-2">Inspection</h3>
            <p class="text-gray-600">Thorough assessment of your property to identify pest issues</p>
          </div>
          
          <div class="text-center animate-fade-in">
            <div class="bg-brand text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
            <h3 class="text-xl font-bold mb-2">Treatment Plan</h3>
            <p class="text-gray-600">Customized solution based on your specific pest problems</p>
          </div>
          
          <div class="text-center animate-fade-in">
            <div class="bg-brand text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
            <h3 class="text-xl font-bold mb-2">Implementation</h3>
            <p class="text-gray-600">Safe and effective treatment using eco-friendly methods</p>
          </div>
          
          <div class="text-center animate-fade-in">
            <div class="bg-brand text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
            <h3 class="text-xl font-bold mb-2">Follow-up</h3>
            <p class="text-gray-600">Monitoring and maintenance to ensure long-term results</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="gradient-bg text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Need Pest Control Services?</h2>
        <p class="text-xl mb-8 text-gray-100">
          Contact us today for a free consultation and customized treatment plan.
        </p>
        <a routerLink="/enquiry" class="btn-primary bg-white text-brand hover:bg-gray-100">
          Get Your Free Quote
        </a>
      </div>
    </section>
  `
})
export class ServicesComponent {}