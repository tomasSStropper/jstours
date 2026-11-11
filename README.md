# Juan Carlos Calvo Esquivel — Monteverde Naturalist Guide

Premium tourist guide website for Juan Carlos Calvo Esquivel, a naturalist guide with 30+ years of experience in Monteverde, Costa Rica.

## Stack

- HTML + CSS + Vanilla JS (no frameworks)
- Deployed on Vercel (static site)

## Pages

- **index.html** — Home: hero with fauna spotlight, stats, the guide, experiences preview, gallery, wildlife carousel, testimonials, FAQ, booking form
- **tours.html** — Tours: day / night / private tour details with pricing and the wildlife you'll spot on each
- **places.html** — Places & Hours: reserve info, hours, maps, visitor tips

## Data

- **js/fauna.js** — single source of truth for the species shown in the hero spotlight, the wildlife carousel and the per-tour "what you'll spot" lists. Add a species by appending one object.

## Features

- Bilingual toggle (EN/ES) with localStorage persistence (covers JS-rendered content via a `langchange` event)
- Scroll animations via IntersectionObserver
- Custom cursor (leaf dot + ring)
- Hero fauna spotlight (crossfade rotation, drifting mist, light particles)
- Auto-scrolling, draggable wildlife carousel
- Grain texture overlay on hero sections
- Mobile responsive with hamburger menu
- Booking form with WhatsApp integration
- Floating WhatsApp + email contact buttons (icon expands to label on hover)
- ICT certificate modal (credential opens front/back of the carné from `images/ict/ict-front.webp` and `ict-back.webp`; closes via ×, backdrop or Esc)
- Google Maps embeds with dark theme filter
- Respects `prefers-reduced-motion`

## Development

This is a static site. Internal links use clean URLs (`/`, `/tours`, `/places`),
so run it through a static server instead of opening the files directly:

```bash
# Local preview (serves tours.html at /tours, like Vercel does)
npx serve .

# Deploy to Vercel
vercel
```

## Domain & SEO

- Production domain: **https://www.jctourscr.com** (`jctourscr.com` redirects to `www`).
- Every `canonical`, `og:url`, JSON-LD `url`, `sitemap.xml` and `robots.txt` entry must
  use that domain. Never point them at `*.vercel.app`: Google would index the Vercel
  copy and drop the real home page from search results.
- `vercel.json` permanently redirects `jstours.vercel.app` to the production domain and
  enables `cleanUrls` (`/tours.html` redirects to `/tours`), so each page has one URL.

## Contact

- WhatsApp: +506 8301 4402
- Email: jc.tour.cr@gmail.com

---

Developed by **TyT Software & Solutions**
