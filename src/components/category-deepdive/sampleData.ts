/**
 * Sample data for the Category Deep-Dive walkthrough page.
 *
 * ILLUSTRATIVE sample of the "questionnaire -> targeted scrape -> deep-dive"
 * journey for the Category Deep-Dive framing (SOW Sections 4.2 / 5.2).
 *
 * Two kinds of numbers appear here, labelled differently on-page:
 *  - PRICE / ASSORTMENT metrics are REAL, computed from a live competitive
 *    shelf scrape of a leading value marketplace (never named on this page).
 *  - DEMAND figures are INDICATIVE — the primary survey has not been fielded;
 *    they stand in for what the questionnaire would surface.
 */

export const CATEGORY = "Women's Fashion";

/* ═══════════════════════════════════════════════════════════════
   STAGE 1 — THE QUESTIONNAIRE
   ═══════════════════════════════════════════════════════════════ */

export const instrument = {
  category: "Women's Fashion (illustrative — SOW Section 4.2, Category Deep-Dive)",
  universe: "Gen Z (18–29), active online shoppers who buy women's fashion",
  method: "Quantitative · CAWI (online) · close-ended only",
  length: "~30 minutes",
  sample: "385 completed / city × 3 cities (1 Metro · 1 Tier-1 · 1 Tier-2) = 1,155",
  emphasis: "Interest by sub-category · the channel each is bought from · Shopsy vs. a competitor set",
};

/** Three highlighted questions shown visually — the ones that feed the read. */
export interface SampleQuestion {
  code: string;
  section: string;
  type: string;
  prompt: string;
  grid: { columns: string[]; rows: string[] };
  feeds: string;
}

export const highlightQuestions: SampleQuestion[] = [
  {
    code: "B2",
    section: "Sub-category interest",
    type: "Rating grid · 1–5",
    prompt: "How interested are you in shopping each sub-category right now?",
    grid: {
      columns: ["1", "2", "3", "4", "5"],
      rows: ["Streetwear", "Western wear", "Athleisure", "Footwear", "Accessories", "Ethnic wear"],
    },
    feeds: "→ Demand ranking that decides what we scrape",
  },
  {
    code: "E1",
    section: "Price sensitivity",
    type: "Single-select per row",
    prompt: "What price would you typically expect to pay per item?",
    grid: {
      columns: ["<₹200", "₹200–500", "₹501–1,000", "₹1,000+"],
      rows: ["Streetwear", "Western wear", "Footwear", "Accessories"],
    },
    feeds: "→ Price band we validate against the shelf",
  },
  {
    code: "F2",
    section: "Shopsy vs. competitors",
    type: "Single-select per row",
    prompt: "Which platform offers the best selection in each sub-category?",
    grid: {
      columns: ["Shopsy", "Myntra", "Ajio", "Amazon", "Not sure"],
      rows: ["Streetwear", "Western wear", "Athleisure", "Footwear"],
    },
    feeds: "→ Where Shopsy is chosen — or not",
  },
];

/** The FULL instrument, compact. Platform lists genericised (competitor unnamed). */
export interface FQQuestion {
  code: string;
  prompt: string;
  type: string;
  options?: string[];
  scale?: string;
  rows?: string[];
}
export interface FQSection {
  id: string;
  title: string;
  blurb: string;
  questions: FQQuestion[];
}

const SUBCATS_9 = [
  "Western wear (tops, dresses, jeans)",
  "Ethnic — everyday (kurtas, suits)",
  "Ethnic — festive (sarees, lehengas)",
  "Streetwear (oversized tees, co-ords)",
  "Athleisure / activewear",
  "Footwear",
  "Innerwear & loungewear",
  "Winter wear",
  "Bags, jewellery & accessories",
];
const PLATFORMS = ["Shopsy", "Myntra", "Ajio", "Amazon Fashion", "Social / D2C", "Offline"];

