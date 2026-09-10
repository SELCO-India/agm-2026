/**
 * AGM 2026 — DATA
 * Exchange Rates: 1 EUR = ₹110.97 | 1 USD = ₹95.62
 */

const imageSources = {
  hero: "assets/Banner.png",
  logo: "assets/SELCO.png",
  dataSectionAmbient: "",
};

/* -------------------------------------------------------------------- *
 * 2. FY 2025–26 — SYSTEMS / SOLUTIONS DELIVERED
 * -------------------------------------------------------------------- */
const fy2526Systems = {
  total: 9004,
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
 * -------------------------------------------------------------------- */
const fy2526Sales = {
  totalExact: 680694351.13,
  totalDisplay: "₹68.07 Cr",
  totalSubtleDisplay: "(€6.13M / $7.12M)",
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
 * 4. FY 2026–27 — CURRENT MOMENTUM
 * -------------------------------------------------------------------- */
const fy2627Current = {
  totalSalesDisplay: "₹20.87 Cr",
  totalSalesSubtleDisplay: "(€1.88M / $2.18M)",
  totalSalesExact: 208700000,
  systemsDisplay: "3K",
  asOfLabel: "So far this year",
  salesBifurcation: [
    { name: "Basic Energy Small", value: 5778000 },
    { name: "Basic Energy Medium", value: 79900000 },
    { name: "Institutional", value: 41000000 },
    { name: "Water Heater", value: 15300000 },
    { name: "Community", value: 26700000 },
    { name: "Livelihood", value: 17900000 },
    { name: "Education", value: 2255000 },
    { name: "AMC", value: 452000 },
    { name: "Spare", value: 6385000 },
    { name: "Service Bill", value: 11700000 }
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
 * 5. STORIES
 * -------------------------------------------------------------------- */
const stories = [
  {
    title: "Swami Vivekananda Cultural Youth Centre – Swami Smaraka",
    category: "Education",
    location: "Krishna Vilas Rd, Subbarayanakere, Chamrajpura, Mysuru, Karnataka",
    year: "2026",
    description: "Built on the grounds of Swami Vivekananda's 1892 visit, the centre now runs on a 100 kW on-grid solar system, generating an average of 1,44,432 kWh a year and offsetting an estimated 114.10 tons of CO₂ annually.",
    image: "assets/Vivekananada.png",
    metric: "114.10 tons CO₂ offset per year",
  },
  {
    title: "Bade Hanuman Mandir, Haridwar",
    category: "Institutional",
    location: "Bade Hanuman Mandir (Udupi Sri Palimaru Matha), near Bairagi Camp, Sati Ghat, Vishwakalyan, Kankhal, Haridwar, Uttarakhand",
    year: "2026",
    description: "A hybrid solar system — 35 kW of panels, a 30 kW hybrid inverter and a 20 kW heat pump — now supports daily prayers and temple operations, generating an estimated 45,600 kWh a year and an average annual saving of ₹3.4–3.8 lakh on electricity.",
    image: "assets/Bade hanuman.png",
    metric: "₹3.4–3.8 lakh (€3.06k–3.42k / $3.56k–3.97k) saved annually",
  },
  {
    title: "Axon Interconnectors & Wires Pvt. Ltd.",
    category: "Institutional",
    location: "Bhatramarenahalli, Hunachur, Karnataka",
    year: "2026",
    description: "A 25 kW on-grid solar system now powers the kitchen and cafeteria at this Bengaluru cable-and-harness manufacturer, generating an estimated 36,500 kWh a year and reducing CO₂ emissions by an estimated 29.2 tons annually.",
    image: "assets/ixon.png",
    metric: "29.2 tons CO₂ reduced per year",
  },
  {
    title: "L&T Finance",
    category: "Livelihood",
    location: "Chikkaballapur, Bengaluru Rural and Kolar districts, Karnataka",
    year: "2026",
    description: "Off-grid solar systems now support six L&T Finance branches across three districts, keeping banking operations for local businesses, farmers and households running independent of grid reliability.",
    image: "assets/LT bank.png",
    metric: "6 branches, 3 districts",
  },
  {
    title: "The “Halli Mane” Farm Shed, Amasebail",
    category: "Livelihood",
    location: "Amasebail, Kundapura, Karnataka",
    year: "2026",
    description: "At “Halli Mane,” a farm shed spanning over an acre in Amasebail, wild animals and night-time theft threatened crops like coconut and areca nut. SELCO installed solar-powered lights around the farm belonging to Dr. Ashok Kumar Kodgi, deterring animals and intruders and letting him move safely around the land after dark — with no electricity bill attached.",
    image: "assets/Amasebail.png",
    metric: "Round-the-clock farm security, fully off-grid",
  },
  {
    title: "Government High School, Manchi–Kolnad",
    category: "Education",
    location: "Kolnad, Manchi, Bantwal, Dakshina Kannada, Karnataka",
    year: "2026",
    description: "Building on its earlier SELCO solar-powered smart classroom system, Government High School Manchi–Kolnad added a 6 kW solar off-grid system on 31 July 2026, funded through the MRPL CSR Fund at a cost of ₹4,90,000 (€4,416 / $5,124). Computers, lights and fans now keep running through power outages, and the school's electricity bills have dropped.",
    image: "assets/school.png",
    metric: "6 kW system, funded via MRPL CSR",
  },
  {
    title: "From Bengaluru IT to a Solar-Powered Farm, Karkala",
    category: "Livelihood",
    location: "Karkala, Kundapura, Karnataka",
    year: "2026",
    description: "After years in Bengaluru's IT industry, Raghavendra Mudradi returned to his village near Karkala to take up farming and animal husbandry. Frequent power cuts stood in the way — a SELCO solar-hybrid system solved that, keeping the farm running and letting his wife work from home right there in the village.",
    image: "assets/IT.png",
    metric: "",
  },
  {
    title: "When Light Came Home, Gosaladoddi",
    category: "Community",
    location: "Gosaladoddi, Koppal taluk, Koppal district, Karnataka",
    year: "2026",
    description: "Solar lighting reached nearly 100 households in Gosaladoddi, extending study and work hours after sunset. The shift also opened a path to income — five women pursued PMFME-backed loans for solar-powered livelihood machines, and the first, a roti-making unit, is now producing 800–1,000 rotis a day.",
    image: "assets/koppal.jpeg",
    metric: "~100 households lit; 800–1,000 rotis/day from the first unit",
  },
  {
    title: "Making 8 kW Single-Phase Solar Work, Chitradurga",
    category: "Institutional",
    location: "Chitradurga, Karnataka",
    year: "2026",
    description: "A dental clinic's existing 3 kWp solar setup was expanded into an 8 kWp single-phase hybrid system with 10 kWh of lithium battery storage, configured for zero grid export. Solar covers the clinic's loads first, the battery fills the gaps, and the grid steps in only when needed — engineered around a 3 kW sanctioned load per meter.",
    image: "assets/Banner.png",
    metric: "8 kWp hybrid + 10 kWh lithium, ₹7.25 lakh (€6.53k / $7.58k)",
  },
];

/* -------------------------------------------------------------------- *
 * 6. SECTION COPY & FINANCIALS
 * -------------------------------------------------------------------- */
const copy = {
  org: "SELCO Solar Light Private Limited",
  eventTitle: "Annual General Meeting 2026",
  achievementsKicker: "A data story",
  achievementsHeading: "What we achieved in FY 2025–26",
  systemsIntro: "Behind the number are different needs, different places, and different ways of enabling energy access.",
  salesHeading: "FY 2025–26 — Sales",
  salesIntro: "The year translated into a diverse portfolio of work — from essential energy solutions to institutional, community and livelihood applications.",
  currentHeading: "What we have done till today",
  currentSubheading: "FY 2026–27",
  currentIntro: "The year is still unfolding. These figures reflect progress so far, not a final result.",
  storiesHeading: "Stories behind the numbers",
  storiesIntro: "A closer look at some of the work behind this year's figures.",
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
    {
      name: "Revenue per Employee",
      currentValue: 989292,
      currentDisplay: "₹9.89 Lakhs",
      subtleDisplay: "(€8.91k / $10.35k)",
      previousLabel: "Apr–Aug 2025",
      previousValue: 560929,
      previousDisplay: "₹5.61 Lakhs",
      changePct: 76.37,
      isCurrency: true,
      contextNote: "Avg headcount reduced from 437 to 211 (-51.72%)",
      headcount: {
        current: 211,
        previous: 437,
        changePct: -51.72
      }
      },
  ],
};

/* -------------------------------------------------------------------- *
 * 7. FUTURE PLANS
 * -------------------------------------------------------------------- */
const futurePlans = {
  kicker: "7-Month Business Plan & Execution Roadmap · Sep 2026 – Mar 2027",
  heading: "The Road Ahead",
  intro: "Over the next seven months, SELCO will convert its strong community presence into a more predictable, profitable, and measurable growth engine — by focusing on livelihood solutions, institutional projects, financing partnerships, and disciplined after-sales service.",
  closing: "Grow the right segments, collect with discipline, protect profitability, and execute together.",
  months: [
    {
      label: "Sep 2026",
      theme: "Reset the business engine",
      salesRevenue: "₹6 Cr (€541k / $627k)",
      collections: "₹6 Cr (€541k / $627k)",
      actions: [
        "Review debtors’ receivables and assign collection owners",
        "Train sales teams on solution-based selling",
        "Increase sales capacity in high-performing branches",
      ],
    },
    {
      label: "Oct 2026",
      theme: "Build the pipeline",
      salesRevenue: "₹8 Cr (€721k / $837k)",
      collections: "₹8 Cr (€721k / $837k)",
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
      salesRevenue: "₹7 Cr (€631k / $732k)",
      collections: "₹8 Cr (€721k / $837k)",
      actions: [
        "Submit proposals to schools, healthcare and community institutions",
        "Convert pilot projects into repeat orders",
        "Run a customer-referral campaign",
      ],
    },
    {
      label: "Dec 2026",
      theme: "Mobilise & accelerate",
      salesRevenue: "₹8 Cr (€721k / $837k)",
      collections: "₹9 Cr (€811k / $941k)",
      actions: [
        "Audit all branches: sales, backlog, receivables, service",
        "Increase installation capacity for winning products",
        "Conduct mid-plan performance review",
      ],
    },
    {
      label: "Jan 2027",
      theme: "Build volume",
      salesRevenue: "₹7 Cr (€631k / $732k)",
      collections: "₹8 Cr (€721k / $837k)",
      actions: [
        "Launch service-renewal drives",
        "Weekly lead-generation campaigns",
      ],
    },
    {
      label: "Feb 2027",
      theme: "Reset the business engine",
      salesRevenue: "₹6 Cr (€541k / $627k)",
      collections: "₹6 Cr (€541k / $627k)",
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
      salesRevenue: "₹11 Cr (€991k / $1.15M)",
      collections: "₹8 Cr (€721k / $837k)",
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
    { month: "Sep-26", salesPlan: "₹6 Cr (€541k / $627k)", collectionPlan: "₹6 Cr (€541k / $627k)" },
    { month: "Oct-26", salesPlan: "₹8 Cr (€721k / $837k)", collectionPlan: "₹8 Cr (€721k / $837k)" },
    { month: "Nov-26", salesPlan: "₹7 Cr (€631k / $732k)", collectionPlan: "₹8 Cr (€721k / $837k)" },
    { month: "Dec-26", salesPlan: "₹8 Cr (€721k / $837k)", collectionPlan: "₹9 Cr (€811k / $941k)" },
    { month: "Jan-27", salesPlan: "₹7 Cr (€631k / $732k)", collectionPlan: "₹8 Cr (€721k / $837k)" },
    { month: "Feb-27", salesPlan: "₹6 Cr (€541k / $627k)", collectionPlan: "₹6 Cr (€541k / $627k)" },
    { month: "Mar-27", salesPlan: "₹11 Cr (€991k / $1.15M)", collectionPlan: "₹8 Cr (€721k / $837k)" },
  ],
  totals: { salesPlan: "₹53 Cr (€4.78M / $5.54M)", collectionPlan: "₹53 Cr (€4.78M / $5.54M)" },
  narrative: "We’re targeting up to ₹53 Cr (€4.78M / $5.54M) by March 2027, and are confident of delivering at least ₹47+ Cr (€4.24M+ / $4.91M+). Expecting 1.5x Collection respect to 1x sales every month",
};
