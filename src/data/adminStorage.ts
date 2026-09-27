import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface FreeBuildInquiry {
  id: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  platform: string;
  currentRevenue: string;
  message: string;
  date: string;
  status: 'Pending Review' | 'Approved' | 'In Development' | 'Launched' | 'Generating Revenue';
  estimatedValue: string;
}

export interface ClientDeployment {
  id: string;
  clientName: string;
  platformType: string;
  launchDate: string;
  upfrontPaid: '$0.00';
  clientRevenue: string;
  status: 'Development ($0)' | 'Live & Earning' | 'Scaling';
  attributionStatus: 'Standard Attribution Active' | 'Verified Enterprise';
}

export interface CompanySettings {
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappTooltip: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  datetime: string;
  tags: string[];
  image: string;
  summary: string;
  body: string;
  author: string;
  readTime: string;
  status: 'Published' | 'Draft';
}

export interface PortfolioWork {
  id: string;
  title: string;
  clientName: string;
  category: 'Mobile Retail App' | 'Dynamic Web & Sales CRM' | 'Enterprise Portal' | 'B2B Wholesale';
  mockupType: 'mobile' | 'web';
  description: string;
  revenueMetric: string;
  attribution: string;
  status: 'Live & Earning' | 'In Development' | 'Scaling';
  featured: boolean;
}

const INITIAL_SETTINGS: CompanySettings = {
  email: 'contact@gozerostudio.com',
  phone: '+1 (800) 469-3761',
  whatsappNumber: '+18004693761',
  whatsappTooltip: 'Message Us Now.',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/gozerostudio',
    twitter: 'https://x.com/gozerostudio',
    github: 'https://github.com/gozerostudio',
    instagram: 'https://instagram.com/gozerostudio',
    facebook: 'https://facebook.com/gozerostudio',
    youtube: 'https://youtube.com/@gozerostudio',
  },
};