export const fullQuestionnaire: FQSection[] = [
  {
    id: "A",
    title: "Screening & quota classification",
    blurb: "Screens into the Gen Z (18–29) universe and sets the city / tier quotas.",
    questions: [
      { code: "S1", prompt: "Age group", type: "Single · quota", options: ["Under 18 (term.)", "18–21", "22–25", "26–29", "30+ (term.)"] },
      { code: "S2", prompt: "Gender", type: "Single", options: ["Female", "Male", "Non-binary / Other", "Prefer not to say"] },
      { code: "S3", prompt: "City you live in", type: "Single · tier quota", options: ["Metro", "Tier-1", "Tier-2", "None (term.)"] },
      { code: "S4", prompt: "How often you shop online (any category)", type: "Single · term. if rare", options: ["Multiple / week", "Weekly", "2–3 / month", "Monthly", "Once in 2–3 months", "Rarely"] },
      { code: "S5", prompt: "Platforms shopped for women's fashion (last 6 mo)", type: "Multi · ≥1 to continue", options: [...PLATFORMS, "Other"] },
      { code: "S6", prompt: "Personally bought women's fashion for yourself (last 6 mo)", type: "Single · term. if No", options: ["Yes", "No"] },
      { code: "S7", prompt: "Who makes the final choice", type: "Single · term. if not self", options: ["I decide", "Jointly", "Someone else"] },
    ],
  },
  {
    id: "B",
    title: "Sub-category interest & engagement",
    blurb: "The core demand read — becomes the focus-and-drop list and the scrape target.",
    questions: [
      { code: "B1", prompt: "Sub-categories purchased (last 6 mo)", type: "Multi", options: [...SUBCATS_9, "None"] },
      { code: "B2", prompt: "Interest in shopping each sub-category right now", type: "Rating grid · 1–5", scale: "1 = not at all → 5 = extremely", rows: SUBCATS_9 },
      { code: "B3", prompt: "How often you shop each sub-category online", type: "Grid · per row", scale: "Weekly · Monthly · 2–3 mo · Rarely", rows: SUBCATS_9 },
      { code: "B4", prompt: "Rank your top 3 preferred sub-categories", type: "Ranking · pick 3", rows: SUBCATS_9 },
    ],
  },
  {
    id: "C",
    title: "Shopping channels — where they buy",
    blurb: "Maps each sub-category to the channel Gen Z actually uses.",
    questions: [
      { code: "C1", prompt: "Channels used for women's fashion (last 6 mo)", type: "Multi", options: [...PLATFORMS, "Other"] },
      { code: "C2", prompt: "One platform used most often", type: "Single", options: PLATFORMS },
      { code: "C3", prompt: "Platform bought from most often, per sub-category", type: "Grid · per row", scale: PLATFORMS.join(" · "), rows: SUBCATS_9 },
      { code: "C4", prompt: "Rank top 3 reasons for that platform choice", type: "Ranking · pick 3", options: ["Prices / discounts", "Variety", "Reviews & ratings", "Delivery speed", "Easy returns", "Recommended", "App experience", "Size range"] },
    ],
  },
  {
    id: "D",
    title: "Trend & style preferences",
    blurb: "Trend appetite and where trends are discovered.",
    questions: [
      { code: "D1", prompt: "Interest in each trend / style", type: "Rating grid · 1–5", scale: "1 → 5", rows: ["Co-ord sets", "Ethnic fusion (indo-western)", "K-fashion styles", "Sustainable fashion", "Plus-size / inclusive", "Western formal / workwear"] },
      { code: "D2", prompt: "Where you discover new trends", type: "Multi", options: ["Instagram", "YouTube", "Influencers / creators", "Browsing apps", "Friends & family", "Offline / malls", "Don't follow trends"] },
    ],
  },
  {
    id: "E",
    title: "Price sensitivity",
    blurb: "Price bands mirror the shelf read: impulse · considered · premium.",
    questions: [
      { code: "E1", prompt: "Expected price per item, per sub-category", type: "Grid · per row", scale: "<₹200 · ₹200–500 · ₹501–1,000 · ₹1,000+", rows: SUBCATS_9 },
      { code: "E2", prompt: "Discount that would make you switch platform", type: "Single", options: ["Any discount", "10%+", "20%+", "30%+", "Wouldn't switch"] },
      { code: "E3", prompt: "Willingness to pay a premium for…", type: "Rating grid · 1–5", scale: "1 → 5", rows: ["Branded label", "Sustainable material", "Limited-edition drop", "Plus-size fit range", "Faster delivery"] },
    ],
  },
  {
    id: "F",
    title: "Shopsy vs. competitor platforms",
    blurb: "Compares Shopsy against the competitor set, overall and per sub-category.",
    questions: [
      { code: "F1", prompt: "Which platform performs best on each dimension", type: "Grid · per row", scale: "platform per row", rows: ["Price", "Variety / assortment", "Trend-led styles", "Product quality", "Delivery speed", "Returns / exchange", "Trustworthy reviews", "Overall experience"] },
      { code: "F2", prompt: "Best selection per sub-category", type: "Grid · per row", scale: "platform per row", rows: SUBCATS_9 },
      { code: "F3", prompt: "Satisfaction with Shopsy on each dimension", type: "Rating grid · 1–5", scale: "1 → 5", rows: ["Price", "Variety", "Quality", "Trend-fit", "Delivery", "Returns", "Reviews trust"] },
      { code: "F4", prompt: "If Shopsy improved each area, likelihood to buy more", type: "Rating grid · 1–5", scale: "1 → 5", rows: ["Wider trend assortment", "Better pricing", "Faster delivery", "Size availability", "Authentic reviews"] },
    ],
  },
  {
    id: "G",
    title: "Classification",
    blurb: "Profile cuts for analysis.",
    questions: [
      { code: "G1", prompt: "Occupation", type: "Single", options: ["Student", "Working (FT)", "Working (PT / freelance)", "Homemaker", "Between jobs"] },
      { code: "G2", prompt: "Monthly household income", type: "Single", options: ["<₹25k", "₹25–50k", "₹50k–1L", "₹1–2L", "₹2L+", "Prefer not to say"] },
      { code: "G3", prompt: "Device used most for shopping", type: "Single", options: ["Smartphone", "Laptop / desktop", "Tablet"] },
    ],
  },
];

