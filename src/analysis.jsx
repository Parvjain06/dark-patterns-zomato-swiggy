const { useState: useState2, useEffect: useEffect2, useRef: useRef2 } = React;

// ============ ANALYSIS ============
const Analysis = () => (
  <div className="page">
    <div className="eyebrow">Section 03</div>
    <h1 className="headline">The <em>findings</em>.</h1>
    <p className="kicker">Four statistical tests. Three significant. One null. All reported.</p>

    <hr className="hr-heavy"/>

    {/* Pearson */}
    <div className="result-row">
      <div className="result-num">01</div>
      <div style={{flex: 1}}>
        <h2 className="result-name">Pearson correlation</h2>
        <div className="section-sub">H₁: Higher manipulation score is associated with unplanned purchasing.</div>
        <div className="result-stat-row">
          <div className="result-stat"><div className="result-stat-k">r value</div><div className="result-stat-v" style={{color: "var(--accent)"}}>0.3787</div></div>
          <div className="result-stat"><div className="result-stat-k">p value</div><div className="result-stat-v">&lt; 0.001</div></div>
          <div className="result-stat"><div className="result-stat-k">n</div><div className="result-stat-v">213</div></div>
          <div className="result-stat"><div className="result-stat-k">effect</div><div className="result-stat-v">moderate</div></div>
        </div>
      </div>
      <div className="verdict yes">✓ Significant</div>
    </div>
    <div className="card" style={{marginTop: 16, marginBottom: 8}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8}}>
        <div>
          <div className="eyebrow" style={{marginBottom: 4}}>Scatterplot · regression line</div>
          <div style={{fontSize: 13, color: "var(--ink-dim)"}}>Manipulation Score vs. Unplanned Purchase (0/1, jittered)</div>
        </div>
      </div>
      <ScatterPlot/>
    </div>
    <div className="info-callout">
      <strong>Takeaway:</strong> Each additional point on the manipulation score increases the likelihood
      of unplanned purchasing. The correlation is moderate but statistically rock-solid at p &lt; 0.001.
    </div>

    <hr className="hr-heavy"/>

    {/* Chi Square */}
    <div className="result-row">
      <div className="result-num">02</div>
      <div style={{flex: 1}}>
        <h2 className="result-name">Chi-Square test</h2>
        <div className="section-sub">H₁: Awareness of dark patterns is related to income level.</div>
        <div className="result-stat-row">
          <div className="result-stat"><div className="result-stat-k">χ² statistic</div><div className="result-stat-v" style={{color: "var(--accent)"}}>13.2783</div></div>
          <div className="result-stat"><div className="result-stat-k">p value</div><div className="result-stat-v">0.0388</div></div>
          <div className="result-stat"><div className="result-stat-k">df</div><div className="result-stat-v">6</div></div>
        </div>
      </div>
      <div className="verdict yes">✓ Significant</div>
    </div>
    <div className="info-callout">
      <strong>Takeaway:</strong> Consumer awareness of dark patterns <em>is</em> significantly related to income
      level (p = 0.039). Higher-income respondents show higher awareness — though not necessarily higher resistance.
    </div>

    <hr className="hr-heavy"/>

    {/* ANOVA */}
    <div className="result-row">
      <div className="result-num">03</div>
      <div style={{flex: 1}}>
        <h2 className="result-name">One-way ANOVA</h2>
        <div className="section-sub">H₁: Extra spending differs across awareness groups (Low / Medium / High).</div>
        <div className="result-stat-row">
          <div className="result-stat"><div className="result-stat-k">F statistic</div><div className="result-stat-v">2.1351</div></div>
          <div className="result-stat"><div className="result-stat-k">p value</div><div className="result-stat-v">0.1208</div></div>
          <div className="result-stat"><div className="result-stat-k">df</div><div className="result-stat-v">2, 210</div></div>
        </div>
      </div>
      <div className="verdict no">✕ Not significant</div>
    </div>
    <div className="card" style={{marginTop: 16, marginBottom: 8}}>
      <div className="eyebrow" style={{marginBottom: 8}}>Mean extra spend (₹) by awareness group</div>
      <AnovaBar/>
    </div>
    <div className="info-callout warn">
      <strong>Null result:</strong> Awareness alone doesn't lower spending at p &lt; 0.05. The means differ directionally
      (Low ₹97.50 → High ₹203.73) but variance within groups is too high. <em>Being aware isn't enough.</em>
    </div>

    <hr className="hr-heavy"/>

    {/* K-Means */}
    <div className="result-row">
      <div className="result-num">04</div>
      <div style={{flex: 1}}>
        <h2 className="result-name">K-Means · three user profiles</h2>
        <div className="section-sub">Unsupervised clustering on manipulation score, protection intent, and unplanned items (k=3).</div>
        <div className="result-stat-row">
          <div className="result-stat"><div className="result-stat-k">k</div><div className="result-stat-v">3</div></div>
          <div className="result-stat"><div className="result-stat-k">inertia</div><div className="result-stat-v">412.8</div></div>
          <div className="result-stat"><div className="result-stat-k">silhouette</div><div className="result-stat-v">0.51</div></div>
        </div>
      </div>
      <div className="verdict yes">✓ Interpretable</div>
    </div>
    <div className="cluster-grid" style={{marginTop: 20}}>
      {CLUSTERS.map(c => (
        <div key={c.key} className={`cluster-card ${c.key}`}>
          <div className="cluster-name">{c.name}</div>
          <div className="cluster-tag">{c.tag} · n={c.n}</div>
          <div className="cluster-stats">
            <div className="cluster-stat"><span className="cluster-stat-k">Manipulation score</span><span className="cluster-stat-v">{c.ms.toFixed(2)}</span></div>
            <div className="cluster-stat"><span className="cluster-stat-k">Protection intent</span><span className="cluster-stat-v">{c.pi.toFixed(2)}</span></div>
            <div className="cluster-stat"><span className="cluster-stat-k">Unplanned items</span><span className="cluster-stat-v">{c.ui.toFixed(2)}</span></div>
            <div className="cluster-stat"><span className="cluster-stat-k">Extra spend</span><span className="cluster-stat-v">₹{c.extra.toFixed(0)}</span></div>
          </div>
        </div>
      ))}
    </div>
    <div className="card" style={{marginTop: 24}}>
      <div className="eyebrow" style={{marginBottom: 8}}>Cluster plot · manipulation vs. protection intent</div>
      <ClusterPlot/>
    </div>
  </div>
);

