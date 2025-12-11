import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AdminApiService } from '../../services/admin-api.service';
import { AlertService } from '../../../shared/services/alert.service';
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
  showViewModal = false;
  modalMode = 'create';
  selectedPost: any = {};
  loading = false;
  saving = false;
  error = '';
  currentPage = 1;
  totalCount = 0;
  pageSize = 10;
  selectedFile: File | null = null;
  maxFileSize = 3 * 1024 * 1024; // 3MB
  
  blogPosts: BlogPost[] = [];
  categories = [
    { id: 1, name: 'Tips & Tricks' },
    { id: 2, name: 'Prevention' },
    { id: 3, name: 'Eco-Friendly' },
    { id: 4, name: 'Home Care' },
    { id: 5, name: 'Commercial' },
    { id: 6, name: 'Seasonal' }
  ];

  constructor(
    private adminApiService: AdminApiService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadBlogPosts();
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
    if (mode === 'create') {
      this.selectedPost = { 
        status: 'draft',
        category: 1,
        is_featured: false,
        read_time: 5
      };
    } else {
      // Map category name back to ID for editing
      let categoryId = 1;
      if (post.category) {
        const categoryName = post.category.name || post.category;
        const foundCategory = this.categories.find(c => c.name === categoryName);
        categoryId = foundCategory ? foundCategory.id : 1;
      }
      this.selectedPost = { 
        ...post,
        category: categoryId
      };
    }
    this.selectedFile = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.showViewModal = false;
    this.selectedPost = {};
  }

  viewPost(post: any) {
    this.selectedPost = post;
    this.showViewModal = true;
  }

  getImageUrl(post: any): string {
    if (post.featured_image) {
      return post.featured_image.startsWith('http') ? post.featured_image : `http://localhost:8000${post.featured_image}`;
    }
    return '';
  }

  getCategoryName(post: any): string {
    if (post.category_detail && post.category_detail.name) {
      return post.category_detail.name;
    }
    return 'Unknown';
  }

  getAuthorName(post: any): string {
    if (post.author && typeof post.author === 'object') {
      return post.author.full_name || `${post.author.first_name} ${post.author.last_name}`.trim();
    }
    return post.author || 'Admin';
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (file.size > this.maxFileSize) {
        this.alertService.error('File size must be less than 3MB');
        event.target.value = '';
        return;
      }
      console.log('File selected:', file.name, file.size);
      this.selectedFile = file;
    }
  }

  savePost() {
    if (!this.selectedPost.title || !this.selectedPost.excerpt || !this.selectedPost.content) {
      this.alertService.error('Please fill in all required fields');
      return;
    }

    this.saving = true;

    const savePostData = () => {
      const postData: any = {
        title: this.selectedPost.title,
        excerpt: this.selectedPost.excerpt,
        content: this.selectedPost.content,
        category: this.selectedPost.category,
        status: this.selectedPost.status,
        is_featured: this.selectedPost.is_featured || false,
        read_time: this.selectedPost.read_time || 5
      };

      if (this.selectedPost.featured_image) {
        postData.featured_image_url = this.selectedPost.featured_image;
      }

      if (this.modalMode === 'create') {
        this.adminApiService.createBlogPost(postData).subscribe({
          next: () => {
            this.loadBlogPosts();
            this.closeModal();
            this.alertService.success('Blog post created successfully!');
            this.saving = false;
          },
          error: (error) => {
            console.error('Error creating blog post:', error);
            console.error('Error details:', error.error);
            let errorMsg = 'Failed to create blog post';
            if (error.error) {
              if (typeof error.error === 'string') {
                errorMsg = error.error;
              } else if (error.error.detail) {
                errorMsg = error.error.detail;
              } else if (error.error.message) {
                errorMsg = error.error.message;
              } else {
                errorMsg = JSON.stringify(error.error);
              }
            }
            this.alertService.error(errorMsg);
            this.saving = false;
          }
        });
      } else {
        this.adminApiService.updateBlogPost(this.selectedPost.id, postData).subscribe({
          next: () => {
            this.loadBlogPosts();
            this.closeModal();
            this.alertService.success('Blog post updated successfully!');
            this.saving = false;
          },
          error: (error) => {
            console.error('Error updating blog post:', error);
            this.alertService.error('Failed to update blog post. Please try again.');
            this.saving = false;
          }
        });
      }
    };

    if (this.selectedFile) {
      this.adminApiService.uploadFile(this.selectedFile, 'blog').subscribe({
        next: (response) => {
          this.selectedPost.featured_image = response.url;
          console.log('Image uploaded:', response.url);
          savePostData();
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.alertService.warning('Failed to upload image. Saving without image.');
          savePostData();
        }
      });
    } else {
      console.log('No file selected, saving without image');
      savePostData();
    }
  }

  deletePost(id: number) {
    if (confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      this.adminApiService.deleteBlogPost(id).subscribe({
        next: () => {
          this.loadBlogPosts();
          this.alertService.success('Blog post deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting blog post:', error);
          this.alertService.error('Failed to delete blog post.');
        }
      });
    }
  }

  publishPost(id: number) {
    this.adminApiService.updateBlogPost(id, { status: 'published' }).subscribe({
      next: () => {
        this.loadBlogPosts();
        this.alertService.success('Blog post published successfully!');
      },
      error: (error) => {
        console.error('Error publishing blog post:', error);
        this.alertService.error('Failed to publish blog post.');
      }
    });
  }
}