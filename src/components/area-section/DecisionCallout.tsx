import styles from "./DecisionCallout.module.css";

const ACTIONS: Record<string, string> = {
  A1: "Launch a dedicated Streetwear sub-section — Graphic Tees, Cargo Sets, Co-Ords, Y2K, and Anime wear. Target the ₹200–₹500 price zone where 65%+ of Meesho demand concentrates. Neither platform owns this section — first-mover window is open.",
  A2: "Create a dedicated K-Beauty & Skincare hub. Sheet Masks, Serums, and Skincare products are present on Shopsy but scattered across generic categories with no curated K-Beauty discovery surface. 34% of Indian Gen Z actively plan to explore Korean skincare (YouGov 2025). Neither platform has a dedicated K-Beauty section — first-mover window is open.",
  A3: "Create a dedicated Creator Tools section. Ring Lights, Microphones, and LED Lights are present on Shopsy but buried under Mobile Flashes and Decor Lighting — Gen Z content creators cannot find them. Ring lights were Meesho's #1 electronics item H1 2024. A dedicated Creator Tools surface is a first-mover opportunity on both platforms.",
  A4: "Shopsy leads coverage here — full subcategory presence including exclusive Yoga Mats, Cricket Equipment, and Skateboards that Meesho does not carry. Double down: promote Athleisure sets and Yoga Mats in the ₹200–₹500 zone. This is a defend-and-extend play, not a gap-close.",
  A5: "Close the Men's Jewellery gap — Shopsy has no dedicated section despite documented Gen Z demand for chains, bracelets, and ear studs. Simultaneously promote Oxidised Earrings and Layered Necklaces; 70%+ of Meesho demand is under ₹200, making these pure impulse buys.",
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
