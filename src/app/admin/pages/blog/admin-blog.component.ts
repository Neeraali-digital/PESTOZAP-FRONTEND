import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent {
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  modalMode = 'create';
  selectedPost: any = {};
  
  blogPosts = [
    {
      id: 1,
      title: 'Top 10 Pest Control Tips for Homeowners',
      excerpt: 'Learn effective strategies to keep your home pest-free year-round with these expert tips.',
      content: 'Full content here...',
      image: 'https://via.placeholder.com/300x200',
      status: 'published',
      category: 'Tips',
      author: 'Admin',
      date: '2024-01-15',
      views: 245
    },
    {
      id: 2,
      title: 'Understanding Termite Damage',
      excerpt: 'How to identify and prevent costly termite damage to your property.',
      content: 'Full content here...',
      image: 'https://via.placeholder.com/300x200',
      status: 'draft',
      category: 'Education',
      author: 'Admin',
      date: '2024-01-10',
      views: 0
    }
  ];

  categories = ['Tips', 'Education', 'News', 'Services'];

  get filteredPosts() {
    return this.blogPosts.filter(post => 
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.statusFilter === '' || post.status === this.statusFilter)
    );
  }

  get publishedCount() {
    return this.blogPosts.filter(p => p.status === 'published').length;
  }

  get draftCount() {
    return this.blogPosts.filter(p => p.status === 'draft').length;
  }

  get totalViews() {
    return this.blogPosts.reduce((sum, p) => sum + p.views, 0);
  }

  openModal(mode: string, post?: any) {
    this.modalMode = mode;
    this.selectedPost = mode === 'create' ? { 
      status: 'draft', 
      category: 'Tips',
      author: 'Admin',
      views: 0
    } : { ...post };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedPost = {};
  }

  savePost() {
    if (this.modalMode === 'create') {
      this.selectedPost.id = Date.now();
      this.selectedPost.date = new Date().toISOString().split('T')[0];
      this.blogPosts.push(this.selectedPost);
    } else {
      const index = this.blogPosts.findIndex(p => p.id === this.selectedPost.id);
      if (index !== -1) this.blogPosts[index] = this.selectedPost;
    }
    this.closeModal();
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.blogPosts = this.blogPosts.filter(p => p.id !== id);
    }
  }

  publishPost(id: number) {
    const post = this.blogPosts.find(p => p.id === id);
    if (post) post.status = 'published';
  }
}