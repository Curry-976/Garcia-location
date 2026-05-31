// app.jsx — Garcia Automobiles
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "safran",
  "blur": 20,
  "typeface": "clash"
}/*EDITMODE-END*/;

const ACCENTS = {
  safran: { accent: "#F0A14B", accent2: "#3FD8C6", ink: "#1A1206" },
  lagon:  { accent: "#3FD8C6", accent2: "#F0A14B", ink: "#062421" },
};
const TYPEFACES = {
  satoshi: { head: '"Satoshi", system-ui, sans-serif', body: '"Satoshi", system-ui, sans-serif' },
  clash:   { head: '"Clash Display", system-ui, sans-serif', body: '"Satoshi", system-ui, sans-serif' },
  general: { head: '"General Sans", system-ui, sans-serif', body: '"General Sans", system-ui, sans-serif' },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useState("landing");
  const [pickedVehicle, setPickedVehicle] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", t.theme === "light");
    const r = document.documentElement.style;
    const a = ACCENTS[t.accent] || ACCENTS.safran;
    r.setProperty("--accent", a.accent);
    r.setProperty("--accent-2", a.accent2);
    r.setProperty("--accent-ink", a.ink);
    r.setProperty("--glass-blur", (t.blur || 20) + "px");
    const tf = TYPEFACES[t.typeface] || TYPEFACES.clash;
    r.setProperty("--font-head", tf.head);
    r.setProperty("--font-body", tf.body);
  }, [t.theme, t.accent, t.blur, t.typeface]);

  useReveal(view);

  function goContact(vehicle) {
    setPickedVehicle(vehicle || null);
    setView("contact");
    window.scrollTo({ top: 0 });
  }
  const toggleTheme = () => setTweak("theme", t.theme === "light" ? "dark" : "light");

  return (
    <div className="app-root">
      {view === "landing" && (
        <>
          <Navbar onContact={() => goContact(null)} theme={t.theme} onToggleTheme={toggleTheme} />
          <Hero onContact={() => goContact(null)} onBrowse={() => document.getElementById("flotte")?.scrollIntoView({ behavior: "smooth" })} />
          <Marquee />
          <StatsBar />
          <HowItWorks />
          <Fleet onPick={c => goContact(c)} />
          <Agencies />
          <Bento />
          <TestimonialsSection />
          <Faq />
          <FinalCTA onContact={() => goContact(null)} />
          <Footer onContact={() => goContact(null)} />
          <FloatCTA onContact={() => goContact(null)} />
        </>
      )}
      {view === "contact" && (
        <>
          <Navbar onContact={() => goContact(null)} theme={t.theme} onToggleTheme={toggleTheme} />
          <PreBooking
            initial={{ vehicle: pickedVehicle }}
            onExit={() => { setView("landing"); window.scrollTo({ top: 0 }); }}
          />
        </>
      )}

      <TweaksPanel>
        <TweakSection label="Thème" />
        <TweakRadio label="Apparence" value={t.theme}
          options={[{ value: "light", label: "Clair" }, { value: "dark", label: "Sombre" }]}
          onChange={v => setTweak("theme", v)} />
        <TweakSection label="Direction artistique" />
        <TweakRadio label="Accent" value={t.accent}
          options={[{ value: "safran", label: "Safran" }, { value: "lagon", label: "Lagon" }]}
          onChange={v => setTweak("accent", v)} />
        <TweakSlider label="Intensité du flou" value={t.blur} min={4} max={36} step={2} unit="px"
          onChange={v => setTweak("blur", v)} />
        <TweakRadio label="Typographie" value={t.typeface}
          options={[{ value: "clash", label: "Clash" }, { value: "satoshi", label: "Satoshi" }, { value: "general", label: "General" }]}
          onChange={v => setTweak("typeface", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
