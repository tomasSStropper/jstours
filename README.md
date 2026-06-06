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
- Google Maps embeds with dark theme filter
- Respects `prefers-reduced-motion`

## Development

This is a static site. Open `index.html` in a browser or deploy to Vercel.

```bash
# Deploy to Vercel
vercel
```

## Contact

- WhatsApp: +506 6391-4901
- Email: jce1310@hotmail.com

---

Developed by **TyT Software & Solutions**