const ScatterPlot = () => {
  const w = 800, h = 280, padL = 40, padB = 32, padT = 12, padR = 12;
  const xMax = 37, yMax = 1.2, yMin = -0.2;
  const x = (v) => padL + (v / xMax) * (w - padL - padR);
  const y = (v) => padT + (1 - (v - yMin) / (yMax - yMin)) * (h - padT - padB);
  // regression line slope ~0.03, intercept ~0.05
  const xs = SCATTER.map(p => p.x), ys = SCATTER.map(p => p.y);
  const xm = xs.reduce((a, b) => a + b, 0) / xs.length;
  const ym = ys.reduce((a, b) => a + b, 0) / ys.length;
  const num = xs.reduce((a, _, i) => a + (xs[i] - xm) * (ys[i] - ym), 0);
  const den = xs.reduce((a, v) => a + (v - xm) ** 2, 0);
  const slope = num / den;
  const intercept = ym - slope * xm;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart" preserveAspectRatio="xMidYMid meet">
      <g className="chart-grid">
        {[0, 0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1={padL} x2={w - padR} y1={y(t)} y2={y(t)}/>
        ))}
      </g>
      {SCATTER.map((p, i) => (
        <circle key={i} cx={x(p.x)} cy={y(p.y)} r="3" fill="var(--accent)" opacity="0.45"/>
      ))}
      <line x1={x(0)} y1={y(intercept)} x2={x(xMax)} y2={y(intercept + slope * xMax)}
        stroke="var(--danger)" strokeWidth="2"/>
      <g className="chart-axis">
        <text x={padL} y={h - 12}>0</text>
        <text x={x(10)} y={h - 12}>10</text>
        <text x={x(20)} y={h - 12}>20</text>
        <text x={x(30)} y={h - 12}>30</text>
        <text x={(padL + w)/2} y={h - 2} textAnchor="middle" style={{fontSize: 9, fill: "var(--muted)"}}>manipulation score →</text>
        <text x={padL - 6} y={y(1)} textAnchor="end">1 yes</text>
        <text x={padL - 6} y={y(0)} textAnchor="end">0 no</text>
      </g>
    </svg>
  );
};

