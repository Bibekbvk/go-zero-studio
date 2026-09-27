import React, { useRef, useState } from 'react';
import { Player } from '@remotion/player';
import type { PlayerRef } from '@remotion/player';
import { GoZeroHeroComposition } from './remotion/GoZeroHeroComposition';
import { ArrowRight, ShieldCheck, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenFreeBuild: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenFreeBuild }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStep, setActiveStep] = useState(3); // default highlight on Client Revenue

  const timelineSteps = [
    { id: 1, label: 'Concept', sublabel: 'Design & Strategy', cost: '$0 Upfront' },
    { id: 2, label: 'Free Build', sublabel: 'Full Web & App Dev', cost: '$0 Upfront' },
    { id: 3, label: 'Launch', sublabel: 'Deployment & Setup', cost: '$0 Upfront' },
    { id: 4, label: 'Client Revenue', sublabel: 'Sales Generating', cost: 'Only When Earning' },
    { id: 5, label: 'Shared Success', sublabel: 'Transparent Growth', cost: 'Aligned Terms' },
  ];

  const togglePlayback = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const restartPlayback = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0);
    playerRef.current.play();
    setIsPlaying(true);
  };

  return (
    <section
      id="about"
      style={{
        paddingTop: '150px',
        paddingBottom: '90px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        {/* Top Trust Badge */}
        <div style={{ textAlign: 'center' }}>
          <div className="pill-badge">
            <span className="dot" />
            <span>Guaranteed Risk-Free Partnership</span>
          </div>

          {/* Powerful, Minimalist Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.8vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              maxWidth: '1050px',
              margin: '0 auto 20px',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            GOZERO STUDIO:{' '}
            <span className="text-gradient">YOUR DIGITAL PROFILE, ZERO UPFRONT.</span>{' '}
            <span style={{ color: '#ffffff', display: 'inline-block' }}>NO REVENUE, NO FEES.</span>
          </h1>

          {/* Clear Sub-headline Detailing the Partnership Model */}
          <p
            style={{
              fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
              color: 'var(--accent-light)',
              maxWidth: '820px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            We provide your organization a <strong>Free Digital Profile (Free Website & Free Application)</strong>{' '}
            before you start earning from our products.
          </p>

          {/* Call-to-Action Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            <button
              onClick={onOpenFreeBuild}
              className="btn-primary"
              style={{ padding: '16px 36px', fontSize: '1.05rem' }}
            >
              <span>Start Your Free Build</span>
              <ArrowRight size={18} />
            </button>

            <a
              href="#promises"
              className="btn-secondary"
              style={{ padding: '16px 28px', fontSize: '0.95rem' }}
            >
              <ShieldCheck size={18} />
              <span>Explore Guarantee Rules</span>
            </a>
          </div>
        </div>

        {/* Subtle Illustrative Graphic: Progress Timeline */}
        <div style={{ margin: '0 auto 56px', maxWidth: '1050px' }}>
          <div
            style={{
              textAlign: 'center',
              marginBottom: '12px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
            }}
          >
            The Zero-Risk Commercial Journey ($0 Cost Until Revenue)
          </div>

          <div className="timeline-track">
            <div className="timeline-line-bg" />
            <div
              className="timeline-line-progress"
              style={{
                width: `${(activeStep / (timelineSteps.length - 1)) * 100}%`,
              }}
            />

            {timelineSteps.map((step, index) => {
              const isActive = index <= activeStep;
              const isRevenue = step.id >= 4;

              return (
                <div
                  key={step.id}
                  className={`timeline-step ${isActive ? 'active' : ''} ${isRevenue ? 'revenue' : ''}`}
                  onClick={() => setActiveStep(index)}
                  style={{ cursor: 'pointer' }}
                  title={`Phase ${step.id}: ${step.label} (${step.cost})`}
                >
                  <div className="timeline-node">
                    {step.id}
                  </div>
                  <div className="timeline-label">
                    {step.label}
                  </div>
                  <div className="timeline-sublabel">
                    {step.cost}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Attractive Programmatic Animation via Embedded Remotion Player */}
        <div
          style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {/* Ambient Sheen & Border Frame */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(186, 193, 204, 0.15)',
              border: '1px solid rgba(186, 193, 204, 0.25)',
              background: '#181b20',
              position: 'relative',
            }}
          >
            {/* Top Player Control Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                background: 'rgba(34, 38, 46, 0.95)',
                borderBottom: '1px solid rgba(186, 193, 204, 0.12)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    letterSpacing: '0.04em',
                  }}
                >
                  <Sparkles size={15} color="#bac1cc" />
                  <span>REMOTION MOTION UI REEL</span>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    background: 'rgba(186, 193, 204, 0.1)',
                    color: '#bac1cc',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                  }}
                >
                  60 FPS Procedural
                </span>
              </div>

              {/* Player Quick Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={togglePlayback}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    color: '#ffffff',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  title={isPlaying ? 'Pause Animation' : 'Play Animation'}
                >
                  {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                  <span>{isPlaying ? 'Pause' : 'Play'}</span>
                </button>

                <button
                  onClick={restartPlayback}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    color: '#bac1cc',
                    borderRadius: '8px',
                    padding: '6px 10px',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                  title="Replay from frame 0"
                >
                  <RotateCcw size={13} />
                </button>
              </div>
            </div>

            {/* The Remotion Player */}
            <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#181b20' }}>
              <Player
                ref={playerRef}
                component={GoZeroHeroComposition}
                durationInFrames={180}
                compositionWidth={1920}
                compositionHeight={1080}
                fps={30}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                controls={false}
                autoPlay
                loop
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
