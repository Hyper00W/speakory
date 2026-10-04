import React, { useState, useEffect, FormEvent } from 'react';
import { Lock, Mail, ArrowLeft, AlertCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured, getLocalAdminSession, setLocalAdminSession } from '../../lib/supabase.ts';
import { useRouter } from '../../lib/router.tsx';
import { ASSETS } from '../../data/assets.ts';

export function AdminLogin() {
  const { navigate } = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Check if admin is already logged in
  useEffect(() => {
    async function checkExistingSession() {
      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            navigate('/admin');
            return;
          }
        } catch (err) {
          console.error('Session check error:', err);
        }
      } else {
        const localSession = getLocalAdminSession();
        if (localSession) {
          navigate('/admin');
        }
      }
    }
    checkExistingSession();
  }, [navigate]);

  const handleQuickFill = () => {
    setEmail('admin@speakory.com');
    setPassword('admin123');
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);

      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message || 'Invalid email or password.');
          setLoading(false);
          return;
        }

        if (data.session) {
          navigate('/admin');
        }
      } else {
        // Local Demo Mode authentication
        setLocalAdminSession({ email: email.trim() });
        navigate('/admin');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during login.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#171717] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Back Link */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B6964] hover:text-[#171717] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Speakory</span>
        </button>

        {/* Brand Header */}
        <div className="text-center">
          <img
            src={ASSETS.officialLogo}
            alt="Speakory"
            className="h-10 mx-auto object-contain mb-3"
          />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5DEFF] text-[#5538EE] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={14} />
            <span>Admin Portal</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#171717]">
            Sign in to Speakory Admin
          </h2>
          <p className="mt-1 text-xs text-[#6B6964]">
            Restricted access for admissions & team members
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-[#E5E3DD] rounded-2xl">
          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 rounded-xl bg-[#F4F1FF] border border-[#DDD6FE] text-[#4C1D95] text-xs leading-relaxed">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold flex items-center gap-1.5 text-[#5538EE]">
                  <Sparkles size={14} /> Quick Demo Mode
                </span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="px-2 py-0.5 bg-[#7357FF] hover:bg-[#5B3EE6] text-white text-[10px] font-bold rounded-md cursor-pointer transition-all"
                >
                  Auto Fill
                </button>
              </div>
              <p className="text-[11px] text-[#5538EE]/80">
                You can log in right now using <strong>admin@speakory.com</strong> / <strong>admin123</strong> to test the panel. Once you set Supabase keys in <code className="bg-white/80 px-1 py-0.5 rounded">.env</code>, it will connect to your real database.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6964]">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@speakory.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5D3CC] rounded-xl text-sm text-[#171717] placeholder-[#9E9B95] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B6964]">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5D3CC] rounded-xl text-sm text-[#171717] placeholder-[#9E9B95] focus:outline-hidden focus:border-[#7357FF] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#7357FF] hover:bg-[#5B3EE6] disabled:bg-[#7357FF]/70 text-white font-semibold text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#F0EEE9] text-center">
            <p className="text-[11px] text-[#8C8880] leading-relaxed">
              No public registration. User accounts must be created directly by an administrator via the Supabase Auth dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
