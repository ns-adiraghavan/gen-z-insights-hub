import { useEffect, useState } from "react";
import { loadDataset } from "@/data/loadData";
import styles from "./CoverageHeatmap.module.css";

interface CoverageRow {
  category: string;
  genz_tier: "Very High" | "High" | "Medium" | "Low";
  genz_rank: number;
  total_subcats: number;
  both: number;
  shopsy_only: number;
  meesho_only: number;
  shopsy_coverage_pct: number;
  meesho_coverage_pct: number;
  shopsy_gap_count: number;
  data_source: string;
}

function tierClass(tier: string) {
  switch (tier) {
    case "Very High": return styles.tierVeryHigh;
    case "High": return styles.tierHigh;
    case "Medium": return styles.tierMedium;
    default: return styles.tierLow;
  }
}

export function CoverageHeatmap() {
  const [rows, setRows] = useState<CoverageRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    loadDataset<CoverageRow>("coverage_heatmap.json.gz").then((data) => {
      if (!cancelled) setRows(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = [...rows].sort((a, b) => a.genz_rank - b.genz_rank);
  const left = sorted.filter((r) => r.genz_tier === "Very High" || r.genz_tier === "High");
  const right = sorted.filter((r) => r.genz_tier === "Medium" || r.genz_tier === "Low");

  const renderRow = (r: CoverageRow) => (
    <div key={r.category} className={styles.row}>
      <span className={`${styles.catName} ${tierClass(r.genz_tier)}`}>{r.category}</span>
      <div className={styles.barWrap}>
        <div className={styles.bar} title={`Shopsy lists ${r.shopsy_coverage_pct}% of subcategories in this category`}>
          <div className={styles.barFill} style={{ width: `${r.shopsy_coverage_pct}%` }} />
        </div>
        <span className={styles.pct}>{r.shopsy_coverage_pct}%</span>
      </div>
      {r.shopsy_gap_count > 0 ? (
        <span className={styles.gapPill} title={`${r.shopsy_gap_count} subcategories live on Meesho but missing from Shopsy`}>
          {r.shopsy_gap_count} missing
        </span>
      ) : (
        <span className={styles.gapSpacer} />
      )}
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <div>
          <h3 className={styles.title}>Shopsy vs Meesho — Category Coverage</h3>
          <p className={styles.subtitle}>
            How much of each category does Shopsy actually stock? Bar = % of subcategories Shopsy lists. <strong>"X missing"</strong> = subcategories live on Meesho that Shopsy does not carry. Sorted by Gen Z demand rank.
          </p>
        </div>
        <span className={styles.infoWrap} tabIndex={0}>
          <span className={styles.infoIcon} aria-label="More info">i</span>
          <span className={styles.tooltip} role="tooltip">
            NS Research team manually audited 208 subcategories across 20 categories on Shopsy.in and Meesho.com (May 2026). Each subcategory was classified as: Both platforms, Shopsy only, or Meesho only. "Missing" count = subcategories where Meesho is present but Shopsy is not. Coverage % = subcategories Shopsy carries ÷ total subcategories in that category.
          </span>
        </span>
      </div>

      <div className={styles.axisRow}>
        <span className={styles.axisLabel}>0%</span>
        <span className={styles.axisLabel}>← Shopsy subcategory coverage →</span>
        <span className={styles.axisLabel}>100%</span>
      </div>

      <div className={styles.legendRow}>
        <span className={`${styles.tierDot} ${styles.tierDotVeryHigh}`} /> Very High Gen Z demand
        <span className={`${styles.tierDot} ${styles.tierDotHigh}`} /> High Gen Z demand
        <span className={`${styles.tierDot} ${styles.tierDotMedium}`} /> Medium
        <span className={`${styles.tierDot} ${styles.tierDotLow}`} /> Lower demand
      </div>

      <div className={styles.grid}>
        <div className={styles.col}>{left.map(renderRow)}</div>
        <div className={styles.col}>{right.map(renderRow)}</div>
      </div>

      <div className={styles.provenance}>
        208 subcategories audited · NS Research May 2026 · Meesho pricing not a factor in this view
      </div>
    </div>
  );
}
