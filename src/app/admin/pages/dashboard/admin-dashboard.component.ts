import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

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

  stats = [
    { title: 'Total Revenue', value: '$45,230', change: '+12.5%', trend: 'up', icon: 'fas fa-dollar-sign', color: 'success' },
    { title: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up', icon: 'fas fa-users', color: 'primary' },
    { title: 'Service Requests', value: '1,234', change: '+15.3%', trend: 'up', icon: 'fas fa-clipboard-list', color: 'warning' },
    { title: 'Customer Satisfaction', value: '98.5%', change: '+2.1%', trend: 'up', icon: 'fas fa-star', color: 'info' }
  ];

  recentActivities = [
    { action: 'New service request from John Doe', time: '2 minutes ago', type: 'request' },
    { action: 'Payment received for Invoice #1234', time: '15 minutes ago', type: 'payment' },
    { action: 'New user registration: Sarah Smith', time: '1 hour ago', type: 'user' },
    { action: 'Service completed: Termite Treatment', time: '2 hours ago', type: 'service' },
    { action: 'Review submitted: 5 stars rating', time: '3 hours ago', type: 'review' }
  ];

  ngOnInit() {
    setTimeout(() => {
      this.initCharts();
    }, 100);
  }

  initCharts() {
    this.createRevenueChart();
    this.createServicesChart();
    this.createTrafficChart();
  }

  createRevenueChart() {
    new Chart(this.revenueChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [12000, 19000, 15000, 25000, 22000, 30000],
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
    new Chart(this.servicesChart.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Pest Control', 'Termite', 'Rodent', 'Inspection'],
        datasets: [{
          data: [45, 25, 20, 10],
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
    new Chart(this.trafficChart.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Website Traffic',
          data: [120, 190, 300, 500, 200, 300, 450],
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
}