export const questionnaireStats = {
  sections: fullQuestionnaire.length,
  questions: fullQuestionnaire.reduce((n, s) => n + s.questions.length, 0),
};

/* ═══════════════════════════════════════════════════════════════
   STAGE 2 — FROM SURVEY TO A TARGETED SCRAPE
   ═══════════════════════════════════════════════════════════════ */

export interface TargetRow {
  rank: number;
  subcat: string;
  interest: number; // indicative mean interest 1–5
  productLanguage: string[]; // Gen Z words -> search terms
  expectedBand: string;
  listings: number | null; // scraped this sample
  inSample: boolean;
}

export const targetingRows: TargetRow[] = [
  { rank: 1, subcat: "Streetwear", interest: 4.3, productLanguage: ["oversized tees", "co-ord sets", "crop tops", "graphic tees"], expectedBand: "₹200–₹500", listings: 1188, inSample: true },
  { rank: 2, subcat: "Western wear", interest: 4.0, productLanguage: ["jeans", "jeggings", "wide-leg denim"], expectedBand: "₹200–₹500", listings: 786, inSample: true },
  { rank: 3, subcat: "Athleisure", interest: 3.8, productLanguage: ["active bottoms", "leggings", "sports sets"], expectedBand: "₹300–₹500", listings: 391, inSample: true },
  { rank: 4, subcat: "Accessories", interest: 3.6, productLanguage: ["sling bags", "oxidised earrings", "layered chains"], expectedBand: "under ₹200", listings: 1188, inSample: true },
  { rank: 5, subcat: "Cargo & trousers", interest: 3.5, productLanguage: ["cargo pants", "parachute pants", "trousers"], expectedBand: "₹200–₹400", listings: 385, inSample: true },
  { rank: 6, subcat: "Footwear", interest: 3.3, productLanguage: ["chunky sneakers", "running shoes"], expectedBand: "₹400–₹700", listings: 397, inSample: true },
  { rank: 7, subcat: "Ethnic — everyday", interest: 3.4, productLanguage: ["kurtas", "co-ord suits"], expectedBand: "₹300–₹600", listings: null, inSample: false },
  { rank: 8, subcat: "Innerwear & loungewear", interest: 2.8, productLanguage: ["loungewear sets", "camisoles"], expectedBand: "under ₹300", listings: null, inSample: false },
  { rank: 9, subcat: "Winter wear", interest: 2.4, productLanguage: ["sweatshirts", "jackets"], expectedBand: "₹400–₹800", listings: null, inSample: false },
];

