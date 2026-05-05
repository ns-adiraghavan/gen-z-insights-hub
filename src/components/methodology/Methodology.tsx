import styles from "./Methodology.module.css";

const PRIMARY = [
  "YouGov / GCI Magazine 2025 — Commissioned primary survey. India-specific. 18–29 age group. Source of the 34% K-beauty stat.",
  "Meesho Live Product Scrape — April 2026. 7,459 products across 19 keyword categories. ~400 products per keyword.",
];
const INDUSTRY = [
  "Bain & Company 2025, RedSeer 2025, IBEF 2025, IDC India 2025, NielsenIQ 2025, McKinsey, IMARC, Mintel",
];
const TRADE = [
  "Meesho Smart Shopper Report H1 2024, Shiprocket, imagesBOF, Printrove, Glance.com",
];
const DIRECTIONAL = ["KPMG India blog, Outlook Business / Deloitte"];

const SCRAPE_FIELDS: { label: string; value: string }[] = [
  { label: "Scrape date", value: "April 2026" },
  { label: "Total products", value: "7,459 (after contamination filtering)" },
  { label: "Keywords covered", value: "19 across 5 category areas" },
  { label: "Products per keyword", value: "~400" },
  {
    label: "Fields captured",
    value:
      "Product name, subcategory, min catalogue price, review count, star rating, assurance badge",
  },
];

const EXPAND_STEPS = [
  {
    num: "01",
    heading: "Shopsy Catalogue Scrape",
    body:
      "Add Shopsy's own product listings to enable head-to-head product count, price, and rating comparisons per subcategory. Currently the single biggest gap in the dataset.",
  },
  {
    num: "02",
    heading: "Weekly Scrape Cadence",
    body:
      "Move from a single April 2026 snapshot to a weekly automated scrape of both platforms. Enables pricing trend tracking, new listing detection, and promotion response monitoring.",
  },
  {
    num: "03",
    heading: "Search Volume Validation",
    body:
      "All 90+ keywords in this dashboard are indicative — sourced from industry reports, not live search tools. Connecting to Google Keyword Planner or SEMrush would replace directional terms with actual monthly search volume data per keyword.",
  },
  {
    num: "04",
    heading: "ROI Tracking Loop",
    body:
      "Post-launch: track Shopsy promotion spend per recommended category against GMV uplift. Positive ROI per area validates the NS recommendation model and creates the foundation for an ongoing engagement.",
  },
];

function Tier({
  color,
  label,
  items,
}: {
  color: string;
  label: string;
  items: string[];
}) {
  return (
    <div className={styles.tier}>
      <div className={styles.tierIndicator} style={{ background: color }} />
      <div className={styles.tierBody}>
        <div className={styles.tierLabel} style={{ color }}>
          {label}
        </div>
        <ul className={styles.tierList}>
          {items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Methodology() {
  return (
    <div className={styles.wrap}>
      {/* SECTION 1 */}
      <div className={styles.card}>
        <h3 className={styles.heading}>What We Used</h3>
        <p className={styles.subheading}>Data Sources</p>
        <div className={styles.tiers}>
          <Tier color="#2ECC71" label="🟢 PRIMARY" items={PRIMARY} />
          <Tier color="#F5A623" label="🟡 INDUSTRY RESEARCH" items={INDUSTRY} />
          <Tier
            color="#FF6200"
            label="🟠 TRADE & PLATFORM INTELLIGENCE"
            items={TRADE}
          />
          <Tier
            color="#E53935"
            label="🔴 DIRECTIONAL ONLY — used for context, not as primary evidence"
            items={DIRECTIONAL}
          />
        </div>
      </div>

      {/* SECTION 2 */}
      <div className={styles.card}>
        <h3 className={styles.heading}>The Meesho Data</h3>
        <p className={styles.subheading}>What We Scraped</p>
        <dl className={styles.detailGrid}>
          {SCRAPE_FIELDS.map((f) => (
            <div key={f.label} className={styles.detailRow}>
              <dt className={styles.detailLabel}>{f.label}</dt>
              <dd className={styles.detailValue}>{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.amberCallout}>
          <div className={styles.calloutLabel}>Data quality note</div>
          <p>
            Contamination was identified and removed from 3 keywords before
            analysis: Ring Lights (49.2% of raw results were jewellery
            'Rings' — 198 of 390 kept), Earphones (8.3% non-earphone products
            removed), Matching Sets (10.1% non-fashion items removed). All
            metrics in this dashboard are computed from clean rows only.
          </p>
        </div>

        <div className={styles.greyCallout}>
          <div className={styles.calloutLabel}>Shopsy pricing note</div>
          <p>
            Shopsy product pricing was not available for this analysis. All
            price data shown reflects Meesho's catalogue only. Head-to-head
            price comparison requires Shopsy catalogue access.
          </p>
        </div>
      </div>

      {/* SECTION 3 */}
      <div className={styles.card}>
        <h3 className={styles.heading}>How We Mapped Coverage</h3>
        <p className={styles.subheading}>The Category Audit</p>
        <p className={styles.body}>
          The Netscribes research team manually audited 240 subcategories
          across 20 category groups in April 2026. Each subcategory was
          classified as present on Both platforms, Shopsy Only, or Meesho
          Only. Coverage percentage is calculated as: (Both + Shopsy Only) ÷
          Total Subcategories × 100. No estimates — every data point is a
          direct count from the audit.
        </p>
        <pre className={styles.codeBox}>
          coverage_pct = (both + shopsy_only) / total_subcats × 100
        </pre>
      </div>

      {/* SECTION 4 */}
      <div className={styles.card}>
        <h3 className={styles.heading}>The Full Production Vision</h3>
        <p className={styles.subheading}>How We'd Expand This</p>
        <div className={styles.stepsGrid}>
          {EXPAND_STEPS.map((s) => (
            <div key={s.num} className={styles.stepCard}>
              <div className={styles.stepNum}>{s.num}</div>
              <h4 className={styles.stepHeading}>{s.heading}</h4>
              <p className={styles.stepBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
