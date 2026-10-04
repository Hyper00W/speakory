import { useState, FormEvent } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';
import { submitLead } from '../lib/supabase.ts';

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TalkModal({ isOpen, onClose }: TalkModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [parentName, setParentName] = useState('');
  const [contact, setContact] = useState('');
  const [question, setQuestion] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contact.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const isEmail = contact.includes('@');
    const { error } = await submitLead({
      type: 'contact',
      parent_name: parentName.trim(),
      phone: contact.trim(),
      email: isEmail ? contact.trim() : null,
      message: question.trim() || null,
    });

    if (error) {
      setSubmitError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setParentName('');
    setContact('');
    setQuestion('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="talk-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#FCFAF6] text-[#171717] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#171717]/10 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F1EFEA] text-[#6B6964] hover:text-[#171717] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Brand Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#171717]/8 pr-10">
          <img
            src={ASSETS.officialLogo}
            alt="Speakory"
            className="h-10 sm:h-12 w-auto max-w-[180px] object-contain drop-shadow-xs"
          />
          <span className="text-[11px] sm:text-xs text-[#7357FF] font-bold uppercase tracking-wider bg-[#E5DEFF]/60 px-3.5 py-1.5 rounded-full">
            Admissions Concierge
          </span>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <span className="tag-chip bg-[#FDC5E3] text-[#9D174D] mb-3">
              Admissions & Parent Concierge
            </span>
            <h3 id="talk-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              Talk with a Mentor
            </h3>
            <p className="text-sm text-[#6B6964] mt-1.5 mb-6 leading-relaxed font-medium">
              Have specific questions about your child’s temperament or curriculum? Our academic directors are happy to chat directly.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  Email or Phone / WhatsApp
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="parent@email.com or +1 (555)..."
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  What would you like to discuss?
                </label>
                <textarea
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Tell us a bit about your child’s age, communication hurdles, or scheduling needs..."
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all resize-none"
                />
              </div>

              {submitError && (
                <p className="text-xs text-rose-500 font-medium text-center">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 px-6 text-sm font-bold text-white bg-[#7357FF] hover:bg-[#5b3ee6] disabled:bg-[#7357FF]/70 disabled:cursor-not-allowed rounded-full shadow-md cursor-pointer transition-all"
              >
                {isSubmitting ? 'Submitting...' : 'Request Mentor Callback'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#D4F0B0] text-[#1E3A8A] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="text-2xl font-bold text-[#171717]">Message Received</h3>
            <p className="text-sm text-[#6B6964] mt-1.5 mb-6 font-medium">
              Thank you, {parentName || 'there'}! A Speakory mentor will reach out within 2 hours.
            </p>
            <button
              onClick={handleReset}
              className="py-2.5 px-6 text-xs font-bold text-white bg-[#171717] hover:bg-[#7357FF] rounded-full cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
