import { useState } from "react";
import styles from "./KeywordPanel.module.css";

export interface KeywordItem {
  keyword?: string;
  intent?: string;
  source?: string;
}

const PRIORITY_TERMS: Record<string, string[]> = {
  A1: ["co ord set women India", "oversized tshirt women India", "cargo pants women India"],
  A2: ["korean sheet mask India", "niacinamide serum India", "glass skin routine India"],
  A3: ["ring light for reels India", "ring light India under 500", "condenser mic India under 2000"],
  A4: ["gym leggings women India", "yoga mat India under 500", "athleisure set India"],
  A5: ["oxidised earrings India", "layered necklace India", "men chains India online"],
};

function intentClass(intent?: string) {
  if (!intent) return "";
  const i = intent.toLowerCase();
  if (i.includes("shop")) return styles.intentShopping;
  if (i.includes("disc")) return styles.intentDiscovery;
  if (i.includes("res")) return styles.intentResearch;
  return "";
}

function intentNote(intent?: string) {
  const i = (intent ?? "").toLowerCase();
  if (i.includes("shop")) return "Shopping intent — direct promotion target";
  if (i.includes("disc")) return "Discovery intent — top-of-funnel awareness play";
  if (i.includes("res")) return "Research intent — content & education opportunity";
  return "High-intent Gen Z search term";
}

export function KeywordPanel({
  areaId,
  keywords,
}: {
  areaId: string;
  keywords: KeywordItem[];
}) {
  const [expanded, setExpanded] = useState(false);

  if (keywords.length === 0) {
    return (
      <div className={styles.panel}>
        <h4 className={styles.title}>Gen Z Search Terms</h4>
        <div className={styles.empty}>No keyword data available.</div>
      </div>
    );
  }

  const priorityList = PRIORITY_TERMS[areaId] ?? [];
  const priorityKws: KeywordItem[] = [];
  const remaining: KeywordItem[] = [];
  const used = new Set<KeywordItem>();

  // Match priority terms in order, fall back to first 3 from list if no map
  for (const term of priorityList) {
    const match = keywords.find((k) => k.keyword === term && !used.has(k));
    if (match) {
      priorityKws.push(match);
      used.add(match);
    }
  }
  if (priorityKws.length === 0) {
    for (const k of keywords.slice(0, 3)) {
      priorityKws.push(k);
      used.add(k);
    }
  }
  for (const k of keywords) {
    if (!used.has(k)) remaining.push(k);
  }

  return (
    <div className={styles.panel}>
      <h4 className={styles.title}>Gen Z Search Terms</h4>

      <div className={styles.priorityList}>
        {priorityKws.map((k, i) => (
          <div key={`p-${i}`} className={styles.priorityCard}>
            <div className={styles.priorityHead}>
              <span className={styles.priorityPill}>HIGH PRIORITY</span>
              <span className={styles.kwSource} title={k.source}>
                {k.source ?? "—"}
              </span>
            </div>
            <div className={styles.priorityKw}>{k.keyword ?? "—"}</div>
            <div className={styles.priorityNote}>{intentNote(k.intent)}</div>
          </div>
        ))}
      </div>

      {remaining.length > 0 && (
        <>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Show fewer ↑" : `Show all ${keywords.length} terms ↓`}
          </button>

          {expanded && (
            <div className={styles.kwGrid}>
              {remaining.map((k, i) => (
                <div key={`r-${i}`} className={styles.kwRow}>
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
          )}
        </>
      )}
    </div>
  );
}
