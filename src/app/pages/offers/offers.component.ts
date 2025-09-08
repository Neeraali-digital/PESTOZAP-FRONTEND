import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './offers.component.html'
})
export class OffersComponent implements OnInit {
  offers = [
    {
      id: 1,
      title: 'New Year Special - 50% Off',
      description: 'Get 50% off on all residential pest control services. Limited time offer!',
      discount_percentage: 50,
      code: 'NEWYEAR50',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
      valid_until: '2024-02-29',
      is_active: true,
      terms_conditions: 'Valid for new customers only. Cannot be combined with other offers.'
    },
    {
      id: 2,
      title: 'Commercial Package Deal',
      description: 'Special pricing for commercial properties. Save up to 30% on annual contracts.',
      discount_percentage: 30,
      code: 'COMMERCIAL30',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
      valid_until: '2024-03-31',
      is_active: true,
      terms_conditions: 'Valid for commercial properties only. Minimum 12-month contract required.'
    },
    {
      id: 3,
      title: 'Termite Treatment Special',
      description: 'Complete termite inspection and treatment at discounted rates.',
      discount_percentage: 25,
      code: 'TERMITE25',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop',
      valid_until: '2024-04-15',
      is_active: true,
      terms_conditions: 'Includes inspection, treatment, and 6-month warranty.'
    }
  ];

  ngOnInit() {
    // Load offers from API in real implementation
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    // Show success message
  }
}