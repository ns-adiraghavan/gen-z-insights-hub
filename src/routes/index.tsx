import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { Overview } from "@/components/overview/Overview";
import { WomensFashion } from "@/components/womens-fashion/WomensFashion";
import { AreaSection } from "@/components/area-section/AreaSection";
import { Methodology } from "@/components/methodology/Methodology";
import netscribesLogo from "@/assets/netscribes-logo.png";

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
        href: "https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap",
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
  { id: "methodology", label: "Methodology" },
] as const;

function Index() {
  const [active, setActive] = useState<string>("overview");

  useEffect(() => {
    const elements = SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img src={netscribesLogo} alt="Netscribes" className={styles.logoImg} />
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
              {s.id === "overview" ? (
                <>
                  <h2 className={styles.sectionHeading}>{s.label}</h2>
                  <Overview />
                </>
              ) : null}
              {s.id === "overview" ? null : s.id === "womens-fashion" ? (
                <WomensFashion />
              ) : s.id === "k-beauty" ? (
                <AreaSection
                  areaId="A2"
                  title="K-Beauty & Skincare Routines"
                  callout="34% of Indian Gen Z actively exploring Korean skincare — YouGov/GCI Magazine 2025"
                />
              ) : s.id === "creator-tools" ? (
                <AreaSection
                  areaId="A3"
                  title="Creator Tools & Consumer Electronics"
                  callout="Ring lights were Meesho's #1 electronics category search item H1 2024, driven entirely by Gen Z content creators — Meesho Smart Shopper Report"
                  cardOverrides={{
                    "Ring Lights & Creator Accessories": {
                      cleanProductCount: 198,
                      footnote: "49% of raw results filtered — jewellery contamination removed",
                    },
                  }}
                />
              ) : s.id === "sports-fitness" ? (
                <AreaSection
                  areaId="A4"
                  title="Sports, Fitness & Athleisure"
                  callout="1-in-3 Gen Z consumers allocates more than 20% of their income to fitness-related activities — Outlook Luxe / RedSeer 2026"
                  showShopsyAdvantage
                />
              ) : s.id === "jewellery" ? (
                <AreaSection
                  areaId="A5"
                  title="Jewellery & Accessories"
                  callout="Artificial jewellery market growing at CAGR 11.4% (2025–29), driven by affordability and online access among younger consumers — IBEF 2025"
                />
              ) : s.id === "methodology" ? (
                <>
                  <h2 className={styles.sectionHeading}>Methodology</h2>
                  <Methodology />
                </>
              ) : (
                <div className={styles.placeholder}>Section content coming soon.</div>
              )}
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
