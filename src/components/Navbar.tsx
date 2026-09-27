import React, { useState, useEffect } from 'react';
import { Mail, Phone, ArrowUpRight, Menu, X, Lock } from 'lucide-react';
import { getStoredSettings } from '../data/adminStorage';

interface NavbarProps {
  onOpenFreeBuild: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFreeBuild, onOpenAdmin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState(getStoredSettings());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleSettingsUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('gozero_settings_updated', handleSettingsUpdate);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('gozero_settings_updated', handleSettingsUpdate);
    };
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(24, 27, 32, 0.92)' : 'rgba(24, 27, 32, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(186, 193, 204, 0.18)' : 'rgba(186, 193, 204, 0.08)'}`,
        boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Minimalist GoZero Studio Logo (integrating '0' and subtle upward arrow) */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {/* Logo Emblem Icon */}
          <div
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              overflow: 'hidden',
              background: '#22262e',
              border: '1px solid rgba(186, 193, 204, 0.3)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/logo.jpg"
              alt="GoZero Studio Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '0.02em',
                  color: '#ffffff',
                }}
              >
                Go<span style={{ color: '#bac1cc' }}>Zero</span>
              </span>
              {/* Subtle upward arrow integrated with zero concept */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  background: 'rgba(186, 193, 204, 0.15)',
                  color: '#bac1cc',
                }}
              >
                <ArrowUpRight size={12} strokeWidth={2.5} />
              </div>
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: '#5a6270',
                textTransform: 'uppercase',
                marginTop: '-2px',
              }}
            >
              STUDIO
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
          className="desktop-nav"
        >
          <a
            href="#about"
            style={{
              color: '#bac1cc',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac1cc')}
          >
            About Us
          </a>
          <a
            href="#works"
            style={{
              color: '#bac1cc',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac1cc')}
          >
            Our Works
          </a>
          <a
            href="#service-areas"
            style={{
              color: '#bac1cc',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac1cc')}
          >
            Service Areas
          </a>
          <a
            href="#news"
            style={{
              color: '#bac1cc',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac1cc')}
          >
            News
          </a>
          <a
            href="#contact"
            style={{
              color: '#bac1cc',
              fontSize: '0.9rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#bac1cc')}
          >
            Contact Us
          </a>
        </nav>

        {/* Distinct Action Buttons: Email and Phone */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
          className="desktop-actions"
        >
          {/* Distinct Email Button */}
          <a
            href={`mailto:${settings.email}`}
            className="btn-outline"
            title={`Email GoZero Studio (${settings.email})`}
          >
            <Mail size={15} />
            <span>Email</span>
          </a>

          {/* Distinct Phone Button */}
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="btn-secondary"
            title={`Call GoZero Studio (${settings.phone})`}
          >
            <Phone size={15} />
            <span>Phone</span>
          </a>

          {/* Admin Portal Button */}
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(186, 193, 204, 0.2)',
              borderRadius: '9999px',
              padding: '10px 14px',
              color: '#bac1cc',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
            title="Admin Portal (Secure Login)"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#bac1cc';
              e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.2)';
            }}
          >
            <Lock size={14} />
            <span>Admin</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenFreeBuild}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.85rem' }}
          >
            Start Free Build
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '8px',
          }}
          className="mobile-toggle"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#181b20',
            borderTop: '1px solid rgba(186, 193, 204, 0.15)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}
          >
            About Us
          </a>
          <a
            href="#works"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}
          >
            Our Works
          </a>
          <a
            href="#service-areas"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}
          >
            Service Areas
          </a>
          <a
            href="#news"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}
          >
            News
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem', fontWeight: 600 }}
          >
            Contact Us
          </a>

          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <a href={`mailto:${settings.email}`} className="btn-outline" style={{ flex: 1 }}>
              <Mail size={16} /> Email
            </a>
            <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="btn-secondary" style={{ flex: 1 }}>
              <Phone size={16} /> Phone
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="btn-outline"
              style={{ flex: 1, gap: '4px' }}
            >
              <Lock size={14} /> Admin
            </button>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFreeBuild();
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '8px' }}
          >
            Start Your Free Build
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
};
