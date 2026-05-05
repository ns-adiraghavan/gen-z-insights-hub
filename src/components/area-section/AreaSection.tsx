import { useEffect, useState } from "react";
import { useDatasets } from "@/data/useDatasets";
import { loadDataset } from "@/data/loadData";
import { PriceZonePanel } from "./PriceZonePanel";
import { SubcatDepthBar, type SubcatDepthRow } from "./SubcatDepthBar";
import { DecisionCallout } from "./DecisionCallout";
import { KeywordPanel } from "./KeywordPanel";
import styles from "./AreaSection.module.css";

interface Recommendation {
  area_id?: string;
  market_signal?: string;
  genz_category_rank?: number;
  gap_priority?: string;
}
interface GenzSignal {
  area_id?: string;
  search_keyword?: string;
  genz_tier?: string;
  is_shopsy_gap?: boolean;
}
interface MeeshoPricing {
  search_keyword?: string;
  clean_product_count?: number;
  avg_price_inr?: number;
  median_price_inr?: number;
  min_price_inr?: number;
  max_price_inr?: number;
  p25_price_inr?: number;
  p75_price_inr?: number;
  contamination_pct?: number;
}
interface Keyword {
  area_id?: string;
  keyword?: string;
  intent?: string;
  source?: string;
}

export interface CardOverride {
  /** Display this clean_product_count instead of the dataset value */
  cleanProductCount?: number;
  /** Optional small note rendered under the product count */
  footnote?: string;
}

export interface AreaSectionProps {
  areaId: string;
  title: string;
  callout?: string;
  showShopsyAdvantage?: boolean;
  /** Per-keyword overrides for specific cards */
  cardOverrides?: Record<string, CardOverride>;
}

