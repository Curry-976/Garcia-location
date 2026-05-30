// app.jsx — root app: routing + tweaks
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "widgetVariant": "card",
  "cardVariant": "va",
  "accent": "safran",
  "blur": 20,
  "typeface": "satoshi"
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
  const [view, setView] = useState("landing"); // landing | prebooking
  const [search, setSearch] = useState({ pickup:"mamoudzou", dropoff:"mamoudzou", start:null, end:null, vtype:null });
  const [pickedVehicle, setPickedVehicle] = useState(null);

  // apply tweaks to CSS vars
  useEffect(() => {
    document.documentElement.classList.toggle("theme-light", t.theme === "light");
    const r = document.documentElement.style;
    const a = ACCENTS[t.accent] || ACCENTS.safran;
    r.setProperty("--accent", a.accent);
    r.setProperty("--accent-2", a.accent2);
    r.setProperty("--accent-ink", a.ink);
    r.setProperty("--glass-blur", (t.blur||20) + "px");
    const tf = TYPEFACES[t.typeface] || TYPEFACES.satoshi;
    r.setProperty("--font-head", tf.head);
    r.setProperty("--font-body", tf.body);
  }, [t.theme, t.accent, t.blur, t.typeface]);

  useReveal(view);

  function goPrebook(vehicle) {
    setPickedVehicle(vehicle || null);
    setView("prebooking");
    window.scrollTo({ top: 0 });
  }
  function setSearchPartial(p) { setSearch(s => ({ ...s, ...p })); }
  const toggleTheme = () => setTweak("theme", t.theme === "light" ? "dark" : "light");

  return (
    <div className="app-root">
      {view === "landing" && (
        <>
          <Navbar onPrebook={()=>goPrebook(null)} theme={t.theme} onToggleTheme={toggleTheme} />
          <Hero widgetVariant={t.widgetVariant} state={search} set={setSearchPartial} onSearch={()=>goPrebook(null)} />
          <Marquee />
          <StatsBar />
          <HowItWorksSection />
          <Fleet cardVariant={t.cardVariant} onPick={(c)=>goPrebook(c)} />
          <Agencies onPrebook={()=>goPrebook(null)} />
          <Bento />
          <TestimonialsSection />
          <Faq />
          <FinalCTA onPrebook={()=>goPrebook(null)} />
          <Footer onPrebook={()=>goPrebook(null)} />
          <FloatCTA onSearch={()=>goPrebook(null)} />
        </>
      )}
      {view === "prebooking" && (
        <>
          <Navbar onPrebook={()=>goPrebook(null)} theme={t.theme} onToggleTheme={toggleTheme} />
          <PreBooking
            initial={{ ...search, vehicle: pickedVehicle }}
            onExit={()=>{ setView("landing"); window.scrollTo({top:0}); }}
          />
        </>
      )}

      <TweaksPanel>
        <TweakSection label="Thème" />
        <TweakRadio label="Apparence" value={t.theme}
          options={[{value:"light",label:"Clair"},{value:"dark",label:"Sombre"}]}
          onChange={(v)=>setTweak("theme", v)} />
        <TweakSection label="Composant clé" />
        <TweakRadio label="Widget de recherche" value={t.widgetVariant}
          options={[{value:"card",label:"Empilé"},{value:"bar",label:"Barre"},{value:"min",label:"Minimal"}]}
          onChange={(v)=>setTweak("widgetVariant", v)} />
        <TweakSection label="Flotte" />
        <TweakRadio label="Cartes véhicule" value={t.cardVariant}
          options={[{value:"va",label:"Survol"},{value:"vb",label:"Visibles"},{value:"vc",label:"Éditorial"}]}
          onChange={(v)=>setTweak("cardVariant", v)} />
        <TweakSection label="Direction artistique" />
        <TweakRadio label="Accent principal" value={t.accent}
          options={[{value:"safran",label:"Safran"},{value:"lagon",label:"Lagon"}]}
          onChange={(v)=>setTweak("accent", v)} />
        <TweakSlider label="Intensité du flou (glass)" value={t.blur} min={4} max={36} step={2} unit="px"
          onChange={(v)=>setTweak("blur", v)} />
        <TweakRadio label="Typographie" value={t.typeface}
          options={[{value:"satoshi",label:"Satoshi"},{value:"clash",label:"Clash"},{value:"general",label:"General"}]}
          onChange={(v)=>setTweak("typeface", v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