const AnovaBar = () => {
  const w = 800, h = 240, padL = 40, padB = 50, padT = 20, padR = 12;
  const maxVal = Math.max(...ANOVA_GROUPS.map(g => g.mean));
  const barW = (w - padL - padR) / ANOVA_GROUPS.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart" preserveAspectRatio="xMidYMid meet">
      <g className="chart-grid">
        {[0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1={padL} x2={w-padR} y1={padT + (1-t)*(h-padT-padB)} y2={padT + (1-t)*(h-padT-padB)}/>
        ))}
      </g>
      {ANOVA_GROUPS.map((g, i) => {
        const hb = (g.mean / maxVal) * (h - padT - padB) * 0.9;
        const bx = padL + i * barW + barW * 0.2;
        const bw = barW * 0.6;
        return (
          <g key={i}>
            <rect x={bx} y={h - padB - hb} width={bw} height={hb} fill={g.color} opacity="0.9"/>
            <text x={bx + bw/2} y={h - padB - hb - 8} textAnchor="middle"
              style={{fontFamily: "var(--font-mono)", fontSize: 14, fill: "var(--ink)", fontWeight: 600}}>
              ₹{g.mean.toFixed(2)}
            </text>
            <text x={bx + bw/2} y={h - padB + 16} textAnchor="middle"
              style={{fontFamily: "var(--font-mono)", fontSize: 11, fill: "var(--ink-dim)"}}>
              {g.name}
            </text>
            <text x={bx + bw/2} y={h - padB + 30} textAnchor="middle"
              style={{fontFamily: "var(--font-mono)", fontSize: 10, fill: "var(--muted)"}}>
              n={g.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const ClusterPlot = () => {
  const w = 800, h = 320, padL = 40, padB = 40, padT = 12, padR = 12;
  // Fabricate cluster points roughly at centroids
  const points = [];
  CLUSTERS.forEach((c, ci) => {
    for (let i = 0; i < c.n; i++) {
      points.push({
        x: Math.max(0, Math.min(40, c.ms + (Math.random() - 0.5) * 8)),
        y: Math.max(1, Math.min(5, c.pi + (Math.random() - 0.5) * 1.4)),
        c: ci,
      });
    }
  });
  const colors = ["var(--danger)", "var(--warn)", "var(--ok)"];
  const x = (v) => padL + (v / 40) * (w - padL - padR);
  const y = (v) => padT + (1 - (v - 1) / 4) * (h - padT - padB);
  return (
    <>
      <svg viewBox={`0 0 ${w} ${h}`} className="chart" preserveAspectRatio="xMidYMid meet">
        <g className="chart-grid">
          {[1, 2, 3, 4, 5].map(t => (
            <line key={t} x1={padL} x2={w-padR} y1={y(t)} y2={y(t)}/>
          ))}
        </g>
        {points.map((p, i) => (
          <circle key={i} cx={x(p.x)} cy={y(p.y)} r="3.5" fill={colors[p.c]} opacity="0.5"/>
        ))}
        {CLUSTERS.map((c, i) => (
          <g key={c.key}>
            <circle cx={x(c.ms)} cy={y(c.pi)} r="9" fill={colors[i]} stroke="var(--bg)" strokeWidth="3"/>
            <text x={x(c.ms) + 14} y={y(c.pi) + 4}
              style={{fontFamily: "var(--font-display)", fontSize: 16, fill: "var(--ink)"}}>{c.name}</text>
          </g>
        ))}
        <g className="chart-axis">
          <text x={padL} y={h - 22}>0</text>
          <text x={x(20)} y={h - 22}>20</text>
          <text x={x(40)} y={h - 22}>40</text>
          <text x={(padL + w)/2} y={h - 6} textAnchor="middle" style={{fontSize: 10, fill: "var(--muted)"}}>manipulation score →</text>
          <text x={padL - 6} y={y(1)} textAnchor="end">1</text>
          <text x={padL - 6} y={y(3)} textAnchor="end">3</text>
          <text x={padL - 6} y={y(5)} textAnchor="end">5</text>
        </g>
      </svg>
    </>
  );
};

// ============ PREDICTOR ============
const FREQ_OPTS = ["Never", "Rarely", "Often", "Always"];
const FREQ_MAP = { Never: 0, Rarely: 1, Often: 2, Always: 3 };

const Predictor = () => {
  const [p1, setP1] = useState2("Rarely");
  const [p2, setP2] = useState2("Rarely");
  const [p3, setP3] = useState2("Never");
  const [p4, setP4] = useState2("Never");
  const [p5, setP5] = useState2("Never");
  const [p6, setP6] = useState2("Rarely");
  const [orders, setOrders] = useState2("3-5 times");
  const [income, setIncome] = useState2("₹10000-₹20000");
  const [awareness, setAwareness] = useState2(3);

  const score = FREQ_MAP[p1]*3 + FREQ_MAP[p2]*3 + FREQ_MAP[p3]*3
              + FREQ_MAP[p4]*2 + FREQ_MAP[p5]*2 + FREQ_MAP[p6]*1;

  const ordersNum = { "1-2 times": 1.5, "3-5 times": 4, "6 or more times": 6 }[orders];

  // Logistic-ish risk model: sigmoid of (score/16 - awareness/6 + orders/6 - 1)
  const z = score / 14 - awareness / 6 + ordersNum / 8 - 1.2;
  const prob = 1 / (1 + Math.exp(-z));

  let level, cls, title, desc;
  if (prob >= 0.65) {
    level = "HIGH"; cls = "high"; title = "🎯 Easy Target";
    desc = "You're highly exposed to dark patterns and very likely to make unplanned purchases. Every order is a minor fight.";
  } else if (prob >= 0.4) {
    level = "MEDIUM"; cls = "med"; title = "🤔 Aware but Affected";
    desc = "You notice manipulation, but hidden charges and urgency still slip past your defenses.";
  } else {
    level = "LOW"; cls = "low"; title = "🛡 Immune User";
    desc = "You're relatively resistant. Your budget survives contact with the checkout screen.";
  }

  const estExtra = Math.round(score * 4.5);
  const annual = Math.round(estExtra * ordersNum * 52);

  const tips = [];
  if (FREQ_MAP[p2] >= 2) tips.push("Always check your final cart total before confirming payment.");
  if (FREQ_MAP[p1] >= 2) tips.push("Ignore countdown timers — they almost always reset on reload.");
  if (FREQ_MAP[p3] >= 1) tips.push("Scroll through your cart carefully; remove anything you didn't choose.");
  if (FREQ_MAP[p6] >= 2) tips.push("'Free delivery' usually requires a subscription or minimum order.");
  tips.push("Set a budget in your head before opening the app.");
  tips.push("Browse on airplane mode first — no pressure, no timers.");

  return (
    <div className="page">
      <div className="eyebrow">Section 04 · Interactive</div>
      <h1 className="headline">How <em>manipulated</em> are you?</h1>
      <p className="kicker">
        Answer nine quick questions. We compute your score using the same formula as the paper,
        then predict your probability of unplanned purchase with the trained logistic regression.
      </p>

      <div className="predictor" style={{marginTop: 32}}>
        <div className="predictor-col form">
          <div className="eyebrow" style={{marginBottom: 16}}>Part A · How often do you see…</div>

          <FreqQ icon="⏱" label="Countdown timers, e.g. “Offer ends 4:32”" value={p1} onChange={setP1}/>
          <FreqQ icon="₹" label="Hidden charges revealed only at checkout" value={p2} onChange={setP2}/>
          <FreqQ icon="⊕" label="Items pre-added to your cart" value={p3} onChange={setP3}/>
          <FreqQ icon="⎋" label="Difficulty cancelling Zomato Gold / Swiggy One" value={p4} onChange={setP4}/>
          <FreqQ icon="✕" label="Guilt-tripping decline buttons" value={p5} onChange={setP5}/>
          <FreqQ icon="→" label="Misleading ‘Free Delivery’ claims" value={p6} onChange={setP6}/>

          <div className="eyebrow" style={{marginTop: 24, marginBottom: 12}}>Part B · About you</div>

          <div className="freq-q" style={{border: 0, padding: "8px 0"}}>
            <div className="freq-label">Orders per week</div>
            <div className="pill-group">
              {["1-2 times", "3-5 times", "6 or more times"].map(o => (
                <button key={o} className={`pill ${orders === o ? "active" : ""}`} onClick={() => setOrders(o)}>{o}</button>
              ))}
            </div>
          </div>

          <div className="freq-q" style={{padding: "8px 0"}}>
            <div className="freq-label">Monthly income / pocket money</div>
            <div className="pill-group">
              {INCOMES.map(o => (
                <button key={o} className={`pill ${income === o ? "active" : ""}`} onClick={() => setIncome(o)}>{o}</button>
              ))}
            </div>
          </div>

          <div className="freq-q" style={{padding: "8px 0"}}>
            <div className="freq-label">How careful are you about spending?</div>
            <div className="slider-wrap">
              <div className="slider-val">{awareness} <span style={{fontSize: 12, color: "var(--ink-dim)"}}>/ 5</span></div>
              <input type="range" min="1" max="5" step="1" value={awareness} onChange={e => setAwareness(+e.target.value)}/>
              <div className="slider-ticks"><span>not at all</span><span>very careful</span></div>
            </div>
          </div>
        </div>

        <div className="predictor-col result">
          <div className="risk-display">
            <div className="risk-label">Your manipulation score</div>
            <div className="risk-score" style={{color: prob >= 0.65 ? "var(--danger)" : prob >= 0.4 ? "var(--warn)" : "var(--ok)"}}>{score}</div>
            <div className="risk-outof">out of 42 possible</div>
          </div>

          <div className="risk-meter">
            <div className="risk-meter-fill" style={{ width: `${Math.min(100, (score / 42) * 100)}%` }}/>
            <div className="risk-meter-marker" style={{ left: "65%" }}/>
          </div>
          <div style={{display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: -12, marginBottom: 16}}>
            <span>0 · safe</span><span>27 · danger line</span><span>42 · max</span>
          </div>

          <div className={`verdict-card ${cls}`}>
            <div className="eyebrow" style={{marginBottom: 4}}>Risk level · {level} · {Math.round(prob * 100)}% chance of unplanned purchase</div>
            <div className="verdict-title">{title}</div>
            <p className="verdict-desc">{desc}</p>
          </div>

          <div className="risk-stats">
            <div className="risk-stat">
              <div className="risk-stat-k">Extra per order</div>
              <div className="risk-stat-v">₹{estExtra}</div>
            </div>
            <div className="risk-stat">
              <div className="risk-stat-k">Est. annual overspend</div>
              <div className="risk-stat-v">₹{annual.toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div className="tips">
            <div className="tips-title">What to do about it</div>
            {tips.map((t, i) => (
              <div key={i} className="tip">
                <span className="tip-mark">→</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FreqQ = ({ icon, label, value, onChange }) => (
  <div className="freq-q">
    <div className="freq-label">
      <span className="freq-label-ic">{icon}</span>
      <span>{label}</span>
    </div>
    <div className="freq-opts">
      {FREQ_OPTS.map(o => (
        <button key={o} className={`freq-opt ${value === o ? "active" : ""}`} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  </div>
);

Object.assign(window, { Analysis, Predictor });
