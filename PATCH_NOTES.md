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
- Map pin selection redesigned into the same plant-detail bottom-sheet language.
- Fine-tuned installed-iPhone testing and animation polishing on real hardware.

## Validation

- Embedded browser JavaScript passed `node --check`.
- PWA icon files were generated and validated as 192x192 and 512x512 PNGs.
- A full fresh Astro build was not completed in the packaging environment because dependency installation stalled before node_modules could be installed. No package/dependency versions were changed by this patch.