function tierClass(tier?: string) {
  if (!tier) return "";
  return tier.toLowerCase().includes("very") ? styles.tierVeryHigh : styles.tierHigh;
}
function intentClass(intent?: string) {
  if (!intent) return "";
  const i = intent.toLowerCase();
  if (i.includes("shop")) return styles.intentShopping;
  if (i.includes("disc")) return styles.intentDiscovery;
  if (i.includes("res")) return styles.intentResearch;
  return "";
}
function priorityValueClass(p?: string) {
  if (!p) return "";
  const u = p.toUpperCase();
  if (u === "URGENT") return styles.chipValueUrgent;
  if (u === "HIGH") return styles.chipValueHigh;
  return "";
}
function pct(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

export function AreaSection({
  areaId,
  title,
  callout,
  showShopsyAdvantage,
  cardOverrides,
}: AreaSectionProps) {
  const { data, loading } = useDatasets();
  const [depth, setDepth] = useState<SubcatDepthRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    loadDataset<SubcatDepthRow>("subcat_depth.json.gz").then((rows) => {
      if (!cancelled) setDepth(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.skeleton} aria-busy="true">
        <div className={styles.skelBar} />
        <div className={styles.skelBar} />
        <div className={styles.skelBar} />
      </div>
    );
  }

  const recommendations = data.recommendations as Recommendation[];
  const signals = (data.genzSignals as GenzSignal[]).filter((s) => s.area_id === areaId);
  const pricing = data.meeshoPricing as MeeshoPricing[];
  const keywords = (data.keywords as Keyword[]).filter((k) => k.area_id === areaId);

  const rec = recommendations.find((r) => r.area_id === areaId);
  const pricingByKw = new Map<string, MeeshoPricing>();
  for (const p of pricing) {
    if (p.search_keyword) pricingByKw.set(p.search_keyword, p);
  }
  const depthByKw = new Map<string, SubcatDepthRow>();
  for (const d of depth) {
    if (d.search_keyword) depthByKw.set(d.search_keyword, d);
  }

  return (
    <div className={styles.wrap}>
      {/* COMPONENT 1 — Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.headerTitle}>{title}</h3>
          {rec?.market_signal && (
            <p className={styles.marketSignal}>{rec.market_signal}</p>
          )}
        </div>
        <div className={styles.chips}>
          <div className={styles.chip}>
            <div className={styles.chipLabel}>Gen Z Rank</div>
            <div className={styles.chipValue}>#{rec?.genz_category_rank ?? "—"}</div>
          </div>
          <div className={styles.chip}>
            <div className={styles.chipLabel}>Gap Priority</div>
            <div className={`${styles.chipValue} ${priorityValueClass(rec?.gap_priority)}`}>
              {rec?.gap_priority ?? "—"}
            </div>
          </div>
          {showShopsyAdvantage && (
            <div className={styles.advantageChip}>
              <div className={styles.advantageLabel}>Shopsy Advantage</div>
              <div className={styles.advantageText}>Shopsy leads coverage here</div>
            </div>
          )}
        </div>
      </div>

      <DecisionCallout areaId={areaId} />

      {/* Callout */}
      {callout && <div className={styles.callout}>{callout}</div>}

      <PriceZonePanel areaId={areaId} signals={signals} pricingByKw={pricingByKw} />

      {/* COMPONENT 2 — Subcategory grid */}
      {signals.length > 0 ? (
        <div className={styles.grid}>
          {signals.map((s, i) => {
            const p = s.search_keyword ? pricingByKw.get(s.search_keyword) : undefined;
            const override = s.search_keyword ? cardOverrides?.[s.search_keyword] : undefined;
            const min = p?.min_price_inr;
            const max = p?.max_price_inr;
            const p25 = p?.p25_price_inr;
            const p75 = p?.p75_price_inr;
            const haveBar =
              typeof min === "number" &&
              typeof max === "number" &&
              typeof p25 === "number" &&
              typeof p75 === "number";

            const cleanCount =
              typeof override?.cleanProductCount === "number"
                ? override.cleanProductCount
                : p?.clean_product_count;

            return (
              <div key={s.search_keyword ?? i} className={styles.card}>
                {s.is_shopsy_gap && (
                  <span className={styles.shopsyGapPill}>Shopsy Gap</span>
                )}
                <div className={styles.cardHeaderRow}>
                  <h4 className={styles.cardTitle}>{s.search_keyword ?? "—"}</h4>
                </div>
                {s.genz_tier && (
                  <span className={`${styles.tierBadge} ${tierClass(s.genz_tier)}`}>
                    {s.genz_tier}
                  </span>
                )}

                {haveBar && (
                  <div className={styles.priceBarWrap}>
                    <div className={styles.priceBarTrack}>
                      <div
                        className={styles.priceBarFill}
                        style={{
                          left: `${pct(p25!, min!, max!)}%`,
                          width: `${pct(p75!, min!, max!) - pct(p25!, min!, max!)}%`,
                        }}
                      />
                    </div>
                    <div className={styles.priceBarLabels}>
                      <span>₹{min}</span>
                      <span>₹{max}</span>
                    </div>
                  </div>
                )}

                {p && (
                  <div className={styles.priceStats}>
                    {typeof p.median_price_inr === "number" && (
                      <span className={styles.priceMedian}>
                        Median ₹{p.median_price_inr}
                      </span>
                    )}
                    {typeof p.avg_price_inr === "number" && (
                      <span className={styles.priceAvg}>Avg ₹{p.avg_price_inr}</span>
                    )}
                  </div>
                )}

                <SubcatDepthBar
                  keyword={s.search_keyword ?? ""}
                  depthRow={depthByKw.get(s.search_keyword ?? "")}
                />

                <div className={styles.cardFooter}>
                  {typeof cleanCount === "number"
                    ? `${cleanCount.toLocaleString()} Meesho products`
                    : "Pricing data unavailable"}
                  {override?.footnote && (
                    <div className={styles.cardFootnote}>{override.footnote}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>No subcategory data available.</div>
      )}

      {/* COMPONENT 3 — Keywords */}
      <KeywordPanel areaId={areaId} keywords={keywords} />
    </div>
  );
}
