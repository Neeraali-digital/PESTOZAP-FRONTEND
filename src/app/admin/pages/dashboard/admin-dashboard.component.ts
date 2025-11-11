import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AdminApiService } from '../../services/admin-api.service';
import { DashboardStats } from '../../models/admin.models';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('revenueChart') revenueChart!: ElementRef;
  @ViewChild('servicesChart') servicesChart!: ElementRef;
  @ViewChild('trafficChart') trafficChart!: ElementRef;

  dashboardData: DashboardStats | null = null;
  isLoading = true;
  error: string | null = null;

  stats: any[] = [];
  recentActivities: any[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.isLoading = true;
    this.error = null;

    this.adminApiService.getDashboardStats().subscribe({
      next: (data: DashboardStats) => {
        this.dashboardData = data;
        this.processDashboardData();
        this.initCharts();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.error = 'Failed to load dashboard data';
        this.isLoading = false;
        // Fallback to mock data
        this.loadMockData();
      }
    });
  }

  processDashboardData() {
    if (!this.dashboardData) return;

    const stats = this.dashboardData.stats;
    this.stats = [
      {
        title: 'Total Revenue',
        value: `$${stats.total_revenue?.toLocaleString() || '0'}`,
        change: `+${stats.revenue_change || 0}%`,
        trend: 'up',
        icon: 'fas fa-dollar-sign',
        color: 'success'
      },
      {
        title: 'Active Users',
        value: stats.active_users?.toString() || '0',
        change: '+8.2%',
        trend: 'up',
        icon: 'fas fa-users',
        color: 'primary'
      },
      {
        title: 'Service Requests',
        value: stats.total_enquiries?.toString() || '0',
        change: `+${Math.round((stats.new_enquiries / stats.total_enquiries) * 100) || 0}%`,
        trend: 'up',
        icon: 'fas fa-clipboard-list',
        color: 'warning'
      },
      {
        title: 'Customer Satisfaction',
        value: `${stats.customer_satisfaction || 0}%`,
        change: '+2.1%',
        trend: 'up',
        icon: 'fas fa-star',
        color: 'info'
      }
    ];

    this.recentActivities = this.dashboardData.recent_activities || [];
  }

  loadMockData() {
    // Fallback mock data
    this.stats = [
      { title: 'Total Revenue', value: '$45,230', change: '+12.5%', trend: 'up', icon: 'fas fa-dollar-sign', color: 'success' },
      { title: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up', icon: 'fas fa-users', color: 'primary' },
      { title: 'Service Requests', value: '1,234', change: '+15.3%', trend: 'up', icon: 'fas fa-clipboard-list', color: 'warning' },
      { title: 'Customer Satisfaction', value: '98.5%', change: '+2.1%', trend: 'up', icon: 'fas fa-star', color: 'info' }
    ];

    this.recentActivities = [
      { action: 'New service request from John Doe', time: '2 minutes ago', type: 'request' },
      { action: 'Payment received for Invoice #1234', time: '15 minutes ago', type: 'payment' },
      { action: 'New user registration: Sarah Smith', time: '1 hour ago', type: 'user' },
      { action: 'Service completed: Termite Treatment', time: '2 hours ago', type: 'service' },
      { action: 'Review submitted: 5 stars rating', time: '3 hours ago', type: 'review' }
    ];

    setTimeout(() => {
      this.initCharts();
    }, 100);
  }

  initCharts() {
    if (this.dashboardData) {
      this.createRevenueChart();
      this.createServicesChart();
      this.createTrafficChart();
    } else {
      // Use mock data for charts
      this.createRevenueChart();
      this.createServicesChart();
      this.createTrafficChart();
    }
  }

  createRevenueChart() {
    const labels = this.dashboardData?.charts?.revenue?.labels || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = this.dashboardData?.charts?.revenue?.data || [12000, 19000, 15000, 25000, 22000, 30000];

    new Chart(this.revenueChart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Revenue',
          data: data,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  createServicesChart() {
    const labels = this.dashboardData?.charts?.services?.labels || ['Pest Control', 'Termite', 'Rodent', 'Inspection'];
    const data = this.dashboardData?.charts?.services?.data || [45, 25, 20, 10];

    new Chart(this.servicesChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#f5576c']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });
  }

  createTrafficChart() {
    const labels = this.dashboardData?.charts?.traffic?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = this.dashboardData?.charts?.traffic?.data || [120, 190, 300, 500, 200, 300, 450];

    new Chart(this.trafficChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Website Traffic',
          data: data,
          backgroundColor: 'rgba(102, 126, 234, 0.8)',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  constructor(private adminApiService: AdminApiService) {}
}