export const scrapeSummary = {
  listings: 4335, // sum of the targeted priority groups
  targetsScraped: 6,
  rawFieldsPerListing: 75,
  cleanMetricsPerSubcat: 12,
  source: "Leading value marketplace · live PDP scrape",
};

export interface RawRow {
  title: string;
  subcat: string;
  price: number;
  rating: number | null;
  reviews: number | null;
  status: "clean" | "flag" | "drop";
  statusNote: string;
}

export const rawRows: RawRow[] = [
  { title: "Pretty Ravishing Women Tshirts", subcat: "Oversized Tees", price: 254, rating: 4.2, reviews: 310, status: "clean", statusNote: "In scope" },
  { title: "Comfy Sensational Women Tshirts", subcat: "Oversized Tees", price: 196, rating: 4.2, reviews: 8314, status: "clean", statusNote: "In scope" },
  { title: "Stylish Trendy Women Bottoms", subcat: "Active Bottomwear", price: 315, rating: 4.2, reviews: 7871, status: "clean", statusNote: "In scope" },
  { title: "Graceful Attractive Women Slingbags", subcat: "Sling Bags", price: 205, rating: 4.0, reviews: 10605, status: "clean", statusNote: "In scope" },
  { title: "Women Kurti With Bottomwear Set", subcat: "Kurti + Bottomwear", price: 491, rating: 4.2, reviews: 6018, status: "flag", statusNote: "Re-tagged: ethnic, not co-ord" },
  { title: "Stylish Designer Women Jeans", subcat: "Jeans", price: 348, rating: null, reviews: null, status: "flag", statusNote: "Held: no ratings yet" },
  { title: "Trendy Men Sneakers", subcat: "Sneakers", price: 613, rating: null, reviews: null, status: "drop", statusNote: "Dropped: men's item in women's query" },
];

export const pipeline = [
  { stage: "Raw listings", detail: "targeted PDPs · 75 fields each", value: "4,335" },
  { stage: "Cleaned & de-duped", detail: "drop out-of-scope, combos, mis-tags", value: "3,860" },
  { stage: "Price banding", detail: "impulse · considered · premium", value: "3 zones" },
  { stage: "Sub-category metrics", detail: "median, spread, depth, rating", value: "12 each" },
];

/* ═══════════════════════════════════════════════════════════════
   STAGE 3 — THE CATEGORY DEEP-DIVE
   ═══════════════════════════════════════════════════════════════ */

export type Demand = "Very High" | "High" | "Medium";
export type Position = "Gap — first-mover" | "Competitive gap" | "Competitor leads" | "Impulse whitespace";

export interface SubcatRead {
  id: string;
  name: string;
  priority: number;
  demand: Demand; // INDICATIVE
  position: Position;
  momentum: "Rising" | "Steady";
  // REAL scrape metrics:
  median: number;
  avg: number;
  min: number;
  max: number;
  impulse: number;
  considered: number;
  premium: number;
  rating: number;
  listings: number;
  // matrix coords
  mx: number; // opportunity 0–3
  my: number; // demand 1–3
  // reads:
  competitor: string;
  shopsy: string;
  move: string;
}

