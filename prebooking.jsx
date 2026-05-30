// prebooking.jsx — multi-step pre-reservation flow
const { useState, useMemo } = React;

const PB_STEPS = ["Itinéraire", "Véhicule", "Options", "Coordonnées"];

const PB_OPTIONS = [
  { id: "gps", icon: "gps", label: "GPS / Navigation", desc: "Cartographie de l'île hors-ligne", price: 5 },
  { id: "child", icon: "child", label: "Siège enfant", desc: "Homologué, installé à la remise", price: 4 },
  { id: "driver", icon: "seat", label: "Conducteur additionnel", desc: "Un 2ᵉ conducteur déclaré", price: 6 },
  { id: "insurance", icon: "insurance", label: "Assurance sérénité", desc: "Franchise réduite à 0 €", price: 12 },
];

function daysBetween(a, b) {
  if (!a || !b) return 1;
  const d = Math.round((b - a) / 86400000);
  return Math.max(1, d);
}

function PreBooking({ initial, onExit }) {
  const [step, setStep] = useState(0);
  const [pickup, setPickup] = useState(initial.pickup || "mamoudzou");
  const [dropoff, setDropoff] = useState(initial.dropoff || initial.pickup || "mamoudzou");
  const [start, setStart] = useState(initial.start || null);
  const [end, setEnd] = useState(initial.end || null);
  const [vehicle, setVehicle] = useState(initial.vehicle || null);
  const [opts, setOpts] = useState({});
  const [form, setForm] = useState({ first:"", last:"", email:"", phone:"" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const days = daysBetween(start, end);
  const optList = PB_OPTIONS.filter(o => opts[o.id]);
  const optTotal = optList.reduce((s,o)=>s+o.price*days, 0);
  const vehTotal = vehicle ? vehicle.price * days : 0;
  const total = vehTotal + optTotal;
  const pickupA = AGENCIES.find(a=>a.id===pickup);
  const dropoffA = AGENCIES.find(a=>a.id===dropoff);

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
    if (step === 1 && !vehicle) return;
    if (step === 3) { if (!validateForm()) return; setDone(true); return; }
    setStep(s => Math.min(s+1, 3));
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function prev() {
    if (step === 0) { onExit(); return; }
    setStep(s => s-1);
    window.scrollTo({top:0,behavior:"smooth"});
  }

  const ref = useMemo(()=> "GL-" + Math.random().toString(36).slice(2,7).toUpperCase(), []);

  if (done) {
    return (
      <div className="pb-root">
        <div className="pb-shell">
          <div className="pb-panel glass pb-confirm">
            <div className="ok"><Icon name="check" size={42} stroke={2.5}/></div>
            <h2>Demande de pré-réservation envoyée !</h2>
            <p>
              Merci {form.first}. Notre équipe vous recontacte sous quelques heures pour confirmer
              la disponibilité de votre {vehicle?.name} et finaliser votre location à l'agence de {pickupA?.short}.
            </p>
            <div className="pb-ref">Référence&nbsp;: {ref}</div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:30,flexWrap:"wrap"}}>
              <a className="btn btn-accent" href={"https://wa.me/262639690206"} target="_blank" rel="noreferrer">
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
        <div className="pb-back" onClick={prev}><Icon name="arrowL" size={16}/> {step===0?"Retour au site":"Étape précédente"}</div>

        <div className="pb-steps">
          {PB_STEPS.map((s,i)=>(
            <React.Fragment key={i}>
              <div className={"pb-step "+(i===step?"active":i<step?"done":"")}>
                <div className="num">{i<step?<Icon name="check" size={15} stroke={2.6}/>:i+1}</div>
                <div className="lbl">{s}</div>
              </div>
              {i<PB_STEPS.length-1 && <div className={"bar"+(i<step?" done":"")} style={{flex:1,height:2,background:i<step?"var(--accent-2)":"var(--glass-border)",borderRadius:2}}></div>}
            </React.Fragment>
          ))}
        </div>

        <div className="pb-layout">
          <div>
            {step===0 && <StepItinerary {...{pickup,setPickup,dropoff,setDropoff,start,end,setStart,setEnd}}/>}
            {step===1 && <StepVehicle vehicle={vehicle} setVehicle={setVehicle} prefVtype={initial.vtype}/>}
            {step===2 && <StepOptions opts={opts} setOpts={setOpts} days={days}/>}
            {step===3 && <StepDetails form={form} setForm={setForm} errors={errors}/>}

            <div className="pb-actions">
              <button className="btn btn-ghost btn-lg" onClick={prev}>
                <Icon name="arrowL" size={16}/> {step===0?"Annuler":"Précédent"}
              </button>
              <button className="btn btn-accent btn-lg" onClick={next} disabled={step===1&&!vehicle}
                      style={step===1&&!vehicle?{opacity:.4,pointerEvents:"none"}:{}}>
                {step===3 ? "Envoyer ma demande" : "Continuer"} <Icon name="arrowR" size={17}/>
              </button>
            </div>
          </div>

          <PbSummary {...{vehicle,days,pickupA,dropoffA,start,end,optList,vehTotal,optTotal,total}}/>
        </div>
      </div>
    </div>
  );
}

/* Step 0 — Itinerary */
function StepItinerary({ pickup,setPickup,dropoff,setDropoff,start,end,setStart,setEnd }) {
  return (
    <div className="pb-panel glass" key="s0">
      <h2>Votre itinéraire</h2>
      <p className="sub">Où récupérez-vous et rendez-vous le véhicule, et pour quelles dates ?</p>
      <label className="pb-field" style={{display:"block"}}><label>Agence de départ</label></label>
      {AGENCIES.map(a=>(
        <div key={a.id} className={"pb-agency-opt"+(pickup===a.id?" sel":"")} onClick={()=>setPickup(a.id)}>
          <div className="pin"><Icon name="pin" size={19}/></div>
          <div style={{flex:1}}><b>{a.name}</b><span>{a.desc}</span></div>
          {a.isNew && <span className="new-tag" style={{background:"var(--accent-2)",color:"var(--accent-ink)",fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:999}}>Nouveau</span>}
        </div>
      ))}
      <div style={{height:18}}></div>
      <label className="pb-field" style={{display:"block"}}><label>Agence de retour</label></label>
      <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
        {AGENCIES.map(a=>(
          <div key={a.id} className={"pb-agency-opt"+(dropoff===a.id?" sel":"")} style={{flex:"1 1 30%",marginBottom:0}} onClick={()=>setDropoff(a.id)}>
            <div className="pin"><Icon name="pin" size={17}/></div>
            <div><b style={{fontSize:14}}>{a.short}</b></div>
          </div>
        ))}
      </div>
      <div style={{height:18}}></div>
      <label className="pb-field" style={{display:"block"}}><label>Dates de location</label></label>
      <div className="glass" style={{padding:6,borderRadius:16,display:"inline-block"}}>
        <PbInlineCalendar start={start} end={end} onChange={(s,e)=>{setStart(s);setEnd(e);}}/>
      </div>
    </div>
  );
}

function PbInlineCalendar({ start, end, onChange }) {
  function pick(d) {
    if (!start || (start && end)) onChange(d, null);
    else if (d < start) onChange(d, null);
    else onChange(start, d);
  }
  return <Calendar start={start} end={end} onPick={pick}/>;
}

/* Step 1 — Vehicle */
function StepVehicle({ vehicle, setVehicle, prefVtype }) {
  const [filter, setFilter] = useState(prefVtype || "all");
  const list = FLEET.filter(c => filter==="all" || c.catKey===filter);
  return (
    <div className="pb-panel glass" key="s1">
      <h2>Choisissez votre véhicule</h2>
      <p className="sub">Tarifs par jour, kilométrage illimité inclus.</p>
      <div className="fleet-filter glass" style={{marginBottom:18,display:"inline-flex"}}>
        {FILTERS.map(f=>(
          <button key={f.key} className={filter===f.key?"active":""} onClick={()=>setFilter(f.key)}>{f.label}</button>
        ))}
      </div>
      <div className="pb-veh-grid">
        {list.map(c=>(
          <div key={c.id} className={"pb-veh"+(vehicle?.id===c.id?" sel":"")} onClick={()=>setVehicle(c)}>
            <image-slot id={"car-"+c.id} placeholder={c.name} shape="rect"></image-slot>
            <div className="pv-body">
              <div><b>{c.name}</b><span style={{display:"block"}}>{c.cat}</span></div>
              <div className="pv-price">{c.price}€<span style={{fontSize:11,color:"var(--ink-faint)",fontWeight:500}}>/j</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Step 2 — Options */
function StepOptions({ opts, setOpts, days }) {
  return (
    <div className="pb-panel glass" key="s2">
      <h2>Personnalisez votre location</h2>
      <p className="sub">Ajoutez des options à votre véhicule. Facturées par jour de location.</p>
      {PB_OPTIONS.map(o=>(
        <div key={o.id} className={"pb-opt"+(opts[o.id]?" on":"")} onClick={()=>setOpts(p=>({...p,[o.id]:!p[o.id]}))}>
          <div className="pb-check"><Icon name="check" size={15} stroke={2.6}/></div>
          <div className="bento-ic" style={{width:40,height:40,borderRadius:11}}><Icon name={o.icon} size={20}/></div>
          <div className="ot"><b>{o.label}</b><span>{o.desc}</span></div>
          <div className="oprice">+{o.price}€<span style={{fontSize:11,fontWeight:500,color:"var(--ink-faint)"}}>/j</span></div>
        </div>
      ))}
      <div className="chip" style={{marginTop:8}}><Icon name="shield" size={14}/> Assurance de base & assistance 24/7 déjà incluses</div>
    </div>
  );
}

/* Step 3 — Details */
function StepDetails({ form, setForm, errors }) {
  const upd = (k)=>(e)=>setForm(f=>({...f,[k]:e.target.value}));
  return (
    <div className="pb-panel glass" key="s3">
      <h2>Vos coordonnées</h2>
      <p className="sub">Nous vous recontactons pour confirmer la disponibilité. Aucun paiement en ligne.</p>
      <div className="pb-row">
        <div className="pb-field">
          <label>Prénom</label>
          <input className={"pb-input"+(errors.first?" err":"")} value={form.first} onChange={upd("first")} placeholder="Prénom"/>
          {errors.first && <div className="pb-errtxt">{errors.first}</div>}
        </div>
        <div className="pb-field">
          <label>Nom</label>
          <input className={"pb-input"+(errors.last?" err":"")} value={form.last} onChange={upd("last")} placeholder="Nom"/>
          {errors.last && <div className="pb-errtxt">{errors.last}</div>}
        </div>
      </div>
      <div className="pb-field">
        <label>Email</label>
        <input className={"pb-input"+(errors.email?" err":"")} value={form.email} onChange={upd("email")} placeholder="vous@email.com" type="email"/>
        {errors.email && <div className="pb-errtxt">{errors.email}</div>}
      </div>
      <div className="pb-field">
        <label>Téléphone / WhatsApp</label>
        <input className={"pb-input"+(errors.phone?" err":"")} value={form.phone} onChange={upd("phone")} placeholder="0639 00 00 00" type="tel"/>
        {errors.phone && <div className="pb-errtxt">{errors.phone}</div>}
      </div>
      <div className="pb-field">
        <label>Message (optionnel)</label>
        <textarea className="pb-input" rows="3" placeholder="Vol d'arrivée, besoins spécifiques…" onChange={upd("msg")}></textarea>
      </div>
    </div>
  );
}

/* Summary aside */
function PbSummary({ vehicle,days,pickupA,dropoffA,start,end,optList,vehTotal,optTotal,total }) {
  return (
    <aside className="pb-summary glass glass-strong">
      <h4>Récapitulatif</h4>
      {vehicle ? (
        <div className="pb-sum-veh">
          <image-slot id={"car-"+vehicle.id} placeholder={vehicle.name} shape="rounded" radius="10"></image-slot>
          <div><b>{vehicle.name}</b><span>{vehicle.cat}</span></div>
        </div>
      ) : (
        <div className="pb-sum-veh" style={{color:"var(--ink-faint)",fontSize:13}}>Aucun véhicule sélectionné</div>
      )}
      <div className="pb-sum-row"><span>Départ</span><b>{pickupA?.short}</b></div>
      <div className="pb-sum-row"><span>Retour</span><b>{dropoffA?.short}</b></div>
      <div className="pb-sum-row"><span>Dates</span><b>{start&&end?`${fmtDate(start)} → ${fmtDate(end)}`:"À définir"}</b></div>
      <div className="pb-sum-row"><span>Durée</span><b>{days} jour{days>1?"s":""}</b></div>
      {vehicle && <div className="pb-sum-row"><span>Véhicule ({days}j)</span><b>{vehTotal}€</b></div>}
      {optList.map(o=>(
        <div className="pb-sum-row" key={o.id}><span>{o.label}</span><b>+{o.price*days}€</b></div>
      ))}
      <div className="pb-sum-total">
        <span>Estimation totale</span>
        <b>{total}€</b>
      </div>
      <div className="pb-sum-note">
        Estimation indicative TTC, kilométrage illimité inclus. Le tarif définitif est confirmé par l'agence.
        Aucun paiement n'est exigé en ligne — il s'agit d'une pré-réservation.
      </div>
    </aside>
  );
}

Object.assign(window, { PreBooking });
