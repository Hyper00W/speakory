export type LeadType = 'trial' | 'contact';

export type LeadStatus = 'new' | 'contacted' | 'converted' | 'closed';

export interface Lead {
  id: string;
  type: LeadType;
  parent_name: string;
  student_name: string | null;
  age_group: string | null;
  phone: string;
  email: string | null;
  goal: string | null;
  preferred_day: string | null;
  preferred_time: string | null;
  message: string | null;
  status: LeadStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewLeadInput {
  type: LeadType;
  parent_name: string;
  student_name?: string | null;
  age_group?: string | null;
  phone: string;
  email?: string | null;
  goal?: string | null;
  preferred_day?: string | null;
  preferred_time?: string | null;
  message?: string | null;
  status?: LeadStatus;
}
