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
  // Opening hero background. A free, no-watermark stock photo (solar
  // panels across a green field — via Pexels, free to use) is set here
  // as a placeholder so the opening section isn't blank. Replace with your
  // own photo (a Drive link or a path like "assets/hero.jpg") any time —
  // see README.md, section 6. The dark gradient overlay is designed for a
  // landscape photo like this — very light/white photos will look washed
  // out under it.
  hero: "assets/Banner.png",
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
  totalSalesDisplay: "₹20.87 Cr",
  totalSalesExact: 208700000, // approximate — replace with exact figure when available
  systemsDisplay: "3K",
  asOfLabel: "So far this year",
  const salesBifurcation = [
  { label: "Basic Energy Small", value: "₹57.78 L" },
  { label: "Basic Energy Medium", value: "₹7.99 Cr" },
  { label: "Institutional", value: "₹4.10 Cr" },
  { label: "Water Heater", value: "₹1.53 Cr" },
  { label: "Community", value: "₹2.67 Cr" },
  { label: "Livelihood", value: "₹1.79 Cr" },
  { label: "Education", value: "₹22.55 L" },
  { label: "AMC", value: "₹4.52 L" },
  { label: "Spare", value: "₹63.85 L" },
  { label: "Service Bill", value: "₹1.17 Cr" }
],
  systemsBifurcation: [
    { name: "Basic Energy – Small", value: 177 },
    { name: "Basic Energy – Medium", value: 615 },
    { name: "Institutional", value: 150 },
    { name: "Community", value: 1440 },
    { name: "Education", value: 41 },
    { name: "Livelihood", value: 75 },
    { name: "Water Heater", value: 518 },
  ],
  // Water Heater has no kWp figure in the source data ("—"), so it's
  // left out here rather than shown as a fabricated 0.
  capacityBifurcation: [
    { name: "Basic Energy – Small", value: 23.1 },
    { name: "Basic Energy – Medium", value: 984.0 },
    { name: "Institutional", value: 556.7 },
    { name: "Community", value: 127.6 },
    { name: "Education", value: 7.4 },
    { name: "Livelihood", value: 69.6 },
  ],
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
    title: "Swami Vivekananda Cultural Youth Centre – Swami Smaraka",
    category: "Education",
    location: "Krishna Vilas Rd, Subbarayanakere, Chamrajpura, Mysuru, Karnataka",
    year: "2026",
    description:
      "Built on the grounds of Swami Vivekananda's 1892 visit, the centre now runs on a 100 kW on-grid solar system, generating an average of 1,44,432 kWh a year and offsetting an estimated 114.10 tons of CO₂ annually.",
    image: "", // add photo — see README.md section 6
    imageSecondary: "",
    metric: "114.10 tons CO₂ offset per year",
    quote: "",
  },
  {
    title: "Bade Hanuman Mandir, Haridwar",
    category: "Institutional",
    location:
      "Bade Hanuman Mandir (Udupi Sri Palimaru Matha), near Bairagi Camp, Sati Ghat, Vishwakalyan, Kankhal, Haridwar, Uttarakhand",
    year: "2026",
    description:
      "A hybrid solar system — 35 kW of panels, a 30 kW hybrid inverter and a 20 kW heat pump — now supports daily prayers and temple operations, generating an estimated 45,600 kWh a year and an average annual saving of ₹3.4–3.8 lakh on electricity.",
    image: "",
    imageSecondary: "",
    metric: "₹3.4–3.8 lakh saved annually",
    quote: "",
  },
  {
    title: "Axon Interconnectors & Wires Pvt. Ltd.",
    category: "Institutional",
    location: "Bhatramarenahalli, Hunachur, Karnataka",
    year: "2026",
    description:
      "A 25 kW on-grid solar system now powers the kitchen and cafeteria at this Bengaluru cable-and-harness manufacturer, generating an estimated 36,500 kWh a year and reducing CO₂ emissions by an estimated 29.2 tons annually.",
    image: "",
    imageSecondary: "",
    metric: "29.2 tons CO₂ reduced per year",
    quote: "",
  },
  {
    title: "L&T Finance",
    category: "Livelihood",
    location: "Chikkaballapur, Bengaluru Rural and Kolar districts, Karnataka",
    year: "2026",
    description:
      "Off-grid solar systems now support six L&T Finance branches across three districts, keeping banking operations for local businesses, farmers and households running independent of grid reliability.",
    image: "",
    imageSecondary: "",
    metric: "6 branches, 3 districts",
    quote: "",
  },
  {
    title: "The \u201cHalli Mane\u201d Farm Shed, Amasebail",
    category: "Livelihood",
    location: "Amasebail, Kundapura, Karnataka",
    year: "2026",
    description:
      "At \u201cHalli Mane,\u201d a farm shed spanning over an acre in Amasebail, wild animals and night-time theft threatened crops like coconut and areca nut. SELCO installed solar-powered lights around the farm belonging to Dr. Ashok Kumar Kodgi, deterring animals and intruders and letting him move safely around the land after dark \u2014 with no electricity bill attached.",
    image: "",
    imageSecondary: "",
    metric: "Round-the-clock farm security, fully off-grid",
    quote: "",
  },
  {
    title: "Government High School, Manchi\u2013Kolnad",
    category: "Education",
    location: "Kolnad, Manchi, Bantwal, Dakshina Kannada, Karnataka",
    year: "2026",
    description:
      "Building on its earlier SELCO solar-powered smart classroom system, Government High School Manchi\u2013Kolnad added a 6 kW solar off-grid system on 31 July 2026, funded through the MRPL CSR Fund at a cost of \u20b94,90,000. Computers, lights and fans now keep running through power outages, and the school's electricity bills have dropped.",
    image: "",
    imageSecondary: "",
    metric: "6 kW system, funded via MRPL CSR",
    quote: "",
  },
  {
    title: "From Bengaluru IT to a Solar-Powered Farm, Karkala",
    category: "Livelihood",
    location: "Karkala, Kundapura, Karnataka",
    year: "2026",
    description:
      "After years in Bengaluru's IT industry, Raghavendra Mudradi returned to his village near Karkala to take up farming and animal husbandry. Frequent power cuts stood in the way \u2014 a SELCO solar-hybrid system solved that, keeping the farm running and letting his wife work from home right there in the village.",
    image: "",
    imageSecondary: "",
    metric: "",
    quote: "",
  },
  {
  title: "When Light Came Home, Gosaladoddi",
  category: "Community",
  location: "Gosaladoddi, Koppal taluk, Koppal district, Karnataka",
  year: "2026",
  description:
    "Solar lighting reached nearly 100 households in Gosaladoddi, extending study and work hours after sunset. The shift also opened a path to income \u2014 five women pursued PMFME-backed loans for solar-powered livelihood machines, and the first, a roti-making unit, is now producing 800\u20131,000 rotis a day.",
  image: "",
  imageSecondary: "",
  metric: "~100 households lit; 800\u20131,000 rotis/day from the first unit",
  quote: "",
},
{
  title: "Making 8 kW Single-Phase Solar Work, Chitradurga",
  category: "Institutional",
  location: "Chitradurga, Karnataka",
  year: "2026",
  description:
    "A dental clinic's existing 3 kWp solar setup was expanded into an 8 kWp single-phase hybrid system with 10 kWh of lithium battery storage, configured for zero grid export. Solar covers the clinic's loads first, the battery fills the gaps, and the grid steps in only when needed \u2014 engineered around a 3 kW sanctioned load per meter.",
  image: "",
  imageSecondary: "",
  metric: "8 kWp hybrid + 10 kWh lithium, \u20b97.25 lakh",
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
const financialsSummary = {
  period: "Apr–Aug 2026",
  incomeExpenditure: [
    { label: "Sales Revenue", value: 200720207 },
    { label: "Service Revenue", value: 8020347 },
    { label: "Total Direct Income", value: 208740554, emphasis: true },
    { label: "COGS", value: 136485609 },
    { label: "COGS (% of Sales)", value: "68.00%", isText: true },
    { label: "Profit (as per financials)", value: 3198718, emphasis: true },
  ],
  debtors: { asOf: "Aug 2026", value: 67624709 },
  trends: [
    { name: "Fixed Cost", currentValue: 47855998, previousLabel: "Apr–Aug 2025", previousValue: 83453849, changePct: -42.66 },
    { name: "Fixed Deposits", currentValue: 250748813, previousLabel: "As on Aug 2025", previousValue: 222674883, changePct: 12.61 },
    { name: "Cash & Bank", currentValue: 10156957, previousLabel: "As on Aug 2025", previousValue: 21512417, changePct: -52.79 },
  ],
};
/* -------------------------------------------------------------------- *
 * FUTURE PLANS — 7-MONTH ROADMAP (Sep 2026 – Mar 2027)
 * -------------------------------------------------------------------- */
const futurePlans = {
  kicker: "7-Month Business Plan & Execution Roadmap · Sep 2026 – Mar 2027",
  heading: "The Road Ahead",
  intro:
    "Over the next seven months, SELCO will convert its strong community presence into a more predictable, profitable, and measurable growth engine — by focusing on livelihood solutions, institutional projects, financing partnerships, and disciplined after-sales service.",
  closing: "Grow the right segments, collect with discipline, protect profitability, and execute together.",
  months: [
    {
      label: "Sep 2026",
      theme: "Reset the business engine",
      salesRevenue: "₹6 Cr",
      collections: "₹6 Cr",
      actions: [
        "Review debtors’ receivables and assign collection owners",
        "Train sales teams on solution-based selling",
        "Increase sales capacity in high-performing branches",
      ],
    },
    {
      label: "Oct 2026",
      theme: "Build the pipeline",
      salesRevenue: "₹8 Cr",
      collections: "₹8 Cr",
      actions: [
        "Publish a weekly branch scorecard",
        "Conduct livelihood customer camps",
        "Create a 3× qualified pipeline for the next 5 months (₹120 Cr)",
        "Track every major project through a CSD",
      ],
    },
    {
      label: "Nov 2026",
      theme: "Close institutional demand",
      salesRevenue: "₹7 Cr",
      collections: "₹8 Cr",
      actions: [
        "Submit proposals to schools, healthcare and community institutions",
        "Convert pilot projects into repeat orders",
        "Run a customer-referral campaign",
      ],
    },
    {
      label: "Dec 2026",
      theme: "Mobilise & accelerate",
      salesRevenue: "₹8 Cr",
      collections: "₹9 Cr",
      actions: [
        "Audit all branches: sales, backlog, receivables, service",
        "Increase installation capacity for winning products",
        "Conduct mid-plan performance review",
      ],
    },
    {
      label: "Jan 2027",
      theme: "Build volume",
      salesRevenue: "₹7 Cr",
      collections: "₹8 Cr",
      actions: [
        "Launch service-renewal drives",
        "Weekly lead-generation campaigns",
      ],
    },
    {
      label: "Feb 2027",
      theme: "Reset the business engine",
      salesRevenue: "₹6 Cr",
      collections: "₹6 Cr",
      actions: [
        "Double down on the highest-converting branches and segments",
        "Improve repeat orders and cross-selling",
        "Review inventory ageing and procurement lead times",
        "Start the next 13-month pipeline",
      ],
    },
    {
      label: "Mar 2027",
      theme: "Deliver & collect",
      salesRevenue: "₹11 Cr",
      collections: "₹8 Cr",
      actions: [
        "Complete priority installations",
        "Conduct daily collections and dispatch reviews",
        "Protect quality and customer experience during peak volume",
        "Close pending documentation and billing",
        "Finalise next-year branch and segment targets",
      ],
    },
  ],
};

const fy2627SalesPlan = {
  rows: [
    { month: "Sep-26", salesPlan: 6, collectionPlan: 6 },
    { month: "Oct-26", salesPlan: 8, collectionPlan: 8 },
    { month: "Nov-26", salesPlan: 7, collectionPlan: 8 },
    { month: "Dec-26", salesPlan: 8, collectionPlan: 9 },
    { month: "Jan-27", salesPlan: 7, collectionPlan: 8 },
    { month: "Feb-27", salesPlan: 6, collectionPlan: 6 },
    { month: "Mar-27", salesPlan: 11, collectionPlan: 8 },
  ],
  totals: { salesPlan: 53, collectionPlan: 53 },
  // NOTE: your "Sales Achieved" total (20.83) doesn't match the sum of
  // the monthly figures above (53) — flagged this earlier and used your
  // numbers as given. Correct whichever is right and update this line.
  narrative:
    "We’re targeting up to ₹53 Cr by March 2027, and are confident of delivering at least ₹47+ Cr. Expecting 1.5x Collection respect to 1x sales every month",
};
