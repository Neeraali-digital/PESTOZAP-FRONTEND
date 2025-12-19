import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Job, JobApplication } from '../../models/admin.models';
import { AdminApiService } from '../../services/admin-api.service';

@Component({
  selector: 'app-admin-careers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [AdminApiService],
  template: `
    <div class="p-8 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Careers Management</h1>
          <p class="text-gray-500 mt-1">Manage job postings and view applications</p>
        </div>
        <button *ngIf="activeTab === 'jobs'" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm" (click)="openModal()">
          <i class="fas fa-plus"></i> Add New Job
        </button>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-1.5 flex gap-2 mb-8 w-full md:w-fit">
        <button
          class="flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
          [class.bg-blue-600]="activeTab === 'jobs'"
          [class.text-white]="activeTab === 'jobs'"
          [class.text-gray-600]="activeTab !== 'jobs'"
          [class.hover:bg-gray-50]="activeTab !== 'jobs'"
          (click)="switchTab('jobs')">
          <i class="fas fa-briefcase"></i> Jobs
        </button>
        <button
          class="flex-1 md:flex-none px-6 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2"
          [class.bg-blue-600]="activeTab === 'applications'"
          [class.text-white]="activeTab === 'applications'"
          [class.text-gray-600]="activeTab !== 'applications'"
          [class.hover:bg-gray-50]="activeTab !== 'applications'"
          (click)="switchTab('applications')">
          <i class="fas fa-file-alt"></i> Applications
        </button>
      </div>

      <!-- Jobs Tab -->
      <div *ngIf="activeTab === 'jobs'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let job of jobs" class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 group">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ job.title }}</h3>
            <span class="px-3 py-1 rounded-full text-xs font-medium" 
              [class.bg-green-100]="job.status === 'active'"
              [class.text-green-700]="job.status === 'active'"
              [class.bg-gray-100]="job.status !== 'active'"
              [class.text-gray-700]="job.status !== 'active'">
              {{ job.status | titlecase }}
            </span>
          </div>
          <div class="space-y-3 mb-6">
            <p class="text-gray-600 flex items-center gap-3 text-sm"><i class="fas fa-map-marker-alt text-gray-400 w-4"></i> {{ job.location }}</p>
            <p class="text-gray-600 flex items-center gap-3 text-sm"><i class="fas fa-briefcase text-gray-400 w-4"></i> {{ job.employment_type | titlecase }}</p>
            <p class="text-gray-600 flex items-center gap-3 text-sm"><i class="fas fa-clock text-gray-400 w-4"></i> {{ job.experience }}</p>
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-50">
            <button class="flex-1 py-2 px-4 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm transition-colors flex items-center justify-center gap-2" (click)="editJob(job)">
              <i class="fas fa-edit"></i> Edit
            </button>
            <button class="flex-1 py-2 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm transition-colors flex items-center justify-center gap-2" (click)="deleteJob(job.id!)">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Applications Tab -->
      <div *ngIf="activeTab === 'applications'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let application of applications" class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-bold text-gray-900">{{ application.full_name }}</h3>
              <p class="text-blue-600 text-sm font-medium mt-1">{{ application.job_details?.title || 'Unknown Position' }}</p>
            </div>
            <span class="text-xs text-gray-400">{{ application.created_at | date }}</span>
          </div>
          <div class="space-y-3 mb-6">
            <p class="text-gray-600 flex items-center gap-3 text-sm"><i class="fas fa-envelope text-gray-400 w-4"></i> {{ application.email }}</p>
            <p class="text-gray-600 flex items-center gap-3 text-sm"><i class="fas fa-phone text-gray-400 w-4"></i> {{ application.phone }}</p>
            <p class="text-gray-600 flex items-center gap-3 text-sm"><i class="fas fa-clock text-gray-400 w-4"></i> {{ application.experience }}</p>
          </div>
          <div class="flex gap-3 pt-4 border-t border-gray-50">
            <button class="flex-1 py-2 px-4 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-sm transition-colors flex items-center justify-center gap-2" (click)="viewApplication(application)">
              <i class="fas fa-eye"></i> Details
            </button>
            <button *ngIf="application.resume" class="flex-1 py-2 px-4 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 font-medium text-sm transition-colors flex items-center justify-center gap-2" (click)="downloadResume(application.resume)">
              <i class="fas fa-download"></i> Resume
            </button>
          </div>
        </div>
      </div>

      <!-- Job Modal -->
      <div *ngIf="showModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
        <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all" (click)="$event.stopPropagation()">
          <div class="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
            <h2 class="text-2xl font-bold text-gray-900">{{ editingJob ? 'Edit Job' : 'Add New Job' }}</h2>
            <button class="text-gray-400 hover:text-gray-600 transition-colors" (click)="closeModal()">
              <span class="material-icons text-2xl">close</span>
            </button>
          </div>
          
          <form [formGroup]="jobForm" (ngSubmit)="saveJob()" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Job Title *</label>
                <input type="text" formControlName="title" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Location *</label>
                <input type="text" formControlName="location" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Employment Type *</label>
                <select formControlName="employment_type" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white">
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-gray-700">Experience *</label>
                <input type="text" formControlName="experience" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all" placeholder="e.g., 2-5 years">
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Description *</label>
              <textarea formControlName="description" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all min-h-[120px]"></textarea>
            </div>

            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-semibold text-gray-700">Requirements</label>
                <button type="button" class="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1" (click)="addRequirement()">
                  <span class="material-icons text-sm">add</span> Add Requirement
                </button>
              </div>
              <div formArrayName="requirements" class="space-y-3">
                <div *ngFor="let req of requirements.controls; let i = index" class="flex gap-2">
                  <input type="text" [formControlName]="i" class="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all">
                  <button type="button" class="w-10 h-10 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-gray-200 hover:border-red-100" (click)="removeRequirement(i)">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-semibold text-gray-700">Status *</label>
              <select formControlName="status" class="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white">
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div class="flex gap-4 pt-4 border-t border-gray-100 mt-6">
              <button type="button" class="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors" (click)="closeModal()">Cancel</button>
              <button type="submit" 
                class="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" 
                [disabled]="!jobForm.valid || isLoading">
                <span *ngIf="isLoading" class="material-icons text-lg animate-spin">refresh</span>
                <span>{{ isLoading ? 'Saving...' : 'Save Job' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Application Details Modal -->
      <div *ngIf="selectedApplication" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
        <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all" (click)="$event.stopPropagation()">
          <div class="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
            <h2 class="text-2xl font-bold text-gray-900">Application Details</h2>
            <button class="text-gray-400 hover:text-gray-600 transition-colors" (click)="closeApplicationModal()">
              <span class="material-icons text-2xl">close</span>
            </button>
          </div>
          
          <div class="p-8 space-y-8">
            <div class="space-y-4">
              <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><i class="fas fa-user text-sm"></i></span>
                Personal Information
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div><span class="text-sm text-gray-500 block">Full Name</span> <span class="font-medium">{{ selectedApplication.full_name }}</span></div>
                <div><span class="text-sm text-gray-500 block">Email</span> <span class="font-medium">{{ selectedApplication.email }}</span></div>
                <div><span class="text-sm text-gray-500 block">Phone</span> <span class="font-medium">{{ selectedApplication.phone }}</span></div>
                <div><span class="text-sm text-gray-500 block">Experience</span> <span class="font-medium">{{ selectedApplication.experience }}</span></div>
              </div>
            </div>

            <div class="space-y-4">
              <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><i class="fas fa-briefcase text-sm"></i></span>
                Job Applied For
              </h3>
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><span class="text-sm text-gray-500 block">Position</span> <span class="font-medium text-blue-600">{{ selectedApplication.job_details?.title }}</span></div>
                  <div><span class="text-sm text-gray-500 block">Location</span> <span class="font-medium">{{ selectedApplication.job_details?.location }}</span></div>
                  <div><span class="text-sm text-gray-500 block">Type</span> <span class="font-medium">{{ selectedApplication.job_details?.employment_type | titlecase }}</span></div>
                </div>
              </div>
            </div>

            <div class="space-y-4" *ngIf="selectedApplication.cover_letter">
              <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><i class="fas fa-align-left text-sm"></i></span>
                Cover Letter
              </h3>
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-100 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {{ selectedApplication.cover_letter }}
              </div>
            </div>

            <div class="pt-6 border-t border-gray-100" *ngIf="selectedApplication.resume">
              <button class="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2" (click)="downloadResume(selectedApplication.resume)">
                <i class="fas fa-download"></i> Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class AdminCareersComponent implements OnInit {
  activeTab = 'jobs';
  jobs: Job[] = [];
  applications: JobApplication[] = [];
  showModal = false;
  selectedApplication: JobApplication | null = null;
  editingJob: Job | null = null;
  jobForm: FormGroup;
  isLoading = false;

  constructor(private adminApi: AdminApiService, private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      employment_type: ['full-time', Validators.required],
      experience: ['', Validators.required],
      description: ['', Validators.required],
      requirements: this.fb.array([]),
      status: ['active', Validators.required]
    });
  }

  ngOnInit() {
    this.loadJobs();
    this.loadApplications();
  }

  get requirements() {
    return this.jobForm.get('requirements') as FormArray;
  }

  switchTab(tab: string) {
    this.activeTab = tab;
  }

  loadJobs() {
    this.adminApi.getJobs().subscribe({
      next: (response) => {
        this.jobs = response.results || response.results || [];
      },
      error: (error) => console.error('Error loading jobs:', error)
    });
  }

  loadApplications() {
    this.adminApi.getJobApplications().subscribe({
      next: (response) => {
        this.applications = response.results || response.results || [];
      },
      error: (error) => console.error('Error loading applications:', error)
    });
  }

  openModal() {
    this.showModal = true;
    this.editingJob = null;
    this.jobForm.reset({ employment_type: 'full-time', status: 'active' });
    this.requirements.clear();
  }

  closeModal() {
    this.showModal = false;
    this.editingJob = null;
  }

  closeApplicationModal() {
    this.selectedApplication = null;
  }

  addRequirement() {
    this.requirements.push(this.fb.control(''));
  }

  removeRequirement(index: number) {
    this.requirements.removeAt(index);
  }

  editJob(job: Job) {
    this.editingJob = job;
    this.showModal = true;
    this.requirements.clear();
    job.requirements.forEach(req => this.requirements.push(this.fb.control(req)));
    this.jobForm.patchValue(job);
  }

  saveJob() {
    if (this.jobForm.valid) {
      this.isLoading = true;
      const jobData = {
        ...this.jobForm.value,
        requirements: this.requirements.value.filter((r: string) => r.trim())
      };

      const request = this.editingJob
        ? this.adminApi.updateJob(this.editingJob.id, jobData)
        : this.adminApi.createJob(jobData);

      request.subscribe({
        next: () => {
          this.isLoading = false;
          this.loadJobs();
          this.closeModal();
          alert(this.editingJob ? 'Job updated successfully!' : 'Job created successfully!');
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error saving job:', error);
          alert('Failed to save job. Please try again.');
        }
      });
    }
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.adminApi.deleteJob(id).subscribe({
        next: () => this.loadJobs(),
        error: (error) => console.error('Error deleting job:', error)
      });
    }
  }

  viewApplication(application: JobApplication) {
    this.selectedApplication = application;
  }

  downloadResume(resumeUrl: string) {
    window.open(resumeUrl, '_blank');
  }
}
