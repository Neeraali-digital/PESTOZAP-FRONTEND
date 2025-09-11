import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bird-netting',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bird-netting.component.html'
})
export class BirdNettingComponent {
  services = [
    {
      title: 'Residential Bird Netting',
      description: 'Protect your home from bird intrusion',
      features: ['Balcony Protection', 'Window Netting', 'Terrace Coverage', 'AC Unit Protection'],
      price: 'Starting from ₹15/sq ft'
    },
    {
      title: 'Commercial Bird Netting',
      description: 'Professional bird control for businesses',
      features: ['Warehouse Protection', 'Factory Coverage', 'Office Building Netting', 'Restaurant Safety'],
      price: 'Starting from ₹12/sq ft'
    },
    {
      title: 'Industrial Bird Netting',
      description: 'Heavy-duty protection for industrial facilities',
      features: ['Large Area Coverage', 'Heavy-Duty Materials', 'Weather Resistant', 'Long-term Solution'],
      price: 'Custom Quote'
    }
  ];

  features = [
    { icon: 'security', title: 'Durable Materials', description: 'High-quality UV-resistant netting' },
    { icon: 'eco', title: 'Eco-Friendly', description: 'Humane bird control solution' },
    { icon: 'build', title: 'Professional Installation', description: 'Expert installation team' },
    { icon: 'verified', title: '5 Year Warranty', description: 'Long-term protection guarantee' }
  ];
}