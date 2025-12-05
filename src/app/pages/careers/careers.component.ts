import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Job {
  id: number;
  title: string;
  location: string;
  employment_type: string;
  experience: string;
  description: string;
  requirements: string[];
  status: string;
}

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './careers.component.html'
})
export class CareersComponent implements OnInit, OnDestroy {
  private apiUrl = 'http://localhost:8000/api/v1/careers/jobs/';
  
  applicationForm: FormGroup;
  showModal = false;
  selectedPosition = '';
  scrollY = 0;
  openPositions: any[] = [];

  benefits = [
    { icon: 'health_and_safety', title: 'Health Insurance', description: 'Comprehensive medical, dental, and vision coverage' },
    { icon: 'savings', title: 'Competitive Pay', description: 'Above-market wages with performance bonuses' },
    { icon: 'school', title: 'Training & Development', description: 'Ongoing education and certification programs' },
    { icon: 'schedule', title: 'Flexible Schedule', description: 'Work-life balance with flexible scheduling options' },
    { icon: 'card_giftcard', title: 'Paid Time Off', description: 'Generous vacation and sick leave policies' },
    { icon: 'trending_up', title: 'Career Growth', description: 'Clear advancement paths and promotion opportunities' }
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

  ngOnInit() {
    this.updateScrollY();
    this.loadJobs();
  }

  loadJobs() {
    this.http.get<any>(`${this.apiUrl}active/`).subscribe({
      next: (jobs) => {
        this.openPositions = jobs.map((job: Job) => ({
          title: job.title,
          location: job.location,
          type: job.employment_type,
          experience: job.experience,
          description: job.description,
          requirements: job.requirements
        }));
      },
      error: (error) => console.error('Error loading jobs:', error)
    });
  }

  ngOnDestroy() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.updateScrollY();
  }

  private updateScrollY() {
    this.scrollY = window.pageYOffset;
  }

  scrollToPositions(event: Event) {
    event.preventDefault();
    document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToApplication(position?: string) {
    if (position) {
      this.selectedPosition = position;
      this.applicationForm.patchValue({ position });
    }
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
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