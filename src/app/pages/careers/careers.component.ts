import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './careers.component.html'
})
export class CareersComponent {
  applicationForm: FormGroup;
  showModal = false;
  selectedPosition = '';

  openPositions = [
    {
      title: 'Pest Control Technician',
      location: 'Multiple Locations',
      type: 'Full-time',
      experience: '1-3 years',
      description: 'Join our team as a certified pest control technician. Provide excellent service to residential and commercial clients.',
      requirements: [
        'High school diploma or equivalent',
        'Valid driver\'s license',
        'Physical ability to lift 50+ lbs',
        'Customer service experience preferred',
        'Willingness to work flexible hours'
      ]
    },
    {
      title: 'Senior Pest Control Specialist',
      location: 'City Center',
      type: 'Full-time',
      experience: '3-5 years',
      description: 'Lead complex pest control projects and mentor junior technicians. Handle commercial accounts and specialized treatments.',
      requirements: [
        'Pest control certification required',
        '3+ years field experience',
        'Commercial pest control experience',
        'Leadership and training abilities',
        'Knowledge of IPM practices'
      ]
    },
    {
      title: 'Customer Service Representative',
      location: 'Office',
      type: 'Full-time',
      experience: '1-2 years',
      description: 'Handle customer inquiries, schedule appointments, and provide excellent customer support for our pest control services.',
      requirements: [
        'Excellent communication skills',
        'Computer proficiency',
        'Customer service experience',
        'Problem-solving abilities',
        'Professional phone manner'
      ]
    },
    {
      title: 'Sales Representative',
      location: 'Field/Office',
      type: 'Full-time',
      experience: '2-4 years',
      description: 'Generate new business through prospecting, lead follow-up, and relationship building with residential and commercial clients.',
      requirements: [
        'Sales experience preferred',
        'Strong communication skills',
        'Self-motivated and goal-oriented',
        'Valid driver\'s license',
        'CRM software experience a plus'
      ]
    }
  ];

  benefits = [
    { icon: 'health_and_safety', title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
    { icon: 'savings', title: 'Competitive Pay', description: 'Above-market wages with performance bonuses' },
    { icon: 'school', title: 'Training & Development', description: 'Ongoing education and certification programs' },
    { icon: 'schedule', title: 'Flexible Schedule', description: 'Work-life balance with flexible scheduling options' },
    { icon: 'card_giftcard', title: 'Paid Time Off', description: 'Generous vacation and sick leave policies' },
    { icon: 'trending_up', title: 'Career Growth', description: 'Clear advancement paths and promotion opportunities' }
  ];

  constructor(private fb: FormBuilder) {
    this.applicationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      position: ['', Validators.required],
      experience: ['', Validators.required],
      resume: [''],
      coverLetter: ['']
    });
  }

  scrollToPositions(event: Event) {
    event.preventDefault();
    document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
  }

  openApplicationModal(position: string) {
    this.selectedPosition = position;
    this.applicationForm.patchValue({ position });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.applicationForm.reset();
  }

  onSubmit() {
    if (this.applicationForm.valid) {
      console.log('Application submitted:', this.applicationForm.value);
      this.closeModal();
      // Handle form submission
    }
  }
}