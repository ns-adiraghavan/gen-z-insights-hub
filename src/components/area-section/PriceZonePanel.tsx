import styles from "./PriceZonePanel.module.css";

export interface MeeshoPricingRow {
  search_keyword?: string;
  clean_product_count?: number;
  median_price_inr?: number;
  p25_price_inr?: number;
  p75_price_inr?: number;
  pct_under_200?: number;
  pct_200_to_500?: number;
  pct_500_plus?: number;
  shopsy_price_note?: string;
}

export interface PriceZonePanelProps {
  areaId: string;
  signals: Array<{ search_keyword?: string; area_id?: string }>;
  pricingByKw: Map<string, MeeshoPricingRow>;
}

export function PriceZonePanel({ areaId, signals, pricingByKw }: PriceZonePanelProps) {
  const areaSignals = signals.filter((s) => s.area_id === areaId);

  const totalProducts = areaSignals.reduce((sum, s) => {
    const p = s.search_keyword ? pricingByKw.get(s.search_keyword) : undefined;
    return sum + (p?.clean_product_count ?? 0);
  }, 0);

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <h4 className={styles.title}>
          Meesho Price Zone Distribution — {totalProducts.toLocaleString()} products
        </h4>
        <span className={styles.infoWrap} tabIndex={0}>
          <span className={styles.infoIcon} aria-label="More info">i</span>
          <span className={styles.tooltip} role="tooltip">
            Source: Meesho live scrape, April 2026. Price zones are computed from
            min_catalog_price field across all clean (contamination-filtered) products
            per subcategory. &lt;₹200 = impulse zone (low-friction first purchase).
            ₹200–₹500 = considered zone (comparison shopping likely). ₹500+ = premium
            zone (brand or quality signal needed). Shopsy pricing data is not available
            — Meesho data shown as competitive benchmark only.
          </span>
        </span>
      </div>

      {areaSignals.length === 0 ? (
        <div className={styles.empty}>No price zone data available.</div>
      ) : (
        <div className={styles.rows}>
          {areaSignals.map((s, i) => {
            const p = s.search_keyword ? pricingByKw.get(s.search_keyword) : undefined;
            const u = p?.pct_under_200 ?? 0;
            const m = p?.pct_200_to_500 ?? 0;
            const h = p?.pct_500_plus ?? 0;
            return (
              <div key={s.search_keyword ?? i} className={styles.row}>
                <span className={styles.kwName}>{s.search_keyword ?? "—"}</span>
                <div className={styles.bar}>
                  <div
                    className={styles.segImpulse}
                    style={{ width: `${u}%` }}
                    title={`<₹200: ${u}%`}
                  />
                  <div
                    className={styles.segConsidered}
                    style={{ width: `${m}%` }}
                    title={`₹200–500: ${m}%`}
                  />
                  <div
                    className={styles.segPremium}
                    style={{ width: `${h}%` }}
                    title={`₹500+: ${h}%`}
                  />
                </div>
                <span className={styles.median}>
                  {typeof p?.median_price_inr === "number"
                    ? `Median ₹${p.median_price_inr}`
                    : "—"}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotImpulse}`} />
          Impulse (&lt;₹200)
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotConsidered}`} />
          Considered (₹200–₹500)
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.dotPremium}`} />
          Premium (₹500+)
        </span>
      </div>

      <div className={styles.note}>
        Shopsy pricing not available — Meesho benchmark only · Scrape: April 2026
      </div>
    </div>
  );
}
