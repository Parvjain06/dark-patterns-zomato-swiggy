// Simulated dataset: 213 illustrative rows that follow the survey schema.
// Shown on the Dataset tab only. Real results are in analysis/analysis.ipynb.
const AGE_GROUPS = ["18-24", "25-34", "35-44", "45+"];
const GENDERS = ["Male", "Female", "Other"];
const INCOMES = ["Below ₹5000", "₹5000-₹10000", "₹10000-₹20000", "₹20000+"];
const APPS = ["Zomato", "Swiggy", "Both Equally"];

function seed(n) {
  let x = n;
  return () => { x = (x * 1103515245 + 12345) & 0x7fffffff; return x / 0x7fffffff; };
}
const rand = seed(42);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];

const DATASET = Array.from({ length: 213 }, (_, i) => {
  const ms = Math.max(0, Math.min(37, Math.round(18 + (rand() - 0.5) * 24)));
  const pi = Math.max(1, Math.min(5, Math.round(3 + (rand() - 0.5) * 3)));
  const budget = 200 + Math.round(rand() * 600);
  const extra = Math.max(0, Math.round(ms * 4.5 + (rand() - 0.5) * 150));
  const actual = budget + extra;
  const unplanned = ms > 15 && rand() > 0.35 ? 1 : (rand() > 0.8 ? 1 : 0);
  return {
    id: `R${String(i + 1).padStart(3, "0")}`,
    age_group: pick(AGE_GROUPS),
    gender: pick(GENDERS),
    income_level: pick(INCOMES),
    app_used: pick(APPS),
    manipulation_score: ms,
    extra_spend: extra,
    unplanned_items: unplanned,
    actual_spend: actual,
    intended_budget: budget,
    protection_intent: pi,
    belief_in_intent: Math.max(1, Math.min(5, Math.round(3 + (rand() - 0.5) * 3))),
  };
});

const DARK_PATTERNS = [
  { num: "01", icon: "⏱", name: "Fake Urgency Timers", desc: "\"Offer ends in 4:32\" — resets on reload", sev: "HIGH", w: 3 },
  { num: "02", icon: "₹", name: "Hidden Charges at Checkout", desc: "Packing, service, surge fees revealed late", sev: "HIGH", w: 3 },
  { num: "03", icon: "⊕", name: "Pre-added Items in Cart", desc: "Free desserts & add-ons auto-added", sev: "HIGH", w: 3 },
  { num: "04", icon: "⎋", name: "Hard to Cancel Subscriptions", desc: "Zomato Gold, Swiggy One retention mazes", sev: "MEDIUM", w: 2 },
  { num: "05", icon: "✕", name: "Guilt-tripping Decline Buttons", desc: "\"No, I don't want to save money\"", sev: "MEDIUM", w: 2 },
  { num: "06", icon: "→", name: "Misleading Free Delivery", desc: "Small print: requires minimum order", sev: "LOW", w: 1 },
];

// Distributions
function hist(values, bins) {
  const min = Math.min(...values), max = Math.max(...values);
  const w = (max - min) / bins;
  const counts = Array(bins).fill(0);
  for (const v of values) {
    const i = Math.min(bins - 1, Math.floor((v - min) / w));
    counts[i]++;
  }
  return counts.map((c, i) => ({ x0: min + i * w, x1: min + (i + 1) * w, c }));
}

const MS_HIST = hist(DATASET.map(d => d.manipulation_score), 12);
const SPEND_HIST = hist(DATASET.map(d => d.actual_spend), 12);
const APP_COUNTS = (() => {
  const m = {};
  DATASET.forEach(d => m[d.app_used] = (m[d.app_used] || 0) + 1);
  return m;
})();

const CLUSTERS = [
  { key: "easy", name: "Easy Target", tag: "HIGH RISK", ms: 21.62, pi: 3.29, ui: 1.00, extra: 220.79, n: 64, color: "var(--danger)" },
  { key: "aware", name: "Aware but Affected", tag: "MEDIUM RISK", ms: 20.17, pi: 3.86, ui: 0.00, extra: 121.44, n: 82, color: "var(--warn)" },
  { key: "immune", name: "Immune User", tag: "LOW RISK", ms: 10.20, pi: 2.53, ui: 0.04, extra: 130.51, n: 67, color: "var(--ok)" },
];

const ANOVA_GROUPS = [
  { name: "Low awareness", n: 42, mean: 97.50, color: "var(--danger)" },
  { name: "Medium awareness", n: 85, mean: 169.35, color: "var(--warn)" },
  { name: "High awareness", n: 86, mean: 203.73, color: "var(--ok)" },
];

// Regression scatter points
const SCATTER = DATASET.map(d => ({
  x: d.manipulation_score,
  y: d.unplanned_items + (Math.random() - 0.5) * 0.12, // jitter
}));

Object.assign(window, {
  DATASET, DARK_PATTERNS, MS_HIST, SPEND_HIST, APP_COUNTS, CLUSTERS, ANOVA_GROUPS, SCATTER,
  AGE_GROUPS, GENDERS, INCOMES, APPS,
});
