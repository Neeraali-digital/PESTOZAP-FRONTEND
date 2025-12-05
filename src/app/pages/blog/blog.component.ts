import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit {
  private apiUrl = 'http://localhost:8000/api/v1/blog/posts/';
  
  blogs: any[] = [];
  categories: string[] = ['All'];
  selectedCategory = 'All';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs() {
    this.http.get<any>(`${this.apiUrl}?status=published`).subscribe({
      next: (response) => {
        const posts = response.results || response;
        this.blogs = posts.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          image: post.featured_image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
          category: post.category?.name || 'General',
          date: post.published_at || post.created_at,
          readTime: `${post.read_time || 5} min read`,
          author: post.author?.first_name || 'Admin'
        }));
        
        const uniqueCategories = [...new Set(this.blogs.map(b => b.category))];
        this.categories = ['All', ...uniqueCategories];
      },
      error: (error) => console.error('Error loading blogs:', error)
    });
  }

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