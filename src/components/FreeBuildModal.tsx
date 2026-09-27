import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Send, Gift } from 'lucide-react';

import { addStoredInquiry } from '../data/adminStorage';

interface FreeBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeBuildModal: React.FC<FreeBuildModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    currentRevenue: '$0 - Just starting out',
    platform: 'Free Web & Native Mobile App Bundle',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStoredInquiry({
      name: formData.contactName,
      organization: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      platform: formData.platform,
      currentRevenue: formData.currentRevenue,
      message: formData.notes || 'Submitted via Start Your Free Build Modal',
    });
    setSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(18, 20, 24, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '36px',
          background: '#181b20',
          border: '1px solid rgba(186, 193, 204, 0.3)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 30px rgba(186, 193, 204, 0.2)',
          position: 'relative',
          borderRadius: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(186, 193, 204, 0.2)',
            color: '#bac1cc',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#bac1cc')}
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#ffffff',
                color: '#181b20',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Free Build Application Approved
            </h3>

            <p style={{ color: 'var(--accent-light)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Thank you, <strong>{formData.contactName || 'Partner'}</strong>. Your application for a{' '}
              <strong>{formData.platform}</strong> has been logged under our zero-upfront guarantee.
              Our technical director will contact you within 24 hours with your blueprint.
            </p>

            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
              Back to Overview
            </button>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Gift size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  Start Your Free Build
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#bac1cc', fontWeight: 600 }}>
                  $0 Upfront • No Revenue, No Fees Guarantee
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--accent-light)', margin: '14px 0 20px', lineHeight: 1.5 }}>
              Receive a bespoke web platform and mobile application built by our senior engineers before paying anything.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                  Organization / Business Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Omnichannel"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#121417',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#121417',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@business.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: '#121417',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.88rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                  Deliverable Scope
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#121417',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none',
                  }}
                >
                  <option value="Free Web & Native Mobile App Bundle">Free Web Platform + Native Mobile App</option>
                  <option value="High-Performance E-Commerce Web Platform">High-Performance E-Commerce Web Platform</option>
                  <option value="Native Mobile Retail App (iOS & Android)">Native Mobile Retail App (iOS &amp; Android)</option>
                  <option value="Enterprise Portal & Sales CRM">Enterprise Portal &amp; Integrated Sales CRM</option>
                </select>
              </div>

              <div
                style={{
                  background: 'rgba(34, 38, 46, 0.6)',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(186, 193, 204, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.75rem',
                  color: 'var(--accent-light)',
                }}
              >
                <ShieldCheck size={16} color="#ffffff" />
                <span>Zero upfront billing information or credit cards requested.</span>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '12px', marginTop: '6px' }}
              >
                <Send size={15} />
                <span>Confirm &amp; Begin Free Build</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
