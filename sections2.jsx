// sections2.jsx — TestimonialsSection, HowItWorksSection, StatsBar
const { useState, useEffect, useRef } = React;

/* ---------- STATS BAR ---------- */
function StatsBar() {
  const ref = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTriggered(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={ref}>
      <div className="wrap stats-grid">
        {STATS.map((s, i) => (
          <div key={i} className={"stat-item reveal" + (triggered ? " in" : "")}
               style={{ transitionDelay: (i * 0.1) + "s" }}>
            <div className="stat-value">{s.v}</div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorksSection() {
  useReveal();
  return (
    <section className="section hiw-section" id="comment">
      <div className="wrap">
        <div className="sec-head reveal" style={{ justifyContent: "center", textAlign: "center" }}>
          <div>
            <span className="eyebrow">Comment ça marche</span>
            <h2 style={{ marginTop: 14 }}>Réservez en 3 étapes,<br />récupérez les clés.</h2>
          </div>
        </div>
        <div className="hiw-steps reveal">
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className="hiw-step">
                <div className="hiw-num">{s.n}</div>
                <div className="hiw-ic glass">
                  <Icon name={s.icon} size={26} />
                </div>
                <h3 className="hiw-title">{s.title}</h3>
                <p className="hiw-desc">{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="hiw-connector" aria-hidden="true">
                  <div className="hiw-line" />
                  <Icon name="arrowR" size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function StarRating({ n = 5 }) {
  return (
    <div className="stars" aria-label={n + " étoiles sur 5"}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < n ? "var(--accent)" : "var(--border)"} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, index }) {
  const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className="testi-card glass reveal" style={{ transitionDelay: (index * 0.1) + "s" }}>
      <StarRating n={t.rating} />
      <blockquote className="testi-quote">"{t.text}"</blockquote>
      <div className="testi-author">
        <div className="testi-avatar" aria-hidden="true">{initials}</div>
        <div>
          <div className="testi-name">{t.name}</div>
          <div className="testi-role">{t.role}</div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  useReveal();
  return (
    <section className="section" id="avis">
      <div className="wrap">
        <div className="sec-head reveal" style={{ justifyContent: "center", textAlign: "center" }}>
          <div>
            <span className="eyebrow">Ce qu'ils en disent</span>
            <h2 style={{ marginTop: 14 }}>Des clients qui nous font<br />confiance depuis des années.</h2>
          </div>
        </div>
      </div>
      <div className="testi-track-wrap">
        <div className="testi-track">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { StatsBar, HowItWorksSection, TestimonialsSection });
