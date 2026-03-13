# WoodyIDApp 🌳

A mobile-friendly plant identification and mapping tool for UGA students and faculty.

## Features
- **Interactive Campus Map**: Drag-and-drop plant pins on a high-res satellite map.
- **Dynamic Plant Lists**: Categorized by study groups with search and detail views.
- **Admin Dashboard**: Easy plant management and group creation.

## Deployment

This app is designed to be deployed to **Netlify**.

1. Connect this repo to a new Netlify site.
2. In Netlify **Site Configuration > Environment variables**, add:
   - `ASTRO_DB_REMOTE_URL`: (Your Turso DB URL)
   - `ASTRO_DB_APP_TOKEN`: (Your Turso Auth Token)
   - `ADMIN_PASSWORD`: `ugawoodies`
3. Deploy!

## Tech Stack
- **Framework**: [Astro](https://astro.build)
- **Database**: [Astro DB](https://docs.astro.build/en/guides/astro-db/) (powered by Turso/LibSQL)
- **Styling**: Tailwind CSS
- **Map**: Leaflet
