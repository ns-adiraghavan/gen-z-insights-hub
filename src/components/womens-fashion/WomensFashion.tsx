import { useEffect, useState } from "react";
import { useDatasets } from "@/data/useDatasets";
import { loadDataset } from "@/data/loadData";
import { DecisionCallout } from "@/components/area-section/DecisionCallout";
import { PriceZonePanel } from "@/components/area-section/PriceZonePanel";
import { SubcatDepthBar, type SubcatDepthRow } from "@/components/area-section/SubcatDepthBar";
import styles from "./WomensFashion.module.css";

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
}
interface Keyword {
  area_id?: string;
  keyword?: string;
  intent?: string;
  source?: string;
}

const AREA_ID = "A1";

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

function pct(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

export function WomensFashion() {
  const { data, loading } = useDatasets();

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
  const signals = (data.genzSignals as GenzSignal[]).filter(
    (s) => s.area_id === AREA_ID,
  );
  const pricing = data.meeshoPricing as MeeshoPricing[];
  const keywords = (data.keywords as Keyword[]).filter(
    (k) => k.area_id === AREA_ID,
  );

  const rec = recommendations.find((r) => r.area_id === AREA_ID);
  const pricingByKw = new Map<string, MeeshoPricing>();
  for (const p of pricing) {
    if (p.search_keyword) pricingByKw.set(p.search_keyword, p);
  }

  return (
    <div className={styles.wrap}>
      {/* COMPONENT 1 */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.headerTitle}>Women's Streetwear & Casual Fashion</h3>
          {rec?.market_signal && (
            <p className={styles.marketSignal}>{rec.market_signal}</p>
          )}
        </div>
        <div className={styles.chips}>
          <div className={styles.chip}>
            <div className={styles.chipLabel}>Gen Z Rank</div>
            <div className={styles.chipValue}>
              #{rec?.genz_category_rank ?? "—"}
            </div>
          </div>
        </div>
      </div>

      {/* COMPONENT 2 */}
      {signals.length > 0 ? (
        <div className={styles.grid}>
          {signals.map((s, i) => {
            const p = s.search_keyword ? pricingByKw.get(s.search_keyword) : undefined;
            const min = p?.min_price_inr;
            const max = p?.max_price_inr;
            const p25 = p?.p25_price_inr;
            const p75 = p?.p75_price_inr;
            const haveBar =
              typeof min === "number" &&
              typeof max === "number" &&
              typeof p25 === "number" &&
              typeof p75 === "number";

            return (
              <div key={s.search_keyword ?? i} className={styles.card}>
                {s.is_shopsy_gap && (
                  <span className={styles.shopsyGapPill}>Shopsy Gap</span>
                )}
                <div className={styles.cardHeaderRow}>
                  <h4 className={styles.cardTitle}>{s.search_keyword ?? "—"}</h4>
                  {s.genz_tier && !s.is_shopsy_gap && (
                    <span className={`${styles.tierBadge} ${tierClass(s.genz_tier)}`}>
                      {s.genz_tier}
                    </span>
                  )}
                </div>
                {s.is_shopsy_gap && s.genz_tier && (
                  <span
                    className={`${styles.tierBadge} ${tierClass(s.genz_tier)}`}
                    style={{ alignSelf: "flex-start" }}
                  >
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
                      <span className={styles.priceAvg}>
                        Avg ₹{p.avg_price_inr}
                      </span>
                    )}
                  </div>
                )}

                <div className={styles.cardFooter}>
                  {typeof p?.clean_product_count === "number"
                    ? `${p.clean_product_count.toLocaleString()} Meesho products`
                    : "Pricing data unavailable"}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>No subcategory data available.</div>
      )}

      {/* COMPONENT 3 */}
      <div className={styles.kwPanel}>
        <h4 className={styles.kwTitle}>Gen Z Search Terms</h4>
        {keywords.length > 0 ? (
          <div className={styles.kwGrid}>
            {keywords.map((k, i) => (
              <div key={i} className={styles.kwRow}>
                <span className={styles.kwText} title={k.keyword}>
                  {k.keyword ?? "—"}
                </span>
                <span className={`${styles.kwIntent} ${intentClass(k.intent)}`}>
                  {k.intent ?? "—"}
                </span>
                <span className={styles.kwSource} title={k.source}>
                  {k.source ?? "—"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>No keyword data available.</div>
        )}
      </div>
    </div>
  );
}
