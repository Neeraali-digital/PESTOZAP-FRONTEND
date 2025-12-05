import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Job {
  id?: number;
  title: string;
  location: string;
  employment_type: string;
  experience: string;
  description: string;
  requirements: string[];
  status: string;
  created_at?: string;
}

@Component({
  selector: 'app-admin-careers',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="careers-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Careers Management</h1>
          <p>Manage job postings and applications</p>
        </div>
        <button class="btn-primary" (click)="openModal()">
          <i class="fas fa-plus"></i> Add New Job
        </button>
      </div>

      <div class="jobs-grid">
        <div *ngFor="let job of jobs" class="job-card">
          <div class="job-header">
            <h3>{{ job.title }}</h3>
            <span class="status-badge" [class.active]="job.status === 'active'">{{ job.status }}</span>
          </div>
          <div class="job-details">
            <p><i class="fas fa-map-marker-alt"></i> {{ job.location }}</p>
            <p><i class="fas fa-briefcase"></i> {{ job.employment_type }}</p>
            <p><i class="fas fa-clock"></i> {{ job.experience }}</p>
          </div>
          <div class="job-actions">
            <button class="btn-edit" (click)="editJob(job)"><i class="fas fa-edit"></i> Edit</button>
            <button class="btn-delete" (click)="deleteJob(job.id!)"><i class="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>

      <div *ngIf="showModal" class="modal-overlay" (click)="closeModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingJob ? 'Edit Job' : 'Add New Job' }}</h2>
            <button class="close-btn" (click)="closeModal()">×</button>
          </div>
          <form [formGroup]="jobForm" (ngSubmit)="saveJob()">
            <div class="form-grid">
              <div class="form-group">
                <label>Job Title *</label>
                <input type="text" formControlName="title" class="form-control">
              </div>
              <div class="form-group">
                <label>Location *</label>
                <input type="text" formControlName="location" class="form-control">
              </div>
              <div class="form-group">
                <label>Employment Type *</label>
                <select formControlName="employment_type" class="form-control">
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div class="form-group">
                <label>Experience *</label>
                <input type="text" formControlName="experience" class="form-control" placeholder="e.g., 2-5 years">
              </div>
            </div>
            <div class="form-group">
              <label>Description *</label>
              <textarea formControlName="description" class="form-control" rows="4"></textarea>
            </div>
            <div class="form-group">
              <label>Requirements</label>
              <div formArrayName="requirements">
                <div *ngFor="let req of requirements.controls; let i = index" class="requirement-item">
                  <input type="text" [formControlName]="i" class="form-control">
                  <button type="button" class="btn-remove" (click)="removeRequirement(i)">×</button>
                </div>
              </div>
              <button type="button" class="btn-add" (click)="addRequirement()">+ Add Requirement</button>
            </div>
            <div class="form-group">
              <label>Status *</label>
              <select formControlName="status" class="form-control">
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-cancel" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-save" [disabled]="!jobForm.valid">Save Job</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .careers-page{padding:2rem}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;background:white;padding:2rem;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header-content h1{margin:0 0 0.5rem;font-size:1.8rem;font-weight:700}
    .header-content p{margin:0;color:#666}
    .btn-primary{background:linear-gradient(135deg,#4CAF50,#45a049);color:white;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.5rem}
    .jobs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:1.5rem}
    .job-card{background:white;border-radius:16px;padding:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.08);transition:transform 0.3s}
    .job-card:hover{transform:translateY(-4px)}
    .job-header{display:flex;justify-content:space-between;align-items:start;margin-bottom:1rem}
    .job-header h3{margin:0;font-size:1.2rem;font-weight:600}
    .status-badge{padding:0.25rem 0.75rem;border-radius:20px;font-size:0.8rem;background:#e0e0e0;color:#666}
    .status-badge.active{background:#e8f5e8;color:#4CAF50}
    .job-details{margin-bottom:1rem}
    .job-details p{margin:0.5rem 0;color:#666;display:flex;align-items:center;gap:0.5rem}
    .job-actions{display:flex;gap:0.5rem}
    .btn-edit,.btn-delete{flex:1;padding:0.5rem;border:none;border-radius:8px;cursor:pointer;font-weight:500;display:flex;align-items:center;justify-content:center;gap:0.5rem}
    .btn-edit{background:#e3f2fd;color:#2196F3}
    .btn-delete{background:#ffebee;color:#f44336}
    .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1000}
    .modal-content{background:white;border-radius:16px;width:90%;max-width:600px;max-height:90vh;overflow-y:auto;padding:2rem}
    .modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem}
    .modal-header h2{margin:0;font-size:1.5rem}
    .close-btn{background:none;border:none;font-size:2rem;cursor:pointer;color:#666}
    .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem}
    .form-group{margin-bottom:1rem}
    .form-group label{display:block;margin-bottom:0.5rem;font-weight:600;color:#333}
    .form-control{width:100%;padding:0.75rem;border:1px solid #e0e0e0;border-radius:8px;font-size:1rem}
    .requirement-item{display:flex;gap:0.5rem;margin-bottom:0.5rem}
    .btn-remove{background:#ffebee;color:#f44336;border:none;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:1.2rem}
    .btn-add{background:#e8f5e8;color:#4CAF50;border:none;padding:0.5rem 1rem;border-radius:8px;cursor:pointer;font-weight:500;margin-top:0.5rem}
    .modal-actions{display:flex;gap:1rem;margin-top:1.5rem}
    .btn-cancel,.btn-save{flex:1;padding:0.75rem;border:none;border-radius:8px;font-weight:600;cursor:pointer}
    .btn-cancel{background:#f5f5f5;color:#666}
    .btn-save{background:#4CAF50;color:white}
    .btn-save:disabled{background:#ccc;cursor:not-allowed}
  `]
})
export class AdminCareersComponent implements OnInit {
  private apiUrl = 'http://localhost:8000/api/v1/careers/jobs/';
  
  jobs: Job[] = [];
  showModal = false;
  editingJob: Job | null = null;
  jobForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
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
  }

  get requirements() {
    return this.jobForm.get('requirements') as FormArray;
  }

  loadJobs() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        this.jobs = response.results || response;
      },
      error: (error) => console.error('Error loading jobs:', error)
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
      const jobData = {
        ...this.jobForm.value,
        requirements: this.requirements.value.filter((r: string) => r.trim())
      };

      const request = this.editingJob
        ? this.http.put(`${this.apiUrl}${this.editingJob.id}/`, jobData)
        : this.http.post(this.apiUrl, jobData);

      request.subscribe({
        next: () => {
          this.loadJobs();
          this.closeModal();
        },
        error: (error) => console.error('Error saving job:', error)
      });
    }
  }

  deleteJob(id: number) {
    if (confirm('Are you sure you want to delete this job?')) {
      this.http.delete(`${this.apiUrl}${id}/`).subscribe({
        next: () => this.loadJobs(),
        error: (error) => console.error('Error deleting job:', error)
      });
    }
  }
}
