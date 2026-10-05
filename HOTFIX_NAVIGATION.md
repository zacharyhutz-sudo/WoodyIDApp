# Woody ID navigation hotfix - 2026-10-05

## Install

Extract `WoodyID_navigation_hotfix.zip`. Upload its CONTENTS to the root of the
existing GitHub repository, preserving the included `src/pages/` and `scripts/`
folders, then commit. Do not upload the ZIP itself or replace the whole repository.

The ZIP contains only these changed/new files:

- `src/pages/index.astro`: removes the two invalid TypeScript assertions from the
  unprocessed homepage script, and adds a comment explaining the constraint.
- `scripts/verify-browser-scripts.mjs`: new dependency-free raw JavaScript syntax check.
- `package.json`: runs that check automatically before `npm run build` and exposes
  `npm run verify:browser-scripts` for manual use.
- `HOTFIX_NAVIGATION.md`: these instructions and validation notes.

No packages were added or upgraded. The lockfile, database, plant data, images,
admin pages, map component, layout, and existing visual changes are unchanged.
The minimum runtime repair is the replacement `src/pages/index.astro`; upload
all files together to retain the build-time regression guard.

## Root cause

The homepage uses `<script define:vars={{ groups }}>`. Astro sends this script
to the browser without TypeScript transpilation. Two focus-restoration statements
contained `as HTMLElement`, which is TypeScript rather than browser JavaScript.
The resulting `SyntaxError: Unexpected identifier 'as'` prevented the entire script
from running, including registration of the Library, Study, Map, and group handlers.

The fix preserves focus restoration using plain JavaScript optional chaining:

```js
if (restoreFocus) studyReturnFocus?.focus?.();
// ...
else filterReturnFocus?.focus?.();
```

The earlier patch's TypeScript-transpile check could not detect this class of
error. The new check parses unprocessed scripts as JavaScript without transpiling
or executing them. Running `npm run build` invokes it through the npm `prebuild` hook;
keep `npm run build` as the deployment build command to include this guard. It adds no network or database requirements.

## Validation completed

- The original script fails both the raw JavaScript check and the new prebuild
  guard. The fixed script passes both.
- The original script reproduces dead Study navigation and an unresponsive Library
  group button in a Chromium browser fixture.
- The corrected script passes isolated Chromium interaction tests at desktop
  (1280 x 900) and mobile (390 x 844, touch-enabled) viewport sizes:
  - Startup and family-filter initialization.
  - Pointer-click switching between Library, Study, and Map; selected-tab state.
  - All 10 Library groups, their species counts/lists, plant details, and Back paths.
  - Root-tab dismissal of Library detail, image lightbox, and View on Map callback.
  - Search results, search-result details, no-results state, and clearing search.
  - Filter Done/Apply/backdrop/Escape dismissal and focus restoration; family/trait
    filtering and clearing filters.
  - All 10 Study group dialogs, Cancel/Escape dismissal, and focus restoration.
  - Flashcards: flip, next/previous, both answer directions, shuffle, and the
    cumulative 202-card deck.
  - A complete 20-question typing quiz, score/results, missed-answer review, and
    image-quiz startup.
  - No uncaught JavaScript errors during the corrected-script test suite.
- Existing `verify:f26-data` passed: 10 groups and all 202 curriculum entries.
- Existing `verify:images` passed: all four approved image overrides.
- Dependency declarations, engine requirements, and package-lock.json are unchanged.

## Validation boundaries

The browser tests used the app's actual markup and raw homepage script with local
fixture data, test image URLs, an in-memory storage stand-in, and map callback spies.
They were not a deployed-site test or an Astro production build. Tailwind compilation,
real map rendering/tiles, live database data, production image processing, and real
Safari/iPhone behavior were not exercised. The map component was not changed.

A fresh npm dependency installation was attempted but failed because the environment
could not resolve registry.npmjs.org (EAI_AGAIN). A full production build therefore
could not be completed here. Nothing has been committed or deployed to the live site.

## After deployment

Confirm that Netlify's deployment succeeds, then reload the app. Check Library ->
Study -> Map -> Library, open a Library group and a plant, and open Map's group picker.
Close and reopen any previously open installed-app window as part of this check.
Do not clear all browser/site data as a first step: the app stores missed-species
study history in localStorage, and clearing it would remove that local history.
