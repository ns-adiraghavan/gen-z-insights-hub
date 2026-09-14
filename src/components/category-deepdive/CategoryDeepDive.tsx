import { useState } from "react";
import { Link } from "@tanstack/react-router";
import netscribesLogo from "@/assets/netscribes-logo.png";
import styles from "./CategoryDeepDive.module.css";
import {
  CATEGORY,
  instrument,
  highlightQuestions,
  fullQuestionnaire,
  questionnaireStats,
  targetingRows,
  scrapeSummary,
  rawRows,
  pipeline,
  subcatReads,
  comparisonRows,
  missingReads,
  categoryKPIs,
  rankedActions,
  crossCategoryNote,
  type SampleQuestion,
  type SubcatRead,
  type FQSection,
} from "./sampleData";

function demandClass(d: string) {
  if (d === "Very High") return styles.dVeryHigh;
  if (d === "High") return styles.dHigh;
  return styles.dMedium;
}
function positionClass(p: string) {
  if (p.startsWith("Gap")) return styles.posGap;
  if (p === "Competitive gap") return styles.posCompGap;
  if (p === "Competitor leads") return styles.posLeads;
  return styles.posImpulse;
}
function zoneClass(z: string) {
  if (z.startsWith("Impulse")) return styles.zImpulse;
  if (z.startsWith("Premium")) return styles.zPremium;
  return styles.zConsidered;
}
function positionDotClass(p: string) {
  if (p.startsWith("Gap")) return styles.mDotGap;
  if (p === "Competitive gap") return styles.mDotCompGap;
  if (p === "Impulse whitespace") return styles.mDotImpulse;
  return styles.mDotLeads;
}
const ABBR: Record<string, string> = {
  "streetwear-tees": "ST", coords: "CO", denim: "DN", cargo: "CG",
  athleisure: "AT", footwear: "FW", slingbags: "SB", earrings: "ER",
};

