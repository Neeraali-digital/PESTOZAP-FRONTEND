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

export interface Job {
  id: number;
  title: string;
  location: string;
  employment_type: 'full-time' | 'part-time' | 'contract';
  experience: string;
  description: string;
  requirements: string[];
  status: 'active' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: number;
  job: number;
  job_details?: Job;
  full_name: string;
  email: string;
  phone: string;
  experience: string;
  resume: string;
  cover_letter: string;
  created_at: string;
}

export interface DashboardStats {
  stats: {
    total_revenue: number;
    revenue_change: number;
    active_users: number;
    total_users: number;
    total_enquiries: number;
    new_enquiries: number;
    total_reviews: number;
    approved_reviews: number;
    total_offers: number;
    active_offers: number;
    customer_satisfaction: number;
  };
  recent_activities: Array<{
    action: string;
    time: string;
    type: string;
  }>;
  charts: {
    revenue: {
      labels: string[];
      data: number[];
    };
    services: {
      labels: string[];
      data: number[];
    };
    traffic: {
      labels: string[];
      data: number[];
    };
  };
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image?: string;
  image?: string;
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
  views?: number;
  likes_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  date?: string;
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
  name: string;
  email: string;
  location?: string;
  image?: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  is_featured: boolean;
  display_location: 'home' | 'community' | 'both';
  created_at: string;
}

export interface Enquiry {
  id: number;
  type: 'contact' | 'enquiry';
  name: string;
  email: string;
  phone: string;
  subject?: string;
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
  discount: number;
  discount_type: 'percentage' | 'fixed';
  code: string;
  image?: string;
  valid_from: string;
  valid_to: string;
  status: 'active' | 'inactive' | 'expired';
  usage_limit?: number;
  used_count: number;
  services: string[];
  created_at: string;
  updated_at: string;
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