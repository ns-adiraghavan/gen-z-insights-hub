import styles from "./DecisionCallout.module.css";

const ACTIONS: Record<string, string> = {
  A1: "Launch a dedicated Streetwear sub-section — Graphic Tees, Cargo Sets, Co-Ords, Y2K, and Anime wear. Target the ₹200–₹500 price zone where 65%+ of Meesho demand concentrates. Neither platform owns this section — first-mover window is open.",
  A2: "Create a K-Beauty Hub featuring Sheet Masks, Serums, and Glass Skin Kits priced under ₹499. 34% of Indian Gen Z actively plan to explore Korean skincare (YouGov 2025). Shopsy has no dedicated section — Meesho does.",
  A3: "Add a Creator Tools section: Ring Lights, Mobile Tripods, Condenser Mics, Selfie Sticks. Ring lights were Meesho's #1 electronics item H1 2024. Shopsy lists none of these. First-mover window is open.",
  A4: "Shopsy leads coverage here — 100% subcategory presence vs Meesho's 73%. Double down: promote Athleisure sets and Yoga Mats in the ₹200–₹500 zone. This is a defend-and-extend play, not a gap-close.",
  A5: "Close the Men's Jewellery gap — Meesho has a dedicated section, Shopsy does not. Simultaneously promote Oxidised Earrings and Layered Necklaces; 70%+ of Meesho demand is under ₹200, making these pure impulse buys.",
};

export function DecisionCallout({ areaId }: { areaId: string }) {
  const text = ACTIONS[areaId];
  if (!text) return null;
  return (
    <div className={styles.callout}>
      <div className={styles.label}>RECOMMENDED ACTION</div>
      <div className={styles.text}>{text}</div>
    </div>
  );
}
