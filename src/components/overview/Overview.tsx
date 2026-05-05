import { useState } from "react";
import { useDatasets } from "@/data/useDatasets";
import { CoverageHeatmap } from "./CoverageHeatmap";
import { WatchlistPanel } from "./WatchlistPanel";
import { OverviewSummaryModules } from "./OverviewSummaryModules";
import netscribesLogo from "@/assets/netscribes-logo.png";
import shopsyLogo from "@/assets/shopsy-logo.png";
import styles from "./Overview.module.css";

interface Recommendation {
  area_id?: string;
  area_name?: string;
  category_tier?: string;
  genz_tier?: string;
  gap_priority?: string;
  meesho_median_price_inr?: number;
  first_mover?: boolean;
}

interface ShopsyGap {
  gap_name?: string;
  priority?: string;
  first_mover_opportunity?: boolean;
  recommended_action?: string;
}

function tierClass(tier?: string) {
  if (!tier) return "";
  const t = tier.toLowerCase();
  if (t.includes("very")) return styles.tierVeryHigh;
  if (t === "high") return styles.tierHigh;
  return styles.tierHigh;
}

function gapBadgeClass(p?: string) {
  if (!p) return "";
  const u = p.toUpperCase();
  if (u === "URGENT") return styles.gapUrgent;
  if (u === "HIGH") return styles.gapHigh;
  return "";
}

const AREA_TO_SECTION: Record<string, string> = {
  A1: "womens-fashion",
  A2: "k-beauty",
  A3: "creator-tools",
  A4: "sports-fitness",
  A5: "jewellery",
};

function priorityBadgeClass(p?: string) {
  if (!p) return styles.priorityBadgeDefault;
  const u = p.toUpperCase();
  if (u === "URGENT") return styles.priorityBadgeUrgent;
  if (u === "HIGH") return styles.priorityBadgeHigh;
  return styles.priorityBadgeDefault;
}

export function Overview() {
  const { data, loading } = useDatasets();
  const [activeIdx, setActiveIdx] = useState(0);

  if (loading) {
    return (
      <div className={styles.skeleton} aria-busy="true">
        <div className={styles.skelBar} />
        <div className={styles.skelBar} />
        <div className={styles.skelBar} />
      </div>
    );
  }

  const recs = data.recommendations as Recommendation[];
  const gaps = data.shopsyGaps as ShopsyGap[];

  return (
    <div className={styles.wrap}>
      {/* HERO HEADER */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <div className={styles.heroBrandRow}>
            <img src={netscribesLogo} alt="Netscribes" className={styles.heroLogoNs} />
            <span className={styles.heroBrandX}>×</span>
            <img src={shopsyLogo} alt="Shopsy" className={styles.heroLogoShopsy} />
          </div>
          <h1 className={styles.heroTitle}>The Gen Z Opportunity</h1>
          <p className={styles.heroSubtitle}>
            5 data-backed investment recommendations for Shopsy's Gen Z catalogue strategy
          </p>
        </div>
        <div className={styles.heroStats}>
          {[
            { n: "240", l: "Categories Analyzed" },
            { n: "5", l: "Priority Segments" },
            { n: "90+", l: "Gen Z Keywords" },
            { n: "10", l: "Gap Recommendations" },
          ].map((s) => (
            <div key={s.l} className={styles.heroStat}>
              <div className={styles.heroStatNum}>{s.n}</div>
              <div className={styles.heroStatLabel}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <p className={styles.priorityBasis}>
        Priority reflects first-mover status (URGENT = neither platform has this section), Gen Z demand evidence strength, and Shopsy's subcategory gap count vs Meesho.
      </p>

      {/* COMPONENT 2 */}
      {recs.length > 0 ? (
        <div className={styles.cardsScroll}>
          {recs.map((r, i) => {
            const tier = r.category_tier ?? r.genz_tier;
            return (
              <button
                type="button"
                key={r.area_id ?? i}
                onClick={() => {
                  setActiveIdx(i);
                  const sectionId = r.area_id ? AREA_TO_SECTION[r.area_id] : undefined;
                  if (sectionId) {
                    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className={`${styles.card} ${i === activeIdx ? styles.cardActive : ""}`}
              >
                <div className={styles.cardName}>{r.area_name ?? "—"}</div>
                <div className={styles.cardBadges}>
                  {tier && (
                    <span className={`${styles.tierBadge} ${tierClass(tier)}`}>{tier}</span>
                  )}
                  {r.gap_priority && (
                    <span className={`${styles.gapBadge} ${gapBadgeClass(r.gap_priority)}`}>
                      {r.gap_priority.toUpperCase()}
                    </span>
                  )}
                </div>
                {typeof r.meesho_median_price_inr === "number" && (
                  <div className={styles.cardPrice}>
                    Meesho median: ₹{r.meesho_median_price_inr}
                  </div>
                )}
                {r.first_mover === true && (
                  <div className={styles.firstMover}>● First Mover</div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>No recommendations data available.</div>
      )}

      <OverviewSummaryModules />

      {/* COMPONENT 3 */}
      <div className={styles.gapList}>
        {gaps.length > 0 ? (
          gaps.map((g, i) => {
            const label = g.priority ? g.priority.toUpperCase() : "—";
            return (
              <div key={i} className={styles.gapCard}>
                <div className={`${styles.priorityBadge} ${priorityBadgeClass(g.priority)}`}>
                  {label}
                </div>
                <div className={styles.gapBody}>
                  <div className={styles.gapName}>{g.gap_name ?? "—"}</div>
                  <div className={styles.gapAction}>{g.recommended_action ?? "—"}</div>
                </div>
                <div
                  className={`${styles.fmPill} ${
                    g.first_mover_opportunity === true ? styles.fmPillYes : styles.fmPillNo
                  }`}
                >
                  {g.first_mover_opportunity === true ? "✓ First mover" : "—"}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.empty}>No Shopsy coverage gap data available.</div>
        )}
      </div>

      {/* COMPONENT 4 */}
      <div className={styles.provenance}>
        Meesho pricing data: live scrape April 2026 · Gen Z signal tiers: NS Research,
        evidence-tiered per source quality · Shopsy pricing: not available in this dataset
      </div>

      <WatchlistPanel />
      <CoverageHeatmap />
    </div>
  );
}
