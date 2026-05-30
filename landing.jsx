// landing.jsx — all landing page sections
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
function Navbar({ onPrebook, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef(null);
  const [ind, setInd] = useState({ left: 0, width: 0, on: false });
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
    const nav = menuRef.current;
    if (!nav) return;
    const el = active ? nav.querySelector('[data-id="' + active + '"]') : null;
    if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth, on: true });
    else setInd(i => ({ ...i, on: false }));
  }, [active]);

  // close mobile sheet on resize to desktop
  useEffect(() => {
    const h = () => { if (window.innerWidth > 720) setMenu(false); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const themeIcon = theme === "light" ? "moon" : "sun";

  return (
    <>
      <div className={"nav-shell" + (scrolled ? " scrolled" : "")}>
        <nav className="navbar">
          <a href="#top" className="nav-brand" aria-label="Garcia Location — accueil">
            <img className="logo-badge" src="logo-mark.svg" alt="Garcia Automobiles" />
            <div className="nav-wordmark"><b>Garcia Automobiles</b><span>Mayotte</span></div>
          </a>
          <div className="nav-menu" ref={menuRef}>
            <span className="nav-ind" style={{ left: ind.left, width: ind.width, opacity: ind.on ? 1 : 0 }}></span>
            {links.map(([id,l])=>(
              <a key={id} href={"#"+id} data-id={id} className={active===id?"active":""}>{l}</a>
            ))}
          </div>
          <div className="nav-actions">
            <button className="nav-icon-btn desktop-only" onClick={onToggleTheme}
                    aria-label={theme==="light"?"Passer en thème sombre":"Passer en thème clair"}>
              <Icon name={themeIcon} size={17}/>
            </button>
            <a href={"tel:+262639690206"} className="nav-assist desktop-only">
              <span className="assist-dot"></span> Assistance 24/7
            </a>
            <button className="btn btn-accent btn-sm" onClick={onPrebook}>
              Nous contacter
            </button>
            <button className="nav-burger" onClick={()=>setMenu(m=>!m)} aria-label="Menu" aria-expanded={menu}>
              <Icon name={menu?"close":"menu"} size={24}/>
            </button>
          </div>
        </nav>
      </div>

      <div className={"nav-sheet"+(menu?" open":"")}>
        <div className="nav-sheet-links" onClick={()=>setMenu(false)}>
          {links.map(([id,l],i)=>(
            <a key={id} href={"#"+id} style={{transitionDelay:(menu?0.05+i*0.05:0)+"s"}}>
              <span className="nav-sheet-idx">0{i+1}</span> {l}
            </a>
          ))}
        </div>
        <div className="nav-sheet-foot">
          <button className="btn btn-accent btn-lg" onClick={()=>{setMenu(false);onPrebook();}}>
            Nous contacter <Icon name="arrowR" size={17}/>
          </button>
          <div className="nav-sheet-contacts">
            <a href={"https://wa.me/262639690206"} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={18}/> WhatsApp
            </a>
            <a href={"tel:+262639690206"}>
              <span className="assist-dot"></span> Assistance 24/7
            </a>
            <button className="nav-sheet-theme" onClick={onToggleTheme}>
              <Icon name={themeIcon} size={16}/> Thème {theme==="light"?"sombre":"clair"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- HERO ---------- */
function Hero({ widgetVariant, state, set, onSearch }) {
  return (
    <header className="section hero hero-v2" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">Vente véhicules d'occasion · 2 showrooms à Mayotte</span>
          <h1 style={{marginTop:18}}>Trouvez votre véhicule,<br/><span className="grad">au juste prix.</span></h1>
          <p className="hero-sub">
            Citadines, SUV, utilitaires — tous contrôlés, garantis,
            avec financement possible. Vendeur local de confiance depuis 12 ans.
          </p>
          <HeroSearch variant={widgetVariant} state={state} set={set} onSearch={onSearch}/>
          <div className="hero-assure">
            <Icon name="shield" size={15} style={{color:"var(--accent-2)"}}/>
            Véhicules contrôlés &amp; garantis · <b>Vendeur 100% mahorais</b>
          </div>
        </div>
        <div className="hero-visual reveal">
          <div className="hero-blob" aria-hidden="true"></div>
          <PhoneMock/>
        </div>
      </div>
    </header>
  );
}

/* ---------- MARQUEE ---------- */
function Marquee() {
  const items = [
    { t: "Showroom Mamoudzou — Kawéni" },
    { t: "Showroom Chirongui — Sud", isNew: true },
    { t: "Véhicules contrôlés & garantis" },
    { t: "Financement disponible" },
    { t: "Reprise de votre ancien véhicule" },
  ];
  const row = [...items, ...items];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {row.map((it,i)=>(
          <React.Fragment key={i}>
            <div className="marquee-item">
              <Icon name="pin" size={18}/> {it.t}
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
const SPEC_ICON = { year:"calendar", km:"route", fuel:"spark", trans:"gearbox" };

function CarCard({ car, variant, onPick, index }) {
  const catIcon = car.catKey==="utilitaire" ? "van" : car.catKey==="suv" ? "suv" : "car";
  const specs = Object.entries(car.specs);
  return (
    <div className={"car-card " + variant} onClick={onPick}>
      <div className="car-media">
        <span className="car-idx">({String(index+1).padStart(2,"0")})</span>
        <span className="car-cat">{car.cat}</span>
        <image-slot id={"car-"+car.id} placeholder={car.name} shape="rect"></image-slot>
        {variant==="va" && (
          <div className="car-specs-overlay">
            {specs.map(([k,v])=>(
              <span className="spec" key={k}><Icon name={SPEC_ICON[k]} size={15}/> {v}</span>
            ))}
          </div>
        )}
      </div>
      <div className="car-body">
        <div className="car-name">{car.name}</div>
        <div className="car-tagline">{car.tag}</div>
        <div className="car-specs">
          {specs.map(([k,v])=>(
            <span className="spec" key={k}><Icon name={SPEC_ICON[k]} size={15}/> {v}</span>
          ))}
        </div>
        <div className="car-specrow">
          {specs.map(([k,v])=>(
            <span className="spec" key={k}><Icon name={SPEC_ICON[k]} size={16}/> {v}</span>
          ))}
        </div>
        <div className="car-foot">
          <div className="car-price"><b>{car.price.toLocaleString("fr-FR")} €</b></div>
          <button className="btn btn-ghost btn-sm">Voir <Icon name="arrowR" size={15}/></button>
        </div>
      </div>
    </div>
  );
}

function Fleet({ cardVariant, onPick }) {
  const [filter, setFilter] = useState("all");
  const list = FLEET.filter(c => filter==="all" || c.catKey===filter).slice(0,6);
  return (
    <section className="section" id="flotte">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Catalogue</span>
            <h2 style={{marginTop:14}}>Des véhicules contrôlés,<br/>prêts à rouler.</h2>
            <p>Citadines économes, SUV robustes, utilitaires pour vos chantiers. Tous vérifiés, avec garantie et financement possible.</p>
          </div>
          <div className="fleet-filter glass">
            {FILTERS.map(f=>(
              <button key={f.key} className={filter===f.key?"active":""} onClick={()=>setFilter(f.key)}>{f.label}</button>
            ))}
          </div>
        </div>
        <div className="fleet-grid reveal">
          {list.map((c,i)=><CarCard key={c.id} car={c} index={i} variant={cardVariant} onPick={()=>onPick(c)}/>)}
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
            <h2 style={{marginTop:14}}>Le vendeur local<br/>en qui on a confiance.</h2>
          </div>
        </div>
        <div className="bento reveal">
          <div className="bento-cell glass b-tall">
            <div className="bento-ic" data-n="01"><Icon name="shield" size={23}/></div>
            <div>
              <h3>Garantie incluse</h3>
              <p>Chaque véhicule est vendu avec une garantie panne moteur/boîte de 6 mois minimum. Extensions disponibles jusqu'à 24 mois.</p>
            </div>
          </div>
          <div className="bento-cell glass b-wide">
            <div className="bento-ic" data-n="02"><Icon name="spark" size={23}/></div>
            <div>
              <h3>Contrôle technique complet</h3>
              <p>Chaque véhicule est inspecté avant mise en vente. Rapport d'état, historique d'entretien et carnet fournis à l'acheteur.</p>
            </div>
          </div>
          <div className="bento-cell glass">
            <div className="bento-ic" data-n="03"><Icon name="tag" size={23}/></div>
            <div><h3>Financement possible</h3><p>Partenaires financiers locaux. Simulation gratuite, réponse rapide.</p></div>
          </div>
          <div className="bento-cell glass">
            <div className="bento-ic" data-n="04"><Icon name="car" size={23}/></div>
            <div><h3>Reprise de votre véhicule</h3><p>Estimation gratuite sur place. Montant déduit directement du prix d'achat.</p></div>
          </div>
          <div className="bento-cell glass bento-map b-wide">
            <div>
              <div className="bento-big-num">2</div>
              <h3 style={{marginTop:6}}>showrooms à Mayotte</h3>
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
        <div className="sec-head reveal" style={{justifyContent:"center",textAlign:"center"}}>
          <div>
            <span className="eyebrow">Bon à savoir</span>
            <h2 style={{marginTop:14}}>Les questions qu'on nous pose.</h2>
          </div>
        </div>
        <div className="faq-wrap reveal">
          {FAQ.map((f,i)=>(
            <div key={i} className={"faq-item glass"+(open===i?" open":"")}>
              <div className="faq-q" onClick={()=>setOpen(open===i?-1:i)}>
                {f.q}
                <div className="faq-toggle"><Icon name="plus" size={16}/></div>
              </div>
              <div className="faq-a" style={{maxHeight: open===i?"260px":"0"}}>
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
function Footer({ onPrebook }) {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-brand">
              <img className="logo-badge" src="logo-mark.svg" alt="Garcia Location" />
              <div className="nav-wordmark"><b>Garcia Automobiles</b><span>Mayotte</span></div>
            </div>
            <p>Vendeur local de véhicules d'occasion de confiance — particuliers, professionnels et fonctionnaires à Mayotte.</p>
          </div>
          <div className="footer-col">
            <h4>Showrooms</h4>
            <a href="#agences">Mamoudzou — Kawéni</a>
            <a href="#agences">Chirongui — Sud</a>
          </div>
          <div className="footer-col">
            <h4>Liens</h4>
            <a href="#flotte">Catalogue</a>
            <a href="#pourquoi">Pourquoi nous</a>
            <a href="#faq">FAQ</a>
            <a href="#" onClick={(e)=>{e.preventDefault();onPrebook();}}>Nous contacter</a>
          </div>
          <div className="footer-col">
            <h4>Nous joindre</h4>
            <a className="contact-btn" href={"https://wa.me/" + CONTACTS.whatsapp} target="_blank" rel="noreferrer">
              <span className="cic wa"><Icon name="whatsapp" size={20}/></span>
              <span><b>WhatsApp</b><span>Réponse rapide, 7j/7</span></span>
            </a>
            <a className="contact-btn" href={"tel:+" + CONTACTS.whatsapp}>
              <span className="cic ph"><Icon name="phone" size={18}/></span>
              <span><b>Appeler</b><span>{CONTACTS.mainPhone}</span></span>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Garcia Automobiles — Mayotte. Tous droits réservés.</div>
          <div className="legal">
            <a href="#">Mentions légales</a>
            <a href="#">CGV / CGL</a>
            <a href="#">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- MOBILE FLOATING CTA ---------- */
function FloatCTA({ onSearch }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 620);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={"float-cta"+(show?" show":"")}>
      <div className="fc-txt"><b>Un véhicule vous intéresse ?</b><span>2 showrooms · garantie incluse</span></div>
      <button className="btn btn-accent" onClick={onSearch}>Nous contacter <Icon name="arrowR" size={16}/></button>
    </div>
  );
}

Object.assign(window, { Navbar, Hero, Marquee, Fleet, Bento, Faq, Footer, FloatCTA, useReveal, CarCard });
