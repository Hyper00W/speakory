import React from 'react';
import { Eye, Clock, Phone, User, Calendar, MessageSquare } from 'lucide-react';
import type { Lead } from '../../types/database';

interface LeadTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

export function LeadTable({ leads, onSelectLead }: LeadTableProps) {
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const renderStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#7357FF] text-white tracking-wide shadow-xs animate-pulse">
            NEW
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Contacted
          </span>
        );
      case 'converted':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Converted
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-zinc-100 text-zinc-600 border border-zinc-200">
            Closed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 text-zinc-600">
            {status}
          </span>
        );
    }
  };

  const renderTypeBadge = (type: Lead['type']) => {
    if (type === 'trial') {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#E5DEFF] text-[#5538EE] uppercase">
          TRIAL
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-[#FCE7F3] text-[#BE185D] uppercase">
        CONTACT
      </span>
    );
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#E5E3DD] p-12 text-center">
        <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E5E3DD] flex items-center justify-center mx-auto mb-3 text-[#8C8880]">
          <MessageSquare size={20} />
        </div>
        <h4 className="text-base font-bold text-[#171717]">No enquiries yet.</h4>
        <p className="text-xs text-[#6B6964] mt-1 max-w-sm mx-auto">
          Submissions from the Free Trial and Contact forms will appear here in real time.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#E5E3DD] shadow-xs overflow-hidden">
      {/* Desktop & Tablet Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FAF8F5] border-b border-[#E5E3DD] text-[11px] font-bold uppercase tracking-wider text-[#6B6964]">
              <th className="py-3.5 px-4 sm:px-6">Name</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Goal</th>
              <th className="py-3.5 px-4">Preferred Slot</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Submitted</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0EEE9] text-xs">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => onSelectLead(lead)}
                className="hover:bg-[#FAF8F5]/80 cursor-pointer transition-colors"
              >
                {/* Name */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="font-bold text-[#171717]">{lead.parent_name}</div>
                  {lead.student_name && (
                    <div className="text-[11px] text-[#6B6964] flex items-center gap-1 mt-0.5">
                      <User size={11} />
                      <span>
                        Student: {lead.student_name}
                        {lead.age_group ? ` (${lead.age_group} yrs)` : ''}
                      </span>
                    </div>
                  )}
                </td>

                {/* Phone */}
                <td className="py-3.5 px-4 text-[#171717] font-medium whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Phone size={12} className="text-[#8C8880]" />
                    <span>{lead.phone}</span>
                  </div>
                </td>

                {/* Type */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {renderTypeBadge(lead.type)}
                </td>

                {/* Goal */}
                <td className="py-3.5 px-4 text-[#6B6964] max-w-[180px] truncate">
                  {lead.goal || (lead.message ? <span className="italic truncate block">{lead.message}</span> : '—')}
                </td>

                {/* Preferred Slot */}
                <td className="py-3.5 px-4 text-[#6B6964] whitespace-nowrap">
                  {lead.preferred_day ? (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#8C8880]" />
                      {lead.preferred_day}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  {renderStatusBadge(lead.status)}
                </td>

                {/* Submitted */}
                <td className="py-3.5 px-4 text-[#6B6964] whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Clock size={12} className="text-[#8C8880]" />
                    <span>{formatDate(lead.created_at)}</span>
                  </div>
                </td>

                {/* Action */}
                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLead(lead);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#D5D3CC] hover:border-[#7357FF] hover:text-[#7357FF] bg-white text-[#171717] font-semibold text-[11px] transition-all cursor-pointer shadow-2xs"
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
