import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, X } from 'lucide-react';
import type { NewsArticle } from '../data/adminStorage';
import { getStoredNews } from '../data/adminStorage';

export const NewsSection: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const loadNews = () => {
    const all = getStoredNews();
    setNewsList(all.filter((item) => item.status === 'Published'));
  };

  useEffect(() => {
    loadNews();
    const handleNewsUpdate = () => loadNews();
    window.addEventListener('gozero_news_updated', handleNewsUpdate);
    return () => window.removeEventListener('gozero_news_updated', handleNewsUpdate);
  }, []);

  if (newsList.length === 0) return null;

  return (
    <section
      id="news"
      style={{
        padding: '100px 0',
        position: 'relative',
        background: '#181b20',
        borderTop: '1px solid rgba(186, 193, 204, 0.1)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 60px' }}>
          <div className="pill-badge">
            <Newspaper size={13} />
            <span>Studio Journal &amp; Dispatches</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontWeight: 800,
              marginBottom: '16px',
            }}
          >
            Latest <span className="text-gradient">News &amp; Releases</span>
          </h2>

          <p style={{ color: 'var(--accent-light)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Updates on our commercial milestones, technology breakthroughs, and stories of partners
            growing with our zero-upfront digital profile framework.
          </p>
        </div>

        {/* News Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '30px',
          }}
        >
          {newsList.map((article) => (
            <article
              key={article.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '20px',
                background: 'rgba(34, 38, 46, 0.85)',
              }}
            >
              {/* Image Banner */}
              <div
                style={{
                  height: '200px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#121417',
                }}
              >
                <img
                  src={article.image || '/logo.jpg'}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                  onError={(e) => {
                    // Fallback to logo on image load failure
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap',
                  }}
                >
                  {article.tags.slice(0, 2).map((t, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(24, 27, 32, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(186, 193, 204, 0.25)',
                        color: '#ffffff',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: '9999px',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} />
                      <span>{article.datetime}</span>
                    </div>
                    <span>•</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      lineHeight: 1.35,
                      marginBottom: '12px',
                    }}
                  >
                    {article.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.88rem',
                      color: 'var(--accent-light)',
                      lineHeight: 1.55,
                      marginBottom: '20px',
                    }}
                  >
                    {article.summary}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-subtle)',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    By {article.author}
                  </span>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {selectedArticle && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(18, 20, 24, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              overflowY: 'auto',
              background: '#181b20',
              border: '1px solid rgba(186, 193, 204, 0.3)',
              borderRadius: '24px',
              padding: '36px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
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
              }}
            >
              <X size={18} />
            </button>

            {/* Tag Pills */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {selectedArticle.tags.map((tag, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    padding: '3px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: '12px',
              }}
            >
              {selectedArticle.title}
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '24px',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '14px',
              }}
            >
              <span>{selectedArticle.datetime}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
              <span>•</span>
              <span>{selectedArticle.author}</span>
            </div>

            {selectedArticle.image && (
              <div
                style={{
                  width: '100%',
                  height: '260px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '24px',
                }}
              >
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                />
              </div>
            )}

            <div
              style={{
                fontSize: '0.95rem',
                color: 'var(--accent-light)',
                lineHeight: 1.8,
                whiteSpace: 'pre-line',
              }}
            >
              {selectedArticle.body}
            </div>

            <div style={{ marginTop: '36px', textAlign: 'center' }}>
              <button onClick={() => setSelectedArticle(null)} className="btn-secondary">
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
