import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-blog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="blog-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Blog Management</h1>
          <p>Create and manage blog posts</p>
        </div>
        <button class="btn-primary">
          <i class="fas fa-plus"></i>
          New Post
        </button>
      </div>

      <div class="blog-stats">
        <div class="stat-item">
          <div class="stat-number">24</div>
          <div class="stat-label">Published Posts</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">8</div>
          <div class="stat-label">Draft Posts</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">1.2K</div>
          <div class="stat-label">Total Views</div>
        </div>
      </div>

      <div class="posts-grid">
        <div class="post-card" *ngFor="let post of blogPosts">
          <div class="post-image">
            <img [src]="post.image" [alt]="post.title">
            <div class="post-status" [class]="'status-' + post.status">{{post.status}}</div>
          </div>
          <div class="post-content">
            <h3>{{post.title}}</h3>
            <p>{{post.excerpt}}</p>
            <div class="post-meta">
              <span class="post-date">{{post.date}}</span>
              <span class="post-views">{{post.views}} views</span>
            </div>
            <div class="post-actions">
              <button class="action-btn edit">Edit</button>
              <button class="action-btn delete">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-page{padding:0}
    .page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:2rem;padding:2rem;background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08)}
    .header-content h1{margin:0 0 0.5rem;color:#333;font-size:1.8rem;font-weight:700}
    .header-content p{margin:0;color:#666}
    .btn-primary{background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-weight:600;cursor:pointer}
    .blog-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:2rem}
    .stat-item{background:white;padding:1.5rem;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);text-align:center}
    .stat-number{font-size:2rem;font-weight:700;color:#667eea;margin-bottom:0.5rem}
    .stat-label{color:#666;font-size:0.9rem}
    .posts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:1.5rem}
    .post-card{background:white;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.08);overflow:hidden;transition:transform 0.3s ease}
    .post-card:hover{transform:translateY(-4px)}
    .post-image{position:relative;height:200px;overflow:hidden}
    .post-image img{width:100%;height:100%;object-fit:cover}
    .post-status{position:absolute;top:1rem;right:1rem;padding:0.25rem 0.75rem;border-radius:20px;font-size:0.8rem;font-weight:600}
    .status-published{background:#e8f5e8;color:#4CAF50}
    .status-draft{background:#fff3cd;color:#856404}
    .post-content{padding:1.5rem}
    .post-content h3{margin:0 0 0.75rem;color:#333;font-size:1.2rem;font-weight:600}
    .post-content p{margin:0 0 1rem;color:#666;font-size:0.9rem;line-height:1.5}
    .post-meta{display:flex;justify-content:space-between;margin-bottom:1rem;font-size:0.85rem;color:#888}
    .post-actions{display:flex;gap:0.5rem}
    .action-btn{padding:0.5rem 1rem;border:none;border-radius:6px;font-size:0.85rem;font-weight:500;cursor:pointer}
    .action-btn.edit{background:#e3f2fd;color:#2196F3}
    .action-btn.delete{background:#ffebee;color:#f44336}
  `]
})
export class AdminBlogComponent {
  blogPosts = [
    {
      title: 'Top 10 Pest Control Tips for Homeowners',
      excerpt: 'Learn effective strategies to keep your home pest-free year-round.',
      image: 'https://via.placeholder.com/300x200',
      status: 'published',
      date: '2024-01-15',
      views: 245
    },
    {
      title: 'Understanding Termite Damage',
      excerpt: 'How to identify and prevent costly termite damage to your property.',
      image: 'https://via.placeholder.com/300x200',
      status: 'draft',
      date: '2024-01-10',
      views: 0
    }
  ];
}