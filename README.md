# DDoS Attack Visualization Dashboard

Built this to give my Master's research paper a visual interface — 
the paper covered ML-enhanced adaptive DDoS filtering and it felt 
incomplete without something you could actually interact with.

## The Research

Co-authored a paper at Wilfrid Laurier University on ML-Enhanced 
Adaptive DDoS Filtering using Random Forest and XGBoost classifiers 
trained on the CIC-DDoS2019 dataset (50,000+ traffic flows). The 
attack taxonomy, filtering strategies, and severity classification 
in this dashboard come directly from that research.

- Random Forest accuracy: 84%
- XGBoost accuracy: 85%
- Simulation showed 97.8% reduction in attack traffic

## What it does

- Live incident feed with severity color-coding
- Incident detail pages with attack timeline
- Analytics dashboard with Recharts visualizations
  - Attacks by type (Volumetric / Protocol / Application-layer)
  - Filtering strategies used (IP / Subnet / Port / Rate-limiting)
  - ML model accuracy comparison
- Auth-protected admin panel to create and delete incidents
- PostgreSQL backend via Supabase with Row Level Security

## Try it

👉 [ddos-attack-dashboard.vercel.app](https://ddos-attack-dashboard.vercel.app)

Admin login is restricted. Public dashboard is fully accessible.

## Tech

React, Vite, Supabase (PostgreSQL + Auth), Recharts, Tailwind CSS, 
Vercel

## Run locally

```bash
git clone https://github.com/Krupalmewada/ddos-attack-dashboard.git
cd ddos-attack-dashboard
npm install
```

Create `.env`:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
```

```bash
npm run dev
```
