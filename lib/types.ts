export interface Profile {
  id: string;
  handle: string;
  name: string;
  title: string;
  bio: string;
  location?: string;
  email?: string;
  website?: string;
  solana_address?: string;
  github_url?: string;
  x_url?: string;
  farcaster_url?: string;
  bluesky_url?: string;
  lens_url?: string;
  reddit_url?: string;
  paragraph_url?: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  long_description?: string;
  tech_stack: string[];
  category: 'solana-program' | 'defi' | 'infrastructure' | 'worker' | 'frontend' | 'tool';
  status: 'active' | 'shipped' | 'building' | 'archived';
  url?: string;
  github_url?: string;
  program_id?: string;
  chain?: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Contribution {
  id: string;
  repo_name: string;
  repo_url: string;
  description: string;
  pr_url?: string;
  contribution_type: 'pr' | 'issue' | 'review' | 'maintainer' | 'docs';
  merged: boolean;
  contributed_at: string;
  sort_order: number;
  created_at: string;
}
