import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Phone, Mail, Calendar, User, Clock, Check, ExternalLink } from 'lucide-react';
import type { Lead, LeadStatus } from '../../types/database';

interface LeadDetailProps {
  lead: Lead;
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => Promise<void>;
  onUpdateNotes: (id: string, notes: string) => Promise<void>;
}

export function LeadDetail({ lead, onClose, onUpdateStatus, onUpdateNotes }: LeadDetailProps) {
  const [currentStatus, setCurrentStatus] = useState<LeadStatus>(lead.status);
  const [notes, setNotes] = useState(lead.admin_notes || '');
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedSuccess, setNotesSavedSuccess] = useState(false);

  // Sync state if lead changes
  useEffect(() => {
    setCurrentStatus(lead.status);
    setNotes(lead.admin_notes || '');
  }, [lead]);

  // Clean phone number for WhatsApp link
  const rawPhone = lead.phone || '';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hi, this is Speakory. We're following up regarding your enquiry."
  )}`;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const handleStatusChange = async (newStatus: LeadStatus) => {
    setCurrentStatus(newStatus);
    setIsSavingStatus(true);
    await onUpdateStatus(lead.id, newStatus);
    setIsSavingStatus(false);
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    setNotesSavedSuccess(false);
    await onUpdateNotes(lead.id, notes);
    setIsSavingNotes(false);
    setNotesSavedSuccess(true);
    setTimeout(() => setNotesSavedSuccess(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-white text-[#171717] rounded-2xl shadow-xl border border-[#E5E3DD] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0EEE9] bg-[#FAF8F5]">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                lead.type === 'trial'
                  ? 'bg-[#E5DEFF] text-[#5538EE]'
                  : 'bg-[#FCE7F3] text-[#BE185D]'
              }`}
            >
              {lead.type === 'trial' ? 'Free Trial' : 'Contact Enquiry'}
            </span>
            <span className="text-xs text-[#8C8880]">ID: {lead.id.slice(0, 8)}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B6964] hover:text-[#171717] hover:bg-[#F0EEE9] transition-colors cursor-pointer"
            aria-label="Close detail modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Title & Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F0EEE9]">
            <div>
              <h3 className="text-xl font-bold text-[#171717]">{lead.parent_name}</h3>
              <p className="text-xs text-[#6B6964] mt-0.5">
                Submitted on {formatDate(lead.created_at)}
              </p>
            </div>

            {/* WhatsApp Action Button */}
            {cleanPhone ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
              >
                <MessageSquare size={15} />
                <span>Open WhatsApp</span>
                <ExternalLink size={12} className="opacity-80" />
              </a>
            ) : null}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8880] mb-1">
                <Phone size={13} />
                <span>Phone / Contact</span>
              </div>
              <p className="text-sm font-medium text-[#171717] select-all">{lead.phone || '—'}</p>
            </div>

            {/* Email */}
            <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9]">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8880] mb-1">
                <Mail size={13} />
                <span>Email Address</span>
              </div>
              <p className="text-sm font-medium text-[#171717] select-all truncate">
                {lead.email || '—'}
              </p>
            </div>

            {/* Student Name */}
            {lead.student_name && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8880] mb-1">
                  <User size={13} />
                  <span>Student Name</span>
                </div>
                <p className="text-sm font-medium text-[#171717]">{lead.student_name}</p>
              </div>
            )}

            {/* Age Group */}
            {lead.age_group && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8880] mb-1">
                  <Clock size={13} />
                  <span>Age Group</span>
                </div>
                <p className="text-sm font-medium text-[#171717]">Ages {lead.age_group}</p>
              </div>
            )}

            {/* Goal */}
            {lead.goal && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9] sm:col-span-2">
                <div className="text-xs font-semibold text-[#8C8880] mb-1">Primary Goal</div>
                <p className="text-sm font-medium text-[#171717]">{lead.goal}</p>
              </div>
            )}

            {/* Preferred Slot */}
            {lead.preferred_day && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9] sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#8C8880] mb-1">
                  <Calendar size={13} />
                  <span>Preferred Trial Slot</span>
                </div>
                <p className="text-sm font-medium text-[#171717]">{lead.preferred_day}</p>
              </div>
            )}

            {/* Message/Question */}
            {lead.message && (
              <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#F0EEE9] sm:col-span-2">
                <div className="text-xs font-semibold text-[#8C8880] mb-1">Message / Enquiry</div>
                <p className="text-sm text-[#171717] leading-relaxed whitespace-pre-wrap">
                  {lead.message}
                </p>
              </div>
            )}
          </div>

          {/* STATUS CHANGE CONTROL */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
              Lead Status {isSavingStatus && <span className="text-[#7357FF] lowercase font-normal">(saving...)</span>}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['new', 'contacted', 'converted', 'closed'] as LeadStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusChange(status)}
                  disabled={isSavingStatus}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border capitalize transition-all cursor-pointer ${
                    currentStatus === status
                      ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
                      : 'bg-white text-[#6B6964] border-[#E5E3DD] hover:border-[#7357FF]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* ADMIN NOTES */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                Admin Notes
              </label>
              {notesSavedSuccess && (
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <Check size={12} /> Notes saved
                </span>
              )}
            </div>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Called parent, interested in weekend batch. Follow up on Friday."
              className="w-full px-3.5 py-2.5 bg-white border border-[#D5D3CC] rounded-xl text-xs sm:text-sm text-[#171717] placeholder-[#9E9B95] focus:outline-hidden focus:border-[#7357FF] transition-all resize-y"
            />
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSaveNotes}
                disabled={isSavingNotes}
                className="px-4 py-2 bg-[#7357FF] hover:bg-[#5B3EE6] disabled:bg-[#7357FF]/70 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                {isSavingNotes ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#FAF8F5] border-t border-[#F0EEE9] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-[#F0EEE9] text-[#171717] border border-[#D5D3CC] text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
