import { lazy, Suspense, useState } from 'react';
import { Navigation } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { WhyCommunication } from './components/WhyCommunication.tsx';
import { MethodPillars } from './components/MethodPillars.tsx';
import { ExperienceDoing } from './components/ExperienceDoing.tsx';
import { ForParentsSection } from './components/ForParentsSection.tsx';
import { FinalCTA } from './components/FinalCTA.tsx';
import { Footer } from './components/Footer.tsx';
import { TrialModal } from './components/TrialModal.tsx';
import { TalkModal } from './components/TalkModal.tsx';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton.tsx';
import { RouterProvider, useRouter } from './lib/router.tsx';

const AdminLogin = lazy(() =>
  import('./pages/admin/AdminLogin.tsx').then((m) => ({ default: m.AdminLogin }))
);
const AdminDashboard = lazy(() =>
  import('./pages/admin/AdminDashboard.tsx').then((m) => ({ default: m.AdminDashboard }))
);

function PublicLanding() {
  const [trialModalOpen, setTrialModalOpen] = useState(false);
  const [talkModalOpen, setTalkModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EBE8FA] text-[#171717] font-sans antialiased overflow-x-hidden selection:bg-[#7357FF]/20 selection:text-[#171717]">
      {/* Top Navigation */}
      <Navigation onOpenTrial={() => setTrialModalOpen(true)} />

      {/* Main Narrative Flow: 6 Clear, Intentional Sections */}
      <main id="main-content">
        {/* Section 1: Cinematic Full-Screen Hero */}
        <Hero onOpenTrial={() => setTrialModalOpen(true)} />

        {/* Section 2: Why Communication Matters (Knowing English isn't enough + 5 questions) */}
        <WhyCommunication />

        {/* Section 3: The Speakory Method (Think -> Speak -> Express -> Connect in one pinned scene) */}
        <MethodPillars />

        {/* Section 4: The Experience (Not another English class + Speak, Discuss, Present, Feedback + Built by Doing) */}
        <ExperienceDoing />

        {/* Section 5: For Parents (Reassurance + Transformation + Benefits + Cohorts + FAQs) */}
        <ForParentsSection />

        {/* Section 6: Final CTA (Ready to be heard? + Book a Free Trial) */}
        <FinalCTA
          onOpenTrial={() => setTrialModalOpen(true)}
          onOpenTalk={() => setTalkModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenTrial={() => setTrialModalOpen(true)}
        onOpenTalk={() => setTalkModalOpen(true)}
      />

      {/* Floating WhatsApp Quick Connect Button */}
      <WhatsAppFloatingButton />

      {/* Interactive Booking & Concierge Modals */}
      <TrialModal
        isOpen={trialModalOpen}
        onClose={() => setTrialModalOpen(false)}
      />

      <TalkModal
        isOpen={talkModalOpen}
        onClose={() => setTalkModalOpen(false)}
      />
    </div>
  );
}

function AppRouter() {
  const { path } = useRouter();

  if (path === '/admin/login') {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-[#7357FF] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AdminLogin />
      </Suspense>
    );
  }

  if (path === '/admin' || path.startsWith('/admin')) {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#FBF9F5] flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-[#7357FF] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AdminDashboard />
      </Suspense>
    );
  }

  return <PublicLanding />;
}

export default function App() {
  return (
    <RouterProvider>
      <AppRouter />
    </RouterProvider>
  );
}
