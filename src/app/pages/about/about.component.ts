import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Hero Section -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">About Pestozap</h1>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto animate-slide-up">
            Your trusted partner in professional pest control solutions
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="card p-8 md:p-12 animate-fade-in">
          <div class="flex items-center justify-center mb-8">
            <span class="material-icons text-6xl text-brand">pest_control</span>
          </div>
          
          <div class="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p class="text-xl mb-6">
              At Pestozap, we are committed to providing top-notch pest control solutions for homes and businesses. 
              With a team of experienced professionals and industry-approved methods, we ensure effective and 
              eco-friendly pest management.
            </p>
            
            <p class="mb-6">
              Our services cover a wide range of pests, including cockroaches, rodents, termites, mosquitoes, and more. 
              We prioritize safety, hygiene, and customer satisfaction, offering customized treatment plans that deliver 
              long-lasting results.
            </p>
            
            <p class="mb-6">
              Whether it's residential, commercial, or industrial pest control, Pestozap is your trusted partner for 
              a pest-free environment. Choose Pestozap – Your Shield Against Pests!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p class="text-xl text-gray-600">What drives us to excellence</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center animate-fade-in">
            <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-3xl text-brand">security</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Safety First</h3>
            <p class="text-gray-600">Prioritizing the safety of your family and environment</p>
          </div>
          
          <div class="text-center animate-fade-in">
            <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-3xl text-brand">eco</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Eco-Friendly</h3>
            <p class="text-gray-600">Using environmentally responsible methods</p>
          </div>
          
          <div class="text-center animate-fade-in">
            <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-3xl text-brand">star</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Excellence</h3>
            <p class="text-gray-600">Delivering superior results with every service</p>
          </div>
          
          <div class="text-center animate-fade-in">
            <div class="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span class="material-icons text-3xl text-brand">handshake</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Trust</h3>
            <p class="text-gray-600">Building lasting relationships with our clients</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="gradient-bg text-white py-16">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Work With Us?</h2>
        <p class="text-xl mb-8 text-gray-100">
          Experience the Pestozap difference with our professional pest control services.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a routerLink="/enquiry" class="btn-primary bg-white text-brand hover:bg-gray-100">
            Get Free Quote
          </a>
          <a routerLink="/contact" class="btn-secondary border-white text-white hover:bg-white hover:text-brand">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {}