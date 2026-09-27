# GoZero Studio — Premium Web & Mobile App Ecosystem

> **Zero Upfront. No Revenue, No Fees.**  
> A high-performance commercial landing application and executive management suite for GoZero Studio, built with React 19, TypeScript, Vite, Remotion programmatic motion animations, Supabase cloud persistence, and Firebase Hosting.

---

## 🚀 Key Features

- **Remotion Kinetic Video & Timeline Engine**: Dynamic 3-phase commercial visualization illustrating Zero Risk, Zero Retainer, and Revenue Alignment.
- **5 Core Business Guarantees**: Comprehensive interactive breakdown of the GoZero Studio business model.
- **Client Showcase ("Our Works")**: Dynamic portfolio displaying real-world performance metrics, responsive mobile/web mockups, and standard client attributions.
- **Studio Journal & News CMS**: Rich news feed supporting publication dates, tags, read times, images, summaries, and full interactive article modals.
- **Global Coverage Grid**: Minimalist world presence map highlighting active edge clusters (North America, UK & Europe, Asia-Pacific, GCC / Middle East).
- **Floating Interactive WhatsApp Hotline**: Always-available direct communication widget with dynamic admin-controlled tooltip and target number.
- **Executive Admin Suite (CRM & CMS)**:
  - **Free Build Leads CRM**: Inquiries pipeline with status updates (`Pending Review`, `Approved`, `In Development`, `Launched`, `Generating Revenue`) and lead inspection drawer.
  - **Our Works CMS**: Full CRUD operations for portfolio items, mockup viewports, and revenue highlights.
  - **News & Editorial CMS**: Complete article authoring with tags, cover images, summaries, and Markdown-ready bodies.
  - **Contact & Social Media Settings**: Dynamic management of official email, telephone, WhatsApp hotline, and pasted links for LinkedIn, X/Twitter, GitHub, Instagram, Facebook, and YouTube.
  - **Client Deployments Audit**: Live verification monitor tracking zero-upfront compliance.

---

## 🔒 Admin Access Credentials

- **URL Access**: Visit `http://localhost:5173/#admin` or click the **`[🔒 Admin]`** button in the header navigation or the **`Admin Portal`** link in the footer.
- **Keyboard Shortcut**: Press `Ctrl + Shift + A` anywhere on the site.
- **Default Credentials**:
  - **Admin ID**: `admin`
  - **Password**: `special4u@A`

---

## 🗄️ Supabase Backend (Initial Phase Setup)

GoZero Studio is architected with a resilient dual-mode data layer:
1. **Offline & Edge Fallback**: Runs with instantaneous zero-latency local storage if keys are absent.
2. **Supabase Cloud Sync**: Synchronizes leads, settings, works, and news directly with your Supabase database when configured.

### Quick Setup Steps:
1. Create a project at [supabase.com](https://supabase.com).
2. In your Supabase Dashboard, navigate to the **SQL Editor**.
3. Copy and execute the contents of [`supabase/schema.sql`](supabase/schema.sql). This will automatically create:
   - `inquiries` (Free Build leads)
   - `portfolio_works` (Portfolio CMS)
   - `news_articles` (News CMS)
   - `company_settings` (Official contact & social URLs)
   - `client_deployments` (Revenue compliance audits)
   - Configured Row Level Security (RLS) policies and seed data.
4. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
5. Fill in your project keys:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

---

## 🔥 Firebase Hosting Deployment

The repository includes a ready-to-deploy [`firebase.json`](firebase.json) configured for single-page application routing.

### Deploying to Firebase:
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Select or link your Firebase project:
   ```bash
   firebase use <your-firebase-project-id>
   ```
   *(or run `firebase init hosting` to choose from your project list)*
3. Deploy to production:
   ```bash
   firebase deploy --only hosting
   ```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🎨 Color Palette Reference

- `#22262E` — Dark Slate (Cards, Modals & Elevators)
- `#181B20` — Deep Background Dark
- `#BAC1CC` — Light Gray Accent
- `#5A6270` — Medium Gray (Subtle Borders & Labels)
- `#FFFFFF` — Pure White (Headlines & High Contrast Elements)
