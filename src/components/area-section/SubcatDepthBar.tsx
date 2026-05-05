import styles from "./SubcatDepthBar.module.css";

export interface SubcatBreakdownEntry {
  subcat_name: string;
  count: number;
  pct: number;
}

export interface SubcatDepthRow {
  area_id: string;
  search_keyword: string;
  total_scraped: number;
  unique_subcats: number;
  median_price_inr: number;
  contamination_note: string | null;
  subcat_breakdown: SubcatBreakdownEntry[];
  data_source: string;
  metric_note: string;
}

export interface SubcatDepthBarProps {
  keyword: string;
  depthRow: SubcatDepthRow | undefined;
}

const PALETTE = [
  "#6B35C9",
  "#f5a524",
  "#8b9eff",
  "#E53935",
  "#4ecdc4",
  "#ffe66d",
  "#a8e6cf",
  "#3a3f52",
];

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

export function SubcatDepthBar({ depthRow }: SubcatDepthBarProps) {
  if (!depthRow) return null;
  const breakdown = depthRow.subcat_breakdown ?? [];
  const top3 = breakdown.slice(0, 3);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <span className={styles.title}>Meesho Catalogue Composition</span>
        <span className={styles.infoWrap} tabIndex={0}>
          <span className={styles.infoIcon} aria-label="More info">i</span>
          <span className={styles.tooltip} role="tooltip">
            Source: Meesho live scrape, April 2026. sub_sub_category_name field from
            Meesho catalogue API — this is Meesho's own internal categorisation of each
            product. A single search keyword may surface products from multiple internal
            subcategories. High diversity (many subcats) = fragmented demand or broad
            keyword. Low diversity (one dominant subcat) = focused, cleanly mapped
            category. Percentages are of total scraped results before contamination
            filtering. contamination_note is shown where known non-target products
            appeared.
          </span>
        </span>
      </div>

      <div className={styles.bar}>
        {breakdown.map((b, i) => (
          <div
            key={i}
            className={styles.seg}
            style={{ width: `${b.pct}%`, background: PALETTE[i % PALETTE.length] }}
            title={`${b.subcat_name}: ${b.count} products (${b.pct}%)`}
          />
        ))}
      </div>

      {top3.length > 0 && (
        <div className={styles.legend}>
          {top3.map((b, i) => (
            <span key={i} className={styles.legendItem}>
              <span
                className={styles.dot}
                style={{ background: PALETTE[i % PALETTE.length] }}
              />
              {truncate(b.subcat_name, 18)}{" "}
              <span className={styles.legendPct}>{b.pct}%</span>
            </span>
          ))}
        </div>
      )}

      {depthRow.contamination_note && (
        <div className={styles.contamination}>{depthRow.contamination_note}</div>
      )}
    </div>
  );
}
