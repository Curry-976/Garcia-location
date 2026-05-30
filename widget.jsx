// widget.jsx — Booking search widget (3 variants) + Calendar + dropdowns
const { useState, useRef, useEffect } = React;

const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DOW = ["L","M","M","J","V","S","D"];

function fmtDate(d) {
  if (!d) return null;
  return `${String(d.getDate()).padStart(2,"0")} ${MONTHS[d.getMonth()].slice(0,4).toLowerCase()}`;
}

function useClickOutside(ref, onClose) {
  useEffect(() => {
    function h(e) { if (ref.current && !ref.current.contains(e.target)) onClose(); }
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);
}

function Calendar({ start, end, onPick }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const y = view.getFullYear(), m = view.getMonth();
  const first = new Date(y, m, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const days = new Date(y, m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(new Date(y, m, d));

  function cls(d) {
    if (!d) return "cal-day muted";
    let c = "cal-day";
    if (d < today) c += " muted";
    const t = d.getTime();
    const s = start && start.getTime(), e = end && end.getTime();
    if (s && t === s) c += " sel range-start";
    if (e && t === e) c += " sel range-end";
    if (s && e && t > s && t < e) c += " in-range";
    return c;
  }
  return (
    <div className="cal-pop glass glass-strong" onClick={(e)=>e.stopPropagation()}>
      <div className="cal-head">
        <button className="cal-nav" onClick={()=>setView(new Date(y, m-1, 1))}><Icon name="arrowL" size={14}/></button>
        <b>{MONTHS[m]} {y}</b>
        <button className="cal-nav" onClick={()=>setView(new Date(y, m+1, 1))}><Icon name="arrowR" size={14}/></button>
      </div>
      <div className="cal-grid">
        {DOW.map((d,i)=><div key={i} className="cal-dow">{d}</div>)}
        {cells.map((d,i)=>(
          <div key={i} className={cls(d)} onClick={()=>d && d>=today && onPick(d)}>{d?d.getDate():""}</div>
        ))}
      </div>
    </div>
  );
}

// Field with agency dropdown
function AgencyField({ label, value, onChange, exclude }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, ()=>setOpen(false));
  const sel = AGENCIES.find(a=>a.id===value);
  return (
    <div className="field" ref={ref} onClick={()=>setOpen(o=>!o)}>
      <div className="field-label"><Icon name="pin" size={13}/> {label}</div>
      <div className={"field-value" + (sel?"":" placeholder")}>
        {sel ? sel.short : "Choisir"} <Icon name="chevD" size={15} style={{opacity:.5}}/>
      </div>
      {open && (
        <div className="dd-pop glass glass-strong" onClick={(e)=>e.stopPropagation()}>
          {AGENCIES.map(a=>(
            <div key={a.id} className={"dd-item"+(a.id===value?" active":"")}
                 onClick={()=>{onChange(a.id); setOpen(false);}}>
              <div className="dd-ic"><Icon name="pin" size={17}/></div>
              <div><b>{a.short}</b><span>{a.desc}</span></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DateField({ label, start, end, onChange, single }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, ()=>setOpen(false));
  function pick(d) {
    if (single) { onChange(d, d); setOpen(false); return; }
    if (!start || (start && end)) { onChange(d, null); }
    else if (d < start) { onChange(d, null); }
    else { onChange(start, d); setOpen(false); }
  }
  const txt = single
    ? (start ? fmtDate(start) : "Choisir")
    : (start && end ? `${fmtDate(start)} → ${fmtDate(end)}` : start ? `${fmtDate(start)} → …` : "Choisir");
  return (
    <div className="field" ref={ref} onClick={()=>setOpen(true)}>
      <div className="field-label"><Icon name="calendar" size={13}/> {label}</div>
      <div className={"field-value" + (start?"":" placeholder")}>
        {txt}
      </div>
      {open && <Calendar start={start} end={end} onPick={pick}/>}
    </div>
  );
}

function VehicleField({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  useClickOutside(ref, ()=>setOpen(false));
  const sel = VEHICLE_TYPES.find(v=>v.key===value);
  const icons = { citadine:"car", suv:"suv", utilitaire:"van" };
  return (
    <div className="field" ref={ref} onClick={()=>setOpen(o=>!o)}>
      <div className="field-label"><Icon name="car" size={13}/> Véhicule</div>
      <div className={"field-value" + (sel?"":" placeholder")}>
        {sel ? sel.label : "Tous"} <Icon name="chevD" size={15} style={{opacity:.5}}/>
      </div>
      {open && (
        <div className="dd-pop glass glass-strong" onClick={(e)=>e.stopPropagation()}>
          <div className={"dd-item"+(!value?" active":"")} onClick={()=>{onChange(null);setOpen(false);}}>
            <div className="dd-ic"><Icon name="star" size={16}/></div>
            <div><b>Tous les types</b><span>Je verrai toute la flotte</span></div>
          </div>
          {VEHICLE_TYPES.map(v=>(
            <div key={v.key} className={"dd-item"+(v.key===value?" active":"")}
                 onClick={()=>{onChange(v.key); setOpen(false);}}>
              <div className="dd-ic"><Icon name={icons[v.key]} size={17}/></div>
              <div><b>{v.label}</b></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BookingWidget({ variant = "bar", state, set, onSearch, compact }) {
  const cta = (
    <div className="widget-cta">
      <button className="btn btn-accent btn-lg" onClick={onSearch}>
        Voir les disponibilités <Icon name="arrowR" size={17}/>
      </button>
    </div>
  );

  if (variant === "grid") {
    return (
      <div className="widget glass glass-strong">
        <div className="widget-inner">
          <div className="widget-grid">
            <AgencyField label="Départ" value={state.pickup} onChange={v=>set({pickup:v})}/>
            <AgencyField label="Retour" value={state.dropoff} onChange={v=>set({dropoff:v})}/>
            <DateField label="Du" start={state.start} end={state.start} single onChange={(s)=>set({start:s})}/>
            <DateField label="Au" start={state.end} end={state.end} single onChange={(s)=>set({end:s})}/>
            <div className="wfull"><VehicleField value={state.vtype} onChange={v=>set({vtype:v})}/></div>
            <div className="wfull" style={{marginTop:4}}>
              <button className="btn btn-accent btn-lg" style={{width:"100%",justifyContent:"center"}} onClick={onSearch}>
                Voir les disponibilités <Icon name="arrowR" size={17}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "min") {
    return (
      <div className="widget glass glass-strong">
        <div className="widget-inner widget-min">
          <AgencyField label="Agence de départ" value={state.pickup} onChange={v=>set({pickup:v})}/>
          <DateField label="Dates de location" start={state.start} end={state.end}
                     onChange={(s,e)=>set({start:s,end:e})}/>
          <div style={{marginTop:10}}>
            <button className="btn btn-accent btn-lg" style={{width:"100%",justifyContent:"center"}} onClick={onSearch}>
              Rechercher un véhicule <Icon name="arrowR" size={17}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // default: bar
  return (
    <div className="widget glass glass-strong">
      <div className="widget-inner">
        <div className="widget-bar">
          <AgencyField label="Départ" value={state.pickup} onChange={v=>set({pickup:v})}/>
          <div className="field-divider"></div>
          <AgencyField label="Retour" value={state.dropoff} onChange={v=>set({dropoff:v})}/>
          <div className="field-divider"></div>
          <DateField label="Dates" start={state.start} end={state.end}
                     onChange={(s,e)=>set({start:s,end:e})}/>
          <div className="field-divider"></div>
          <VehicleField value={state.vtype} onChange={v=>set({vtype:v})}/>
          {cta}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BookingWidget, Calendar, fmtDate, MONTHS });