const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'NEWS-001',
    title: 'GoZero Studio Crosses $150K in Client Generated Revenue with Zero Upfront Model',
    datetime: '2026-09-26 14:30',
    tags: ['Milestone', 'Zero Upfront', 'Growth'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    summary:
      'Our risk-free commercial partnership structure proves unprecedented success across retail and enterprise SaaS clients worldwide.',
    body:
      'We are proud to announce that clients deployed under the GoZero Studio zero-upfront charter have generated over $150,000 in collective verified revenue this quarter alone. By covering 100% of the initial engineering and infrastructure costs, we have dismantled the traditional barriers preventing ambitious brands from scaling.',
    author: 'Elena Vance, Head of Strategy',
    readTime: '3 min read',
    status: 'Published',
  },
  {
    id: 'NEWS-002',
    title: 'Introducing Ultra-Fast Headless Checkout & Sales CRM for Retail Partners',
    datetime: '2026-09-24 10:15',
    tags: ['Product Update', 'Mobile Retail', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    summary:
      'Every free digital profile build now includes sub-second flash checkouts, Apple Pay/Google Pay integration, and automated inventory sync.',
    body:
      'Performance equals revenue. Our newly upgraded native mobile retail engine boasts 450ms checkout speeds, biometric authentication, and integrated multi-currency settlement. As always, this enterprise-grade infrastructure is delivered free of upfront licensing charges.',
    author: 'Devin Thorne, Lead Architect',
    readTime: '4 min read',
    status: 'Published',
  },
  {
    id: 'NEWS-003',
    title: 'Global Edge Node Expansion: Reduced Latency to Sub-20ms Worldwide',
    datetime: '2026-09-21 16:45',
    tags: ['Infrastructure', 'Service Areas', 'Speed'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    summary:
      'New edge deployment clusters in North America, Europe, and Asia-Pacific ensure our client websites load with instant zero-lag response.',
    body:
      'Global speed is non-negotiable. With our latest edge network enhancements, all client applications built by GoZero Studio benefit from distributed serverless micro-caches and automated DDoS mitigation at zero surcharge.',
    author: 'GoZero Infrastructure Team',
    readTime: '2 min read',
    status: 'Published',
  },
];

const INITIAL_WORKS: PortfolioWork[] = [
  {
    id: 'WORK-001',
    title: 'Omnichannel Retail & Flash Checkout',
    clientName: 'Veloce Luxury Retail',
    category: 'Mobile Retail App',
    mockupType: 'mobile',
    description:
      'Fully native iOS and Android application with automated 1-click Apple Pay / Google Pay, push notifications, and real-time inventory synchronization.',
    revenueMetric: '+$34,250 Revenue (Month 1)',
    attribution: 'Built by GoZero Studio (Standard Condition).',
    status: 'Live & Earning',
    featured: true,
  },
  {
    id: 'WORK-002',
    title: 'Enterprise SaaS Portal & Orders Engine',
    clientName: 'Nexus Apex Cloud',
    category: 'Dynamic Web & Sales CRM',
    mockupType: 'web',
    description:
      'High-speed responsive web platform engineered with headless billing, automated order fulfillment, and client-side analytics dashboards.',
    revenueMetric: '+$98,400 Volume (Quarter 1)',
    attribution: 'Built by GoZero Studio (Standard Condition).',
    status: 'Live & Earning',
    featured: true,
  },
  {
    id: 'WORK-003',
    title: 'B2B Wholesale Procurement Portal',
    clientName: 'Kallisto Architectural Goods',
    category: 'B2B Wholesale',
    mockupType: 'web',
    description:
      'Custom catalog with tiered client pricing, automated quote generation, purchase order billing, and warehouse inventory sync.',
    revenueMetric: '+$14,600 Revenue (Pilot Phase)',
    attribution: 'Built by GoZero Studio (Standard Condition).',
    status: 'Scaling',
    featured: true,
  },
];

const INITIAL_INQUIRIES: FreeBuildInquiry[] = [
  {
    id: 'INQ-1082',
    name: 'Marcus Sterling',
    organization: 'Sterling Artisan Leather',
    email: 'marcus@sterlingleather.com',
    phone: '+1 (555) 349-2810',
    platform: 'Free Web & Native Mobile App Bundle',
    currentRevenue: '<$10k / month',
    message: 'We want to launch a direct-to-consumer mobile shopping app and responsive web store.',
    date: '2026-09-26',
    status: 'Pending Review',
    estimatedValue: '$24,000 GMV/mo',
  },
  {
    id: 'INQ-1081',
    name: 'Sophia Chen',
    organization: 'Nova Flow Diagnostics',
    email: 'sophia@novaflow.health',
    phone: '+1 (555) 891-2304',
    platform: 'Enterprise Portal & Sales CRM',
    currentRevenue: '$10k - $50k / month',
    message: 'Looking for a custom appointment booking and diagnostic ordering portal with sales analytics.',
    date: '2026-09-25',
    status: 'Approved',
    estimatedValue: '$65,000 GMV/mo',
  },
  {
    id: 'INQ-1080',
    name: 'David K. O’Connor',
    organization: 'Veloce Luxury Retail',
    email: 'david@veloceretail.com',
    phone: '+1 (555) 234-9081',
    platform: 'Native Mobile Retail App',
    currentRevenue: '$50k+ / month',
    message: 'High-throughput flash retail app for limited edition drops.',
    date: '2026-09-20',
    status: 'Generating Revenue',
    estimatedValue: '$120,000 GMV/mo',
  },
  {
    id: 'INQ-1079',
    name: 'Elena Rostova',
    organization: 'Nexus Apex Cloud',
    email: 'elena@nexusapex.com',
    phone: '+44 20 7946 0912',
    platform: 'Custom E-Commerce Platform',
    currentRevenue: '$50k+ / month',
    message: 'Enterprise subscriptions portal with automated Stripe & SEPA billing integration.',
    date: '2026-09-18',
    status: 'Launched',
    estimatedValue: '$98,400 GMV/mo',
  },
];

const INITIAL_DEPLOYMENTS: ClientDeployment[] = [
  {
    id: 'DEP-001',
    clientName: 'Veloce Luxury Retail',
    platformType: 'iOS & Android Native Retail App',
    launchDate: 'Aug 14, 2026',
    upfrontPaid: '$0.00',
    clientRevenue: '$34,250.00',
    status: 'Live & Earning',
    attributionStatus: 'Standard Attribution Active',
  },
  {
    id: 'DEP-002',
    clientName: 'Nexus Apex Cloud',
    platformType: 'Dynamic Web & Sales Engine',
    launchDate: 'Sep 02, 2026',
    upfrontPaid: '$0.00',
    clientRevenue: '$98,400.00',
    status: 'Live & Earning',
    attributionStatus: 'Standard Attribution Active',
  },
  {
    id: 'DEP-003',
    clientName: 'Kallisto Architectural Goods',
    platformType: 'B2B Wholesale Portal',
    launchDate: 'Sep 19, 2026',
    upfrontPaid: '$0.00',
    clientRevenue: '$14,600.00',
    status: 'Development ($0)',
    attributionStatus: 'Standard Attribution Active',
  },
];

const INQUIRIES_KEY = 'gozero_admin_inquiries';
const DEPLOYMENTS_KEY = 'gozero_admin_deployments';
const SETTINGS_KEY = 'gozero_company_settings';
const NEWS_KEY = 'gozero_admin_news';
const WORKS_KEY = 'gozero_admin_works';
const AUTH_KEY = 'gozero_admin_auth';

// --- INQUIRIES ---
export const getStoredInquiries = (): FreeBuildInquiry[] => {
  const data = localStorage.getItem(INQUIRIES_KEY);
  if (!data) {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_INQUIRIES;
  }
};

export const saveStoredInquiries = (inquiries: FreeBuildInquiry[]) => {
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
  window.dispatchEvent(new Event('gozero_inquiries_updated'));
};

export const addStoredInquiry = (inquiry: Omit<FreeBuildInquiry, 'id' | 'date' | 'status' | 'estimatedValue'>) => {
  const current = getStoredInquiries();
  const newInq: FreeBuildInquiry = {
    ...inquiry,
    id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    status: 'Pending Review',
    estimatedValue: 'Evaluating...',
  };
  const updated = [newInq, ...current];
  saveStoredInquiries(updated);

  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('inquiries')
      .insert([{
        id: newInq.id,
        organization: newInq.organization,
        contact_person: newInq.name,
        email: newInq.email,
        phone: newInq.phone,
        platform_scope: newInq.platform,
        project_goals: newInq.message,
        status: newInq.status,
        date: newInq.date,
      }])
      .then(({ error }) => {
        if (error) console.warn('Supabase inquiry sync notice:', error.message);
      });
  }

  return newInq;
};

