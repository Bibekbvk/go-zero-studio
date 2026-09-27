import React from 'react';
import {
  Gift,
  CircleSlash2,
  LayoutDashboard,
  Wrench,
  Lock,
  CheckCircle2,
  Shield,
  FileCheck,
} from 'lucide-react';

export const CorePromises: React.FC = () => {
  const promises = [
    {
      id: 1,
      title: 'Free Initial Build',
      tag: 'Core Foundation',
      quote: 'Free Digital Profile (Web & App) for your organization before you begin earning.',
      description:
        'We design, engineer, and deploy high-conversion web platforms and native mobile applications for your business with zero upfront capital required.',
      icon: Gift,
      iconBg: 'rgba(255, 255, 255, 0.1)',
      accentColor: '#ffffff',
    },
    {
      id: 2,
      title: 'Zero Revenue Rule',
      tag: 'Risk Elimination',
      quote: 'Absolutely zero charges if our services do not help you generate revenue.',
      description:
        'If the deployed digital solution does not yield commercial revenue for your enterprise, you owe us nothing. Our success is strictly tied to yours.',
      icon: CircleSlash2,
      iconBg: 'rgba(186, 193, 204, 0.12)',
      accentColor: '#bac1cc',
    },
    {
      id: 3,
      title: 'Full Sales Management',
      tag: 'Complete Operations',
      quote: 'Complete integrated Orders and Sales Management system included.',
      description:
        'Manage end-to-end customer transactions, order lifecycles, automated invoices, and payment gateways seamlessly within one centralized dashboard.',
      icon: LayoutDashboard,
      iconBg: 'rgba(186, 193, 204, 0.1)',
      accentColor: '#ffffff',
    },
    {
      id: 4,
      title: 'Tailored Customization',
      tag: 'Engineered Precision',
      quote: 'System is fully customizable to your specific needs if required.',
      description:
        'No rigid templates or restrictive lock-ins. Every workflow, checkout experience, and backend integration can be tailored to match your exact business model.',
      icon: Wrench,
      iconBg: 'rgba(90, 98, 112, 0.2)',
      accentColor: '#bac1cc',
    },
    {
      id: 5,
      title: 'Transparent Billing',
      tag: 'Ironclad Guarantee',
      quote: "Strict 'No Hidden Fees' guarantee—absolutely no extra charges beyond what is mentioned in our agreed terms.",
      description:
        'Every transaction, commission, and SLA parameter is crystal-clear in our bilateral agreement. No surprise server fees, maintenance penalties, or undisclosed surcharges.',
      icon: Lock,
      iconBg: 'rgba(255, 255, 255, 0.12)',
      accentColor: '#ffffff',
    },
  ];

  return (
    <section
      id="promises"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: 'linear-gradient(180deg, #181b20 0%, #22262e 50%, #181b20 100%)',
        borderTop: '1px solid rgba(186, 193, 204, 0.1)',
        borderBottom: '1px solid rgba(186, 193, 204, 0.1)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="pill-badge">
            <Shield size={13} />
            <span>Guaranteed Business Logic</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            Core Promises &amp; <span className="text-gradient">Commercial Guarantees</span>
          </h2>

          <p style={{ color: 'var(--accent-light)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Our foundational terms protect your enterprise from day one. We take all the initial financial risk
            to guarantee zero friction in starting your digital transformation.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="promises-grid">
          {promises.map((promise) => {
            const IconComponent = promise.icon;

            return (
              <div
                key={promise.id}
                className="glass-card"
                style={{
                  padding: '36px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Condition Number Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  PROMISE 0{promise.id}
                </div>

                <div>
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '16px',
                      background: promise.iconBg,
                      border: '1px solid rgba(186, 193, 204, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: promise.accentColor,
                      marginBottom: '24px',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    <IconComponent size={26} strokeWidth={2} />
                  </div>

                  {/* Title & Tag */}
                  <div
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-light)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '6px',
                    }}
                  >
                    {promise.tag}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '16px',
                    }}
                  >
                    {promise.title}
                  </h3>

                  {/* Exact Verbatim Quote */}
                  <div
                    style={{
                      background: 'rgba(24, 27, 32, 0.75)',
                      borderLeft: '3px solid var(--accent-light)',
                      padding: '12px 16px',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '18px',
                      fontSize: '0.92rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      lineHeight: 1.5,
                      fontStyle: 'italic',
                    }}
                  >
                    “{promise.quote}”
                  </div>

                  {/* Supporting Description */}
                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--accent-light)',
                      lineHeight: 1.6,
                    }}
                  >
                    {promise.description}
                  </p>
                </div>

                {/* Bottom Verified Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '28px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                  }}
                >
                  <CheckCircle2 size={15} color="#bac1cc" />
                  <span>Legally Bound in Master Agreement</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Summary */}
        <div
          className="glass-card"
          style={{
            marginTop: '48px',
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            background: 'rgba(34, 38, 46, 0.9)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <FileCheck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>
                Clear, Transparent Contracts
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--accent-light)' }}>
                Zero hidden clauses. Free builds are genuinely free until customer revenue is realized.
              </div>
            </div>
          </div>

          <a href="#contact" className="btn-outline" style={{ fontSize: '0.85rem' }}>
            Request Standard Agreement Copy
          </a>
        </div>
      </div>
    </section>
  );
};
