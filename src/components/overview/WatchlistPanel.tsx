import { useEffect, useState } from "react";
import { loadDataset } from "@/data/loadData";
import styles from "./WatchlistPanel.module.css";

interface WatchlistGap {
  gap_id: string;
  priority: "HIGH" | "MEDIUM";
  gap_name: string;
  subtitle: string;
  first_mover_opp: boolean;
  description: string;
  recommended_action: string;
  example_keywords: string[];
  evidence_sources: string[];
  source_tier: string;
  meesho_has_section: boolean;
}

export function WatchlistPanel() {
  const [gaps, setGaps] = useState<WatchlistGap[]>([]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    loadDataset<WatchlistGap>("watchlist_gaps.json.gz").then((data) => {
      if (!cancelled) setGaps(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className={styles.wrap}>
      <div className={styles.titleRow}>
        <h3 className={styles.title}>Watch List — Next Wave Opportunities</h3>
        <span className={styles.infoWrap} tabIndex={0}>
          <span className={styles.infoIcon} aria-label="More info">i</span>
          <span className={styles.tooltip} role="tooltip">
            These 5 opportunities were identified in the NS research team's full gap
            analysis (Sheet 5 of the research datasheet) but fall outside the top 5
            priority investment areas. Priority HIGH = strong Gen Z demand signal,
            Meesho already has a section, Shopsy does not. Priority MEDIUM = growing
            demand with directional evidence only. first_mover_opp = neither Shopsy nor
            Meesho has a dedicated section yet — genuine whitespace.
          </span>
        </span>
      </div>

      <div className={styles.list}>
        {gaps.map((g) => {
          const open = !!expanded[g.gap_id];
          return (
            <div key={g.gap_id} className={styles.card}>
              <div className={styles.topRow}>
                <span
                  className={`${styles.priorityBadge} ${
                    g.priority === "HIGH" ? styles.priorityHigh : styles.priorityMedium
                  }`}
                >
                  {g.priority}
                </span>
                {g.first_mover_opp && (
                  <span className={styles.pillTeal}>First Mover</span>
                )}
                {g.meesho_has_section && (
                  <span className={styles.pillRed}>Meesho Ahead</span>
                )}
                <span className={styles.sourceTier}>{g.source_tier}</span>
              </div>

              <div
                className={styles.midRow}
                onClick={() => toggle(g.gap_id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(g.gap_id);
                  }
                }}
              >
                <div className={styles.midText}>
                  <h4 className={styles.gapName}>{g.gap_name}</h4>
                  <div className={styles.subtitle}>{g.subtitle}</div>
                </div>
                <button
                  type="button"
                  className={styles.chevron}
                  aria-label={open ? "Collapse" : "Expand"}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(g.gap_id);
                  }}
                >
                  {open ? "▴" : "▾"}
                </button>
              </div>

              {open && (
                <div className={styles.expand}>
                  <p className={styles.description}>{g.description}</p>
                  <div className={styles.actionRow}>
                    <span className={styles.actionLabel}>Recommended action:</span>
                    {g.recommended_action}
                  </div>
                  {g.example_keywords?.length > 0 && (
                    <div className={styles.kwRow}>
                      {g.example_keywords.map((k, i) => (
                        <span key={i} className={styles.kwChip}>{k}</span>
                      ))}
                    </div>
                  )}
                  {g.evidence_sources?.length > 0 && (
                    <div className={styles.sources}>
                      {g.evidence_sources.join(" · ")}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
