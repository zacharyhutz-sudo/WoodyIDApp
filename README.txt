Woody ID favicon patch

Replace the matching files in your repo with these files:
- public/favicon.svg
- public/favicon.ico
- src/layouts/Layout.astro

The Layout.astro change only adds a version query to the favicon URLs so Safari/Chrome do not keep showing the old cached Astro favicon.
