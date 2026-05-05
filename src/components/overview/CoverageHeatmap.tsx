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
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${r.shopsy_coverage_pct}%` }} />
        </div>
        <span className={styles.pct}>{r.shopsy_coverage_pct}</span>
      </div>
      {r.shopsy_gap_count > 0 ? (
        <span className={styles.gapPill}>−{r.shopsy_gap_count}</span>
      ) : (
        <span className={styles.gapSpacer} />
      )}
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Shopsy vs Meesho — Category Coverage</h3>
        <span className={styles.infoWrap} tabIndex={0}>
          <span className={styles.infoIcon} aria-label="More info">i</span>
          <span className={styles.tooltip} role="tooltip">
            Source: NS Research team catalogue audit of Shopsy.in vs Meesho.com, April 2026.
            Each of 240 subcategories across 20 categories was manually classified as present
            on Both Platforms, Shopsy Only, or Meesho Only. shopsy_gap_count = subcategories
            where Meesho is present but Shopsy is not. Coverage % = (both + platform_only) /
            total_subcats.
          </span>
        </span>
      </div>

      <div className={styles.grid}>
        <div className={styles.col}>{left.map(renderRow)}</div>
        <div className={styles.col}>{right.map(renderRow)}</div>
      </div>

      <div className={styles.provenance}>
        240 subcategories audited · NS Research April 2026 · Meesho pricing not a factor in this view
      </div>
    </div>
  );
}
