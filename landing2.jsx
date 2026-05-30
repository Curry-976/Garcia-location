// landing2.jsx — Garcia Automobiles — showrooms, testimonials, CTA
const { useState: useState2 } = React;

function telHref(n) {
  let d = String(n).replace(/[^\d]/g, "");
  if (d.startsWith("0")) d = "262" + d.slice(1);
  else if (!d.startsWith("262")) d = "262" + d;
  return "tel:+" + d;
}
function mapsHref(addr) {
  return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(addr + ", Mayotte");
}

/* ---------- COMMENT ÇA MARCHE ---------- */
function HowItWorks() {
  return (
    <section className="section how" id="comment">
      <div className="wrap">
        <div className="sec-head reveal" style={{ marginBottom: 48 }}>
          <div>
            <span className="eyebrow">Comment ça marche</span>
            <h2 style={{ marginTop: 14 }}>Achetez votre véhicule<br />en trois étapes.</h2>
          </div>
          <p>Pas de prise de tête. Vous choisissez, on organise l'essai, vous repartez propriétaire.</p>
        </div>
        <div className="steps reveal">
          {STEPS.map((s, i) => (
            <div className="step" key={s.n}>
              <div className="step-top">
                <span className="step-n">{s.n}</span>
                <span className="step-ic"><Icon name={s.icon} size={20} /></span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && <span className="step-link" aria-hidden="true"></span>}
            </div>
          ))}
        </div>
        <div className="stats reveal">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <b>{s.v}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- NOS SHOWROOMS ---------- */
function Agencies() {
  return (
    <section className="section agencies" id="agences">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Nos showrooms</span>
            <h2 style={{ marginTop: 14 }}>Trois showrooms,<br />toute l'île couverte.</h2>
          </div>
          <p>Mamoudzou, Chirongui et l'aéroport de Dzaoudzi-Pamandzi. Essai possible sur rendez-vous.</p>
        </div>
        <div className="showroom-grid reveal">
          {AGENCIES.map(a => (
            <article className="showroom-card glass" key={a.id}>
              <div className="showroom-media">
                <image-slot id={"agency-" + a.id} placeholder={"Showroom " + a.short} shape="rect"></image-slot>
                <span className="showroom-area">{a.area}</span>
                {a.isNew && <span className="showroom-new">Nouveau</span>}
              </div>
              <div className="showroom-body">
                <h3>{a.short}</h3>
                <div className="showroom-row"><Icon name="pin" size={15} /><span>{a.address}</span></div>
                <div className="showroom-row"><Icon name="calendar" size={15} /><span>{a.hours}<em>{a.hoursNote}</em></span></div>
                <div className="showroom-actions">
                  <a className="btn btn-accent btn-sm" href={telHref(a.prebook)}>
                    <Icon name="phone" size={14} /> Appeler
                  </a>
                  <a className="btn btn-ghost btn-sm" href={mapsHref(a.address)} target="_blank" rel="noreferrer">
                    <Icon name="route" size={14} /> Itinéraire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AVIS CLIENTS ---------- */
function Stars({ n }) {
  return (
    <span className="stars" aria-label={n + " sur 5"}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" size={15} fill={i < n} stroke={1.5} />
      ))}
    </span>
  );
}

function Testimonials() {
  return (
    <section className="section reviews" id="avis">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">Avis clients</span>
            <h2 style={{ marginTop: 14 }}>Particuliers, pros,<br />fonctionnaires &amp; artisans.</h2>
          </div>
          <div className="reviews-score">
            <b>4,8<span>/5</span></b>
            <div>
              <Stars n={5} />
              <span className="reviews-count">sur 200+ ventes</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid reveal">
          {TESTIMONIALS.map((t, i) => (
            <figure className="review-card glass" key={i}>
              <Stars n={t.rating} />
              <blockquote>"{t.text}"</blockquote>
              <figcaption>
                <div className="review-av-initials">
                  {t.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <b>{t.name}</b>
                  <span>{t.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA FINALE ---------- */
function FinalCTA({ onContact }) {
  return (
    <section className="section cta-band-wrap">
      <div className="wrap">
        <div className="cta-band glass glass-strong reveal">
          <div className="cta-glow" aria-hidden="true"></div>
          <span className="eyebrow">Un véhicule vous intéresse ?</span>
          <h2>Contactez-nous,<br />on s'occupe du reste.</h2>
          <p>Envoyez votre demande en 2 minutes, notre équipe vous rappelle pour organiser l'essai.</p>
          <div className="cta-actions">
            <button className="btn btn-accent btn-lg" onClick={onContact}>
              Nous contacter <Icon name="arrowR" size={17} />
            </button>
            <a className="btn btn-ghost btn-lg" href={"https://wa.me/" + CONTACTS.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </div>
          <div className="cta-phones">
            <a href={telHref(CONTACTS.mamoudzou)}><Icon name="phone" size={14} /> {CONTACTS.mamoudzou} <em>Mamoudzou</em></a>
            <a href={telHref(CONTACTS.mainPhone)}><Icon name="phone" size={14} /> {CONTACTS.mainPhone} <em>Général</em></a>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { HowItWorks, Agencies, Testimonials, FinalCTA, telHref, mapsHref });
