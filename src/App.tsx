import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CorePromises } from './components/CorePromises';
import { OurWorks } from './components/OurWorks';
import { NewsSection } from './components/NewsSection';
import { ServiceAreas } from './components/ServiceAreas';
import { ContactSection } from './components/ContactSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { FreeBuildModal } from './components/FreeBuildModal';
import { AdminPanel } from './components/Admin/AdminPanel';

export const App: React.FC = () => {
  const [freeBuildModalOpen, setFreeBuildModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Detect #admin in URL or Ctrl+Shift+A shortcut
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen((prev) => !prev);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCloseAdmin = () => {
    setAdminOpen(false);
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  return (
    <div className="app-root" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background Mesh Grid Pattern */}
      <div className="bg-mesh-pattern" />

      {/* Fixed Header & Navigation */}
      <Navbar
        onOpenFreeBuild={() => setFreeBuildModalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Landing Sections */}
      <main>
        {/* Hero Section with Remotion Motion Animation & Progress Timeline */}
        <Hero onOpenFreeBuild={() => setFreeBuildModalOpen(true)} />

        {/* Core Promises & Business Logic Grid */}
        <CorePromises />

        {/* Our Works Portfolio Showcase */}
        <OurWorks />

        {/* Studio Journal & News Section */}
        <NewsSection />

        {/* Service Areas & Minimalist World Map */}
        <ServiceAreas />

        {/* Footer & Contact Us */}
        <ContactSection onOpenAdmin={() => setAdminOpen(true)} />
      </main>

      {/* Mandatory Floating WhatsApp Interactive Element */}
      <WhatsAppFloatingButton />

      {/* Interactive Free Build Modal */}
      <FreeBuildModal
        isOpen={freeBuildModalOpen}
        onClose={() => setFreeBuildModalOpen(false)}
      />

      {/* Admin Panel Modal / Dashboard */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={handleCloseAdmin}
      />
    </div>
  );
};

export default App;
