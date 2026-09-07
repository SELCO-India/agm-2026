/**
 * AGM 2026 — DATA
 * -----------------------------------------------------------------------
 * Everything you will want to edit lives in this file: numbers, category
 * labels, sales figures, story content, and image URLs.
 *
 * You should NOT need to touch index.html, style.css or app.js to update
 * the presentation's content. If you're adding photos, editing story
 * text, or updating figures for a future AGM, this is the only file
 * you need.
 * -----------------------------------------------------------------------
 */

/* -------------------------------------------------------------------- *
 * 1. IMAGE SOURCES
 * -------------------------------------------------------------------- *
 * Centralised so URLs can be swapped in one place later. Leave entries
 * blank ("") until you have a real image — the gallery/hero components
 * will show an elegant placeholder instead of a broken image icon.
 *
 * GOOGLE DRIVE NOTE:
 * A normal Drive "share" link (the one you get from "Copy link") looks
 * like:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * That URL opens Drive's viewer page, NOT the raw image — an <img> tag
 * cannot load it directly. Use the helper `driveImageUrl(fileId)` below,
 * which converts a Drive file ID into a direct-loading image URL, e.g.:
 *
 *   driveImageUrl("1AbCDefGhIJKlmNoPQRstuVWxyz0123456")
 *
 * To get the file ID: take the long string between "/d/" and "/view" in
 * the share link. The file's Drive sharing setting must be
 * "Anyone with the link can view".
 * -------------------------------------------------------------------- */

/**
 * Converts a public Google Drive file ID into a direct image URL.
 * Works for images shared as "Anyone with the link can view".
 * If Google changes this behaviour in future, this is the only place
 * you'll need to update.
 */
function driveImageUrl(fileId) {
  if (!fileId) return "";
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

const imageSources = {
  // Opening hero background. A free, no-watermark stock photo (golden-hour
  // wheat field, Uttarakhand, India — via Pexels, free to use) is set here
  // as a placeholder so the opening section isn't blank. Replace with your
  // own photo (a Drive link or a path like "assets/hero.jpg") any time —
  // see README.md, section 6.
  hero: "https://images.pexels.com/photos/7385132/pexels-photo-7385132.jpeg?auto=compress&cs=tinysrgb&w=1920",

  // SELCO logo, shown fixed top-left across the whole site. Leave blank to
  // show no logo. Upload your logo file into the assets/ folder (e.g.
  // assets/logo.png) and put that path here, e.g. "assets/logo.png".
  // A Google Drive link (via driveUrl(...)) also works.
  logo: "assets/SELCO.png",

  // Optional secondary texture/photo used behind the data sections.
  // Leave blank to keep those sections purely typographic.
  dataSectionAmbient: "",
};

/* -------------------------------------------------------------------- *
 * 2. FY 2025–26 — SYSTEMS / SOLUTIONS DELIVERED
 * -------------------------------------------------------------------- */

const fy2526Systems = {
  total: 9004,
  // Neutral wording used until exact terminology is confirmed.
  totalLabel: "Solutions delivered",
  categories: [
    { name: "Basic Energy Small", value: 1087 },
    { name: "Basic Energy Medium", value: 1691 },
    { name: "Institutional", value: 474 },
    { name: "Community", value: 2376 },
    { name: "Livelihood", value: 1188 },
    { name: "Education", value: 192 },
    { name: "Water Heater", value: 1996 },
  ],
};

/* -------------------------------------------------------------------- *
 * 3. FY 2025–26 — SALES
 * -------------------------------------------------------------------- *
 * Exact figures (₹) are retained for calculation. Display uses rounded
 * Cr figures per SELCO's stated convention.
 * -------------------------------------------------------------------- */

const fy2526Sales = {
  totalExact: 680694351.13,
  totalDisplay: "₹68.07 Cr",
  categories: [
    { name: "AMC", value: 3290770.73 },
    { name: "Education", value: 14544474.13 },
    { name: "Spare", value: 26034851.65 },
    { name: "Basic Energy Small", value: 26195920.73 },
    { name: "Water Heater", value: 60438913.72 },
    { name: "Community", value: 70973175.17 },
    { name: "Institutional", value: 133206751.90 },
    { name: "Livelihood", value: 155016173.10 },
    { name: "Basic Energy Medium", value: 190993320.00 },
  ],
};

/* -------------------------------------------------------------------- *
 * 4. FY 2026–27 — CURRENT MOMENTUM (SO FAR, NOT FINAL)
 * -------------------------------------------------------------------- *
 * Bifurcation data (by category / region / etc.) will be supplied
 * later — the two arrays below are intentionally empty. The UI renders
 * an empty-state placeholder when an array has no entries, so you can
 * add rows here later without touching any other file.
 * -------------------------------------------------------------------- */

const fy2627Current = {
  totalSalesDisplay: "₹20.66 Cr",
  totalSalesExact: 206600000, // approximate — replace with exact figure when available
  systemsDisplay: "3K",
  asOfLabel: "So far this year",

  // Fill these in later, e.g.:
  // salesBifurcation: [{ name: "Institutional", value: 12000000 }, ...]
  salesBifurcation: [],
  systemsBifurcation: [],
};

/* -------------------------------------------------------------------- *
 * 5. STORIES BEHIND THE NUMBERS
 * -------------------------------------------------------------------- *
 * Up to 10 entries. Each renders as one horizontal-scroll panel in the
 * order listed. To add a story, add an object to this array — no HTML
 * editing required. Leave fields as empty strings ("") if not yet
 * available; the layout adapts gracefully to missing image/metric/etc.
 *
 * PHOTOS: the `image` field accepts either
 *   - a path to a photo you've uploaded straight into this repo, e.g.
 *     "assets/stories/story01.jpg" (simplest — see README.md, section 6), or
 *   - a Google Drive share link, wrapped as driveUrl("https://drive.google.com/...")
 * -------------------------------------------------------------------- */

const stories = [
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "", // driveImageUrl("FILE_ID") once available
    imageSecondary: "",
    metric: "", // optional supporting statistic, e.g. "48 households"
    quote: "", // optional, added later
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
    title: "Story title goes here",
    category: "Category",
    location: "",
    year: "",
    description:
      "A short, concrete description of the project or story will go here — two to four lines.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
];

/* -------------------------------------------------------------------- *
 * 6. SECTION COPY
 * -------------------------------------------------------------------- *
 * Editorial copy, kept separate so it can be refined without touching
 * structure or numbers.
 * -------------------------------------------------------------------- */

const copy = {
  org: "SELCO Solar Light Private Limited",
  eventTitle: "Annual General Meeting 2026",

  achievementsKicker: "A data story",
  achievementsHeading: "What we achieved in FY 2025–26",

  systemsIntro:
    "Behind the number are different needs, different places, and different ways of enabling energy access.",

  salesHeading: "FY 2025–26 — Sales",
  salesIntro:
    "The year translated into a diverse portfolio of work — from essential energy solutions to institutional, community and livelihood applications.",

  currentHeading: "What we have done till today",
  currentSubheading: "FY 2026–27",
  currentIntro:
    "The year is still unfolding. These figures reflect progress so far, not a final result.",

  storiesHeading: "Stories behind the numbers",
  storiesIntro:
    "A closer look at some of the work behind this year's figures.",
};