// --- DEPLOYMENTS ---
export const getStoredDeployments = (): ClientDeployment[] => {
  const data = localStorage.getItem(DEPLOYMENTS_KEY);
  if (!data) {
    localStorage.setItem(DEPLOYMENTS_KEY, JSON.stringify(INITIAL_DEPLOYMENTS));
    return INITIAL_DEPLOYMENTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_DEPLOYMENTS;
  }
};

export const saveStoredDeployments = (deployments: ClientDeployment[]) => {
  localStorage.setItem(DEPLOYMENTS_KEY, JSON.stringify(deployments));
};

// --- SETTINGS (Email, Phone, WhatsApp, Social Links) ---
export const getStoredSettings = (): CompanySettings => {
  const data = localStorage.getItem(SETTINGS_KEY);
  if (!data) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }
  try {
    return { ...INITIAL_SETTINGS, ...JSON.parse(data) };
  } catch {
    return INITIAL_SETTINGS;
  }
};

export const saveStoredSettings = (settings: CompanySettings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('gozero_settings_updated', { detail: settings }));

  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('company_settings')
      .upsert({
        id: 'primary',
        email: settings.email,
        phone: settings.phone,
        whatsapp: settings.whatsappNumber,
        whatsapp_tooltip: settings.whatsappTooltip,
        linkedin: settings.socialLinks.linkedin,
        twitter: settings.socialLinks.twitter,
        github: settings.socialLinks.github,
        instagram: settings.socialLinks.instagram,
        facebook: settings.socialLinks.facebook,
        youtube: settings.socialLinks.youtube,
        updated_at: new Date().toISOString(),
      })
      .then(({ error }) => {
        if (error) console.warn('Supabase settings sync notice:', error.message);
      });
  }
};

