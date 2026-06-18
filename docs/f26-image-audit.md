# Fall 2026 plant image audit

This patch uses a display-only image override system. It does not overwrite `Plants.imageUrl`, `latitude`, `longitude`, or any existing plant row IDs in the remote database.

## Findings from the uploaded `/api/plants.json` export

- 202 active Fall 2026 plants reviewed from the API export.
- 0 missing image URLs.
- 3 duplicated current image URLs found.
- 4 approved display overrides added.

## Approved display overrides

1. `Quercus lyrata` — replaces a weak/unclear overcup oak image with a verified Commons image showing leaves and the diagnostic overcup acorn.
2. `Quercus shumardii` — fixes the confirmed red-oak duplicate image by using a public-domain Shumard oak leaf image.
3. `Loropetalum chinense var. rubrum` — separates the red-flowering form from the plain species image.
4. `Ilex cornuta 'Rotunda'` — separates Rotunda holly from the Burford holly image.

See `docs/f26-image-audit.json` for the full per-plant report.
