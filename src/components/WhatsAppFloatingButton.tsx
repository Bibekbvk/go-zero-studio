import React, { useState, useEffect } from 'react';
import { getStoredSettings } from '../data/adminStorage';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [settings, setSettings] = useState(getStoredSettings());

  useEffect(() => {
    const handleSettingsUpdate = () => {
      setSettings(getStoredSettings());
    };
    window.addEventListener('gozero_settings_updated', handleSettingsUpdate);
    return () => window.removeEventListener('gozero_settings_updated', handleSettingsUpdate);
  }, []);

  const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hello%20GoZero%20Studio%2C%20I%20would%20like%20to%20start%20our%20Free%20Digital%20Profile%20(Free%20Website%20%26%20Application).`;

  return (
    <div
      className="whatsapp-float-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      {/* Tooltip: "Message Us Now." */}
      <div
        className="whatsapp-tooltip"
        style={{
          background: 'rgba(24, 27, 32, 0.96)',
          color: '#ffffff',
          fontSize: '0.85rem',
          fontWeight: 700,
          padding: '8px 16px',
          borderRadius: '9999px',
          border: '1px solid rgba(186, 193, 204, 0.35)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), 0 0 14px rgba(56, 189, 248, 0.25)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#38bdf8', // Light blue live indicator
            boxShadow: '0 0 8px #38bdf8',
          }}
        />
        <span>{settings.whatsappTooltip || 'Message Us Now.'}</span>
      </div>

      {/* Bright White and Light Blue WhatsApp Floating Icon */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message GoZero Studio on WhatsApp"
        className="whatsapp-btn"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#ffffff', // Bright white base
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isHovered
            ? '0 16px 36px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.7)'
            : '0 10px 28px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.45)',
          border: '3px solid #ffffff',
          cursor: 'pointer',
          textDecoration: 'none',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: isHovered ? 'scale(1.12) rotate(4deg)' : 'scale(1)',
        }}
      >
        {/* Light Blue & White WhatsApp SVG Emblem */}
        <svg
          viewBox="0 0 24 24"
          width="34"
          height="34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Light Blue / Cyan circular fill */}
          <circle cx="12" cy="12" r="11" fill="url(#whatsapp_lightblue_grad)" />

          {/* White WhatsApp speech bubble & phone handset */}
          <path
            d="M17.5 14.38c-.28-.14-1.63-.8-1.88-.9-.25-.09-.44-.14-.62.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.59.07-.28-.14-1.18-.44-2.25-1.39-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.13-.13.28-.32.41-.48.14-.16.19-.28.28-.46.09-.19.05-.35-.02-.49-.07-.14-.62-1.5-.85-2.06-.23-.54-.46-.47-.62-.48l-.53-.01c-.18 0-.48.07-.73.35-.25.28-.97.95-.97 2.31s.99 2.68 1.13 2.86c.14.19 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.66.21 1.27.18 1.74.11.53-.08 1.63-.67 1.86-1.31.23-.65.23-1.2.16-1.31-.07-.12-.25-.19-.53-.33z"
            fill="#ffffff"
          />

          <defs>
            <linearGradient id="whatsapp_lightblue_grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" /> {/* Light Blue */}
              <stop offset="100%" stopColor="#0284c7" /> {/* Deep Sky Blue */}
            </linearGradient>
          </defs>
        </svg>
      </a>
    </div>
  );
};
