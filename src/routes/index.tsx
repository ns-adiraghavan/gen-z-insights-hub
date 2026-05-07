import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import styles from "./index.module.css";
import { Overview } from "@/components/overview/Overview";
import { WomensFashion } from "@/components/womens-fashion/WomensFashion";
import { AreaSection } from "@/components/area-section/AreaSection";
import { Methodology } from "@/components/methodology/Methodology";
import { DatasetsProvider } from "@/data/DatasetsContext";
import { LoginGate } from "@/components/login/LoginGate";
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

  return (
    <LoginGate>
    <DatasetsProvider>
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
                onClick={() => setActive(s.id)}
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
        <header className={styles.topbar} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className={styles.breadcrumb}>Netscribes × Shopsy POC</span>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem("shopsy_poc_auth");
              window.location.reload();
            }}
            style={{
              background: "transparent",
              border: "1px solid #E8EAF0",
              borderRadius: 6,
              padding: "6px 12px",
              fontSize: 12,
              fontWeight: 500,
              color: "#1A1A2E",
              cursor: "pointer",
            }}
          >
            Log out
          </button>
        </header>

        <main className={styles.content}>
          <div className={`${styles.section} ${styles.sectionFirst}`}>
            {active === "overview" && <Overview onNavigate={(id) => setActive(id)} />}
            {active === "womens-fashion" && <WomensFashion />}
            {active === "k-beauty" && (
              <AreaSection
                areaId="A2"
                title="K-Beauty & Skincare Routines"
                callout="34% of Indian Gen Z actively exploring Korean skincare — YouGov/GCI Magazine 2025"
              />
            )}
            {active === "creator-tools" && (
              <AreaSection
                areaId="A3"
                title="Creator Tools & Consumer Electronics"
                callout="Ring lights were Meesho's #1 electronics category search item H1 2024, driven entirely by Gen Z content creators — Meesho Smart Shopper Report"
                cardOverrides={{
                  "Ring Lights & Creator Accessories": {
                    cleanProductCount: 198,
                  },
                }}
              />
            )}
            {active === "sports-fitness" && (
              <AreaSection
                areaId="A4"
                title="Sports, Fitness & Athleisure"
                callout="1-in-3 Gen Z consumers allocates more than 20% of their income to fitness-related activities — Outlook Luxe / RedSeer 2026"
                showShopsyAdvantage
              />
            )}
            {active === "jewellery" && (
              <AreaSection
                areaId="A5"
                title="Jewellery & Accessories"
                callout="Artificial jewellery market growing at CAGR 11.4% (2025–29), driven by affordability and online access among younger consumers — IBEF 2025"
              />
            )}
            {active === "methodology" && (
              <>
                <h2 className={styles.sectionHeading}>Methodology</h2>
                <Methodology />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
    </DatasetsProvider>
    </LoginGate>
  );
}
