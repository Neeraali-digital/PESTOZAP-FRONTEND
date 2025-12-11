import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './blog.component.html'
})
export class BlogComponent implements OnInit, OnDestroy {
  private apiUrl = 'http://localhost:8000/api/v1/blog/posts/';
  
  blogs: any[] = [];
  featuredBlogs: any[] = [];
  currentFeaturedIndex = 0;
  categories: string[] = ['All', 'Tips & Tricks', 'Prevention', 'Eco-Friendly', 'Home Care', 'Commercial', 'Seasonal'];
  selectedCategory = 'All';
  loading = false;
  carouselInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBlogs();
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  loadBlogs() {
    this.loading = true;
    this.http.get<any>(this.apiUrl).subscribe({
      next: (response) => {
        const posts = response.results || response;
        const publishedPosts = posts.filter((post: any) => post.status === 'published');
        
        this.blogs = publishedPosts.map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          slug: post.slug,
          image: this.getImageUrl(post.featured_image),
          category: post.category?.name || 'Unknown',
          date: post.published_at || post.created_at,
          readTime: `${post.read_time || 5} min read`,
          author: post.author?.full_name || post.author?.first_name || 'Admin',
          is_featured: post.is_featured
        }));
        
        this.featuredBlogs = this.blogs.filter(blog => blog.is_featured);
        
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.loading = false;
      }
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

  getImageUrl(imageUrl: string): string {
    if (imageUrl) {
      return imageUrl.startsWith('http') ? imageUrl : `http://localhost:8000${imageUrl}`;
    }
    return '';
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      if (this.featuredBlogs.length > 1) {
        this.nextFeatured();
      }
    }, 5000);
  }

  nextFeatured() {
    this.currentFeaturedIndex = (this.currentFeaturedIndex + 1) % this.featuredBlogs.length;
  }

  prevFeatured() {
    this.currentFeaturedIndex = this.currentFeaturedIndex === 0 ? 
      this.featuredBlogs.length - 1 : this.currentFeaturedIndex - 1;
  }

  get currentFeaturedBlog() {
    return this.featuredBlogs[this.currentFeaturedIndex];
  }

  readMore(blog: any) {
    window.open(`/blog/${blog.slug || blog.id}`, '_self');
  }
}