const { useState: useState3, useEffect: useEffect3 } = React;

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "dataset", label: "Dataset" },
  { id: "analysis", label: "Findings" },
  { id: "predictor", label: "Risk Predictor" },
];

const App = () => {
  const [tab, setTab] = useState3(() => localStorage.getItem("ssdi.tab") || "overview");
  const [tweaksOpen, setTweaksOpen] = useState3(false);

  const DEFAULTS = /*EDITMODE-BEGIN*/{
    "theme": "expose",
    "density": "standard"
  }/*EDITMODE-END*/;
  const [tweaks, setTweaks] = useState3(() => {
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem("ssdi.tweaks") || "{}") }; }
    catch { return DEFAULTS; }
  });

  useEffect3(() => { localStorage.setItem("ssdi.tab", tab); }, [tab]);
  useEffect3(() => {
    localStorage.setItem("ssdi.tweaks", JSON.stringify(tweaks));
    document.documentElement.dataset.theme = tweaks.theme;
  }, [tweaks]);

  useEffect3(() => {
    const onMsg = (e) => {
      if (e.data?.type === "__activate_edit_mode") setTweaksOpen(true);
      if (e.data?.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent?.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect3(() => {
    window.parent?.postMessage({ type: "__edit_mode_set_keys", edits: tweaks }, "*");
  }, [tweaks]);

  return (
    <>
      <header className="masthead">
        <div className="masthead-left">
          <div>
            <div className="masthead-title">Dark Patterns<span style={{color: "var(--accent)"}}>.</span></div>
            <div className="masthead-sub">An SSDI investigation · Zomato × Swiggy</div>
          </div>
        </div>
        <div className="masthead-issue">Vol. 01 · N= 213</div>
      </header>

      <nav className="tabs-bar">
        {TABS.map((t, i) => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`}
            data-screen-label={`${String(i+1).padStart(2, "0")} ${t.label}`}
            onClick={() => setTab(t.id)}>
            <span className="tab-num">0{i+1}</span>{t.label}
          </button>
        ))}
      </nav>

      <main data-screen-label={TABS.find(t => t.id === tab)?.label}>
        {tab === "overview" && <Overview/>}
        {tab === "dataset" && <Dataset/>}
        {tab === "analysis" && <Analysis/>}
        {tab === "predictor" && <Predictor/>}
      </main>

      {tweaksOpen && (
        <div className="tweaks-panel">
          <div className="tweaks-head">
            <div className="tweaks-title">Tweaks</div>
            <button className="tweaks-close" onClick={() => setTweaksOpen(false)}>✕</button>
          </div>
          <div className="tweaks-body">
            <div className="tweak-group">
              <div className="tweak-label">Visual direction</div>
              <div className="tweak-opts">
                {[
                  { id: "expose", name: "Exposé", sub: "warm paper" },
                  { id: "terminal", name: "Terminal", sub: "dark amber" },
                  { id: "pop", name: "Pop", sub: "brutal crisp" },
                ].map(t => (
                  <button key={t.id}
                    className={`tweak-opt ${tweaks.theme === t.id ? "active" : ""}`}
                    onClick={() => setTweaks(s => ({ ...s, theme: t.id }))}>
                    <div style={{fontFamily: "var(--font-display)", fontSize: 14, marginBottom: 2}}>{t.name}</div>
                    <div style={{fontSize: 9, opacity: 0.7}}>{t.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