// --- NEWS / ANNOUNCEMENTS ---
export const getStoredNews = (): NewsArticle[] => {
  const data = localStorage.getItem(NEWS_KEY);
  if (!data) {
    localStorage.setItem(NEWS_KEY, JSON.stringify(INITIAL_NEWS));
    return INITIAL_NEWS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_NEWS;
  }
};

export const saveStoredNews = (news: NewsArticle[]) => {
  localStorage.setItem(NEWS_KEY, JSON.stringify(news));
  window.dispatchEvent(new Event('gozero_news_updated'));
};

export const addStoredNews = (article: Omit<NewsArticle, 'id'>) => {
  const current = getStoredNews();
  const newArticle: NewsArticle = {
    ...article,
    id: `NEWS-${Math.floor(100 + Math.random() * 900)}`,
  };
  const updated = [newArticle, ...current];
  saveStoredNews(updated);

  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('news_articles')
      .insert([{
        id: newArticle.id,
        title: newArticle.title,
        datetime: newArticle.datetime,
        tags: newArticle.tags,
        image: newArticle.image,
        summary: newArticle.summary,
        body: newArticle.body,
        author: newArticle.author,
        read_time: newArticle.readTime,
        status: newArticle.status,
      }])
      .then(({ error }) => {
        if (error) console.warn('Supabase news insert notice:', error.message);
      });
  }

  return newArticle;
};

export const deleteStoredNews = (id: string) => {
  const current = getStoredNews();
  const updated = current.filter((item) => item.id !== id);
  saveStoredNews(updated);

  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('news_articles')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase news delete notice:', error.message);
      });
  }
};

// --- OUR WORKS / PORTFOLIO ---
export const getStoredWorks = (): PortfolioWork[] => {
  const data = localStorage.getItem(WORKS_KEY);
  if (!data) {
    localStorage.setItem(WORKS_KEY, JSON.stringify(INITIAL_WORKS));
    return INITIAL_WORKS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_WORKS;
  }
};

export const saveStoredWorks = (works: PortfolioWork[]) => {
  localStorage.setItem(WORKS_KEY, JSON.stringify(works));
  window.dispatchEvent(new Event('gozero_works_updated'));
};

export const addStoredWork = (work: Omit<PortfolioWork, 'id'>) => {
  const current = getStoredWorks();
  const newWork: PortfolioWork = {
    ...work,
    id: `WORK-${Math.floor(100 + Math.random() * 900)}`,
  };
  const updated = [newWork, ...current];
  saveStoredWorks(updated);

  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('portfolio_works')
      .insert([{
        id: newWork.id,
        title: newWork.title,
        client: newWork.clientName,
        category: newWork.category,
        mockup_type: newWork.mockupType,
        revenue_metric: newWork.revenueMetric,
        attribution: newWork.attribution,
        status: newWork.status,
      }])
      .then(({ error }) => {
        if (error) console.warn('Supabase work insert notice:', error.message);
      });
  }

  return newWork;
};

