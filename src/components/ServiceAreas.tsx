import React, { useState } from 'react';
import { Globe, Activity } from 'lucide-react';

export const ServiceAreas: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);

  const regions = [
    {
      id: 1,
      name: 'North America',
      countries: 'United States & Canada',
      latency: '18ms',
      status: 'High Capacity',
      description: 'Full-stack enterprise build centers, local merchant gateway compliance, and live account managers.',
      coords: { x: '24%', y: '36%' },
    },
    {
      id: 2,
      name: 'United Kingdom & Europe',
      countries: 'UK, Germany, France, Nordics',
      latency: '24ms',
      status: 'Active Hub',
      description: 'GDPR-hardened free digital profiles with multi-currency sales management and localized VAT billing.',
      coords: { x: '50%', y: '30%' },
    },
    {
      id: 3,
      name: 'Asia Pacific',
      countries: 'Singapore, Japan, Australia, India',
      latency: '28ms',
      status: 'Edge Node Network',
      description: 'Rapid omnichannel retail apps and high-volume order management systems optimized for regional commerce.',
      coords: { x: '78%', y: '48%' },
    },
    {
      id: 4,
      name: 'Middle East & Global Remote',
      countries: 'UAE, Worldwide Distributed Teams',
      latency: '32ms',
      status: '24/7 Continuous',
      description: 'Global remote engineering and customer success teams delivering continuous zero-upfront builds.',
      coords: { x: '60%', y: '44%' },
    },
  ];

  return (
    <section
      id="service-areas"
      style={{
        padding: '110px 0',
        position: 'relative',
        background: 'linear-gradient(180deg, #181b20 0%, #22262e 100%)',
        borderTop: '1px solid rgba(186, 193, 204, 0.1)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="pill-badge">
            <Globe size={13} />
            <span>Worldwide Coverage</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            Global <span className="text-gradient">Service Areas</span>
          </h2>

          <p style={{ color: 'var(--accent-light)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            GoZero Studio partners with organizations worldwide. Regardless of your physical location,
            our zero-upfront model and enterprise infrastructure are ready to deploy for your brand.
          </p>
        </div>

        {/* Minimalist World Map Visual Graphic */}
        <div
          className="glass-card"
          style={{
            padding: '40px 30px',
            position: 'relative',
            overflow: 'hidden',
            background: 'rgba(24, 27, 32, 0.95)',
          }}
        >
          {/* Map Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '28px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(186, 193, 204, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={16} color="#bac1cc" />
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', letterSpacing: '0.04em' }}>
                GLOBAL EDGE DEPLOYMENT NETWORK
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: '#bac1cc',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />
              All Hubs Operational (99.98% SLA)
            </div>
          </div>

          {/* Interactive World Map SVG & Node Overlay */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Minimalist World Map Silhouette (SVG) */}
            <svg
              viewBox="0 0 1000 500"
              style={{
                width: '100%',
                height: 'auto',
                opacity: 0.35,
              }}
            >
              {/* Simplified Minimalist Continents Geometry */}
              {/* North America */}
              <path
                d="M150 100 Q 220 80 290 120 T 310 220 T 260 290 Q 220 260 170 200 Z"
                fill="#2a2f38"
                stroke="#5a6270"
                strokeWidth="1.5"
              />
              {/* South America */}
              <path
                d="M260 300 Q 320 320 310 400 T 270 480 Q 240 430 250 360 Z"
                fill="#2a2f38"
                stroke="#5a6270"
                strokeWidth="1.5"
              />
              {/* Europe */}
              <path
                d="M460 120 Q 520 100 560 140 T 540 220 Q 480 230 450 180 Z"
                fill="#2a2f38"
                stroke="#5a6270"
                strokeWidth="1.5"
              />
              {/* Africa */}
              <path
                d="M460 230 Q 540 230 550 320 T 500 420 Q 450 350 440 280 Z"
                fill="#2a2f38"
                stroke="#5a6270"
                strokeWidth="1.5"
              />
              {/* Asia */}
              <path
                d="M570 110 Q 750 90 820 180 T 780 300 Q 660 320 580 220 Z"
                fill="#2a2f38"
                stroke="#5a6270"
                strokeWidth="1.5"
              />
              {/* Australia */}
              <path
                d="M750 350 Q 840 340 850 420 T 770 440 Q 730 400 750 350 Z"
                fill="#2a2f38"
                stroke="#5a6270"
                strokeWidth="1.5"
              />
            </svg>

            {/* Glowing Interactive Pulse Nodes */}
            {regions.map((reg) => (
              <div
                key={reg.id}
                onClick={() => setSelectedRegion(selectedRegion === reg.id ? null : reg.id)}
                style={{
                  position: 'absolute',
                  left: reg.coords.x,
                  top: reg.coords.y,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 10,
                }}
              >
                {/* Ping wave */}
                <div
                  style={{
                    position: 'absolute',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: 'rgba(186, 193, 204, 0.4)',
                    animation: 'pulse-glow 2.5s infinite',
                    top: '-6px',
                    left: '-6px',
                  }}
                />
                {/* Center dot */}
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '2px solid #181b20',
                    boxShadow: '0 0 12px #ffffff',
                    transition: 'transform 0.2s',
                    transform: selectedRegion === reg.id ? 'scale(1.4)' : 'scale(1)',
                  }}
                />

                {/* Node Label */}
                <div
                  style={{
                    position: 'absolute',
                    top: '22px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(24, 27, 32, 0.9)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {reg.name}
                </div>
              </div>
            ))}
          </div>

          {/* Regional Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              marginTop: '36px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(186, 193, 204, 0.1)',
            }}
          >
            {regions.map((reg) => (
              <div
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                style={{
                  background: selectedRegion === reg.id ? 'rgba(42, 47, 57, 0.9)' : 'rgba(34, 38, 46, 0.6)',
                  border: `1px solid ${selectedRegion === reg.id ? '#ffffff' : 'rgba(186, 193, 204, 0.15)'}`,
                  borderRadius: '14px',
                  padding: '18px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>{reg.name}</div>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      background: 'rgba(186, 193, 204, 0.12)',
                      color: '#bac1cc',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    {reg.latency}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-light)', marginBottom: '8px' }}>
                  {reg.countries}
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: 0 }}>
                  {reg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
