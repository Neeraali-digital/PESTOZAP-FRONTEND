import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminApiService } from '../../services/admin-api.service';
import { BlogPost, Category } from '../../models/admin.models';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [AdminApiService],
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {
  searchTerm = '';
  statusFilter = '';
  showModal = false;
  modalMode = 'create';
  selectedPost: any = {};
  loading = false;
  error = '';
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;
  
  blogPosts: BlogPost[] = [];
  categories: Category[] = [];

  constructor(private adminApiService: AdminApiService) {}

  ngOnInit() {
    this.loadBlogPosts();
    this.loadCategories();
  }

  loadBlogPosts() {
    this.loading = true;
    this.error = '';
    
    const params = {
      page: this.currentPage,
      page_size: this.pageSize,
      search: this.searchTerm,
      status: this.statusFilter
    };

    this.adminApiService.getBlogPosts(params).subscribe({
      next: (response) => {
        this.blogPosts = response.results;
        this.totalCount = response.count;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading blog posts:', error);
      }
    });
  }

  loadCategories() {
    this.adminApiService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadBlogPosts();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadBlogPosts();
  }

  get publishedCount() {
    return this.blogPosts.filter(p => p.status === 'published').length;
  }

  get draftCount() {
    return this.blogPosts.filter(p => p.status === 'draft').length;
  }

  get totalViews() {
    return this.blogPosts.reduce((sum, p) => sum + (p.views || p.views_count || 0), 0);
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
      this.adminApiService.createBlogPost(this.selectedPost).subscribe({
        next: () => {
          this.loadBlogPosts();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error creating blog post:', error);
        }
      });
    } else {
      this.adminApiService.updateBlogPost(this.selectedPost.id, this.selectedPost).subscribe({
        next: () => {
          this.loadBlogPosts();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error updating blog post:', error);
        }
      });
    }
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.adminApiService.deleteBlogPost(id).subscribe({
        next: () => {
          this.loadBlogPosts();
        },
        error: (error) => {
          console.error('Error deleting blog post:', error);
        }
      });
    }
  }

  publishPost(id: number) {
    this.adminApiService.updateBlogPost(id, { status: 'published' }).subscribe({
      next: () => {
        this.loadBlogPosts();
      },
      error: (error) => {
        console.error('Error publishing blog post:', error);
      }
    });
  }
}