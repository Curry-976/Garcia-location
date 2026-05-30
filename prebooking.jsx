// prebooking.jsx — formulaire de contact / demande d'info (vente VO)
const { useState, useMemo } = React;

const PB_STEPS = ["Véhicule", "Votre demande", "Coordonnées"];

function PreBooking({ initial, onExit }) {
  const [step, setStep] = useState(initial.vehicle ? 1 : 0);
  const [vehicle, setVehicle] = useState(initial.vehicle || null);
  const [showroom, setShowroom] = useState("mamoudzou");
  const [intent, setIntent] = useState("essai"); // essai | info | financement | reprise
  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"", msg:"" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const ref = useMemo(() => "GA-" + Math.random().toString(36).slice(2,7).toUpperCase(), []);

  function validateForm() {
    const e = {};
    if (!form.first.trim()) e.first = "Requis";
    if (!form.last.trim()) e.last = "Requis";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Email invalide";
    if (form.phone.replace(/\D/g,"").length < 9) e.phone = "Numéro invalide";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (step === 0 && !vehicle) return;
    if (step === 2) { if (!validateForm()) return; setDone(true); return; }
    setStep(s => Math.min(s+1, 2));
    window.scrollTo({ top:0, behavior:"smooth" });
  }
  function prev() {
    if (step === 0) { onExit(); return; }
    setStep(s => s-1);
    window.scrollTo({ top:0, behavior:"smooth" });
  }

  const INTENTS = [
    { key:"essai", icon:"car", label:"Essai routier", desc:"Tester le véhicule sur rendez-vous" },
    { key:"info", icon:"msg", label:"Plus d'informations", desc:"Photos, historique, rapport technique" },
    { key:"financement", icon:"tag", label:"Simulation financement", desc:"Étudier une solution de crédit" },
    { key:"reprise", icon:"route", label:"Reprise de mon véhicule", desc:"Estimer la valeur de mon actuel" },
  ];

  if (done) {
    return (
      <div className="pb-root">
        <div className="pb-shell">
          <div className="pb-panel glass pb-confirm">
            <div className="ok"><Icon name="check" size={42} stroke={2.5}/></div>
            <h2>Demande envoyée !</h2>
            <p>
              Merci {form.first}. Notre équipe vous recontacte rapidement pour organiser{" "}
              {intent === "essai" ? "votre essai" : intent === "financement" ? "votre simulation" : "votre demande"}
              {vehicle ? " pour votre " + vehicle.name : ""}.
            </p>
            <div className="pb-ref">Référence&nbsp;: {ref}</div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:30,flexWrap:"wrap"}}>
              <a className="btn btn-accent" href={"https://wa.me/" + CONTACTS.whatsapp} target="_blank" rel="noreferrer">
                <Icon name="whatsapp" size={18}/> Confirmer sur WhatsApp
              </a>
              <button className="btn btn-ghost" onClick={onExit}>Retour à l'accueil</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-root">
      <div className="pb-shell">
        <div className="pb-back" onClick={prev}>
          <Icon name="arrowL" size={16}/> {step===0 ? "Retour au site" : "Étape précédente"}
        </div>

        <div className="pb-steps">
          {PB_STEPS.map((s,i) => (
            <React.Fragment key={i}>
              <div className={"pb-step "+(i===step?"active":i<step?"done":"")}>
                <div className="num">{i<step ? <Icon name="check" size={15} stroke={2.6}/> : i+1}</div>
                <div className="lbl">{s}</div>
              </div>
              {i < PB_STEPS.length-1 && (
                <div className={"bar"+(i<step?" done":"")}
                  style={{flex:1,height:2,background:i<step?"var(--accent-2)":"var(--glass-border)",borderRadius:2}}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="pb-layout">
          <div>
            {step === 0 && (
              <div className="pb-panel glass" key="s0">
                <h2>Quel véhicule vous intéresse ?</h2>
                <p className="sub">Sélectionnez un véhicule de notre catalogue.</p>
                <div className="fleet-filter glass" style={{marginBottom:18,display:"inline-flex"}}>
                  {FILTERS.map(f => (
                    <button key={f.key} className={""} onClick={()=>{}}>{f.label}</button>
                  ))}
                </div>
                <div className="pb-veh-grid">
                  {FLEET.map(c => (
                    <div key={c.id} className={"pb-veh"+(vehicle?.id===c.id?" sel":"")} onClick={()=>setVehicle(c)}>
                      <image-slot id={"car-"+c.id} placeholder={c.name} shape="rect"></image-slot>
                      <div className="pv-body">
                        <div><b>{c.name}</b><span style={{display:"block",fontSize:12,color:"var(--ink-faint)"}}>{c.specs.year} · {c.specs.km}</span></div>
                        <div className="pv-price">{c.price.toLocaleString("fr-FR")} €</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="pb-panel glass" key="s1">
                <h2>Votre demande</h2>
                <p className="sub">Que souhaitez-vous faire ?</p>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
                  {INTENTS.map(it => (
                    <div key={it.key} className={"pb-agency-opt"+(intent===it.key?" sel":"")} onClick={()=>setIntent(it.key)}>
                      <div className="bento-ic" style={{width:40,height:40,borderRadius:11,flexShrink:0}}>
                        <Icon name={it.icon} size={20}/>
                      </div>
                      <div style={{flex:1}}><b>{it.label}</b><span>{it.desc}</span></div>
                    </div>
                  ))}
                </div>
                <p className="sub" style={{marginBottom:8}}>Showroom souhaité</p>
                {AGENCIES.map(a => (
                  <div key={a.id} className={"pb-agency-opt"+(showroom===a.id?" sel":"")} onClick={()=>setShowroom(a.id)}>
                    <div className="pin"><Icon name="pin" size={19}/></div>
                    <div style={{flex:1}}><b>{a.name}</b><span>{a.hours}</span></div>
                    {a.isNew && <span className="new-tag" style={{background:"var(--accent-2)",color:"var(--accent-ink)",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:999}}>Nouveau</span>}
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="pb-panel glass" key="s2">
                <h2>Vos coordonnées</h2>
                <p className="sub">Nous vous recontactons rapidement. Aucun engagement, aucun paiement.</p>
                <div className="pb-row">
                  <div className="pb-field">
                    <label>Prénom</label>
                    <input className={"pb-input"+(errors.first?" err":"")} value={form.first}
                      onChange={e=>setForm(f=>({...f,first:e.target.value}))} placeholder="Prénom"/>
                    {errors.first && <div className="pb-errtxt">{errors.first}</div>}
                  </div>
                  <div className="pb-field">
                    <label>Nom</label>
                    <input className={"pb-input"+(errors.last?" err":"")} value={form.last}
                      onChange={e=>setForm(f=>({...f,last:e.target.value}))} placeholder="Nom"/>
                    {errors.last && <div className="pb-errtxt">{errors.last}</div>}
                  </div>
                </div>
                <div className="pb-field">
                  <label>Email</label>
                  <input className={"pb-input"+(errors.email?" err":"")} value={form.email}
                    onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="vous@email.com" type="email"/>
                  {errors.email && <div className="pb-errtxt">{errors.email}</div>}
                </div>
                <div className="pb-field">
                  <label>Téléphone / WhatsApp</label>
                  <input className={"pb-input"+(errors.phone?" err":"")} value={form.phone}
                    onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="0639 00 00 00" type="tel"/>
                  {errors.phone && <div className="pb-errtxt">{errors.phone}</div>}
                </div>
                <div className="pb-field">
                  <label>Message (optionnel)</label>
                  <textarea className="pb-input" rows="3"
                    placeholder="Questions sur le véhicule, disponibilités, budget…"
                    onChange={e=>setForm(f=>({...f,msg:e.target.value}))}></textarea>
                </div>
              </div>
            )}

            <div className="pb-actions">
              <button className="btn btn-ghost btn-lg" onClick={prev}>
                <Icon name="arrowL" size={16}/> {step===0 ? "Annuler" : "Précédent"}
              </button>
              <button className="btn btn-accent btn-lg" onClick={next}
                disabled={step===0&&!vehicle}
                style={step===0&&!vehicle?{opacity:.4,pointerEvents:"none"}:{}}>
                {step===2 ? "Envoyer ma demande" : "Continuer"} <Icon name="arrowR" size={17}/>
              </button>
            </div>
          </div>

          {/* Summary */}
          <aside className="pb-summary glass glass-strong">
            <h4>Récapitulatif</h4>
            {vehicle ? (
              <>
                <div className="pb-sum-veh">
                  <image-slot id={"car-"+vehicle.id} placeholder={vehicle.name} shape="rounded" radius="10"></image-slot>
                  <div><b>{vehicle.name}</b><span>{vehicle.cat} · {vehicle.specs.year}</span></div>
                </div>
                <div className="pb-sum-row"><span>Kilométrage</span><b>{vehicle.specs.km}</b></div>
                <div className="pb-sum-row"><span>Carburant</span><b>{vehicle.specs.fuel}</b></div>
                <div className="pb-sum-row"><span>Boîte</span><b>{vehicle.specs.trans}</b></div>
                <div className="pb-sum-total">
                  <span>Prix</span>
                  <b>{vehicle.price.toLocaleString("fr-FR")} €</b>
                </div>
              </>
            ) : (
              <div style={{color:"var(--ink-faint)",fontSize:13}}>Aucun véhicule sélectionné</div>
            )}
            {step >= 1 && (
              <div className="pb-sum-row" style={{marginTop:8}}>
                <span>Demande</span>
                <b>{INTENTS.find(i=>i.key===intent)?.label}</b>
              </div>
            )}
            <div className="pb-sum-note" style={{marginTop:16}}>
              Aucun paiement requis. Notre équipe vous recontacte sous 24h pour organiser la suite.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PreBooking });
