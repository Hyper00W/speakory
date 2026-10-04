import { createClient } from '@supabase/supabase-js';
import type { Lead, LeadStatus, NewLeadInput } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.trim() !== '' &&
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseUrl.includes('your-project-ref')
);

// Supabase client instance
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// --- Local Storage Helpers for Testing / Demo Mode ---
const LOCAL_LEADS_KEY = 'speakory_local_leads';
const LOCAL_SESSION_KEY = 'speakory_admin_session';

function getLocalLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalLeads(leads: Lead[]): void {
  try {
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save to local storage', e);
  }
}

export function getLocalAdminSession(): { email: string } | null {
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setLocalAdminSession(session: { email: string } | null): void {
  try {
    if (session) {
      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(LOCAL_SESSION_KEY);
    }
  } catch (e) {
    console.error('Failed to set local session', e);
  }
}

/**
 * Inserts a lead from public forms (Trial or Contact)
 */
export async function submitLead(lead: NewLeadInput): Promise<{ data: Lead | null; error: string | null }> {
  // If Supabase is configured, save to Supabase
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          {
            type: lead.type,
            parent_name: lead.parent_name,
            student_name: lead.student_name || null,
            age_group: lead.age_group || null,
            phone: lead.phone,
            email: lead.email || null,
            goal: lead.goal || null,
            preferred_day: lead.preferred_day || null,
            preferred_time: lead.preferred_time || null,
            message: lead.message || null,
            status: lead.status || 'new',
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase lead insertion error:', error);
        return { data: null, error: error.message };
      }

      return { data, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown network error';
      return { data: null, error: message };
    }
  }

  // Fallback to local storage for testing
  const now = new Date().toISOString();
  const newLead: Lead = {
    id: 'local-' + Math.random().toString(36).substring(2, 9),
    type: lead.type,
    parent_name: lead.parent_name,
    student_name: lead.student_name || null,
    age_group: lead.age_group || null,
    phone: lead.phone,
    email: lead.email || null,
    goal: lead.goal || null,
    preferred_day: lead.preferred_day || null,
    preferred_time: lead.preferred_time || null,
    message: lead.message || null,
    status: lead.status || 'new',
    admin_notes: null,
    created_at: now,
    updated_at: now,
  };

  const leads = getLocalLeads();
  saveLocalLeads([newLead, ...leads]);
  return { data: newLead, error: null };
}

/**
 * Fetches all leads (newest first). Admin only.
 */
export async function getLeads(): Promise<{ data: Lead[] | null; error: string | null }> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching leads:', error);
        return { data: null, error: error.message };
      }

      return { data: (data as Lead[]) || [], error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      return { data: null, error: message };
    }
  }

  // Local storage mode
  const leads = getLocalLeads();
  return { data: leads, error: null };
}

/**
 * Updates a lead's status
 */
export async function updateLeadStatus(id: string, status: LeadStatus): Promise<{ error: string | null }> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) return { error: error.message };
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Failed to update status' };
    }
  }

  // Local storage mode
  const leads = getLocalLeads();
  const updated = leads.map((l) =>
    l.id === id ? { ...l, status, updated_at: new Date().toISOString() } : l
  );
  saveLocalLeads(updated);
  return { error: null };
}

/**
 * Updates a lead's admin notes
 */
export async function updateLeadNotes(id: string, adminNotes: string): Promise<{ error: string | null }> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ admin_notes: adminNotes, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) return { error: error.message };
      return { error: null };
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Failed to save notes' };
    }
  }

  // Local storage mode
  const leads = getLocalLeads();
  const updated = leads.map((l) =>
    l.id === id ? { ...l, admin_notes: adminNotes, updated_at: new Date().toISOString() } : l
  );
  saveLocalLeads(updated);
  return { error: null };
}
