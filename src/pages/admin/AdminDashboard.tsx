import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Inbox,
  Sparkles,
  PhoneCall,
  CheckCircle,
} from 'lucide-react';
import {
  supabase,
  isSupabaseConfigured,
  getLeads,
  updateLeadStatus,
  updateLeadNotes,
  getLocalAdminSession,
  setLocalAdminSession,
} from '../../lib/supabase.ts';
import { useRouter } from '../../lib/router.tsx';
import type { Lead, LeadStatus, LeadType } from '../../types/database';
import { LeadTable } from '../../components/admin/LeadTable.tsx';
import { LeadDetail } from '../../components/admin/LeadDetail.tsx';

export function AdminDashboard() {
  const { navigate } = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | LeadType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | LeadStatus>('all');

  // Selected lead for detail view
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // 1. Verify authentication
  useEffect(() => {
    async function verifyAuth() {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session?.user) {
            navigate('/admin/login');
            return;
          }
          setUserEmail(session.user.email || 'Admin');
        } catch (err) {
          console.error('Auth verification failed:', err);
          navigate('/admin/login');
        } finally {
          setAuthLoading(false);
        }
      } else {
        const localSession = getLocalAdminSession();
        if (!localSession) {
          navigate('/admin/login');
          return;
        }
        setUserEmail(localSession.email);
        setAuthLoading(false);
      }
    }

    verifyAuth();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          navigate('/admin/login');
        } else {
          setUserEmail(session.user.email || 'Admin');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [navigate]);

  // 2. Fetch leads from database
  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    setFetchError(null);

    const { data, error } = await getLeads();
    if (error) {
      setFetchError(error);
    } else {
      setLeads(data || []);
      // If modal is open, sync the selected lead with refreshed data
      if (selectedLead) {
        const updated = (data || []).find((l) => l.id === selectedLead.id);
        if (updated) setSelectedLead(updated);
      }
    }
    setLoadingLeads(false);
  }, [selectedLead]);

  useEffect(() => {
    if (!authLoading) {
      loadLeads();
    }
  }, [authLoading, loadLeads]);

  // 3. Handle Logout
  const handleLogout = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      } else {
        setLocalAdminSession(null);
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      navigate('/admin/login');
    }
  };

  // 4. Update status callback
  const handleUpdateStatus = async (id: string, newStatus: LeadStatus) => {
    const { error } = await updateLeadStatus(id, newStatus);
    if (!error) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } else {
      alert('Failed to update status: ' + error);
    }
  };

  // 5. Update notes callback
  const handleUpdateNotes = async (id: string, notes: string) => {
    const { error } = await updateLeadNotes(id, notes);
    if (!error) {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id ? { ...lead, admin_notes: notes } : lead))
      );
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead((prev) => (prev ? { ...prev, admin_notes: notes } : null));
      }
    } else {
      alert('Failed to update notes: ' + error);
    }
  };

  // 6. Filter & Search leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Type filter
      if (typeFilter !== 'all' && lead.type !== typeFilter) {
        return false;
      }

      // Status filter
      if (statusFilter !== 'all' && lead.status !== statusFilter) {
        return false;
      }

      // Search term
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = lead.parent_name?.toLowerCase().includes(query);
        const matchesStudent = lead.student_name?.toLowerCase().includes(query);
        const matchesPhone = lead.phone?.toLowerCase().includes(query);
        const matchesEmail = lead.email?.toLowerCase().includes(query);
        if (!matchesName && !matchesStudent && !matchesPhone && !matchesEmail) {
          return false;
        }
      }

      return true;
    });
  }, [leads, typeFilter, statusFilter, searchTerm]);

  // 7. Calculate Summary Values
  const stats = useMemo(() => {
    const total = leads.length;
    const countNew = leads.filter((l) => l.status === 'new').length;
    const countContacted = leads.filter((l) => l.status === 'contacted').length;
    const countConverted = leads.filter((l) => l.status === 'converted').length;
    return { total, countNew, countContacted, countConverted };
  }, [leads]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-[#7357FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-semibold text-[#6B6964]">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#171717] font-sans antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-[#E5E3DD] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black tracking-tight text-[#171717]">
              SPEAKORY ADMIN
            </h1>
            <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-[#E5DEFF] text-[#5538EE] px-2 py-0.5 rounded-full">
              Lead Panel
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {userEmail && (
              <span className="hidden md:inline-block text-xs text-[#6B6964] font-medium">
                {userEmail}
              </span>
            )}

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#6B6964] hover:text-[#171717] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer border border-[#E5E3DD]"
            >
              <span>View Site</span>
              <ExternalLink size={12} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200"
            >
              <LogOut size={13} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Warning if Supabase credentials are missing */}
        {!isSupabaseConfigured && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Supabase credentials missing</p>
              <p className="mt-0.5">
                Set <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> and{' '}
                <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code> in your{' '}
                <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">.env</code> file.
              </p>
            </div>
          </div>
        )}

        {/* 4 Summary Values */}
        <section aria-label="Summary Statistics">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Leads */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DD] shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#6B6964] uppercase tracking-wider">
                  Total Leads
                </span>
                <div className="p-2 rounded-xl bg-[#FAF8F5] text-[#171717]">
                  <Inbox size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#171717] mt-2">
                {stats.total}
              </div>
            </div>

            {/* New Leads */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DD] shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#7357FF] uppercase tracking-wider">
                  New
                </span>
                <div className="p-2 rounded-xl bg-[#E5DEFF] text-[#5538EE]">
                  <Sparkles size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-[#7357FF] mt-2">
                {stats.countNew}
              </div>
            </div>

            {/* Contacted */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DD] shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Contacted
                </span>
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <PhoneCall size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-amber-800 mt-2">
                {stats.countContacted}
              </div>
            </div>

            {/* Converted */}
            <div className="bg-white p-5 rounded-2xl border border-[#E5E3DD] shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  Converted
                </span>
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle size={16} />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-2">
                {stats.countConverted}
              </div>
            </div>
          </div>
        </section>

        {/* Section: LEADS */}
        <section className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-[#171717] tracking-tight">LEADS</h2>
              <p className="text-xs text-[#6B6964] mt-0.5">
                Showing {filteredLeads.length} of {leads.length} enquiries (newest first)
              </p>
            </div>

            {/* Refresh Button */}
            <button
              onClick={loadLeads}
              disabled={loadingLeads}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-[#D5D3CC] bg-white hover:bg-[#FAF8F5] text-[#171717] transition-all cursor-pointer shadow-2xs self-start md:self-auto"
            >
              <RefreshCw size={13} className={loadingLeads ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E3DD] shadow-2xs flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8C8880]">
                <Search size={15} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, student, or phone..."
                className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#E5E3DD] rounded-xl text-xs sm:text-sm text-[#171717] placeholder-[#8C8880] focus:outline-hidden focus:border-[#7357FF] transition-all"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B6964] uppercase tracking-wider shrink-0">
                Type:
              </span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as 'all' | LeadType)}
                className="py-2 px-3 bg-[#FAF8F5] border border-[#E5E3DD] rounded-xl text-xs font-semibold text-[#171717] focus:outline-hidden focus:border-[#7357FF] cursor-pointer"
              >
                <option value="all">All</option>
                <option value="trial">Trial</option>
                <option value="contact">Contact</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6B6964] uppercase tracking-wider shrink-0">
                Status:
              </span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | LeadStatus)}
                className="py-2 px-3 bg-[#FAF8F5] border border-[#E5E3DD] rounded-xl text-xs font-semibold text-[#171717] focus:outline-hidden focus:border-[#7357FF] cursor-pointer"
              >
                <option value="all">All</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Error Banner */}
          {fetchError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              <p className="font-bold">Error loading leads:</p>
              <p className="mt-0.5">{fetchError}</p>
            </div>
          )}

          {/* Loading Indicator or Table */}
          {loadingLeads ? (
            <div className="bg-white rounded-2xl border border-[#E5E3DD] p-12 text-center">
              <div className="w-8 h-8 border-3 border-[#7357FF] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs font-semibold text-[#6B6964]">Loading enquiries...</p>
            </div>
          ) : (
            <LeadTable leads={filteredLeads} onSelectLead={setSelectedLead} />
          )}
        </section>
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetail
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdateNotes={handleUpdateNotes}
        />
      )}
    </div>
  );
}
