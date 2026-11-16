# Tahani Ghobon – Portfolio

Static site, no build step.

## Publish on GitHub Pages
1. Create a repo and upload everything in this folder (keep `.github/`).
2. Settings → Pages → Source: **GitHub Actions**. Push to `main` and the site deploys.

## Edit content
All text, videos and simulations live in `js/data.js`.
- Video titles: edit the `title` fields.
- Card games: put files in `games/cards/`, then add entries to `CARD_GAMES`.
- Photo: add `assets/images/` files and reference them from `index.html`.

## Structure
`index.html` · `css/style.css` · `js/data.js` · `js/main.js` · `simulations/` (20 simulators) · `games/mathverse/` · `games/cards/` (3 card games) · `games/cards/`