export const subcatReads: SubcatRead[] = [
  { id: "streetwear-tees", name: "Oversized Tees & Streetwear", priority: 1, demand: "Very High", position: "Gap — first-mover", momentum: "Rising",
    median: 222, avg: 245, min: 118, max: 711, impulse: 34, considered: 65, premium: 2, rating: 4.01, listings: 394, mx: 3.0, my: 3.0,
    competitor: "Tees are ~99% of the competitor's streetwear shelf; demand sits firmly in ₹200–₹500.",
    shopsy: "No dedicated streetwear surface — items scattered across generic western wear.",
    move: "Launch a Streetwear sub-section (graphic tees, Y2K, oversized) and own the ₹200–₹500 zone first." },
  { id: "coords", name: "Co-Ord Sets", priority: 4, demand: "Very High", position: "Competitive gap", momentum: "Rising",
    median: 465, avg: 477, min: 225, max: 1357, impulse: 0, considered: 62, premium: 38, rating: 4.02, listings: 397, mx: 2.0, my: 3.0,
    competitor: "Skews premium — 38% priced ₹500+; a higher-value Gen Z basket.",
    shopsy: "Thin, undifferentiated selection; no co-ord discovery entry point.",
    move: "Build a curated co-ord edit at ₹400–₹700 — the premium tilt supports a higher-AOV play." },
  { id: "denim", name: "Western Denim (Jeans)", priority: 6, demand: "High", position: "Competitor leads", momentum: "Steady",
    median: 353, avg: 389, min: 154, max: 1518, impulse: 5, considered: 79, premium: 16, rating: 3.96, listings: 391, mx: 1.0, my: 2.0,
    competitor: "Deep, mature assortment in the considered zone — the competitor's stronghold.",
    shopsy: "Present but out-assorted; low trend-fit on the newest cuts.",
    move: "Compete on fit range and trend cuts (wide-leg, baggy), not price — the zone is crowded." },
  { id: "cargo", name: "Cargo Pants & Trousers", priority: 3, demand: "High", position: "Competitive gap", momentum: "Rising",
    median: 250, avg: 269, min: 150, max: 802, impulse: 18, considered: 81, premium: 1, rating: 3.99, listings: 385, mx: 1.8, my: 2.0,
    competitor: "97%+ of demand in the considered zone; almost no premium tail.",
    shopsy: "Under-assorted against a fast-rising Gen Z silhouette.",
    move: "Expand cargo & parachute assortment at ₹200–₹400 — a rising trend with a clean target." },
  { id: "athleisure", name: "Athleisure / Activewear", priority: 5, demand: "High", position: "Competitive gap", momentum: "Rising",
    median: 364, avg: 374, min: 120, max: 1010, impulse: 7, considered: 79, premium: 14, rating: 4.07, listings: 391, mx: 2.2, my: 2.0,
    competitor: "Broad considered-zone shelf; steady, high-rating demand.",
    shopsy: "Partial coverage; sets and active bottoms under-represented.",
    move: "Promote athleisure sets in ₹200–₹500 — defend-and-extend where Shopsy has a base." },
  { id: "footwear", name: "Chunky Sneakers & Footwear", priority: 8, demand: "Medium", position: "Competitor leads", momentum: "Steady",
    median: 492, avg: 492, min: 250, max: 1452, impulse: 0, considered: 53, premium: 47, rating: 3.98, listings: 397, mx: 1.0, my: 1.0,
    competitor: "Premium-heavy — 47% priced ₹500+; the highest price ceiling in the category.",
    shopsy: "Thin women's footwear; quality perception a barrier at this price.",
    move: "Enter selectively at ₹400–₹700 with trend sneakers; lead with ratings and returns, not discounts." },
  { id: "slingbags", name: "Sling & Mini Bags", priority: 2, demand: "High", position: "Impulse whitespace", momentum: "Rising",
    median: 198, avg: 231, min: 99, max: 978, impulse: 51, considered: 44, premium: 5, rating: 4.11, listings: 396, mx: 2.5, my: 2.0,
    competitor: "Half of demand under ₹200 — a pure impulse-add category.",
    shopsy: "Accessories buried; no impulse merchandising at checkout.",
    move: "Merchandise sling & mini bags as sub-₹200 impulse adds alongside apparel baskets." },
  { id: "earrings", name: "Oxidised Earrings", priority: 7, demand: "Medium", position: "Impulse whitespace", momentum: "Steady",
    median: 172, avg: 175, min: 40, max: 337, impulse: 71, considered: 29, premium: 0, rating: 4.24, listings: 400, mx: 2.5, my: 1.0,
    competitor: "70%+ under ₹200, top-rated — the classic Gen Z impulse buy.",
    shopsy: "Present but undiscovered; no styled bundles.",
    move: "Bundle oxidised earrings with ethnic / festive baskets as low-friction add-ons." },
];

