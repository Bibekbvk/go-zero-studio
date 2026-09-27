import React, { useState, useEffect } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  X,
  LogOut,
  ShieldAlert,
  Search,
  Trash2,
  Plus,
  Edit2,
  CheckCircle2,
  Newspaper,
  Layers,
  Settings,
  Mail,
  Share2,
  Save,
} from 'lucide-react';
import type {
  FreeBuildInquiry,
  ClientDeployment,
  CompanySettings,
  NewsArticle,
  PortfolioWork,
} from '../../data/adminStorage';
import {
  getStoredInquiries,
  saveStoredInquiries,
  getStoredDeployments,
  getStoredSettings,
  saveStoredSettings,
  getStoredNews,
  saveStoredNews,
  addStoredNews,
  deleteStoredNews,
  getStoredWorks,
  saveStoredWorks,
  addStoredWork,
  deleteStoredWork,
  checkAdminAuth,
  setAdminAuth,
} from '../../data/adminStorage';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState<'inquiries' | 'works' | 'news' | 'settings' | 'deployments'>('inquiries');

  // Data states
  const [inquiries, setInquiries] = useState<FreeBuildInquiry[]>([]);
  const [deployments, setDeployments] = useState<ClientDeployment[]>([]);
  const [settings, setSettings] = useState<CompanySettings>(getStoredSettings());
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [worksList, setWorksList] = useState<PortfolioWork[]>([]);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<FreeBuildInquiry | null>(null);

  // Settings save feedback
  const [settingsSaved, setSettingsSaved] = useState(false);

  // News creation / edit modal state
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    datetime: new Date().toISOString().slice(0, 16).replace('T', ' '),
    tags: 'Milestone, Growth, Zero Upfront',
    image: '',
    summary: '',
    body: '',
    author: 'GoZero Engineering Team',
    readTime: '3 min read',
    status: 'Published' as 'Published' | 'Draft',
  });

  // Works creation / edit modal state
  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [editingWorkId, setEditingWorkId] = useState<string | null>(null);
  const [workForm, setWorkForm] = useState({
    title: '',
    clientName: '',
    category: 'Mobile Retail App' as PortfolioWork['category'],
    mockupType: 'mobile' as 'mobile' | 'web',
    description: '',
    revenueMetric: '+$25,000 Revenue (Month 1)',
    attribution: 'Built by GoZero Studio (Standard Condition).',
    status: 'Live & Earning' as PortfolioWork['status'],
    featured: true,
  });

  const refreshAllData = () => {
    setInquiries(getStoredInquiries());
    setDeployments(getStoredDeployments());
    setSettings(getStoredSettings());
    setNewsList(getStoredNews());
    setWorksList(getStoredWorks());
  };

  useEffect(() => {
    if (isOpen) {
      const auth = checkAdminAuth();
      setIsAuthenticated(auth);
      if (auth) {
        refreshAllData();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle Login with requested credentials (admin / special4u@A)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'special4u@A') {
      setIsAuthenticated(true);
      setAdminAuth(true);
      setAuthError('');
      refreshAllData();
    } else {
      setAuthError('Invalid credentials. Check Admin ID and Password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuth(false);
    setUsername('');
    setPassword('');
  };

  // --- INQUIRIES ACTIONS ---
  const handleStatusChange = (id: string, newStatus: FreeBuildInquiry['status']) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    setInquiries(updated);
    saveStoredInquiries(updated);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm('Are you sure you want to remove this lead?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      saveStoredInquiries(updated);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // --- SETTINGS ACTIONS ---
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // --- NEWS ACTIONS ---
  const handleOpenAddNews = () => {
    setEditingNewsId(null);
    setNewsForm({
      title: '',
      datetime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      tags: 'Milestone, Growth, Zero Upfront',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      summary: '',
      body: '',
      author: 'GoZero Editorial Team',
      readTime: '3 min read',
      status: 'Published',
    });
    setNewsModalOpen(true);
  };

  const handleOpenEditNews = (article: NewsArticle) => {
    setEditingNewsId(article.id);
    setNewsForm({
      title: article.title,
      datetime: article.datetime,
      tags: article.tags.join(', '),
      image: article.image,
      summary: article.summary,
      body: article.body,
      author: article.author,
      readTime: article.readTime,
      status: article.status,
    });
    setNewsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const tagArray = newsForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingNewsId) {
      const updated = newsList.map((item) =>
        item.id === editingNewsId
          ? {
              ...item,
              ...newsForm,
              tags: tagArray,
            }
          : item
      );
      setNewsList(updated);
      saveStoredNews(updated);
    } else {
      addStoredNews({
        title: newsForm.title,
        datetime: newsForm.datetime,
        tags: tagArray,
        image: newsForm.image || '/logo.jpg',
        summary: newsForm.summary,
        body: newsForm.body,
        author: newsForm.author,
        readTime: newsForm.readTime,
        status: newsForm.status,
      });
      setNewsList(getStoredNews());
    }
    setNewsModalOpen(false);
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Delete this news article?')) {
      deleteStoredNews(id);
      setNewsList(getStoredNews());
    }
  };

  // --- WORKS ACTIONS ---
  const handleOpenAddWork = () => {
    setEditingWorkId(null);
    setWorkForm({
      title: '',
      clientName: '',
      category: 'Mobile Retail App',
      mockupType: 'mobile',
      description: '',
      revenueMetric: '+$25,000 Revenue (Month 1)',
      attribution: 'Built by GoZero Studio (Standard Condition).',
      status: 'Live & Earning',
      featured: true,
    });
    setWorkModalOpen(true);
  };

  const handleOpenEditWork = (work: PortfolioWork) => {
    setEditingWorkId(work.id);
    setWorkForm({
      title: work.title,
      clientName: work.clientName,
      category: work.category,
      mockupType: work.mockupType,
      description: work.description,
      revenueMetric: work.revenueMetric,
      attribution: work.attribution || 'Built by GoZero Studio (Standard Condition).',
      status: work.status,
      featured: work.featured,
    });
    setWorkModalOpen(true);
  };

  const handleSaveWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorkId) {
      const updated = worksList.map((item) =>
        item.id === editingWorkId
          ? {
              ...item,
              ...workForm,
            }
          : item
      );
      setWorksList(updated);
      saveStoredWorks(updated);
    } else {
      addStoredWork({
        ...workForm,
      });
      setWorksList(getStoredWorks());
    }
    setWorkModalOpen(false);
  };

  const handleDeleteWork = (id: string) => {
    if (confirm('Delete this portfolio project mockup?')) {
      deleteStoredWork(id);
      setWorksList(getStoredWorks());
    }
  };

  // Filtered inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(18, 20, 24, 0.94)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
    >
      {/* If Not Authenticated -> Show Sleek Login Modal */}
      {!isAuthenticated ? (
        <div
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: '440px',
            background: '#181b20',
            border: '1px solid rgba(186, 193, 204, 0.3)',
            borderRadius: '24px',
            padding: '40px 36px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(186, 193, 204, 0.15)',
            position: 'relative',
          }}
        >
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
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <X size={16} />
          </button>

          {/* Logo & Brand Emblem */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                overflow: 'hidden',
                background: '#22262e',
                border: '1px solid rgba(186, 193, 204, 0.3)',
                margin: '0 auto 16px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              <img src="/logo.jpg" alt="GoZero Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '6px' }}>
              GoZero Studio Admin Portal
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#bac1cc', fontWeight: 500 }}>
              Authorized Enterprise Access
            </div>
          </div>

          {authError && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.35)',
                color: '#fca5a5',
                padding: '10px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <ShieldAlert size={16} />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                Admin ID
              </label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Enter admin ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  background: '#121417',
                  border: '1px solid rgba(186, 193, 204, 0.25)',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 14px',
                    background: '#121417',
                    border: '1px solid rgba(186, 193, 204, 0.25)',
                    borderRadius: '10px',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#bac1cc',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Lock size={16} />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>
        </div>
      ) : (
        /* Authenticated: Full Management Dashboard */
        <div
          style={{
            width: '100%',
            maxWidth: '1280px',
            minHeight: '88vh',
            maxHeight: '92vh',
            background: '#181b20',
            border: '1px solid rgba(186, 193, 204, 0.3)',
            borderRadius: '24px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(186, 193, 204, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Top Admin Header Bar */}
          <div
            style={{
              padding: '18px 32px',
              background: '#22262e',
              borderBottom: '1px solid rgba(186, 193, 204, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: '#181b20',
                  border: '1px solid rgba(186, 193, 204, 0.3)',
                }}
              >
                <img src="/logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                    GoZero Studio Admin Suite
                  </span>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid rgba(186, 193, 204, 0.25)',
                    }}
                  >
                    EXECUTIVE CRM &amp; CMS
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#bac1cc' }}>
                  Logged in as <strong>admin</strong> • Control Inquiries, Works, News, and Global Settings
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={handleLogout}
                className="btn-outline"
                style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
              >
                <LogOut size={14} />
                <span>Log Out</span>
              </button>

              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem', gap: '6px' }}
              >
                <X size={14} />
                <span>Return to Website</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs Bar */}
          <div
            style={{
              padding: '12px 32px',
              borderBottom: '1px solid rgba(186, 193, 204, 0.12)',
              display: 'flex',
              gap: '10px',
              background: 'rgba(24, 27, 32, 0.98)',
              overflowX: 'auto',
            }}
          >
            <button
              onClick={() => setActiveTab('inquiries')}
              style={{
                background: activeTab === 'inquiries' ? '#ffffff' : 'transparent',
                color: activeTab === 'inquiries' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Free Build Leads ({inquiries.length})
            </button>

            <button
              onClick={() => setActiveTab('works')}
              style={{
                background: activeTab === 'works' ? '#ffffff' : 'transparent',
                color: activeTab === 'works' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              <Layers size={14} />
              <span>Our Works CMS ({worksList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              style={{
                background: activeTab === 'news' ? '#ffffff' : 'transparent',
                color: activeTab === 'news' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              <Newspaper size={14} />
              <span>News &amp; Posts ({newsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                background: activeTab === 'settings' ? '#ffffff' : 'transparent',
                color: activeTab === 'settings' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              <Settings size={14} />
              <span>Contact &amp; Social Media Links</span>
            </button>

            <button
              onClick={() => setActiveTab('deployments')}
              style={{
                background: activeTab === 'deployments' ? '#ffffff' : 'transparent',
                color: activeTab === 'deployments' ? '#181b20' : '#bac1cc',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '9999px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Client Deployments ({deployments.length})
            </button>
          </div>

          {/* MAIN TAB CONTENT AREA (Scrollable) */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
            {/* ===================== TAB 1: INQUIRIES ===================== */}
            {activeTab === 'inquiries' && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '16px',
                    marginBottom: '20px',
                  }}
                >
                  <div style={{ position: 'relative', width: '320px' }}>
                    <Search
                      size={16}
                      color="#bac1cc"
                      style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                      type="text"
                      placeholder="Search organization or lead..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px 10px 38px',
                        background: '#121417',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#bac1cc', fontWeight: 600 }}>Status Filter:</span>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{
                        padding: '8px 14px',
                        background: '#121417',
                        border: '1px solid rgba(186, 193, 204, 0.2)',
                        borderRadius: '8px',
                        color: '#ffffff',
                        fontSize: '0.85rem',
                        outline: 'none',
                      }}
                    >
                      <option value="All">All Inquiries</option>
                      <option value="Pending Review">Pending Review</option>
                      <option value="Approved">Approved</option>
                      <option value="In Development">In Development</option>
                      <option value="Launched">Launched</option>
                      <option value="Generating Revenue">Generating Revenue</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    background: '#22262e',
                    borderRadius: '16px',
                    border: '1px solid rgba(186, 193, 204, 0.15)',
                    overflowX: 'auto',
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(186, 193, 204, 0.15)', color: '#bac1cc', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '14px 20px' }}>ID / Organization</th>
                        <th style={{ padding: '14px 20px' }}>Contact Person</th>
                        <th style={{ padding: '14px 20px' }}>Platform Scope</th>
                        <th style={{ padding: '14px 20px' }}>Date</th>
                        <th style={{ padding: '14px 20px' }}>Status</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInquiries.map((inq) => (
                        <tr
                          key={inq.id}
                          style={{
                            borderBottom: '1px solid rgba(186, 193, 204, 0.08)',
                            color: '#ffffff',
                          }}
                        >
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontWeight: 700 }}>{inq.organization}</div>
                            <div style={{ fontSize: '0.72rem', color: '#bac1cc' }}>{inq.id}</div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <div>{inq.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#bac1cc' }}>{inq.email}</div>
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span style={{ fontSize: '0.8rem', color: '#ffffff' }}>{inq.platform}</span>
                          </td>
                          <td style={{ padding: '16px 20px', fontSize: '0.8rem', color: '#bac1cc' }}>
                            {inq.date}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span
                              style={{
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                background:
                                  inq.status === 'Generating Revenue'
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : inq.status === 'Approved'
                                    ? 'rgba(186, 193, 204, 0.15)'
                                    : 'rgba(90, 98, 112, 0.3)',
                                color: '#ffffff',
                                border: '1px solid rgba(186, 193, 204, 0.25)',
                              }}
                            >
                              {inq.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <select
                                value={inq.status}
                                onChange={(e) => handleStatusChange(inq.id, e.target.value as any)}
                                style={{
                                  padding: '4px 8px',
                                  background: '#181b20',
                                  border: '1px solid rgba(186, 193, 204, 0.2)',
                                  borderRadius: '6px',
                                  color: '#bac1cc',
                                  fontSize: '0.75rem',
                                  outline: 'none',
                                }}
                              >
                                <option value="Pending Review">Pending Review</option>
                                <option value="Approved">Approve Build</option>
                                <option value="In Development">Start Dev</option>
                                <option value="Launched">Mark Launched</option>
                                <option value="Generating Revenue">Generating Revenue</option>
                              </select>

                              <button
                                onClick={() => setSelectedInquiry(inq)}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  border: '1px solid rgba(186, 193, 204, 0.2)',
                                  color: '#ffffff',
                                  borderRadius: '6px',
                                  padding: '4px 10px',
                                  fontSize: '0.75rem',
                                  cursor: 'pointer',
                                }}
                              >
                                Inspect
                              </button>

                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.15)',
                                  border: 'none',
                                  color: '#fca5a5',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                                title="Delete Lead"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Lead Inspection Drawer */}
                {selectedInquiry && (
                  <div
                    style={{
                      marginTop: '24px',
                      padding: '24px',
                      background: '#22262e',
                      border: '1px solid rgba(186, 193, 204, 0.25)',
                      borderRadius: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                          Application Scope: {selectedInquiry.organization}
                        </h4>
                        <span style={{ fontSize: '0.75rem', color: '#bac1cc' }}>({selectedInquiry.id})</span>
                      </div>
                      <button
                        onClick={() => setSelectedInquiry(null)}
                        style={{ background: 'none', border: 'none', color: '#bac1cc', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#5a6270', fontWeight: 700 }}>LEAD CONTACT</div>
                        <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>{selectedInquiry.name}</div>
                        <div style={{ fontSize: '0.8rem', color: '#bac1cc' }}>{selectedInquiry.email}</div>
                        <div style={{ fontSize: '0.8rem', color: '#bac1cc' }}>{selectedInquiry.phone}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#5a6270', fontWeight: 700 }}>PLATFORM DELIVERABLE</div>
                        <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 600 }}>{selectedInquiry.platform}</div>
                        <div style={{ fontSize: '0.8rem', color: '#bac1cc' }}>Estimated: {selectedInquiry.estimatedValue}</div>
                      </div>

                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#5a6270', fontWeight: 700 }}>COMMERCIAL STATUS</div>
                        <div style={{ fontSize: '0.9rem', color: '#ffffff', fontWeight: 700 }}>{selectedInquiry.status}</div>
                        <div style={{ fontSize: '0.8rem', color: '#bac1cc' }}>Cost to client: $0.00 Upfront</div>
                      </div>
                    </div>

                    <div style={{ background: '#181b20', padding: '14px', borderRadius: '10px', border: '1px solid rgba(186, 193, 204, 0.1)' }}>
                      <div style={{ fontSize: '0.72rem', color: '#bac1cc', fontWeight: 700, marginBottom: '4px' }}>
                        PROJECT NOTES &amp; GOALS:
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.5 }}>
                        {selectedInquiry.message}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===================== TAB 2: OUR WORKS CMS ===================== */}
            {activeTab === 'works' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      Portfolio &amp; Showcase Manager ('Our Works')
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#bac1cc', margin: '4px 0 0' }}>
                      Add, update, or reorganize work items displayed in the public 'Our Success Stories' section.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddWork}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.85rem', gap: '6px' }}
                  >
                    <Plus size={15} />
                    <span>Add New Project Work</span>
                  </button>
                </div>

                <div
                  style={{
                    background: '#22262e',
                    borderRadius: '16px',
                    border: '1px solid rgba(186, 193, 204, 0.15)',
                    overflowX: 'auto',
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(186, 193, 204, 0.15)', color: '#bac1cc', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '14px 20px' }}>Project Title / Client</th>
                        <th style={{ padding: '14px 20px' }}>Category</th>
                        <th style={{ padding: '14px 20px' }}>Mockup Type</th>
                        <th style={{ padding: '14px 20px' }}>Revenue Metric</th>
                        <th style={{ padding: '14px 20px' }}>Attribution</th>
                        <th style={{ padding: '14px 20px' }}>Status</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {worksList.map((work) => (
                        <tr key={work.id} style={{ borderBottom: '1px solid rgba(186, 193, 204, 0.08)', color: '#ffffff' }}>
                          <td style={{ padding: '16px 20px' }}>
                            <div style={{ fontWeight: 700 }}>{work.title}</div>
                            <div style={{ fontSize: '0.75rem', color: '#bac1cc' }}>{work.clientName}</div>
                          </td>
                          <td style={{ padding: '16px 20px', fontSize: '0.82rem' }}>
                            <span style={{ background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '4px' }}>
                              {work.category}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', textTransform: 'capitalize', color: '#bac1cc', fontSize: '0.82rem' }}>
                            {work.mockupType} Viewport
                          </td>
                          <td style={{ padding: '16px 20px', fontWeight: 700, color: '#ffffff', fontSize: '0.85rem' }}>
                            {work.revenueMetric}
                          </td>
                          <td style={{ padding: '16px 20px', fontSize: '0.75rem', color: '#bac1cc', fontStyle: 'italic' }}>
                            {work.attribution}
                          </td>
                          <td style={{ padding: '16px 20px' }}>
                            <span
                              style={{
                                background: 'rgba(186, 193, 204, 0.15)',
                                color: '#ffffff',
                                padding: '3px 10px',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                              }}
                            >
                              {work.status}
                            </span>
                          </td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button
                                onClick={() => handleOpenEditWork(work)}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.08)',
                                  border: '1px solid rgba(186, 193, 204, 0.2)',
                                  color: '#ffffff',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                                title="Edit Work Item"
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                onClick={() => handleDeleteWork(work.id)}
                                style={{
                                  background: 'rgba(239, 68, 68, 0.15)',
                                  border: 'none',
                                  color: '#fca5a5',
                                  borderRadius: '6px',
                                  padding: '4px 8px',
                                  cursor: 'pointer',
                                }}
                                title="Delete Work Item"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===================== TAB 3: NEWS & ANNOUNCEMENTS ===================== */}
            {activeTab === 'news' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      News &amp; Editorial Dispatches CMS
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#bac1cc', margin: '4px 0 0' }}>
                      Publish official announcements with rich details (title, date/time, tags, images, and body).
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddNews}
                    className="btn-primary"
                    style={{ padding: '8px 18px', fontSize: '0.85rem', gap: '6px' }}
                  >
                    <Plus size={15} />
                    <span>Create News Article</span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
                  {newsList.map((article) => (
                    <div
                      key={article.id}
                      style={{
                        background: '#22262e',
                        border: '1px solid rgba(186, 193, 204, 0.18)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        {article.image && (
                          <div style={{ height: '140px', width: '100%', background: '#121417', overflow: 'hidden' }}>
                            <img
                              src={article.image}
                              alt={article.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/logo.jpg';
                              }}
                            />
                          </div>
                        )}
                        <div style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.72rem', color: '#bac1cc' }}>{article.datetime}</span>
                            <span
                              style={{
                                background: article.status === 'Published' ? 'rgba(255,255,255,0.15)' : 'rgba(90,98,112,0.3)',
                                color: '#ffffff',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                              }}
                            >
                              {article.status}
                            </span>
                          </div>

                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                            {article.title}
                          </h4>

                          <p style={{ fontSize: '0.8rem', color: 'var(--accent-light)', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                            {article.summary}
                          </p>

                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {article.tags.map((t, idx) => (
                              <span
                                key={idx}
                                style={{
                                  background: 'rgba(24, 27, 32, 0.8)',
                                  color: '#bac1cc',
                                  fontSize: '0.68rem',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                }}
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '12px 16px',
                          background: 'rgba(24, 27, 32, 0.5)',
                          borderTop: '1px solid rgba(186, 193, 204, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '0.72rem', color: '#5a6270' }}>By {article.author}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => handleOpenEditNews(article)}
                            style={{
                              background: 'rgba(255,255,255,0.08)',
                              border: '1px solid rgba(186,193,204,0.2)',
                              color: '#ffffff',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNews(article.id)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: 'none',
                              color: '#fca5a5',
                              borderRadius: '6px',
                              padding: '4px 8px',
                              fontSize: '0.75rem',
                              cursor: 'pointer',
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===================== TAB 4: OFFICIAL CONTACT & SOCIAL MEDIA SETTINGS ===================== */}
            {activeTab === 'settings' && (
              <div style={{ maxWidth: '820px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Official Contact &amp; Social Media Link Settings
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#bac1cc', margin: '4px 0 0' }}>
                    Configure the official channels for GoZero Studio. Changes take effect on the live website immediately upon saving.
                  </p>
                </div>

                {settingsSaved && (
                  <div
                    style={{
                      background: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      color: '#86efac',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      marginBottom: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Company settings updated successfully! Public website has been re-synchronized.</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Official Direct Contact Channels */}
                  <div
                    style={{
                      background: '#22262e',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                    }}
                  >
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Mail size={16} />
                      <span>Official Direct Contact Information</span>
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                          Official Business Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                          Official Toll-Free Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                          WhatsApp Direct Phone Number (International format e.g. +18004693761)
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.whatsappNumber}
                          onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '6px' }}>
                          WhatsApp Floating Icon Tooltip Text
                        </label>
                        <input
                          type="text"
                          required
                          value={settings.whatsappTooltip}
                          onChange={(e) => setSettings({ ...settings, whatsappTooltip: e.target.value })}
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.9rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Social Media Link Placeholders */}
                  <div
                    style={{
                      background: '#22262e',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '1px solid rgba(186, 193, 204, 0.18)',
                    }}
                  >
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Share2 size={16} />
                      <span>Social Media Profile Links (Paste URLs for User Interface)</span>
                    </h4>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                          LinkedIn URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://linkedin.com/company/yourpage"
                          value={settings.socialLinks.linkedin}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                          X / Twitter URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://x.com/yourhandle"
                          value={settings.socialLinks.twitter}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                          GitHub Repository / Organization
                        </label>
                        <input
                          type="url"
                          placeholder="https://github.com/yourorg"
                          value={settings.socialLinks.github}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, github: e.target.value },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                          Instagram Profile URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://instagram.com/yourprofile"
                          value={settings.socialLinks.instagram}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                          Facebook Page URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://facebook.com/yourpage"
                          value={settings.socialLinks.facebook}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                          YouTube Channel URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://youtube.com/@yourchannel"
                          value={settings.socialLinks.youtube}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                            })
                          }
                          style={{
                            width: '100%',
                            padding: '10px 14px',
                            background: '#121417',
                            border: '1px solid rgba(186, 193, 204, 0.2)',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ padding: '14px', gap: '8px', fontSize: '0.95rem' }}
                  >
                    <Save size={16} />
                    <span>Save All Company Settings</span>
                  </button>
                </form>
              </div>
            )}

            {/* ===================== TAB 5: DEPLOYMENTS ===================== */}
            {activeTab === 'deployments' && (
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    Active Client Deployments &amp; Revenue Compliance
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: '#bac1cc', margin: '4px 0 0' }}>
                    Monitoring all production builds to ensure zero upfront fees are honored until client revenues start.
                  </p>
                </div>

                <div
                  style={{
                    background: '#22262e',
                    borderRadius: '16px',
                    border: '1px solid rgba(186, 193, 204, 0.15)',
                    overflowX: 'auto',
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(186, 193, 204, 0.15)', color: '#bac1cc', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                        <th style={{ padding: '14px 20px' }}>Client Organization</th>
                        <th style={{ padding: '14px 20px' }}>Platform Type</th>
                        <th style={{ padding: '14px 20px' }}>Launch Date</th>
                        <th style={{ padding: '14px 20px' }}>Upfront Billed</th>
                        <th style={{ padding: '14px 20px' }}>Client Gross Revenue</th>
                        <th style={{ padding: '14px 20px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deployments.map((dep) => (
                        <tr key={dep.id} style={{ borderBottom: '1px solid rgba(186, 193, 204, 0.08)', color: '#ffffff' }}>
                          <td style={{ padding: '16px 20px', fontWeight: 700 }}>
                            <div>{dep.clientName}</div>
                            <div style={{ fontSize: '0.72rem', color: '#bac1cc' }}>{dep.attributionStatus}</div>
                          </td>
                          <td style={{ padding: '16px 20px', fontSize: '0.85rem' }}>{dep.platformType}</td>
                          <td style={{ padding: '16px 20px', color: '#bac1cc', fontSize: '0.82rem' }}>{dep.launchDate}</td>
                          <td style={{ padding: '16px 20px', fontWeight: 800, color: '#bac1cc' }}>{dep.upfrontPaid}</td>
                          <td style={{ padding: '16px 20px', fontWeight: 800, color: '#ffffff' }}>{dep.clientRevenue}</td>
                          <td style={{ padding: '16px 20px' }}>
                            <span
                              style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                color: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '9999px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                              }}
                            >
                              {dep.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================== SUB-MODAL: CREATE / EDIT NEWS ===================== */}
      {newsModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(10, 12, 16, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setNewsModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#181b20',
              border: '1px solid rgba(186, 193, 204, 0.3)',
              borderRadius: '24px',
              padding: '32px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {editingNewsId ? 'Edit News Article' : 'Create New News Article'}
              </h3>
              <button
                onClick={() => setNewsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#bac1cc', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveNews} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                  Article Headline / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GoZero Studio Expands Free Mobile Build Offerings"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
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
                    Date and Time
                  </label>
                  <input
                    type="text"
                    required
                    value={newsForm.datetime}
                    onChange={(e) => setNewsForm({ ...newsForm, datetime: e.target.value })}
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
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Milestone, Expansion, Retail"
                    value={newsForm.tags}
                    onChange={(e) => setNewsForm({ ...newsForm, tags: e.target.value })}
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
                  Cover Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or /logo.jpg"
                  value={newsForm.image}
                  onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
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
                  Brief Summary / Excerpt
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="1-2 sentence lead paragraph..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    background: '#121417',
                    border: '1px solid rgba(186, 193, 204, 0.2)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                  Full Article Body Content
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Full editorial story..."
                  value={newsForm.body}
                  onChange={(e) => setNewsForm({ ...newsForm, body: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Author
                  </label>
                  <input
                    type="text"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#121417',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={newsForm.readTime}
                    onChange={(e) => setNewsForm({ ...newsForm, readTime: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#121417',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Status
                  </label>
                  <select
                    value={newsForm.status}
                    onChange={(e) => setNewsForm({ ...newsForm, status: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#121417',
                      border: '1px solid rgba(186, 193, 204, 0.2)',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>
                  Save &amp; Publish News
                </button>
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="btn-outline"
                  style={{ padding: '12px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== SUB-MODAL: CREATE / EDIT OUR WORKS ===================== */}
      {workModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(10, 12, 16, 0.88)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setWorkModalOpen(false)}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#181b20',
              border: '1px solid rgba(186, 193, 204, 0.3)',
              borderRadius: '24px',
              padding: '32px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {editingWorkId ? 'Edit Project Work Item' : 'Add New Work / Mockup'}
              </h3>
              <button
                onClick={() => setWorkModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#bac1cc', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveWork} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Project Showcase Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Omnichannel Retail & Checkout"
                    value={workForm.title}
                    onChange={(e) => setWorkForm({ ...workForm, title: e.target.value })}
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
                    Client Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Veloce Luxury Retail"
                    value={workForm.clientName}
                    onChange={(e) => setWorkForm({ ...workForm, clientName: e.target.value })}
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={workForm.category}
                    onChange={(e) => setWorkForm({ ...workForm, category: e.target.value as any })}
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
                    <option value="Mobile Retail App">Mobile Retail App</option>
                    <option value="Dynamic Web & Sales CRM">Dynamic Web &amp; Sales CRM</option>
                    <option value="Enterprise Portal">Enterprise Portal</option>
                    <option value="B2B Wholesale">B2B Wholesale</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                    Mockup Rendering Frame
                  </label>
                  <select
                    value={workForm.mockupType}
                    onChange={(e) => setWorkForm({ ...workForm, mockupType: e.target.value as any })}
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
                    <option value="mobile">Native Mobile Phone Viewport</option>
                    <option value="web">Web Browser &amp; Dashboard Viewport</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#bac1cc', marginBottom: '4px' }}>
                  Project Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detail the scope and achievements..."
                  value={workForm.description}
                  onChange={(e) => setWorkForm({ ...workForm, description: e.target.value })}
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
                    Performance / Revenue Metric
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+$34,250 Revenue"
                    value={workForm.revenueMetric}
                    onChange={(e) => setWorkForm({ ...workForm, revenueMetric: e.target.value })}
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
                    Required Discreet Attribution
                  </label>
                  <input
                    type="text"
                    required
                    value={workForm.attribution}
                    onChange={(e) => setWorkForm({ ...workForm, attribution: e.target.value })}
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

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px' }}>
                  Save &amp; Update Portfolio
                </button>
                <button
                  type="button"
                  onClick={() => setWorkModalOpen(false)}
                  className="btn-outline"
                  style={{ padding: '12px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
