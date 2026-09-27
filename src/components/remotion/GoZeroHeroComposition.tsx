import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';

export const GoZeroHeroComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring physics
  const logoSpring = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 90,
      mass: 0.8,
    },
  });

  const textSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const timelineSpring = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 85 },
  });

  // Timeline Progress calculation (0 to 100%)
  const progressPercent = interpolate(frame, [30, 110], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  // Sheen light sweep across logo
  const sheenX = interpolate(frame, [15, 65, 115, 165], [-120, 220, -120, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle 3D tilt & floating effect
  const floatY = Math.sin((frame / fps) * 2 * Math.PI * 0.4) * 8;
  const rotateY = Math.sin((frame / fps) * 2 * Math.PI * 0.25) * 5;
  const rotateX = Math.cos((frame / fps) * 2 * Math.PI * 0.25) * 3;

  // Active step index on timeline
  const activeStep = Math.min(4, Math.floor((progressPercent / 100) * 5));

  const steps = [
    { title: 'Concept', cost: '$0' },
    { title: 'Free Build', cost: '$0' },
    { title: 'Launch', cost: '$0' },
    { title: 'Client Revenue', cost: 'Active' },
    { title: 'Shared Success', cost: 'Win-Win' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#181b20',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: '#ffffff',
        overflow: 'hidden',
        perspective: 1200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}
    >
      {/* Background ambient gradient glow */}
      <div
        style={{
          position: 'absolute',
          width: 800,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(186, 193, 204, 0.12) 0%, rgba(34, 38, 46, 0.05) 50%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Ambient grid lines in Remotion */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(to right, rgba(186, 193, 204, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(186, 193, 204, 0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Main 3D Tilted Showcase Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1100px',
          background: 'rgba(34, 38, 46, 0.85)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          border: '1px solid rgba(186, 193, 204, 0.25)',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          padding: '40px 48px',
          transform: `translateY(${floatY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${logoSpring})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top Bar with Live Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '28px',
            borderBottom: '1px solid rgba(186, 193, 204, 0.12)',
            paddingBottom: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Logo Emblem */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(186, 193, 204, 0.4)',
                boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                background: '#181b20',
                position: 'relative',
              }}
            >
              <img
                src="/logo.jpg"
                alt="GoZero Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {/* Sheen effect */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  transform: `translateX(${sheenX}%)`,
                }}
              />
            </div>
            <div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  fontSize: '18px',
                  color: '#ffffff',
                }}
              >
                GOZERO STUDIO
              </span>
              <div style={{ fontSize: '11px', color: '#bac1cc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Zero Risk Partnership Model
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(24, 27, 32, 0.9)',
              border: '1px solid rgba(186, 193, 204, 0.2)',
              fontSize: '12px',
              fontWeight: 600,
              color: '#bac1cc',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 10px #ffffff',
              }}
            />
            LIVE PROGRAMMATIC VERIFICATION
          </div>
        </div>

        {/* Central Value Proposition Reel */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Kinetic Text & Tagline */}
          <div style={{ opacity: Math.max(0, textSpring) }}>
            <div
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(186, 193, 204, 0.1)',
                border: '1px solid rgba(186, 193, 204, 0.25)',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                color: '#bac1cc',
                letterSpacing: '0.06em',
                marginBottom: '12px',
              }}
            >
              ZERO UPFRONT CAPITAL REQUIRED
            </div>

            <h2
              style={{
                fontSize: '34px',
                fontWeight: 800,
                lineHeight: 1.2,
                margin: '0 0 14px 0',
                background: 'linear-gradient(135deg, #ffffff 0%, #bac1cc 70%, #5a6270 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              NO REVENUE, NO FEES.
            </h2>

            <p style={{ fontSize: '15px', color: '#bac1cc', lineHeight: 1.5, margin: 0 }}>
              We build your organization's entire digital presence (custom website & native applications)
              at zero upfront cost. We only succeed when you generate tangible revenue.
            </p>
          </div>

          {/* Right Column: Live Metric Status Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
            }}
          >
            <div
              style={{
                background: '#181b20',
                border: '1px solid rgba(186, 193, 204, 0.2)',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '11px', color: '#5a6270', textTransform: 'uppercase', fontWeight: 700 }}>
                Initial Cost
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>
                $0.00
              </div>
              <div style={{ fontSize: '10px', color: '#bac1cc' }}>Zero Upfront Deposit</div>
            </div>

            <div
              style={{
                background: '#181b20',
                border: '1px solid rgba(186, 193, 204, 0.2)',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '11px', color: '#5a6270', textTransform: 'uppercase', fontWeight: 700 }}>
                Client Risk
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: '#bac1cc', margin: '4px 0' }}>
                0%
              </div>
              <div style={{ fontSize: '10px', color: '#ffffff' }}>Performance Bound</div>
            </div>

            <div
              style={{
                gridColumn: 'span 2',
                background: 'linear-gradient(135deg, rgba(34, 38, 46, 0.9), rgba(24, 27, 32, 0.95))',
                border: '1px solid rgba(186, 193, 204, 0.3)',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', color: '#bac1cc', fontWeight: 600 }}>DELIVERABLES INCLUDED</div>
                <div style={{ fontSize: '13px', color: '#ffffff', fontWeight: 700 }}>Web Platform + Mobile App + Sales CRM</div>
              </div>
              <div
                style={{
                  background: '#ffffff',
                  color: '#181b20',
                  fontWeight: 800,
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                FREE BUILD
              </div>
            </div>
          </div>
        </div>

        {/* Animated Horizontal Timeline */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(186, 193, 204, 0.12)',
            opacity: Math.max(0, timelineSpring),
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span style={{ fontSize: '11px', color: '#bac1cc', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              PROGRESSION TO REVENUE TIMELINE
            </span>
            <span style={{ fontSize: '11px', color: '#ffffff', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
              {Math.round(progressPercent)}% PHASE VERIFIED
            </span>
          </div>

          {/* Timeline Bar */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(90, 98, 112, 0.4)',
              borderRadius: '9999px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${progressPercent}%`,
                background: 'linear-gradient(90deg, #5a6270 0%, #bac1cc 50%, #ffffff 100%)',
                boxShadow: '0 0 10px #ffffff',
              }}
            />
          </div>

          {/* Timeline Steps Display */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {steps.map((st, i) => {
              const isPastOrCurrent = i <= activeStep;
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: isPastOrCurrent ? '#ffffff' : '#22262e',
                      color: isPastOrCurrent ? '#181b20' : '#5a6270',
                      border: `2px solid ${isPastOrCurrent ? '#ffffff' : '#5a6270'}`,
                      fontSize: '11px',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isPastOrCurrent ? '0 0 12px rgba(255,255,255,0.7)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    0{i + 1}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: isPastOrCurrent ? 700 : 500,
                      color: isPastOrCurrent ? '#ffffff' : '#5a6270',
                    }}
                  >
                    {st.title}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      color: isPastOrCurrent ? '#bac1cc' : '#5a6270',
                      fontWeight: 600,
                    }}
                  >
                    {st.cost}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
