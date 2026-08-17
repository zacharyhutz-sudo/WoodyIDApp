# Woody ID Native Polish Patch

## Implemented

- Library group cards changed to a denser two-column mobile grid.
- Search simplified into a native-style search field with a dedicated filter button.
- Field ID filters moved into a bottom sheet with backdrop, Done, Clear, and Show Results actions.
- Group detail flow changed from full plant cards to a compact species list.
- Species rows now open a dedicated plant detail screen and the Back button returns to the group.
- Plant detail hierarchy changed to common name first, scientific name second in EB Garamond italic.
- Plant details reorganized into Leaf, Bark, Flower, and Fruit sections.
- Key ID cue chips retained but visually softened.
- Map access retained from plant detail, including the existing focus behavior.
- Search results changed to common-name-first hierarchy.
- Library and Study styling simplified: less uppercase, fewer heavy shadows, smaller radii, faster feedback.
- Bottom tab bar refined with a clearer selected state and native-style blur.
- Admin link reduced to a discreet overflow control in the header.
- iPhone safe-area handling added for top bars, bottom tab bar, map, sheets, and installed PWA mode.
- Reduced-motion support added.
- Missing 192px and 512px PWA icons added with a custom Woody ID leaf mark.

## Intentionally deferred for the next pass

- Swipe gestures for flashcards.
- A persistent Continue Studying / progress card on Study home.
- Multi-image plant galleries (leaf, bark, fruit, habit).
- Fine-tuned installed-iPhone testing and animation polishing on real hardware.

## Validation

- Embedded browser JavaScript passed `node --check`.
- PWA icon files were generated and validated as 192x192 and 512x512 PNGs.
- A full fresh Astro build was not completed in the packaging environment because dependency installation stalled before node_modules could be installed. No package/dependency versions were changed by this patch.

## Follow-up UX fix pass

Based on real iPhone Safari screenshots, this pass also adds:

- Map plant detail is now a true native-style detail screen with a visible **Map** back button instead of an `X` floating over photography.
- The map detail header is separated from the image, so Safari browser chrome can no longer make the close control visually disappear into the photo.
- Map plant photography now uses a contained foreground image over a subtle blurred fill. This keeps the complete identification photo visible instead of aggressively cropping it to a fixed `object-cover` frame.
- Map plant detail now matches Library detail hierarchy: common name first, italic scientific name, family, quick ID cues, then Leaf/Bark/Flower/Fruit sections.
- Map search results now use the same common-name-first hierarchy as Library.
- Root tab behavior was corrected: tapping **Library**, **Study**, or **Map** closes any open Library plant/group detail and any open Map plant detail before switching sections.
- Inactive tab labels/icons, plant family labels, and species-row chevrons received a small contrast increase for better iPhone readability.
- Map chrome was softened: title-case navigation, a calmer drawer radius/shadow, faster drawer motion, and less all-caps tracking.
- Species counts now use sentence case (`20 species`) for a more native tone.

### Follow-up validation

- Fall 2026 curriculum/data verification passed: 10 groups and 202 visible plants.
- Approved image override verification passed.
- Both modified client scripts passed TypeScript transpile parsing with no syntax/transpile errors.
- A fresh production Astro build was not run because this packaging environment does not have the project's `node_modules` installed.

