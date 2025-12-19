import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div *ngIf="loading" class="min-h-screen flex items-center justify-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
    </div>

    <div *ngIf="!loading && blog" class="min-h-screen bg-gray-50">
      <section class="relative py-20 bg-black">
        <div class="max-w-4xl mx-auto px-6 text-center">
          <div class="inline-flex items-center bg-brand/20 text-brand px-4 py-2 rounded-full mb-6">
            <span class="material-icons mr-2 text-sm">local_offer</span>
            <span class="font-semibold">{{blog.category}}</span>
          </div>
          <h1 class="text-4xl lg:text-6xl font-black text-white mb-6">{{blog.title}}</h1>
          <div class="flex items-center justify-center space-x-6 text-gray-300">
            <div class="flex items-center">
              <span class="material-icons mr-2">person</span>
              <span>{{blog.author}}</span>
            </div>
            <div class="flex items-center">
              <span class="material-icons mr-2">schedule</span>
              <span>{{blog.readTime}}</span>
            </div>
            <div class="flex items-center">
              <span class="material-icons mr-2">calendar_today</span>
              <span>{{blog.date | date:'mediumDate'}}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16">
        <div class="max-w-4xl mx-auto px-6">
          <div *ngIf="blog.image" class="mb-12">
            <img [src]="blog.image" [alt]="blog.title" class="w-full h-96 object-cover rounded-2xl shadow-2xl">
          </div>

          <div class="prose prose-lg max-w-none">
            <div class="text-xl text-gray-600 mb-8 leading-relaxed">{{blog.excerpt}}</div>
            <div [innerHTML]="blog.content" class="text-gray-800 leading-relaxed"></div>
          </div>

          <div class="mt-12 text-center">
            <button (click)="goBack()" class="inline-flex items-center bg-brand text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all">
              <span class="material-icons mr-2">arrow_back</span>
              Back to Blog
            </button>
          </div>
        </div>
      </section>
    </div>

    <div *ngIf="!loading && !blog" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h2>
        <button (click)="goBack()" class="text-brand hover:text-brand-dark">← Back to Blog</button>
      </div>
    </div>
  `,
  styles: [`
    .prose { line-height: 1.8; }
    .prose h1, .prose h2, .prose h3 { color: #1f2937; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem; }
    .prose p { margin-bottom: 1.5rem; }
    .prose ul, .prose ol { margin: 1.5rem 0; padding-left: 2rem; }
    .prose li { margin-bottom: 0.5rem; }
  `]
})
export class BlogDetailComponent implements OnInit {
  blog: any = null;
  loading = true;
  private apiUrl = `${environment.apiUrl}/blog/posts/`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadBlog(slug);
    }
  }

  loadBlog(slug: string) {
    this.http.get<any>(`${this.apiUrl}${slug}/`).subscribe({
      next: (post) => {
        this.blog = {
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          image: this.getImageUrl(post.featured_image),
          category: post.category?.name || 'General',
          date: post.published_at || post.created_at,
          readTime: `${post.read_time || 5} min read`,
          author: post.author?.full_name || post.author?.first_name || 'Admin'
        };
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading blog:', error);
        this.loading = false;
      }
    });
  }

  getImageUrl(imageUrl: string): string {
    if (imageUrl) {
      return imageUrl.startsWith('http') ? imageUrl : `${environment.baseUrl}${imageUrl}`;
    }
    return '';
  }

  goBack() {
    this.router.navigate(['/blog']);
  }
}