function HighlightQuestion({ q }: { q: SampleQuestion }) {
  return (
    <div className={styles.qCard}>
      <div className={styles.qTop}>
        <span className={styles.qCode}>{q.code}</span>
        <span className={styles.qSection}>{q.section}</span>
        <span className={styles.qType}>{q.type}</span>
      </div>
      <div className={styles.qPrompt}>{q.prompt}</div>
      <div className={styles.gridScroll}>
        <table className={styles.qTable}>
          <thead>
            <tr>
              <th />
              {q.grid.columns.map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {q.grid.rows.map((r) => (
              <tr key={r}>
                <td>{r}</td>
                {q.grid.columns.map((c) => (
                  <td key={c} className={styles.cell}>
                    <span className={styles.box} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.qFeeds}>{q.feeds}</div>
    </div>
  );
}

function QuestionnaireSection({ s, open, onToggle }: { s: FQSection; open: boolean; onToggle: () => void }) {
  return (
    <div className={styles.accItem}>
      <button type="button" className={styles.accHead} onClick={onToggle} aria-expanded={open}>
        <span className={styles.accLetter}>{s.id}</span>
        <span className={styles.accTitle}>{s.title}</span>
        <span className={styles.accCount}>{s.questions.length} Q</span>
        <span className={`${styles.accChevron} ${open ? styles.accChevronOpen : ""}`}>›</span>
      </button>
      {open && (
        <div className={styles.accBody}>
          <div className={styles.accBlurb}>{s.blurb}</div>
          {s.questions.map((q) => (
            <div key={q.code} className={styles.fqRow}>
              <span className={styles.fqCode}>{q.code}</span>
              <div className={styles.fqMain}>
                <div className={styles.fqPromptLine}>
                  <span className={styles.fqPrompt}>{q.prompt}</span>
                  <span className={styles.fqType}>{q.type}</span>
                </div>
                {q.scale && <div className={styles.fqScale}>Scale · {q.scale}</div>}
                {q.options && (
                  <div className={styles.fqChips}>
                    {q.options.map((o) => (
                      <span key={o} className={styles.fqChip}>{o}</span>
                    ))}
                  </div>
                )}
                {q.rows && (
                  <div className={styles.fqRows}>
                    {q.rows.map((r) => (
                      <span key={r} className={styles.fqRowChip}>{r}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PriorityMatrix() {
  return (
    <div className={styles.matrixWrap}>
      <div className={styles.matrixYlabel}>Gen Z demand →</div>
      <div className={styles.matrixMain}>
        <div className={styles.matrixPlot}>
          <div className={styles.qLabelTL}>Compete to hold</div>
          <div className={styles.qLabelTR}>Back now</div>
          <div className={styles.qLabelBL}>Watch</div>
          <div className={styles.qLabelBR}>Quick wins</div>
          <div className={styles.matrixVline} />
          <div className={styles.matrixHline} />
          {subcatReads.map((s) => {
            const left = 13 + (s.mx / 3) * 66;
            const bottom = 14 + ((s.my - 1) / 2) * 64;
            return (
              <div
                key={s.id}
                className={`${styles.mDot} ${positionDotClass(s.position)}`}
                style={{ left: `${left}%`, bottom: `${bottom}%` }}
                title={`${s.name} — ${s.demand} demand · ${s.position}`}
              >
                <span className={styles.mDotAbbr}>{ABBR[s.id]}</span>
              </div>
            );
          })}
        </div>
        <div className={styles.matrixXlabel}>Competitive whitespace / ease to win →</div>
      </div>
      <div className={styles.matrixColorKey}>
        <span className={styles.mColorItem}><span className={`${styles.mColorDot} ${styles.mDotGap}`} /> First-mover gap</span>
        <span className={styles.mColorItem}><span className={`${styles.mColorDot} ${styles.mDotImpulse}`} /> Impulse whitespace</span>
        <span className={styles.mColorItem}><span className={`${styles.mColorDot} ${styles.mDotCompGap}`} /> Competitive gap</span>
        <span className={styles.mColorItem}><span className={`${styles.mColorDot} ${styles.mDotLeads}`} /> Competitor leads</span>
      </div>
      <div className={styles.matrixLegend}>
        {subcatReads
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .map((s) => (
            <span key={s.id} className={styles.mLegendItem}>
              <span className={styles.mLegendKey}>{ABBR[s.id]}</span> {s.name}
            </span>
          ))}
      </div>
    </div>
  );
}

function ReadCard({ s }: { s: SubcatRead }) {
  return (
    <div className={styles.readCard}>
      <div className={styles.readTop}>
        <div className={styles.readTitleWrap}>
          <span className={styles.readRank}>#{s.priority}</span>
          <h4 className={styles.readName}>{s.name}</h4>
        </div>
        <div className={styles.readBadges}>
          <span className={`${styles.tag} ${demandClass(s.demand)}`}>{s.demand} demand</span>
          <span className={`${styles.tag} ${positionClass(s.position)}`}>{s.position}</span>
        </div>
      </div>

      <div className={styles.priceLine}>
        <span className={styles.priceMedian}>
          Median <b>₹{s.median}</b>
        </span>
        <span className={styles.priceAvg}>Avg ₹{s.avg}</span>
        <span className={styles.momentum}>{s.momentum === "Rising" ? "▲ Rising" : "● Steady"}</span>
        <span className={styles.priceRange}>
          ₹{s.min}–₹{s.max}
        </span>
      </div>

      <div>
        <div className={styles.zoneLabel}>How the leading competitor prices it</div>
        <div className={styles.zoneBar}>
          {s.impulse > 0 && (
            <div className={styles.segImpulse} style={{ width: `${s.impulse}%` }}>
              {s.impulse >= 12 && <span className={styles.segLabel}>{s.impulse}%</span>}
            </div>
          )}
          {s.considered > 0 && (
            <div className={styles.segConsidered} style={{ width: `${s.considered}%` }}>
              {s.considered >= 12 && <span className={styles.segLabel}>{s.considered}%</span>}
            </div>
          )}
          {s.premium > 0 && (
            <div className={styles.segPremium} style={{ width: `${s.premium}%` }}>
              {s.premium >= 12 && <span className={styles.segLabel}>{s.premium}%</span>}
            </div>
          )}
        </div>
      </div>

      <div className={styles.assortRow}>
        <span>
          Depth <b>{s.listings.toLocaleString()}</b> listings
        </span>
        <span>
          Rating <b>{s.rating.toFixed(2)}</b>
        </span>
      </div>

      <div className={styles.layers}>
        <div className={styles.layer}>
          <span className={styles.layerLabel}>Leading competitor</span>
          <span className={styles.layerText}>{s.competitor}</span>
        </div>
        <div className={styles.layer}>
          <span className={styles.layerLabel}>Shopsy today</span>
          <span className={styles.layerText}>{s.shopsy}</span>
        </div>
        <div className={`${styles.layer} ${styles.layerMove}`}>
          <span className={styles.layerLabel}>The move</span>
          <span className={styles.layerText}>{s.move}</span>
        </div>
      </div>
    </div>
  );
}

export function CategoryDeepDive() {
  const [openSection, setOpenSection] = useState<string | null>("A");

  const logout = () => {
    sessionStorage.removeItem("shopsy_poc_auth");
    window.location.reload();
  };

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.topbarLeft}>
          <img src={netscribesLogo} alt="Netscribes" className={styles.logoImg} />
          <span className={styles.crumb}>
            Netscribes × Shopsy · <b>Category Deep-Dive — Sample Walkthrough</b>
          </span>
        </div>
        <div className={styles.topbarRight}>
          <Link to="/" className={styles.backLink}>
            ← POC dashboard
          </Link>
          <button type="button" className={styles.logout} onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <div className={styles.shell}>
        {/* HERO */}
        <div className={styles.hero}>
          <div className={styles.eyebrow}>Category Deep-Dive · Illustrative</div>
          <h1 className={styles.heroTitle}>From questionnaire to a category read</h1>
          <p className={styles.heroSub}>
            A sample of what the Category Deep-Dive framing produces for {CATEGORY} — how we ask
            Gen Z, how those answers tell us exactly what to scrape off the competitive shelf, and
            how the two combine into a positioned read and a ranked set of moves. Indicative only;
            built to show the shape of the output, not the finished study.
          </p>
          <span className={styles.sampleBadge}>
            <span className={styles.sampleDot} />
            Sample · demand indicative (survey not yet fielded) · price &amp; assortment from a live shelf scrape
          </span>
        </div>

        {/* FLOW RAIL */}
        <div className={styles.flow}>
          <div className={styles.flowStep}>
            <span className={styles.flowNum}>1</span>
            <span className={styles.flowLabel}>The questionnaire</span>
            <span className={styles.flowSub}>What we ask Gen Z</span>
          </div>
          <span className={styles.flowArrow}>→</span>
          <div className={styles.flowStep}>
            <span className={`${styles.flowNum} ${styles.flowNumB}`}>2</span>
            <span className={styles.flowLabel}>The targeted scrape</span>
            <span className={styles.flowSub}>Answers decide what we read</span>
          </div>
          <span className={styles.flowArrow}>→</span>
          <div className={styles.flowStep}>
            <span className={`${styles.flowNum} ${styles.flowNumC}`}>3</span>
            <span className={styles.flowLabel}>The category read</span>
            <span className={styles.flowSub}>Where to back, price &amp; drop</span>
          </div>
        </div>

        {/* ─── STAGE 1 ─── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={styles.stageTag}>STAGE 1</span>
            <h2 className={styles.sectionTitle}>What we ask Gen Z</h2>
          </div>
          <p className={styles.sectionLede}>
            A ~30-minute close-ended survey, fielded to 385 Gen Z shoppers in each of three cities.
            A few questions do the heavy lifting for the deep-dive — shown first — and the full
            instrument follows in {questionnaireStats.sections} sections.
          </p>

          <div className={styles.snapGrid}>
            <div className={styles.snapCell}>
              <div className={styles.snapLabel}>Respondent universe</div>
              <div className={styles.snapValue}>{instrument.universe}</div>
            </div>
            <div className={styles.snapCell}>
              <div className={styles.snapLabel}>Method</div>
              <div className={styles.snapValue}>{instrument.method}</div>
            </div>
            <div className={styles.snapCell}>
              <div className={styles.snapLabel}>Length</div>
              <div className={styles.snapValue}>{instrument.length}</div>
            </div>
            <div className={styles.snapCell}>
              <div className={styles.snapLabel}>Sample</div>
              <div className={styles.snapValue}>{instrument.sample}</div>
            </div>
            <div className={styles.snapCell}>
              <div className={styles.snapLabel}>Category in focus</div>
              <div className={styles.snapValue}>{instrument.category}</div>
            </div>
            <div className={styles.snapCell}>
              <div className={styles.snapLabel}>Emphasis</div>
              <div className={styles.snapValue}>{instrument.emphasis}</div>
            </div>
          </div>

          <div className={styles.subHead}>The three questions that build the read</div>
          <div className={styles.qGrid3}>
            {highlightQuestions.map((q) => (
              <HighlightQuestion key={q.code} q={q} />
            ))}
          </div>

          <div className={styles.subHead}>
            The full instrument
            <span className={styles.subHeadMeta}>
              {questionnaireStats.questions} questions · {questionnaireStats.sections} sections
            </span>
          </div>
          <div className={styles.acc}>
            {fullQuestionnaire.map((s) => (
              <QuestionnaireSection
                key={s.id}
                s={s}
                open={openSection === s.id}
                onToggle={() => setOpenSection(openSection === s.id ? null : s.id)}
              />
            ))}
          </div>
        </section>

        {/* ─── STAGE 2 ─── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={`${styles.stageTag} ${styles.stageTag2}`}>STAGE 2</span>
            <h2 className={styles.sectionTitle}>The answers decide what we scrape</h2>
          </div>
          <p className={styles.sectionLede}>
            We don&apos;t scrape everything — the survey tells us where to look. Interest ranks the
            sub-categories; the words Gen Z use become the search terms; their price expectations set
            the bands we validate. We then pull the competitive shelf for exactly those sub-categories.
          </p>

          <div className={styles.targetPanel}>
            <div className={styles.targetHeadRow}>
              <div className={styles.targetColHead}>
                <span className={styles.targetColTag}>FROM THE SURVEY</span>
                Demand &amp; the words Gen Z use
              </div>
              <div className={styles.targetColHead}>
                <span className={styles.targetColTag}>→ SO WE SCRAPE</span>
                Targeted search terms &amp; price band
              </div>
            </div>
            {targetingRows.map((t) => (
              <div key={t.subcat} className={`${styles.targetRow} ${!t.inSample ? styles.targetRowMuted : ""}`}>
                <div className={styles.targetLeft}>
                  <span className={styles.targetRank}>{t.rank}</span>
                  <div className={styles.targetSubcatWrap}>
                    <span className={styles.targetSubcat}>{t.subcat}</span>
                    <span className={styles.targetBarTrack}>
                      <span className={styles.targetBarFill} style={{ width: `${(t.interest / 5) * 100}%` }} />
                    </span>
                    <span className={styles.targetInterest}>{t.interest.toFixed(1)}/5</span>
                  </div>
                </div>
                <div className={styles.targetArrow}>→</div>
                <div className={styles.targetRight}>
                  <div className={styles.targetTerms}>
                    {t.productLanguage.map((p) => (
                      <span key={p} className={styles.targetTerm}>{p}</span>
                    ))}
                  </div>
                  <div className={styles.targetMeta}>
                    <span className={styles.targetBand}>{t.expectedBand}</span>
                    {t.inSample ? (
                      <span className={styles.targetScope}>{t.listings!.toLocaleString()} listings scraped</span>
                    ) : (
                      <span className={styles.targetDefer}>carried into the full study</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.targetFoot}>
              Top-ranked sub-categories are scraped for this sample; lower-ranked ones (ethnic,
              innerwear, winter) are read in the full study — the survey decides the order, not us.
            </div>
          </div>

          <div className={styles.twoCol}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>What comes back — a sample of the raw feed</h3>
                <span className={styles.panelMeta}>{scrapeSummary.source}</span>
              </div>
              <div className={styles.rawScroll}>
                <table className={styles.rawTable}>
                  <thead>
                    <tr>
                      <th>Listing</th>
                      <th>Sub-category</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th>Reviews</th>
                      <th>Cleaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rawRows.map((r, i) => (
                      <tr key={i} className={r.status === "drop" ? styles.rowDrop : ""}>
                        <td>{r.title}</td>
                        <td>{r.subcat}</td>
                        <td className={styles.mono}>₹{r.price}</td>
                        <td className={styles.mono}>{r.rating ?? "—"}</td>
                        <td className={styles.mono}>{r.reviews != null ? r.reviews.toLocaleString() : "—"}</td>
                        <td className={styles.keepPill}>
                          <span
                            className={`${styles.pill} ${
                              r.status === "clean" ? styles.pillClean : r.status === "flag" ? styles.pillFlag : styles.pillDrop
                            }`}
                          >
                            {r.statusNote}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>Raw → clean read</h3>
                <span className={styles.panelMeta}>per targeted sub-category</span>
              </div>
              <div className={styles.pipeCol}>
                {pipeline.map((p, i) => (
                  <div key={p.stage} className={styles.pipeRow}>
                    <span className={styles.pipeValue}>{p.value}</span>
                    <div className={styles.pipeTextWrap}>
                      <span className={styles.pipeStage}>{p.stage}</span>
                      <span className={styles.pipeDetail}>{p.detail}</span>
                    </div>
                    {i < pipeline.length - 1 && <span className={styles.pipeDown}>↓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── STAGE 3 ─── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className={`${styles.stageTag} ${styles.stageTag3}`}>STAGE 3</span>
            <h2 className={styles.sectionTitle}>The category read</h2>
          </div>
          <p className={styles.sectionLede}>
            Survey demand and shelf economics combine into one positioned read per sub-category —
            and a ranked set of moves. The point of the deep-dive is that the sub-categories
            don&apos;t look alike: demand, price zone and competitive position each move on their own.
          </p>

          <div className={styles.kpiRow}>
            {categoryKPIs.map((k) => (
              <div key={k.label} className={styles.kpi}>
                <div className={styles.kpiValue}>{k.value}</div>
                <div className={styles.kpiLabel}>{k.label}</div>
                <div className={styles.kpiSub}>{k.sub}</div>
              </div>
            ))}
          </div>

          <div className={styles.twoColWide}>
            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>Priority matrix — where to act first</h3>
                <span className={styles.panelMeta}>demand × whitespace</span>
              </div>
              <PriorityMatrix />
            </div>

            <div className={styles.panel}>
              <div className={styles.panelHead}>
                <h3 className={styles.panelTitle}>Recommended moves, ranked</h3>
                <span className={styles.panelMeta}>Now / Next</span>
              </div>
              <div className={styles.actions}>
                {rankedActions.map((a) => (
                  <div key={a.rank} className={styles.actionItem}>
                    <span className={styles.actionRank}>{a.rank}</span>
                    <div className={styles.actionBody}>
                      <div className={styles.actionTitleRow}>
                        <span className={styles.actionTitle}>{a.title}</span>
                        <span className={`${styles.hzTag} ${a.horizon === "Now" ? styles.hzNow : styles.hzNext}`}>{a.horizon}</span>
                        <span className={styles.effortTag}>{a.effort}</span>
                      </div>
                      <div className={styles.actionDetail}>{a.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.subHead}>Every sub-category, at a glance</div>
          <div className={styles.compScroll}>
            <table className={styles.compTable}>
              <thead>
                <tr>
                  <th>Sub-category</th>
                  <th>Gen Z demand</th>
                  <th>Dominant price zone</th>
                  <th>Median</th>
                  <th>Depth</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r) => (
                  <tr key={r.name}>
                    <td className={styles.compName}>{r.name}</td>
                    <td>
                      <span className={`${styles.tag} ${demandClass(r.demand)}`}>{r.demand}</span>
                    </td>
                    <td className={zoneClass(r.zone)}>{r.zone}</td>
                    <td className={styles.mono}>₹{r.median}</td>
                    <td className={styles.mono}>{r.depth.toLocaleString()}</td>
                    <td>
                      <span className={`${styles.tag} ${positionClass(r.position)}`}>{r.position}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.subHead}>The positioned read, sub-category by sub-category</div>
          <div className={styles.readGrid}>
            {subcatReads
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((s) => (
                <ReadCard key={s.id} s={s} />
              ))}
          </div>

          <div className={styles.subHead}>Also read in the full study</div>
          <div className={styles.coverGrid}>
            {missingReads.map((m) => (
              <div key={m.name} className={styles.coverCard}>
                <div className={styles.coverTop}>
                  <span className={styles.coverName}>{m.name}</span>
                  <span className={`${styles.tag} ${demandClass(m.demand)}`}>{m.demand}</span>
                </div>
                <div className={styles.coverNote}>{m.note}</div>
                <div className={styles.coverFlag}>Not scraped in this sample</div>
              </div>
            ))}
          </div>

          <div className={styles.crossNote}>
            <h3 className={styles.crossHead}>{crossCategoryNote.headline}</h3>
            <p className={styles.crossBody}>{crossCategoryNote.body}</p>
          </div>

          <div className={styles.footnote}>
            <b>How to read this page.</b> Price, spread, assortment depth and ratings are real,
            computed from a live product-level scrape of a leading value marketplace (the competitor
            is not named here). Gen Z demand and interest scores are indicative placeholders — the
            primary survey has not been fielded; in the live engagement each is read directly from
            1,155 Gen Z interviews. Price zones: impulse &lt;₹200 · considered ₹200–₹500 · premium ₹500+.
          </div>
        </section>
      </div>
    </div>
  );
}
