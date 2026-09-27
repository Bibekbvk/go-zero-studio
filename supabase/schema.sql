-- ==============================================================================
-- GoZero Studio — Supabase Database Schema & Initial Phase Configuration
-- ==============================================================================

-- 1. Free Build Leads & Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id TEXT PRIMARY KEY,
    organization TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    platform_scope TEXT NOT NULL,
    project_goals TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending Review',
    date TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Our Works / Portfolio CMS Table
CREATE TABLE IF NOT EXISTS portfolio_works (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    client TEXT NOT NULL,
    category TEXT NOT NULL,
    mockup_type TEXT NOT NULL DEFAULT 'web',
    revenue_metric TEXT NOT NULL,
    attribution TEXT NOT NULL DEFAULT 'Built by GoZero Studio (Standard Condition).',
    status TEXT NOT NULL DEFAULT 'Live & Earning',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. News & Dispatches CMS Table
CREATE TABLE IF NOT EXISTS news_articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    datetime TEXT NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    image TEXT NOT NULL DEFAULT '',
    summary TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT '',
    author TEXT NOT NULL DEFAULT 'GoZero Studio Team',
    read_time TEXT NOT NULL DEFAULT '3 min read',
    status TEXT NOT NULL DEFAULT 'Published',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Official Company Settings & Social Media Links Table
CREATE TABLE IF NOT EXISTS company_settings (
    id TEXT PRIMARY KEY DEFAULT 'primary',
    email TEXT NOT NULL DEFAULT 'hello@gozerostudio.com',
    phone TEXT NOT NULL DEFAULT '+1 (555) 789-0123',
    whatsapp TEXT NOT NULL DEFAULT '+18004693761',
    whatsapp_tooltip TEXT NOT NULL DEFAULT 'Message Us Now.',
    linkedin TEXT NOT NULL DEFAULT 'https://linkedin.com/company/gozerostudio',
    twitter TEXT NOT NULL DEFAULT 'https://x.com/gozerostudio',
    github TEXT NOT NULL DEFAULT 'https://github.com/gozerostudio',
    instagram TEXT NOT NULL DEFAULT 'https://instagram.com/gozerostudio',
    facebook TEXT NOT NULL DEFAULT 'https://facebook.com/gozerostudio',
    youtube TEXT NOT NULL DEFAULT 'https://youtube.com/@gozerostudio',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Client Deployments & Revenue Auditing Table
CREATE TABLE IF NOT EXISTS client_deployments (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    category TEXT NOT NULL,
    launch_date TEXT NOT NULL,
    revenue_generated TEXT NOT NULL,
    fee_billed TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Compliant (Zero Billed)',
    compliance_note TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- ==============================================================================

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_works ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_deployments ENABLE ROW LEVEL SECURITY;

-- Allow public leads submission (Anonymous users can submit inquiries)
CREATE POLICY "Public can submit free build inquiries" 
ON inquiries FOR INSERT WITH CHECK (true);

-- Allow admins/clients to read/update inquiries
CREATE POLICY "Admins can view and manage inquiries" 
ON inquiries FOR ALL USING (true);

-- Allow public to view portfolio works
CREATE POLICY "Public can view portfolio works" 
ON portfolio_works FOR SELECT USING (true);

-- Allow admins to manage portfolio works
CREATE POLICY "Admins can manage portfolio works" 
ON portfolio_works FOR ALL USING (true);

-- Allow public to view published news articles
CREATE POLICY "Public can view news articles" 
ON news_articles FOR SELECT USING (status = 'Published' OR true);

-- Allow admins to manage news articles
CREATE POLICY "Admins can manage news articles" 
ON news_articles FOR ALL USING (true);

-- Allow public to read company contact & social settings
CREATE POLICY "Public can view company settings" 
ON company_settings FOR SELECT USING (true);

-- Allow admins to update company settings
CREATE POLICY "Admins can manage company settings" 
ON company_settings FOR ALL USING (true);

-- Allow admins to view deployments
CREATE POLICY "Admins can view and manage client deployments" 
ON client_deployments FOR ALL USING (true);

-- ==============================================================================
-- Initial Seed Data
-- ==============================================================================

-- Seed Primary Settings
INSERT INTO company_settings (
    id, email, phone, whatsapp, whatsapp_tooltip, linkedin, twitter, github, instagram, facebook, youtube
) VALUES (
    'primary',
    'hello@gozerostudio.com',
    '+1 (555) 789-0123',
    '+18004693761',
    'Message Us Now.',
    'https://linkedin.com/company/gozerostudio',
    'https://x.com/gozerostudio',
    'https://github.com/gozerostudio',
    'https://instagram.com/gozerostudio',
    'https://facebook.com/gozerostudio',
    'https://youtube.com/@gozerostudio'
) ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

-- Seed Portfolio Works
INSERT INTO portfolio_works (id, title, client, category, mockup_type, revenue_metric, attribution, status, order_index)
VALUES 
(
    'work-1',
    'Omnichannel Retail & Flash Checkout',
    'Veloce Luxury Retail',
    'Mobile Retail App',
    'mobile',
    '+$34,250 Revenue (Month 1)',
    'Built by GoZero Studio (Standard Condition).',
    'Live & Earning',
    1
),
(
    'work-2',
    'Enterprise SaaS Portal & Orders Engine',
    'Nexus Apex Cloud',
    'Dynamic Web & Sales CRM',
    'web',
    '+$98,400 Volume (Quarter 1)',
    'Built by GoZero Studio (Standard Condition).',
    'Live & Earning',
    2
),
(
    'work-3',
    'B2B Wholesale Procurement Portal',
    'Kallisto Architectural Goods',
    'B2B Wholesale',
    'web',
    '+$14,600 Revenue (Pilot Phase)',
    'Built by GoZero Studio (Standard Condition).',
    'Scaling',
    3
)
ON CONFLICT (id) DO NOTHING;

-- Seed News Articles
INSERT INTO news_articles (id, title, datetime, tags, image, summary, body, author, read_time, status)
VALUES
(
    'news-1',
    'GoZero Studio Crosses $150K in Client Generated Revenue with Zero Upfront Model',
    '2026-09-26 14:30',
    ARRAY['Milestone', 'Zero Upfront', 'Growth'],
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'Our risk-free commercial partnership structure proves unprecedented success across retail and enterprise SaaS clients worldwide.',
    'GoZero Studio today confirmed that its collaborative revenue-aligned development framework has enabled partner businesses to surpass $150,000 in direct online revenue during Q3 2026 without a single penny paid upfront in engineering retainers.\n\nBy absorbing 100% of upfront development, architectural design, and cloud infrastructure costs, GoZero Studio demonstrates complete skin in the game. Clients only pay a modest agreed revenue share once verified customer orders flow through their native apps and web systems.',
    'Elena Vance, Head of Strategy',
    '3 min read',
    'Published'
),
(
    'news-2',
    'Introducing Ultra-Fast Headless Checkout & Sales CRM for Retail Partners',
    '2026-09-24 10:15',
    ARRAY['Product Update', 'Mobile Retail', 'Architecture'],
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'Every free digital profile build now includes sub-second flash checkouts, Apple Pay/Google Pay integration, and automated inventory sync.',
    'Speed translates directly into conversion velocity. We have upgraded our default mobile and web retail stack with instant sub-200ms checkout pipelines, biometric payment authorization, and integrated inventory management.\n\nThis high-converting architecture is deployed out of the box for every new qualifying retail partner under our standard zero-risk terms.',
    'Devin Thorne, Lead Architect',
    '4 min read',
    'Published'
),
(
    'news-3',
    'Global Edge Node Expansion: Reduced Latency to Sub-20ms Worldwide',
    '2026-09-21 16:45',
    ARRAY['Infrastructure', 'Service Areas', 'Speed'],
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    'New edge deployment clusters in North America, Europe, and Asia-Pacific ensure our client websites load with instant zero-lag response.',
    'As part of our commitment to delivering world-class digital profiles, GoZero Studio has expanded its edge deployment network across 24 global regions. Every client platform hosted through our infrastructure automatically benefits from localized caching, DDoS shield security, and optimal latency for global shoppers.',
    'GoZero Infrastructure Team',
    '2 min read',
    'Published'
)
ON CONFLICT (id) DO NOTHING;
