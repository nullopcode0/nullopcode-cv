import { fallbackProfile, fallbackProjects, fallbackContributions } from './fallback';
import type { Profile, Project, Contribution } from './types';

export async function getProfile(): Promise<Profile> {
  try {
    const { createServerClient } = await import('./supabase/server');
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .single();
    if (error) throw error;
    return data;
  } catch {
    return fallbackProfile;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const { createServerClient } = await import('./supabase/server');
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data ?? fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getContributions(): Promise<Contribution[]> {
  try {
    const { createServerClient } = await import('./supabase/server');
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('contributions')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data ?? fallbackContributions;
  } catch {
    return fallbackContributions;
  }
}
