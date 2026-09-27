import React, { useState, useEffect } from 'react';
import {
  Smartphone,
  Monitor,
  ShoppingBag,
  TrendingUp,
  Layers,
} from 'lucide-react';
import type { PortfolioWork } from '../data/adminStorage';
import { getStoredWorks } from '../data/adminStorage';

export const OurWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'retail' | 'web'>('all');
  const [works, setWorks] = useState<PortfolioWork[]>([]);

  const loadWorks = () => {
    setWorks(getStoredWorks());
  };

  useEffect(() => {
    loadWorks();
    const handleWorksUpdate = () => loadWorks();
    window.addEventListener('gozero_works_updated', handleWorksUpdate);
    return () => window.removeEventListener('gozero_works_updated', handleWorksUpdate);
  }, []);

  const filteredWorks = works.filter((w) => {
    if (activeTab === 'retail') return w.mockupType === 'mobile';
    if (activeTab === 'web') return w.mockupType === 'web';
    return true;
  });

  return (
    <section
      id="works"
      style={{
        padding: '110px 0',
        position: 'relative',
        background: '#181b20',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="pill-badge">
            <Layers size={13} />
            <span>Proven Deployments</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            Our <span className="text-gradient">Success Stories</span>
          </h2>

          <p style={{ color: 'var(--accent-light)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Explore high-performing digital profiles delivered under our zero-upfront model. Each client
            received a free bespoke web platform and native mobile application before paying a single dollar.
          </p>

          {/* Filter Pills */}
          <div
            style={{
              display: 'inline-flex',
              gap: '8px',
              padding: '6px',
              background: 'rgba(34, 38, 46, 0.8)',
              borderRadius: '9999px',
              border: '1px solid var(--border-subtle)',
              marginTop: '32px',
            }}
          >
            <button
              onClick={() => setActiveTab('all')}
              style={{
                background: activeTab === 'all' ? '#ffffff' : 'transparent',
                color: activeTab === 'all' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              All Deliverables ({works.length})
            </button>
            <button
              onClick={() => setActiveTab('retail')}
              style={{
                background: activeTab === 'retail' ? '#ffffff' : 'transparent',
                color: activeTab === 'retail' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Mobile Retail Apps
            </button>
            <button
              onClick={() => setActiveTab('web')}
              style={{
                background: activeTab === 'web' ? '#ffffff' : 'transparent',
                color: activeTab === 'web' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Web Interfaces &amp; Sales CRM
            </button>
          </div>
        </div>

        {/* Structured Mockups Grid */}
        <div className="works-grid">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="glass-card"
              style={{
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Header Info */}
              <div style={{ padding: '28px 28px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {work.mockupType === 'mobile' ? <Smartphone size={13} /> : <Monitor size={13} />}
                    <span>{work.category.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#bac1cc', fontWeight: 600 }}>
                    Client: {work.clientName}
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {work.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--accent-light)', lineHeight: 1.5 }}>
                  {work.description}
                </p>
              </div>

              {/* Realistic Mockup Render based on mockupType */}
              {work.mockupType === 'mobile' ? (
                <div
                  style={{
                    background: '#121417',
                    padding: '28px 20px 0',
                    margin: '0 20px 20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(186, 193, 204, 0.15)',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Phone Frame */}
                  <div
                    style={{
                      maxWidth: '340px',
                      margin: '0 auto',
                      background: '#181b20',
                      borderRadius: '24px 24px 0 0',
                      border: '2px solid rgba(186, 193, 204, 0.25)',
                      borderBottom: 'none',
                      padding: '16px 14px 20px',
                      boxShadow: '0 -10px 25px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* Notch */}
                    <div
                      style={{
                        width: '80px',
                        height: '14px',
                        background: '#121417',
                        borderRadius: '9999px',
                        margin: '0 auto 16px',
                      }}
                    />

                    {/* App Screen Content */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff' }}>
                        {work.clientName.toUpperCase()}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', color: '#bac1cc' }}>
                        <ShoppingBag size={16} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Orders (Live)</span>
                      </div>
                    </div>

                    {/* Featured Product Preview */}
                    <div
                      style={{
                        background: '#22262e',
                        borderRadius: '12px',
                        padding: '12px',
                        border: '1px solid rgba(186, 193, 204, 0.15)',
                        marginBottom: '10px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>Flagship Catalog</div>
                          <div style={{ fontSize: '0.72rem', color: '#bac1cc' }}>Direct-to-Consumer Engine</div>
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>Verified</div>
                      </div>
                      <div
                        style={{
                          marginTop: '10px',
                          background: '#ffffff',
                          color: '#181b20',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          textAlign: 'center',
                          padding: '6px',
                          borderRadius: '6px',
                        }}
                      >
                        1-Click Checkout Active
                      </div>
                    </div>

                    {/* Sales Performance Ticker */}
                    <div
                      style={{
                        background: 'rgba(34, 38, 46, 0.9)',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '10px',
                        padding: '8px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <TrendingUp size={14} color="#bac1cc" />
                        <span style={{ fontSize: '0.7rem', color: '#bac1cc' }}>Performance Metric:</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>
                        {work.revenueMetric}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: '#121417',
                    padding: '16px 16px 0',
                    margin: '0 20px 20px',
                    borderRadius: '16px',
                    border: '1px solid rgba(186, 193, 204, 0.15)',
                    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.6)',
                  }}
                >
                  {/* Browser Bar */}
                  <div
                    style={{
                      background: '#181b20',
                      borderRadius: '12px 12px 0 0',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderBottom: 'none',
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#5a6270' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#5a6270' }} />
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#bac1cc' }} />
                      <div
                        style={{
                          marginLeft: '12px',
                          background: '#22262e',
                          padding: '3px 12px',
                          borderRadius: '6px',
                          fontSize: '0.68rem',
                          color: '#bac1cc',
                          flex: 1,
                        }}
                      >
                        https://portal.{work.clientName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/orders
                      </div>
                    </div>

                    {/* Metrics Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ background: '#22262e', padding: '10px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.65rem', color: '#bac1cc' }}>Delivered Scope</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>Web Platform</div>
                      </div>
                      <div style={{ background: '#22262e', padding: '10px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.65rem', color: '#bac1cc' }}>Upfront Fee</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#bac1cc' }}>$0.00 Paid</div>
                      </div>
                      <div style={{ background: '#22262e', padding: '10px', borderRadius: '8px' }}>
                        <div style={{ fontSize: '0.65rem', color: '#bac1cc' }}>Status</div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>{work.status}</div>
                      </div>
                    </div>

                    {/* Performance banner */}
                    <div
                      style={{
                        background: '#22262e',
                        borderRadius: '8px',
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ fontSize: '0.72rem', color: '#ffffff', fontWeight: 600 }}>
                        {work.revenueMetric}
                      </div>
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.68rem',
                          color: '#bac1cc',
                        }}
                      >
                        Live Earning
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Mandatory Discreet Attribution Footer */}
              <div className="mockup-attribution">
                <span>Production Deployment</span>
                <strong>{work.attribution || 'Built by GoZero Studio (Standard Condition).'}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Client Testimonial / Attribution Callout */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
          }}
        >
          * Standard Condition: Every free digital profile delivered includes standard discreet platform credit
          until agreed enterprise buyout or revenue milestones.
        </div>
      </div>
    </section>
  );
};
