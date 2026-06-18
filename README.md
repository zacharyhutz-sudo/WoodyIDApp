# WoodyIDApp 🌳

A mobile-friendly plant identification and mapping tool for UGA students and faculty.

## Features
- **Interactive Campus Map**: Drag-and-drop plant pins on a high-res satellite map.
- **Dynamic Plant Lists**: Categorized by study groups with search and detail views.
- **Admin Dashboard**: Easy plant management and group creation.
- **Curriculum Ordering**: Fall 2026 groups use the official list order for study cards, lists, and map marker numbers.

## Deployment

This app is designed to be deployed to **Netlify**.

1. Connect this repo to a new Netlify site.
2. In Netlify **Site Configuration > Environment variables**, add:
   - `ASTRO_DB_REMOTE_URL`: Your Turso DB URL
   - `ASTRO_DB_APP_TOKEN`: Your Turso Auth Token
   - `ADMIN_PASSWORD`: `ugawoodies`
3. Deploy.

## Fall 2026 Plant Group Migration

The Fall 2026 regrouping is intentionally designed to preserve existing plant pins and images.

The `Plants` table now includes:

- `sortOrder`: official plant number within the group list
- `active`: visible in the current curriculum when `true`; old removed plants can be hidden without deleting their historical pin/image data

Before syncing production, make a backup/export of the current remote `Plants` table.

Recommended production sequence:

```bash
npm run verify:f26-data
npm run build
npm run db:push
npm run db:sync:f26
```

The sync script updates existing plant rows by normalized scientific name and **does not update `latitude`, `longitude`, or `imageUrl`**. After the update, it re-reads the database and throws an error if any pre-existing row has different pin coordinates or image URL.

The eight removed Fall 2026 plants are marked inactive instead of deleted:

- Nyssa aquatica
- Cotinus obovatus
- Trachelospermum jasminoides
- Callicarpa dichotoma
- Ilex cornuta 'Dwarf Burford'
- Osmanthus heterophyllus
- Myrica rubra
- Prunus laurocerasus 'Otto Luyken'

## Tech Stack
- **Framework**: [Astro](https://astro.build)
- **Database**: [Astro DB](https://docs.astro.build/en/guides/astro-db/) powered by Turso/LibSQL
- **Styling**: Tailwind CSS
- **Map**: Leaflet
