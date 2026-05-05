import styles from "./OverviewSummaryModules.module.css";

interface SummaryRow {
  area: string;
  priority: "URGENT" | "HIGH";
  price: string;
  firstMover: boolean;
  action: string;
}

const SUMMARY_ROWS: SummaryRow[] = [
  {
    area: "Women's Streetwear & Casual Fashion",
    priority: "URGENT",
    price: "₹200–₹500",
    firstMover: true,
    action:
      "Launch dedicated Streetwear section: Graphic Tees, Cargo Sets, Co-Ords, Y2K, Anime wear",
  },
  {
    area: "K-Beauty & Skincare Routines",
    priority: "URGENT",
    price: "Under ₹200",
    firstMover: true,
    action:
      "Create K-Beauty hub: Sheet Masks, Serums, Glass Skin Kits, Toners under ₹499",
  },
  {
    area: "Creator Tools & Consumer Electronics",
    priority: "URGENT",
    price: "₹200–₹500",
    firstMover: true,
    action: "Add Creator Tools section: Ring Lights, Tripods, Mics, Selfie Sticks",
  },
  {
    area: "Sports, Fitness & Athleisure",
    priority: "HIGH",
    price: "₹200–₹500",
    firstMover: false,
    action:
      "Extend Shopsy's existing 100% coverage lead — promote Athleisure & Protein Supplements",
  },
  {
    area: "Jewellery & Accessories",
    priority: "HIGH",
    price: "Under ₹200",
    firstMover: false,
    action:
      "Close Men's Jewellery gap; promote Oxidised Earrings & Layered Necklaces",
  },
];

const SHOPSY_EXCLUSIVES: { emoji: string; text: string }[] = [
  { emoji: "📚", text: "Full Books Category (Academic, Fiction, Entrance Exam, Children's)" },
  { emoji: "🎵", text: "Musical Instruments (Flutes, Guitars, Keyboards, Dholaks)" },
  { emoji: "🏏", text: "Sports Equipment (Cricket, Treadmills, Skateboards, Roller Skates)" },
  { emoji: "👔", text: "Men's Suits & Blazers (dedicated section)" },
  { emoji: "☀️", text: "Sunscreen / SPF Products (exclusive in Beauty)" },
  { emoji: "🧢", text: "Caps & Hats (Shopsy exclusive in Accessories)" },
];

const MEESHO_EXCLUSIVES: { emoji: string; text: string }[] = [
  { emoji: "🛒", text: "Full Grocery & Food Category" },
  { emoji: "🛋", text: "Furniture (Beds, Sofas, Wardrobes)" },
  { emoji: "🏠", text: "Home Essentials (8 sub-types — Shopsy has only Hangers)" },
  { emoji: "💅", text: "Makeup Brushes & Accessories" },
  { emoji: "👠", text: "Plus Size Women's Fashion" },
  { emoji: "💍", text: "Men's Jewellery (Chains, Studs, Bracelets)" },
  { emoji: "🎒", text: "Luggage & Trolley Bags" },
];

const STEPS: { num: string; heading: string; body: string }[] = [
  {
    num: "01",
    heading: "Launch 3 First-Mover Sections",
    body:
      "Streetwear, K-Beauty Hub, and Creator Tools all have strong Gen Z demand signals with zero Meesho equivalent. Neither platform owns this space. Target Q2 2026 for first-mover advantage.",
  },
  {
    num: "02",
    heading: "Close Plus Size & Men's Jewellery Gaps",
    body:
      "Both categories are live on Meesho but absent on Shopsy. Create dedicated sections with sizes up to 4XL/6XL. Aligns to documented Gen Z body-positivity and gender-fluid fashion values.",
  },
  {
    num: "03",
    heading: "Build a Sustainable Fashion Differentiator",
    body:
      "No platform owns 'Conscious Fashion'. KPMG 2025 confirms Gen Z willingness to pay a premium for sustainable products. A Conscious Fashion collection positions Shopsy above Meesho for values-led Gen Z shoppers.",
  },
  {
    num: "04",
    heading: "Activate a Keyword SEO Strategy",
    body:
      "90+ Gen Z search terms identified across Women's Fashion, Beauty, Electronics, and Jewellery. Prioritise high-intent Shopping terms: 'niacinamide serum India', 'ring light for reels India', 'co-ord set women India'.",
  },
];

export function OverviewSummaryModules() {
  return (
    <>
      {/* MODULE A */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Investment Summary</h2>
        <div className={styles.card}>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Gap Priority</th>
                  <th>Price Target</th>
                  <th>First Mover?</th>
                  <th>Recommended Action</th>
                </tr>
              </thead>
              <tbody>
                {SUMMARY_ROWS.map((r) => (
                  <tr key={r.area}>
                    <td className={styles.areaName}>{r.area}</td>
                    <td>
                      <span
                        className={`${styles.pill} ${
                          r.priority === "URGENT" ? styles.pillUrgent : styles.pillHigh
                        }`}
                      >
                        {r.priority}
                      </span>
                    </td>
                    <td className={styles.priceTarget}>{r.price}</td>
                    <td className={r.firstMover ? styles.fmYes : styles.fmNo}>
                      {r.firstMover ? "✅ Yes" : "❌ No"}
                    </td>
                    <td>{r.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* MODULE B */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Where Shopsy Leads & Where It Lags</h2>
        <div className={styles.posCard}>
          <div className={styles.posGrid}>
            <div className={styles.posCol}>
              <h3 className={`${styles.posHeading} ${styles.posHeadingLead}`}>
                Shopsy Exclusives
              </h3>
              <ul className={styles.posList}>
                {SHOPSY_EXCLUSIVES.map((it) => (
                  <li key={it.text} className={styles.posItem}>
                    <span className={styles.posEmoji}>{it.emoji}</span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.posCol}>
              <h3 className={`${styles.posHeading} ${styles.posHeadingLag}`}>
                Meesho Exclusives (Shopsy Gaps)
              </h3>
              <ul className={styles.posList}>
                {MEESHO_EXCLUSIVES.map((it) => (
                  <li key={it.text} className={styles.posItem}>
                    <span className={styles.posEmoji}>{it.emoji}</span>
                    <span>{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.posSource}>
            Source: NS Research Team — 240 subcategory audit, April 2026
          </div>
        </div>
      </section>

      {/* MODULE C */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>What Shopsy Does Next</h2>
        <div className={styles.stepsGrid}>
          {STEPS.map((s) => (
            <div key={s.num} className={styles.stepCard}>
              <div className={styles.stepNum}>{s.num}</div>
              <h3 className={styles.stepHeading}>{s.heading}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
