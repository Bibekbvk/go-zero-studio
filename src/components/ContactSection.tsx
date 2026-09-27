import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ArrowUpRight,
  Lock,
} from 'lucide-react';
import { addStoredInquiry, getStoredSettings } from '../data/adminStorage';

interface ContactSectionProps {
  onOpenAdmin?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenAdmin }) => {
  const [settings, setSettings] = useState(getStoredSettings());

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('gozero_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('gozero_settings_updated', handleSettingsUpdate);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    platform: 'Both Web & Mobile App',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStoredInquiry({
      name: formData.name,
      organization: formData.organization,
      email: formData.email,
      phone: formData.phone,
      platform: formData.platform,
      currentRevenue: 'Standard Lead',
      message: formData.message,
    });
    setSubmitted(true);
  };

  return (
    <footer
      id="contact"
      style={{
        paddingTop: '120px',
        paddingBottom: '60px',
        position: 'relative',
        background: '#121417',
        borderTop: '1px solid rgba(186, 193, 204, 0.15)',
      }}
    >
      <div className="container">
        {/* Large Prominent CONTACT US Header */}
        <div style={{ textAlign: 'center', marginBottom: '70px' }}>
          <div className="pill-badge">
            <Mail size={13} />
            <span>Direct Commercial Inquiries</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              margin: '0 auto 18px',
            }}
          >
            CONTACT <span className="text-gradient">US</span>
          </h2>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--accent-light)',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Ready to claim your organization's Free Digital Profile? Let's discuss your custom build
            with complete cost transparency and zero upfront commitment.
          </p>
        </div>

        {/* Contact Grid: Direct Info + Application Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            marginBottom: '90px',
          }}
        >
          {/* Left Column: Direct Placeholders & Channels */}
          <div
            className="glass-card"
            style={{
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'rgba(24, 27, 32, 0.95)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--accent-light)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '10px',
                }}
              >
                Executive Communications
              </div>

              <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ffffff', marginBottom: '24px' }}>
                We Speak Directly. No Sales Gimmicks.
              </h3>

              <p style={{ color: 'var(--accent-light)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '32px' }}>
                Reach our enterprise engineering leads directly via verified email or dedicated phone support line.
                Initial technical audits and scope plans are delivered within 24 hours.
              </p>

              {/* Distinct Email Placeholder Card */}
              <a
                href={`mailto:${settings.email}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 20px',
                  background: 'rgba(34, 38, 46, 0.8)',
                  borderRadius: '14px',
                  border: '1px solid rgba(186, 193, 204, 0.15)',
                  marginBottom: '16px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.15)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Official Email Address
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {settings.email}
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ marginLeft: 'auto', color: '#bac1cc' }} />
              </a>

              {/* Distinct Phone Placeholder Card */}
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 20px',
                  background: 'rgba(34, 38, 46, 0.8)',
                  borderRadius: '14px',
                  border: '1px solid rgba(186, 193, 204, 0.15)',
                  marginBottom: '32px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ffffff';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.15)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    Toll-Free Phone Number
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    {settings.phone}
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ marginLeft: 'auto', color: '#bac1cc' }} />
              </a>
            </div>

            {/* Social Media Icons */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                }}
              >
                Follow &amp; Connect On Social Media
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {settings.socialLinks.linkedin && (
                  <a
                    href={settings.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(34, 38, 46, 0.8)',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bac1cc',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#bac1cc';
                      e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                )}

                {settings.socialLinks.twitter && (
                  <a
                    href={settings.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="X (Twitter)"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(34, 38, 46, 0.8)',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bac1cc',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#bac1cc';
                      e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}

                {settings.socialLinks.github && (
                  <a
                    href={settings.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(34, 38, 46, 0.8)',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bac1cc',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#bac1cc';
                      e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  </a>
                )}

                {settings.socialLinks.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(34, 38, 46, 0.8)',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bac1cc',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#bac1cc';
                      e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                )}

                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(34, 38, 46, 0.8)',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bac1cc',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#bac1cc';
                      e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                )}

                {settings.socialLinks.youtube && (
                  <a
                    href={settings.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="YouTube"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: 'rgba(34, 38, 46, 0.8)',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#bac1cc',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#bac1cc';
                      e.currentTarget.style.borderColor = 'rgba(186, 193, 204, 0.18)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Free Build Form */}
          <div
            className="glass-card"
            style={{
              padding: '40px',
              background: 'rgba(24, 27, 32, 0.95)',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Claim Your Free Build Consultation
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--accent-light)' }}>
                Fill in your project details. Zero payment methods requested. Zero upfront charges.
              </p>
            </div>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(34, 38, 46, 0.9)',
                  border: '1px solid rgba(186, 193, 204, 0.4)',
                  borderRadius: '16px',
                  padding: '36px 24px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    color: '#181b20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  Application Received!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--accent-light)', lineHeight: 1.5 }}>
                  Our lead solutions architect will review your organization's digital profile requirements
                  and reach out via <strong>{formData.email || 'your email'}</strong> within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline"
                  style={{ marginTop: '20px' }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#181b20',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                      Organization / Brand Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vance Retail Ltd."
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#181b20',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                      Business Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#181b20',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        background: '#181b20',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '10px',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                    Desired Free Build Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#181b20',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                  >
                    <option value="Both Web & Mobile App">Both Free Website &amp; Free Native Mobile App</option>
                    <option value="Custom E-Commerce Platform">High-Converting E-Commerce Web Platform</option>
                    <option value="Native Mobile Retail App">Native Mobile App (iOS &amp; Android)</option>
                    <option value="Enterprise Portal & Orders CRM">Enterprise Portal &amp; Orders CRM Engine</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                    Describe Your Current Business Goals &amp; Products
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what products/services you sell and your target revenue audience..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: '#181b20',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'none',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', marginTop: '6px' }}
                >
                  <Send size={16} />
                  <span>Start Your Free Build ($0 Upfront)</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div
          style={{
            borderTop: '1px solid rgba(186, 193, 204, 0.1)',
            paddingTop: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#181b20',
                border: '1px solid rgba(186, 193, 204, 0.2)',
              }}
            >
              <img src="/logo.jpg" alt="GoZero Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} GoZero Studio. All rights reserved. Precision Engineering.
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '0.8rem', color: 'var(--accent-light)', flexWrap: 'wrap' }}>
            <span>Zero Upfront Model</span>
            <span>No Revenue, No Fees</span>
            <span>No Hidden Fees Guarantee</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
              >
                <Lock size={12} />
                <span>Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