export const comparisonRows = subcatReads
  .slice()
  .sort((a, b) => a.priority - b.priority)
  .map((s) => ({
    name: s.name,
    demand: s.demand,
    zone: s.impulse >= 50 ? "Impulse (<₹200)" : s.premium >= 35 ? "Premium (₹500+)" : "Considered (₹200–₹500)",
    median: s.median,
    depth: s.listings,
    position: s.position,
  }));

/** Sub-categories read in the full study but not scraped in this sample. */
export interface MissingRead {
  name: string;
  demand: Demand;
  note: string;
}
export const missingReads: MissingRead[] = [
  { name: "Ethnic — everyday", demand: "High", note: "Kurtas & co-ord suits — strong steady demand; scraped in the full study." },
  { name: "Ethnic — festive", demand: "Medium", note: "Sarees & lehengas — seasonal; timed to the festive window." },
  { name: "Innerwear & loungewear", demand: "Medium", note: "Loungewear sets rising post-2023; captured in the full read." },
  { name: "Winter wear", demand: "Medium", note: "Sweatshirts & jackets — regional and seasonal skew." },
];

export const categoryKPIs = [
  { value: "9", label: "sub-categories read in the full study", sub: "6 with live shelf data in this sample" },
  { value: "3", label: "first-mover / whitespace gaps", sub: "Streetwear · Sling bags · Earrings" },
  { value: "₹200–₹500", label: "the category's price center", sub: "≈70% of apparel demand" },
  { value: "Streetwear", label: "#1 Gen Z demand (indicative)", sub: "interest 4.3 / 5" },
];

export interface RankedAction {
  rank: number;
  title: string;
  detail: string;
  effort: "Low lift" | "Medium lift" | "Build";
  horizon: "Now" | "Next";
}
export const rankedActions: RankedAction[] = [
  { rank: 1, title: "Launch a Streetwear sub-section", detail: "Graphic tees, Y2K, oversized, co-ords — anchored ₹200–₹500. #1 demand, and neither platform owns the section.", effort: "Build", horizon: "Now" },
  { rank: 2, title: "Merchandise accessories as impulse adds", detail: "Sling & mini bags and oxidised earrings as sub-₹200 add-ons at checkout — high demand, minimal assortment lift.", effort: "Low lift", horizon: "Now" },
  { rank: 3, title: "Expand cargo & parachute at ₹200–₹400", detail: "A fast-rising silhouette Shopsy is under-assorted on, with a clean price target.", effort: "Medium lift", horizon: "Now" },
  { rank: 4, title: "Curate a premium co-ord edit (₹400–₹700)", detail: "The premium tilt supports a higher-AOV play; today the selection is thin.", effort: "Medium lift", horizon: "Next" },
  { rank: 5, title: "Compete on denim fit, enter footwear selectively", detail: "Both are competitor-led — win on trend cuts and ratings, not price.", effort: "Medium lift", horizon: "Next" },
];

export const crossCategoryNote = {
  headline: "Run the same lens on another category and the shape inverts.",
  body:
    "In Beauty & Skincare, demand collapses into the impulse zone — serums, face wash and sheet masks all sit 55–75% under ₹200. The deep-dive there doesn't return a price play; it returns a curated-discovery play. Every category reads differently — which is the point of reading each one directly.",
};
