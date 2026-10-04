import { useState, FormEvent } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { ASSETS } from '../data/assets.ts';
import { submitLead } from '../lib/supabase.ts';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TrialModal({ isOpen, onClose }: TrialModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    studentAge: '13-15',
    studentName: '',
    primaryGoal: 'Public speaking & presentations',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    preferredDay: '6:00 PM – 7:00 PM',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.studentName.trim()) {
      errs.studentName = "Please enter student's first name";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.parentName.trim()) {
      errs.parentName = "Please enter parent's name";
    }
    if (!formData.parentEmail.trim() || !formData.parentEmail.includes('@')) {
      errs.parentEmail = 'Please provide a valid email address';
    }
    if (!formData.parentPhone.trim() || formData.parentPhone.length < 7) {
      errs.parentPhone = 'Please provide a phone number for studio link';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep2() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const { error } = await submitLead({
      type: 'trial',
      parent_name: formData.parentName.trim(),
      student_name: formData.studentName.trim(),
      age_group: formData.studentAge,
      phone: formData.parentPhone.trim(),
      email: formData.parentEmail.trim() || null,
      goal: formData.primaryGoal,
      preferred_day: formData.preferredDay,
      preferred_time: formData.preferredDay,
    });

    if (error) {
      setSubmitError('Something went wrong. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(false);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setIsSubmitting(false);
    setSubmitError(null);
    setFormData({
      studentAge: '13-15',
      studentName: '',
      primaryGoal: 'Public speaking & presentations',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      preferredDay: '6:00 PM – 7:00 PM',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-xl bg-[#FCFAF6] text-[#171717] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#171717]/10 overflow-hidden">
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
            Free Trial Session
          </span>
        </div>

        {/* STEP 1: Student Profile */}
        {step === 1 && (
          <div>
            <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-3">
              Step 1 of 2 · Student Profile
            </span>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              Book a Free Trial Session
            </h3>
            <p className="text-sm text-[#6B6964] mt-1.5 mb-6 font-medium">
              A 45-minute zero-pressure live speaking diagnostic with 3–4 peers.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5">
                  Student's First Name
                </label>
                <input
                  type="text"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="e.g. Leo, Maya, Marcus"
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
                {errors.studentName && (
                  <p className="text-xs text-rose-500 mt-1">{errors.studentName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5">
                  Age Group Cohort
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['10-12', '13-15', '16-18'].map((age) => (
                    <button
                      type="button"
                      key={age}
                      onClick={() => setFormData({ ...formData, studentAge: age })}
                      className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        formData.studentAge === age
                          ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
                          : 'bg-white text-[#6B6964] border-[#171717]/10 hover:border-[#171717]/25'
                      }`}
                    >
                      Ages {age}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5">
                  What would help them most right now?
                </label>
                <div className="space-y-1.5">
                  {[
                    'Overcoming hesitation & shy speaking',
                    'Public speaking & class presentations',
                    'Impromptu agility (thinking on their feet)',
                    'Debate, persuasion & group discussions',
                  ].map((goal) => (
                    <label
                      key={goal}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                        formData.primaryGoal === goal
                          ? 'bg-white border-[#7357FF] text-[#171717] shadow-xs'
                          : 'bg-white/60 border-transparent hover:bg-white text-[#6B6964]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        checked={formData.primaryGoal === goal}
                        onChange={() => setFormData({ ...formData, primaryGoal: goal })}
                        className="accent-[#7357FF]"
                      />
                      <span>{goal}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full mt-5 py-3 px-6 text-sm font-bold text-white bg-[#171717] hover:bg-[#7357FF] rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
              >
                <span>Continue to Schedule</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Parent Contact */}
        {step === 2 && (
          <form onSubmit={handleSubmit}>
            <span className="tag-chip bg-[#C8E5FF] text-[#1E40AF] mb-3">
              Step 2 of 2 · Parent Contact
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              Where should we send the invite?
            </h3>
            <p className="text-sm text-[#6B6964] mt-1.5 mb-6 font-medium">
              Parent attendance is welcome during the 5-minute welcome & wrap-up.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Your full name"
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
                {errors.parentName && (
                  <p className="text-xs text-rose-500 mt-1">{errors.parentName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  Parent Email (For Studio link)
                </label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                  placeholder="parent@example.com"
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
                {errors.parentEmail && (
                  <p className="text-xs text-rose-500 mt-1">{errors.parentEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  Mobile / WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
                {errors.parentPhone && (
                  <p className="text-xs text-rose-500 mt-1">{errors.parentPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1">
                  Preferred Slot Timing (For Booking Call)
                </label>
                <select
                  value={formData.preferredDay}
                  onChange={(e) => setFormData({ ...formData, preferredDay: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#171717]/12 rounded-xl text-sm text-[#171717] focus:outline-hidden focus:border-[#7357FF] transition-all cursor-pointer"
                >
                  <option value="6:00 PM – 7:00 PM">6:00 PM – 7:00 PM</option>
                  <option value="7:00 PM – 8:00 PM">7:00 PM – 8:00 PM</option>
                  <option value="8:00 PM – 9:00 PM">8:00 PM – 9:00 PM</option>
                </select>
              </div>

              {submitError && (
                <p className="text-xs text-rose-500 font-medium text-center pt-1">{submitError}</p>
              )}

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="px-4 py-2.5 text-xs font-bold text-[#6B6964] hover:text-[#171717] rounded-full transition-colors cursor-pointer disabled:opacity-50"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 text-sm font-bold text-white bg-[#7357FF] hover:bg-[#5b3ee6] disabled:bg-[#7357FF]/70 disabled:cursor-not-allowed rounded-full shadow-md cursor-pointer transition-all"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Free Trial Booking'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* STEP 3: Confirmed */}
        {step === 3 && (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-[#D4F0B0] text-[#1E3A8A] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <CheckCircle2 size={30} />
            </div>

            <span className="tag-chip bg-[#D4F0B0] text-[#1E3A8A] mb-2">
              Registration Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
              {formData.studentName}'s spot is reserved!
            </h3>
            <p className="text-xs sm:text-sm text-[#6B6964] mt-2 mb-6 max-w-sm mx-auto leading-relaxed font-medium">
              We’ve dispatched the private studio link and prep guide to{' '}
              <strong className="text-[#171717]">{formData.parentEmail}</strong>.
            </p>

            <button
              onClick={handleReset}
              className="py-2.5 px-8 text-sm font-bold text-white bg-[#171717] hover:bg-[#7357FF] rounded-full transition-all cursor-pointer shadow-md"
            >
              Done & Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
