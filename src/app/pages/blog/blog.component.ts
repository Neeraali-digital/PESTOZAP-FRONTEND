import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html'
})
export class BlogComponent {
  blogs = [
    {
      id: 1,
      title: 'Top 10 Signs You Have a Pest Problem',
      excerpt: 'Learn to identify early warning signs of pest infestations before they become major problems.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
      category: 'Prevention',
      date: '2024-01-15',
      readTime: '5 min read',
      author: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Eco-Friendly Pest Control: Safe for Family & Pets',
      excerpt: 'Discover natural and eco-friendly methods to keep pests away without harmful chemicals.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop',
      category: 'Eco-Friendly',
      date: '2024-01-12',
      readTime: '7 min read',
      author: 'Mike Chen'
    },
    {
      id: 3,
      title: 'Seasonal Pest Control: What to Expect Each Season',
      excerpt: 'Understanding seasonal pest patterns helps you prepare and prevent infestations year-round.',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=300&fit=crop',
      category: 'Seasonal',
      date: '2024-01-10',
      readTime: '6 min read',
      author: 'Lisa Rodriguez'
    },
    {
      id: 4,
      title: 'Commercial Kitchen Pest Prevention Guide',
      excerpt: 'Essential strategies for keeping restaurants and commercial kitchens pest-free.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&h=300&fit=crop',
      category: 'Commercial',
      date: '2024-01-08',
      readTime: '8 min read',
      author: 'James Wilson'
    },
    {
      id: 5,
      title: 'DIY vs Professional Pest Control: When to Call Experts',
      excerpt: 'Learn when DIY methods work and when it\'s time to call professional pest control services.',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=300&fit=crop',
      category: 'Tips',
      date: '2024-01-05',
      readTime: '4 min read',
      author: 'Emma Thompson'
    },
    {
      id: 6,
      title: 'Understanding Termite Damage and Prevention',
      excerpt: 'Comprehensive guide to identifying, preventing, and treating termite infestations.',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=300&fit=crop',
      category: 'Termites',
      date: '2024-01-03',
      readTime: '10 min read',
      author: 'Dr. Robert Kim'
    }
  ];

  categories = ['All', 'Prevention', 'Eco-Friendly', 'Seasonal', 'Commercial', 'Tips', 'Termites'];
  selectedCategory = 'All';

  get filteredBlogs() {
    if (this.selectedCategory === 'All') {
      return this.blogs;
    }
    return this.blogs.filter(blog => blog.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  trackByBlogId(index: number, blog: any): number {
    return blog.id;
  }
}