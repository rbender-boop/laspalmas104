# Las Palmas 104 — Sales Website

Static marketing site for the sale of **Las Palmas 104**, a 3,004 m² estate lot on the Punta Espada golf course, Cap Cana, Dominican Republic.

## Pages
- `index.html` — Home
- `the-lot.html` — Specifications, buildable envelope, 270° views, diagrams, terrace video
- `cap-cana.html` — Tourism & development growth story, attractions, videos
- `investment.html` — Market data + illustrative 10-year appreciation scenarios (with disclaimer)
- `location.html` — Interactive MapLibre attractions map + distances
- `gallery.html` — Photo gallery + terrace video
- `contact.html` — Email / WhatsApp inquiry

## Structure
```
laspalmas104-site/
  *.html
  assets/css/site.css
  assets/js/site.js
  assets/js/map.js         # surveyed lot pin: 18.46082744, -68.41853240
  images/                  # hero, diagrams, gallery-01..13
  vercel.json  robots.txt  sitemap.xml
```
No build step — pure static HTML/CSS/JS. The map uses MapLibre GL (CDN) + OpenFreeMap tiles (no API key). Attraction thumbnails load from espadavilla.com.

## Deploy (Vercel)
1. Push this folder to a GitHub repo (see git command in chat).
2. In Vercel: **New Project** → import the repo.
3. Framework Preset: **Other**. Root Directory: **laspalmas104-site** (if repo root is the parent) or leave as-is if the repo root *is* this folder. Build Command: none. Output Directory: leave blank.
4. Deploy, then add domain **www.laspalmas104.com** under Project → Settings → Domains, and point GoDaddy DNS per Vercel's instructions.

## To finalize before wide launch
- Confirm gallery photo → attraction mapping if you want specific shots used as attraction cards (currently attraction cards use labelled espadavilla.com images; your photos populate the gallery).
- Review investment projections copy (illustrative; disclaimer included).
