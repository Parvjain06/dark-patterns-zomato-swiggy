const { useState, useEffect, useRef, useMemo } = React;

// ============ OVERVIEW ============
const Overview = () => (
  <div className="page">
    <div className="eyebrow">SSDI · Investigation #01 · April 2026</div>
    <h1 className="headline">Are Zomato & Swiggy <em>manipulating</em> you into spending more?</h1>
    <p className="kicker">
      We surveyed 219 users of India's two largest food-delivery apps to measure six deceptive
      UX patterns and their effect on real spending. This is the evidence.
    </p>

    <div className="byline">
      <span><strong>219</strong> respondents</span>
      <span className="byline-dot"/>
      <span>cleaned to <strong>213</strong> rows</span>
      <span className="byline-dot"/>
      <span>primary survey · Google Forms</span>
      <span className="byline-dot"/>
      <span>statistical tests · <strong>Pearson · Chi² · ANOVA · K-Means</strong></span>
    </div>

    <div className="bignums">
      <div className="bignum">
        <div className="bignum-label">Respondents</div>
        <div className="bignum-v">219</div>
        <div className="bignum-note">→ 213 after cleaning</div>
      </div>
      <div className="bignum">
        <div className="bignum-label">Avg. Overspend</div>
        <div className="bignum-v">₹169</div>
        <div className="bignum-note">per order, above intended budget</div>
      </div>
      <div className="bignum">
        <div className="bignum-label">Correlation (r)</div>
        <div className="bignum-v">0.38</div>
        <div className="bignum-note">p &lt; 0.001 · significant</div>
      </div>
      <div className="bignum">
        <div className="bignum-label">Patterns Studied</div>
        <div className="bignum-v">6</div>
        <div className="bignum-note">3 HIGH · 2 MED · 1 LOW severity</div>
      </div>
    </div>

    <hr className="hr-heavy"/>

    <div className="cols-2">
      <div>
        <div className="eyebrow">The specimens</div>
        <h2 className="section-title">Six dark patterns, ranked</h2>
        <p className="section-sub">Each pattern is weighted by severity when computing the manipulation score.</p>
        <div className="pattern-list">
          {DARK_PATTERNS.map(p => (
            <div key={p.num} className="pattern-row">
              <div className="pattern-num">{p.num}</div>
              <div>
                <div className="pattern-name">{p.icon} &nbsp; {p.name}</div>
                <div className="pattern-desc">{p.desc}</div>
              </div>
              <div className={`sev ${p.sev === "HIGH" ? "high" : p.sev === "MEDIUM" ? "med" : "low"}`}>
                {p.sev} · ×{p.w}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="eyebrow">The paper</div>
        <h2 className="section-title">Project file</h2>
        <p className="section-sub">A student research project in Statistical Structures in Data & Inference.</p>
        <div className="meta-list">
          <div className="meta-row"><div className="meta-k">Subject</div><div className="meta-v">SSDI — Statistical Structures in Data & Inference</div></div>
          <div className="meta-row"><div className="meta-k">Data source</div><div className="meta-v">Primary Google Form survey, 219 responses</div></div>
          <div className="meta-row"><div className="meta-k">Sample</div><div className="meta-v">213 rows post-cleaning</div></div>
          <div className="meta-row"><div className="meta-k">Tests</div><div className="meta-v">Pearson · Chi-Square · ANOVA</div></div>
          <div className="meta-row"><div className="meta-k">Models</div><div className="meta-v">Linear Regression · Logistic Regression · K-Means</div></div>
          <div className="meta-row"><div className="meta-k">Headline</div><div className="meta-v"><strong>r = 0.38, p &lt; 0.001</strong> — manipulation drives unplanned purchase</div></div>
        </div>

        <h3 className="card-title" style={{marginTop: 28}}>The score formula</h3>
        <div className="formula">
          <span className="coef">Score</span> &nbsp;=&nbsp; (P₁ × <span className="coef">3</span>) + (P₂ × <span className="coef">3</span>) + (P₃ × <span className="coef">3</span>)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + (P₄ × <span className="coef">2</span>) + (P₅ × <span className="coef">2</span>) + (P₆ × <span className="coef">1</span>)
        </div>
        <div className="chip">range 0–42</div>{" "}
        <div className="chip">observed 0–37</div>
      </div>
    </div>
  </div>
);

// ============ DATASET ============
const Dataset = () => {
  const [q, setQ] = useState("");
  const [appFilter, setAppFilter] = useState("all");
  const rows = DATASET.filter(d =>
    (appFilter === "all" || d.app_used === appFilter) &&
    (q === "" || d.id.toLowerCase().includes(q.toLowerCase()) || d.app_used.toLowerCase().includes(q.toLowerCase()))
  ).slice(0, 20);

  const meanMs = (DATASET.reduce((a, b) => a + b.manipulation_score, 0) / DATASET.length).toFixed(2);
  const meanSpend = Math.round(DATASET.reduce((a, b) => a + b.actual_spend, 0) / DATASET.length);

  return (
    <div className="page">
      <div className="eyebrow">Section 02</div>
      <h1 className="headline">The <em>evidence</em>.</h1>
      <p className="kicker">213 respondents, 12 variables. Note: the sample rows and charts on this tab are simulated to match the survey's structure, to protect respondent privacy. The statistical results under Findings come from the real responses.</p>

      <div className="byline">
        <span><strong>{DATASET.length}</strong> rows</span>
        <span className="byline-dot"/>
        <span><strong>12</strong> variables</span>
        <span className="byline-dot"/>
        <span>mean manipulation score <strong>{meanMs}</strong></span>
        <span className="byline-dot"/>
        <span>mean actual spend <strong>₹{meanSpend}</strong></span>
      </div>

      <div className="cols-2" style={{marginTop: 24}}>
        <div className="card boxed">
          <div className="card-title">Manipulation Score</div>
          <div className="card-sub">Distribution across 213 respondents · theoretical range 0–42</div>
          <Histogram data={MS_HIST} color="var(--accent)" xlabel="score"/>
        </div>
        <div className="card boxed">
          <div className="card-title">Actual Spend (₹)</div>
          <div className="card-sub">Per order · right-tailed</div>
          <Histogram data={SPEND_HIST} color="var(--danger)" xlabel="₹ per order"/>
        </div>
      </div>

      <hr className="hr-heavy"/>

      <div className="cols-2">
        <div>
          <h2 className="section-title">App usage breakdown</h2>
          <p className="section-sub">Which app do respondents use most?</p>
          <AppBreakdown/>
        </div>
        <div>
          <h2 className="section-title">Descriptive statistics</h2>
          <p className="section-sub">Summary across the six quantitative variables.</p>
          <div className="datatable">
            <table>
              <thead>
                <tr>
                  <th>Variable</th>
                  <th className="td-num">Mean</th>
                  <th className="td-num">SD</th>
                  <th className="td-num">Min</th>
                  <th className="td-num">Max</th>
                </tr>
              </thead>
              <tbody>
                <DescRow k="manipulation_score" dp={2}/>
                <DescRow k="extra_spend" prefix="₹" dp={0}/>
                <DescRow k="actual_spend" prefix="₹" dp={0}/>
                <DescRow k="intended_budget" prefix="₹" dp={0}/>
                <DescRow k="protection_intent" dp={2}/>
                <DescRow k="belief_in_intent" dp={2}/>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <hr className="hr-heavy"/>

      <h2 className="section-title">Raw preview</h2>
      <p className="section-sub">First 20 rows. Filter or search to narrow.</p>

      <div style={{display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center"}}>
        <input
          className="pill" style={{minWidth: 220, padding: "8px 14px"}}
          placeholder="Search id or app…" value={q} onChange={e => setQ(e.target.value)}
        />
        <div className="pill-group">
          {["all", "Zomato", "Swiggy", "Both Equally"].map(a => (
            <button key={a} className={`pill ${appFilter === a ? "active" : ""}`} onClick={() => setAppFilter(a)}>{a}</button>
          ))}
        </div>
      </div>

      <div className="datatable">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Age</th><th>Gender</th><th>Income</th><th>App</th>
              <th className="td-num">Score</th><th className="td-num">Extra ₹</th><th className="td-num">Unplanned</th>
              <th className="td-num">Actual ₹</th><th className="td-num">Budget ₹</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.age_group}</td><td>{r.gender}</td><td>{r.income_level}</td><td>{r.app_used}</td>
                <td className="td-num">{r.manipulation_score}</td>
                <td className="td-num">{r.extra_spend}</td>
                <td className="td-num">{r.unplanned_items}</td>
                <td className="td-num">{r.actual_spend}</td>
                <td className="td-num">{r.intended_budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DescRow = ({ k, prefix = "", dp = 2 }) => {
  const vals = DATASET.map(d => d[k]);
  const mean = vals.reduce((a, b) => a + b, 0) / vals.length;
  const sd = Math.sqrt(vals.reduce((a, b) => a + (b - mean) ** 2, 0) / vals.length);
  return (
    <tr>
      <td>{k}</td>
      <td className="td-num">{prefix}{mean.toFixed(dp)}</td>
      <td className="td-num">{sd.toFixed(2)}</td>
      <td className="td-num">{prefix}{Math.min(...vals).toFixed(dp)}</td>
      <td className="td-num">{prefix}{Math.max(...vals).toFixed(dp)}</td>
    </tr>
  );
};

const Histogram = ({ data, color, xlabel }) => {
  const w = 560, h = 200, padL = 32, padB = 28, padT = 12, padR = 8;
  const maxC = Math.max(...data.map(d => d.c));
  const barW = (w - padL - padR) / data.length;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart" preserveAspectRatio="xMidYMid meet">
      {/* gridlines */}
      <g className="chart-grid">
        {[0.25, 0.5, 0.75, 1].map(t => (
          <line key={t} x1={padL} x2={w-padR} y1={padT + (1-t)*(h-padT-padB)} y2={padT + (1-t)*(h-padT-padB)}/>
        ))}
      </g>
      {/* bars */}
      {data.map((d, i) => {
        const hb = (d.c / maxC) * (h - padT - padB);
        return (
          <g key={i}>
            <rect
              x={padL + i * barW + 1}
              y={h - padB - hb}
              width={barW - 2}
              height={hb}
              fill={color}
              opacity="0.85"
            />
          </g>
        );
      })}
      {/* axes */}
      <g className="chart-axis">
        <text x={padL} y={h - 8}>{Math.round(data[0].x0)}</text>
        <text x={w - padR} y={h - 8} textAnchor="end">{Math.round(data[data.length-1].x1)}</text>
        <text x={(padL + w - padR)/2} y={h - 2} textAnchor="middle" style={{fontSize: 9, fill: "var(--muted)"}}>{xlabel}</text>
        <text x={padL - 6} y={padT + 4} textAnchor="end">{maxC}</text>
        <text x={padL - 6} y={h - padB} textAnchor="end">0</text>
      </g>
    </svg>
  );
};

const AppBreakdown = () => {
  const total = Object.values(APP_COUNTS).reduce((a, b) => a + b, 0);
  const colors = { "Zomato": "var(--danger)", "Swiggy": "var(--warn)", "Both Equally": "var(--accent)" };
  return (
    <div className="card boxed">
      {Object.entries(APP_COUNTS).map(([k, v]) => {
        const pct = (v / total) * 100;
        return (
          <div key={k} style={{marginBottom: 18}}>
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13}}>
              <span style={{fontWeight: 500}}>{k}</span>
              <span className="mono">{v} · {pct.toFixed(1)}%</span>
            </div>
            <div style={{height: 24, background: "var(--bg-sub)", border: "var(--rule-thin)", position: "relative"}}>
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0,
                width: `${pct}%`, background: colors[k],
              }}/>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Object.assign(window, { Overview, Dataset });
