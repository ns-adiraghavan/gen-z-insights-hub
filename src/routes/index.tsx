import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import styles from "./index.module.css";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Gen Z Opportunity — Shopsy POC | Netscribes" },
      {
        name: "description",
        content:
          "Gen Z Opportunity Intelligence dashboard for Shopsy — investment area analysis across women's fashion, K-beauty, creator tools, sports & fitness, and jewellery.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@500;600;700;800&display=swap",
      },
    ],
  }),
});

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "womens-fashion", label: "Women's Fashion" },
  { id: "k-beauty", label: "K-Beauty & Skincare" },
  { id: "creator-tools", label: "Creator Tools" },
  { id: "sports-fitness", label: "Sports & Fitness" },
  { id: "jewellery", label: "Jewellery & Accessories" },
] as const;

function Index() {
  const [active, setActive] = useState<string>("overview");

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          netscribes<span className={styles.logoDot}>.</span>
        </div>

        <nav className={styles.nav}>
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActive(s.id);
                  const el = document.getElementById(s.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                <span className={styles.navAccent} aria-hidden="true" />
                <span className={styles.navLabel}>{s.label}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.snapshot}>
          <div className={styles.snapshotLabel}>Data Snapshot</div>
          <div className={styles.snapshotValue}>7,069</div>
          <div className={styles.snapshotMeta}>Meesho products</div>
          <div className={styles.snapshotMetaDim}>Scraped: Apr 2026</div>
        </div>
      </aside>

      <div className={styles.mainCol}>
        <header className={styles.topbar}>
          <h1 className={styles.pageTitle}>Gen Z Opportunity — Shopsy POC</h1>
          <span className={styles.badge}>5 Investment Areas Identified</span>
        </header>

        <main className={styles.content}>
          {SECTIONS.map((s, i) => (
            <section
              key={s.id}
              id={s.id}
              className={`${styles.section} ${i === 0 ? styles.sectionFirst : ""}`}
            >
              <h2 className={styles.sectionHeading}>{s.label}</h2>
              <div className={styles.placeholder}>Section content coming soon.</div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
