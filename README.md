# PUNARVA 2K26

# not in production this repo 

> NSS State-Level Recycling & Upcycling Hands-on Training Camp

A React + Vite web application for **PUNARVA 2K26** — a State-Level Recycling & Upcycling Hands-on Training Camp organized by NSS Units 102 & 115 at EMEA College of Arts and Science, Kondotty, under the Swachhata Action Plan.

**📅 24–26 July 2026 · 📍 EMEA College, Kondotty**

## Tech Stack

- **React 19** + **Vite 8**
- **Supabase** for registration data
- **Vanilla CSS** with custom design system

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Then fill in your Supabase URL and anon key

# Start dev server
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

## Pages

- `/` — Home page with event details
- `/registration` — Event registration form
- `/admin` — Admin login portal
- `/admin/dashboard` — Registration management dashboard

## License

All rights reserved © 2026 NSS EMEA College
