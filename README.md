# AGM 2026 — SELCO Solar Light Private Limited

An interactive, scroll-driven website version of the Annual General Meeting
presentation. It's a static site — plain HTML, CSS and JavaScript, no build
tools, no server, free to host on GitHub Pages.

This README assumes no prior GitHub experience and sticks to the GitHub
website (no command line needed).

---

## 1. Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in (create a free account
   if you don't have one).
2. Click the **+** icon in the top-right corner → **New repository**.
3. Name it something like `agm-2026`.
4. Set it to **Public** (GitHub Pages on a free account requires a public
   repository).
5. Leave everything else as default and click **Create repository**.

## 2. Upload the files

1. On your new repository's page, click **Add file → Upload files**.
2. Drag in everything from this project folder, **keeping the folder
   structure**:
   ```
   index.html
   css/style.css
   js/data.js
   js/app.js
   assets/README.md
   README.md
   ```
   GitHub's drag-and-drop upload preserves subfolders (`css/`, `js/`,
   `assets/`) as long as you drag the whole folders in, not just the files
   inside them.
3. Scroll down and click **Commit changes**.

## 3. Turn on GitHub Pages

1. In your repository, go to **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Under **Branch**, choose `main` and folder `/ (root)`, then click **Save**.
5. Wait a minute, then refresh the page. GitHub will show you a live URL,
   something like:
   ```
   https://your-username.github.io/agm-2026/
   ```
   That's your presentation, live on the internet, for free.

Any time you upload changed files and commit them, the live site updates
automatically within a minute or two.

## 4. Where everything lives

```
agm-2026/
│
├── index.html        The page structure — you shouldn't need to touch this
├── css/style.css      The design system — colours, type, layout, animation
├── js/data.js         ALL editable content — numbers, copy, stories, images
├── js/app.js          Rendering and interaction logic — you shouldn't need
│                       to touch this to update content
├── assets/            Optional local files (e.g. a favicon)
└── README.md          This file
```

**In almost all cases, the only file you need to edit is `js/data.js`.**

To edit it on GitHub without installing anything: open the file in your
repository, click the pencil (✎) icon top-right, make your change, then
**Commit changes**.

## 5. How to update the numbers

Open `js/data.js`. Each section of the presentation has its own clearly
labelled block:

- `fy2526Systems` — the 9,004 figure and its category breakdown
- `fy2526Sales` — the ₹68.07 Cr figure and its category breakdown
- `fy2627Current` — the FY 2026–27 "so far" figures, and the two bifurcation
  arrays (`salesBifurcation`, `systemsBifurcation`) — currently empty
  placeholders. Add entries in the same shape as other categories once you
  have that data, for example:
  ```javascript
  salesBifurcation: [
    { name: "Institutional", value: 12000000 },
    { name: "Community", value: 8500000 },
  ],
  ```
  The panel updates automatically — no other file needs to change.

Every number is a plain JavaScript value — change it, save, commit. The
counters, bars and rankings on the page recalculate and animate themselves.

## 6. How to add photos (Google Drive)

The presentation loads photos from public Google Drive links rather than
storing large image files in the repository.

**To make a photo usable:**

1. Upload the photo to Google Drive.
2. Right-click it → **Share** → set access to **"Anyone with the link"** →
   **Viewer**.
3. Click **Copy link**. It will look like:
   ```
   https://drive.google.com/file/d/1AbCDefGhIJKlmNoPQRstuVWxyz0123456/view?usp=sharing
   ```
4. Open `js/data.js` and paste that link directly into the relevant field —
   for the hero background, that's `imageSources.hero`; for a story, that's
   the story's `image` field, or wrap it as `driveUrl("...")` if you're
   filling in `imageSources` directly. Either form works — the code
   automatically converts a Drive share link into a usable direct-image URL.

If a photo doesn't load, double check the sharing setting is "Anyone with
the link" — Drive links that require sign-in will not display.

## 7. How to add or edit a story

Open `js/data.js` and find the `stories` array. There are 10 placeholder
entries. Fill in each one you're ready to publish — leave fields as `""`
(empty) if you don't have that piece yet, the layout adapts gracefully:

```javascript
{
  title: "Story title goes here",
  category: "Category",
  location: "",
  year: "",
  description: "A short, concrete description — two to four lines.",
  image: "",          // a Drive link, see section 6
  imageSecondary: "",
  metric: "",          // optional supporting statistic, e.g. "48 households"
  quote: "",           // optional, for later
}
```

You don't need to touch `index.html` or `app.js` to add, remove, or reorder
stories — the horizontal story gallery, page counter and navigation dots all
build themselves from this array.

## 8. Preview locally before uploading

You don't need any special software. In most cases, just:

1. Double-click `index.html` on your computer.
2. It opens in your browser and works as a full preview.

If images don't load when opening the file directly (some browsers restrict
this for local files), you can instead:
- Use the **VS Code** extension "Live Server" (free), or
- Run `python -m http.server` from the project folder in a terminal, then
  visit `http://localhost:8000` — only needed if you're comfortable with a
  terminal; the direct double-click method is usually enough.

## 9. Notes on what's already built vs. what's still a placeholder

- The FY 2025–26 systems (9,004) and sales (₹68.07 Cr) sections use the
  exact figures supplied and are fully built.
- The FY 2026–27 "so far" section (₹20.66 Cr, 3K systems) is built with
  empty bifurcation panels, ready for data — see section 5.
- The 10 story slots are placeholders (see section 7) — none contain
  invented content.
- No beneficiary counts, geographic reach, environmental impact, or growth
  percentages are shown anywhere, since none were supplied. Add these
  intentionally in `data.js` once the figures are confirmed, rather than
  estimating them.

## 10. Accessibility & performance notes

- Respects `prefers-reduced-motion` — animations are skipped for users who
  have that system setting on.
- Images lazy-load as you scroll near them.
- Keyboard: arrow keys move through the story gallery when it's in view;
  the progress rail on the right is also clickable.
- No external JavaScript frameworks — just two small files plus two Google
  Fonts (Fraunces, Inter), loaded free from Google Fonts' CDN.
