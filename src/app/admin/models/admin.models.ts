export interface AdminUser {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string;
  last_login?: string;
}

export interface DashboardStats {
  total_users: number;
  total_posts: number;
  total_enquiries: number;
  total_reviews: number;
  total_offers: number;
  recent_users: number;
  recent_posts: number;
  recent_enquiries: number;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  author: {
    id: number;
    username: string;
    full_name: string;
  };
  category: {
    id: number;
    name: string;
    color: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  status: 'draft' | 'published' | 'archived';
  is_featured: boolean;
  views_count: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  is_active: boolean;
  posts_count: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Review {
  id: number;
  user: {
    id: number;
    full_name: string;
    email: string;
  };
  rating: number;
  title: string;
  content: string;
  service_type: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  property_type: string;
  pest_types: string[];
  address: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  discount_percentage: number;
  discount_amount?: number;
  code: string;
  image?: string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
  usage_limit?: number;
  used_count: number;
  terms_conditions: string;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  address?: string;
  date_of_birth?: string;
  profile_picture?: string;
  is_verified: boolean;
  is_active: boolean;
  date_joined: string;
  last_login?: string;
}