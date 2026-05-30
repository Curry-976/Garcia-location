// landing.jsx — Garcia Automobiles — redesign premium UI/UX Pro Max
const { useState, useEffect, useRef } = React;

/* ---------- scroll reveal hook ---------- */
function useReveal(view) {
  useEffect(() => {
    function check() {
      const els = document.querySelectorAll(".reveal:not(.in)");
      const vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add("in");
      });
    }
    check();
    const t1 = setTimeout(check, 60);
    const t2 = setTimeout(check, 300);
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [view]);
}

/* ---------- NAVBAR ---------- */
function Navbar({ onContact, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu]   = useState(false);
  const [active, setActive] = useState("");
  const links = [["flotte","Catalogue"],["agences","Showrooms"],["pourquoi","Pourquoi nous"],["avis","Avis"],["faq","FAQ"]];

  useEffect(() => {
    const ids = links.map(l => l[0]);
    function onScroll() {
      setScrolled(window.scrollY > 30);
      let cur = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) cur = id;
      }
      if (window.scrollY < 420) cur = "";
      setActive(cur);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  function close() { setMenu(false); }

  return (
    <>
      <div className={"nav-shell" + (scrolled ? " scrolled" : "")}>
        <nav className="navbar">

          {/* Left — brand */}
          <a href="#top" className="nav-brand" aria-label="Garcia Automobiles — accueil">
            <img className="logo-badge" src="logo-mark.svg" alt="Garcia Automobiles" />
            <div className="nav-wordmark"><b>Garcia</b><span>Automobiles · Mayotte</span></div>
          </a>

          {/* Center — pill links (hidden on mobile) */}
          <div className="nav-pill">
            {links.map(([id, l]) => (
              <a key={id} href={"#" + id}
                className={"nav-pill-link" + (active === id ? " active" : "")}>
                {l}
              </a>
            ))}
          </div>

          {/* Right — actions */}
          <div className="nav-actions">
            <button className="nav-icon-btn" onClick={onToggleTheme}
              aria-label={theme === "light" ? "Thème sombre" : "Thème clair"}>
              <Icon name={theme === "light" ? "moon" : "sun"} size={17} />
            </button>
            <button className="btn btn-accent btn-sm nav-cta-desktop" onClick={onContact}>
              Nous contacter
            </button>
            <button className="nav-burger" onClick={() => setMenu(m => !m)}
              aria-label={menu ? "Fermer" : "Menu"} aria-expanded={menu}>
              <span className={"burger-line" + (menu ? " open" : "")}></span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile fullscreen sheet */}
      <div className={"nav-sheet" + (menu ? " open" : "")} aria-hidden={!menu}>
        <div className="nav-sheet-links" onClick={close}>
          {links.map(([id, l], i) => (
            <a key={id} href={"#" + id}
              style={{ transitionDelay: (menu ? 0.05 + i * 0.06 : 0) + "s" }}
              tabIndex={menu ? 0 : -1}>
              <span className="nav-sheet-idx">0{i + 1}</span>
              <span>{l}</span>
            </a>
          ))}
        </div>
        <div className="nav-sheet-foot">
          <button className="btn btn-accent btn-lg" onClick={() => { close(); onContact(); }}
            tabIndex={menu ? 0 : -1}>
            Nous contacter <Icon name="arrowR" size={17} />
          </button>
          <div className="nav-sheet-contacts">
            <a href={"https://wa.me/" + CONTACTS.whatsapp} target="_blank" rel="noreferrer"
              tabIndex={menu ? 0 : -1}>
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
            <a href={"tel:+262" + CONTACTS.mamoudzou.replace(/\D/g, "").slice(1)}
              tabIndex={menu ? 0 : -1}>
              <Icon name="phone" size={15} /> {CONTACTS.mamoudzou}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- HERO (Rachat — plate estimation widget) ---------- */
function Hero({ onContact, onBrowse }) {
  const [plate, setPlate] = useState("");
  const [km, setKm] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function formatPlate(raw) {
    // Remove non-alphanumeric, uppercase, max 9 chars (AA-123-BB)
    const clean = raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 7);
    if (clean.length <= 2) return clean;
    if (clean.length <= 5) return clean.slice(0, 2) + "-" + clean.slice(2);
    return clean.slice(0, 2) + "-" + clean.slice(2, 5) + "-" + clean.slice(5);
  }

  function handlePlate(e) {
    setPlate(formatPlate(e.target.value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!plate || !km) return;
    setSubmitted(true);
    onContact();
  }

  return (
    <>
      <header className="section hero-rachat" id="top">
        <div className="hero-rachat-glow" aria-hidden="true"></div>
        <div className="hero-rachat-glow-2" aria-hidden="true"></div>
        <div className="wrap hero-rachat-grid">

          {/* ---- LEFT: copy ---- */}
          <div className="hero-rc-copy reveal">
            <div className="hero-rc-eyebrow">
              <span className="assist-dot"></span>
              Rachat auto · Mayotte
            </div>
            <h1 className="hero-rc-h1">
              Vendez votre voiture<br />
              <span className="accent">au meilleur prix,</span><br />
              en 24h.
            </h1>
            <div className="hero-rc-badges">
              {[
                { icon: "spark", text: "Offre en 2 min" },
                { icon: "shield", text: "Paiement garanti" },
                { icon: "tag", text: "Sans engagement" },
              ].map((b, i) => (
                <span key={i} className="hero-rc-badge">
                  <Icon name={b.icon} size={14} /> {b.text}
                </span>
              ))}
            </div>
          </div>

          {/* ---- RIGHT: widget card ---- */}
          <div className="hero-rc-right reveal">
            <div className="widget-card glass-strong">
              {/* Live indicator */}
              <div className="widget-live">
                <span className="widget-live-dot"></span>
                Estimation en direct
              </div>

              <div className="widget-title">Quelle est votre voiture ?</div>
              <p className="widget-sub">Entrez votre plaque et kilométrage pour recevoir une offre immédiate.</p>

              <form onSubmit={handleSubmit}>
                {/* French license plate input */}
                <label className="plate-label">Immatriculation</label>
                <div className="plate-input-wrap">
                  <div className="plate-eu-strip" aria-hidden="true">
                    <span className="plate-eu-star">★</span>
                    <span className="plate-eu-f">F</span>
                  </div>
                  <input
                    className="plate-number-input"
                    type="text"
                    placeholder="AA-123-BB"
                    value={plate}
                    onChange={handlePlate}
                    maxLength={9}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Numéro d'immatriculation"
                    inputMode="text"
                  />
                </div>

                {/* Mileage input */}
                <div className="km-field-wrap">
                  <label className="plate-label">Kilométrage</label>
                  <div className="km-input-row">
                    <input
                      className="km-number"
                      type="number"
                      placeholder="72 000"
                      value={km}
                      onChange={e => setKm(e.target.value)}
                      min={0}
                      max={999999}
                      aria-label="Kilométrage du véhicule"
                      inputMode="numeric"
                    />
                    <span className="km-unit">km</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-accent btn-lg widget-cta">
                  Estimer mon prix <Icon name="arrowR" size={17} />
                </button>
              </form>
            </div>

            {/* Floating price card */}
            <div className="hero-rc-float glass">
              <div className="hrf-top">
                <span className="hrf-label">Dernier rachat</span>
                <span className="hrf-sold">Vendu ✓</span>
              </div>
              <div className="hrf-price">8 200 €</div>
              <div className="hrf-sub">
                Renault Clio IV
                <span>2019 · 68 000 km</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* ---- Trust bar ---- */}
      <TrustBar />
    </>
  );
}

/* ---------- TRUST BAR ---------- */
function TrustBar() {
  const sales = [
    { car: "Renault Clio", km: "72 000 km", price: "6 800 €" },
    { car: "Peugeot 208", km: "55 000 km", price: "7 400 €" },
    { car: "Toyota Yaris", km: "88 000 km", price: "5 900 €" },
    { car: "Dacia Sandero", km: "43 000 km", price: "8 100 €" },
    { car: "Citroën C3", km: "61 000 km", price: "6 200 €" },
    { car: "Ford Fiesta", km: "79 000 km", price: "5 500 €" },
  ];
  const row = [...sales, ...sales];
  return (
    <div className="trust-bar" aria-label="Indicateurs de confiance">
      <div className="trust-bar-inner">
        <div className="trust-bar-col">
          <span className="trust-star">★</span>
          <span className="trust-rating">4,8/5</span>
          <span>· 200+ rachats</span>
        </div>
        <div className="trust-bar-col center" aria-live="off">
          <div className="ticker-track">
            {row.map((s, i) => (
              <span key={i} className="ticker-item">
                <span className="ticker-dot" aria-hidden="true"></span>
                {s.car} · {s.km} ·&nbsp;<span className="ticker-price">{s.price}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="trust-bar-col right">
          <span>Offres aujourd'hui :</span>
          <span className="trust-count">47</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const items = [
    { t: "Showroom Mamoudzou — Kawéni" },
    { t: "Showroom Chirongui — Sud", isNew: true },
    { t: "Garantie 6 mois incluse" },
    { t: "Financement disponible" },
    { t: "Reprise de votre véhicule" },
    { t: "Contrôle technique complet" },
  ];
  const row = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {row.map((it, i) => (
          <React.Fragment key={i}>
            <div className="marquee-item">
              <Icon name="pin" size={18} /> {it.t}
              {it.isNew && <span className="new-tag">Nouveau</span>}
            </div>
            <div className="marquee-sep"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------- FLEET ---------- */
const SPEC_ICON = { year: "calendar", km: "route", fuel: "spark", trans: "gearbox" };

function CarCard({ car, onPick, featured }) {
  const specs = Object.entries(car.specs);
  return (
    <article
      className={"car-card-vo" + (featured ? " car-card-featured" : "")}
      onClick={onPick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onPick()}
      aria-label={"Voir " + car.name + " — " + car.price.toLocaleString("fr-FR") + " €"}
    >
      <div className="ccv-media">
        <span className="ccv-cat">{car.cat}</span>
        <span className="ccv-year">{car.specs.year}</span>
        <image-slot id={"car-" + car.id} placeholder={car.name} shape="rect"></image-slot>
        <div className="ccv-km-badge">
          <Icon name="route" size={12} />
          {car.specs.km}
        </div>
      </div>
      <div className="ccv-body">
        <div className="ccv-header">
          <div>
            <div className="ccv-name">{car.name}</div>
            <div className="ccv-tag">{car.tag}</div>
          </div>
          <div className="ccv-price">
            {car.price.toLocaleString("fr-FR")} <span>€</span>
          </div>
        </div>
        <div className="ccv-specs">
          {specs.filter(([k]) => k !== "km" && k !== "year").map(([k, v]) => (
            <span className="ccv-spec" key={k}>
              <Icon name={SPEC_ICON[k]} size={13} /> {v}
            </span>
          ))}
        </div>
        <div className="ccv-cta">
          Voir ce véhicule <Icon name="arrowR" size={15} />
        </div>
      </div>
    </article>
  );
}

function Fleet({ onPick }) {
  const [filter, setFilter] = useState("all");
  const list = FLEET.filter(c => filter === "all" || c.catKey === filter);
  return (
    <section className="section" id="flotte">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2 style={{ marginTop: 14 }}>Des véhicules contrôlés,<br />prêts à rouler.</h2>
            <p>Citadines, SUV, utilitaires — tous vérifiés, avec garantie et financement possible.</p>
          </div>
          <div className="fleet-filter glass">
            {FILTERS.map(f => (
              <button key={f.key} className={filter === f.key ? "active" : ""} onClick={() => setFilter(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="fleet-vo-grid reveal">
          {list.map((c, i) => (
            <CarCard key={c.id} car={c} featured={i === 0 && filter === "all"} onPick={() => onPick(c)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- BENTO ---------- */
function Bento() {
  return (
    <section className="section" id="pourquoi">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Pourquoi Garcia Automobiles</span>
            <h2 style={{ marginTop: 14 }}>Le vendeur local<br />en qui on a confiance.</h2>
          </div>
        </div>
        <div className="bento reveal">
          <div className="bento-cell glass b-tall">
            <div className="bento-ic" data-n="01"><Icon name="shield" size={23} /></div>
            <div>
              <h3>Garantie incluse</h3>
              <p>6 mois minimum sur moteur et boîte de vitesses. Extensions jusqu'à 24 mois disponibles.</p>
            </div>
          </div>
          <div className="bento-cell glass b-wide">
            <div className="bento-ic" data-n="02"><Icon name="spark" size={23} /></div>
            <div>
              <h3>Contrôle technique complet</h3>
              <p>Rapport d'état, historique d'entretien et carnet de bord fournis à chaque acheteur. Zéro surprise.</p>
            </div>
          </div>
          <div className="bento-cell glass">
            <div className="bento-ic" data-n="03"><Icon name="tag" size={23} /></div>
            <div><h3>Financement possible</h3><p>Partenaires locaux. Simulation gratuite, réponse rapide.</p></div>
          </div>
          <div className="bento-cell glass">
            <div className="bento-ic" data-n="04"><Icon name="car" size={23} /></div>
            <div><h3>Reprise véhicule</h3><p>Estimation gratuite, montant déduit de votre achat.</p></div>
          </div>
          <div className="bento-cell glass bento-map b-wide">
            <div>
              <div className="bento-big-num">2</div>
              <h3 style={{ marginTop: 6 }}>showrooms à Mayotte</h3>
            </div>
            <div className="map-pins">
              <div className="map-pin"><span className="pdot"></span> Mamoudzou — Kawéni</div>
              <div className="map-pin lagoon"><span className="pdot"></span> Chirongui — Sud</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="sec-head reveal" style={{ justifyContent: "center", textAlign: "center" }}>
          <div>
            <span className="eyebrow">Bon à savoir</span>
            <h2 style={{ marginTop: 14 }}>Les questions qu'on nous pose.</h2>
          </div>
        </div>
        <div className="faq-wrap reveal">
          {FAQ.map((f, i) => (
            <div key={i} className={"faq-item glass" + (open === i ? " open" : "")}>
              <div className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                {f.q}
                <div className="faq-toggle"><Icon name="plus" size={16} /></div>
              </div>
              <div className="faq-a" style={{ maxHeight: open === i ? "260px" : "0" }}>
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer({ onContact }) {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-brand">
              <img className="logo-badge" src="logo-mark.svg" alt="Garcia Automobiles" />
              <div className="nav-wordmark"><b>Garcia Automobiles</b><span>Mayotte</span></div>
            </div>
            <p>Vendeur local de véhicules d'occasion de confiance — particuliers, professionnels et fonctionnaires à Mayotte depuis 12 ans.</p>
          </div>
          <div className="footer-col">
            <h4>Showrooms</h4>
            <a href="#agences">Mamoudzou — Kawéni</a>
            <a href="#agences">Chirongui — Sud</a>
          </div>
          <div className="footer-col">
            <h4>Catalogue</h4>
            <a href="#flotte">Citadines</a>
            <a href="#flotte">SUV / 4x4</a>
            <a href="#flotte">Utilitaires</a>
            <a href="#pourquoi">Pourquoi nous</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Nous joindre</h4>
            <a className="contact-btn" href={"https://wa.me/" + CONTACTS.whatsapp} target="_blank" rel="noreferrer">
              <span className="cic wa"><Icon name="whatsapp" size={20} /></span>
              <span><b>WhatsApp</b><span>Réponse rapide, 7j/7</span></span>
            </a>
            <a className="contact-btn" href={"tel:+" + CONTACTS.whatsapp}>
              <span className="cic ph"><Icon name="phone" size={18} /></span>
              <span><b>Appeler</b><span>{CONTACTS.mainPhone}</span></span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Garcia Automobiles — Mayotte. Tous droits réservés.</div>
          <div className="legal">
            <a href="#">Mentions légales</a>
            <a href="#">CGV</a>
            <a href="#">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MOBILE FLOATING CTA ---------- */
function FloatCTA({ onContact }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 620);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={"float-cta" + (show ? " show" : "")}>
      <div className="fc-txt"><b>Un véhicule vous intéresse ?</b><span>2 showrooms · garantie incluse</span></div>
      <button className="btn btn-accent" onClick={onContact}>Contacter <Icon name="arrowR" size={16} /></button>
    </div>
  );
}

Object.assign(window, { Navbar, Hero, TrustBar, Marquee, Fleet, Bento, Faq, Footer, FloatCTA, useReveal, CarCard });