export const deleteStoredWork = (id: string) => {
  const current = getStoredWorks();
  const updated = current.filter((item) => item.id !== id);
  saveStoredWorks(updated);

  if (isSupabaseConfigured() && supabase) {
    supabase
      .from('portfolio_works')
      .delete()
      .eq('id', id)
      .then(({ error }) => {
        if (error) console.warn('Supabase work delete notice:', error.message);
      });
  }
};

// --- AUTH ---
export const checkAdminAuth = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'authenticated';
};

export const setAdminAuth = (authenticated: boolean) => {
  if (authenticated) {
    localStorage.setItem(AUTH_KEY, 'authenticated');
  } else {
    localStorage.removeItem(AUTH_KEY);
  }
};

// --- SUPABASE CLOUD SYNC & DATA PULL ---
export const syncFromSupabase = async (): Promise<boolean> => {
  if (!isSupabaseConfigured() || !supabase) return false;

  try {
    // 1. Sync Settings
    const { data: settingsData } = await supabase
      .from('company_settings')
      .select('*')
      .eq('id', 'primary')
      .maybeSingle();

    if (settingsData) {
      const mappedSettings: CompanySettings = {
        email: settingsData.email,
        phone: settingsData.phone,
        whatsappNumber: settingsData.whatsapp,
        whatsappTooltip: settingsData.whatsapp_tooltip,
        socialLinks: {
          linkedin: settingsData.linkedin,
          twitter: settingsData.twitter,
          github: settingsData.github,
          instagram: settingsData.instagram,
          facebook: settingsData.facebook,
          youtube: settingsData.youtube,
        },
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(mappedSettings));
      window.dispatchEvent(new CustomEvent('gozero_settings_updated', { detail: mappedSettings }));
    }

    // 2. Sync News
    const { data: newsData } = await supabase
      .from('news_articles')
      .select('*')
      .order('datetime', { ascending: false });

    if (newsData && newsData.length > 0) {
      const mappedNews: NewsArticle[] = newsData.map((item: any) => ({
        id: item.id,
        title: item.title,
        datetime: item.datetime,
        tags: item.tags || [],
        image: item.image,
        summary: item.summary,
        body: item.body,
        author: item.author,
        readTime: item.read_time,
        status: item.status,
      }));
      localStorage.setItem(NEWS_KEY, JSON.stringify(mappedNews));
      window.dispatchEvent(new Event('gozero_news_updated'));
    }

    // 3. Sync Works
    const { data: worksData } = await supabase
      .from('portfolio_works')
      .select('*')
      .order('order_index', { ascending: true });

    if (worksData && worksData.length > 0) {
      const mappedWorks: PortfolioWork[] = worksData.map((item: any) => ({
        id: item.id,
        title: item.title,
        clientName: item.client,
        category: item.category,
        mockupType: item.mockup_type,
        description: item.title,
        revenueMetric: item.revenue_metric,
        attribution: item.attribution,
        status: item.status,
        featured: true,
      }));
      localStorage.setItem(WORKS_KEY, JSON.stringify(mappedWorks));
      window.dispatchEvent(new Event('gozero_works_updated'));
    }

    // 4. Sync Inquiries
    const { data: inqData } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (inqData && inqData.length > 0) {
      const mappedInqs: FreeBuildInquiry[] = inqData.map((item: any) => ({
        id: item.id,
        name: item.contact_person,
        organization: item.organization,
        email: item.email,
        phone: item.phone,
        platform: item.platform_scope,
        currentRevenue: 'Verified Cloud Lead',
        message: item.project_goals,
        date: item.date || item.created_at?.split('T')[0] || '',
        status: item.status,
        estimatedValue: '$0 Upfront (Active)',
      }));
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(mappedInqs));
      window.dispatchEvent(new Event('gozero_inquiries_updated'));
    }

    return true;
  } catch (err) {
    console.warn('Supabase sync notice:', err);
    return false;
  }
};

// Auto-trigger background cloud sync if running in browser with Supabase configured
if (typeof window !== 'undefined' && isSupabaseConfigured()) {
  syncFromSupabase();
}

